const errorBlock = document.querySelector(".fall");


function hideErrorBlock(){
    errorBlock.classList.remove('top-[0%]');
    errorBlock.classList.add('top-[-100%]');
}


setTimeout(hideErrorBlock,5000);