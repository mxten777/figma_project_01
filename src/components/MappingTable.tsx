// MappingTable.tsx
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="overflow-x-auto shadow-xl border-slate-200 dark:border-slate-700">
        <div className="min-w-full">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-b-2 border-slate-300 dark:border-slate-600">
                <th className="p-4 text-left font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Figma 컴포넌트</th>
                <th className="p-4 text-center w-16"></th>
                <th className="p-4 text-left font-semibold text-slate-700 dark:text-slate-300 min-w-[300px]">React + Tailwind</th>
                <th className="p-4 text-left font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">설명</th>
              </tr>
            </thead>
            <tbody>
              {mappingData.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors group"
                  style={{ transform: 'none' }}
                >
                  <td className="p-4 font-mono text-purple-600 dark:text-purple-400 font-medium align-top whitespace-nowrap">
                    {row.figma}
                  </td>
                  <td className="p-4 text-center align-middle">
                    <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors mx-auto" />
                  </td>
                  <td className="p-4 align-top">
                    <code className="block p-3 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-blue-700 dark:text-blue-400 text-xs overflow-x-auto whitespace-pre-wrap break-all">
                      {row.react}
                    </code>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 align-top">
                    {row.desc}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
