// FigmaImageOverlay.tsx
import { Card } from "@/components/ui/card";
import { Layers, Layout, Palette } from "lucide-react";

export function FigmaImageOverlay() {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Figma 시안 이미지 (예시 placeholder) */}
      <Card className="w-full aspect-[16/9] bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-dashed border-slate-300 flex items-center justify-center shadow-xl overflow-hidden">
        <div className="text-center space-y-2">
          <Layers className="h-16 w-16 text-slate-400 mx-auto" />
          <span className="text-slate-500 font-medium">Figma Design Placeholder</span>
          <p className="text-xs text-slate-400">실제 프로젝트에서는 Figma iframe 또는 이미지가 표시됩니다</p>
        </div>
      </Card>
      {/* 오버레이 설명 - Glassmorphism */}
      <div className="absolute top-4 left-4 backdrop-blur-md bg-white/70 border border-white/40 text-xs rounded-xl px-4 py-3 shadow-2xl space-y-2 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <Layout className="h-3 w-3" />
          <span>Auto Layout</span>
        </div>
        <div className="text-slate-600 text-xs ml-5">
          수평 정렬, Gap 24px
        </div>
        <div className="flex items-center gap-2 font-semibold text-slate-700 mt-2">
          <Palette className="h-3 w-3" />
          <span>Styles</span>
        </div>
        <div className="text-slate-600 text-xs ml-5">
          Primary Color, Radius 16px
        </div>
      </div>
    </div>
  );
}
