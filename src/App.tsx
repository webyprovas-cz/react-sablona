import { Hero } from "@/components/Hero"
import { AnimatedSection } from "@/components/AnimatedSection"

function App() {
  return (
    <main>
      <Hero
        eyebrow="Šablona pro nové weby"
        title="Postavte web, který působí profesionálně od první vteřiny"
        description="Tahle hero sekce a animace sekcí jsou výchozí bod pro budoucí projekty — hero inspirovaná 21st.dev, animace přes Framer Motion."
        primaryCta={{ label: "Začít", href: "#features" }}
        secondaryCta={{ label: "Zjistit více", href: "#features" }}
      />

      <AnimatedSection
        id="features"
        className="mx-auto max-w-3xl px-6 py-24 text-center"
      >
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Každá další sekce se takhle plynule zobrazí
        </h2>
        <p className="mt-3 text-muted-foreground">
          Stačí obalit obsah do <code>&lt;AnimatedSection&gt;</code> a při
          scrollu do viewportu se sekce jemně zvedne a zobrazí.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Připraveno na obsah dalšího klienta
        </h2>
        <p className="mt-3 text-muted-foreground">
          Nahraď tenhle obsah reálnými sekcemi webu (o nás, služby, ceník,
          kontakt...).
        </p>
      </AnimatedSection>
    </main>
  )
}

export default App
