const $=s=>document.querySelector(s);
let selectedType="Short Notes",selectedFile=null;
document.querySelectorAll(".type").forEach(b=>b.onclick=()=>{document.querySelectorAll(".type").forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedType=b.dataset.type});
$("#file").onchange=e=>{selectedFile=e.target.files[0];$("#filename").textContent=selectedFile?selectedFile.name:""};
const drop=$("#drop");["dragenter","dragover"].forEach(x=>drop.addEventListener(x,e=>{e.preventDefault();drop.classList.add("drag")}));["dragleave","drop"].forEach(x=>drop.addEventListener(x,e=>{e.preventDefault();drop.classList.remove("drag")}));
drop.addEventListener("drop",e=>{selectedFile=e.dataTransfer.files[0];if(selectedFile){$("#file").files=e.dataTransfer.files;$("#filename").textContent=selectedFile.name}});
$("#theme").onclick=()=>{document.body.classList.toggle("dark");$("#theme").textContent=document.body.classList.contains("dark")?"☾":"☀"};
$("#generate").onclick=async()=>{if(!selectedFile)return alert("Please upload a PDF or image first.");$("#generate").textContent="Processing…";try{const fd=new FormData();fd.append("file",selectedFile);fd.append("type",selectedType);const r=await fetch("/api/generate",{method:"POST",body:fd});if(!r.ok)throw Error();const d=await r.json();show(d.text)}catch(e){show(`DEMO PREVIEW — ${selectedType}\n\nYour AI backend is not connected yet.\n\nOnce the backend and AI API are configured, the uploaded ${selectedFile.type==="application/pdf"?"PDF":"image"} will be processed and this section will contain the generated study material.`)}finally{$("#generate").textContent="Generate with AI →"}};
function show(t){$("#result").classList.remove("hidden");$("#output").textContent=t;$("#result").scrollIntoView({behavior:"smooth"})}
$("#copy").onclick=()=>navigator.clipboard.writeText($("#output").textContent).then(()=>$("#copy").textContent="Copied ✓");
