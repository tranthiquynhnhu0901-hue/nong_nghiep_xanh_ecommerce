(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];
const format=n=>Number(n).toLocaleString('vi-VN')+' đ';
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const readCart=()=>{try{const x=JSON.parse(localStorage.getItem('nongnghiepxanh.cart')||'[]');return Array.isArray(x)?x.filter(x=>Number.isInteger(x.id)&&Number.isInteger(x.qty)&&x.qty>0).slice(0,60):[];}catch{return [];}};
const writeCart=cart=>{localStorage.setItem('nongnghiepxanh.cart',JSON.stringify(cart));updateCount();};
const updateCount=()=>{const e=$('#cartCount');if(e)e.textContent=String(readCart().reduce((sum,item)=>sum+item.qty,0));};
function toast(message){const e=$('#toast');if(!e)return; e.textContent=message;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),3500);}
async function post(path,data){
 const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify(data)});
 const result=await r.json().catch(()=>({error:'Máy chủ không trả dữ liệu hợp lệ.'}));
 if(!r.ok)throw new Error(result.error||'Yêu cầu không thực hiện được.');return result;
}
window.nnx={post,toast,escapeHTML};
function addFromButton(button,go=false){
 const id=Number(button.dataset.add||button.dataset.buy),name=button.dataset.name,price=Number(button.dataset.price),slug=button.dataset.slug;
 const qtyEl=button.dataset.qtyInput?document.getElementById(button.dataset.qtyInput):null;
 const qty=qtyEl?Math.max(1,Math.min(100,Number(qtyEl.value)||1)):1;
 if(!Number.isInteger(id)||!name||price<0)return;
 const cart=readCart(),old=cart.find(x=>x.id===id);
 if(old)old.qty=Math.min(100,old.qty+qty);else cart.push({id,name,price,slug,qty});
 writeCart(cart);toast('Đã thêm sản phẩm vào giỏ hàng.');if(go)window.location.href='/thanh-toan';
}
$$('[data-add]').forEach(x=>x.addEventListener('click',()=>addFromButton(x)));
$$('[data-buy]').forEach(x=>x.addEventListener('click',()=>addFromButton(x,true)));
const menu=$('#mobileMenu');if(menu)menu.addEventListener('click',()=>$('#navLinks')?.classList.toggle('open'));
const logout=$('#logout');if(logout)logout.addEventListener('click',async()=>{try{const r=await post('/api/auth/logout',{});location.href=r.redirect;}catch(e){toast(e.message);}});
function cartLine(x){return `<article class="cart-item"><div class="cart-item-icon">🌱</div><div class="cart-item-text"><a href="/san-pham/${encodeURIComponent(x.slug)}">${escapeHTML(x.name)}</a><span>${format(x.price)} / đơn vị</span><button class="cart-remove" data-remove="${x.id}">Xóa</button></div><div class="cart-item-end"><strong>${format(x.price*x.qty)}</strong><div class="qty-controls"><button data-minus="${x.id}" aria-label="Giảm số lượng">−</button><span>${x.qty}</span><button data-plus="${x.id}" aria-label="Tăng số lượng">+</button></div></div></article>`;}
function summaryHTML(cart,checkout=false){const total=cart.reduce((sum,x)=>sum+x.price*x.qty,0);return `<h3>Tóm tắt giỏ hàng</h3><div class="sum-line"><span>Số loại hàng</span><strong>${cart.length}</strong></div><div class="sum-line"><span>Tạm tính</span><strong>${format(total)}</strong></div><div class="sum-line"><span>Phí vận chuyển</span><strong>Chờ xác nhận</strong></div><div class="sum-line sum-total"><span>Tổng tiền hàng</span><strong>${format(total)}</strong></div><p class="sum-note">Giá chỉ mang tính tham khảo. Máy chủ sẽ kiểm tra lại giá và tồn kho khi đặt hàng.</p>${checkout?'':`<a href="/thanh-toan" class="btn btn-primary full ${cart.length?'':'disabled'}">Tiếp tục thanh toán ↗</a><a class="continue" href="/san-pham">← Tiếp tục mua sắm</a>`}`;}
function renderCart(){const e=$('#cartItems'),sum=$('#cartSummary');if(!e||!sum)return;const cart=readCart();e.innerHTML=cart.length?cart.map(cartLine).join(''):'<div class="empty-state"><span>🧺</span><h3>Giỏ hàng đang trống</h3><p>Khám phá những sản phẩm dành cho khu vườn của bạn.</p><a class="btn btn-primary" href="/san-pham">Đi đến cửa hàng ↗</a></div>';sum.innerHTML=summaryHTML(cart);
 $$('[data-remove]',e).forEach(btn=>btn.addEventListener('click',()=>{writeCart(readCart().filter(x=>x.id!==Number(btn.dataset.remove)));renderCart();}));
 $$('[data-minus]',e).forEach(btn=>btn.addEventListener('click',()=>{const c=readCart(),x=c.find(x=>x.id===Number(btn.dataset.minus));if(x){x.qty=Math.max(1,x.qty-1);writeCart(c);renderCart();}}));
 $$('[data-plus]',e).forEach(btn=>btn.addEventListener('click',()=>{const c=readCart(),x=c.find(x=>x.id===Number(btn.dataset.plus));if(x){x.qty=Math.min(100,x.qty+1);writeCart(c);renderCart();}}));
}
renderCart();const checkoutSummary=$('#checkoutSummary');if(checkoutSummary)checkoutSummary.innerHTML=summaryHTML(readCart(),true);
const checkout=$('#checkoutForm');if(checkout)checkout.addEventListener('submit',async ev=>{ev.preventDefault();const e=$('#checkoutMessage'),btn=checkout.querySelector('button[type=submit]');const cart=readCart();if(!cart.length){e.textContent='Giỏ hàng chưa có sản phẩm.';return;}btn.disabled=true;e.textContent='Đang kiểm tra và ghi nhận đơn hàng...';try{const fields=Object.fromEntries(new FormData(checkout).entries());const response=await post('/api/orders',{...fields,items:cart.map(x=>({id:x.id,qty:x.qty}))});writeCart([]);location.href=response.redirect;}catch(err){e.textContent=err.message;}finally{btn.disabled=false;}});
const auth=$('#authForm');if(auth)auth.addEventListener('submit',async ev=>{ev.preventDefault();const e=$('#authMessage'),btn=auth.querySelector('button');btn.disabled=true;e.textContent='Đang xử lý...';try{const response=await post('/api/auth/'+(auth.dataset.mode==='login'?'login':'register'),Object.fromEntries(new FormData(auth).entries()));location.href=response.redirect;}catch(err){e.textContent=err.message;}finally{btn.disabled=false;}});
const lead=$('#leadForm');if(lead)lead.addEventListener('submit',async ev=>{ev.preventDefault();const e=$('#leadMessage'),btn=lead.querySelector('button');btn.disabled=true;e.textContent='Đang gửi...';try{const r=await post('/api/leads',{...Object.fromEntries(new FormData(lead).entries()),kind:lead.dataset.kind});e.textContent=r.message;lead.reset();}catch(err){e.textContent=err.message;}finally{btn.disabled=false;}});
updateCount();
})();
