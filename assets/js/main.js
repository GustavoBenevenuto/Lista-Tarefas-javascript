function main() {
    const tarefas = [];
    const quadroresposta = document.querySelector('.quadro-resposta');
    const iptTarefa = document.querySelector('.ipt-tarefa');

    //Quando clicar no botão de remover
    document.addEventListener('click', (e) => {
        const elemento = e.target; //Pega o elemento que foi clicado
        let indice;

        //Se clicar no LI ele coloca o texto no input
        if (elemento.classList.contains('li-item')) {
            iptTarefa.value = elemento.innerText;
        }

        //Captura quando clicar para adicionar tarefa
        if (elemento.classList.contains('btn-adicionar')) {
            adcionar();
            return;
        }

        //Captura qual botao de editar foi clicado
        if (elemento.classList.contains('btn-editar')) {
            indice = elemento.getAttribute('posicao');
            editar(indice);
        }

        //Captura qual botao de remover foi clicado
        if (elemento.classList.contains('btn-remover')) {
            indice = elemento.getAttribute('posicao');
            //Na posicao indice, remova 1
            remover(indice);
            listar();
            return;
        }
    });

    //Quando digitar no input
    iptTarefa.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) { // Quando clicar no enter é para adicionar
            e.preventDefault();
            adcionar();
        }
    });

    function limpaInput() {
        iptTarefa.value = '';
        iptTarefa.focus();
    }

    function adcionar() {
        if (iptTarefa.value) { //Verica se não esta vazio
            tarefas.push(iptTarefa.value);
            limpaInput();
            salvar();
            listar();
            return;
        }
        alert('O campo não pode estar vazio');
    }

    function editar(indice) {
        tarefas[indice] = iptTarefa.value;
        limpaInput();
        salvar();
        listar();
    }

    function remover(indice) {
        tarefas.splice(indice, 1);
        salvar();
    }

    function listar() {
        quadroresposta.innerHTML = '';
        for (i in tarefas) {
            quadroresposta.innerHTML +=
                `
            <ul>
                <li class="li-item" title="Clique para editar">${tarefas[i]}</li>
                <button type="button" class="btn-remover" posicao="${i}" title="Apagar tarefa">REMOVER</button>
                <button type="button" class="btn-editar" posicao="${i}" title="Clique para confirmar edição">EDITAR</button>
            </ul>
            `
        }
    }

    //Salvar JSON
    function salvar(){
        const tarefasJSON = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', tarefasJSON) // Nome que usarei para quando buscar esses dados
    }

    //Ler as terefas json
    function buscarTarefasSalvas(){
        const tarefasJSON = localStorage.getItem('tarefas');
        const tarefasARRAY = JSON.parse(tarefasJSON); //Transforma em Array
        
        //Colocando os valores salvo no storage no array que até o moneto esta vazio
        for(let i in tarefasARRAY){
            tarefas[i] = tarefasARRAY[i];
        }
        listar();
    }
    buscarTarefasSalvas();
}
main();
