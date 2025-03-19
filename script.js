const btn_adicionar = document.querySelector('.btn-add-task');
const txt_tarefa = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');

let minhaListaDeItens = [];

function adicionarNovaTarefa(){
    if(!txt_tarefa.value){
        alert('Digite uma nova tarefa')
    } else {
        minhaListaDeItens.push({
            tarefa: txt_tarefa.value,
            concluida: false
        });
        txt_tarefa.value = '';
        mostrarTarefas()
    }
}

function mostrarTarefas(){

    let novaLi = ``
    
    minhaListaDeItens.forEach((item, posicao) => {

        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}">
                <img src="./imagens/icon_check.png" alt="icon check" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./imagens/icon_lixeira.png" alt="icon lixeira" onclick="deletarItem(${posicao})">
            </li>
        `

    })

    listaCompleta.innerHTML = novaLi;

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    mostrarTarefas();
}

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1);
    mostrarTarefas();
}

function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    if(tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }
    mostrarTarefas()
}

recarregarTarefas()
btn_adicionar.addEventListener('click', adicionarNovaTarefa)