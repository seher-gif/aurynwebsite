import { ContactForm } from "@/components/forms/contact-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Mail, MapPin, Phone } from "lucide-react";

export default function IletisimPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="isolate">
                <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-auryn-magenta/10 rounded-full blur-[100px] opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-auryn-purple/10 rounded-full blur-[100px] opacity-50"></div>
                    </div>

                    <div className="mx-auto max-w-2xl text-center relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                            İletişime <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Geçin</span>
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-400">
                            Projeleriniz için teklif almak veya tanışmak için bize yazın.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 relative z-10">
                        <div>
                            <div className="mb-10 bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-6">İletişim Bilgileri</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-auryn-magenta/10 group-hover:bg-auryn-magenta/20 transition-colors">
                                            <Mail className="h-6 w-6 text-auryn-magenta" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">E-posta</p>
                                            <a href="mailto:seher@auryndijital.com" className="text-gray-400 hover:text-auryn-magenta transition-colors">seher@auryndijital.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-auryn-magenta/10 group-hover:bg-auryn-magenta/20 transition-colors">
                                            <Phone className="h-6 w-6 text-auryn-magenta" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">Telefon</p>
                                            <a href="tel:05319409065" className="text-gray-400 hover:text-auryn-magenta transition-colors">0531 940 90 65</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-auryn-magenta/10 group-hover:bg-auryn-magenta/20 transition-colors">
                                            <MapPin className="h-6 w-6 text-auryn-magenta" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">Adres</p>
                                            <p className="text-gray-400">Üçgen, Abdi İpekçi Cd. no:13 kat:1, 07040 Muratpaşa/Antalya</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Map */}
                            <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-auryn-magenta/10 border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.7167999584635!2d30.69476167565416!3d36.89712266223035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38fe3a19c0351%3A0x2cf230b5dd15a0ad!2zw5zDp2dlbiwgQWJkaSDEsHBla8OnaSBDZC4gTm86MTMga2F0OjEsIDA3MDQwIE11cmF0cGHFn2EvQW50YWx5YQ!5e0!3m2!1sen!2str!4v1764028803444!5m2!1sen!2str"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Auryn Dijital Ofis Konumu"
                                />
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
