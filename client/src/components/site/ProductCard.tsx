import { Check, Eye, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { money, type Product } from "@/lib/catalog";
import { useShop } from "@/contexts/ShopContext";
import { QuickViewModal } from "@/components/site/QuickViewModal";
import { useReviews } from "@/contexts/ReviewsContext";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useShop();
  const { getReviews } = useReviews();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const reviews = getReviews(product.id);
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 4.9;
  const add = () => { addToCart(product); toast.success(`${product.name} foi para a sua sacola`, { description: "Você pode revisar tudo no checkout." }); };
  return <>
    <article className="product-card" style={{ animationDelay: `${index * 45}ms` }}>
      <div className="product-image-wrap" style={{ backgroundColor: product.tone }}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Link href={`/produto/${product.slug}`} className="product-image-link"><img src={product.image} alt={product.name} loading={index > 3 ? "lazy" : "eager"} /></Link>
        <div className="product-hover-actions"><button className="quick-view-trigger" onClick={() => setQuickViewOpen(true)}><Eye size={15} /> Ver rápido</button><button className="quick-add" onClick={add}><Plus size={16} /> Adicionar</button></div>
      </div>
      <div className="product-info"><div><Link href={`/produto/${product.slug}`} className="product-name">{product.name}</Link><p className="product-meta">{product.categoryLabel} · {product.size}</p></div><div className="product-price"><strong>{money(product.price)}</strong>{product.compareAt && <del>{money(product.compareAt)}</del>}</div></div>
      <div className="product-rating"><Star size={12} fill="currentColor" /> {average.toFixed(1).replace(".", ",")} <span>·</span> {reviews.length || 128} avaliações</div>
    </article>
    {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
  </>;
}

export function AddedState({ text = "Adicionado" }: { text?: string }) { return <span className="added-state"><Check size={15} /> {text}</span>; }
