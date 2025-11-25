import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function GizlilikPolitikasiPage() {
    return (
        <div className="bg-white">
            <Header />
            <main className="isolate">
                <div className="bg-white px-6 py-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">Gizlilik Politikası</h1>
                        <div className="mt-10 max-w-2xl prose prose-lg prose-headings:font-heading">
                            <p>Son Güncelleme: 24 Kasım 2024</p>

                            <h3>1. Giriş</h3>
                            <p>Auryn Dijital ("Şirket", "biz", "bize" veya "bizim") olarak gizliliğinize saygı duyuyoruz ve kişisel verilerinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.</p>

                            <h3>2. Toplanan Veriler</h3>
                            <p>Hizmetlerimizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
                            <ul>
                                <li>Kimlik Bilgileri: Ad, soyad.</li>
                                <li>İletişim Bilgileri: E-posta adresi, telefon numarası.</li>
                                <li>Teknik Veriler: IP adresi, tarayıcı türü, işletim sistemi.</li>
                                <li>Kullanım Verileri: Sitemizde gezindiğiniz sayfalar, tıklama süreleri.</li>
                            </ul>

                            <h3>3. Verilerin Kullanımı</h3>
                            <p>Topladığımız verileri şu amaçlarla kullanırız:</p>
                            <ul>
                                <li>Hizmetlerimizi sağlamak ve iyileştirmek.</li>
                                <li>Sizinle iletişime geçmek ve taleplerinizi yanıtlamak.</li>
                                <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
                                <li>Pazarlama ve analiz faaliyetleri yürütmek (izniniz dahilinde).</li>
                            </ul>

                            <h3>4. Çerezler (Cookies)</h3>
                            <p>Web sitemizde kullanıcı deneyimini geliştirmek için çerezler kullanıyoruz. Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.</p>

                            <h3>5. Veri Güvenliği</h3>
                            <p>Kişisel verilerinizi yetkisiz erişime, kayba veya ifşaya karşı korumak için uygun teknik ve idari tedbirleri alıyoruz.</p>

                            <h3>6. İletişim</h3>
                            <p>Gizlilik politikamızla ilgili sorularınız için <a href="mailto:info@auryndijital.com" className="text-auryn-magenta">info@auryndijital.com</a> adresinden bize ulaşabilirsiniz.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
