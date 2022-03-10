document.onload=start();

//função para iniciar o js
function start(){

    let inputs=document.querySelectorAll('input');

    inputs.forEach(el=>{
        el.addEventListener('change',(e)=>{
            let valor=e.target.value;
            let tipo=e.target.id;
            if (valor<10) valor='0'+valor; 
            document.querySelector('[data-tipo=display]').innerText=`${valor}:00`;


        })
       
        
    })


       

    let stopSignal=false;
    let intervalo=0;

    document.querySelector('[data-tipo=play]').addEventListener('click',()=>{
        let work=document.getElementById('work');
        let short=document.getElementById('short');
        let long=document.getElementById('long');
        let elapsed=0;
        let total=0;     


        intervalo=setInterval(timer,1000);

        function timer(){                 
        let limite=parseInt(work.value)*60*1000;
        elapsed=elapsed+1000;
        if(limite-elapsed===0){
            parada(intervalo);
            document.querySelector('[data-tipo=display]').innerText='00:00';
            return;
        } 

        let elapsedSec=(limite-elapsed)/1000;
        let min=Math.floor(elapsedSec/60);
        let sec=elapsedSec%60;
        if(min<10) min='0'+min;
        if(sec<10) sec='0'+sec;
        document.querySelector('[data-tipo=display]').innerText=`${min}:${sec}`;
    }



    });

    //evento do o botão do stop
    document.querySelector('[data-tipo=stop]').addEventListener('click',()=>{
        parada(intervalo);
        document.querySelector('[data-tipo=display]').innerText='00:00';

    }) 
    
    let parada=()=>{
        clearInterval(intervalo);            
    
    }

    
}



let turno=0;









