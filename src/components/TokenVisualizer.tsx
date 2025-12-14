// TokenVisualizer.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  console.log("TokenVisualizer figmaData:", figmaData); // 디버깅
  
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
    <div className="grid grid-cols-2 gap-4">
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(displayTokens.color).map(([key, value]: [string, any]) => (
            <div key={key} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition">
              <span className="text-sm font-medium capitalize">{key}</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded border border-slate-300 shadow-sm" 
                  style={{ backgroundColor: value }}
                />
                <code className="text-xs text-slate-600">{value}</code>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Font Family</div>
            <div className="font-medium" style={{ fontFamily: displayTokens.font.family }}>{displayTokens.font.family}</div>
          </div>
          <div className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Heading Size</div>
            <div className="font-medium">{displayTokens.font.heading}</div>
          </div>
          <div className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Weight</div>
            <div style={{ fontWeight: displayTokens.font.weight }}>{displayTokens.font.weight}</div>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">Spacing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(displayTokens.spacing).map(([key, value]: [string, any]) => (
            <div key={key} className="flex justify-between p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              <span className="text-sm font-medium capitalize">{key}</span>
              <code className="text-xs text-slate-600 dark:text-slate-400">{value}</code>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">Radius</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(displayTokens.radius).map(([key, value]: [string, any]) => (
            <div key={key} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              <span className="text-sm font-medium capitalize">{key}</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 border border-slate-300" style={{ borderRadius: value }} />
                <code className="text-xs text-slate-600 dark:text-slate-400">{value}</code>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
