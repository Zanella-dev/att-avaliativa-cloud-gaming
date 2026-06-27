import { useState, useEffect } from "react";
import "../styles/index.css";
import PricingCard from "../components/PricingCard";

export default function Home() {
    // 1º Hook Avançado (Guia do Professor): Estado do Menu Mobile e do Formulário
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [mensagemStatus, setMensagemStatus] = useState("");
    const [statusCor, setStatusCor] = useState("");

    // 2º Hook Avançado (Guia do Professor): Efeito colateral para travar o scroll
    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            html.style.overflow = showMobileMenu ? "hidden" : "auto";
        }
    }, [showMobileMenu]);

    // Função assíncrona do formulário (Fetch API conectando com o Netlify Functions)
    async function enviarEmail(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const form = event.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

        setMensagemStatus("Carregando...");
        setStatusCor("var(--text-muted)");
        
        try {
            // Chama a sua Netlify Function
            const response = await fetch('/api/enviar-email', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                // Mapeando 'message' para 'mensagem' para bater com o seu backend
                body: JSON.stringify({ email: email, mensagem: message }) 
            });

            if(response.ok) {
                setMensagemStatus("Ticket enviado com sucesso! GG WP. 🎮");
                setStatusCor("var(--neon-green)");
                form.reset();
            } else {
                setMensagemStatus("Erro ao enviar o ticket. Tente novamente.");
                setStatusCor("red");
            }
        } catch (error) {
            setMensagemStatus("Erro de conexão com o servidor.");
            setStatusCor("red");
        }
    }

    return (
        <>
            <header className="header">
                <div className="logo">Nexus<span className="text-green">Play</span></div>
                
                {/* Botão Mobile que aciona o useState */}
                <button 
                    className="mobile-menu-btn" 
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? "Fechar" : "Menu"}
                </button>

                {/* Menu de Navegação com classe dinâmica do React */}
                <nav className={`nav-menu ${showMobileMenu ? 'mobile-active' : ''}`}>
                    <a href="#inicio" onClick={() => setShowMobileMenu(false)}>Home</a>
                    <a href="#solucoes" onClick={() => setShowMobileMenu(false)}>Soluções</a>
                    <a href="#planos" onClick={() => setShowMobileMenu(false)}>Preços</a>
                    <a href="#contato" onClick={() => setShowMobileMenu(false)}>Contato</a>
                </nav>
                <div className="nav-buttons">
                    <a href="#" className="btn-login">Login</a>
                    <a href="#" className="btn btn-green">Cadastre-se</a>
                </div>
            </header>

            <section className="hero-section" id="inicio">
                <span className="tag-olha text-purple">PLAYER 1 START</span>
                <h1>O seu PC da Xuxa acaba de virar uma máquina High-End</h1>
                <p>Jogue os lançamentos AAA mais pesados direto do seu navegador, sem precisar de uma placa de vídeo cara. O verdadeiro Cloud Gaming chegou.</p>
                <div className="hero-buttons">
                    <a href="#planos" className="btn btn-green">Ver Planos</a>
                    <a href="#solucoes" className="btn btn-outline">Descubra como funciona</a>
                </div>
            </section>

            <section className="pricing-section" id="planos">
                <h4 className="text-green">Planos e Assinaturas</h4>
                <h2>Escolha seu XP</h2>
                
                <div className="pricing-cards">
                    {/* DESAFIO DO GUIA CONCLUÍDO: Renderizando via Componente e Props */}
                    <PricingCard 
                        titulo="Casual"
                        descricao="Jogue títulos indies e clássicos diretamente do seu navegador."
                        preco="Grátis"
                        beneficios={[
                            "Com anúncios ocasionais",
                            "Resolução de 1080p",
                            "Sessões de até 2 horas"
                        ]}
                    />

                    <PricingCard 
                        titulo="Pro Gamer"
                        descricao="Acesso total aos lançamentos AAA e fila prioritária nos servidores."
                        preco="R$ 49,90"
                        isPremium={true}
                        beneficios={[
                            "Zero interrupções ou anúncios",
                            "Qualidade 4K a 60FPS com Ray Tracing",
                            "Sessões ilimitadas",
                            "Catálogo completo liberado"
                        ]}
                    />

                    <PricingCard 
                        titulo="Streamer"
                        descricao="Ferramentas dedicadas para criadores de conteúdo e transmissões ao vivo."
                        preco="R$ 89,90"
                        beneficios={[
                            "Integração direta (Twitch/YouTube)",
                            "Acesso antecipado a jogos em Beta",
                            "Latência ultra-baixa (Servidor VIP)"
                        ]}
                    />
                </div>
            </section>

            <section className="contact-section" id="contato">
                <div className="contact-container">
                    <h4 className="text-green">Suporte ao Jogador</h4>
                    <h2>Reporte um Bug ou Dúvida</h2>
                    <p>Teve algum problema com o ping ou quer sugerir um jogo novo para o catálogo? Nossa equipe de suporte está pronta para o co-op. 🎮</p>
                    
                    {/* Formulário com evento onSubmit do React */}
                    <form id="contact-form" className="contact-form" onSubmit={enviarEmail}>
                        <input type="email" id="email" name="email" placeholder="Seu e-mail cadastrado" required />
                        <textarea id="message" name="message" placeholder="Qual o problema? Ex: O save do The Witcher 3 não sincronizou na nuvem." required></textarea>
                        <button type="submit" className="btn btn-green" id="submit-btn">Enviar Ticket</button>
                    </form>
                    
                    {/* Renderização Condicional da Mensagem de Retorno */}
                    {mensagemStatus && (
                        <div className="form-message" style={{ display: 'block', color: statusCor, marginTop: '20px' }}>
                            {mensagemStatus}
                        </div>
                    )}
                </div>
            </section>

            <footer className="footer-section">
                <div className="footer-container">
                    <div className="footer-brand">
                        <h3>Nexus<span className="text-green">Play</span></h3>
                        <div className="social-icons">
                            <a href="#">Discord</a>
                            <a href="#">Twitch</a>
                            <a href="#">Twitter</a>
                        </div>
                    </div>
                    
                    <div className="footer-links">
                        <div className="link-col">
                            <h4>Plataforma</h4>
                            <a href="#">Catálogo</a>
                            <a href="#">Planos</a>
                            <a href="#">Requisitos</a>
                        </div>
                        <div className="link-col">
                            <h4>Empresa</h4>
                            <a href="#">Sobre nós</a>
                            <a href="#">Carreiras</a>
                            <a href="#">Blog</a>
                        </div>
                        <div className="link-col">
                            <h4>Suporte</h4>
                            <a href="#">Ajuda</a>
                            <a href="#">Status do Servidor</a>
                            <a href="#">Fórum</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Feito com muito energético e código 💻 ©2026 NexusPlay - Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}