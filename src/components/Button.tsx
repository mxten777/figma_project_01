// Button.tsx
import { Button as ShadcnButton } from "@/components/ui/button";

export function Button({ variant = "primary", children }: { variant?: "primary" | "secondary"; children: React.ReactNode }) {
  return (
    <ShadcnButton 
      variant={variant === "primary" ? "default" : "secondary"}
      size="lg"
      className="shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {children}
    </ShadcnButton>
  );
}
