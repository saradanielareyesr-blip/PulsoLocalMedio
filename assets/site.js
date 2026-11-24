const pathKey='pulsoLocalDeskV1';
const toast=(msg)=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.style.display='block';clearTimeout(window._toastTimer);window._toastTimer=setTimeout(()=>el.style.display='none',2500)};
const sections=[...document.querySelectorAll('[data-section]')];
const phases=[...document.querySelectorAll('[data-phase]')];
function phase(n){sections.forEach(s=>s.classList.toggle('hidden',s.dataset.section!==n));phases.forEach(s=>s.classList.toggle('active',s.dataset.phase===n));window.scrollTo({top:210,behavior:'smooth'})}
phases.forEach(p=>p.addEventListener('click',()=>phase(p.dataset.phase)));
let draft={}; const entries=[...document.querySelectorAll('[data-save]')];
try{draft=JSON.parse(localStorage.getItem(pathKey)||'{}')}catch(e){draft={}} entries.forEach(e=>{if(draft[e.dataset.save]!==undefined)e.value=draft[e.dataset.save]})
function save(){entries.forEach(e=>draft[e.dataset.save]=e.value);try{localStorage.setItem(pathKey,JSON.stringify(draft))}catch(e){/* La exportación sigue disponible sin almacenamiento local. */}}
entries.forEach(e=>e.addEventListener('input',save));
function exportReport(){save();const data=draft;const lines=['PULSO LOCAL | INFORME DE REDACCIÓN','SIMULACIÓN ACADÉMICA | DATOS FICTICIOS',new Date().toLocaleString('es-CO'),''];document.querySelectorAll('[data-save]').forEach(e=>lines.push((e.getAttribute('data-label')||e.dataset.save).toUpperCase()+'\n'+(data[e.dataset.save]||'Sin diligenciar')+'\n'));const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='Pulso_Local_informe_editorial.txt';a.click();URL.revokeObjectURL(u);toast('Informe exportado')}
const ex=document.getElementById('export');if(ex)ex.addEventListener('click',exportReport);
const reset=document.getElementById('reset');if(reset)reset.addEventListener('click',()=>{if(confirm('¿Borrar las respuestas guardadas en este navegador?')){entries.forEach(e=>e.value='');save();toast('Borrador limpio')}});
