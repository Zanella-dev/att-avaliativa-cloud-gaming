const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Bloqueia se tentarem acessar de outra forma que não seja enviando o formulário
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método não permitido" };
  }

  try {
    const { email, message } = JSON.parse(event.body);

    // Cria o "carteiro" usando as configurações do Gmail que faremos depois
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Variável que vamos criar no Netlify
        pass: process.env.EMAIL_PASS  // Variável que vamos criar no Netlify
      }
    });

    // Monta o e-mail bonitinho que vai chegar para o professor
    await transporter.sendMail({
      from: `"Suporte NexusPlay" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, 
      subject: `🎮 Novo Ticket de Suporte de: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #1a1a2e; color: #ffffff;">
          <h2 style="color: #00ff66;">Novo chamado recebido!</h2>
          <p><strong>E-mail do Jogador:</strong> ${email}</p>
          <p><strong>Problema relatado:</strong></p>
          <p style="background: #0a0a0f; padding: 15px; border-left: 4px solid #b100ff;">${message}</p>
        </div>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "E-mail enviado!" })
    };
  } catch (error) {
    console.error("Erro ao enviar:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno no servidor" })
    };
  }
};