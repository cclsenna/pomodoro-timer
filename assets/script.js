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

    let intervalo=0;
    let intervaloBlink=0;

    const sessionInfo={
        _sessionType: 'work',
        _session: 0,
        _counter: 1,
        _work:'0.25',
        _short:'0.25',
        _long:'0.5',
        get counter(){
            return this._counter;
        },
        get session(){
            return this._session;
        },
        get sessionType(){
            return this._sessionType;

        },
        get work(){
            return this._work;

        },
        get short(){
            return this._short;

        },
        get long(){
            return this._long;

        },
        set session(value){
            this._session=value;
        },

        
        updateSession(){
            
            if(this._sessionType==='work'){
                this._session+=1;
                this._counter+=1;

                if(this.session>3){
                    this._sessionType='long';
                    return;
                }
                
                this._sessionType='short';
                return;                

            }

            else if(this._sessionType==='long'){
                this._sessionType='work';
                this._session=1;
                return;
                               
            }

            
                this._sessionType='work';
                return;
            
        }
    }

    document.querySelector('[data-tipo=start]').addEventListener('click',(e)=>{
        //let work=document.getElementById('work');
        //let short=document.getElementById('short');
        //let long=document.getElementById('long');
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
            parada(intervalo);
            parada(intervaloBlink);
            e.target.classList.remove('botao-blink');
            sessionInfo.updateSession();
            tempo=sessionInfo[sessionInfo.sessionType];
            limite=parseFloat(tempo)*60;
            min=Math.floor(limite/60);
            sec=limite%60;
            if(min<10) min='0'+min;
            if(sec<10) sec='0'+sec;
            console.log('min'+min);
            console.log('sec'+sec);
            document.querySelector('[data-tipo=display]').innerText=`${min}:${sec}`;


            switchSession();
            

            if(sessionInfo.sessionType==='work'){
                document.querySelector('.container__interno-head__session').innerText=`Session #${sessionInfo.counter}`;
                document.querySelector('.container__interno-head__type').innerText='Pomodoro';
                switchSession();
 


            }
            else if(sessionInfo.sessionType==='short'){                
                document.querySelector('.container__interno-head__type').innerText='Short Break';
                switchSession();


            }
            else{
                document.querySelector('.container__interno-head__type').innerText='Long Break';
                switchSession();


            }



            return;
        }      
        
        document.querySelector('[data-tipo=display]').innerText=`${min}:${sec}`;
    }       



    });



    //evento do o botão do stop
    document.querySelector('[data-tipo=stop]').addEventListener('click',(e)=>{
        const play=document.querySelector('[data-tipo=start]');
        parada(intervalo);
        parada(intervaloBlink);
        play.classList.remove('botao-blink');
        document.querySelector('[data-tipo=display]').innerText='00:00';
        sessionInfo.counter=1;
        sessionInfo.session=0;
        document.querySelector('.container__interno-head__session').innerText=`Session #${sessionInfo.counter}`;
        document.querySelector('.container__interno-head__type').innerText='Pomodoro';

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

    document.querySelector('.cog').addEventListener('click',()=>{

    });
    
}


const switchSession=()=>{
    let sessaoDisp=document.querySelector('.session');
    sessaoDisp.classList.remove('session');
    sessaoDisp.classList.add('short');
    return;



}

const parada=(num)=>{
    clearInterval(num);
    return;    

}




//exportar essa função
const blink=(elemento)=>{
    if(elemento.target.classList.contains('botao-blink')){
        elemento.target.classList.remove('botao-blink');
    }
    else{
        elemento.target.classList.add('botao-blink');
    }
    return;
}



//esta funcao irá alterar os textos e  também chamar
const controleSessao=()=>{
    if(turno<=2&&tipoSessao==='work'){
        tempo=short;
        switchSession()
        return;       
    }
    else if(turno===3&&tipoSessao==='work'){
        tempo=long;
        return;
    }
         
}











