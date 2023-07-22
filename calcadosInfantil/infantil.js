const url = 'https://api-back-kappa.vercel.app/calcadoInfantil';

const section = document.querySelector('.div');
const cadastro = document.querySelector('.cadastrar');
const nome1 = document.querySelector('.nome');
const descricao1 = document.querySelector('.descricao');
const preco1 = document.querySelector('.preco');
const imageUrl1 = document.querySelector('.imagem');
const tamanho1 = document.querySelector('.tamanho');
const cores1 = document.querySelector('.cores');
const linha1 = document.querySelector('.linha');
const fechamento1 = document.querySelector('.fechamento');
const origem1 = document.querySelector('.origem');
const desconto1 = document.querySelector('.desconto');
const garantia1 = document.querySelector('.garantia');
const indicacao1 = document.querySelector('.indicacao');


let editId;

const fetchTurismo = async () => {
    const restaurante = await fetch(url);
    const resposta = await restaurante.json();
    return resposta.data;
};

const cadastrar = async (event) => {
    event.preventDefault();

    const turismo = {
        nome: nome1.value,
        imageUrl: imageUrl1.value,
        descricao: descricao1.value,
        preco: preco1.value,
        tamanho: tamanho1.value,
        cores: cores1.value,
        linha: linha1.value,
        fechamento: fechamento1.value,
        origem: origem1.value,
        desconto: desconto1.value,
        garantia: garantia1.value,
        indicacao: indicacao1.value,


    };

    await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turismo)
    });

    todosApi();

    nome1.value = '';
    imageUrl1.value = '';
    descricao1.value = '';
    preco1.value = '';
    tamanho1.value = '';
    cores1.value = '';
    linha1.value = '';
    fechamento1.value = '';
    origem1.value = '';
    desconto1.value = '';
    garantia1.value = '';
    indicacao1.value = '';
};

const editarTurismo = async ({ _id, nome, imageUrl, descricao, preco, tamanho, cores, linha, fechamento, origem, desconto, garantia, indicacao }) => {
    await fetch(`${url}/${_id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, imageUrl, descricao, preco, tamanho, cores, linha, fechamento, origem, desconto, indicacao, garantia })
    });

    todosApi();
};

const deleteturismo = async (_id) => {
    await fetch(`${url}/${_id}`, {
        method: 'delete'
    });

    todosApi();
};

const restElementos = (tag, innerText = '', innerHTML = '') => {
    const elemento = document.createElement(tag);

    if (innerText) {
        elemento.innerText = innerText;
    }

    if (innerHTML) {
        elemento.innerHTML = innerHTML;
    }

    return elemento;
};

const createTurismo = (rest) => {
    const { _id, nome, imageUrl, descricao, preco, tamanho, cores, linha, fechamento, origem, desconto, indicacao, garantia } = rest;
    const div = restElementos('div');
    div.className = 'card';

    const titulo = restElementos('h3', `Nome: ${nome}`);
    const image = restElementos('img', '', '');
    image.src = imageUrl;

    const preco1 = restElementos('p', `Preço:  ${preco}`);
    const descricao1 = restElementos('p', `Descrição:  ${descricao}`);
    const tamanho1 = restElementos('p', `Tamanho:  ${tamanho}`);
    const linha1 = restElementos('p', `Linha:  ${linha}`);
    const cores1 = restElementos('p', `Cores:  ${cores}`);
    const fechamento1 = restElementos('p', `Fechamento:  ${fechamento}`);
    const origem1 = restElementos('p', `Origem:  ${origem}`);
    const desconto1 = restElementos('p', `Desconto:  ${desconto}`);
    const indicacao1 = restElementos('p', `Indicação:  ${indicacao}`);
    const garantia1 = restElementos('p', `Garantia:  ${garantia}`);

    const div1 = restElementos('div');
    div1.className = 'botao';

    const fecharModal = () => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
    };

    const editbutton = restElementos('button', '', '<span class="material-symbols-outlined">edit</span > ');
    const submit = document.querySelector('#editForm');

    submit.addEventListener('submit', (event) => {
        event.preventDefault();
        const nome = document.querySelector('#editNome').value;
        const imageUrl = document.querySelector('#editImagemUrl').value;
        const descricao = document.querySelector('#editDescricao').value;

        const preco = parseFloat(document.querySelector('#editPreco').value);
        const tamanho = document.querySelector('#editTamanho').value.split(',').map(item => item.trim());
        const cores = document.querySelector('#editCores').value.split(',').map(item => item.trim());
        const linha = document.querySelector('#editLinha').value;

        const fechamento = document.querySelector('#editFechamento').value;
        const origem = document.querySelector('#editOrigem').value;
        const desconto = document.querySelector('#editDesconto').value;
        const garantia = document.querySelector('#editGarantia').value;
        const indicacao = document.querySelector('#editIndicacao').value;


        editarTurismo({ _id: editId, nome, imageUrl, descricao, preco, tamanho, cores, linha, fechamento, origem, desconto, indicacao, garantia });
        fecharModal();
    });

    const openModal = () => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
    };
    editbutton.addEventListener('click', () => {
        document.getElementById('editNome').value = nome;
        document.getElementById('editImagemUrl').value = imageUrl;
        document.getElementById('editDescricao').value = descricao;
        document.getElementById('editPreco').value = preco;
        document.getElementById('editTamanho').value = tamanho;
        document.getElementById('editCores').value = cores;
        document.getElementById('editLinha').value = linha;
        document.getElementById('editFechamento').value = fechamento;
        document.getElementById('editOrigem').value = origem;
        document.getElementById('editDesconto').value = desconto;
        document.getElementById('editGarantia').value = garantia;
        document.getElementById('editIndicacao').value = indicacao;

        editId = _id;
        openModal();
    });

    const deletebutton = restElementos('button', '', '<span class="material-symbols-outlined">delete</span > ');

    deletebutton.addEventListener('click', () => deleteturismo(_id));

    div1.appendChild(editbutton);
    div1.appendChild(deletebutton);
    div.appendChild(titulo);
    div.appendChild(image);
    div.appendChild(descricao1);
    div.appendChild(preco1);
    div.appendChild(tamanho1);
    div.appendChild(cores1);
    div.appendChild(linha1);
    div.appendChild(fechamento1);
    div.appendChild(origem1);
    div.appendChild(desconto1);
    div.appendChild(garantia1);
    div.appendChild(indicacao1);
    div.appendChild(div1);

    return div;
};

const todosApi = async () => {
    const busca = await fetchTurismo();
    section.innerHTML = '';

    busca.forEach((rest) => {
        const criaDiv = createTurismo(rest);
        section.appendChild(criaDiv);
    });
};

cadastro.addEventListener('submit', cadastrar);

todosApi();
