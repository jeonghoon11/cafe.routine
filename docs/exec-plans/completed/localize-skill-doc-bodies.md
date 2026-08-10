# Localize Skill and Document Bodies

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `docs/localize-skill-doc-bodies`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-localize-bodies`

## Goal

`.agents/skills/`와 `docs/`의 사람이 읽는 영어 본문을 확인하고 한국어로
통일하되 코드, 명령어, 경로, 식별자, 제목, 공식 문서명은 유지한다.

## Completed

- 전체 skill과 docs 파일 38개를 확인했다.
- 영어 본문이 남아 있던 repository workflow skill 네 개를 한국어로 번역했다.
- 각 skill의 UI `default_prompt`를 한국어로 번역했다.
- Toss 기반 skill과 docs 본문은 이미 한국어여서 변경하지 않았다.

## Verification

- Ruby로 `agents/openai.yaml` parsing
- skill name, description, UI prompt, description 길이 검사
- local Markdown link 검사
- code와 제목을 제외한 영어 본문 잔존 검사
- `git diff --check`

공식 `quick_validate.py`는 로컬에 PyYAML이 없어 실행하지 않았고, package는
추가로 설치하지 않았다.
