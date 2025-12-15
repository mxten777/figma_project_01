// TokenVisualizer.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const sampleTokens = {
  color: {
    primary: "#2563eb",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    background: "#f1f5f9",
    surface: "#ffffff",
    text: "#0f172a",
  },
  font: {
    family: "Inter, sans-serif",
    heading: "2.5rem (40px)",
    body: "1rem (16px)",
    small: "0.875rem (14px)",
    weight: "700",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
  radius: {
    sm: "0.5rem (8px)",
    md: "0.75rem (12px)",
    lg: "1rem (16px)",
    xl: "1.5rem (24px)",
  },
};

export function TokenVisualizer({ tokens = sampleTokens, figmaData }: { tokens?: any; figmaData?: any }) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  console.log("TokenVisualizer figmaData:", figmaData); // 디버깅
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };
  
  // Figma 데이터가 있으면 실제 추출한 데이터 사용
  const displayTokens = figmaData?.extractedColors ? {
    color: figmaData.extractedColors.slice(0, 8).reduce((acc: any, color: string, i: number) => {
      const names = ['primary', 'secondary', 'success', 'warning', 'danger', 'background', 'surface', 'text'];
      acc[names[i] || `color${i + 1}`] = color;
      return acc;
    }, {}),
    font: figmaData.extractedTextStyles?.[0] ? {
      family: figmaData.extractedTextStyles[0].fontFamily || "Inter, sans-serif",
      heading: figmaData.extractedTextStyles[0].fontSize ? `${figmaData.extractedTextStyles[0].fontSize}px` : "2.5rem (40px)",
      body: "1rem (16px)",
      small: "0.875rem (14px)",
      weight: String(figmaData.extractedTextStyles[0].fontWeight || "700"),
    } : tokens.font,
    spacing: tokens.spacing,
    radius: tokens.radius,
  } : tokens;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Colors Card with 3D Effect */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ perspective: 1000 }}
      >
        <Card className="shadow-xl border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(displayTokens.color).map(([key, value]: [string, any], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all cursor-pointer"
                onClick={() => copyToClipboard(value)}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-sm font-medium capitalize">{key}</span>
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-10 h-10 rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-md" 
                    style={{ backgroundColor: value }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <code className="text-xs text-slate-600 dark:text-slate-400 font-mono">{value}</code>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: copiedColor === value ? 1 : 0 }}
                    className="ml-2"
                  >
                    {copiedColor === value ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Typography Card */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ perspective: 1000 }}
      >
        <Card className="shadow-xl border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <motion.div 
              className="p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Font Family</div>
              <div className="font-medium" style={{ fontFamily: displayTokens.font.family }}>{displayTokens.font.family}</div>
            </motion.div>
            <motion.div 
              className="p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Heading Size</div>
              <div className="font-medium text-2xl">{displayTokens.font.heading}</div>
            </motion.div>
            <motion.div 
              className="p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Weight</div>
              <div style={{ fontWeight: displayTokens.font.weight }} className="text-lg">{displayTokens.font.weight}</div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Spacing Card */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ perspective: 1000 }}
      >
        <Card className="shadow-xl border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-green-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Spacing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(displayTokens.spacing).map(([key, value]: [string, any], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex justify-between items-center p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-sm font-medium capitalize">{key}</span>
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-green-500 rounded" style={{ width: value }} />
                  <code className="text-xs text-slate-600 dark:text-slate-400 font-mono">{value}</code>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Radius Card */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ perspective: 1000 }}
      >
        <Card className="shadow-xl border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-orange-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Radius
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(displayTokens.radius).map(([key, value]: [string, any], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-sm font-medium capitalize">{key}</span>
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-slate-300 dark:border-slate-600 shadow-md" 
                    style={{ borderRadius: value }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <code className="text-xs text-slate-600 dark:text-slate-400 font-mono">{value}</code>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
