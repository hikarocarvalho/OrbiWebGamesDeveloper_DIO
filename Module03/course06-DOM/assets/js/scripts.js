const element = [
    document.querySelector('body'),
    document.getElementById('page-title'),
    document.getElementById('mode-selector'),
    document.querySelector('footer')
];

const changeDark = (event)=>{
    event.preventDefault();
    element.forEach(item=>{
        item.classList.toggle("dark-mode");
        console.log(item.tagName);
        if(item.tagName==='H1'){
            if(item.innerHTML==='Light Mode ON'){
                item.innerHTML= 'Light Mode OFF';
            }else{
                item.innerHTML='Light Mode ON';
            }
        }
    });
}

element[2].addEventListener('click',changeDark);