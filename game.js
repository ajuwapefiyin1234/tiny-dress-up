const trayFiles = ['hat1.png','hat2.png','glasses1.png','bow.png','heart.png'];
const tray = document.getElementById('tray');
const stage = document.getElementById('stage');

// load thumbnails
trayFiles.forEach(f=>{
  const img=new Image(); img.src=`assets/${f}`; img.className='thumb';
  img.onclick=()=>wear(f);
  tray.appendChild(img);
});

function wear(file){
  const s=new Image(); s.src=`assets/${file}`; s.className='sticker';
  s.style.left='120px'; s.style.top='80px';   // default position
  stage.appendChild(s);
  makeDrag(s);
}

function makeDrag(el){
  let ox,oy;
  el.onmousedown=e=>{ ox=e.clientX-el.offsetLeft; oy=e.clientY-el.offsetTop;
    document.onmousemove=ev=>{el.style.left=ev.clientX-ox+'px';el.style.top=ev.clientY-oy+'px';}
    document.onmouseup=_=>document.onmousemove=null;
  };
}

// surprise button
document.getElementById('rand').onclick=()=>wear(trayFiles[Math.floor(Math.random()*trayFiles.length)]);

// download button (html2canvas CDN quick hack)
document.getElementById('save').onclick=()=>{
  import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js").then(()=>{
    html2canvas(stage).then(c=>{const a=document.createElement('a'); a.download='outfit.png'; a.href=c.toDataURL(); a.click();});
  });
};
