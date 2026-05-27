document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault(); 
  
  const btn = document.getElementById('submit-btn');
  const responseDiv = document.getElementById('form-response');
  
  btn.innerText = 'Enviando...';
  btn.disabled = true;

  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    
    const response = await fetch('/.netlify/functions/enviar-email', {
      method: 'POST',
      body: JSON.stringify({ email, message })
    });

    if (response.ok) {
      responseDiv.style.color = 'var(--neon-green)';
      responseDiv.innerText = 'Mensagem enviada com sucesso! GG WP.';
      document.getElementById('contact-form').reset(); 
    } else {
      throw new Error('Erro no servidor');
    }
  } catch (error) {
    responseDiv.style.color = '#ff3333';
    responseDiv.innerText = 'Ops! Algo deu errado ao enviar. Tente novamente.';
  } finally {
    
    responseDiv.style.display = 'block';
    btn.innerText = 'Enviar Ticket';
    btn.disabled = false;
  }
});