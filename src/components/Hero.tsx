// Hero.tsx
import { Button } from "./Button";
import { Card } from "@/components/ui/card";

export function Hero() {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 p-10 border-0 shadow-2xl">
      <section className="text-white flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">Hero Title</h1>
        <p className="text-xl opacity-90 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">Figma에서 React + Tailwind로 변환된 Hero 컴포넌트 예시입니다.</p>
        <Button variant="primary">Get Started</Button>
      </section>
    </Card>
  );
}
