// Arquivo: src/components/PricingCard.tsx

interface PricingCardProps {
    titulo: string;
    descricao: string;
    preco: string;
    isPremium?: boolean;
    beneficios: string[];
}

export default function PricingCard({ titulo, descricao, preco, isPremium, beneficios }: PricingCardProps) {
    return (
        <div className={`card ${isPremium ? 'card-premium' : ''}`}>
            {isPremium && <div className="badge bg-purple">1 MÊS GRÁTIS</div>}
            
            <h3>{titulo}</h3>
            <p>{descricao}</p>
            
            <div className={`price ${isPremium ? 'text-white' : ''}`}>
                {preco}
                {preco !== "Grátis" && <span>/mês</span>}
            </div>
            
            <a href="#" className={`btn ${isPremium ? 'btn-purple-card' : 'btn-outline-card'}`}>
                {isPremium ? 'Assinar Premium' : 'Jogar agora'}
            </a>
            
            <ul>
                {beneficios.map((beneficio, index) => (
                    <li key={index}>{beneficio}</li>
                ))}
            </ul>
        </div>
    );
}