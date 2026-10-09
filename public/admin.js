(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const {post,toast}=window.nnx||{};
async function busy(form,action){const btn=form.querySelector('button[type=submit],button:not([type])');if(btn)btn.disabled=true;try{await action();}catch(err){toast(err.message);}finally{if(btn)btn.disabled=false;}}
const ai=$('#aiForm');if(ai)ai.addEventListener('submit',ev=>{ev.preventDefault();busy(ai,async()=>{
 const msg=$('#aiMessage'),preview=$('#aiPreview');
 const data=Object.fromEntries(new FormData(ai).entries());
 msg.textContent='Đang kết nối dịch vụ AI và tạo ảnh chân thực. Thao tác có thể kéo dài tùy dịch vụ.';
 preview.innerHTML='<div class="ai-loading"><span class="spinner"></span><span>AI đang tạo hình ảnh từ mô tả của bạn...</span></div>';
 try{
  const result=await post('/api/ai/generate',data);
  preview.replaceChildren();const img=document.createElement('img');img.src=result.url;img.alt='Ảnh vừa được AI tạo từ mô tả';preview.append(img);
  const actions=$('#aiNewActions');actions.replaceChildren();const a=document.createElement('a');a.href='/quan-tri/thu-vien';a.className='small-submit';a.textContent='Kiểm duyệt và sử dụng hình ảnh ↗';actions.append(a);
  msg.textContent=result.message;toast('Đã tạo được ảnh mới từ API thật.');
 }catch(err){preview.innerHTML='<div><span>⚠</span><span>Chưa thể tạo ảnh. Xem thông báo bên dưới.</span></div>';msg.textContent=err.message;}
 });});
const upload=$('#uploadForm');if(upload)upload.addEventListener('submit',ev=>{ev.preventDefault();busy(upload,async()=>{
 const file=upload.querySelector('input[type=file]').files[0],msg=$('#uploadMessage');
 if(!file||file.size>8*1024*1024){msg.textContent='Vui lòng chọn ảnh tối đa 8 MB.';return;}
 const reader=new FileReader();const data=await new Promise((resolve,reject)=>{reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
 const title=upload.querySelector('input[name=title]').value;
 const r=await post('/api/media/upload',{data,title});msg.textContent=r.message;setTimeout(()=>location.reload(),800);
 });});
$$('[data-media-approve]').forEach(btn=>btn.addEventListener('click',async()=>{btn.disabled=true;try{const r=await post('/api/media/approve',{id:Number(btn.dataset.mediaApprove)});toast(r.message);location.reload();}catch(e){toast(e.message);btn.disabled=false;}}));
$$('[data-media-apply]').forEach(btn=>btn.addEventListener('click',async()=>{btn.disabled=true;try{const id=Number(btn.dataset.mediaApply),target=document.getElementById('target-'+id).value;const r=await post('/api/media/apply',{id,target});toast(r.message);}catch(e){toast(e.message);}finally{btn.disabled=false;}}));
const product=$('#productForm');if(product)product.addEventListener('submit',ev=>{ev.preventDefault();busy(product,async()=>{const data=Object.fromEntries(new FormData(product).entries());data.id=product.dataset.id;data.verified=$('[name=verified]').checked;data.published=$('[name=published]').checked;data.featured=$('[name=featured]').checked;const msg=$('#productMessage');try{const r=await post('/api/admin/products',data);msg.textContent=r.message;if(r.redirect)setTimeout(()=>location.href=r.redirect,650);}catch(e){msg.textContent=e.message;}});});
$$('[data-order-save]').forEach(btn=>btn.addEventListener('click',async()=>{btn.disabled=true;const id=Number(btn.dataset.orderSave);try{const r=await post('/api/admin/orders',{id,status:document.getElementById('status-'+id).value,payment_status:document.getElementById('payment-'+id).value});toast(r.message);}catch(e){toast(e.message);}finally{btn.disabled=false;}}));
const article=$('#articleForm');if(article)article.addEventListener('submit',ev=>{ev.preventDefault();busy(article,async()=>{const data=Object.fromEntries(new FormData(article).entries());data.id=article.dataset.id;data.published=article.querySelector('[name=published]').checked;const msg=$('#articleMessage');try{const r=await post('/api/admin/articles',data);msg.textContent=r.message;if(r.redirect)setTimeout(()=>location.href=r.redirect,650);}catch(e){msg.textContent=e.message;}});});
const settings=$('#settingsForm');if(settings)settings.addEventListener('submit',ev=>{ev.preventDefault();busy(settings,async()=>{const msg=$('#settingsMessage');try{const r=await post('/api/admin/settings',Object.fromEntries(new FormData(settings).entries()));msg.textContent=r.message;}catch(e){msg.textContent=e.message;}});});
const auto=$('#autoImageForm');
if(auto){
 const scope=$('#autoMode'),productPick=$('#autoProduct'),estimate=$('#autoEstimate'),msg=$('#autoMessage'),progress=$('#autoBatchStatus');
 let shownBatch=Number(progress?.dataset.initialBatch||0),timer=null;
 const statusNames={'cho':'Đang xếp hàng','dang-chay':'Đang thực hiện','tam-dung':'Tạm dừng','hoan-tat':'Hoàn thành'};
 const tNames={'cho':'Chưa tạo','dang-tao':'Đang tạo','cho-duyet':'Chờ duyệt','loi':'Có lỗi'};
 const escape=window.nnx?.escapeHTML||((s)=>String(s));
 async function getData(path){const response=await fetch(path,{credentials:'same-origin',cache:'no-store'});const result=await response.json();if(!response.ok)throw new Error(result.error||'Không thể lấy trạng thái.');return result;}
 async function calculate(){
   productPick.closest('label').hidden=scope.value!=='product';
   try{
     const r=await getData('/api/ai/auto/preview?mode='+encodeURIComponent(scope.value)+'&productId='+encodeURIComponent(productPick.value));
     estimate.textContent=`Số ảnh dự kiến: ${r.total} (${r.counts.products} sản phẩm, ${r.counts.categories} danh mục, ${r.counts.articles} bài viết, ${r.counts.banners} banner). Còn ${r.quota.hour} lượt/giờ và ${r.quota.day} lượt/24 giờ. Đợt lớn sẽ tạm dừng khi hết hạn mức; mỗi lượt gọi có thể phát sinh phí API.`;
   }catch(err){estimate.textContent=err.message;}
 }
 scope.addEventListener('change',calculate);productPick.addEventListener('change',calculate);
 const requestedProductId=Number(new URLSearchParams(location.search).get('productId')||0);
 if(requestedProductId&&[...productPick.options].some(o=>Number(o.value)===requestedProductId)){scope.value='product';productPick.value=String(requestedProductId);}
 calculate();
 async function refresh(){
   if(!shownBatch)return;
   try{
     const info=await getData('/api/ai/auto/status?id='+shownBatch),b=info.batch,st=b.stats;
     const done=st.pendingReview+st.failed;
     progress.replaceChildren();
     const title=document.createElement('h3');title.textContent=`Đợt #${b.id} — ${statusNames[b.status]||b.status}`;progress.append(title);
     const bar=document.createElement('progress');bar.max=st.total||1;bar.value=done;bar.setAttribute('aria-label','Tiến độ tạo ảnh');progress.append(bar);
     const details=document.createElement('p');details.textContent=`${done}/${st.total} đã xử lý · ${st.pendingReview} ảnh chờ duyệt · ${st.waiting} đang chờ · ${st.failed} lỗi`;progress.append(details);
     if(b.note){const note=document.createElement('p');note.className='ai-note';note.textContent=b.note;progress.append(note);}
     const buttons=document.createElement('div');buttons.className='ai-progress-buttons';
     for(const [action,label,allowed] of [['pause','Tạm dừng',b.status==='dang-chay'||b.status==='cho'],['resume','Tiếp tục',b.status==='tam-dung'&&st.waiting>0]]){
       if(!allowed)continue;const btn=document.createElement('button');btn.className='small-submit';btn.type='button';btn.textContent=label;
       btn.addEventListener('click',async()=>{btn.disabled=true;try{const result=await post('/api/ai/auto/control',{batchId:b.id,action});msg.textContent=result.message;refresh();}catch(e){msg.textContent=e.message;btn.disabled=false;}});buttons.append(btn);
     }
     const library=document.createElement('a');library.href='/quan-tri/thu-vien';library.className='small-submit';library.textContent='Duyệt ảnh trong thư viện ↗';buttons.append(library);progress.append(buttons);
     const list=document.createElement('div');list.className='ai-task-grid';
     for(const task of b.items){
       const item=document.createElement('article');item.className='ai-task';
       if(task.filename){const img=document.createElement('img');img.loading='lazy';img.alt='Ảnh AI minh họa chưa duyệt';img.src='/uploads/'+task.filename;item.append(img);}
       const label=document.createElement('strong');label.textContent=task.target_name;item.append(label);
       const txt=document.createElement('small');txt.textContent=tNames[task.status]||task.status;item.append(txt);
       if(task.error){const error=document.createElement('small');error.textContent=task.error;item.append(error);}
       list.append(item);
     }
     progress.append(list);
     if(b.status==='dang-chay'||b.status==='cho'){
       if(timer)clearTimeout(timer);timer=setTimeout(refresh,2500);
     }else if(timer){clearTimeout(timer);timer=null;}
   }catch(err){progress.textContent=err.message;if(timer)clearTimeout(timer);timer=null;}
 }
 auto.addEventListener('submit',async ev=>{
   ev.preventDefault();
   const button=auto.querySelector('button[type="submit"]');button.disabled=true;
   try{
     const mode=scope.value,productId=Number(productPick.value);
     const preview=await getData('/api/ai/auto/preview?mode='+encodeURIComponent(mode)+'&productId='+productId);
     if(!preview.total){msg.textContent='Không có mục nào trong phạm vi này.';return;}
     if(!window.confirm(`Tạo ${preview.total} ảnh thật qua API có thể phát sinh chi phí. Tất cả ảnh mới sẽ chờ duyệt, không tự đăng. Bạn xác nhận?`))return;
     const result=await post('/api/ai/auto/start',{mode,productId,confirmed:auto.querySelector('[name="confirmed"]').checked});
     msg.textContent=result.message;shownBatch=result.batchId;refresh();
   }catch(err){msg.textContent=err.message;}finally{button.disabled=false;}
 });
 $$('[data-batch-show]').forEach(button=>button.addEventListener('click',()=>{shownBatch=Number(button.dataset.batchShow);refresh();}));
 if(shownBatch)refresh();
}
})();
