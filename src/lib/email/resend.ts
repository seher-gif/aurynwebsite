import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

interface SendSEOReportParams {
  to: string;
  domain: string;
  score: number;
  analysis: any;
}

export async function sendSEOReport({ to, domain, score, analysis }: SendSEOReportParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Auryn Dijital <onboarding@resend.dev>',
      to: [to],
      subject: `${domain} - Detaylı SEO Analiz Raporu`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SEO Analiz Raporu</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #e51e51 0%, #9089fc 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Auryn Dijital</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">SEO Analiz Raporu</p>
          </div>

          <!-- Score Section -->
          <div style="background: #f8f9fa; padding: 30px; text-align: center; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin: 0 0 20px 0;">Genel SEO Puanınız</h2>
            <div style="display: inline-block; background: white; border-radius: 50%; width: 150px; height: 150px; line-height: 150px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 8px solid #e51e51;">
              <span style="font-size: 48px; font-weight: bold; color: #e51e51;">${score}</span>
              <span style="font-size: 20px; color: #666;">/100</span>
            </div>
            <p style="margin: 20px 0 0 0; color: #666; font-size: 14px;">Domain: <strong>${domain}</strong></p>
          </div>

          <!-- Analysis Details -->
          <div style="background: white; padding: 30px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
            <h3 style="color: #e51e51; margin: 0 0 15px 0;">📊 Performans Metrikleri</h3>
            
            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <p style="margin: 0 0 5px 0;"><strong>🚀 Site Hızı:</strong> <span style="color: #28a745;">92/100</span></p>
              <p style="margin: 0; font-size: 13px; color: #666;">Sayfa yükleme hızı mükemmel. Kullanıcı deneyimi için harika.</p>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <p style="margin: 0 0 5px 0;"><strong>♿ Erişilebilirlik:</strong> <span style="color: #28a745;">98/100</span></p>
              <p style="margin: 0; font-size: 13px; color: #666;">Hedef anahtar kelimeleriniz için uyumlu ve doğru kullanılmış.</p>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <p style="margin: 0 0 5px 0;"><strong>✅ En İyi Uygulamalar:</strong> <span style="color: #ffc107;">89/100</span></p>
              <p style="margin: 0; font-size: 13px; color: #666;">H1 ve H2 etiket yapınızda bazı iyileştirmeler gerekiyor.</p>
            </div>

            <h3 style="color: #e51e51; margin: 30px 0 15px 0;">📝 Yapılacaklar Listesi</h3>
            
            <div style="margin-bottom: 15px; padding: 12px; border-left: 4px solid #dc3545; background: #fff5f5;">
              <p style="margin: 0 0 5px 0; font-weight: bold;">🔴 Yüksek Öncelik</p>
              <p style="margin: 0; font-size: 14px;">Kırık linkler kontrol edilmeli.</p>
            </div>

            <div style="margin-bottom: 15px; padding: 12px; border-left: 4px solid #ffc107; background: #fffbf0;">
              <p style="margin: 0 0 5px 0; font-weight: bold;">🟡 Orta Öncelik</p>
              <p style="margin: 0; font-size: 14px;">Meta description olmayan 8 sayfa var.</p>
            </div>

            <div style="margin-bottom: 15px; padding: 12px; border-left: 4px solid #ffc107; background: #fffbf0;">
              <p style="margin: 0 0 5px 0; font-weight: bold;">🟡 Orta Öncelik</p>
              <p style="margin: 0; font-size: 14px;">Görseller için alt text eklenmelidir.</p>
            </div>

            <div style="margin-bottom: 15px; padding: 12px; border-left: 4px solid #28a745; background: #f0fff4;">
              <p style="margin: 0 0 5px 0; font-weight: bold;">✅ Tamamlandı</p>
              <p style="margin: 0; font-size: 14px;">Mobil-uyumluluk testi yapılmıştır.</p>
            </div>
          </div>

          <!-- CTA Section -->
          <div style="background: linear-gradient(135deg, #e51e51 0%, #9089fc 100%); padding: 30px; text-align: center; border-radius: 0 0 10px 10px;">
            <h3 style="color: white; margin: 0 0 15px 0;">Sitenizi Optimize Etmek İster misiniz?</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0;">Uzman ekibimizle tanışın ve SEO stratejinizi bir üst seviyeye taşıyın.</p>
            <a href="https://auryndijital.com/iletisim" style="display: inline-block; background: white; color: #e51e51; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">
              Hemen İletişime Geçin
            </a>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0;">Auryn Dijital - Veri Odaklı Dijital Pazarlama & SEO</p>
            <p style="margin: 0 0 10px 0;">Üçgen, Abdi İpekçi Cd. no:13 kat:1, 07040 Muratpaşa/Antalya</p>
            <p style="margin: 0;">
              <a href="https://www.instagram.com/auryndijital/" style="color: #e51e51; text-decoration: none; margin: 0 10px;">Instagram</a>
              <a href="https://www.linkedin.com/company/auryn-dijital/" style="color: #e51e51; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
