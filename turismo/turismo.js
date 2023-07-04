let url = 'https://api-back-kappa.vercel.app/restaurante'
const section = document.querySelector('.div')
const fetchTurismo = async () => {
    const restaurante = await fetch(url)
    const resposta = await restaurante.json()
    // console.log(resposta.data)
    return resposta.data
}
fetchTurismo();

const restElementos = (tag, innerText = '', innerHTML = '') =>{
    const elemento = document.createElement(tag);
    if (innerText){
        elemento.innerText = innerText;
    }
    if (innerHTML) {
        elemento.innerHTML = innerHTML;
    }
    return elemento;
}
// const rest = {
//     id: 1,
//     nome: 'sdfsdfsdf',
//     cidade: 'cidade',
//     pais: 'pais',
//     imageUrl: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/21F9/production/_124279680_gettyimages-599134940.jpg'
// }

const createRestaurante =  (rest) => {
    const {id, nome, cidade, pais, imageUrl } = rest;
    const div = restElementos('div');
    div.className = "card";
    const titulo = restElementos('h3',`Nome: ${nome}` );
    const image = restElementos('img', imageUrl);
    image.src = imageUrl;
    const cidade1 = restElementos('p', `Cidade: ${cidade}`);
    const pais1 = restElementos('p', `Pais: ${pais}`);
    const div1  = restElementos('div');
    div1.className = 'botao'; 
    const editbutton = restElementos('button', '', '<span class="material-symbols-outlined">edit</span > ')
    const deletebutton = restElementos('button', '', '<span class="material-symbols-outlined">delete</span > ')
    div1.appendChild(editbutton)
    div1.appendChild(deletebutton)
    div.appendChild(titulo);
    div.appendChild(image);
    div.appendChild(cidade1);
    div.appendChild(pais1);
    div.appendChild(div1);
    section.appendChild(div)
    console.log(section)
}

// createRestaurante(rest)
