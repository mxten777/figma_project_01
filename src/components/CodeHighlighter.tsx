// CodeHighlighter.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { Copy, Check, Code2 } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <Code2 className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Generated Code</h3>
      </div>
      
      {/* Code Block with Enhanced Style */}
      <motion.div
        className="relative rounded-xl overflow-hidden border border-slate-700/50 dark:border-slate-600/50 shadow-2xl"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Copy Button Overlay */}
        <motion.div
          className="absolute top-3 right-3 z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleCopy}
            size="sm"
            variant="secondary"
            className="bg-slate-800/90 hover:bg-slate-700 text-white border-slate-600"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">복사됨!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>복사</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
        
        {/* Syntax Highlighter */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <SyntaxHighlighter 
            language="tsx" 
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '2rem 1.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              background: '#1e1e1e',
            }}
            showLineNumbers
            wrapLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </motion.div>
    </motion.div>
  );
}
