
import nodemailer from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as dotenv  from "dotenv"
dotenv.config()


const HOST =  process.env.MAIL_HOST || " "; 
const PORT =  process.env.MAIL_PORT || 587;
const USER =  process.env.MAIL_USER || " "; 
const PASS =  process.env.MAIL_PASS || " "; 
const FROM =  process.env.MAIL_FROM || " "; 

const transporter = nodemailer.createTransport({
  host:HOST,
  port:PORT,
  secure: false, 
  auth: {
    user: USER,
    pass: PASS, 
  },
  tls: {
    rejectUnauthorized: false, 
  },
}as SMTPTransport.Options);

export const sendEmail = async (to: string,url:string) => {
  try {
    await transporter.sendMail({
      from: FROM,
      to, 
      subject:"TrilhaVerde[Redefinição de Senha]",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="text-align: center; color: #0ec73f;">Redefinição de Senha</h2>
        <p style="font-size: 16px; color: #333;">
          Olá,
        </p>
        <p style="font-size: 16px; color: #333;">
          Recebemos uma solicitação para redefinir a senha da sua conta. Se você não fez essa solicitação, ignore este email. Caso contrário, clique no botão abaixo para redefinir sua senha:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="http://localhost:3002/login/${url}"
             style="background-color: #0ec73f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Redefinir Senha
          </a>
        </div>
        <p style="font-size: 16px; color: #333;">
          Este link é válido por 24 horas. Após esse período, você precisará solicitar uma nova redefinição de senha.
        </p>
        <p style="font-size: 16px; color: #333;">
          Atenciosamente,<br/>
          Equipe de Suporte 
        </p>
      </div>
    `
    });
    console.log('Email enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};