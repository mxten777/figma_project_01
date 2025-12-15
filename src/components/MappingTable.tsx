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
    >
      <Card className="overflow-hidden shadow-xl border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 text-left font-semibold text-slate-700 dark:text-slate-300">Figma 컴포넌트</th>
              <th className="p-4 text-center w-12"></th>
              <th className="p-4 text-left font-semibold text-slate-700 dark:text-slate-300">React + Tailwind</th>
              <th className="p-4 text-left font-semibold text-slate-700 dark:text-slate-300">설명</th>
            </tr>
          </thead>
          <tbody>
            {mappingData.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors group"
                whileHover={{ scale: 1.01 }}
              >
                <td className="p-4 font-mono text-purple-600 dark:text-purple-400 font-medium">
                  <motion.span
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="inline-block"
                  >
                    {row.figma}
                  </motion.span>
                </td>
                <td className="p-4 text-center">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
                  </motion.div>
                </td>
                <td className="p-4 font-mono text-blue-700 dark:text-blue-400 text-xs bg-slate-50 dark:bg-slate-900/50">
                  <code className="p-2 rounded bg-slate-100 dark:bg-slate-800">{row.react}</code>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{row.desc}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </motion.div>
  );
}
