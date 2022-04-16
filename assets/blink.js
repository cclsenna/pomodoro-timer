export const blink=(elemento)=>{
    if(elemento.target.classList.contains('botao-blink')){
        elemento.target.classList.remove('botao-blink');
    }
    else{
        elemento.target.classList.add('botao-blink');
    }
    return;
}