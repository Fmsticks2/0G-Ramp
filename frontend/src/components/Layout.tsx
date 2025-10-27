import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";
import { cn } from "../lib/utils";
import { Icon } from "@iconify/react";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-linear-to-br from-[#FF4FD8]/5 to-purple-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-linear-to-br from-purple-600/5 to-[#FF4FD8]/5 rounded-full blur-3xl"
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Sidebar - Desktop */}
      <div className="fixed left-0 top-0 h-screen z-20 hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col relative z-10 w-full pb-20 md:pb-0 md:ml-[var(--sidebar-width)]">
        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden fixed top-6 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-xl border border-accent/30 text-accent shadow-lg shadow-black/10"
        >
          <Icon icon="mdi:menu" className="text-xl" />
        </motion.button>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn(
            "flex-1 relative bg-transparent ml-0 transition-all duration-300",
            sidebarCollapsed ? "md:ml-24" : "md:ml-68"
          )}
        >
          <Header />
          {children}
        </motion.main>
      </div>
    </div>
  );
}
