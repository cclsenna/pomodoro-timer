import sessionInfo from "./session.js";

const switchSession=()=>{

    console.log('entrou no switch');
    let sessaoDisp=document.querySelector('body');
    let botoes=document.querySelectorAll('.botao');
    

    if(sessionInfo.sessionType==='work'){
        document.querySelector('.container__interno-head__session').innerText=`Session #${sessionInfo.counter}`;
        document.querySelector('.container__interno-head__type').innerText='Pomodoro Timer';
        sessaoDisp.className='';
        sessaoDisp.classList.add('session');


        botoes.forEach((valor)=>{
            valor.className='';
            valor.classList.add('botao');
            valor.classList.add('session');
        })
 
    }

    else if(sessionInfo.sessionType==='short'){           
        document.querySelector('.container__interno-head__type').innerText='Short Break';
        sessaoDisp.className='';
        sessaoDisp.classList.add('short');



        botoes.forEach((valor)=>{
            valor.className='';
            valor.classList.add('botao');
            valor.classList.add('short');
        })
    }

    else{
        document.querySelector('.container__interno-head__type').innerText='Long Break';
        sessaoDisp.className='';
        sessaoDisp.classList.add('long');


        botoes.forEach((valor)=>{
            valor.className='';
            valor.classList.add('botao');
            valor.classList.add('long');
        })

    }
    return;

}

export default switchSession;
