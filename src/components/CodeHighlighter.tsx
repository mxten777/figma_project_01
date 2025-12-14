// CodeHighlighter.tsx
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const code = `// Hero.tsx
import { Button } from "./Button";
import { Card } from "@/components/ui/card";

export function Hero() {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 p-10 border-0 shadow-2xl">
      <section className="text-white flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold">Hero Title</h1>
        <p className="text-xl opacity-90">Figma에서 React + Tailwind로 변환된 Hero 컴포넌트입니다.</p>
        <Button variant="primary">Get Started</Button>
      </section>
    </Card>
  );
}`;

export function CodeHighlighter() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="space-y-3">
      <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
        <SyntaxHighlighter 
          language="tsx" 
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <Button
        onClick={handleCopy}
        variant="outline"
        className="w-full"
      >
        {copied ? (
          <><Check className="mr-2 h-4 w-4" /> 복사됨!</>
        ) : (
          <><Copy className="mr-2 h-4 w-4" /> 코드 복사</>
        )}
      </Button>
    </div>
  );
}
