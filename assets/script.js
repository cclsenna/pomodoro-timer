import {sessionInfo} from './session.js';
import {blink} from './blink.js';


document.onload=start();

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

    let intervalo=0;
    let intervaloBlink=0;
    

    document.querySelector('[data-tipo=start]').addEventListener('click',(e)=>{
        let work=document.getElementById('work');
        let short=document.getElementById('short');
        let long=document.getElementById('long');
        let tempo=sessionInfo[sessionInfo.sessionType];
        let elapsed=0;

        //chama os intervalos
        intervalo=setInterval(timer,1000);
        intervaloBlink=setInterval(blink,500,e);             


        function timer(){                 
        let limite=parseFloat(tempo)*60;
        elapsed=elapsed+1;
        let elapsedSec=(limite-elapsed);
        let min=Math.floor(elapsedSec/60);
        let sec=elapsedSec%60;
        if(min<10) min='0'+min;
        if(sec<10) sec='0'+sec;

        //se cair aqui signifca que terminou o tempo
        if(limite-elapsed===0){
            clearInterval(intervalo);
            clearInterval(intervaloBlink);
            e.target.classList.remove('botao-blink');
            sessionInfo.updateSession();
            tempo=sessionInfo[sessionInfo.sessionType];
            limite=parseFloat(tempo)*60;
            min=Math.floor(limite/60);
            sec=limite%60;
            if(min<10) min='0'+min;
            if(sec<10) sec='0'+sec;  
            document.querySelector('[data-tipo=display]').innerText=`${min}:${sec}`;
            switchSession(); 
            return;
        }      
        
        document.querySelector('[data-tipo=display]').innerText=`${min}:${sec}`;
    }       



    });



    //evento do o botão do stop
    document.querySelector('[data-tipo=stop]').addEventListener('click',(e)=>{
        const play=document.querySelector('[data-tipo=start]');
        clearInterval(intervalo);
        clearInterval(intervaloBlink);
        play.classList.remove('botao-blink');
        document.querySelector('[data-tipo=display]').innerText='00:00';
        sessionInfo.counter=1;
        sessionInfo.session=0;
        document.querySelector('.container__interno-head__session').innerText=`Session #${sessionInfo.counter}`;
        document.querySelector('.container__interno-head__type').innerText='Pomodoro';
        sessionInfo.stopSession();
        return;
    });

    document.querySelector('[data-tipo=reset]').addEventListener('click',()=>{
        const play=document.querySelector('[data-tipo=start]');
        parada(intervalo);
        parada(intervaloBlink);
        play.classList.remove('botao-blink');
        return;

    }
    );
    
}


const switchSession=()=>{
    let sessaoDisp=document.querySelector('body');
    let botoes=document.querySelectorAll('.botao');
    

    if(sessionInfo.sessionType==='work'){
        document.querySelector('.container__interno-head__session').innerText=`Session #${sessionInfo.counter}`;
        document.querySelector('.container__interno-head__type').innerText='Pomodoro';
        sessaoDisp.className='';
        sessaoDisp.classList.add('session');
        for(let i of botoes){
            i.className='';
            i.classList.add('botao');
            i.classList.add('session');
        }

    
    }

    else if(sessionInfo.sessionType==='short'){                
        document.querySelector('.container__interno-head__type').innerText='Short Break';
        sessaoDisp.className='';
        sessaoDisp.classList.add('short');
        for(let i of botoes){
            i.className='';
            i.classList.add('botao');
            i.classList.add('short');
        }
    }

    else{
        document.querySelector('.container__interno-head__type').innerText='Long Break';
        sessaoDisp.className='';
        sessaoDisp.classList.add('long');
        for(let i of botoes){
            i.className='';
            i.classList.add('botao');
            i.classList.add('long');
        }

    }

    return;



}












