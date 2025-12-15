// FigmaInput.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, FileCode } from "lucide-react";

interface FigmaInputProps {
  onLoad: (fileKey: string, accessToken: string) => void;
  loading: boolean;
  error: string | null;
}

export function FigmaInput({ onLoad, loading, error }: FigmaInputProps) {
  const [fileKey, setFileKey] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileKey && accessToken) {
      onLoad(fileKey, accessToken);
    }
  };

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Figma 파일 불러오기
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          // Loading Skeleton
          <div className="space-y-4 animate-pulse">
            <div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Figma 파일을 불러오는 중입니다...
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Figma File Key</label>
            <Input
              placeholder="예: abc123def456..."
              value={fileKey}
              onChange={(e) => setFileKey(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-slate-500 mt-1">
              Figma 파일 URL에서 추출: figma.com/file/<strong>FILE_KEY</strong>/...
            </p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Personal Access Token</label>
            <Input
              type="password"
              placeholder="figd_xxxxxxxxxxxxx"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-slate-500 mt-1">
              Figma → Settings → Personal Access Tokens에서 생성
            </p>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button 
            type="submit" 
            disabled={loading || !fileKey || !accessToken} 
            className="w-full relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100"
              initial={false}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  불러오는 중...
                </>
              ) : (
                "Figma 파일 불러오기"
              )}
            </span>
          </Button>
        </form>
        )}
      </CardContent>
    </Card>
  );
}
