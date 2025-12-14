import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { ThemeToggle } from "./components/ThemeToggle";
import { FigmaInput } from "./components/FigmaInput";
import { getFigmaFile, extractColors, extractTextStyles } from "@/lib/figmaApi";

const steps = [
  { label: "Figma Input" },
  { label: "Figma View" },
  { label: "Design Token" },
  { label: "Component Mapping" },
  { label: "Code Output" },
  { label: "Live Preview" },
];

import { FigmaImageOverlay } from "./components/FigmaImageOverlay";

function Step0({ onLoad, loading, error }: { onLoad: any; loading: boolean; error: string | null }) {
  return (
    <div className="space-y-6">
      <FigmaInput onLoad={onLoad} loading={loading} error={error} />
      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <b>사용법:</b><br />
          1. Figma에서 Settings → Personal Access Tokens 생성<br />
          2. Figma 파일 URL에서 File Key 복사 (예: figma.com/file/<strong>FILE_KEY</strong>/...)<br />
          3. 위 폼에 입력 후 "불러오기" 버튼 클릭
        </AlertDescription>
      </Alert>
    </div>
  );
}

function Step1() {
  return (
    <div className="space-y-6">
      <FigmaImageOverlay />
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <b>변환 설명:</b> 이 단계에서는 Figma의 Auto Layout, Constraints, Styles 등 핵심 속성을 시각적으로 확인할 수 있습니다.<br />
          실제 디자인 시안이 어떻게 구조화되어 있는지 오버레이로 보여줍니다.
        </AlertDescription>
      </Alert>
    </div>
  );
}
import { TokenVisualizer } from "./components/TokenVisualizer";
function Step2({ figmaData }: { figmaData?: any }) {
  console.log("Step2 figmaData:", figmaData); // 디버깅용
  return (
    <div className="space-y-6">
      <TokenVisualizer figmaData={figmaData} />
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <b>변환 설명:</b> Figma의 색상, 폰트, Spacing, Radius 등 Design Token이 어떻게 Tailwind의 class로 변환되는지 시각적으로 보여줍니다.<br />
          {figmaData ? '✅ 실제 Figma 파일에서 추출한 데이터입니다.' : '⚠️ 샘플 데이터입니다. Step 1에서 Figma 파일을 먼저 불러오세요.'}
        </AlertDescription>
      </Alert>
    </div>
  );
}
import { MappingTable } from "./components/MappingTable";
function Step3() {
  return (
    <div className="space-y-6">
      <MappingTable />
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <b>변환 설명:</b> Figma의 각 컴포넌트가 React + Tailwind 컴포넌트로 어떻게 매핑되는지 표로 보여줍니다.<br />
          실제 코드와 Figma 명칭의 1:1 대응을 확인할 수 있습니다.
        </AlertDescription>
      </Alert>
    </div>
  );
}
import { CodeHighlighter } from "./components/CodeHighlighter";
function Step4() {
  return (
    <div className="space-y-6">
      <CodeHighlighter />
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <b>변환 설명:</b> Figma 디자인이 실제 React + Tailwind 코드로 어떻게 변환되는지 하이라이트와 함께 보여줍니다.<br />
          코드는 읽기 전용이며, 복사 버튼을 통해 쉽게 복사할 수 있습니다.
        </AlertDescription>
      </Alert>
    </div>
  );
}
import { Hero } from "./components/Hero";
import { Button as PreviewButton } from "./components/Button";
function Step5() {
  return (
    <div className="space-y-6">
      <Hero />
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">버튼 변형</h3>
          <div className="flex gap-2">
            <PreviewButton variant="primary">Primary</PreviewButton>
            <PreviewButton variant="secondary">Secondary</PreviewButton>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">타이포그래피</h3>
          <div className="space-y-1">
            <p className="text-2xl font-bold">Heading</p>
            <p className="text-base">Body Text</p>
            <p className="text-sm text-slate-500">Small Text</p>
          </div>
        </Card>
      </div>
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <b>변환 설명:</b> 실제로 변환된 React + Tailwind 컴포넌트가 웹에서 어떻게 렌더링되는지 실시간으로 확인할 수 있습니다.<br />
          Figma 디자인이 완전히 코드로 구현된 결과물입니다.
        </AlertDescription>
      </Alert>
    </div>
  );
}

const stepComponents = [Step0, Step1, Step2, Step3, Step4, Step5];

function App() {
  const [step, setStep] = useState(0);
  const [figmaData, setFigmaData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFigmaLoad = async (fileKey: string, accessToken: string) => {
    setLoading(true);
    setError(null);
    
    // 캐시 확인
    const cacheKey = `figma_${fileKey}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const cachedData = JSON.parse(cached);
        const cacheTime = localStorage.getItem(`${cacheKey}_time`);
        const now = Date.now();
        
        // 1시간 캐시 유효
        if (cacheTime && now - parseInt(cacheTime) < 3600000) {
          setFigmaData(cachedData);
          setStep(1);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.log("캐시 읽기 실패:", e);
      // 캐시 오류는 무시하고 계속 진행
    }
    
    try {
      const data = await getFigmaFile(fileKey, accessToken);
      const colors = extractColors(data.document);
      const textStyles = extractTextStyles(data.document);
      const result = { ...data, extractedColors: colors, extractedTextStyles: textStyles };
      
      // 캐싱 (오류 발생해도 계속 진행)
      try {
        localStorage.setItem(cacheKey, JSON.stringify(result));
        localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
      } catch (e) {
        console.log("캐시 저장 실패:", e);
      }
      
      setFigmaData(result);
      setStep(1); // 자동으로 다음 단계로
    } catch (err: any) {
      // Rate limit이나 API 오류 시 샘플 데이터로 대체
      if (err.message.includes('429') || err.message.includes('Too Many Requests')) {
        setError('⚠️ Figma API 요청 한도 초과. 샘플 데이터로 데모를 진행합니다. (5-10분 후 실제 파일로 재시도 가능)');
      } else {
        setError(err.message);
      }
      
      // 샘플 데이터로 계속 진행
      const sampleData = {
        name: "Figma Demo (샘플 데이터)",
        lastModified: new Date().toISOString(),
        extractedColors: ["#5551ff", "#f24e1e", "#ff7262", "#1abcfe", "#0acf83", "#a259ff", "#ffcd29", "#000000"],
        extractedTextStyles: [
          { fontFamily: "Inter", fontSize: 48, fontWeight: 700 },
          { fontFamily: "Inter", fontSize: 32, fontWeight: 600 },
          { fontFamily: "Inter", fontSize: 24, fontWeight: 500 },
          { fontFamily: "Inter", fontSize: 16, fontWeight: 400 },
        ]
      };
      setFigmaData(sampleData);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const StepComponent = stepComponents[step];
  const stepProps: any = step === 0 
    ? { onLoad: handleFigmaLoad, loading, error }
    : { figmaData };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center py-12 px-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Figma → Frontend 변환 데모</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-center">디자인이 코드로 변환되는 과정을 단계별로 확인하세요</p>
      {figmaData && (
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          📁 불러온 파일: <strong>{figmaData.name}</strong>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {steps.map((s, i) => (
          <Button
            key={s.label}
            variant={step === i ? "default" : "outline"}
            onClick={() => setStep(i)}
            className="transition-all duration-300 hover:scale-105"
          >
            {i + 1}. {s.label}
          </Button>
        ))}
      </div>
      <Card className="w-full max-w-3xl shadow-xl border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
        <CardContent className="p-8 min-h-[400px]">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500" key={step}>
            <StepComponent {...stepProps} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
