---
name: commit-task-changes
description: "Review and commit completed repository changes as cohesive task units with Korean Conventional Commit titles such as `feat: ...`. Use after Codex finishes modifying files in this repository, or when the user asks to commit, create commits, split commits, or organize changes by commit unit."
---

# Commit Task Changes

Commit only the changes produced for the completed task. Preserve unrelated user changes.

## Workflow

1. Run `git status --short` and inspect relevant diffs.
2. Confirm the task is complete and its required checks passed. Do not hide failed checks by committing.
3. Divide changes only when they have independent reasons to change. Keep implementation, its tests, and directly related documentation together.
4. Stage explicit paths with `git add -- <paths>`. Never use `git add .` or `git add -A` when unrelated changes exist.
5. Review `git diff --cached --stat` and `git diff --cached` before committing.
6. Commit each unit with `<type>: <Korean summary>`.
7. Run `git status --short` and report the commit hash, title, checks, and intentionally uncommitted files.

## Commit Types

- `feat`: 사용자에게 보이는 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작을 바꾸지 않는 구조 개선
- `docs`: 문서만 변경
- `test`: 테스트만 변경
- `chore`: 유지보수와 저장소 설정
- `build`: 빌드 시스템이나 의존성 변경
- `ci`: CI 변경
- `perf`: 성능 개선
- `style`: 동작과 무관한 서식 변경

Use the type that represents the primary reason for the change. Keep the title concise, omit a trailing period, and do not add a scope unless it materially improves clarity.

## Safety

- Do not amend, rebase, reset, or force-push unless the user explicitly requests it.
- Do not include secrets, `.env*`, generated credentials, or unrelated user work.
- Do not create an empty commit.
- If task changes cannot be separated safely from pre-existing edits, stop and ask the user which files or hunks to include.
