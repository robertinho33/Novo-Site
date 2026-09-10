import { Check, MessageCircle, PenLine, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useReviews } from "@/contexts/ReviewsContext";
import { RatingStars } from "@/components/site/RatingStars";

export function ProductReviews({ productId }: { productId: string }) {
  const { getReviews, addReview } = useReviews();
  const reviews = getReviews(productId);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("recentes");
  const [form, setForm] = useState({ name: "", title: "", body: "" });
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const sortedReviews = [...reviews].sort((a, b) => sort === "maiores" ? b.rating - a.rating : sort === "menores" ? a.rating - b.rating : 0);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!rating) return toast.error("Escolha uma nota de 1 a 5 estrelas.");
    addReview({ productId, author: form.name.trim() || "Cliente VELA", title: form.title.trim() || "Minha experiência", body: form.body.trim(), rating });
    setForm({ name: "", title: "", body: "" }); setRating(0); setShowForm(false);
    toast.success("Obrigada por compartilhar sua experiência.");
  };
  return <section className="reviews-section container" id="avaliacoes"><div className="reviews-heading"><div><p className="eyebrow">O que a comunidade diz</p><h2>Avaliações que <em>ficam.</em></h2><p className="reviews-subtitle">Experiências reais de quem já colocou esse essencial na rotina.</p></div><button className="button button-outline review-trigger" onClick={() => setShowForm((value) => !value)}><PenLine size={15} /> {showForm ? "Fechar" : "Avaliar produto"}</button></div><div className="reviews-summary"><div className="reviews-score"><strong>{average ? average.toFixed(1).replace(".", ",") : "—"}</strong><RatingStars value={Math.round(average)} size={15} /><span>{reviews.length} avaliações</span></div><div className="rating-bars">{[5, 4, 3, 2, 1].map((ratingValue) => { const count = reviews.filter((review) => review.rating === ratingValue).length; return <div className="rating-bar" key={ratingValue}><span>{ratingValue}</span><div><i style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }} /></div><small>{count}</small></div>; })}</div><div className="verified-note"><Check size={15} /><span><strong>Compra verificada</strong><br />Opiniões de clientes VELA.</span></div></div>{showForm && <form className="review-form" onSubmit={submit}><div className="review-form-head"><div><p className="eyebrow">Sua experiência importa</p><h3>Conte como foi.</h3></div><RatingStars value={rating} size={20} interactive onChange={setRating} /></div><div className="review-form-grid"><label>Seu nome<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Como podemos te chamar?" /></label><label>Título da avaliação<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Resuma sua experiência" /></label><label className="review-span-2">Comentário<textarea required value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="O que você mais gostou?" rows={4} /></label></div><button className="button button-dark" type="submit">Publicar avaliação <MessageCircle size={15} /></button></form>}<div className="reviews-toolbar"><span>{reviews.length} opiniões</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar avaliações"><option value="recentes">Mais recentes</option><option value="maiores">Maiores notas</option><option value="menores">Menores notas</option></select></div><div className="review-list">{sortedReviews.length ? sortedReviews.map((review) => <article className="review-item" key={review.id}><div className="review-avatar"><UserRound size={16} /></div><div className="review-body"><div className="review-meta"><div><strong>{review.author}</strong>{review.verified && <span className="verified-label"><Check size={11} /> compra verificada</span>}</div><time>{review.date}</time></div><RatingStars value={review.rating} size={12} /><h3>{review.title}</h3><p>{review.body}</p></div></article>) : <div className="empty-reviews"><MessageCircle size={20} /><p>Seja a primeira pessoa a avaliar este produto.</p></div>}</div></section>;
}
