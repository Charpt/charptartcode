function ShowLoading(){
    const div = document.createElement('div');
    div.classList.add("loading","centralizar");

    const label = document.createElement('label');
    label.innerText = "Carregando...";
    div.appendChild(label);


    const section = document.getElementById('section_id');
    section.appendChild(div);
}

function removeLoading(){
    const loadings = document.getElementsByClassName("loading");
    if(loadings.length){
        loadings[0].remove();
    }
}