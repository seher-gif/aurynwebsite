import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function KvkkPage() {
    return (
        <div className="bg-white">
            <Header />
            <main className="isolate">
                <div className="bg-white px-6 py-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">KVKK Aydınlatma Metni</h1>
                        <div className="mt-10 max-w-2xl prose prose-lg prose-headings:font-heading">
                            <p>Veri Sorumlusu: Auryn Dijital</p>

                            <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Auryn Dijital tarafından aşağıda açıklanan kapsamda işlenebilecektir.</p>

                            <h3>1. Kişisel Verilerin İşlenme Amacı</h3>
                            <p>Kişisel verileriniz; hizmetlerimizin sunulması, müşteri ilişkilerinin yönetilmesi, yasal yükümlülüklerin yerine getirilmesi ve hizmet kalitemizin artırılması amaçlarıyla işlenmektedir.</p>

                            <h3>2. Kişisel Verilerin Aktarılması</h3>
                            <p>Kişisel verileriniz, yasal zorunluluklar dışında ve açık rızanız olmaksızın üçüncü kişilerle paylaşılmamaktadır. Gerektiğinde yetkili kamu kurum ve kuruluşlarına aktarılabilir.</p>

                            <h3>3. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
                            <p>Kişisel verileriniz, web sitemiz, iletişim formları ve e-posta yoluyla elektronik ortamda toplanmaktadır. Bu veriler, KVKK'nın 5. ve 6. maddelerinde belirtilen hukuki sebeplere dayanarak işlenmektedir.</p>

                            <h3>4. KVKK Kapsamındaki Haklarınız</h3>
                            <p>KVKK'nın 11. maddesi uyarınca, veri sahibi olarak aşağıdaki haklara sahipsiniz:</p>
                            <ul>
                                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                                <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
                                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                                <li>Verilerin düzeltilmesini, silinmesini veya yok edilmesini isteme.</li>
                            </ul>

                            <p>Haklarınızı kullanmak için <a href="mailto:info@auryndijital.com" className="text-auryn-magenta">info@auryndijital.com</a> adresine başvurabilirsiniz.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
