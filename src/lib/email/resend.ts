import { Resend } from 'resend';
import { SEOAnalysisResult, SEOMetric } from '@/lib/ai/gemini';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

interface SendSEOReportParams {
  to: string;
  domain: string;
  analysis: SEOAnalysisResult;
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'success': return '✅';
    case 'error': return '❌';
    case 'warning': return '⚠️';
    default: return '❓';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'success': return '#28a745';
    case 'error': return '#dc3545';
    case 'warning': return '#ffc107';
    default: return '#6c757d';
  }
}

function getStatusBgColor(status: string): string {
  switch (status) {
    case 'success': return '#f0fff4';
    case 'error': return '#fff5f5';
    case 'warning': return '#fffbf0';
    default: return '#f8f9fa';
  }
}

function renderMetricItem(metric: SEOMetric): string {
  const icon = getStatusIcon(metric.status);
  const color = getStatusColor(metric.status);
  const bgColor = getStatusBgColor(metric.status);

  return `
    <div style="margin-bottom: 15px; padding: 15px; border-left: 4px solid ${color}; background: ${bgColor}; border-radius: 4px;">
      <p style="margin: 0 0 5px 0; font-weight: bold; color: #333; font-size: 16px;">${icon} ${metric.label}</p>
      <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.5;">${metric.message}</p>
    </div>
  `;
}

