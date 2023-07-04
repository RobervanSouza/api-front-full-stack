
  
    let currentUrl = window.location.href;
    let routes = {
    restaurante: "/restaurantes/restaurante.html",
    hotel: "/hoteis/hotel.html",
    carro: "/carros/carro.html",
    moto: "/motos/moto.html",
    filmes: "/filmes/filmes.html",
    livro: "/livros/livro.html",
    turismo: "/turismo/turismo.html",
    cachorro: "/cachorro/cachorro.html",
    gato: "/gato/gato.html",
    celular: "/celulares/celular.html"
  };

    // Itera sobre as rotas e verifica a rota ativa
for (let ativa in routes) {
    if (currentUrl.includes(routes[ ativa ])) {
        // Obtém o elemento de link correspondente à rota ativa
        let linkElement = document.querySelector("a[href='" + routes[ ativa ] + "']");
        // Modifica diretamente as propriedades de estilo do elemento
        linkElement.classList.add("rota-ativa")
        break;
    }
}


