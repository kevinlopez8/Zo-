let cerrar = document.querySelectorAll(".close")[0];
let abrir = document.querySelectorAll(".cta")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalC = document.querySelectorAll(".modal-container")[0];

abrir.addEventListener("click", function(e){
    e.preventDefault();
    modalC.style.opacity="1";
    modalC.style.visibility="visible";
    modal.classList.toggle("modal-close")

});

cerrar.addEventListener("click", function(){
    modal.classList.toggle("modal-close");
    setTimeout(function(){
        modalC.style.opacity="0";
        modalC.style.visibility="hidden";
    },900)
})


const $form = document.querySelector('#form')
const $buttonMailto = document.querySelector('#mail')


 $form.addEventListener('submit',handleSubmit)


 function handleSubmit(event){
    event.preventDefault()
    const form = new FormData(this)
    $buttonMailto.setAttribute('href',`mailto:kevinlopez1059@hotmail.com?subjet=${form.get('name')}${form.get('email')}${form.get('phone')}&body=${form.get('message')}`)
    $buttonMailto.click()
}


