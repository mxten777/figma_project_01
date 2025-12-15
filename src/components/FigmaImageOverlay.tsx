// FigmaImageOverlay.tsx
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Layers, Layout, Palette, Sparkles, Ruler } from "lucide-react";

export function FigmaImageOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full flex flex-col items-center"
    >
      {/* Figma Design Placeholder with Animation */}
      <Card className="relative w-full aspect-[16/9] bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-pink-900/30 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center shadow-xl overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        {/* Floating Icons */}
        <motion.div
          className="absolute top-10 left-10"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-8 w-8 text-purple-400" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 right-10"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Ruler className="h-8 w-8 text-blue-400" />
        </motion.div>
        
        {/* Center Content */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center space-y-3 z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Layers className="h-20 w-20 text-slate-400 dark:text-slate-500 mx-auto" />
          </motion.div>
          <span className="text-slate-600 dark:text-slate-300 font-semibold text-lg block">Figma Design Placeholder</span>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">실제 프로젝트에서는 Figma iframe 또는 이미지가 표시됩니다</p>
        </motion.div>
      </Card>
      
      {/* Enhanced Glassmorphism Overlays */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 text-xs rounded-xl px-5 py-4 shadow-2xl space-y-3 hover:scale-105 transition-transform"
      >
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
          <Layout className="h-4 w-4 text-blue-500" />
          <span>Auto Layout</span>
        </div>
        <div className="text-slate-600 dark:text-slate-400 text-xs ml-6 space-y-1">
          <div>• 수평 정렬</div>
          <div>• Gap 24px</div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-4 right-4 backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/40 text-xs rounded-xl px-5 py-4 shadow-2xl space-y-3 hover:scale-105 transition-transform"
      >
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
          <Palette className="h-4 w-4 text-purple-500" />
          <span>Styles</span>
        </div>
        <div className="text-slate-600 dark:text-slate-400 text-xs ml-6 space-y-1">
          <div>• Primary Color</div>
          <div>• Radius 16px</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
