#!/usr/bin/env python3

import json
import shlex
import subprocess
import sys
from pathlib import Path

BASE_BRANCHES = {"main", "develop"}
SHELL_OPERATORS = {"&&", "||", ";", "|"}


def git_commit_targets(command: str, cwd: str) -> list[str]:
    try:
        tokens = shlex.split(command)
    except ValueError:
        return []

    targets = []
    for index, token in enumerate(tokens):
        if token != "git":
            continue
        target = cwd
        position = index + 1
        while position < len(tokens) and tokens[position] not in SHELL_OPERATORS:
            if tokens[position] == "-C" and position + 1 < len(tokens):
                target = tokens[position + 1]
                position += 2
                continue
            if tokens[position] == "commit":
                targets.append(str((Path(cwd) / target).resolve()))
                break
            position += 1
    return targets


def current_branch(cwd: str) -> str:
    result = subprocess.run(
        ["git", "branch", "--show-current"],
        cwd=cwd,
        check=False,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()


def is_primary_checkout(cwd: str) -> bool:
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        cwd=cwd,
        check=False,
        capture_output=True,
        text=True,
    )
    return (Path(result.stdout.strip()) / ".git").is_dir()


def main() -> None:
    payload = json.load(sys.stdin)
    cwd = payload.get("cwd", ".")
    command = payload.get("tool_input", {}).get("command", "")
    for target in git_commit_targets(command, cwd):
        branch = current_branch(target)
        if branch not in BASE_BRANCHES and not is_primary_checkout(target):
            continue

        json.dump(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": (
                        f"Direct commits from {branch or 'this checkout'} are blocked. "
                        "Commit from a task branch in a linked worktree."
                    ),
                }
            },
            sys.stdout,
        )
        return


def self_test() -> None:
    assert git_commit_targets("git commit -m 'test'", "/repo") == ["/repo"]
    assert git_commit_targets("git -C /tmp/repo commit -m 'test'", "/repo") == [
        str(Path("/tmp/repo").resolve())
    ]
    assert git_commit_targets("git add x && git commit -m 'test'", "/repo") == [
        "/repo"
    ]
    assert not git_commit_targets("git status --short", "/repo")


if __name__ == "__main__":
    if sys.argv[1:] == ["--self-test"]:
        self_test()
    else:
        main()
