document.onload=arrows();

function arrows(){
    const inc=document.querySelectorAll('.container__options-config__step');


    inc.forEach(val=>val.addEventListener('click',(element)=>{
        const numField=document.querySelector(`input[data-tipo="${element.target.dataset.tipo}"]`);
        
        if(element.target.dataset.mode==='up'){
            numField.stepUp(1);
        }
        else if (element.target.dataset.mode==='down'){
            numField.stepDown(1);    
        }
    })
    );
}