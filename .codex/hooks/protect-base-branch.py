#!/usr/bin/env python3

import json
import re
import subprocess
import sys

BASE_BRANCHES = {"main", "develop"}
GIT_COMMIT_PATTERN = re.compile(r"\bgit(?:\s+-C\s+\S+)?\s+commit\b")


def contains_git_commit(command: str) -> bool:
    return bool(GIT_COMMIT_PATTERN.search(command))


def current_branch(cwd: str) -> str:
    result = subprocess.run(
        ["git", "branch", "--show-current"],
        cwd=cwd,
        check=False,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()


def main() -> None:
    payload = json.load(sys.stdin)
    command = payload.get("tool_input", {}).get("command", "")
    branch = current_branch(payload.get("cwd", "."))

    if branch not in BASE_BRANCHES or not contains_git_commit(command):
        return

    json.dump(
        {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": (
                    f"Direct commits to {branch} are blocked. "
                    "Create a task branch in a dedicated worktree."
                ),
            }
        },
        sys.stdout,
    )


def self_test() -> None:
    assert contains_git_commit("git commit -m 'test'")
    assert contains_git_commit("git -C /tmp/repo commit -m 'test'")
    assert not contains_git_commit("git status --short")


if __name__ == "__main__":
    if sys.argv[1:] == ["--self-test"]:
        self_test()
    else:
        main()
