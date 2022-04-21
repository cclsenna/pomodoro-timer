import sessionInfo from './session.js';

const inputs=document.querySelectorAll('input');

/*
inputs.forEach(element=>{
    element.addEventListener('change',()=>{
        let numField=document.querySelector(`input[data-tipo="${element.target.dataset.tipo}"]`);
        if(se==='work'){
            if (valor<10) valor='0'+valor; 
            let numField=document.querySelector(`input[data-tipo="${element.target.dataset.tipo}"]`);
        }     

        element.target.value

    })

})

*/


function arrows(){
    const inc=document.querySelectorAll('.container__options-config__step');

    inc.forEach(val=>val.addEventListener('click',(element)=>{
        const numField=document.querySelector(`input[data-tipo="${element.target.dataset.tipo}"]`);
        
        if(element.target.dataset.mode==='up'&&!numField.hasAttribute('disabled')){
            numField.stepUp(1);
        }
        else if (element.target.dataset.mode==='down'&&!numField.hasAttribute('disabled')){
            numField.stepDown(1);
        }

        let valor=document.querySelector(`input[data-tipo="${element.target.dataset.tipo}"]`).value;
        sessionInfo[element.target.dataset.tipo]=parseInt(valor);
        if(element.target.dataset.tipo==='work'){
            if (valor<10) valor='0'+valor; 
            document.querySelector('[data-tipo=display]').innerText=`${valor}:00`;
        }            

    })
    );
}


arrows();


