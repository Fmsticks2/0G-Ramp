import { motion } from "framer-motion";

interface FloatingElementProps {
  delay?: number;
  className?: string;
  size?: string;
  gradient?: boolean;
  mobileHidden?: boolean;
}

export function FloatingElement({
  delay = 0,
  className = "",
  size = "w-16 h-16",
  gradient = false,
  mobileHidden = false,
}: FloatingElementProps) {
  const baseClasses = `${
    mobileHidden ? "hidden md:block" : ""
  } absolute ${size} ${
    gradient ? "bg-linear-to-br from-accent to-purple-600" : "bg-accent/20"
  } backdrop-blur-xl rounded-3xl border border-accent/30 ${className}`;

  return (
    <motion.div
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={baseClasses}
      style={{
        boxShadow: "0 0 40px rgba(255, 79, 216, 0.3)",
      }}
    />
  );
}
