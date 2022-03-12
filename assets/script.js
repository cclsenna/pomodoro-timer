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
    });

       

    let stopSignal=false;
    let intervalo=0;
    let intervaloBlink=0;

    document.querySelector('[data-tipo=play]').addEventListener('click',(e)=>{
        let work=document.getElementById('work');
        let short=document.getElementById('short');
        let long=document.getElementById('long');
        let tempo=work;
        let elapsed=0;
        let total=0;
        let turno=0;    


        intervalo=setInterval(timer,1000);
        intervaloBlink=setInterval(blink,500,e);


        function timer(){                 
        let limite=parseInt(tempo.value)*60*1000;
        elapsed=elapsed+1000;
        //se cair aqui signifca que terminou o tempo
        if(limite-elapsed===0){
            parada(intervalo);
            document.querySelector('[data-tipo=display]').innerText='00:00';
            turno=turno+1;
            controleSessao();
            return;
        } 

        let elapsedSec=(limite-elapsed)/1000;
        let min=Math.floor(elapsedSec/60);
        let sec=elapsedSec%60;
        if(min<10) min='0'+min;
        if(sec<10) sec='0'+sec;
        document.querySelector('[data-tipo=display]').innerText=`${min}:${sec}`;
    }


        let controleSessao=()=>{
            if(turno<=2){
                tempo=short;
                return;       
            }
            else if(turno===3){
                tempo=long;
                return;

            }
            

        }



    });





    //evento do o botão do stop
    document.querySelector('[data-tipo=stop]').addEventListener('click',(e)=>{
        parada(intervalo);
        parada(intervaloBlink);
        console.log(e.target.classList);
        e.target.classList.remove('botao-blink');
        document.querySelector('[data-tipo=display]').innerText='00:00';

    })
     
    //exportar essa função
    let parada=(num)=>{
        clearInterval(num);         
    
    }

    
}







//exportar essa função
let blink=(elemento)=>{
    if(elemento.target.classList.contains('botao-blink')){
        elemento.target.classList.remove('botao-blink');
    }
    else{
        elemento.target.classList.add('botao-blink');
    }

};











