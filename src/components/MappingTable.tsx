// MappingTable.tsx
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const mappingData = [
  {
    figma: "Button / Primary",
    react: '<Button variant="primary">텍스트</Button>',
    desc: "Primary 버튼 컴포넌트 매핑 예시",
  },
  {
    figma: "Button / Secondary",
    react: '<Button variant="secondary">텍스트</Button>',
    desc: "Secondary 버튼 컴포넌트 매핑 예시",
  },
  {
    figma: "Card / Default",
    react: '<Card><CardContent>내용</CardContent></Card>',
    desc: "카드 컴포넌트 with shadcn/ui",
  },
  {
    figma: "Alert / Info",
    react: '<Alert><AlertDescription>정보</AlertDescription></Alert>',
    desc: "알림 컴포넌트 매핑",
  },
  {
    figma: "Hero Section",
    react: '<Hero />',
    desc: "Hero 영역 전체 매핑 예시",
  },
  {
    figma: "Icon / Lucide",
    react: '<Check className="h-4 w-4" />',
    desc: "아이콘 컴포넌트 (lucide-react)",
  },
];

export function MappingTable() {
  return (
    <Card className="overflow-hidden shadow-lg border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
            <th className="p-4 text-left font-semibold text-slate-700">Figma 컴포넌트</th>
            <th className="p-4 text-center w-12"></th>
            <th className="p-4 text-left font-semibold text-slate-700">React + Tailwind</th>
            <th className="p-4 text-left font-semibold text-slate-700">설명</th>
          </tr>
        </thead>
        <tbody>
          {mappingData.map((row, i) => (
            <tr 
              key={i} 
              className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors"
            >
              <td className="p-4 font-mono text-purple-600 font-medium">{row.figma}</td>
              <td className="p-4 text-center">
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </td>
              <td className="p-4 font-mono text-blue-700 text-xs">{row.react}</td>
              <td className="p-4 text-slate-600">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
