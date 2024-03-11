(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const A=`<body>\r
  <div class="container">\r
    <header>\r
      <img src="/src/images/note.png" alt="" />\r
      <h1>Shopping List</h1>\r
    </header>\r
    <form id="item-form">\r
      <div class="form-control">\r
        <input type="text" class="form-input" id="item-input" name="item" placeholder="Enter Item" />\r
      </div>\r
      <div class="form-control">\r
        <button type="submit" class="btn">\r
          <i class="fa-solid fa-plus"></i> Add Item\r
        </button>\r
      </div>\r
    </form>\r
\r
    <div class="filter">\r
      <input type="text" class="form-input-filter" id="filter" placeholder="Filter Items" />\r
    </div>\r
\r
    <ul id="item-list" class="items">\r
      <!-- <li>\r
        Apples\r
        <button class="remove-item btn-link text-red">\r
          <i class="fa-solid fa-xmark"></i>\r
        </button>\r
      </li>\r
      <li>\r
        Orange Juice\r
        <button class="remove-item btn-link text-red">\r
          <i class="fa-solid fa-xmark"></i>\r
        </button>\r
      </li>\r
      <li>\r
        Eggs\r
        <button class="remove-item btn-link text-red">\r
          <i class="fa-solid fa-xmark"></i>\r
        </button>\r
      </li>\r
      <li>\r
        Milk\r
        <button class="remove-item btn-link text-red">\r
          <i class="fa-solid fa-xmark"></i>\r
        </button>\r
      </li>\r
      <li>\r
        Eggnog\r
        <button class="remove-item btn-link text-red">\r
          <i class="fa-solid fa-xmark"></i>\r
        </button>\r
      </li> -->\r
\r
    </ul>\r
\r
    <button id="clear" class="btn-clear">Clear All</button>\r
  </div>\r
\r
\r
</body>`,F=f=>{console.log("App"),(()=>{const e=document.createElement("div");e.innerHTML=A,document.querySelector(f).append(e)})();const l=document.getElementById("item-form"),a=document.getElementById("item-input"),o=document.getElementById("item-list"),n=document.getElementById("clear"),r=document.getElementById("filter"),s=l.querySelector("button");let m=!1;const y=()=>{d().forEach(t=>p(t)),c()},b=e=>{e.preventDefault();const t=a.value;if(t===""){alert("Please add an item");return}if(m){const i=o.querySelector(".edit-mode");g(i.textContent),i.classList.remove("edit-mode"),i.remove(),m=!1}else if(S(t)){alert("That item already exists!");return}p(t),I(t),c(),a.value=""},p=e=>{const t=document.createElement("li");t.appendChild(document.createTextNode(e));const i=v("remove-item btn-link text-red");t.appendChild(i),o.appendChild(t)},v=e=>{const t=document.createElement("button");t.className=e;const i=h("fa-solid fa-xmark");return t.appendChild(i),t},h=e=>{const t=document.createElement("i");return t.className=e,t},I=e=>{const t=d();t.push(e),localStorage.setItem("items",JSON.stringify(t))},d=()=>{let e;return localStorage.getItem("items")===null?e=[]:e=JSON.parse(localStorage.getItem("items")),e},E=e=>{e.target.parentElement.classList.contains("remove-item")?L(e.target.parentElement.parentElement):x(e.target)},S=e=>d().includes(e),x=e=>{m=!0,o.querySelectorAll("li").forEach(t=>t.classList.remove("edit-mode")),e.classList.add("edit-mode"),s.innerHTML='<i class="fa-solid fa-pen "></i> Updated item',s.className="btn-update-edit",a.value=e.textContent},L=e=>{confirm("Are you sure?")&&(e.remove(),g(e.textContent),c())},g=e=>{let t=d();t=t.filter(i=>i!==e),localStorage.setItem("items",JSON.stringify(t))},C=()=>{if(confirm("Are you sure you want to clear all the items?")){for(;o.firstChild;)o.removeChild(o.firstChild);localStorage.removeItem("items"),c()}},k=e=>{const t=o.querySelectorAll("li"),i=e.target.value.toLowerCase();t.forEach(u=>{u.firstChild.textContent.toLowerCase().indexOf(i)!=-1?u.style.display="flex":u.style.display="none"})},c=()=>{a.value="",o.querySelectorAll("li").length===0?(n.style.display="none",r.style.display="none"):(n.style.display="block",r.style.display="block"),s.innerHTML='<i class="fa-solid fa-plus"></i> Add Item',s.className="btn",m=!1};//! Initialize app
(()=>{l.addEventListener("submit",b),o.addEventListener("click",E),n.addEventListener("click",C),r.addEventListener("input",k),document.addEventListener("DOMContentLoaded",y),c()})()};F("#app");
