const products = [
  {id:1,name:"Luminous Oil",desc:"Óleo finalizador • 50 ml",price:89.9,cat:"cabelo"},
  {id:2,name:"Silk Mask",desc:"Máscara nutritiva • 250 g",price:119.9,cat:"cabelo"},
  {id:3,name:"Daily Glow",desc:"Sérum iluminador • 30 ml",price:97.5,cat:"pele"},
  {id:4,name:"Soft Cleanse",desc:"Limpeza delicada • 200 ml",price:74.9,cat:"pele"},
  {id:5,name:"Calm Mist",desc:"Bruma para ritual • 100 ml",price:62.9,cat:"ritual"},
  {id:6,name:"Night Ritual",desc:"Kit essencial • 3 itens",price:159.9,cat:"ritual"},
  {id:7,name:"Gloss Drops",desc:"Tratamento brilho • 30 ml",price:82.9,cat:"cabelo"},
  {id:8,name:"Body Veil",desc:"Hidratação corporal • 200 ml",price:91.9,cat:"pele"}
];

let cart = JSON.parse(localStorage.getItem("aurea-cart") || "[]");

const money = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const productsEl = document.querySelector("#products");

function renderProducts(category="todos"){
  const list = category==="todos" ? products : products.filter(p=>p.cat===category);
  productsEl.innerHTML = list.map(p=>`
    <article class="product">
      <div class="product-visual"><span class="tag">${p.cat.toUpperCase()}</span></div>
      <div class="product-info">
        <h3>${p.name}</h3><p>${p.desc}</p>
        <div class="product-bottom"><span class="price">${money(p.price)}</span>
        <button class="add" data-add="${p.id}" aria-label="Adicionar ${p.name}">+</button></div>
      </div>
    </article>`).join("");
}

function save(){localStorage.setItem("aurea-cart",JSON.stringify(cart)); renderCart();}
function add(id){cart.push(id);save();openCart();}
function renderCart(){
  const grouped = [...new Set(cart)].map(id=>products.find(p=>p.id===id)).filter(Boolean);
  document.querySelector("#cartCount").textContent=cart.length;
  const el=document.querySelector("#cartItems");
  if(!cart.length){el.innerHTML='<div class="empty">Sua sacola está esperando por você.</div>';document.querySelector("#cartTotal").textContent=money(0);return;}
  el.innerHTML=grouped.map(p=>{
    const qty=cart.filter(x=>x===p.id).length;
    return `<div class="cart-row"><div class="mini"></div><div><h4>${p.name}</h4><small>${qty} × ${money(p.price)}</small></div><button class="remove" data-remove="${p.id}">remover</button></div>`;
  }).join("");
  document.querySelector("#cartTotal").textContent=money(cart.reduce((s,id)=>s+(products.find(p=>p.id===id)?.price||0),0));
}
function openCart(){document.querySelector("#cartDrawer").classList.add("open");document.querySelector("#backdrop").classList.add("show");}
function closeCart(){document.querySelector("#cartDrawer").classList.remove("open");document.querySelector("#backdrop").classList.remove("show");}
document.querySelector("#filters").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;document.querySelectorAll("#filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.category);});
productsEl.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(Number(b.dataset.add));});
document.querySelector("#cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;const id=Number(b.dataset.remove);const i=cart.indexOf(id);if(i>-1)cart.splice(i,1);save();});
document.querySelector("#openCart").onclick=openCart;
document.querySelector("#closeCart").onclick=closeCart;
document.querySelector("#backdrop").onclick=closeCart;
document.querySelector("#checkout").onclick=()=>alert(cart.length ? "Pedido demonstrativo — aqui entraria o checkout real." : "Adicione algum produto primeiro.");
renderProducts();renderCart();
