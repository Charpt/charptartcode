function deslogar(){
    firebase.auth().signOut().then(() =>{
        window.location.href ="../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        buscarDados(user);
    }
})

function CadastrarProdutoPage(){
    window.location.href ="../../pages/produtos/cadastrar_produtos.html";
}


function buscarDados(user){

    ShowLoading();

   firebase.firestore()
   .collection('produtos')
   .where('user.uid','==', user.uid)
   .orderBy('codigo','desc')
   .get()
   .then(snapshot =>{
    removeLoading();
    const dados = snapshot.docs.map(doc => doc.data());
    AddDados(dados);
   }).catch(error =>{
    removeLoading();
    console.log(error);
    alert("Erro ao recuperar dados");
   })
}

function AddDados(dados){
const orderList = document.getElementById('lista_dados');

dados.forEach(dados => {

    const li = document.createElement('li');
    li.classList.add(dados.status);


    const codigo = document.createElement('p');
    codigo.innerHTML =  "Codigo: "+dados.codigo;
    li.appendChild(codigo);

    const produto = document.createElement('p');
    produto.innerHTML =  "Produto: "+dados.produto;
    li.appendChild(produto);

    const unidade_medida = document.createElement('p');
    unidade_medida.innerHTML =  "Unidade de Medida: "+dados.unidade_medida;
    li.appendChild(unidade_medida);

    const quantidade = document.createElement('p');
    quantidade.innerHTML =  "Quantidade: "+dados.quantidade;
    li.appendChild(quantidade);

    const tipo_animal = document.createElement('p');
    tipo_animal.innerHTML =  "Tipo Animal: "+dados.tipo_animal;
    li.appendChild(tipo_animal);

    const idade = document.createElement('p');
    idade.innerHTML =  "Idade: "+dados.idade;
    li.appendChild(idade);

    const porte = document.createElement('p');
    porte.innerHTML =  "Porte: "+dados.porte;
    li.appendChild(porte);


    const observacao = document.createElement('p');
    observacao.innerHTML =  "Observacao: "+dados.observacao;
    li.appendChild(observacao);

    const data_criacao = document.createElement('p');
    data_criacao.innerHTML =  "Data Criacao: "+formatar_data(dados.data_criacao);
    li.appendChild(data_criacao);

    const data_edicao = document.createElement('p');
    data_edicao.innerHTML = "Data Edicao: "+formatar_data(dados.data_edicao);
    li.appendChild(data_edicao);



    orderList.appendChild(li);
    
});

}

function formatar_data(data){
    return new Date(data).toLocaleString('pt-br');

}
