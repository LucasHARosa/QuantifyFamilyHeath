// Serverless Function para Vercel/similar
// Configure estas variáveis de ambiente na sua hospedagem:
// - SENDGRID_API_KEY: sua chave API do SendGrid
// - RECIPIENT_EMAIL: email que receberá as cotações (ex: contato@quantifyco.com.br)

interface PersonData {
  id: string;
  isHolder: boolean;
  relationship: string;
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  state: string;
  city: string;
}

interface FormData {
  planType: "individual" | "family" | null;
  familySize: number;
  people: PersonData[];
  contactPreference: "whatsapp" | "telegram" | "phone" | null;
  consentLGPD: boolean;
  consentPartnerAndContact: boolean;
  selectedPlan: string | null;
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  titular: 'Titular',
  conjuge: 'Cônjuge',
  filho: 'Filho(a)',
  pai: 'Pai',
  mae: 'Mãe',
  outro: 'Outro',
};

const CONTACT_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  phone: 'Telefone',
};

const PLAN_LABELS: Record<string, string> = {
  medsenior_rj1: 'MedSênior RJ1',
  medsenior_essencial: 'MedSênior Essencial',
  hapvida: 'Hapvida (Notrelife)',
  prevent_senior: 'Prevent Senior MA+S',
  other_options: 'Solicita outras opções',
};

function generateEmailHTML(data: FormData): string {
  const titular = data.people.find(p => p.isHolder);
  const dependentes = data.people.filter(p => !p.isHolder);
  
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Cotação - Quantify</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f7fa;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Quantify</h1>
              <p style="color: #94a3b8; margin: 10px 0 0; font-size: 14px;">Consultoria em Planos de Saúde</p>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="color: #0f172a; margin: 0; font-size: 22px; border-left: 4px solid #0ea5e9; padding-left: 15px;">
                Nova Cotação de Plano de Saúde
              </h2>
              <p style="color: #64748b; margin: 10px 0 0; font-size: 14px;">
                Recebida em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
              </p>
            </td>
          </tr>

          <!-- Plan Info -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 10px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Informações do Plano</p>
                    <p style="margin: 0; color: #0f172a; font-size: 16px;">
                      <strong>Tipo:</strong> ${data.planType === 'family' ? 'Familiar' : 'Individual'}<br>
                      <strong>Pessoas:</strong> ${data.familySize}<br>
                      <strong>Plano Escolhido:</strong> <span style="color: #0ea5e9; font-weight: 600;">${PLAN_LABELS[data.selectedPlan || ''] || 'Não selecionado'}</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Titular -->
          ${titular ? `
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 5px; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">👑 Titular / Responsável</p>
                    <h3 style="margin: 0 0 15px; color: #ffffff; font-size: 20px;">${titular.fullName}</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: rgba(255,255,255,0.9); font-size: 14px; padding: 3px 0;">📅 ${titular.birthDate}</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255,255,255,0.9); font-size: 14px; padding: 3px 0;">📱 ${titular.phone}</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255,255,255,0.9); font-size: 14px; padding: 3px 0;">✉️ ${titular.email}</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255,255,255,0.9); font-size: 14px; padding: 3px 0;">📍 ${titular.city} - ${titular.state}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          <!-- Dependentes -->
          ${dependentes.length > 0 ? `
          <tr>
            <td style="padding: 0 40px 20px;">
              <p style="margin: 0 0 15px; color: #0f172a; font-size: 16px; font-weight: 600;">Dependentes (${dependentes.length})</p>
              ${dependentes.map((dep, index) => `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #64748b;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 5px; color: #64748b; font-size: 12px;">${RELATIONSHIP_LABELS[dep.relationship] || dep.relationship}</p>
                    <h4 style="margin: 0 0 10px; color: #0f172a; font-size: 16px;">${dep.fullName}</h4>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">
                      📅 ${dep.birthDate} &nbsp;|&nbsp; 📱 ${dep.phone}<br>
                      ✉️ ${dep.email} &nbsp;|&nbsp; 📍 ${dep.city} - ${dep.state}
                    </p>
                  </td>
                </tr>
              </table>
              `).join('')}
            </td>
          </tr>
          ` : ''}
          
          <!-- Contact Preference -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef3c7; border-radius: 8px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 5px; color: #92400e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📞 Preferência de Contato</p>
                    <p style="margin: 0; color: #78350f; font-size: 16px; font-weight: 600;">
                      ${CONTACT_LABELS[data.contactPreference || ''] || 'Não informado'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Consents -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ecfdf5; border-radius: 8px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 10px; color: #065f46; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">✅ Consentimentos</p>
                    <p style="margin: 0; color: #047857; font-size: 14px;">
                      ${data.consentLGPD ? '✓' : '✗'} LGPD - Tratamento de dados pessoais<br>
                      ${data.consentPartnerAndContact ? '✓' : '✗'} Contato e compartilhamento com parceiros
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 25px 40px; text-align: center;">
              <p style="margin: 0 0 5px; color: #ffffff; font-size: 16px; font-weight: 600;">Quantify Consultoria</p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Especialistas em operadoras de planos de saúde
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export default async function handler(req: Request): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  try {
    const formData: FormData = await req.json();
    
    // Validate required fields
    if (!formData.people || formData.people.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Dados do formulário inválidos' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const titular = formData.people.find(p => p.isHolder);
    if (!titular) {
      return new Response(
        JSON.stringify({ success: false, message: 'Titular não encontrado' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // SendGrid API call
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'contato@quantifyco.com.br';

    if (!SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY não configurada');
      return new Response(
        JSON.stringify({ success: false, message: 'Configuração de email não encontrada' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const emailHTML = generateEmailHTML(formData);
    const planLabel = PLAN_LABELS[formData.selectedPlan || ''] || 'Não selecionado';

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: RECIPIENT_EMAIL }],
          subject: `Nova Cotação - ${titular.fullName} - ${planLabel}`,
        }],
        from: {
          email: 'noreply@quantifyco.com.br',
          name: 'Quantify - Sistema de Cotações',
        },
        content: [{
          type: 'text/html',
          value: emailHTML,
        }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendGrid error:', errorText);
      return new Response(
        JSON.stringify({ success: false, message: 'Erro ao enviar email' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email enviado com sucesso' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Erro interno do servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
