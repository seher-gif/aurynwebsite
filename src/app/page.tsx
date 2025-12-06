import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, TrendingUp, Globe, PenTool, Megaphone, BarChart2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/schema";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description: "Veri odaklı SEO, Google Ads ve sosyal medya stratejileriyle işletmenizin büyüme potansiyelini açığa çıkarıyoruz.",
};

// Revalidate every hour for fresh content
export const revalidate = 3600;

async function getHeroData() {
  try {
    const hero = await prisma.homepageHero.findFirst();
    return hero;
  } catch (error) {
    console.error("Failed to fetch hero data:", error);
    return null;
  }
}

export default async function Home() {
  const heroData = await getHeroData();

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WhatsAppFloat />
      <Header />

      <main className="isolate">
        {/* Hero Section */}
        <div className="relative pt-14">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-auryn-magenta/20 rounded-full blur-[100px] opacity-50"></div>
            <div className="absolute top-40 -left-20 w-[30rem] h-[30rem] bg-auryn-purple/20 rounded-full blur-[100px] opacity-50"></div>
          </div>

          <div className="py-24 sm:py-32 lg:pb-40 relative z-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center px-4">
                {heroData?.badgeText && (
                  <div className="mb-8 flex justify-center">
                    <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-300 ring-1 ring-white/10 hover:ring-auryn-magenta/50 transition-all bg-white/5 backdrop-blur-sm">
                      {heroData.badgeText}{" "}
                      <Link href="/hizmetler" className="font-semibold text-auryn-magenta ml-2">
                        <span className="absolute inset-0" aria-hidden="true" />
                        Daha fazla bilgi <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                )}
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading mb-6">
                  {heroData?.headline ? (
                    heroData.headline
                  ) : (
                    <>
                      Dijital Dünyada <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                        Markanızı Zirveye Taşıyın
                      </span>
                    </>
                  )}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-400 font-body max-w-2xl mx-auto">
                  {heroData?.subheadline || "Veri odaklı SEO, Google Ads ve sosyal medya stratejileriyle işletmenizin büyüme potansiyelini açığa çıkarıyoruz."}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0 h-12 px-8 text-base rounded-xl transition-transform hover:scale-105" asChild>
                    <Link href={heroData?.ctaPrimaryUrl || "/iletisim"}>{heroData?.ctaPrimaryLabel || "Hemen Başlayın"}</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base rounded-xl" asChild>
                    <Link href={heroData?.ctaSecondaryUrl || "/hizmetler"}>
                      {heroData?.ctaSecondaryLabel || "Hizmetlerimiz"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-auryn-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="mx-auto max-w-2xl lg:text-center relative z-10">
            <h2 className="text-base font-semibold leading-7 text-auryn-magenta">Hizmetlerimiz</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dijitalde <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">360° Hizmet</span> Yaklaşımı
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              İhtiyacınız olan tüm dijital pazarlama çözümlerini tek bir çatı altında sunuyoruz.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none relative z-10">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'SEO Optimizasyonu',
                  description: 'Arama motorlarında üst sıralara çıkarak organik trafiğinizi artırın.',
                  icon: Search,
                  href: '/hizmetler/seo-optimizasyonu'
                },
                {
                  name: 'Google Ads',
                  description: 'Hedef kitlenize en doğru zamanda ulaşarak dönüşümlerinizi maksimize edin.',
                  icon: TrendingUp,
                  href: '/hizmetler/google-ads-yonetimi'
                },
                {
                  name: 'Sosyal Medya Yönetimi',
                  description: 'Marka bilinirliğinizi artırın ve topluluğunuzla etkileşim kurun.',
                  icon: Globe,
                  href: '/hizmetler/sosyal-medya-yonetimi'
                },
                {
                  name: 'İçerik Pazarlaması',
                  description: 'Değerli ve ilgi çekici içeriklerle hedef kitlenizi etkileyin.',
                  icon: PenTool,
                  href: '/hizmetler/icerik-pazarlamasi'
                },
                {
                  name: 'Meta Ads',
                  description: 'Facebook ve Instagram reklamlarıyla potansiyel müşterilerinize ulaşın.',
                  icon: Megaphone,
                  href: '/hizmetler/meta-ads'
                },
                {
                  name: 'Raporlama & Analiz',
                  description: 'Şeffaf ve detaylı raporlarla performansınızı anlık takip edin.',
                  icon: BarChart2,
                  href: '/hizmetler/raporlama-analiz'
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col bg-gray-900/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-auryn-magenta/30 transition-all hover:shadow-lg hover:shadow-auryn-magenta/5 group hover:-translate-y-1">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-auryn-magenta/10 transition-colors">
                      <feature.icon className="h-6 w-6 flex-none text-auryn-magenta group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link href={feature.href} className="text-sm font-semibold leading-6 text-auryn-magenta group-hover:text-white transition-colors flex items-center">
                        Detaylı İncele <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-gray-900/30 border-y border-white/5 py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-auryn-magenta/5 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-auryn-magenta">Hikayemiz</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Auryn Ne Demek?</p>
                  <p className="mt-6 text-lg leading-8 text-gray-400">
                    Auryn, sonsuzluğu ve birbirine bağlılığı simgeler. Biz de dijital dünyada markanız için sürdürülebilir ve uzun vadeli başarıyı hedefliyoruz. Veri ve içgörüyü birleştirerek, markanızın potansiyelini ortaya çıkarıyoruz.
                  </p>
                  <div className="mt-10">
                    <Button variant="gradient" className="shadow-lg" asChild>
                      <Link href="/hakkimizda">Daha Fazlasını Oku</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-end lg:order-last">
                <div className="relative rounded-2xl bg-gray-800/50 p-2 ring-1 ring-inset ring-white/10 lg:-m-4 lg:rounded-3xl lg:p-4 backdrop-blur-sm">
                  <div className="aspect-[4/3] w-[400px] sm:w-[600px] rounded-xl relative overflow-hidden group">
                    <Image
                      src="/office-1.jpg"
                      alt="Auryn Dijital Ofis"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-auryn-magenta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </div >
  );
}
