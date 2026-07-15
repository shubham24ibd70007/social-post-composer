import { useEffect } from "react";

function MouseGlow(){

useEffect(()=>{

const glow=document.querySelector(".mouseGlow");

const move=(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

}

window.addEventListener("mousemove",move);

return()=>window.removeEventListener("mousemove",move);

},[]);

return(

<div className="mouseGlow"></div>

);

}

export default MouseGlow;