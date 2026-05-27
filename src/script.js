// Captura o formulário quando o botão "Enviar Ticket" é clicado
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault(); // Evita que a página recarregue
  
  const btn = document.getElementById('submit-btn');
  const responseDiv = document.getElementById('form-response');
  
  // Muda o botão para mostrar que está carregando
  btn.innerText = 'Enviando...';
  btn.disabled = true;

  // Pega os valores digitados
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    // Envia os dados para a nossa Netlify Function
    const response = await fetch('/.netlify/functions/enviar-email', {
      method: 'POST',
      body: JSON.stringify({ email, message })
    });

    if (response.ok) {
      responseDiv.style.color = 'var(--neon-green)';
      responseDiv.innerText = 'Mensagem enviada com sucesso! GG WP.';
      document.getElementById('contact-form').reset(); // Limpa os campos
    } else {
      throw new Error('Erro no servidor');
    }
  } catch (error) {
    responseDiv.style.color = '#ff3333';
    responseDiv.innerText = 'Ops! Algo deu errado ao enviar. Tente novamente.';
  } finally {
    // Restaura o botão ao normal
    responseDiv.style.display = 'block';
    btn.innerText = 'Enviar Ticket';
    btn.disabled = false;
  }
});