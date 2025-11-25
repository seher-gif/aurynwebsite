import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function KariyerPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="isolate">
                <div className="relative px-6 py-32 lg:px-8">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 right-0 w-[40rem] h-[40rem] bg-auryn-magenta/10 rounded-full blur-[100px] opacity-40"></div>
                        <div className="absolute bottom-0 -left-20 w-[40rem] h-[40rem] bg-auryn-purple/10 rounded-full blur-[100px] opacity-40"></div>
                    </div>

                    <div className="mx-auto max-w-3xl text-center relative z-10">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                            Kariyer
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-400">
                            Auryn Dijital ekibine katılmak ister misiniz? Yetenekli ve tutkulu takım arkadaşları arıyoruz.
                        </p>

                        <div className="mt-16 p-10 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl shadow-auryn-magenta/5">
                            <div className="w-16 h-16 mx-auto bg-auryn-magenta/20 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Şu an açık pozisyon bulunmamaktadır.</h3>
                            <p className="mt-4 text-gray-400 leading-relaxed">
                                Ancak her zaman yetenekli insanlarla tanışmak isteriz. CV'nizi ve portfolyonuzu bize gönderin, uygun bir pozisyon açıldığında sizinle iletişime geçelim.
                            </p>
                            <div className="mt-8">
                                <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0 h-12 px-8 text-base rounded-xl transition-transform hover:scale-105" asChild>
                                    <Link href="mailto:seher@auryndijital.com">CV Gönder</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
