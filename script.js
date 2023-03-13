let agenda = document.getElementsByTagName("table")[0];
let contato = document.getElementById("adicionarContato");
let expandButton = document.getElementsByTagName("img")[0];

function novoContato(nome, telefone) {
    let novaLinha = document.createElement("tr");
    let novoNome = document.createElement("td");
    let novoTelefone = document.createElement("td");

    novoNome.innerText = nome;
    novoTelefone.innerText = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novoTelefone);
    agenda.getElementsByTagName("tbody")[0].appendChild(novaLinha);
}

function verificar(nome, telefone){
    if(verificarNome(nome) && verificarTelefone(telefone)){
        return true;
    }else{
        if(!verificarNome(nome)){
            return 'errorNome';
        }else{
            return 'errorTelefone';
        }
    }
}

function verificarNome(nome, telefone){
    if(nome.value.length < 4){
        return false;
    }else{
        return true;
    }
}

function verificarTelefone(telefone){
    if(telefone.value.length != 11){
        return false;
    }else{
        return true;
    }
}

function limparCampos(){
    let nome = document.getElementById("nome");
    let telefone = document.getElementById("telefone");
    nome.value = '';
    telefone.value = '';
}

function errorMessage(nome, telefone, error, message){
    if(error === 'errorNome'){
        nome.style.borderColor = 'red';
        message.classList.add('alerta');
        message.classList.add('error');
        message.innerHTML = 'O nome precisa ter mais de 4 caracteres!'
        nome.parentElement.appendChild(message);
    }else{
        telefone.style.borderColor = 'red';
        message.classList.add('alerta');
        message.classList.add('error');
        message.innerHTML = 'O telefone precisa ter DD + 9 números!'
        telefone.parentElement.appendChild(message);
    }
}

function successMessage(form, message){
    message.classList.add('alerta');
    message.classList.add('sucesso');
    message.innerHTML = 'Contato adicionado!'
    form.appendChild(message);
}

function removeMessage(){
    let message = document.getElementsByClassName('alerta')[0];
    message.remove();
}

contato.addEventListener("submit", function() {
    event.preventDefault();

    let form = document.getElementById("adicionarContato");
    let nome = document.getElementById("nome");
    let telefone = document.getElementById("telefone");
    let message = document.createElement('p');

    if(contato.getElementsByTagName('p')[0] === undefined){
        if(verificar(nome, telefone) === true){
            novoContato(nome.value, telefone.value);
            limparCampos();
            successMessage(form, message);
        }else{
            errorMessage(nome, telefone, verificar(nome, telefone), message);
        }
    }else{
        if(verificar(nome, telefone) === true){
            novoContato(nome.value, telefone.value);
            limparCampos();
            removeMessage();
            successMessage(form, message);
        }else{
            removeMessage();
            errorMessage(nome, telefone, verificar(nome, telefone), message);
        }
    }
});

agenda.addEventListener("mouseover", function() {
    event.target.parentNode.classList.add("selecionado");
}
);

agenda.addEventListener("mouseout", function() {
    event.target.parentNode.classList.remove("selecionado");
}
);

expandButton.addEventListener("click", function(){
    if(contato.style.display === 'grid'){
        contato.style.display = 'none'
    }else{
        contato.style.display = 'grid'
    }
})

