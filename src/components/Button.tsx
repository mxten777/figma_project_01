// Button.tsx
import { useState } from "react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Button as ShadcnButton } from "@/components/ui/button";

interface RippleType {
  x: number;
  y: number;
  size: number;
  id: number;
}

export function Button({ variant = "primary", children }: { variant?: "primary" | "secondary"; children: React.ReactNode }) {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple: RippleType = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <ShadcnButton 
      variant={variant === "primary" ? "default" : "secondary"}
      size="lg"
      className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 group"
      onClick={handleClick}
    >
      {/* Ripple Effect */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      
      {/* Content with hover effect */}
      <motion.span
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
    </ShadcnButton>
  );
}
