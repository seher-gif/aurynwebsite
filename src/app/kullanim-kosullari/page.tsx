import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function KullanimKosullariPage() {
    return (
        <div className="bg-white">
            <Header />
            <main className="isolate">
                <div className="bg-white px-6 py-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">Kullanım Koşulları</h1>
                        <div className="mt-10 max-w-2xl prose prose-lg prose-headings:font-heading">
                            <p>Son Güncelleme: 24 Kasım 2024</p>

                            <h3>1. Kabul</h3>
                            <p>Bu web sitesini ziyaret ederek veya hizmetlerimizi kullanarak, bu Kullanım Koşullarını kabul etmiş olursunuz. Eğer bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.</p>

                            <h3>2. Hizmetlerin Kullanımı</h3>
                            <p>Web sitemizi sadece yasal amaçlarla ve başkalarının haklarını ihlal etmeyecek şekilde kullanmayı kabul edersiniz. Sitemizin güvenliğini tehdit edecek veya işleyişini bozacak herhangi bir faaliyette bulunamazsınız.</p>

                            <h3>3. Fikri Mülkiyet</h3>
                            <p>Bu web sitesindeki tüm içerik (metinler, görseller, logolar, tasarımlar) Auryn Dijital'e aittir ve telif hakkı yasalarıyla korunmaktadır. İzinsiz kopyalanamaz veya çoğaltılamaz.</p>

                            <h3>4. Sorumluluk Reddi</h3>
                            <p>Web sitemizdeki bilgiler "olduğu gibi" sunulmaktadır. Bilgilerin doğruluğu veya eksiksizliği konusunda garanti vermiyoruz. Sitemizin kullanımından doğabilecek zararlardan sorumlu değiliz.</p>

                            <h3>5. Değişiklikler</h3>
                            <p>Bu Kullanım Koşullarını dilediğimiz zaman güncelleme hakkını saklı tutarız. Değişiklikler yayınlandığı tarihte yürürlüğe girer.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
