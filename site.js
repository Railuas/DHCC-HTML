document.getElementById('menuToggle').addEventListener('click', function(){
  const nav = document.getElementById('nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.slider-dots button'));
let sidx = 0, timer;
function sshow(i){
  slides.forEach((s,n)=>s.classList.toggle('active', n===i));
  dots.forEach((d,n)=>d.classList.toggle('active', n===i));
  sidx = i;
}
function next(){ sshow((sidx+1)%slides.length); }
if (slides.length) {
  dots.forEach((d,i)=>d.addEventListener('click', ()=>{ sshow(i); clearInterval(timer); timer = setInterval(next, 5000); }));
  sshow(0); timer = setInterval(next, 5000);
}
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1400;
      const start = performance.now();
      function step(t){
        const p = Math.min(1,(t-start)/dur);
        el.textContent = Math.floor(target*p);
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    }
  });
},{threshold:.5});
counters.forEach(el=>counterIO.observe(el));
let ti = 0;
const track = document.querySelector('.testi-track');
const tDots = Array.from(document.querySelectorAll('.testi-nav button'));
function tShow(i){
  if(!track) return;
  ti=i;
  track.style.transform = 'translateX(-'+(i*100)+'%)';
  tDots.forEach((d,n)=>d.classList.toggle('active', n===i));
}
tDots.forEach((d,i)=>d.addEventListener('click', ()=>tShow(i)));
if (tDots.length) setInterval(()=>tShow((ti+1)%tDots.length), 6000);
const lb = document.querySelector('.lightbox');
if(lb){
  lb.addEventListener('click', ()=>lb.classList.remove('show'));
  document.querySelectorAll('.gallery img').forEach(img=>{
    img.addEventListener('click', ()=>{ lb.querySelector('img').src = img.src; lb.classList.add('show'); });
  });
}
const toTop = document.getElementById('toTop');
if (toTop){
  window.addEventListener('scroll', ()=>{ if(window.scrollY>400) toTop.classList.add('show'); else toTop.classList.remove('show'); });
  toTop.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
}

document.querySelectorAll('.faq-item .faq-question').forEach(q=>{
  q.addEventListener('click', ()=>{
    const ans = q.parentElement.querySelector('.faq-answer');
    ans.style.display = ans.style.display==='none' || !ans.style.display ? 'block' : 'none';
  });
});