const url = 'https://api-back-kappa.vercel.app/hotel';
const section = document.querySelector('.div');
const cadastro = document.querySelector('.cadastrar');
const nome1 = document.querySelector('.nome');
const cidade1 = document.querySelector('.cidade');
const pais1 = document.querySelector('.pais');
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
        cidade: cidade1.value,
        imageUrl: imageUrl1.value,
        pais: pais1.value
    };

    await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turismo)
    });

    todosApi();

    nome1.value = '';
    cidade1.value = '';
    imageUrl1.value = '';
    pais1.value = '';
};

const editarTurismo = async ({ _id, nome, cidade, pais, imageUrl }) => {
    await fetch(`${url}/${_id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cidade, pais, imageUrl })
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
    const { _id, nome, cidade, pais, imageUrl } = rest;
    const div = restElementos('div');
    div.className = 'card';

    const titulo = restElementos('h3', `Nome: ${nome}`);
    const image = restElementos('img', '', '');
    image.src = imageUrl;

    const cidade1 = restElementos('p', `Cidade: ${cidade}`);
    const pais1 = restElementos('p', `Pais: ${pais}`);

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
        const cidade = document.querySelector('#editCidade').value;
        const pais = document.querySelector('#editPais').value;
        const imageUrl = document.querySelector('#editImageUrl').value;

        editarTurismo({ _id: editId, nome, cidade, imageUrl, pais });
        fecharModal();
    });

    const openModal = () => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
    };

    editbutton.addEventListener('click', () => {
        document.getElementById('editNome').value = nome;
        document.getElementById('editCidade').value = cidade;
        document.getElementById('editPais').value = pais;
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
    div.appendChild(cidade1);
    div.appendChild(pais1);
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
