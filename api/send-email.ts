// Serverless Function para Vercel/similar
// Configure estas variáveis de ambiente na sua hospedagem:
// - WEB3FORMS_ACCESS_KEY: sua chave do Web3Forms
// - RECIPIENT_EMAIL: opcional (destino pode estar amarrado à key no Web3Forms)

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
  profession?: string;
}

interface FormData {
  planType: "individual" | "family" | "mei" | null;
  familySize: number;
  people: PersonData[];
  contactPreference: "whatsapp" | "telegram" | "phone" | null;
  consentLGPD: boolean;
  consentPartnerAndContact: boolean;
  selectedPlan: string | null;
  hasMEI?: boolean;
  primaryProfession?: string;

  // Anti-spam (honeypot)
  website?: string;
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  titular: "Titular",
  conjuge: "Cônjuge",
  filho: "Filho(a)",
  pai: "Pai",
  mae: "Mãe",
  outro: "Outro",
};

const PROFESSION_LABELS: Record<string, string> = {
  employee: "Empregado(a)",
  entrepreneur: "Empreendedor(a)",
  autonomous: "Autônomo(a)",
  liberal: "Profissional Liberal",
  retired: "Aposentado(a)",
  student: "Estudante",
  other: "Outro",
};

const CONTACT_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  phone: "Telefone",
};

const PLAN_LABELS: Record<string, string> = {
  medsenior_rj1: "MedSênior RJ1",
  medsenior_essencial: "MedSênior Essencial",
  hapvida: "Hapvida (Notrelife)",
  prevent_senior: "Prevent Senior MA+S",
  other_options: "Solicita outras opções",
};

function safeLabel(
  key: string | null | undefined,
  dict: Record<string, string>,
): string {
  if (!key) return "Não informado";
  return dict[key] || key;
}

