import { Search, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useShop } from "@/contexts/ShopContext";

const navItems = [
  { label: "Novidades", href: "/catalogo?sort=new" },
  { label: "Rosto", href: "/catalogo?category=rosto" },
  { label: "Corpo", href: "/catalogo?category=corpo" },
  { label: "Cabelos", href: "/catalogo?category=cabelos" },
  { label: "Rituais", href: "/catalogo?category=rituais" },
];

export function Header() {
  const [location, setLocation] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cartCount } = useShop();

  const isActive = (href: string) => {
    const [path, search] = href.split("?");
    if (location.split("?")[0] !== path) return false;
    if (!search) return location === path;
    const target = new URLSearchParams(search);
    const current = new URLSearchParams(location.split("?")[1] || "");
    return Array.from(target.entries()).every(([key, value]) => current.get(key) === value);
  };

  const runSearch = () => {
    const trimmed = query.trim();
    if (trimmed) setLocation(`/catalogo?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
  };

  return (
    <>
      <div className="announcement-bar">Frete grátis acima de R$ 149 · parcele em até 3x sem juros</div>
      <header className="site-header">
        <div className="header-main">
          <button className="icon-button mobile-only" aria-label="Abrir busca" onClick={() => setSearchOpen(true)}><Search size={19} /></button>
          <Link href="/" className="brand" aria-label="VELA início">
            <span className="brand-mark">V</span>
            <span><strong>VELA</strong><small>clean beauty</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""}>{item.label}</Link>)}
          </nav>
          <div className="header-actions">
            <button className="header-action desktop-only" onClick={() => setSearchOpen(true)} aria-label="Buscar"><Search size={18} /><span>Buscar</span></button>
            <Link href="/influenciadores" className="header-action desktop-only"><Sparkles size={17} /><span>Influencie</span></Link>
            <Link href="/conta" className="icon-button" aria-label="Minha conta"><UserRound size={19} /></Link>
            <Link href="/checkout" className="bag-button" aria-label={`${cartCount} itens no carrinho`}><ShoppingBag size={19} /><span>{cartCount}</span></Link>
          </div>
        </div>
        <nav className="mobile-nav" aria-label="Categorias">
          {navItems.slice(0, 5).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
      </header>
      {searchOpen && <div className="search-overlay" role="dialog" aria-label="Buscar produtos">
        <div className="search-panel">
          <div className="search-top"><span className="eyebrow">Buscar na VELA</span><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Fechar busca"><X size={20} /></button></div>
          <div className="search-field"><Search size={22} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && runSearch()} placeholder="O que você está procurando?" /><button onClick={runSearch}>Buscar</button></div>
          <p className="search-hint">Experimente “sérum”, “ritual” ou “cabelos”.</p>
        </div>
      </div>}
    </>
  );
}
