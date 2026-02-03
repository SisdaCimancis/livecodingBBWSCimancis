const API='http://localhost:3000/api/todos';
const list=document.getElementById('list');
const form=document.getElementById('form');
const input=document.getElementById('input');

async function load(){
 const res=await fetch(API);
 const data=await res.json();
 list.innerHTML='';
 if(!data.length) list.innerHTML='<li>Tidak ada todo</li>';
 data.forEach(t=>{
  const li=document.createElement('li');
  li.className=t.completed?'done':'';
  li.innerHTML=`<span onclick="toggle(${t.id},${!t.completed})">${t.title}</span>
  <button onclick="del(${t.id})">X</button>`;
  list.appendChild(li);
 });
}

form.onsubmit=async e=>{
 e.preventDefault();
 await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:input.value})});
 input.value='';
 load();
};

async function toggle(id,c){
 await fetch(API+'/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({completed:c})});
 load();
}

async function del(id){
 await fetch(API+'/'+id,{method:'DELETE'});
 load();
}

load();