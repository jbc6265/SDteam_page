# 디자인과 출처

## 결정된 방향

- 대상: 협력사, 지원사업 확인과 참여 안내
- 순서: 메인 비주얼 → 팀 소개 → 협력사 지원 → 정부과제 → 소식·기사 → 문의
- 참고: https://www.hd.com/kr/main 의 큰 비주얼, 단정한 탐색 구조
- 사용자가 첨부한 5가지 HD현대 색상 사용. 흰색·회색 여백과 navy 전면 섹션을 교차 배치
- 실제 UI는 전부 HTML/CSS/JavaScript. 사이트 화면을 이미지 한 장으로 표시하지 않음
- 본문 16px, 기사 설명 14px, 큰 제목 28~40px, 메인 제목 33~58px
- 콘텐츠 최대 폭 1280px, PC 좌우 여백 56px, 모바일 20px
- 화살표는 동일한 선형 SVG. 기사 이미지의 기존 텍스트·브랜딩은 원본 비율로 보존

## 시안에서 의도적으로 변경한 내용

1. 생성 시안의 예시 기사·날짜는 모두 사용자 제공 원문 8건으로 교체.
2. 지원업무의 예시 공장 사진 대신 해당 활동의 실제 기사 썸네일 사용.
3. 제공되지 않은 연락처와 정부과제는 준비 중으로 명시.
4. 메인 제조현장 이미지는 별도로 생성하고 연출 이미지라는 표시와 대체 텍스트 추가.
5. 시안의 임의 그린 대신 첨부 규정 색상 `#00E600` 적용.
6. 공식 로고 파일 미제공으로 헤더는 텍스트 표기, 파비콘은 별도의 성장 막대 아이콘.

## 원문

아래 링크는 각 활동을 확인하는 출처이며, 사이트에는 독립적으로 작성한 짧은 요약만 표시합니다. 게시일과 행사일을 구분하여 기사 날짜는 게시일을 사용합니다. 회사 전체 실적(1366)은 팀 성과로 표시하지 않고 기업 소식으로 분류합니다.

| ID | 게시일 | 내용 |
| --- | --- | --- |
| [1416](https://hi-connect.blog/1416) | 2026-10-21 | 협력사 협의회 연구위원회 3기 간담회 |
| [1414](https://hi-connect.blog/1414) | 2026-10-16 | 하반기 우수 협력사 직원 시상식 |
| [1396](https://hi-connect.blog/1396) | 2026-09-18 | 하반기 AM 협력사 간담회 |
| [1376](https://hi-connect.blog/1376) | 2026-08-18 | 상반기 협력사 우수 직원 시상식 |
| [1369](https://hi-connect.blog/1369) | 2026-07-31 | 엔진사업본부 협력사 간담회 |
| [1367](https://hi-connect.blog/1367) | 2026-07-30 | 상반기 협력사 격려 방문 |
| [1366](https://hi-connect.blog/1366) | 2026-07-29 | 2분기 경영 실적 |
| [1364](https://hi-connect.blog/1364) | 2026-07-28 | 협력사 스마트팩토리 구축 킥오프 |

`assets/news-*.jpg`는 각 원문의 Open Graph 썸네일입니다. 이미지의 권리는 원권리자에게 있으며, 원본 사진·로고 사용 범위는 회사의 운영 정책에 따라 관리하세요. 원문 URL은 `article-sources.json`에도 기록했습니다.

## 생성 이미지

도구: 내장 Image Gen. `assets/hero.png`는 실제 사업장이나 인물을 기록한 사진이 아닌 제조현장 연출 이미지입니다.

최종 에셋 프롬프트:

> Create only a standalone photorealistic hero asset for a Korean industrial supplier development website. Landscape wide 3:2 composition, modern construction machinery assembly plant, foreground engineer seen from behind wearing white safety helmet and navy workwear holding tablet, right large unbranded excavator cabin on assembly line, yellow overhead crane, clean blue-gray steel beams, natural daylight. Leftmost quarter relatively dark navy structural shadows, rightmost detailed machinery. Premium editorial architectural industrial photography. No logos, no text, no watermark. This is an illustrative scene not documentation of a real company factory.

전체 디자인 시안은 위 구조·색상·문구를 담은 ui-mockup으로 생성했습니다. 시안은 실행 파일에 포함하지 않으며, 현장 이미지가 제공되면 `assets/hero.png`와 대체 텍스트·연출 표기를 함께 교체하세요.
