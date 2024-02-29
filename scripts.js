const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa() {

    if (!input.value) {

        alert("Preencha sua tarefa!");
    }

    else {
        minhaListaDeItens.push({
            tarefa: input.value,
            concluida: false,
        })

        input.value = ''

        mostrarTarefas()
    }

}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi =
            novaLi +

            `

            <li class="task ${item.concluida && 'done'}">

            <button class="button-check" onclick="concluirTarefa(${posicao})">
                <span><i class="fa-solid fa-circle-check"></i></span>
            </button>

                <p>${item.tarefa}</p>

            <button class="button-clear" onclick="deletarItem(${posicao})">
                <span><i class="fa-solid fa-trash"></i></span>
            </button>
            
        </li>
        
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)