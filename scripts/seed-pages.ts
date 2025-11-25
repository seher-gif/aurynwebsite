import 'dotenv/config';
import { prisma } from '../src/lib/prisma';


const pages = [
    {
        title: 'Ana Sayfa',
        slug: 'ana-sayfa',
        metaTitle: 'Auryn Dijital | Veri Odaklı Dijital Pazarlama ve SEO Ajansı',
        metaDesc: 'Auryn Dijital olarak SEO, Google Ads ve dijital pazarlama hizmetleriyle markanızı büyütüyoruz.',
        published: true,
    },
    {
        title: 'Hakkımızda',
        slug: 'hakkimizda',
        metaTitle: 'Hakkımızda | Auryn Dijital',
        metaDesc: 'Auryn Dijital olarak veri odaklı yaklaşımımız ve uzman ekibimizle tanışın.',
        published: true,
    },
    {
        title: 'Hizmetler',
        slug: 'hizmetler',
        metaTitle: 'Dijital Pazarlama Hizmetleri | Auryn Dijital',
        metaDesc: 'SEO, Google Ads, Sosyal Medya Yönetimi ve daha fazlası. Dijital pazarlama çözümlerimizi keşfedin.',
        published: true,
    },
    {
        title: 'İletişim',
        slug: 'iletisim',
        metaTitle: 'İletişim | Auryn Dijital',
        metaDesc: 'Dijital pazarlama ihtiyaçlarınız için bizimle iletişime geçin.',
        published: true,
    },
    {
        title: 'Blog',
        slug: 'blog',
        metaTitle: 'Blog | Auryn Dijital',
        metaDesc: 'Dijital pazarlama ve SEO hakkında güncel içerikler.',
        published: true,
    },
    {
        title: 'Kariyer',
        slug: 'kariyer',
        metaTitle: 'Kariyer | Auryn Dijital',
        metaDesc: 'Auryn Dijital ailesine katılın. Açık pozisyonlarımızı inceleyin.',
        published: true,
    },
    {
        title: 'Gizlilik Politikası',
        slug: 'gizlilik-politikasi',
        metaTitle: 'Gizlilik Politikası | Auryn Dijital',
        metaDesc: 'Kişisel verilerinizin korunması hakkında bilgilendirme.',
        published: true,
    },
    {
        title: 'Kullanım Koşulları',
        slug: 'kullanim-kosullari',
        metaTitle: 'Kullanım Koşulları | Auryn Dijital',
        metaDesc: 'Web sitemiz kullanım koşulları ve şartları.',
        published: true,
    },
    {
        title: 'KVKK Aydınlatma Metni',
        slug: 'kvkk-aydinlatma-metni',
        metaTitle: 'KVKK Aydınlatma Metni | Auryn Dijital',
        metaDesc: 'Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
        published: true,
    },
    {
        title: 'SEO Analizi',
        slug: 'seo-analysis',
        metaTitle: 'Ücretsiz SEO Analizi | Auryn Dijital',
        metaDesc: 'Web siteniz için ücretsiz SEO analizi yapın.',
        published: true,
    },
];

async function main() {
    console.log('Sayfalar ekleniyor...');

    for (const page of pages) {
        const existing = await prisma.page.findUnique({
            where: { slug: page.slug },
        });

        if (existing) {
            console.log(`✓ ${page.title} zaten mevcut`);
            continue;
        }

        await prisma.page.create({
            data: page,
        });

        console.log(`✓ ${page.title} eklendi`);
    }

    console.log('Tüm sayfalar başarıyla eklendi!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
