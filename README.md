# 📸 최애의 포토 (Favorite Photo)

디지털 포토카드를 사고팔고 교환할 수 있는 플랫폼입니다. 좋아하는 아이돌, 스포츠 스타, 일러스트 등 나만의 디지털 포토카드 컬렉션을 완성해보세요!

> 🔗 [서비스 바로가기](https://favorite-photo-3nergy.vercel.app/)　|　📖 [Storybook](https://6a20e5e80c54f49e7e40f7f1-jpbakefftj.chromatic.com/?path=/docs/ui-button--docs&globals=backgrounds.value:dark)

<br />


## 🧑‍🤝‍🧑 팀원 소개
<table align="center">
  <tbody><tr>
   <td align="center">
      <a href="https://github.com/coDribble">
        <img src="https://github.com/coDribble.png" width="100px;" alt="김상우" style="max-width: 100%;"><br>
        <sub><b>김상우</b></sub>
      </a><br>
      <sub>Frontend</sub>
    </td>   
    <td align="center">
      <a href="https://github.com/yooseohyeon">
        <img src="https://github.com/yooseohyeon.png" width="100px;" alt="유서현" style="max-width: 100%;"><br>
        <sub><b>유서현</b></sub>
      </a><br>
      <sub>Frontend Part Leader</sub>
    </td>
    <td align="center">
      <a href="https://github.com/NAYA3">
        <img src="https://github.com/NAYA3.png" width="100px;" alt="한고은" style="max-width: 100%;"><br>
        <sub><b>한고은</b></sub>
      </a><br>
      <sub>Team Leader</sub>
    </td>
  </tr>
</tbody></table>

<br/>


## 🛠 기술 스택

**Core**
 
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
 
**Infra / Deploy**
 
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
 
**Dev Tools**
 
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white)
![Chromatic](https://img.shields.io/badge/Chromatic-FC521F?style=flat-square&logo=chromatic&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

### 기술 스택 선택 이유
| 기술 | 선택 이유 |
|:---|:---|
| Next.js | App Router 기반 SSR/SSG를 활용해 초기 로딩 성능과 SEO를 개선하고,  `next/image`를 통해 이미지 최적화와 lazy loading을 적용했습니다. 또한 Route Handler를 통해 인증을 서버 레이어에서 처리하도록 구조를 분리했습니다. |
| Tailwind CSS v4 | 유틸리티 퍼스트 방식으로 별도 CSS 파일 없이 컴포넌트 단위로 스타일을 관리할 수 있어 도입했습니다. 또한 v4의 `@theme`로 디자인 토큰을 중앙 관리해 프로젝트 전체의 스타일 일관성을 유지했습니다. |
| TanStack Query | 서버 상태를 관리하기 위해 도입했습니다. 캐싱과 자동 동기화로 불필요한 API 호출로 최소화하고, `prefetchQuery`로 초기 체감 로딩 속도를 개선했습니다. |
| Cloudinary | 이미지 CDN 및 변환 기능을 활용해 포토카드 이미지 최적화를 구현했습니다. URL 기반 리사이징으로 클라이언트 부담을 줄이고, CDN으로 빠르게 로드할 수 있습니다. |
| Vercel | Next.js에 최적화된 배포 환경으로 CI/CD를 간단하게 구성할 수 있기 때문에 도입했습니다. PR 단위 preview 배포로 개발 흐름을 빠르게 검증했습니다. |
| Storybook, Chromatic | 컴포넌트를 독립적으로 개발하고 문서화하기 위해 도입했습니다. 다양한 상태를 시각적으로 확인할 수 있어 협업 효율을 개선했습니다. |
| SVGR | SVG 아이콘을 React 컴포넌트로 변환해 디자인 시스템의 일부로 관리하기 위해 도입했습니다. 색상, 크기, 상태 변화를 class 기반으로 제어할 수 있어 UI 일관성을 유지할 수 있었습니다. |
| ESLint, Prettier | 팀원 간 코드 스타일의 불일치를 방지하기 위해 도입했습니다. 특히 `prettier-plugin-tailwindcss`로 Tailwind 클래스 정렬을 자동화해 스타일 통일에 드는 시간을 줄였습니다. |


<br/>


## ✨ 주요 기능

### 🔐 인증 시스템
- 로그인 / 회원가입 / 로그아웃
- JWT 기반 인증 상태 관리
- Google OAuth 로그인 지원
- 로그인 상태 유지 및 토큰 자동 갱신

### 🖼 포토카드 시스템
- 포토카드 생성 및 조회
- 월별 생성 제한 및 보유 현황 확인

### 🛒 거래 시스템 (마켓플레이스)
- 포토카드 판매/구매 기능
- 교환 요청 및 처리 기능
- 거래 상태 실시간 반영
- 거래 이력 조회

### 💰 포인트 시스템
- 판매/구매 이벤트 기반 포인트 지급
- 포인트 사용 및 적립
- 사용자 포인트 조회

### 🔔 실시간 알림
- SSE 기반 실시간 알림
- 거래/상태 변경 알림 수신
- 알림 읽음 처리

<br/>


## 📂 폴더 구조

```
src/
├── app/                # Next.js App Router 페이지
│   ├── api/            # Route Handler
├── components/
│   ├── ui/             # 범용 UI 컴포넌트 (Button, Input, Modal 등)
│   ├── layout/         # 페이지 뼈대 (GNB, PageTitle 등)
│   └── domain/         # 서비스 도메인 컴포넌트 (photocard 등)
├── hooks/              # 커스텀 훅
├── services/           # API 호출 함수
├── icons/              # SVG 아이콘
├── lib/                # 인프라 레이어
│   ├── api/              # fetch client
│   ├── auth/             # 토큰 재발급
│   ├── react-query/      # QueryClient 설정
│   └── toast/            # 전역 토스트 서비스
├── context/            # 전역 상태 (Auth, Toast)
├── utils/              # 공통 유틸리티 함수
└── constants/          # 상수
```

<br />


## 👥 팀원별 역할
### 김상우
- 포토카드 생성 페이지 구현 (Cloudinary 업로드, API 연동)
- 마이갤러리 페이지 구현 (필터, 검색, 페이지네이션)
- 나의 판매 페이지 구현 (필터, 검색, 페이지네이션)
- 포토카드 생성 페이지 구현 (Cloudinary 업로드, 유효성 검증, API 연동)
- 공통 UI 컴포넌트 구현 (Card, Pagination, Form UI 등)

### 유서현
- 프론트엔드 아키텍처 설계 (API → Service → hook → component 레이어 분리, `QUERY_KEYS` 중앙화)
- 인증 및 전역 상태 관리 구조 설계 (Access/Refresh Token, 자동 재발급, `MutationCache` 기반 전역 에러 처리, AuthContext 기반 인증 UI 전역 관리)
- 디자인 시스템 구축 (Tailwind `@theme` 기반 디자인 토큰 중앙 관리, 공통 컴포넌트 분류 기준 정의, SVGR 및 Storybook 도입)
- React Query 기반 서버 상태 관리 (캐싱/업데이트 전략 분리 및 optimistic update 적용)
- 성능 최적화 (SSR `prefetch`, `IntersectionObserver` 기반 `prefetch`, `router.prefetch` 적용, dynamic import 적용)
- 포토카드 거래(구매/교환) 플로우 구현 
- 포토카드 판매 기능 구현 (등록/수정/중단)
- 판매 상세 페이지 구현 (상태/권한별 UI 분기)
- 모바일 필터 바텀시트 구현 (PC/모바일 통합 UX, 조건부 API 호출 및 캐싱 최적화)
- 알림 기능 구현 (이벤트 기반 알림 생성, 타입 기반 메시지 매핑, 상대 시간 포맷팅, 캐시 즉시 반영)
- 사용자 피드백 UX 개선 (초기 로딩/refeacth/무한스크롤 구분, skeleton·spinner·toast 적용)
- 공통 UI 컴포넌트 구현 (Button, Modal, BottomSheet 등)
- SEO 및 OG 메타데이터 설정

### 한고은
- 인증 시스템 구현 (회원가입, 로그인, 로그아웃, OAuth, 유효성 검사)
- 마켓플레이스 메인 페이지 (검색, 필터, 정렬, 무한 스크롤 및 API 연동)
- 랜딩 페이지 (반응형 UI 구현 및 최적화)
- 랜덤 포인트 시스템 및 랜덤 포인트 모달 UI 구현
- FloatingButtons 구현 (top 버튼, 랜덤 포인트 버튼)
- 공통 UI 컴포넌트 구현 (GNB, ProfileMenu, FilterDropdown 등)



<br/>

