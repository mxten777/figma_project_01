// FigmaInput.tsx
import { useState } from "react";
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
          <Button type="submit" disabled={loading || !fileKey || !accessToken} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                불러오는 중...
              </>
            ) : (
              "Figma 파일 불러오기"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
