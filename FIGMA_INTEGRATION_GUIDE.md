# 📘 Figma → Frontend 변환 및 적용 매뉴얼

> **완전 가이드**: Figma 디자인 시스템을 실제 프로젝트 코드로 변환하는 A-Z 가이드

## 📑 목차

1. [준비 단계](#1-준비-단계)
2. [Figma API 설정](#2-figma-api-설정)
3. [디자인 토큰 추출 방법](#3-디자인-토큰-추출-방법)
4. [프로젝트별 적용 방법](#4-프로젝트별-적용-방법)
5. [자동화 설정](#5-자동화-설정)
6. [트러블슈팅](#6-트러블슈팅)
7. [실전 예제](#7-실전-예제)

---

## 1. 준비 단계

### 1.1 필요한 것들

#### ✅ Figma 측
- [ ] Figma 계정 (무료/유료 모두 가능)
- [ ] 디자인 시스템이 정의된 Figma 파일
- [ ] 파일 접근 권한 (Owner 또는 Editor)

#### ✅ 개발 측
- [ ] Node.js 18+ 설치
- [ ] Git 설치
- [ ] 코드 에디터 (VS Code 권장)
- [ ] 기본 TypeScript/JavaScript 지식

### 1.2 권장 Figma 파일 구조

```
Figma 파일
├── 🎨 Design System (Page)
│   ├── Colors (Frame)
│   │   ├── Primary (#3B82F6)
│   │   ├── Secondary (#8B5CF6)
│   │   └── Accent (#EC4899)
│   ├── Typography (Frame)
│   │   ├── Heading 1 (32px, Bold)
│   │   ├── Heading 2 (24px, Bold)
│   │   └── Body (16px, Regular)
│   └── Spacing (Frame)
│       ├── xs: 4px
│       ├── sm: 8px
│       └── md: 16px
└── 🖼️ Components (Page)
    ├── Button
    ├── Card
    └── Input
```

---

## 2. Figma API 설정

### 2.1 Personal Access Token 발급

#### Step 1: Figma 설정 페이지 접속
1. [Figma](https://www.figma.com/) 로그인
2. 우측 상단 프로필 클릭
3. **Settings** 선택

#### Step 2: 토큰 생성
1. 좌측 메뉴에서 **Personal Access Tokens** 클릭
2. **Generate new token** 버튼 클릭
3. 토큰 이름 입력 (예: `Production-App`, `Dev-Environment`)
4. **Enter** 또는 **Generate** 클릭

#### Step 3: 토큰 안전하게 보관
```bash
⚠️ 중요: 토큰은 생성 직후 한 번만 표시됩니다!

✅ 올바른 보관 방법:
- .env 파일 (gitignore에 추가)
- GitHub Secrets
- 환경 변수 관리 서비스 (Vercel, Netlify)

❌ 절대 하지 말 것:
- Git 커밋에 포함
- 공개 저장소에 노출
- 코드에 하드코딩
```

**예시: .env 파일**
```env
FIGMA_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FIGMA_FILE_KEY=8UP3AeQzevWGEnMehSgi4f
```

### 2.2 File Key 찾기

#### 방법 1: URL에서 추출
```
Figma 파일 URL 구조:
https://www.figma.com/file/[FILE_KEY]/[FILE_NAME]
                          ^^^^^^^^^^^
                          이 부분이 File Key

예시:
URL: https://www.figma.com/file/8UP3AeQzevWGEnMehSgi4f/Design-System
File Key: 8UP3AeQzevWGEnMehSgi4f
```

#### 방법 2: 파일 공유 링크에서
```
공유 링크: https://www.figma.com/design/8UP3AeQzevWGEnMehSgi4f/...
File Key: 8UP3AeQzevWGEnMehSgi4f (동일)
```

### 2.3 API 테스트

```bash
# curl로 API 테스트
curl -H "X-Figma-Token: YOUR_TOKEN" \
  https://api.figma.com/v1/files/YOUR_FILE_KEY

# 성공 시 JSON 응답:
{
  "name": "Design System",
  "lastModified": "2025-12-15T10:00:00Z",
  "document": { ... }
}
```

---

## 3. 디자인 토큰 추출 방법

### 3.1 핵심 API 함수 이해

#### `getFigmaFile()` - 파일 전체 가져오기
```typescript
import axios from 'axios';

export async function getFigmaFile(fileKey: string, accessToken: string) {
  const response = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}`,
    {
      headers: {
        'X-Figma-Token': accessToken,
      },
    }
  );
  return response.data;
}

// 사용 예시
const figmaFile = await getFigmaFile(
  '8UP3AeQzevWGEnMehSgi4f',
  'figd_xxxxx'
);
console.log(figmaFile.name); // "Design System"
```

#### `extractColors()` - 색상 추출
```typescript
export function extractColors(node: any): string[] {
  const colors: string[] = [];

  function traverse(n: any) {
    // SOLID 타입의 fill만 추출
    if (n.fills && Array.isArray(n.fills)) {
      n.fills.forEach((fill: any) => {
        if (fill.type === 'SOLID' && fill.color) {
          const { r, g, b } = fill.color;
          // RGB(0-1) → HEX 변환
          const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`.toUpperCase();
          colors.push(hex);
        }
      });
    }

    // 재귀적으로 자식 노드 탐색
    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  
  // 중복 제거
  return [...new Set(colors)];
}

// 사용 예시
const colors = extractColors(figmaFile.document);
// ['#3B82F6', '#8B5CF6', '#EC4899', ...]
```

#### `extractTextStyles()` - 텍스트 스타일 추출
```typescript
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight?: number;
  letterSpacing?: number;
}

export function extractTextStyles(node: any): TextStyle[] {
  const styles: TextStyle[] = [];

  function traverse(n: any) {
    if (n.type === 'TEXT' && n.style) {
      styles.push({
        fontFamily: n.style.fontFamily || 'Inter',
        fontSize: n.style.fontSize || 16,
        fontWeight: n.style.fontWeight || 400,
        lineHeight: n.style.lineHeightPx,
        letterSpacing: n.style.letterSpacing,
      });
    }

    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  return styles;
}

// 사용 예시
const textStyles = extractTextStyles(figmaFile.document);
// [
//   { fontFamily: 'Inter', fontSize: 32, fontWeight: 700 },
//   { fontFamily: 'Inter', fontSize: 16, fontWeight: 400 }
// ]
```

### 3.2 추가 토큰 추출 함수

#### 간격(Spacing) 추출
```typescript
export function extractSpacing(node: any): number[] {
  const spacings = new Set<number>();

  function traverse(n: any) {
    // 패딩
    if (n.paddingLeft) spacings.add(n.paddingLeft);
    if (n.paddingTop) spacings.add(n.paddingTop);
    
    // 마진 (Auto Layout의 itemSpacing)
    if (n.itemSpacing) spacings.add(n.itemSpacing);
    
    // Gap
    if (n.primaryAxisSpacing) spacings.add(n.primaryAxisSpacing);
    if (n.counterAxisSpacing) spacings.add(n.counterAxisSpacing);

    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  return Array.from(spacings).sort((a, b) => a - b);
}

// 결과: [4, 8, 12, 16, 24, 32, 48, 64]
```

#### 테두리 반경(Border Radius) 추출
```typescript
export function extractBorderRadius(node: any): number[] {
  const radii = new Set<number>();

  function traverse(n: any) {
    if (n.cornerRadius !== undefined) {
      radii.add(n.cornerRadius);
    }
    
    // 개별 코너
    if (n.rectangleCornerRadii) {
      n.rectangleCornerRadii.forEach((r: number) => radii.add(r));
    }

    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  return Array.from(radii).sort((a, b) => a - b);
}

// 결과: [0, 4, 8, 16, 24, 9999]
```

#### 그림자(Shadow) 추출
```typescript
export interface Shadow {
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

export function extractShadows(node: any): Shadow[] {
  const shadows: Shadow[] = [];

  function traverse(n: any) {
    if (n.effects && Array.isArray(n.effects)) {
      n.effects.forEach((effect: any) => {
        if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
          const { r, g, b, a } = effect.color;
          shadows.push({
            type: effect.type,
            x: effect.offset?.x || 0,
            y: effect.offset?.y || 0,
            blur: effect.radius || 0,
            spread: effect.spread || 0,
            color: `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`,
          });
        }
      });
    }

    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  return shadows;
}
```

---

## 4. 프로젝트별 적용 방법

### 4.1 React + Tailwind CSS

#### Step 1: 프로젝트 설정
```bash
# 새 프로젝트 생성
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install

# Tailwind 설치
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Figma API 함수 복사
mkdir src/lib
# figmaApi.ts를 src/lib/에 복사
```

#### Step 2: 토큰 생성 스크립트
```typescript
// scripts/generateTokens.ts
import { getFigmaFile, extractColors, extractTextStyles } from '../src/lib/figmaApi';
import fs from 'fs';

async function generateTailwindTokens() {
  const fileKey = process.env.FIGMA_FILE_KEY!;
  const token = process.env.FIGMA_TOKEN!;

  // 1. Figma 파일 로드
  console.log('📥 Figma 파일 로딩...');
  const figmaFile = await getFigmaFile(fileKey, token);

  // 2. 색상 추출
  console.log('🎨 색상 추출 중...');
  const colors = extractColors(figmaFile.document);

  // 3. 텍스트 스타일 추출
  console.log('📝 텍스트 스타일 추출 중...');
  const textStyles = extractTextStyles(figmaFile.document);

  // 4. Tailwind Config 생성
  const tailwindConfig = {
    theme: {
      extend: {
        colors: {
          primary: colors[0] || '#3B82F6',
          secondary: colors[1] || '#8B5CF6',
          accent: colors[2] || '#EC4899',
          neutral: {
            50: colors[3] || '#F9FAFB',
            100: colors[4] || '#F3F4F6',
            900: colors[5] || '#111827',
          },
        },
        fontSize: {
          'heading-1': [`${textStyles[0]?.fontSize || 32}px`, {
            lineHeight: '1.2',
            fontWeight: textStyles[0]?.fontWeight || 700,
          }],
          'heading-2': [`${textStyles[1]?.fontSize || 24}px`, {
            lineHeight: '1.3',
            fontWeight: textStyles[1]?.fontWeight || 600,
          }],
          'body': [`${textStyles[2]?.fontSize || 16}px`, {
            lineHeight: '1.5',
            fontWeight: textStyles[2]?.fontWeight || 400,
          }],
        },
      },
    },
  };

  // 5. 파일 저장
  fs.writeFileSync(
    './src/tokens.json',
    JSON.stringify(tailwindConfig, null, 2)
  );

  console.log('✅ 토큰 생성 완료: src/tokens.json');
}

generateTailwindTokens().catch(console.error);
```

#### Step 3: Tailwind Config 통합
```javascript
// tailwind.config.js
import tokens from './src/tokens.json';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: tokens.theme.extend,
  },
  plugins: [],
};
```

#### Step 4: 사용 예시
```tsx
// src/components/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-primary text-white px-6 py-3 rounded-lg font-heading-2 hover:bg-primary/90 transition">
      {children}
    </button>
  );
}

// src/App.tsx
export default function App() {
  return (
    <div className="bg-neutral-50 min-h-screen p-8">
      <h1 className="text-heading-1 text-neutral-900 mb-4">
        Figma 디자인 시스템
      </h1>
      <Button>시작하기</Button>
    </div>
  );
}
```

### 4.2 Next.js 프로젝트

#### Step 1: API Route 생성
```typescript
// app/api/figma-tokens/route.ts
import { NextResponse } from 'next/server';
import { getFigmaFile, extractColors, extractTextStyles } from '@/lib/figmaApi';

export async function GET() {
  try {
    const figmaFile = await getFigmaFile(
      process.env.FIGMA_FILE_KEY!,
      process.env.FIGMA_TOKEN!
    );

    const tokens = {
      colors: extractColors(figmaFile.document),
      textStyles: extractTextStyles(figmaFile.document),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(tokens);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Figma tokens' },
      { status: 500 }
    );
  }
}
```

#### Step 2: 클라이언트 Hook
```typescript
// hooks/useDesignTokens.ts
'use client';

import { useState, useEffect } from 'react';

interface DesignTokens {
  colors: string[];
  textStyles: any[];
  updatedAt: string;
}

export function useDesignTokens() {
  const [tokens, setTokens] = useState<DesignTokens | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTokens() {
      // 1. 로컬 캐시 확인
      const cached = localStorage.getItem('design-tokens');
      if (cached) {
        const parsed = JSON.parse(cached);
        // 1시간 이내면 캐시 사용
        if (Date.now() - new Date(parsed.updatedAt).getTime() < 3600000) {
          setTokens(parsed);
          setLoading(false);
          return;
        }
      }

      // 2. API에서 새로 가져오기
      const response = await fetch('/api/figma-tokens');
      const data = await response.json();
      
      setTokens(data);
      localStorage.setItem('design-tokens', JSON.stringify(data));
      setLoading(false);
    }

    loadTokens();
  }, []);

  return { tokens, loading };
}
```

#### Step 3: 컴포넌트에서 사용
```tsx
// app/page.tsx
'use client';

import { useDesignTokens } from '@/hooks/useDesignTokens';

export default function Home() {
  const { tokens, loading } = useDesignTokens();

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1 style={{ color: tokens?.colors[0] }}>
        디자인 시스템
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {tokens?.colors.map((color, i) => (
          <div
            key={i}
            className="h-20 rounded"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
```

### 4.3 순수 CSS 변수 생성

```typescript
// scripts/generateCSS.ts
import { getFigmaFile, extractColors, extractTextStyles, extractSpacing } from './figmaApi';
import fs from 'fs';

async function generateCSS() {
  const figmaFile = await getFigmaFile(
    process.env.FIGMA_FILE_KEY!,
    process.env.FIGMA_TOKEN!
  );

  const colors = extractColors(figmaFile.document);
  const textStyles = extractTextStyles(figmaFile.document);
  const spacings = extractSpacing(figmaFile.document);

  const css = `
:root {
  /* Colors */
${colors.map((color, i) => `  --color-${i}: ${color};`).join('\n')}

  /* Typography */
${textStyles.map((style, i) => `  --font-size-${i}: ${style.fontSize}px;
  --font-weight-${i}: ${style.fontWeight};
  --font-family-${i}: ${style.fontFamily};`).join('\n')}

  /* Spacing */
${spacings.map((space, i) => `  --spacing-${i}: ${space}px;`).join('\n')}
}

/* Utility Classes */
${colors.map((color, i) => `.bg-color-${i} { background-color: var(--color-${i}); }
.text-color-${i} { color: var(--color-${i}); }`).join('\n')}

${textStyles.map((_, i) => `.text-${i} {
  font-size: var(--font-size-${i});
  font-weight: var(--font-weight-${i});
  font-family: var(--font-family-${i});
}`).join('\n')}
  `.trim();

  fs.writeFileSync('./src/tokens.css', css);
  console.log('✅ CSS 변수 생성 완료!');
}

generateCSS();
```

**생성된 CSS 사용:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="tokens.css">
</head>
<body>
  <h1 class="text-0 text-color-0">제목</h1>
  <div class="bg-color-1" style="padding: var(--spacing-2)">
    컨텐츠
  </div>
</body>
</html>
```

### 4.4 React Native

```typescript
// utils/designTokens.ts
import { getFigmaFile, extractColors, extractTextStyles } from './figmaApi';

export async function generateReactNativeTokens() {
  const figmaFile = await getFigmaFile(
    process.env.FIGMA_FILE_KEY!,
    process.env.FIGMA_TOKEN!
  );

  const colors = extractColors(figmaFile.document);
  const textStyles = extractTextStyles(figmaFile.document);

  return {
    colors: {
      primary: colors[0],
      secondary: colors[1],
      background: colors[2],
      text: colors[3],
    },
    typography: {
      h1: {
        fontSize: textStyles[0]?.fontSize || 32,
        fontWeight: String(textStyles[0]?.fontWeight || 700) as any,
        fontFamily: textStyles[0]?.fontFamily || 'System',
      },
      body: {
        fontSize: textStyles[1]?.fontSize || 16,
        fontWeight: String(textStyles[1]?.fontWeight || 400) as any,
        fontFamily: textStyles[1]?.fontFamily || 'System',
      },
    },
  };
}

// 사용 예시
import { StyleSheet, Text, View } from 'react-native';
import tokens from './tokens.json';

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.background,
    padding: 20,
  },
  title: {
    fontSize: tokens.typography.h1.fontSize,
    fontWeight: tokens.typography.h1.fontWeight,
    color: tokens.colors.text,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Figma!</Text>
    </View>
  );
}
```

---

## 5. 자동화 설정

### 5.1 로컬 자동화 (npm scripts)

```json
// package.json
{
  "scripts": {
    "tokens:extract": "tsx scripts/generateTokens.ts",
    "tokens:watch": "nodemon --watch figma.json --exec npm run tokens:extract",
    "prebuild": "npm run tokens:extract",
    "dev": "npm run tokens:extract && vite",
    "build": "npm run tokens:extract && vite build"
  },
  "devDependencies": {
    "tsx": "^4.7.0",
    "nodemon": "^3.0.2"
  }
}
```

### 5.2 GitHub Actions 자동화

```yaml
# .github/workflows/sync-figma-tokens.yml
name: Sync Figma Design Tokens

on:
  # 매일 오전 9시 (KST 기준)
  schedule:
    - cron: '0 0 * * *'  # UTC 00:00 = KST 09:00
  
  # 수동 실행
  workflow_dispatch:
  
  # main 브랜치에 푸시될 때
  push:
    branches: [main]
    paths:
      - 'figma.config.json'  # 설정 파일 변경 시

jobs:
  sync-tokens:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout 코드
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Node.js 설정
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: 의존성 설치
        run: npm ci
      
      - name: Figma 토큰 추출
        env:
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
          FIGMA_TOKEN: ${{ secrets.FIGMA_TOKEN }}
        run: npm run tokens:extract
      
      - name: 변경사항 확인
        id: check_changes
        run: |
          git diff --exit-code src/tokens.json || echo "changed=true" >> $GITHUB_OUTPUT
      
      - name: PR 생성
        if: steps.check_changes.outputs.changed == 'true'
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: 'chore: Update design tokens from Figma'
          title: '🎨 Design Tokens Update'
          body: |
            ## Figma 디자인 토큰 자동 업데이트
            
            Figma 파일의 최신 디자인 시스템을 반영했습니다.
            
            ### 변경사항
            - 색상 팔레트 업데이트
            - 타이포그래피 스타일 동기화
            - 간격 시스템 갱신
            
            **생성 시간**: ${{ github.run_started_at }}
            **Figma 파일**: `${{ secrets.FIGMA_FILE_KEY }}`
            
            ### 검토 사항
            - [ ] 색상 변경사항 확인
            - [ ] 텍스트 스타일 검증
            - [ ] 기존 컴포넌트와 호환성 확인
          branch: figma-tokens-update-${{ github.run_number }}
          labels: design-system, automated
      
      - name: Slack 알림 (선택)
        if: steps.check_changes.outputs.changed == 'true'
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          payload: |
            {
              "text": "🎨 Figma 디자인 토큰이 업데이트되었습니다!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Figma Design Tokens Updated*\n새로운 PR이 생성되었습니다."
                  }
                }
              ]
            }
```

**GitHub Secrets 설정:**
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. **New repository secret** 클릭
3. 추가할 secrets:
   - `FIGMA_FILE_KEY`: Figma 파일 키
   - `FIGMA_TOKEN`: Personal Access Token
   - `SLACK_WEBHOOK_URL`: (선택) Slack 알림용

### 5.3 Vercel/Netlify 빌드 훅

#### Vercel 설정
```javascript
// vercel.json
{
  "buildCommand": "npm run tokens:extract && npm run build",
  "env": {
    "FIGMA_FILE_KEY": "@figma-file-key",
    "FIGMA_TOKEN": "@figma-token"
  }
}
```

**환경 변수 설정:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. `FIGMA_FILE_KEY`와 `FIGMA_TOKEN` 추가
3. Production, Preview, Development 모두 체크

#### Netlify 설정
```toml
# netlify.toml
[build]
  command = "npm run tokens:extract && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

### 5.4 Figma Webhook 설정 (실시간 동기화)

#### Step 1: Webhook 엔드포인트 생성
```typescript
// api/figma-webhook.ts (Vercel Serverless Function)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Figma에서 온 요청인지 검증
  const signature = req.headers['x-figma-signature'];
  if (!verifySignature(signature, req.body)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { event_type, file_key, timestamp } = req.body;

  console.log(`📥 Figma Webhook: ${event_type} for file ${file_key}`);

  if (event_type === 'FILE_UPDATE') {
    try {
      // 토큰 재추출
      await execAsync('npm run tokens:extract');
      
      // Git 커밋 & 푸시
      await execAsync(`
        git config user.name "Figma Bot"
        git config user.email "bot@example.com"
        git add src/tokens.json
        git commit -m "chore: Auto-update tokens from Figma webhook [${timestamp}]"
        git push
      `);

      return res.status(200).json({ 
        success: true, 
        message: 'Tokens updated successfully' 
      });
    } catch (error) {
      console.error('Webhook 처리 실패:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  return res.status(200).json({ received: true });
}

function verifySignature(signature: string, body: any): boolean {
  // Figma webhook signature 검증 로직
  const crypto = require('crypto');
  const secret = process.env.FIGMA_WEBHOOK_SECRET!;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  return hash === signature;
}
```

#### Step 2: Figma에서 Webhook 등록
1. Figma 파일 → 우측 상단 Share → Webhooks
2. **Add webhook** 클릭
3. URL 입력: `https://your-domain.com/api/figma-webhook`
4. Events 선택: `FILE_UPDATE`
5. Secret 생성 및 환경 변수에 저장

---

## 6. 트러블슈팅

### 6.1 API 관련 문제

#### ❌ 429 Too Many Requests
```
Error: Request failed with status code 429
```

**원인:** Figma API rate limit 초과 (분당 최대 요청 수 제한)

**해결 방법:**
```typescript
// 캐싱 구현
import fs from 'fs';

async function getCachedFigmaFile(fileKey: string, token: string) {
  const cacheFile = './figma-cache.json';
  const cacheExpiry = 3600000; // 1시간

  // 캐시 확인
  if (fs.existsSync(cacheFile)) {
    const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    const age = Date.now() - cache.timestamp;
    
    if (age < cacheExpiry) {
      console.log('✅ 캐시에서 로드');
      return cache.data;
    }
  }

  // 새로 가져오기
  console.log('📥 Figma API 호출');
  const data = await getFigmaFile(fileKey, token);
  
  // 캐시 저장
  fs.writeFileSync(cacheFile, JSON.stringify({
    timestamp: Date.now(),
    data,
  }));

  return data;
}
```

#### ❌ 403 Forbidden
```
Error: Access denied
```

**원인:**
1. 잘못된 Personal Access Token
2. 파일 접근 권한 없음

**해결:**
```bash
# 토큰 확인
echo $FIGMA_TOKEN

# 새 토큰 발급
# Figma → Settings → Personal Access Tokens → Generate new token

# 파일 권한 확인
# Figma 파일 → Share → "Anyone with the link" 또는 팀원 초대
```

#### ❌ 404 Not Found
```
Error: File not found
```

**원인:** 잘못된 File Key

**해결:**
```typescript
// File Key 검증
function isValidFileKey(key: string): boolean {
  return /^[a-zA-Z0-9]{22}$/.test(key);
}

const fileKey = '8UP3AeQzevWGEnMehSgi4f';
if (!isValidFileKey(fileKey)) {
  throw new Error('Invalid File Key format');
}
```

### 6.2 토큰 추출 문제

#### ❌ 색상이 추출되지 않음

**원인:** Figma에서 Gradient나 Image fill 사용

**해결:**
```typescript
export function extractAllFills(node: any): string[] {
  const fills: string[] = [];

  function traverse(n: any) {
    if (n.fills && Array.isArray(n.fills)) {
      n.fills.forEach((fill: any) => {
        switch (fill.type) {
          case 'SOLID':
            fills.push(rgbToHex(fill.color));
            break;
          case 'GRADIENT_LINEAR':
            // Gradient의 첫 번째/마지막 색상 추출
            fill.gradientStops.forEach((stop: any) => {
              fills.push(rgbToHex(stop.color));
            });
            break;
          case 'IMAGE':
            // 이미지는 스킵
            break;
        }
      });
    }
    if (n.children) n.children.forEach(traverse);
  }

  traverse(node);
  return [...new Set(fills)];
}
```

#### ❌ 텍스트 스타일이 없음

**원인:** TEXT 노드가 없거나 스타일이 정의되지 않음

**해결:**
```typescript
// 기본값 사용
const defaultTextStyles = [
  { fontFamily: 'Inter', fontSize: 32, fontWeight: 700 },
  { fontFamily: 'Inter', fontSize: 24, fontWeight: 600 },
  { fontFamily: 'Inter', fontSize: 16, fontWeight: 400 },
];

const extractedStyles = extractTextStyles(figmaFile.document);
const finalStyles = extractedStyles.length > 0 
  ? extractedStyles 
  : defaultTextStyles;
```

### 6.3 빌드 및 배포 문제

#### ❌ TypeScript 에러: `Cannot find module`
```
Error: Cannot find module './figmaApi'
```

**해결:**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

// 절대 경로 사용
import { getFigmaFile } from '@/lib/figmaApi';
```

#### ❌ 환경 변수가 undefined
```
Error: FIGMA_TOKEN is undefined
```

**해결:**
```typescript
// .env.example 생성
FIGMA_TOKEN=your_token_here
FIGMA_FILE_KEY=your_file_key_here

// 환경 변수 검증
if (!process.env.FIGMA_TOKEN) {
  throw new Error('FIGMA_TOKEN 환경 변수가 설정되지 않았습니다.');
}
```

---

## 7. 실전 예제

### 7.1 완전한 예제: E-commerce 프로젝트

#### 프로젝트 구조
```
ecommerce-app/
├── figma/
│   ├── api.ts                 # Figma API 함수
│   ├── extractors.ts          # 토큰 추출 함수
│   └── generators.ts          # 코드 생성기
├── scripts/
│   └── sync-tokens.ts         # 동기화 스크립트
├── src/
│   ├── styles/
│   │   ├── tokens.css         # 생성된 CSS 변수
│   │   └── tailwind.css
│   ├── config/
│   │   └── design-tokens.json # 생성된 토큰
│   └── components/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── ProductCard.tsx
└── package.json
```

#### 1. Figma 파일 구조 (디자이너 작업)
```
E-commerce Design System
├── 🎨 Foundation
│   ├── Colors
│   │   ├── Primary: #FF6B6B (브랜드 컬러)
│   │   ├── Secondary: #4ECDC4
│   │   ├── Success: #95E1D3
│   │   ├── Error: #F38181
│   │   └── Neutral: #F5F5F5, #E0E0E0, #333333
│   ├── Typography
│   │   ├── Display: Montserrat 48px Bold
│   │   ├── Heading: Montserrat 32px Semibold
│   │   ├── Subheading: Montserrat 24px Medium
│   │   └── Body: Inter 16px Regular
│   └── Spacing
│       ├── xs: 4px
│       ├── sm: 8px
│       ├── md: 16px
│       ├── lg: 24px
│       └── xl: 48px
└── 🧩 Components
    ├── Button (Primary, Secondary, Ghost)
    ├── Card (Product, Category)
    ├── Input (Text, Search)
    └── Badge (Sale, New, Bestseller)
```

#### 2. 추출 스크립트
```typescript
// figma/extractors.ts
export function extractDesignSystem(figmaFile: any) {
  return {
    colors: {
      brand: {
        primary: extractColorByName(figmaFile, 'Primary'),
        secondary: extractColorByName(figmaFile, 'Secondary'),
      },
      semantic: {
        success: extractColorByName(figmaFile, 'Success'),
        error: extractColorByName(figmaFile, 'Error'),
        warning: extractColorByName(figmaFile, 'Warning'),
      },
      neutral: extractNeutralColors(figmaFile),
    },
    typography: {
      fontFamily: {
        display: 'Montserrat',
        body: 'Inter',
      },
      fontSize: extractFontSizes(figmaFile),
      fontWeight: extractFontWeights(figmaFile),
    },
    spacing: extractSpacingScale(figmaFile),
    borderRadius: extractBorderRadii(figmaFile),
    shadows: extractShadows(figmaFile),
  };
}

function extractColorByName(figmaFile: any, name: string): string {
  // 특정 이름의 프레임에서 색상 찾기
  function findFrame(node: any, targetName: string): any {
    if (node.name === targetName && node.type === 'FRAME') {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const found = findFrame(child, targetName);
        if (found) return found;
      }
    }
    return null;
  }

  const frame = findFrame(figmaFile.document, name);
  if (frame && frame.fills && frame.fills[0]) {
    return rgbToHex(frame.fills[0].color);
  }
  return '#000000';
}
```

#### 3. Tailwind Config 생성
```typescript
// figma/generators.ts
export function generateTailwindConfig(designSystem: any) {
  return {
    theme: {
      extend: {
        colors: {
          primary: designSystem.colors.brand.primary,
          secondary: designSystem.colors.brand.secondary,
          success: designSystem.colors.semantic.success,
          error: designSystem.colors.semantic.error,
          neutral: designSystem.colors.neutral,
        },
        fontFamily: {
          display: [designSystem.typography.fontFamily.display, 'sans-serif'],
          body: [designSystem.typography.fontFamily.body, 'sans-serif'],
        },
        fontSize: designSystem.typography.fontSize,
        spacing: designSystem.spacing,
        borderRadius: designSystem.borderRadius,
        boxShadow: designSystem.shadows,
      },
    },
  };
}
```

#### 4. 컴포넌트 구현
```tsx
// src/components/ProductCard.tsx
import { useDesignTokens } from '@/hooks/useDesignTokens';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-md">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-sm"
      />
      
      {product.badge && (
        <span className="inline-block bg-primary text-white px-sm py-xs rounded-full text-sm font-semibold mb-sm">
          {product.badge}
        </span>
      )}
      
      <h3 className="text-heading font-display font-semibold text-neutral-900 mb-xs">
        {product.name}
      </h3>
      
      <p className="text-body font-body text-neutral-600 mb-md">
        {product.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          ${product.price}
        </span>
        
        <button className="bg-primary hover:bg-primary/90 text-white px-lg py-sm rounded-lg transition font-semibold">
          장바구니
        </button>
      </div>
    </div>
  );
}
```

#### 5. 자동 동기화 설정
```json
// package.json
{
  "scripts": {
    "figma:sync": "tsx scripts/sync-tokens.ts",
    "figma:watch": "nodemon --watch figma.config.json --exec npm run figma:sync",
    "dev": "npm run figma:sync && next dev",
    "build": "npm run figma:sync && next build"
  }
}
```

```typescript
// scripts/sync-tokens.ts
import { getFigmaFile } from '../figma/api';
import { extractDesignSystem } from '../figma/extractors';
import { generateTailwindConfig, generateCSSVariables } from '../figma/generators';
import fs from 'fs';

async function syncTokens() {
  console.log('🎨 Figma 디자인 토큰 동기화 시작...\n');

  // 1. Figma 파일 로드
  const figmaFile = await getFigmaFile(
    process.env.FIGMA_FILE_KEY!,
    process.env.FIGMA_TOKEN!
  );
  console.log('✅ Figma 파일 로드 완료');

  // 2. 디자인 시스템 추출
  const designSystem = extractDesignSystem(figmaFile);
  console.log('✅ 디자인 시스템 추출 완료');
  console.log(`   - 색상: ${Object.keys(designSystem.colors).length}개`);
  console.log(`   - 타이포그래피: ${Object.keys(designSystem.typography).length}개`);

  // 3. Tailwind Config 생성
  const tailwindConfig = generateTailwindConfig(designSystem);
  fs.writeFileSync(
    './src/config/design-tokens.json',
    JSON.stringify(tailwindConfig, null, 2)
  );
  console.log('✅ Tailwind Config 생성 완료');

  // 4. CSS 변수 생성
  const cssVars = generateCSSVariables(designSystem);
  fs.writeFileSync('./src/styles/tokens.css', cssVars);
  console.log('✅ CSS 변수 생성 완료');

  // 5. 메타데이터 저장
  fs.writeFileSync('./src/config/design-system-meta.json', JSON.stringify({
    lastSync: new Date().toISOString(),
    figmaFileKey: process.env.FIGMA_FILE_KEY,
    version: figmaFile.version,
  }, null, 2));

  console.log('\n🎉 동기화 완료!\n');
}

syncTokens().catch(console.error);
```

### 7.2 실행 결과

```bash
$ npm run figma:sync

🎨 Figma 디자인 토큰 동기화 시작...

✅ Figma 파일 로드 완료
✅ 디자인 시스템 추출 완료
   - 색상: 12개
   - 타이포그래피: 8개
✅ Tailwind Config 생성 완료
✅ CSS 변수 생성 완료

🎉 동기화 완료!
```

**생성된 파일:**
```css
/* src/styles/tokens.css */
:root {
  --color-primary: #FF6B6B;
  --color-secondary: #4ECDC4;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --font-size-display: 48px;
  --font-weight-bold: 700;
}
```

```json
// src/config/design-tokens.json
{
  "theme": {
    "extend": {
      "colors": {
        "primary": "#FF6B6B",
        "secondary": "#4ECDC4"
      }
    }
  }
}
```

---

## 🎓 학습 리소스

### 공식 문서
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [TailwindCSS Configuration](https://tailwindcss.com/docs/configuration)

### 추천 도구
- [Figma to Code](https://www.figma.com/community/plugin/842128343887142055/Figma-to-Code) - 플러그인
- [Style Dictionary](https://amzn.github.io/style-dictionary/) - 토큰 변환 프레임워크
- [Theo](https://github.com/salesforce-ux/theo) - Design token 생성기

### 커뮤니티
- [Figma Community](https://www.figma.com/community)
- [Design Tokens W3C](https://design-tokens.github.io/community-group/)

---

## 📞 지원

문제가 발생하거나 질문이 있으시면:
- GitHub Issues: [프로젝트 저장소 URL]
- 이메일: your-email@example.com
- Slack: #design-system 채널

---

**마지막 업데이트**: 2025년 12월 15일  
**버전**: 1.0.0  
**작성자**: DONGYEOL JUNG
