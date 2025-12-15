# 🎨 Figma → Frontend 변환 데모

Figma 디자인 파일을 React + TailwindCSS 코드로 변환하는 과정을 시각적으로 보여주는 MVP 데모 애플리케이션입니다.

[![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://figma-projet-01-q9b32pf72-dongyeol-jungs-projects.vercel.app)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-FF0055?logo=framer)](https://www.framer.com/motion/)

## 📑 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [설치 및 실행](#-설치-및-실행)
- [Figma API 설정](#-figma-api-설정)
- [배포](#-배포)
- [주요 컴포넌트](#-주요-컴포넌트)
- [트러블슈팅](#-트러블슈팅)

## 🌟 프로젝트 소개

이 프로젝트는 **Figma 디자인 파일**을 실제 **프론트엔드 코드**(React + TailwindCSS)로 변환하는 과정을 6단계로 나누어 시각화합니다.

디자이너와 개발자 간의 협업 과정을 이해하고, Design-to-Code 자동화의 가능성을 탐색하기 위한 교육용/데모용 애플리케이션입니다.

### 🎯 핵심 목표

- Figma API를 활용한 디자인 데이터 추출
- 디자인 토큰(색상, 폰트) 자동 추출 및 시각화
- Figma 컴포넌트 → React 컴포넌트 매핑 관계 표현
- 실제 동작하는 React 코드 생성 및 실시간 미리보기

## ✨ 주요 기능

### 1️⃣ **Figma 파일 불러오기**
- Personal Access Token 기반 인증
- File Key 입력으로 실제 Figma 파일 로드
- Rate Limit 대응: API 차단 시 샘플 데이터로 자동 전환

### 2️⃣ **6단계 변환 프로세스**
1. **Figma Input**: 토큰 및 파일 키 입력
2. **Figma View**: 디자인 시안 시각화 (Glassmorphism 오버레이)
3. **Design Token**: 색상, 폰트, 간격, 라운드 추출 및 표시
4. **Component Mapping**: Figma 컴포넌트 → React 컴포넌트 매핑 테이블
5. **Code Output**: 생성된 React + Tailwind 코드 (문법 하이라이팅)
6. **Live Preview**: 실제 렌더링된 컴포넌트 실시간 미리보기

### 3️⃣ **프리미엄 UI/UX** ⭐ NEW!
- 🌓 **다크 모드**: 라이트/다크/시스템 테마 완벽 지원
- 🎨 **애니메이션**: Framer Motion 기반 60fps 부드러운 전환
  - 단계별 페이드인/슬라이드 전환
  - 컴포넌트 stagger 효과
  - 3D 카드 호버 효과 (rotateY)
  - 버튼 리플 효과
- 🌌 **Glassmorphism**: Backdrop blur + 그라데이션 배경
  - 애니메이션 그라데이션 (60초 루프)
  - 떠다니는 오브 효과 (3개)
- 📊 **진행 상태 표시**: 애니메이션 프로그레스 인디케이터
- ⌨️ **키보드 네비게이션**: ← → 화살표 키로 단계 이동
- 🎯 **인터랙션**: 30+ 마이크로 인터랙션
  - 클릭-투-복사 (디자인 토큰)
  - 플로팅 복사 버튼 (코드 블록)
  - 호버 시 스케일/회전 효과
- 🎨 **타이포그래피**: Inter Variable Font (300-900 weight)
- 📱 **반응형**: 모바일/태블릿/데스크탑 최적화

### 4️⃣ **자동 캐싱 시스템**
- localStorage 기반 1시간 캐싱
- 중복 API 호출 방지
- 오프라인 데모 지원

### 5️⃣ **코드 하이라이팅**
- react-syntax-highlighter 통합
- VS Code Dark Plus 테마
- 코드 복사 버튼

## 🛠 기술 스택

### Core
- **React 18** - UI 라이브러리
- **TypeScript 5.6** - 타입 안정성
- **Vite 7.2** - 빌드 도구 (HMR, 초고속 빌드)

### Styling
- **TailwindCSS 3.4.0** - 유틸리티 CSS 프레임워크
- **PostCSS** - CSS 전처리
- **shadcn/ui** - 고품질 React 컴포넌트 라이브러리

### Libraries
- **Framer Motion** - 애니메이션 라이브러리 (30+ 인터랙션)
- **lucide-react** - 아이콘 라이브러리
- **react-syntax-highlighter** - 코드 문법 하이라이팅 + 라인 넘버
- **Figma REST API** - 디자인 데이터 추출
- **Inter Font** - Google Fonts Variable Font

### DevOps
- **Vercel** - 프로덕션 배포
- **Git/GitHub** - 버전 관리

## 📂 프로젝트 구조

```
figma_projet_01/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── alert.tsx
│   │   │   └── switch.tsx
│   │   ├── FigmaInput.tsx         # Step 1: Figma 토큰/키 입력 폼
│   │   ├── FigmaImageOverlay.tsx  # Step 2: 디자인 오버레이
│   │   ├── TokenVisualizer.tsx    # Step 3: 디자인 토큰 표시
│   │   ├── MappingTable.tsx       # Step 4: 컴포넌트 매핑 테이블
│   │   ├── CodeHighlighter.tsx    # Step 5: 코드 하이라이팅
│   │   ├── Hero.tsx               # Step 6: 데모 히어로 컴포넌트
│   │   ├── Button.tsx             # Step 6: 데모 버튼 컴포넌트
│   │   ├── ThemeProvider.tsx      # 다크 모드 컨텍스트
│   │   └── ThemeToggle.tsx        # 테마 토글 버튼
│   ├── lib/
│   │   ├── figmaApi.ts            # Figma REST API 함수
│   │   └── utils.ts               # 유틸리티 함수
│   ├── App.tsx                    # 메인 애플리케이션
│   ├── main.tsx                   # 앱 진입점
│   └── index.css                  # 글로벌 스타일
├── public/                         # 정적 리소스
├── dist/                           # 빌드 출력 (gitignore)
├── .vercel/                        # Vercel 설정 (gitignore)
├── package.json                    # 의존성 관리
├── vite.config.ts                  # Vite 설정
├── tailwind.config.js              # Tailwind 설정
├── tsconfig.json                   # TypeScript 설정
└── README.md                       # 프로젝트 문서

```

## 🚀 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/mxten777/figma_project_01.git
cd figma_projet_01
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview  # 빌드 결과 미리보기
```

## 🔑 Figma API 설정

### Personal Access Token 생성

1. [Figma](https://www.figma.com/) 로그인
2. **Settings** → **Personal Access Tokens** 이동
3. **Generate new token** 클릭
4. 토큰 이름 입력 (예: "Demo App")
5. 생성된 토큰 복사 (⚠️ 한 번만 표시됨)

### File Key 찾기

Figma 파일 URL에서 추출:
```
https://www.figma.com/file/[FILE_KEY]/파일이름
                            ^^^^^^^^
                            이 부분을 복사
```

예시:
```
URL: https://www.figma.com/file/8UP3AeQzevWGEnMehSgi4f/Figma-basics
File Key: 8UP3AeQzevWGEnMehSgi4f
```

### 앱에서 사용

1. Step 1 화면에서 **File Key** 입력
2. **Personal Access Token** 입력
3. **Figma 파일 불러오기** 버튼 클릭

## 🌐 배포

### Vercel 자동 배포

```bash
# Vercel CLI 설치 (전역)
npm install -g vercel

# 프로덕션 배포
vercel --prod
```

### 수동 배포 단계

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com/) 로그인
3. **Import Project** → GitHub 저장소 선택
4. 프레임워크: **Vite** 자동 감지
5. **Deploy** 클릭

### 환경 변수 (선택사항)

현재 프로젝트는 환경 변수가 필요 없습니다. 사용자가 직접 토큰을 입력합니다.

## 🧩 주요 컴포넌트

### `App.tsx`
- 6단계 네비게이션 관리
  - 키보드 네비게이션 (useEffect → ArrowLeft/Right)
  - 애니메이션 페이지 전환 (AnimatePresence)
  - 프로그레스 인디케이터 (동적 그라디언트)
- Figma 데이터 상태 관리 (useState)
- 캐싱 로직 (localStorage, 1시간 TTL)
- 에러 핸들링 (429 Rate Limit 대응)
- 애니메이션 배경 (그라데이션 + 플로팅 오브)

### `figmaApi.ts`
```typescript
// Figma 파일 가져오기
getFigmaFile(fileKey: string, accessToken: string): Promise<FigmaFile>

// 색상 추출 (재귀적 탐색)
extractColors(node: FigmaNode): string[]

// 텍스트 스타일 추출
extractTextStyles(node: FigmaNode): FigmaTextStyle[]
```

### `TokenVisualizer.tsx`
- 추출된 디자인 토큰을 3D 카드로 표시
- **인터랙션**:
  - 클릭-투-복사 (색상 코드 복사)
  - 3D 호버 효과 (rotateY ±5도)
  - 복사 피드백 (Check 아이콘 애니메이션)
- 색상: 8개 주요 색상 (primary, secondary, accent 등)
- 폰트: 폰트 패밀리, 크기, 굵기
- 간격: 4px ~ 96px
- 라운드: 2px ~ 24px

### `ThemeProvider.tsx`
- React Context API 기반 테마 관리
- localStorage 영속성
- `light`, `dark`, `system` 모드 지원
- CSS 클래스 자동 토글 (`document.documentElement`)

## 🐛 트러블슈팅

### 1. **Figma API 429 Error (Too Many Requests)**

**증상**: "Failed to load resource: 429" 에러 발생

**원인**: Figma API rate limit 초과 (단시간 과다 요청)

**해결**:
- ✅ 5-10분 대기 후 재시도
- ✅ 앱이 자동으로 샘플 데이터로 전환 (경고 메시지 표시)
- ✅ 캐시가 있으면 자동으로 캐시 사용

### 2. **TypeScript 빌드 에러**

**증상**: `tsc -b` 실행 시 타입 에러

**해결**:
```bash
# 타입 체크
npm run build

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

### 3. **다크 모드가 작동하지 않음**

**증상**: 테마 토글 버튼 클릭해도 변화 없음

**확인**:
- `tailwind.config.js`에 `darkMode: 'class'` 설정 확인
- ThemeProvider가 `<App />` 상위에 있는지 확인
- 브라우저 localStorage 확인 (`figma-demo-theme` 키)

### 4. **shadcn/ui 컴포넌트 import 오류**

**증상**: `@/components/ui/button` import 실패

**해결**:
```bash
# vite.config.ts 확인 - 별칭 설정
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},

# @types/node 설치
npm install -D @types/node
```

### 5. **Vite HMR 연결 실패**

**증상**: Hot Module Replacement 동작 안 함

**해결**:
```bash
# 포트 충돌 확인
netstat -ano | findstr :5173

# Vite 캐시 삭제
rm -rf node_modules/.vite
npm run dev
```

## 📝 라이센스

MIT License

## 👥 기여자

- **Developer**: DONGYEOL JUNG (mxten777)
- **GitHub**: [github.com/mxten777/figma_project_01](https://github.com/mxten777/figma_project_01)

## 🙏 감사의 말

- [Figma](https://www.figma.com/) - 강력한 디자인 도구 및 API 제공
- [shadcn/ui](https://ui.shadcn.com/) - 아름다운 컴포넌트 라이브러리
- [Vercel](https://vercel.com/) - 무료 호스팅 서비스
- [Vite](https://vitejs.dev/) - 초고속 개발 환경

---

**🚀 Live Demo**: [https://figma-projet-01-q9b32pf72-dongyeol-jungs-projects.vercel.app](https://figma-projet-01-q9b32pf72-dongyeol-jungs-projects.vercel.app)

**📧 Contact**: GitHub Issues로 문의 주세요!
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
