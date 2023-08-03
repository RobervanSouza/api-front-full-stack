const url = 'https://api-back-kappa.vercel.app/calcadoMasculino';


const section = document.querySelector('.div');
const cadastro = document.querySelector('.cadastrar');
const nome1 = document.querySelector('.nome');
const descricao1 = document.querySelector('.descricao');
const preco1 = document.querySelector('.preco');
const imageUrl1 = document.querySelector('.imagem');
const tamanho1 = document.querySelector('.tamanho');
const cores1 = document.querySelector('.cores');
const lancamento1 = document.querySelector('.lancamento');
const fechamento1 = document.querySelector('.fechamento');
const origem1 = document.querySelector('.origem');
const desconto1 = document.querySelector('.desconto');
const garantia1 = document.querySelector('.garantia');
const indicacao1 = document.querySelector('.indicacao');
const parcelas1 = document.querySelector('.parcelas');
const checkbox = document.querySelector('#lancamento');

const fetchTurismo = async () => {
    const restaurante = await fetch(url);
    const resposta = await restaurante.json();
    return resposta.data;
};


const imageUrlArray = imageUrl1.value.split(",").map((url) => url.trim());


const cadastrar = async (event) => {
    event.preventDefault();

   
    const isChecked = checkbox.checked ? true : false;


    const turismo = {
        nome: nome1.value,
        imageUrl: imageUrlArray,
        descricao: descricao1.value,
        preco: preco1.value,
        tamanho: tamanho1.value,
        cores: cores1.value,
        lancamento: isChecked,
        fechamento: fechamento1.value,
        origem: origem1.value,
        desconto: desconto1.value,
        garantia: garantia1.value,
        indicacao: indicacao1.value,
        parcelas: parcelas1.value,


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
    lancamento1.checked = false;
    fechamento1.value = '';
    origem1.value = '';
    desconto1.value = '';
    garantia1.value = '';
    indicacao1.value = '';
    parcelas1.value = '';
};

const editarTurismo = async ({ _id, nome, imageUrl, descricao, preco, tamanho, cores, lancamento, fechamento, origem, desconto, garantia, indicacao, parcelas }) => {
    await fetch(`${url}/${_id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, imageUrl, descricao, preco, tamanho, cores, lancamento, fechamento, origem, desconto, indicacao, garantia, parcelas, })
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
    const { _id, nome, imageUrl, descricao, preco, tamanho, cores, lancamento, parcelas, fechamento, origem, desconto, indicacao, garantia } = rest;
    const div = restElementos('div');
    div.className = 'card';

    const titulo = restElementos('h3', `Nome: ${nome}`);
    

    
    let currentIndex = 0; // Adicione a declaração da variável currentIndex e inicialize com 0

    const imageContainer = restElementos('div');
    imageContainer.className = 'image-container';

    const centralImage = restElementos('img', '', '');
    centralImage.src = imageUrl[ 0 ];

    imageContainer.appendChild(centralImage);

    const sideImages = []; // Array para armazenar as imagens laterais

    imageUrl.slice(1).forEach((imageUrl, index) => {
        const sideImage = restElementos('img', '', '');
        sideImage.src = imageUrl;
        sideImage.addEventListener('click', () => {
            centralImage.src = sideImages[ index ].src; // Atualiza a imagem central com a imagem clicada
        });

        sideImages.push(sideImage);
        imageContainer.appendChild(sideImage);
    });

    const changeImageButton = restElementos('button', 'Trocar Imagem');
    changeImageButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageUrl.length;
        centralImage.src = imageUrl[ currentIndex ];
    });

    div.appendChild(imageContainer);
    div.appendChild(changeImageButton);
  // ...

























    const preco1 = restElementos('p', `Preço:  ${preco}`);
    const descricao1 = restElementos('p', `Descrição:  ${descricao}`);
    const tamanho1 = restElementos('p', `Tamanho:  ${tamanho}`);
    const lancamento1 = restElementos('p', `Lançamento:  ${lancamento}`);
    const cores1 = restElementos('p', `Cores:  ${cores}`);
    const fechamento1 = restElementos('p', `Fechamento:  ${fechamento}`);
    const origem1 = restElementos('p', `Origem:  ${origem}`);
    const desconto1 = restElementos('p', `Desconto:  ${desconto}`);
    const indicacao1 = restElementos('p', `Indicação:  ${indicacao}`);
    const garantia1 = restElementos('p', `Garantia:  ${garantia}`);
    const parcelas1 = restElementos('p', `Parcelas:  ${parcelas}`);

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
        const lancamento = document.querySelector('#editLancamento').checked;

        const fechamento = document.querySelector('#editFechamento').value;
        const origem = document.querySelector('#editOrigem').value;
        const desconto = document.querySelector('#editDesconto').value;
        const garantia = document.querySelector('#editGarantia').value;
        const indicacao = document.querySelector('#editIndicacao').value;
        const parcelas = document.querySelector('#editParcelas').value;


        editarTurismo({ _id: editId, nome, imageUrl, descricao, preco, tamanho, cores, lancamento, fechamento, origem, desconto, indicacao, garantia, parcelas });
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
        document.getElementById('editLancamento').value = lancamento;
        document.getElementById('editFechamento').value = fechamento;
        document.getElementById('editOrigem').value = origem;
        document.getElementById('editDesconto').value = desconto;
        document.getElementById('editGarantia').value = garantia;
        document.getElementById('editIndicacao').value = indicacao;
        document.getElementById('editParcelas').value = parcelas;

        editId = _id;
        openModal();
    });

    const deletebutton = restElementos('button', '', '<span class="material-symbols-outlined">delete</span > ');

    deletebutton.addEventListener('click', () => deleteturismo(_id));

    div1.appendChild(editbutton);
    div1.appendChild(deletebutton);
    div.appendChild(titulo);
    // div.appendChild(image);
    div.appendChild(descricao1);
    div.appendChild(preco1);
    div.appendChild(tamanho1);
    div.appendChild(cores1);
    div.appendChild(lancamento1);
    div.appendChild(fechamento1);
    div.appendChild(origem1);
    div.appendChild(desconto1);
    div.appendChild(garantia1);
    div.appendChild(indicacao1);
    div.appendChild(parcelas1);
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
