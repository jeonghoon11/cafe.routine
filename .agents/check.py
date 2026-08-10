#!/usr/bin/env python3

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AGENTS = ROOT / "AGENTS.md"
LOCAL_LINK = re.compile(r"\[[^]]+\]\((?!https?://|mailto:|#)([^)#]+)")


def fail(message: str) -> None:
    print(f"agent harness: {message}", file=sys.stderr)
    raise SystemExit(1)


def check_docs() -> None:
    text = AGENTS.read_text()
    line_count = len(text.splitlines())
    if line_count > 100:
        fail(f"AGENTS.md is {line_count} lines; keep it at 100 or fewer")

    docs = [AGENTS, *sorted((ROOT / ".agents").glob("**/*.md"))]
    for doc in docs:
        for target in LOCAL_LINK.findall(doc.read_text()):
            if not (doc.parent / target).resolve().exists():
                fail(f"missing link in {doc.relative_to(ROOT)}: {target}")


def check_skills() -> None:
    for skill in sorted((ROOT / ".agents/skills").glob("*/SKILL.md")):
        text = skill.read_text()
        if not text.startswith("---\n") or "\n---\n" not in text[4:]:
            fail(f"invalid skill frontmatter: {skill.relative_to(ROOT)}")
        frontmatter = text.split("---\n", 2)[1]
        name = re.search(r"^name:\s*[\"']?([^\"'\n]+)", frontmatter, re.MULTILINE)
        if not name or name.group(1).strip() != skill.parent.name:
            fail(f"skill name does not match folder: {skill.relative_to(ROOT)}")
        if not re.search(r"^description:\s*\S", frontmatter, re.MULTILINE):
            fail(f"skill description is missing: {skill.relative_to(ROOT)}")
        metadata = skill.parent / "agents/openai.yaml"
        if metadata.exists() and f"${skill.parent.name}" not in metadata.read_text():
            fail(f"skill UI prompt does not mention its skill: {metadata.relative_to(ROOT)}")


def check_hooks() -> None:
    hooks = ROOT / ".codex/hooks.json"
    json.loads(hooks.read_text())
    subprocess.run(
        [sys.executable, str(ROOT / ".codex/hooks/protect-base-branch.py"), "--self-test"],
        check=True,
    )


if __name__ == "__main__":
    check_docs()
    check_skills()
    check_hooks()
    print("agent harness: OK")
