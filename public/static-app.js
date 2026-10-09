(()=>{
  'use strict';
  const $=(q,root=document)=>root.querySelector(q);
  const $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
  const format=n=>Number(n).toLocaleString('vi-VN')+' đ';
  const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const readCart=()=>{try{const value=JSON.parse(localStorage.getItem('nongnghiepxanh.cart')||'[]');return Array.isArray(value)?value.filter(p=>Number.isInteger(p.id)&&Number.isInteger(p.qty)&&p.qty>0):[];}catch{return [];}};
  const writeCart=cart=>{localStorage.setItem('nongnghiepxanh.cart',JSON.stringify(cart));updateCount();};
  const updateCount=()=>{const x=$('#cartCount');if(x)x.textContent=String(readCart().reduce((s,p)=>s+p.qty,0));};
  function toast(message){const e=$('#toast');if(!e)return;e.textContent=message;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),3000);}
  const prefix=new URL(document.querySelector('meta[name="nnx-root"]')?.content||'./',location.href).href;
  const urlFor=(route)=>prefix+route.replace(/^\//,'').replace(/\/$/,'')+'/' +(location.protocol==='file:'?'index.html':'');
  // Mở file HTML trên máy tính: đường dẫn thư mục cần chỉ thẳng tới index.html.
  if(location.protocol==='file:'){
    $$('a[href]').forEach(a=>{const val=a.getAttribute('href');if(!val||val.startsWith('#')||val.startsWith('mailto:')||val.startsWith('tel:')||/^[a-z]+:\/\//i.test(val))return;const u=new URL(val,location.href);if(u.protocol==='file:'&&u.pathname.endsWith('/')){u.pathname+='index.html';a.href=u.href;}});
    $$('form[action]').forEach(f=>{const val=f.getAttribute('action');if(!val||/^[a-z]+:\/\//i.test(val))return;const u=new URL(val,location.href);if(u.protocol==='file:'&&u.pathname.endsWith('/')){u.pathname+='index.html';f.action=u.href;}});
  }
  function addItem(button,go){
    const id=Number(button.dataset.add||button.dataset.buy),name=button.dataset.name,price=Number(button.dataset.price),slug=button.dataset.slug;
    const qtyEl=button.dataset.qtyInput?document.getElementById(button.dataset.qtyInput):null;
    const qty=qtyEl?Math.max(1,Math.min(100,Number(qtyEl.value)||1)):1;
    if(!Number.isInteger(id)||!name||!Number.isFinite(price)||price<0)return;
    const cart=readCart(),found=cart.find(x=>x.id===id);
    if(found)found.qty=Math.min(100,found.qty+qty);else cart.push({id,name,price,slug,qty});
    writeCart(cart);toast('Đã thêm sản phẩm vào giỏ hàng xem thử.');
    if(go)location.href=urlFor('gio-hang');
  }
  $$('[data-add]').forEach(el=>el.addEventListener('click',()=>addItem(el,false)));
  $$('[data-buy]').forEach(el=>el.addEventListener('click',()=>addItem(el,true)));
  $('#mobileMenu')?.addEventListener('click',()=>$('#navLinks')?.classList.toggle('open'));
  function cartLine(x){return `<article class="cart-item"><div class="cart-item-icon">🌱</div><div class="cart-item-text"><a href="${urlFor('san-pham/'+encodeURIComponent(x.slug))}">${escapeHTML(x.name)}</a><span>${format(x.price)} / đơn vị</span><button class="cart-remove" data-remove="${x.id}">Xóa</button></div><div class="cart-item-end"><strong>${format(x.price*x.qty)}</strong><div class="qty-controls"><button data-minus="${x.id}" aria-label="Giảm số lượng">−</button><span>${x.qty}</span><button data-plus="${x.id}" aria-label="Tăng số lượng">+</button></div></div></article>`;}
  function renderCart(){const content=$('#cartItems'),summary=$('#cartSummary');if(!content||!summary)return;
    const cart=readCart();let total=cart.reduce((s,p)=>s+p.qty*p.price,0);
    content.innerHTML=cart.length?cart.map(cartLine).join(''):'<div class="empty-state"><span>🧺</span><h3>Giỏ hàng đang trống</h3><p>Khám phá các sản phẩm tham khảo trong cửa hàng.</p><a class="btn btn-primary" href="'+urlFor('san-pham')+'">Xem sản phẩm ↗</a></div>';
    summary.innerHTML=`<h3>Tóm tắt giỏ hàng</h3><div class="sum-line"><span>Số loại hàng</span><strong>${cart.length}</strong></div><div class="sum-line"><span>Tạm tính</span><strong>${format(total)}</strong></div><div class="sum-line"><span>Phí vận chuyển</span><strong>Chưa tính</strong></div><div class="sum-line sum-total"><span>Tổng tham khảo</span><strong>${format(total)}</strong></div><p class="sum-note">Bản GitHub Pages không xử lý thanh toán và không tạo đơn hàng.</p><a class="btn btn-primary full" href="${urlFor('san-pham')}">Tiếp tục xem sản phẩm ↗</a>`;
    $$('[data-remove]',content).forEach(e=>e.addEventListener('click',()=>{writeCart(readCart().filter(p=>p.id!==Number(e.dataset.remove)));renderCart();}));
    $$('[data-minus]',content).forEach(e=>e.addEventListener('click',()=>{const a=readCart(),p=a.find(p=>p.id===Number(e.dataset.minus));if(p)p.qty=Math.max(1,p.qty-1);writeCart(a);renderCart();}));
    $$('[data-plus]',content).forEach(e=>e.addEventListener('click',()=>{const a=readCart(),p=a.find(p=>p.id===Number(e.dataset.plus));if(p)p.qty=Math.min(100,p.qty+1);writeCart(a);renderCart();}));
  }
  renderCart();updateCount();
  const listing=$('.shop-products');
  if(listing){
    const params=new URLSearchParams(location.search),q=(params.get('q')||'').trim().toLocaleLowerCase('vi-VN'),sort=params.get('sort')||'new';
    const toolbar=$('.shop-toolbar'),inp=toolbar?.querySelector('input[name="q"]'),selector=toolbar?.querySelector('select[name="sort"]');
    if(inp)inp.value=params.get('q')||'';if(selector)selector.value=sort;
    const cards=$$('.product-card',listing);
    const filtered=cards.filter(card=>card.textContent.toLocaleLowerCase('vi-VN').includes(q));
    if(sort==='price-asc'||sort==='price-desc')filtered.sort((a,b)=>{const diff=Number(a.querySelector('[data-price]')?.dataset.price||0)-Number(b.querySelector('[data-price]')?.dataset.price||0);return sort==='price-asc'?diff:-diff;});
    else if(sort==='name')filtered.sort((a,b)=>a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent,'vi'));
    listing.replaceChildren(...filtered);
    const span=toolbar?.querySelector('span');if(span)span.innerHTML=`Hiển thị <strong>${filtered.length}</strong> sản phẩm`;
    if(!filtered.length)listing.innerHTML='<div class="empty-state">🔎<h3>Không tìm thấy sản phẩm phù hợp</h3><p>Hãy đổi từ khóa để thử lại.</p></div>';
    $('.pagination')?.remove();
  }
})();
