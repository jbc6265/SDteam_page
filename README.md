# HD건설기계 협력사육성팀

협력사가 지원 활동과 동반성장 소식을 확인할 수 있는 반응형 랜딩페이지입니다.
**HTML · CSS · JavaScript**로 제작했으며, 패키지 설치나 빌드 없이 `index.html`을 열어 사용할 수 있습니다.

## 프로젝트 소개
SDteam_page는 HD건설기계의 협력사 육성팀을 소개하고 홍보하기 위한 랜딩페이지 프로젝트입니다.

## 목적
- 협력사 육성팀에 대한 정보 전달
- 회사 및 팀 이미지 홍보
- 주요 메시지와 소개 내용을 명확하게 제공
- 사용자에게 빠르고 간편하게 접근 가능한 웹페이지 구성

## 특징
- 간결하고 직관적인 랜딩페이지 구조
- 홍보 목적에 맞춘 콘텐츠 구성
- 협력사 육성팀의 역할과 가치를 강조

## 회사 PC에서 시작하기

처음 가져올 때:

```powershell
git clone https://github.com/jbc6265/SDteam_page.git
cd SDteam_page
start index.html
```

이미 복제한 저장소를 최신 버전으로 갱신할 때:

```powershell
git switch main
git pull --ff-only origin main
start index.html
```

수정 중인 파일이 있다면 먼저 커밋하거나 `git stash`로 보관하세요. `--ff-only`는 로컬 변경 이력을 임의로 병합하지 않습니다.

Node.js 20 이상이 설치되어 있다면 로컬 서버로 확인할 수도 있습니다. npm이나 별도 패키지는 필요하지 않습니다.

```powershell
node scripts/serve.mjs
```

브라우저에서 http://127.0.0.1:4173 을 엽니다. 종료는 `Ctrl+C`입니다.
다른 포트를 사용하려면 `$env:PORT = 4174`를 실행한 뒤 서버를 시작하세요.

## 페이지 구성

1. **메인 비주얼** — 협력사의 성장과 제조 혁신 메시지, 지원업무 바로가기
2. **팀 소개** — 제조 혁신 · 현장 소통 · 동반성장
3. **협력사 지원** — 스마트팩토리 구축, 파트너십과 현장 소통, 협력사 임직원 격려
4. **정부과제** — 안내 준비 상태 및 일반적인 참여 준비 절차
5. **소식·기사** — 제공된 Hi-Connect 기사 8건, 분류 필터와 원문 링크
6. **문의** — 담당자 연락처 입력 영역 및 Hi-Connect 바로가기

모바일 메뉴, 키보드 포커스, 본문 건너뛰기, 현재 섹션 표시, 동작 줄이기 설정을 지원합니다. 기사 원문은 새 창으로 열립니다. 문의 정보를 수집하거나 전송하는 서버·폼은 없습니다.

## 파일 구조

```text
index.html                페이지 구조와 고정 문구
styles.css                색상·레이아웃·PC/모바일 스타일
content.js                기사, 문의처, 정부과제 데이터
script.js                 기사 필터, 메뉴, 데이터 표시
assets/                   메인 이미지, 기사 썸네일, 파비콘
docs/article-sources.json 원문 제목·날짜·링크 기록
docs/design.md            디자인 및 이미지 출처
scripts/serve.mjs          의존성 없는 로컬 미리보기 서버
scripts/check.mjs         링크·파일·기사 데이터 검사
scripts/build.mjs         배포용 정적 파일을 dist/로 복사
.openai/hosting.json       Sites 호스팅 설정
```

## 콘텐츠 수정

`content.js`는 UTF-8로 저장하세요. 데이터는 페이지를 새로 열거나 새로고침하면 반영됩니다.

### 문의처

`contact`의 빈 값을 실제 담당 부서 정보로 바꾸면 메일·전화 링크가 나타납니다.

```javascript
contact: {
  description: '지원사업 관련 문의는 아래 담당자에게 연락해 주세요.',
  email: '', // 실제 업무용 이메일 입력
  phone: ''  // 실제 대표 연락처 입력
}
```

### 정부과제

현재 확정된 공고 자료가 없어 `programs: []`로 비워 두었습니다. 공식 사업명, 지원 대상, 기간, 조건 및 공고 URL을 확인한 후 아래 구조로 추가하세요.

```javascript
programs: [
  {
    title: '확인된 공식 사업명',
    description: '지원 대상, 신청 기간, 지원 내용 및 현재 상태',
    url: 'https://example.com/official-notice'
  }
]
```

