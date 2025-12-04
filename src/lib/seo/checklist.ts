/**
 * Comprehensive SEO Rules Checklist
 * Based on technical and semantic SEO best practices
 */

export const SEO_CHECKLIST = {
    technical: {
        crawlAndIndex: {
            title: "Tarama ve Dizinleme (Crawl & Index)",
            rules: [
                {
                    id: "robots-txt",
                    name: "Robots.txt Dosyası",
                    description: "Arama motorlarının hangi sayfaları tarayıp hangilerini taramayacağını doğru belirttiniz mi? (Önemli sayfalar engellenmemeli).",
                    priority: "high"
                },
                {
                    id: "xml-sitemap",
                    name: "XML Site Haritası (Sitemap)",
                    description: "Güncel bir site haritası oluşturulup Google Search Console'a gönderildi mi?",
                    priority: "high"
                },
                {
                    id: "canonical-tags",
                    name: "Kanonik Etiketler (Canonical Tags)",
                    description: "Kopya içerik sorununu önlemek için asıl sayfa kaynağı belirtildi mi?",
                    priority: "high"
                },
                {
                    id: "404-redirects",
                    name: "404 Hataları ve Yönlendirmeler",
                    description: "Kırık linkler (404) tespit edilip alakalı sayfalara 301 ile yönlendirildi mi?",
                    priority: "high"
                },
                {
                    id: "crawl-budget",
                    name: "Tarama Bütçesi (Crawl Budget)",
                    description: "Gereksiz parametre sayfaları veya düşük kaliteli sayfalar taranmayı engelliyor mu?",
                    priority: "medium"
                }
            ]
        },
        performance: {
            title: "Site Performansı ve Hız (Core Web Vitals)",
            rules: [
                {
                    id: "lcp",
                    name: "LCP (Largest Contentful Paint)",
                    description: "Sayfanın ana içeriği 2.5 saniyenin altında yükleniyor mu?",
                    priority: "high"
                },
                {
                    id: "inp",
                    name: "INP (Interaction to Next Paint)",
                    description: "Site kullanıcı etkileşimlerine hızlı yanıt veriyor mu?",
                    priority: "high"
                },
                {
                    id: "cls",
                    name: "CLS (Cumulative Layout Shift)",
                    description: "Yükleme sırasında sayfa öğeleri kayarak düzeni bozuyor mu? (Görsel boyutları tanımlı olmalı).",
                    priority: "high"
                },
                {
                    id: "image-optimization",
                    name: "Görsel Optimizasyonu",
                    description: "Görseller yeni nesil formatlarda (WebP) ve sıkıştırılmış mı?",
                    priority: "medium"
                }
            ]
        },
        structure: {
            title: "Yapı ve Güvenlik",
            rules: [
                {
                    id: "ssl-certificate",
                    name: "SSL Sertifikası (HTTPS)",
                    description: "Site güvenli bağlantıya sahip mi?",
                    priority: "high"
                },
                {
                    id: "mobile-compatibility",
                    name: "Mobil Uyumluluk",
                    description: "Site tüm mobil cihazlarda sorunsuz çalışıyor mu? (Google Mobile-First Indexing).",
                    priority: "high"
                },
                {
                    id: "url-structure",
                    name: "URL Yapısı",
                    description: "URL'ler kısa, anlaşılır ve anahtar kelime içeriyor mu?",
                    priority: "medium"
                },
                {
                    id: "breadcrumbs",
                    name: "Breadcrumbs (Ekmek Kırıntıları)",
                    description: "Kullanıcının ve botların site hiyerarşisini anlaması için navigasyon yolu ekli mi?",
                    priority: "medium"
                }
            ]
        }
    },
    semantic: {
        topicClusters: {
            title: "Konu Otoritesi ve Kümeleri (Topic Clusters)",
            rules: [
                {
                    id: "pillar-content",
                    name: "Pillar Content (Sütun İçerik)",
                    description: "Ana konuyu kapsayan geniş ve detaylı bir rehber sayfanız var mı?",
                    priority: "high"
                },
                {
                    id: "cluster-content",
                    name: "Cluster Content (Küme İçerik)",
                    description: "Ana konuyu destekleyen alt başlıklarda (long-tail) detaylı makaleler yazıldı mı?",
                    priority: "medium"
                },
                {
                    id: "internal-linking",
                    name: "İç Link Ağı",
                    description: "Ana sayfa ve alt sayfalar birbirine mantıksal bir bağlamla (doğru anchor text ile) bağlandı mı?",
                    priority: "high"
                }
            ]
        },
        entityOptimization: {
            title: "Varlık Optimizasyonu (Entity Optimization)",
            rules: [
                {
                    id: "entities-vs-keywords",
                    name: "Varlıklar (Entities) vs Anahtar Kelimeler",
                    description: "Sadece 'kelime' tekrarı yerine, o konuya ait kişi, yer, kavram ve nesneleri (Entities) metinde geçirdiniz mi?",
                    priority: "high"
                },
                {
                    id: "lsi-keywords",
                    name: "LSI (Latent Semantic Indexing)",
                    description: "Ana konuyla anlamsal olarak ilişkili terimler kullanıldı mı?",
                    priority: "medium"
                }
            ]
        },
        userIntent: {
            title: "Kullanıcı Niyeti ve İçerik Yapısı",
            rules: [
                {
                    id: "search-intent",
                    name: "Arama Niyeti (Search Intent)",
                    description: "Kullanıcı bilgi mi arıyor (Bilgi verici), satın mı almak istiyor (Ticari)? İçerik buna göre mi kurgulandı?",
                    priority: "high"
                },
                {
                    id: "heading-hierarchy",
                    name: "Hiyerarşik Yapı (H1-H6)",
                    description: "Başlıklar sadece tasarım için değil, konunun mantıksal akışını (outline) göstermek için kullanıldı mı?",
                    priority: "high"
                },
                {
                    id: "faq-optimization",
                    name: "Soru-Cevap Odaklılık",
                    description: "'Kullanıcılar bunu da sordu' (People Also Ask) bölümündeki sorulara net ve doğrudan yanıtlar veriliyor mu?",
                    priority: "medium"
                }
            ]
        },
        structuredData: {
            title: "Yapısal Veri İşaretleme (Schema Markup)",
            rules: [
                {
                    id: "schema-markup",
                    name: "JSON-LD İşaretlemesi",
                    description: "Makale, Ürün, SSS (FAQ), Etkinlik veya Yazar gibi veriler Schema.org standartlarına göre kodlandı mı?",
                    priority: "high"
                }
            ]
        },
        eeat: {
            title: "E-E-A-T (Deneyim, Uzmanlık, Otorite, Güven)",
            rules: [
                {
                    id: "author-bio",
                    name: "Yazar Biyografisi",
                    description: "İçeriği yazan kişinin o konudaki uzmanlığı belirtiliyor mu?",
                    priority: "medium"
                },
                {
                    id: "source-citation",
                    name: "Kaynak Gösterme",
                    description: "İddialar güvenilir dış kaynaklarla veya araştırmalarla desteklendi mi?",
                    priority: "medium"
                }
            ]
        }
    }
};

export type SEOChecklistCategory = keyof typeof SEO_CHECKLIST;
export type SEOChecklistSection = keyof typeof SEO_CHECKLIST.technical | keyof typeof SEO_CHECKLIST.semantic;
