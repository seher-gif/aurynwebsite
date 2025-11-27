import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HakkimizdaPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="isolate">
                {/* Hero */}
                <div className="relative isolate pt-14">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-auryn-magenta/20 rounded-full blur-[100px] opacity-40"></div>
                        <div className="absolute top-40 -left-20 w-[30rem] h-[30rem] bg-auryn-purple/20 rounded-full blur-[100px] opacity-40"></div>
                    </div>
                    <div className="py-24 sm:py-32 lg:pb-40 relative z-10">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading mb-6">
                                    Hakkımızda
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-400 font-body max-w-2xl mx-auto">
                                    Auryn Dijital, markaların dijital dünyadaki potansiyelini ortaya çıkarmak için kurulmuş, <span className="text-auryn-magenta font-semibold">veri odaklı</span> bir performans ajansıdır.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                                Auryn'in <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Doğuşu</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                                "Auryn" ismi, sonsuzluğu ve birbirine bağlılığı simgeleyen efsanevi bir sembolden gelir. Bizim için bu, dijital pazarlamanın sürekli evrilen yapısını ve markanızla kurduğumuz uzun soluklu ortaklığı temsil eder.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Amacımız sadece reklam vermek veya SEO yapmak değil; markanızın özünü anlayarak, onu dijital dünyada en doğru şekilde konumlandırmaktır. Veriyi içgörüye, içgörüyü stratejiye dönüştürüyoruz.
                            </p>
                        </div>
                        <div className="relative rounded-3xl aspect-video overflow-hidden group">
                            <Image
                                src="/office-2.jpg"
                                alt="Auryn Dijital Ekip"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-auryn-magenta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="bg-gray-900/30 border-y border-white/5 py-24 sm:py-32 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-auryn-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Vizyonumuz ve Yaklaşımımız</h2>
                                <p className="mt-4 text-lg leading-8 text-gray-400">
                                    Sürdürülebilir büyüme için 3 temel prensibimiz var.
                                </p>
                            </div>
                            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-auryn-magenta/30 transition-all hover:-translate-y-1 group">
                                    <dt className="text-xl font-bold leading-7 text-white mb-4 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-auryn-magenta to-auryn-dark shadow-lg shadow-auryn-magenta/20 group-hover:scale-110 transition-transform">
                                            <span className="text-white font-bold text-lg">1</span>
                                        </div>
                                        Veri Odaklılık
                                    </dt>
                                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                        <p className="flex-auto">Kararlarımızı hislere değil, somut verilere dayandırıyoruz. Her adımı ölçüyor ve optimize ediyoruz.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-auryn-purple/30 transition-all hover:-translate-y-1 group">
                                    <dt className="text-xl font-bold leading-7 text-white mb-4 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-auryn-purple to-indigo-600 shadow-lg shadow-auryn-purple/20 group-hover:scale-110 transition-transform">
                                            <span className="text-white font-bold text-lg">2</span>
                                        </div>
                                        Şeffaflık
                                    </dt>
                                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                        <p className="flex-auto">Süreçlerimizde ve raporlamalarımızda tam şeffaflık sağlıyoruz. Ne yaptığımızı ve neden yaptığımızı her zaman bilirsiniz.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 group">
                                    <dt className="text-xl font-bold leading-7 text-white mb-4 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-black shadow-lg shadow-white/5 group-hover:scale-110 transition-transform border border-white/10">
                                            <span className="text-white font-bold text-lg">3</span>
                                        </div>
                                        Sürdürülebilirlik
                                    </dt>
                                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                        <p className="flex-auto">Kısa vadeli kazançlar yerine, markanızın uzun vadeli değerini artıracak stratejilere odaklanıyoruz.</p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