위 주소는 형식 예시이며 게시용 주소가 아닙니다. 반드시 실제 HTTPS 공식 공고 주소로 교체하세요. 사업이 추가되면 준비 중 문구는 숨겨집니다. 모집 상태·신청 기간은 자동으로 갱신하지 않으므로 공고 변경 시 직접 수정해야 합니다. 스마트팩토리 기사만으로 특정 정부 지원금이나 모집 조건을 추정하지 않았습니다.

### 기사

`articles`에 `id`, `category`, `date`, `title`, `summary`를 추가하고 `assets/news-{id}.jpg`에 해당 썸네일을 저장하세요. 날짜는 게시일 기준 `YYYY-MM-DD`입니다. ID는 Hi-Connect 원문 주소의 마지막 숫자입니다.

분류: `innovation`(제조 혁신), `partnership`(파트너십), `company`(기업 소식).
최신순 3건은 이미지형으로, 나머지는 목록형으로 표시됩니다. 분류를 선택하면 해당 분류의 최신순으로 바뀝니다.
초기 검사는 요청된 기사 8건을 기준으로 하므로 기사를 추가할 때 `scripts/check.mjs`의 개수 검사도 변경하세요.

## 색상

첨부된 HD현대 컬러 시스템의 RGB/HEX 값을 사용합니다.

| 이름 | HEX | 사용 |
| --- | --- | --- |
| HD Eco Green | `#00E600` | 어두운 배경 위 강조 |
| HD Heritage Green | `#00AD1D` | 선택 표시, 포커스, 가치 번호 |
| HD Prosperity Green | `#008233` | 보조 강조 |
| HD Discovery Blue | `#003087` | 제목, 링크 |
| HD Trust Blue | `#002554` | 메인, 정부과제, 푸터 |

외부 폰트 CDN을 사용하지 않습니다. 로컬에 Pretendard 또는 Noto Sans KR이 있으면 사용하고, Windows에서는 맑은 고딕으로 표시됩니다. 회사 PC의 설치 폰트에 따라 글자 형태가 조금 달라질 수 있습니다.

## 검사와 정적 배포

```powershell
node --check content.js
node --check script.js
node scripts/check.mjs
node scripts/build.mjs
```

검사는 로컬 참조 파일, 앵커, 중복 ID, 요청된 기사 8건과 분류를 확인합니다. `dist/`는 생성물로 Git에 포함하지 않습니다. `dist/`의 파일을 정적 호스팅 루트에 업로드하면 됩니다. 서버 기능이나 환경변수는 필요 없습니다.

## GitHub Pages 자동 배포

공개 사이트: **https://jbc6265.github.io/SDteam_page/**

`main` 브랜치에 push하면 `.github/workflows/pages.yml`이 자동 실행되어 소스 검사 → `dist/` 생성 → GitHub Pages 배포 순서로 진행합니다. 사이트에 필요한 정적 파일만 배포하며 README와 개발용 스크립트는 배포 결과물에 포함하지 않습니다.

```powershell
git add index.html styles.css content.js script.js assets
git commit -m "Update landing page content"
git push origin main
```

[Actions 배포 이력](https://github.com/jbc6265/SDteam_page/actions/workflows/pages.yml)에서 성공 여부를 확인하세요. `Run workflow`로 수동 배포할 수도 있습니다. 검사가 실패하면 해당 버전은 배포되지 않습니다. 저장소의 Settings → Pages → Source는 **GitHub Actions**로 설정되어 있습니다.

기존 Sites 주소는 별도의 배포입니다. GitHub push는 GitHub Pages를 갱신하며, 기존 Sites 사이트에는 자동 반영되지 않습니다.

Sites 배포 시에는 `dist/`와 `.openai/hosting.json`을 사용합니다. 일반 GitHub 협업에는 Sites 계정이나 도구가 필요하지 않습니다. 인증 정보는 저장소에 포함하지 않습니다.

## 현재 콘텐츠 상태

- 기사 8건: 2026-10-21 기준 원문 메타데이터 확인. 기사 자동 수집 기능은 없습니다.
- 정부과제 공식 공고, 담당자 이메일·전화: 자료 미제공으로 안내 준비 중.
- 메인 사진: AI 생성 연출 이미지이며 실제 HD건설기계 시설 사진이 아닙니다. 화면에 이를 명시했습니다.
- 기사 이미지: 사용자가 제공한 Hi-Connect 원문의 썸네일을 사용했습니다. 출처와 원문 링크를 표시했습니다.
- 헤더: 텍스트 표기입니다. 공식 로고 파일을 임의로 재현하지 않았습니다. 정식 로고가 제공되면 교체할 수 있습니다.

원문·이미지 출처와 디자인 설명은 [docs/design.md](docs/design.md)를 참고하세요.

