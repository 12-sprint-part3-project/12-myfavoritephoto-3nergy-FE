# **3NERGY**

[3nergy 노션](https://app.notion.com/p/3NERGY-358f2145fdcf808ca5d2f5b6763a8d24?source=copy_link)

## **팀원 구성**

한고은 (개인 Github 링크)

김상우 (개인 Github 링크)

유서현 (개인 Github 링크)

장민주 (개인 Github 링크)

추명곤 (개인 Github 링크)

---

## **프로젝트 소개**

- "최애의 포토"는 디지털 시대의 새로운 수집 문화를 선도하는 플랫폼입니다. 자신이 좋아하는 아이돌이나 스포츠 스타, 그림 등 디지털 포토카드를 손쉽게 사고팔 수 있는 공간으로, 특별한 커뮤니티를 제공합니다. 이제는 좋아하는 포토카드를 실제로 모으는 것뿐만 아니라, 디지털 자산으로 소장하며 나만의 컬렉션을 완성할 수 있습니다. 서로의 포토카드를 교환하고, 나만의 포토카드를 자랑하는 재미와 함께 상호 교류도 즐길 수 있는 플랫폼, "최애의 포토"에서 만나보세요!
- 프로젝트 기간: 2026.06.01 ~ 2026.06.23

---

## **기술 스택**

![Frontend](https://img.shields.io/badge/Frontend-%23121011?style=for-the-badge) 

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![Next JS](https://img.shields.io/badge/Next-black.svg?style=for-the-badge&logo=next.js&logoColor=white) 
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white) 
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) 
![Prettier](https://img.shields.io/badge/prettier-%23192a32?style=for-the-badge&logo=prettier&logoColor=dc524a)

---

![Backend](https://img.shields.io/badge/Backend-%23121011?style=for-the-badge) 

![NodeJS](https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) 
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) 
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white) 
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) 
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) 
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) 
![Prettier](https://img.shields.io/badge/prettier-%23192a32?style=for-the-badge&logo=prettier&logoColor=dc524a)

bcrypt, SSE, node-cron

---

![Database](https://img.shields.io/badge/Database-%23121011?style=for-the-badge)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

---

![Tools](https://img.shields.io/badge/Tools-%23121011?style=for-the-badge)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

---

## **팀원별 구현 기능 상세**

### **유서현**


- **포토 카드 판매 등록**
    - 구글 소셜 로그인 API 사용으로 소셜 로그인 기능 구현
    - 사이트 이용을 위한 추가 정보 입력 기능 구현
- **포토 카드 상세 페이지**
    - user 타입(관리자, 학생)에 대한 조건부 추가 입력 모달창 기능 및 페이지 이동 기능 구현
- **공용 컴포넌트**
    - Spinner, EmptyPhotocardList, ResultView, Toast, CounterInput, Button, BasicModal, NotificationMenu(Item), BottomSheet, PageTitle

### **한고은**


- **랜딩페이지**
    - 회원별 버튼 조건부 렌더링(학생: 커리어, 스킬, 수강후기, 커뮤니티, 관리자: 회원 관리 관리자 페이지)
    - 반응형 레이아웃 구현
- **로그인/회원가입**
    - fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
- **마켓플레이스**
    - fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
- **공용 컴포넌트**
    - GNB, Profile, FilterDropdown, SortDropdown, FloatigButton, RandomPointModal(RandomPointButton), ScrollTopButton

### **김상우**


- **마이갤러리**
    - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
    - 반응형 레이아웃 구현
- **포토카드 생성**
    - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
    - 반응형 레이아웃 구현
- **나의 판매 포토카드**
    - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
    - 반응형 레이아웃 구현
- **공용 컴포넌트**
    - Card, ExchangeCard, Input, FileInput, Textarea, SearchBar, Select, Pagination(Page), GradeBadgeList(GradeBadge)

---

## **파일 구조**

```plaintext

src
├── app
│   ├── (auth)
│   │   ├── layout.jsx
│   │   ├── login/
│   │   │   └── page.jsx
│   │   └── signup/
│   │       └── page.jsx
│   ├── (main)
│   │   ├── layout.jsx
│   │   ├── marketplace/
│   │   │   ├── page.jsx
│   │   │   ├── _components/
│   │   │   │   ├── CreateSaleButton.jsx
│   │   │   │   ├── CreateSaleModal.jsx
│   │   │   │   ├── MarketplaceContent.jsx
│   │   │   │   ├── PhotocardFlowModal.jsx
│   │   │   │   ├── PhotocardFormLayout.jsx
│   │   │   │   ├── PhotocardSelectList.jsx
│   │   │   │   ├── PrefetchSaleCard.jsx
│   │   │   │   ├── SaleRegisterForm.jsx
│   │   │   │   └── TradeInfoForm.jsx
│   │   │   ├── [saleId]/
│   │   │   │   ├── page.jsx
│   │   │   │   ├── not-found.jsx
│   │   │   │   ├── _components/
│   │   │   │   │   ├── BuyerActions.jsx
│   │   │   │   │   ├── BuyerTradeSection.jsx
│   │   │   │   │   ├── CardDetail.jsx
│   │   │   │   │   ├── CardInfo.jsx
│   │   │   │   │   ├── ImageModal.jsx
│   │   │   │   │   ├── MyTradeOfferSection.jsx
│   │   │   │   │   ├── PhotocardImageViewer.jsx
│   │   │   │   │   ├── SaleDetailContent.jsx
│   │   │   │   │   ├── SaleEditForm.jsx
│   │   │   │   │   ├── SaleEditModal.jsx
│   │   │   │   │   ├── SellerButtons.jsx
│   │   │   │   │   ├── SellerTradeInfo.jsx
│   │   │   │   │   ├── TradeListSection.jsx
│   │   │   │   │   ├── TradeOfferForm.jsx
│   │   │   │   │   ├── TradeOfferModal.jsx
│   │   │   │   │   └── TradeOfferSection.jsx
│   │   │   │   ├── edit/
│   │   │   │   │   ├── page.jsx
│   │   │   │   │   └── SaleEditContent.jsx
│   │   │   │   ├── purchase/result/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── trade/
│   │   │   │       ├── page.jsx
│   │   │   │       ├── TradeOfferContent.jsx
│   │   │   │       └── result/
│   │   │   │           └── page.jsx
│   │   │   └── create/
│   │   │       ├── page.jsx
│   │   │       ├── SaleCreateContent.jsx
│   │   │       └── result/
│   │   │           └── page.jsx
│   │   ├── my-gallery/
│   │   │   ├── page.jsx
│   │   │   ├── _components/
│   │   │   │   ├── CardList.jsx
│   │   │   │   ├── MyGalleryCardSection.jsx
│   │   │   │   ├── MyGalleryContent.jsx
│   │   │   │   └── OwnedCardsInfo.jsx
│   │   │   └── new/
│   │   │       ├── page.jsx
│   │   │       ├── _components/
│   │   │       │   └── CreatePhotocardForm.jsx
│   │   │       └── result/
│   │   │           └── page.jsx
│   │   ├── my-notifications/
│   │   │   ├── page.jsx
│   │   │   └── NotificationsView.jsx
│   │   └── my-sales/
│   │       ├── page.jsx
│   │       └── _components/
│   │           ├── CardList.jsx
│   │           ├── MySalesCardSection.jsx
│   │           ├── MySalesContent.jsx
│   │           └── OwnedCardsInfo.jsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── google/callback/route.js
│   │   │   ├── login/route.js
│   │   │   ├── logout/route.js
│   │   │   ├── refresh/route.js
│   │   │   └── signup/route.js
│   │   └── upload/route.js
│   ├── auth/google/callback/
│   │   └── page.jsx
│   ├── providers/
│   │   └── providers.jsx
│   ├── fonts/
│   │   └── baskin-robbins-bold.woff2
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx
│   ├── error.jsx
│   └── not-found.jsx
├── components
│   ├── domain/
│   │   ├── auth/
│   │   │   ├── LoginModal.jsx
│   │   │   └── LoginModal.stories.jsx
│   │   ├── photocard/
│   │   │   ├── Card.jsx
│   │   │   ├── EmptyPhotocardList.jsx
│   │   │   ├── ExchangeCard.jsx
│   │   │   ├── ExchangeCardSkeleton.jsx
│   │   │   ├── FilterDropdown.jsx
│   │   │   ├── GradeBadge.jsx
│   │   │   ├── GradeBadgeList.jsx
│   │   │   ├── GradeBadgeListSkeleton.jsx
│   │   │   ├── MobileFilterBottomSheet.jsx
│   │   │   ├── SortDropdown.jsx
│   │   │   └── *.stories.jsx
│   │   └── point/
│   │       └── RandomPointModal.jsx
│   ├── feedback/
│   │   ├── ResultView.jsx
│   │   └── ResultView.stories.jsx
│   ├── layout/
│   │   ├── GNB/
│   │   │   ├── GNB.jsx
│   │   │   ├── NotificationItem.jsx
│   │   │   ├── NotificationMenu.jsx
│   │   │   ├── ProfileMenu.jsx
│   │   │   ├── gnb.config.js
│   │   │   └── *.stories.jsx
│   │   ├── FloatingButtons.jsx
│   │   ├── PageTitle.jsx
│   │   ├── RandomPointButton.jsx
│   │   └── ScrollTopButton.jsx
│   └── ui/
│       ├── BasicModal.jsx
│       ├── BottomSheet.jsx
│       ├── Button.jsx
│       ├── CounterInput.jsx
│       ├── FileInput.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Overlay.jsx
│       ├── Page.jsx
│       ├── Pagination.jsx
│       ├── PriceInput.jsx
│       ├── ResponsiveModal.jsx
│       ├── SearchBar.jsx
│       ├── Select.jsx
│       ├── Spinner.jsx
│       ├── Textarea.jsx
│       ├── Toast.jsx
│       ├── ToastContainer.jsx
│       └── *.stories.jsx
├── constants/
│   ├── app.js
│   ├── card.js
│   ├── errorHandler.js
│   ├── filter.js
│   ├── queryKeys.js
│   ├── routes.js
│   ├── time.js
│   └── unit.js
├── context/
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
├── hooks/
│   ├── auth/
│   │   ├── useGoogleLogin.js
│   │   ├── useLogin.js
│   │   ├── useLogout.js
│   │   └── useSignup.js
│   ├── common/
│   │   ├── useDebounce.js
│   │   ├── useDelayedLoading.js
│   │   ├── useFilterSelection.js
│   │   ├── useMediaQuery.js
│   │   ├── usePageSize.js
│   │   ├── useResponsive.js
│   │   ├── useToast.js
│   │   └── useTotalCount.js
│   ├── notification/
│   │   ├── useNotificationSSE.js
│   │   ├── useNotifications.js
│   │   └── useReadNotification.js
│   ├── photocard/
│   │   ├── useCreatePhotocard.js
│   │   ├── useOwnedQuantity.js
│   │   ├── usePhotocardFilterSelection.js
│   │   ├── usePhotocardSelectList.js
│   │   ├── usePhotocards.js
│   │   └── usePrefetchPhotocardList.js
│   ├── point/
│   │   ├── useMyPoints.js
│   │   ├── usePointCooldown.js
│   │   └── usePointEvent.js
│   ├── sale/
│   │   ├── useCancelSale.js
│   │   ├── useCreateSale.js
│   │   ├── useMySales.js
│   │   ├── useMySalesFilterSelection.js
│   │   ├── usePrefetchSaleDetail.js
│   │   ├── usePurchaseSale.js
│   │   ├── useSaleDetail.js
│   │   ├── useSaleRegisterForm.js
│   │   ├── useSales.js
│   │   ├── useSalesFilterSelection.js
│   │   └── useUpdateSale.js
│   ├── trade/
│   │   ├── useAcceptTrade.js
│   │   ├── useCancelTrade.js
│   │   ├── useCreateTrade.js
│   │   ├── useMyTradeOffer.js
│   │   ├── useRejectTrade.js
│   │   ├── useTradeOfferForm.js
│   │   └── useTrades.js
│   └── user/
│       └── useMe.js
├── icons/
│   ├── index.js
│   └── *.svg (alarm, alert, caret, chevron, close, dot, exchange, filter, ...)
├── lib/
│   ├── api/
│   │   ├── fetchClient.js
│   │   ├── fetchPublic.js
│   │   └── fetchWithAuth.js
│   ├── auth/
│   │   └── refreshToken.js
│   ├── react-query/
│   │   └── queryClient.js
│   └── toast/
│       └── toastService.js
├── services/
│   ├── auth.js
│   ├── image.js
│   ├── notification.js
│   ├── photocard.js
│   ├── point.js
│   ├── sales.js
│   ├── trade.js
│   └── user.js
├── utils/
│   ├── cloudinary.js
│   ├── format.js
│   ├── formatNotificationMessage.js
│   ├── formatRelativeTime.js
│   ├── getNotificationPath.js
│   ├── normalizeKey.js
│   ├── token.js
│   └── validators.js
└── middleware.js
```

---

## **구현 홈페이지**

[최애의 포토(3nergy)](https://favorite-photo-3nergy.vercel.app)

---

## **프로젝트 회고록**

(제작한 발표자료 링크 혹은 첨부파일 첨부)
