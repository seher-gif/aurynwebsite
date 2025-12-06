import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // In a real app, fetch post by slug
    const post = {
        title: "SEO Stratejinizi Güçlendirecek 5 İpucu",
        date: "24 Kasım 2024",
        category: "SEO",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80",
        content: `
      <p>Arama motoru optimizasyonu (SEO), dijital pazarlamanın en önemli taşlarından biridir. İşte 2024 yılında SEO stratejinizi güçlendirecek 5 temel ipucu:</p>
      
      <h3>1. Kullanıcı Deneyimine (UX) Odaklanın</h3>
      <p>Google, kullanıcıların sitenizde geçirdiği süreyi ve etkileşimlerini önemsiyor. Hızlı açılan, mobil uyumlu ve kolay gezilebilir bir site, sıralamanızı doğrudan etkiler.</p>
      
      <h3>2. Kaliteli ve Özgün İçerik Üretin</h3>
      <p>İçerik hala kraldır. Ancak sadece anahtar kelime doldurmak yerine, kullanıcının sorularına cevap veren, derinlemesine ve özgün içerikler üretmelisiniz.</p>
      
      <h3>3. Teknik SEO'yu İhmal Etmeyin</h3>
      <p>Site haritası, robots.txt dosyası, SSL sertifikası ve temiz URL yapısı gibi teknik detaylar, arama motorlarının sitenizi taramasını kolaylaştırır.</p>
      
      <h3>4. Backlink Profilinizi Güçlendirin</h3>
      <p>Otoriter sitelerden alınan kaliteli backlinkler, sitenizin güvenilirliğini artırır. Ancak spam backlinklerden kaçınmalısınız.</p>
      
      <h3>5. Yerel SEO Çalışmaları Yapın</h3>
      <p>Eğer fiziksel bir işletmeniz varsa, Google Benim İşletmem kaydınızı optimize etmek ve yerel anahtar kelimelere odaklanmak çok önemlidir.</p>
    `,
    };

    return (
        <div className="bg-black min-h-screen">
            <Header />
            <main className="isolate">
                <div className="bg-black px-6 py-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-300">
                        <Link href="/blog" className="flex items-center text-sm font-semibold text-auryn-magenta mb-8 hover:text-auryn-purple transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Blog'a Dön
                        </Link>
                        <p className="text-base font-semibold leading-7 text-auryn-magenta">{post.category}</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">{post.title}</h1>
                        <div className="mt-6 text-sm text-gray-400">{post.date}</div>

                        <figure className="mt-10">
                            <Image
                                className="aspect-video rounded-xl bg-gray-900 object-cover ring-1 ring-white/10"
                                src={post.imageUrl}
                                alt={post.title}
                                width={1200}
                                height={675}
                                priority
                            />
                        </figure>

                        <div className="mt-10 max-w-2xl prose prose-lg prose-invert prose-headings:font-heading prose-headings:text-white prose-p:text-gray-300 prose-a:text-auryn-magenta hover:prose-a:text-auryn-purple" dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
