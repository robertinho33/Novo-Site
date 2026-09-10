import { ArrowUpRight, Check, Minus, Plus, ShieldCheck, Star, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { money, type Product } from "@/lib/catalog";
import { useShop } from "@/contexts/ShopContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { RatingStars } from "@/components/site/RatingStars";
import { toast } from "sonner";

export function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useShop();
  const { getReviews } = useReviews();
  const [quantity, setQuantity] = useState(1);
  const reviews = getReviews(product.id);
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 4.9;
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose(); document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKeyDown); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); }; }, [onClose]);
  const add = () => { for (let index = 0; index < quantity; index += 1) addToCart(product); toast.success(`${product.name} foi para a sua sacola`); onClose(); };
  return <div className="quick-view-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="quick-view" role="dialog" aria-modal="true" aria-label={`Visualização rápida de ${product.name}`}><button className="quick-view-close" onClick={onClose} aria-label="Fechar"><X size={19} /></button><div className="quick-view-image" style={{ backgroundColor: product.tone }}><img src={product.image} alt={product.name} /></div><div className="quick-view-copy"><div className="quick-view-top"><p className="eyebrow">{product.categoryLabel} · {product.size}</p>{product.badge && <span className="quick-view-badge">{product.badge}</span>}</div><h2>{product.name}</h2><div className="quick-view-rating"><RatingStars value={Math.round(average)} size={13} /> <span>{average.toFixed(1).replace(".", ",")}</span><Link href={`/produto/${product.slug}#avaliacoes`} onClick={onClose}>{reviews.length || 128} avaliações</Link></div><p className="quick-view-description">{product.description}</p><div className="quick-view-price"><strong>{money(product.price)}</strong>{product.compareAt && <del>{money(product.compareAt)}</del>}</div><p className="installment">ou 3x de {money(product.price / 3)} sem juros</p><div className="quick-view-actions"><div className="quantity"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Diminuir"><Minus size={14} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Aumentar"><Plus size={14} /></button></div><button className="button button-dark" onClick={add}>Adicionar à sacola <Plus size={16} /></button></div><div className="quick-view-perks"><span><Truck size={14} /> Envio cuidadoso</span><span><ShieldCheck size={14} /> Compra protegida</span><span><Check size={14} /> Fórmula consciente</span></div><Link className="quick-view-detail" href={`/produto/${product.slug}`} onClick={onClose}>Ver todos os detalhes <ArrowUpRight size={15} /></Link></div></div></div>;
}
