import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

interface HeroProps {
  eyebrow?: string
  title: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function Hero({
  eyebrow = "Nové na trhu",
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_88%),transparent_60%)]"
      />

      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <Badge variant="secondary" className="gap-1.5 py-1.5">
            <Sparkles className="size-3.5" />
            {eyebrow}
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-lg text-muted-foreground text-balance"
        >
          {description}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button size="lg" asChild>
            <a href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" asChild>
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