export async function sendSEOReport({ to, domain, analysis }: SendSEOReportParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Auryn Dijital <onboarding@resend.dev>',
      to: [to],
      subject: `${domain} - Profesyonel SEO Analiz Raporu`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SEO Analiz Raporu</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #e51e51 0%, #9089fc 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Auryn Dijital</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">Google E-E-A-T Standartlarında SEO Analizi</p>
          </div>

          <!-- Score Section -->
          <div style="background: white; padding: 40px; text-align: center;">
            <h2 style="color: #333; margin: 0 0 20px 0;">Genel SEO Puanınız</h2>
            <div style="display: inline-block; background: linear-gradient(135deg, #e51e51 0%, #9089fc 100%); border-radius: 50%; width: 180px; height: 180px; line-height: 180px; box-shadow: 0 8px 16px rgba(0,0,0,0.15);">
              <span style="font-size: 56px; font-weight: bold; color: white;">${analysis.score}</span>
              <span style="font-size: 24px; color: rgba(255,255,255,0.9);">/100</span>
            </div>
            <p style="margin: 25px 0 0 0; color: #666; font-size: 16px;">Domain: <strong>${domain}</strong></p>
          </div>

          <!-- Metrics Section -->
          <div style="background: white; padding: 40px; margin-top: 2px;">
            <h2 style="color: #e51e51; margin: 0 0 30px 0; padding-bottom: 15px; border-bottom: 3px solid #e51e51;">📊 Detaylı Analiz Raporu</h2>
            
            ${analysis.metrics.map(metric => renderMetricItem(metric)).join('')}
          </div>

          <!-- CTA Section -->
          <div style="background: linear-gradient(135deg, #e51e51 0%, #9089fc 100%); padding: 40px; text-align: center; border-radius: 0 0 10px 10px; margin-top: 2px;">
            <h3 style="color: white; margin: 0 0 15px 0;">Sitenizi Optimize Etmek İster misiniz?</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 25px 0; font-size: 16px;">Uzman ekibimizle tanışın ve SEO stratejinizi bir üst seviyeye taşıyın.</p>
            <a href="https://auryndijital.com/iletisim" style="display: inline-block; background: white; color: #e51e51; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
              Hemen İletişime Geçin
            </a>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; padding: 25px; text-align: center; color: #666; font-size: 13px; background: white; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Auryn Dijital - Veri Odaklı Dijital Pazarlama & SEO</p>
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

// New function for detailed SEO report with PageSpeed data
export async function sendSEOReportEmail(email: string, url: string, analysisData: any) {
  try {
    const scores = analysisData.scores || {};
    const opportunities = analysisData.opportunities || [];
    const metrics = analysisData.metrics || [];

    const { data, error } = await resend.emails.send({
      from: 'Auryn Dijital <onboarding@resend.dev>',
      to: [email],
      subject: `${url} - Detaylı SEO Analiz Raporu`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Detaylı SEO Raporu</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #e51e51 0%, #9089fc 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Auryn Dijital</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">Detaylı SEO Analiz Raporu</p>
          </div>

          <!-- Scores Section -->
          <div style="background: white; padding: 40px; margin-top: 2px;">
            <h2 style="color: #333; margin: 0 0 30px 0; text-align: center;">Google PageSpeed Skorları</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 36px; font-weight: bold; color: ${scores.performance >= 80 ? '#28a745' : scores.performance >= 50 ? '#ffc107' : '#dc3545'};">${scores.performance || 0}</div>
                <div style="font-size: 14px; color: #666; margin-top: 8px;">Performance</div>
              </div>
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 36px; font-weight: bold; color: ${scores.accessibility >= 80 ? '#28a745' : scores.accessibility >= 50 ? '#ffc107' : '#dc3545'};">${scores.accessibility || 0}</div>
                <div style="font-size: 14px; color: #666; margin-top: 8px;">Accessibility</div>
              </div>
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 36px; font-weight: bold; color: ${scores.bestPractices >= 80 ? '#28a745' : scores.bestPractices >= 50 ? '#ffc107' : '#dc3545'};">${scores.bestPractices || 0}</div>
                <div style="font-size: 14px; color: #666; margin-top: 8px;">Best Practices</div>
              </div>
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 36px; font-weight: bold; color: ${scores.seo >= 80 ? '#28a745' : scores.seo >= 50 ? '#ffc107' : '#dc3545'};">${scores.seo || 0}</div>
                <div style="font-size: 14px; color: #666; margin-top: 8px;">SEO</div>
              </div>
            </div>
            <p style="margin: 25px 0 0 0; color: #666; font-size: 14px; text-align: center;">Analiz edilen URL: <strong>${url}</strong></p>
          </div>

          <!-- Opportunities Section -->
          ${opportunities.length > 0 ? `
          <div style="background: white; padding: 40px; margin-top: 2px;">
            <h2 style="color: #e51e51; margin: 0 0 25px 0; padding-bottom: 15px; border-bottom: 3px solid #e51e51;">🚀 Gelişme Fırsatları</h2>
            ${opportunities.slice(0, 10).map((opp: any) => `
              <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0 0 5px 0; font-weight: bold; color: #333; font-size: 15px;">${opp.category}: ${opp.title}</p>
                ${opp.savings > 0 ? `<p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">⚡ Potansiyel tasarruf: ~${Math.round(opp.savings)}ms</p>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          <!-- Metrics Section -->
          ${metrics.length > 0 ? `
          <div style="background: white; padding: 40px; margin-top: 2px;">
            <h2 style="color: #e51e51; margin: 0 0 25px 0; padding-bottom: 15px; border-bottom: 3px solid #e51e51;">📊 Teknik SEO Analizi</h2>
            ${metrics.map((metric: any) => renderMetricItem(metric)).join('')}
          </div>
          ` : ''}

          <!-- CTA Section -->
          <div style="background: linear-gradient(135deg, #e51e51 0%, #9089fc 100%); padding: 40px; text-align: center; border-radius: 0 0 10px 10px; margin-top: 2px;">
            <h3 style="color: white; margin: 0 0 15px 0;">Sitenizi Optimize Etmek İster misiniz?</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 25px 0; font-size: 16px;">Uzman ekibimizle tanışın ve SEO stratejinizi bir üst seviyeye taşıyın.</p>
            <a href="https://auryndijital.com/iletisim" style="display: inline-block; background: white; color: #e51e51; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
              Hemen İletişime Geçin
            </a>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; padding: 25px; text-align: center; color: #666; font-size: 13px; background: white; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Auryn Dijital - Veri Odaklı Dijital Pazarlama & SEO</p>
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
      throw new Error('Email gönderilemedi');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send SEO report email:', error);
    throw error;
  }
}
