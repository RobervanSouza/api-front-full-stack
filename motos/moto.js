const url = 'https://api-back-kappa.vercel.app/moto';
const section = document.querySelector('.div');
const cadastro = document.querySelector('.cadastrar');
const nome1 = document.querySelector('.nome');
const marca1 = document.querySelector('.marca');
const ano1 = document.querySelector('.ano');
const imageUrl1 = document.querySelector('.image');

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
        marca: marca1.value,
        imageUrl: imageUrl1.value,
        ano: ano1.value
    };

    await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turismo)
    });

    todosApi();

    nome1.value = '';
    marca1.value = '';
    imageUrl1.value = '';
    ano1.value = '';
};

const editarTurismo = async ({ _id, nome, marca, ano, imageUrl }) => {
    await fetch(`${url}/${_id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, marca, ano, imageUrl })
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
    const { _id, nome, marca, ano, imageUrl } = rest;
    const div = restElementos('div');
    div.className = 'card';

    const titulo = restElementos('h3', `Nome: ${nome}`);
    const image = restElementos('img', '', '');
    image.src = imageUrl;

    const marca1 = restElementos('p', `Marca:  ${marca}`);
    const ano1 = restElementos('p', `Ano:  ${ano}`);

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
        const marca = document.querySelector('#editMarca').value;
        const ano = document.querySelector('#editAno').value;
        const imageUrl = document.querySelector('#editImageUrl').value;

        editarTurismo({ _id: editId, nome, marca, imageUrl, ano });
        fecharModal();
    });

    const openModal = () => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
    };

    editbutton.addEventListener('click', () => {
        document.getElementById('editNome').value = nome;
        document.getElementById('editMarca').value = marca;
        document.getElementById('editAno').value = ano;
        document.getElementById('editImageUrl').value = imageUrl;
        editId = _id;
        openModal();
    });

    const deletebutton = restElementos('button', '', '<span class="material-symbols-outlined">delete</span > ');

    deletebutton.addEventListener('click', () => deleteturismo(_id));

    div1.appendChild(editbutton);
    div1.appendChild(deletebutton);
    div.appendChild(titulo);
    div.appendChild(image);
    div.appendChild(marca1);
    div.appendChild(ano1);
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
