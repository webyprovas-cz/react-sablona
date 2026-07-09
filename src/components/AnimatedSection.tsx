import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function AnimatedSection({
  children,
  className,
  id,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </motion.section>
  )
}
