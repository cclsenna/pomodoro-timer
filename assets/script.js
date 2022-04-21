import sessionInfo from './session.js';
import {blink} from './blink.js';
import switchSession from './switch.js'


document.onload=start();

function start(){
    let intervalo=0;
    let intervaloBlink=0;
     
    document.querySelector('[data-tipo=start]').addEventListener('click',(e)=>{
        let tempo=sessionInfo[sessionInfo.sessionType];
        let elapsed=0;

        //bloqueia os campos de configuraçõa enquanto o timer estiver correndo
        const botaoConfig=document.querySelectorAll('.container__options-config__input');

        botaoConfig.forEach((element)=>{
            element.setAttribute('disabled',"")
        });

        const steps=document.querySelectorAll('.container__options-config__step');
        steps.forEach(element=>{
            element.classList.add('container__options-config__step-disabled');


        });

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


    //compçortamento do botão de stop
    document.querySelector('[data-tipo=stop]').addEventListener('click',(e)=>{
        const botaoConfig=document.querySelectorAll('.container__options-config__input');


        botaoConfig.forEach((element)=>{
            element.removeAttribute('disabled')
        });

        const steps=document.querySelectorAll('.container__options-config__step');
        steps.forEach(element=>{
            element.classList.remove('container__options-config__step-disabled');


        });


        const play=document.querySelector('[data-tipo=start]');

        clearInterval(intervalo);
        clearInterval(intervaloBlink);

        play.classList.remove('botao-blink');

        if (sessionInfo.work<10) valor='0'+sessionInfo.work; 
        document.querySelector('[data-tipo=display]').innerText=`${sessionInfo.work}:00`;

        sessionInfo.counter=1;
        sessionInfo.session=0;
        document.querySelector('.container__interno-head__session').innerText=`Session #${sessionInfo.counter}`;
        document.querySelector('.container__interno-head__type').innerText='Pomodoro Timer';
        sessionInfo.stopSession();
        switchSession();
        return;
    });

}














