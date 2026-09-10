import { ArrowUpRight, Instagram, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-newsletter">
      <div><p className="eyebrow">Carta VELA</p><h2>Um pouco de beleza<br /><em>no seu inbox.</em></h2></div>
      <form onSubmit={(event) => event.preventDefault()} className="newsletter-form"><input type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail" /><button type="submit">Quero receber <ArrowUpRight size={16} /></button></form>
    </div>
    <div className="footer-grid">
      <div className="footer-brand"><Link href="/" className="brand"><span className="brand-mark">V</span><span><strong>VELA</strong><small>clean beauty</small></span></Link><p>Beleza que respeita seu tempo, sua pele e o planeta.</p><div className="footer-social"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href="mailto:ola@vela.beauty" aria-label="E-mail"><Mail size={17} /></a></div></div>
      <div><p className="footer-title">Descubra</p><Link href="/catalogo">Todos os produtos</Link><Link href="/catalogo?sort=new">Novidades</Link><Link href="/influenciadores">Programa VELA creators</Link><Link href="/">Nosso manifesto</Link></div>
      <div><p className="footer-title">Ajuda</p><Link href="/rastreio">Rastrear pedido</Link><Link href="/conta">Minha conta</Link><Link href="/">Trocas e devoluções</Link><Link href="/">Fale com a gente</Link></div>
      <div><p className="footer-title">Estamos por aqui</p><p className="footer-contact"><MapPin size={15} /> São Paulo · Brasil</p><p className="footer-contact"><ShieldCheck size={15} /> Compra protegida</p><p className="footer-small">Seg–sex, 9h às 18h<br />oi@vela.beauty</p></div>
    </div>
    <div className="footer-bottom"><span>© 2026 VELA Beauty Co.</span><span>Feito com calma, em pequenos lotes.</span><span>Privacidade · Termos</span></div>
  </footer>;
}