function generateEmailHTML(data: FormData): string {
  const titular = data.people.find((p) => p.isHolder);
  const dependentes = data.people.filter((p) => !p.isHolder);

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
              <h2 style="color: #0f172a; margin: 0; font-size: 22px; border-left: 4px solid #64748b; padding-left: 15px;">
                Nova Cotação de Plano de Saúde
              </h2>
              <p style="color: #64748b; margin: 10px 0 0; font-size: 14px;">
                Recebida em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}
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
                      <strong>Tipo:</strong> ${
                        data.planType === "family" ? "Familiar" : 
                        data.planType === "mei" ? "MEI/Empresarial" : 
                        "Individual"
                      }<br>
                      <strong>Pessoas:</strong> ${data.familySize}<br>
                      ${data.primaryProfession ? `<strong>Profissão:</strong> ${PROFESSION_LABELS[data.primaryProfession] || data.primaryProfession}<br>` : ''}
                      ${data.hasMEI ? `<strong>MEI/CNPJ:</strong> Sim<br>` : ''}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Oportunidades de Redução de Custo -->
          ${
            data.primaryProfession === 'employee' || 
            data.primaryProfession === 'autonomous' || 
            data.primaryProfession === 'liberal' ||
            data.hasMEI
              ? `
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 10px; color: #047857; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">💰 Oportunidade de Redução de Custo</p>
                    <p style="margin: 0; color: #065f46; font-size: 14px;">
                      ${
                        data.hasMEI
                          ? '✓ Elegível para <strong>Plano Empresarial/MEI</strong> com custos otimizados'
                          : ''
                      }
                      ${
                        (data.primaryProfession === 'employee' || 
                         data.primaryProfession === 'autonomous' || 
                         data.primaryProfession === 'liberal') && !data.hasMEI
                          ? '✓ Pode ter acesso a <strong>Planos por Adesão</strong> com descontos para sua categoria profissional'
                          : ''
                      }
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
              `
              : ''
          }


          <!-- Titular -->
          ${
            titular
              ? `
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 5px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">👑 Titular / Responsável</p>
                    <h3 style="margin: 0 0 15px; color: #0f172a; font-size: 20px;">${titular.fullName}</h3>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #475569; font-size: 14px; padding: 3px 0;">📅 ${titular.birthDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #475569; font-size: 14px; padding: 3px 0;">📱 ${titular.phone}</td>
                      </tr>
                      <tr>
                        <td style="color: #475569; font-size: 14px; padding: 3px 0;">✉️ ${titular.email}</td>
                      </tr>
                      <tr>
                        <td style="color: #475569; font-size: 14px; padding: 3px 0;">📍 ${titular.city} - ${titular.state}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
              : ""
          }
          
          <!-- Dependentes -->
          ${
            dependentes.length > 0
              ? `
          <tr>
            <td style="padding: 0 40px 20px;">
              <p style="margin: 0 0 15px; color: #0f172a; font-size: 16px; font-weight: 600;">Dependentes (${dependentes.length})</p>
              ${dependentes
                .map(
                  (dep, index) => `
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
              `,
                )
                .join("")}
            </td>
          </tr>
          `
              : ""
          }
          
          <!-- Contact Preference -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 8px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 5px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📞 Preferência de Contato</p>
                    <p style="margin: 0; color: #334155; font-size: 16px; font-weight: 600;">
                      ${CONTACT_LABELS[data.contactPreference || ""] || "Não informado"}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Consents -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 8px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 10px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">✅ Consentimentos</p>
                    <p style="margin: 0; color: #475569; font-size: 14px;">
                      ${data.consentLGPD ? "✓" : "✗"} LGPD - Tratamento de dados pessoais<br>
                      ${data.consentPartnerAndContact ? "✓" : "✗"} Contato e compartilhamento com parceiros
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

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Helper para extrair texto simples do HTML
function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper para criar FormData compatível com Node.js
function createFormDataPayload(data: Record<string, string>): string {
  return Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
}

// Envio secundário para FormSubmit (backup/fallback)
async function sendToFormSubmit(
  emailHTML: string,
  subject: string,
  titular: any,
): Promise<boolean> {
  try {
    const formSubmitEmail =
      process.env.RECIPIENT_EMAIL || "rosacode9@gmail.com";

    // Preparar dados em formato application/x-www-form-urlencoded
    const formData: Record<string, string> = {
      subject: subject,
      message: htmlToPlainText(emailHTML), // Converter HTML para texto
      _html: emailHTML, // Também enviar HTML
      _replyto: titular.email || "",
      _template: "box", // Template básico do FormSubmit
      _captcha: "false", // Desabilita captcha (já temos validação)
    };

    const formDataString = createFormDataPayload(formData);

    const response = await fetch(`https://formsubmit.co/${formSubmitEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formDataString,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("FormSubmit error:", response.status, errorText);
      return false;
    }

    console.log("FormSubmit: Email enviado com sucesso (backup)");
    return true;
  } catch (error) {
    console.error("FormSubmit failed:", error);
    return false;
  }
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const formData: FormData = req.body;

    // Anti-spam simples (honeypot). Se vier preenchido, ignora.
    if (formData.website && String(formData.website).trim().length > 0) {
      return res.status(200).json({
        success: true,
        message: "OK",
      });
    }

    // Validate required fields
    if (!formData.people || formData.people.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Dados do formulário inválidos",
      });
    }

    const titular = formData.people.find((p) => p.isHolder);
    if (!titular) {
      return res.status(400).json({
        success: false,
        message: "Titular não encontrado",
      });
    }

    // Verificar configuração do Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada");
      return res.status(500).json({
        success: false,
        message: "Configuração de email não encontrada",
      });
    }

    // Gerar conteúdo do email
    const emailHTML = generateEmailHTML(formData);
    const planLabel = safeLabel(formData.selectedPlan, PLAN_LABELS);
    const subject = `Nova Cotação - ${titular.fullName} - ${planLabel}`;

    // ========================================
    // ENVIO PRINCIPAL: Resend
    // ========================================
    const resend = new Resend(RESEND_API_KEY);

    let resendSuccess = false;
    let resendError = null;

    try {
      const { data, error } = await resend.emails.send({
        from: "Quantify <onboarding@resend.dev>", // Sandbox mode
        to: [process.env.RECIPIENT_EMAIL || "rosacode9@gmail.com"],
        replyTo: titular.email,
        subject: subject,
        html: emailHTML,
      });

      if (error) {
        console.error("Resend error:", error);
        resendError = error;
      } else {
        resendSuccess = true;
        console.log("Resend: Email enviado com sucesso", data);
      }
    } catch (error) {
      console.error("Resend failed:", error);
      resendError = error;
    }

    // ========================================
    // FALLBACK: FormSubmit
    // ========================================
    let formSubmitSuccess = false;

    if (!resendSuccess) {
      console.log("Tentando fallback via FormSubmit...");
      formSubmitSuccess = await sendToFormSubmit(emailHTML, subject, titular);
    }

    // ========================================
    // RETORNO AO CLIENTE
    // ========================================
    if (resendSuccess) {
      return res.status(200).json({
        success: true,
        message: "Email enviado com sucesso",
      });
    }

    if (formSubmitSuccess) {
      return res.status(200).json({
        success: true,
        message: "Email enviado via serviço alternativo",
        warning: "Serviço principal temporariamente indisponível",
      });
    }

    // Ambos falharam
    return res.status(500).json({
      success: false,
      message: "Erro ao enviar email. Por favor, tente novamente mais tarde.",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
