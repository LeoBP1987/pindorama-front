import api from "./api.js";

const ui = {
  index: {
    elementos() {
      const listaCriaturas = document.getElementById("main-lista");

      return { listaCriaturas: listaCriaturas };
    },

    async reinderizarCriaturasUI(criaturas = null) {
      const elementos = ui.index.elementos();

      elementos.listaCriaturas.innerHTML = "";

      try {
        if (!criaturas) {
          criaturas = await api.buscarCriaturas();
        }

        if (criaturas.length !== 0) {
          criaturas.forEach(ui.index.adicionarCriaturaUI);
        } else {
          const h3SemCriatura = document.createElement("h3");
          h3SemCriatura.innerHTML = `<h3 class="main_cabecalho_titulo">Não há criaturas cadastradas no momento.</h3>`;
          elementos.listaCriaturas.appendChild(h3SemCriatura);
        }
      } catch (error) {
        alert("Erro ao reinderizar criaturas; Arquivo ui");
        throw error;
      }
    },

    async adicionarCriaturaUI(criatura) {
      const elementos = ui.index.elementos();

      const liCriatura = document.createElement("li");
      liCriatura.classList.add("main_lista_item");
      liCriatura.setAttribute("data-id", criatura.id);
      liCriatura.addEventListener("click", () => {
        localStorage.setItem("idCriatura", criatura.id);
      });

      const linkCriatura = document.createElement("a");
      linkCriatura.classList.add("menu_lista_item_link");
      linkCriatura.href = "criatura.html";

      const imgCriatura = document.createElement("img");
      imgCriatura.classList.add("main_lista_item_img");
      if (criatura.foto_perfil) {
        imgCriatura.src = `${criatura.foto_perfil}`;
      } else {
        imgCriatura.src = "/assets/criatura_sem_imagem.jpg";
      }

      imgCriatura.alt = `Imagem da criatura ${criatura.criatura}`;

      const divCriaturaInfo = document.createElement("div");
      divCriaturaInfo.classList.add("main_lista_item_textos");

      const h3Criatura = document.createElement("h3");
      h3Criatura.classList.add("main_lista_item_textos_titulo");
      h3Criatura.textContent = `${criatura.criatura}`;

      const divTipo = document.createElement("div");
      divTipo.classList.add("main_lista_item_textos_tipo");
      const paragrafoTipo = document.createElement("p");
      paragrafoTipo.innerHTML = `<p class="main_lista_item_textos_paragrafo"><strong>Tipo :</strong></p>`;
      const paragrafoConteudoTipo = document.createElement("p");
      paragrafoConteudoTipo.classList.add("main_lista_item_textos_paragrafo");
      paragrafoConteudoTipo.textContent = `${criatura.tipo_nome}`;
      divTipo.appendChild(paragrafoTipo);
      divTipo.appendChild(paragrafoConteudoTipo);

      const divForma = document.createElement("div");
      divForma.classList.add("main_lista_item_textos_forma");
      const paragrafoForma = document.createElement("p");
      paragrafoForma.innerHTML = `<p class="main_lista_item_textos_paragrafo"><strong>Forma :</strong></p>`;
      const paragrafoConteudoForma = document.createElement("p");
      paragrafoConteudoForma.classList.add("main_lista_item_textos_paragrafo");
      paragrafoConteudoForma.textContent = `${criatura.forma_nome}`;
      divForma.appendChild(paragrafoForma);
      divForma.appendChild(paragrafoConteudoForma);

      const divOrigem = document.createElement("div");
      divOrigem.classList.add("main_lista_item_textos_origem");
      const paragrafoOrigem = document.createElement("p");
      paragrafoOrigem.innerHTML = `<p class="main_lista_item_textos_paragrafo"><strong>Origem :</strong></p>`;
      const paragrafoConteudoOrigem = document.createElement("p");
      paragrafoConteudoOrigem.classList.add("main_lista_item_textos_paragrafo");
      paragrafoConteudoOrigem.textContent = `${criatura.origem_nome}`;
      divOrigem.appendChild(paragrafoOrigem);
      divOrigem.appendChild(paragrafoConteudoOrigem);

      divCriaturaInfo.appendChild(h3Criatura);
      divCriaturaInfo.appendChild(divTipo);
      divCriaturaInfo.appendChild(divForma);
      divCriaturaInfo.appendChild(divOrigem);

      linkCriatura.appendChild(imgCriatura);
      linkCriatura.appendChild(divCriaturaInfo);

      liCriatura.appendChild(linkCriatura);

      elementos.listaCriaturas.appendChild(liCriatura);
    },

    async pesquisaCriatura(tipo, id) {
      switch (tipo) {
        case "tipo": {
          const criaturas_tipo = await api.buscaCriaturaPorTipo(id);
          ui.index.reinderizarCriaturasUI(criaturas_tipo);
          break;
        }
        case "forma": {
          const criaturas_forma = await api.buscaCriaturaPorForma(id);
          ui.index.reinderizarCriaturasUI(criaturas_forma);
          break;
        }
        case "origem": {
          const criaturas_origem = await api.buscaCriaturaPorOrigem(id);
          ui.index.reinderizarCriaturasUI(criaturas_origem);
          break;
        }
        case "etiqueta": {
          const criaturas_etiqueta = await api.buscaCriaturaPorEtiqueta(id);
          ui.index.reinderizarCriaturasUI(criaturas_etiqueta);
          break;
        }
        default: {
          alert("Código ainda em implementação");
          break;
        }
      }
    },
  },

  criatura: {
    elementos() {
      const tituloCriatura = document.getElementById("titulo-criatura");
      const imgCriatura = document.getElementById("foto-perfil-criatura");
      const nomeCriatura = document.getElementById("conteudo-nome-criatura");
      const tipoCriatura = document.getElementById("conteudo-tipo-criatura");
      const formaCriatura = document.getElementById("conteudo-forma-criatura");
      const origemCriatura = document.getElementById(
        "conteudo-origem-criatura"
      );
      const modoCriatura = document.getElementById("conteudo-modo-criatura");
      const descricaoCriatura = document.getElementById(
        "conteudo-descricao-criatura"
      );
      const listaEtiquetas = document.getElementById("lista-etiquetas");

      return {
        titulo: tituloCriatura,
        img: imgCriatura,
        nome: nomeCriatura,
        tipo: tipoCriatura,
        forma: formaCriatura,
        origem: origemCriatura,
        modo: modoCriatura,
        descricao: descricaoCriatura,
        listaEtiquetas: listaEtiquetas,
      };
    },

    async reinderizarCriaturaPorIdUI(id) {
      const criatura = await api.buscarCriaturaPorId(id);
      const elementos = ui.criatura.elementos();

      elementos.titulo.textContent = criatura.criatura;
      elementos.img.src = criatura.foto_perfil
        ? criatura.foto_perfil
        : "/assets/criatura_sem_imagem.jpg";
      elementos.img.alt = criatura.foto_perfil
        ? `Imagem da criatura ${criatura.criatura}`
        : "Image padrão para criaturas sem imagem";
      elementos.nome.textContent = criatura.criatura;
      elementos.tipo.textContent = criatura.tipo_nome;
      elementos.forma.textContent = criatura.forma_nome;
      elementos.origem.textContent = criatura.origem_nome;
      elementos.modo.textContent = criatura.modo;
      elementos.descricao.textContent = criatura.descricao;

      const etiquetas = await api.buscarEtiquetasPorCriatura(criatura.id);
      etiquetas.forEach(ui.criatura.gerarEtiquetas);
    },

    async gerarEtiquetas(etiqueta) {
      const elementos = ui.criatura.elementos();
      const liEtiqueta = document.createElement("li");
      liEtiqueta.classList.add("item_lista_etiquetas");
      liEtiqueta.textContent = etiqueta.etiqueta;

      elementos.listaEtiquetas.appendChild(liEtiqueta);
    },
  },

  tipos: {
    elementos() {
      const listaTipos = document.getElementById("main-tipos");
      const tituloModal = document.getElementById("titulo-modal");
      const nomeModal = document.getElementById("modal-nome");
      const descricaoModal = document.getElementById("modal-descricao");
      const formularioTipo = document.getElementById("form-tipo");
      const modalEdit = document.getElementById("modal-edit");
      const btnApagar = document.getElementById("botao-apagar");
      const btnPublicar = document.getElementById("btn-publicar");
      const inputId = document.getElementById("tipo-id");

      return {
        listaTipos: listaTipos,
        tituloModal: tituloModal,
        nomeModal: nomeModal,
        descricaoModal: descricaoModal,
        formularioTipo: formularioTipo,
        modalEdit: modalEdit,
        btnApagar: btnApagar,
        btnPublicar: btnPublicar,
        inputId: inputId,
      };
    },

    async reinderizarTiposUi(tipos = null) {
      const elementos = ui.tipos.elementos();

      elementos.listaTipos.innerHTML = "";
      elementos.formularioTipo.reset();
      elementos.btnApagar.classList.add("invisivel");
      elementos.btnPublicar.textContent = "Publicar";
      elementos.inputId.value = "";

      try {
        if (!tipos) {
          tipos = await api.buscarTipos();
        }

        if (tipos) {
          tipos.forEach(ui.tipos.adicionarTiposUI);
        } else {
          const h3SemTipo = document.createElement("h3");
          h3SemTipo.innerHTML = `<h3 class="main_cabecalho_titulo_tipo">Não há tipos cadastradas no momento.</h3>`;
          elementos.listaTipos.appendChild(h3SemTipo);
        }
      } catch (error) {
        alert("Erro ao reinderizar tipos; Arquivo ui");
        throw error;
      }
    },

    async adicionarTiposUI(tipo) {
      const elementos = ui.tipos.elementos();

      const liTipos = document.createElement("li");
      liTipos.classList.add("main_tipos_lista_item");
      liTipos.setAttribute("data-id", tipo.id);
      liTipos.textContent = tipo.tipo;
      liTipos.addEventListener("click", () => {
        elementos.tituloModal.textContent = tipo.tipo;
        elementos.nomeModal.value = tipo.tipo;
        elementos.descricaoModal.value = tipo.descricao;
        elementos.modalEdit.setAttribute("data-id", tipo.id);
        elementos.modalEdit.style.display = "flex";
      });

      elementos.listaTipos.appendChild(liTipos);
    },
  },

  formas: {
    elementos() {
      const listaFormas = document.getElementById("main-formas");
      const tituloModal = document.getElementById("titulo-modal");
      const nomeModal = document.getElementById("modal-nome");
      const descricaoModal = document.getElementById("modal-descricao");
      const formularioForma = document.getElementById("form-formas");
      const modalEdit = document.getElementById("modal-edit");
      const btnApagar = document.getElementById("botao-apagar");
      const btnPublicar = document.getElementById("btn-publicar");
      const inputId = document.getElementById("forma-id");

      return {
        listaFormas: listaFormas,
        tituloModal: tituloModal,
        nomeModal: nomeModal,
        descricaoModal: descricaoModal,
        formularioForma: formularioForma,
        modalEdit: modalEdit,
        btnApagar: btnApagar,
        btnPublicar: btnPublicar,
        inputId: inputId,
      };
    },

    async reinderizarFormasUi(formas = null) {
      const elementos = ui.formas.elementos();

      elementos.listaFormas.innerHTML = "";
      elementos.formularioForma.reset();
      elementos.btnApagar.classList.add("invisivel");
      elementos.btnPublicar.textContent = "Publicar";
      elementos.inputId.value = "";

      try {
        if (!formas) {
          formas = await api.buscarFormas();
        }

        if (formas) {
          formas.forEach(ui.formas.adicionarFormasUI);
        } else {
          const h3SemForma = document.createElement("h3");
          h3SemForma.innerHTML = `<h3 class="main_cabecalho_titulo_tipo">Não há formas cadastradas no momento.</h3>`;
          elementos.listaFormas.appendChild(h3SemForma);
        }
      } catch (error) {
        alert("Erro ao reinderizar formas; Arquivo ui");
        throw error;
      }
    },

    async adicionarFormasUI(forma) {
      const elementos = ui.formas.elementos();

      const liFormas = document.createElement("li");
      liFormas.classList.add("main_formas_lista_item");
      liFormas.setAttribute("data-id", forma.id);
      liFormas.textContent = `${forma.forma}`;
      liFormas.addEventListener("click", () => {
        elementos.tituloModal.textContent = forma.forma;
        elementos.nomeModal.value = forma.forma;
        elementos.descricaoModal.value = forma.descricao;
        elementos.modalEdit.setAttribute("data-id", forma.id);
        elementos.modalEdit.style.display = "flex";
      });

      elementos.listaFormas.appendChild(liFormas);
    },
  },

  origens: {
    elementos() {
      const listaOrigens = document.getElementById("main-origens");
      const tituloModal = document.getElementById("titulo-modal");
      const nomeModal = document.getElementById("modal-nome");
      const descricaoModal = document.getElementById("modal-descricao");
      const formularioOrigem = document.getElementById("form-origens");
      const modalEdit = document.getElementById("modal-edit");
      const btnApagar = document.getElementById("botao-apagar");
      const btnPublicar = document.getElementById("btn-publicar");
      const inputId = document.getElementById("origem-id");

      return {
        listaOrigens: listaOrigens,
        tituloModal: tituloModal,
        nomeModal: nomeModal,
        descricaoModal: descricaoModal,
        formularioOrigem: formularioOrigem,
        modalEdit: modalEdit,
        btnApagar: btnApagar,
        btnPublicar: btnPublicar,
        inputId: inputId,
      };
    },

    async reinderizarOrigensUI(origens = null) {
      const elementos = ui.origens.elementos();

      elementos.listaOrigens.innerHTML = "";
      elementos.formularioOrigem.reset();
      elementos.btnApagar.classList.add("invisivel");
      elementos.btnPublicar.textContent = "Publicar";
      elementos.inputId.value = "";

      try {
        if (!origens) {
          origens = await api.buscarOrigens();
        }

        if (origens) {
          origens.forEach(ui.origens.adicionarOrigensUI);
        } else {
          const h3SemOrigem = document.createElement("h3");
          h3SemOrigem.innerHTML = `<h3 class="main_cabecalho_titulo_tipo">Não há origens cadastradas no momento.</h3>`;
          elementos.listaOrigens.appendChild(h3SemOrigem);
        }
      } catch (error) {
        alert("Erro ao reinderizar origens; Arquivo ui");
        throw error;
      }
    },

    async adicionarOrigensUI(origem) {
      const elementos = ui.origens.elementos();

      const liOrigens = document.createElement("li");
      liOrigens.classList.add("main_origens_lista_item");
      liOrigens.setAttribute("data-id", origem.id);
      liOrigens.textContent = `${origem.origem}`;
      liOrigens.addEventListener("click", () => {
        elementos.tituloModal.textContent = origem.origem;
        elementos.nomeModal.value = origem.origem;
        elementos.descricaoModal.value = origem.descricao;
        elementos.modalEdit.setAttribute("data-id", origem.id);
        elementos.modalEdit.style.display = "flex";
      });

      elementos.listaOrigens.appendChild(liOrigens);
    },
  },

  nova_criatura: {
    elementos() {
      const selectTipo = document.getElementById("criatura-tipo");
      const selectForma = document.getElementById("criatura-forma");
      const selectOrigem = document.getElementById("criatura-origem");

      return {
        selectTipo: selectTipo,
        selectForma: selectForma,
        selectOrigem: selectOrigem,
      };
    },

    async carregaSelectTipo() {
      const elementos = ui.nova_criatura.elementos();
      elementos.selectTipo.innerHTML = "";
      const opcoes = await api.buscarTipos();

      opcoes.forEach((opcao) => {
        const opcaoTipo = document.createElement("option");
        opcaoTipo.value = opcao.id;
        opcaoTipo.textContent = opcao.tipo;
        elementos.selectTipo.appendChild(opcaoTipo);
      });
    },

    async carregaSelectForma() {
      const elementos = ui.nova_criatura.elementos();
      elementos.selectForma.innerHTML = "";
      const opcoes = await api.buscarFormas();

      opcoes.forEach((opcao) => {
        const opcaoForma = document.createElement("option");
        opcaoForma.value = opcao.id;
        opcaoForma.textContent = opcao.forma;
        elementos.selectForma.appendChild(opcaoForma);
      });
    },

    async carregaSelectOrigem() {
      const elementos = ui.nova_criatura.elementos();
      elementos.selectOrigem.innerHTML = "";
      const opcoes = await api.buscarOrigens();

      opcoes.forEach((opcao) => {
        const opcaoOrigem = document.createElement("option");
        opcaoOrigem.value = opcao.id;
        opcaoOrigem.textContent = opcao.origem;
        elementos.selectOrigem.appendChild(opcaoOrigem);
      });
    },
  },

  album: {
    elementos() {
      const listaAlbum = document.getElementById("lista-album");
      const modalEdit = document.getElementById("modal-edit");
      const imgModal = document.getElementById("img-foto-modal");
      const fonteModal = document.getElementById("fonte-foto-modal");

      return {
        listaAlbum: listaAlbum,
        modalEdit: modalEdit,
        imgModal: imgModal,
        fonteModal: fonteModal,
      };
    },

    async reinderizaAlbumCriaturaUI(album = null) {
      const elementos = ui.album.elementos();

      elementos.listaAlbum.innerHTML = "";

      const id_criatura = localStorage.getItem("idCriatura");

      try {
        if (!album) {
          album = await api.buscarAlbumPorCriatura(id_criatura);
        }

        if (album.length !== 0) {
          album.forEach(ui.album.adicionarFotoAlbum);
        } else {
          const divFoto = document.createElement("div");
          divFoto.classList.add("slide");

          const imgFoto = document.createElement("img");
          imgFoto.classList.add("main_criatura_foto_img_album");
          imgFoto.src = "/assets/album_sem_imagem.jpg";
          imgFoto.alt = "Imagem que indica falta de fotos no Album";

          divFoto.appendChild(imgFoto);
          elementos.listaAlbum.appendChild(divFoto);
        }
      } catch (error) {
        alert("Erro ao reinderizar album; Arquivo ui");
        throw error;
      }
    },

    async adicionarFotoAlbum(foto) {
      const elementos = ui.album.elementos();

      const divFoto = document.createElement("div");
      divFoto.classList.add("slide");

      const imgFoto = document.createElement("img");
      imgFoto.classList.add("main_criatura_foto_img_album");
      imgFoto.src = foto.foto;
      imgFoto.alt = `Imagem do Album da criatura ${foto.nome_criatura}`;
      imgFoto.addEventListener("click", () => {
        elementos.imgModal.src = foto.foto;
        elementos.imgModal.alt = `Imagem do Album da criatura ${foto.nome_criatura}`;
        elementos.fonteModal.value = foto.fonte;
        elementos.modalEdit.setAttribute("data-id", foto.id);
        elementos.modalEdit.style.display = "flex";
      });

      divFoto.appendChild(imgFoto);
      elementos.listaAlbum.appendChild(divFoto);
    },
  },

  lendas: {
    elementos() {
      const listaLendas = document.getElementById("lista-lendas");
      const modalEdit = document.getElementById("modal-edit");
      const tituloModal = document.getElementById("titulo-modal");
      const conteudoModal = document.getElementById("conteudo-modal");
      const fonteModal = document.getElementById("fonte-modal");

      return {
        listaLendas: listaLendas,
        modalEdit: modalEdit,
        tituloModal: tituloModal,
        conteudoModal: conteudoModal,
        fonteModal: fonteModal,
      };
    },

    async reinderizarLendasPorCriatuasUI(lendas = null) {
      const elementos = ui.lendas.elementos();

      elementos.listaLendas.innerHTML = "";

      try {
        if (!lendas) {
          const id_criatura = localStorage.getItem("idCriatura");
          lendas = await api.buscarLendaPorCriatura(id_criatura);
        }

        if (lendas.length !== 0) {
          lendas.forEach(ui.lendas.adicionarLendaUi);
        } else {
          const h3SemLenda = document.createElement("h3");
          h3SemLenda.innerHTML = `<h3 class="main_cabecalho_titulo_tipo">Não há lendas cadastradas no momento.</h3>`;
          elementos.listaLendas.appendChild(h3SemLenda);
        }
      } catch (error) {
        alert("Erro ao reinderizar lendas; Arquivo ui");
        throw error;
      }
    },

    async adicionarLendaUi(lenda) {
      const elementos = ui.lendas.elementos();

      const divLenda = document.createElement("div");
      divLenda.classList.add("main_lendas_lista_item");
      divLenda.textContent = lenda.titulo;
      divLenda.setAttribute("data-id", lenda.id);
      divLenda.addEventListener("click", () => {
        elementos.tituloModal.textContent = lenda.titulo;
        elementos.conteudoModal.value = lenda.estoria;
        elementos.fonteModal.value = lenda.fonte;
        elementos.modalEdit.setAttribute("data-id", lenda.id);
        elementos.modalEdit.style.display = "flex";
      });

      elementos.listaLendas.appendChild(divLenda);
    },
  },

  elementos: {
    elementos() {
      const listaElementos = document.getElementById("lista-elementos");
      const tituloModal = document.getElementById("titulo-modal");
      const imgModal = document.getElementById("img-modal");
      const nomeModal = document.getElementById("modal-nome");
      const tipoModal = document.getElementById("modal-tipo");
      const descricaoModal = document.getElementById("modal-descricao");
      const modalEdit = document.getElementById("modal-edit");

      return {
        listaElementos: listaElementos,
        tituloModal: tituloModal,
        imgModal: imgModal,
        nomeModal: nomeModal,
        tipoModal: tipoModal,
        descricaoModal: descricaoModal,
        modalEdit: modalEdit,
      };
    },

    async reinderizarElementosUI(elementos = null) {
      const elementos_elementos = ui.elementos.elementos();

      elementos_elementos.listaElementos.innerHTML = "";

      try {
        if (!elementos) {
          elementos = await api.buscarElementos();
        }

        if (elementos.length !== 0) {
          elementos.forEach(ui.elementos.adicionarElementoUI);
        } else {
          const h3SemElemento = document.createElement("h3");
          h3SemElemento.innerHTML = `<h3 class="main_cabecalho_titulo">Não há elementos cadastradas no momento.</h3>`;
          elementos_elementos.listaElementos.appendChild(h3SemElemento);
        }
      } catch (error) {
        alert("Erro ao reinderizar Elementos; Arquivo UI");
        throw error;
      }
    },

    async adicionarElementoUI(elemento) {
      const elementos_elementos = ui.elementos.elementos();

      const liElemento = document.createElement("li");
      liElemento.classList.add("main_lista_item_elementares");
      liElemento.addEventListener("click", () => {
        elementos_elementos.tituloModal.textContent = elemento.elemento;
        elementos_elementos.nomeModal.value = elemento.elemento;
        elementos_elementos.tipoModal.value = elemento.tipo;
        ui.elementos.elementos.imgModal.src = elemento.foto_elemento
          ? elemento.foto_elemento
          : "/assets/criatura_sem_imagem.jpg";
        elementos_elementos.imgModal.alt = `Imagem do elemento ${elemento.elemento}`;
        elementos_elementos.modalEdit.setAttribute("data-id", elemento.id);
        elementos_elementos.modalEdit.style.display = "flex";
      });

      const imgElemento = document.createElement("img");
      imgElemento.classList.add("main_lista_item_img_elementares");
      imgElemento.src = elemento.foto_elemento
        ? elemento.foto_elemento
        : "/assets/criatura_sem_imagem.jpg";
      imgElemento.alt = `Imagem do elemento ${elemento.elemento}`;

      const divInfoElemento = document.createElement("div");
      divInfoElemento.classList.add("main_lista_item_textos_elementares");

      const h3Elemento = document.createElement("h3");
      h3Elemento.classList.add("main_lista_item_textos_titulo_elementares");
      h3Elemento.textContent = elemento.elemento;

      const pElemento = document.createElement("p");
      pElemento.classList.add("main_lista_item_textos_paragrafo_elementares");

      const strongP = document.createElement("strong");
      strongP.textContent = elemento.tipo;

      pElemento.appendChild(strongP);

      divInfoElemento.appendChild(h3Elemento);
      divInfoElemento.appendChild(pElemento);

      liElemento.appendChild(imgElemento);
      liElemento.appendChild(divInfoElemento);

      elementos_elementos.listaElementos.appendChild(liElemento);
    },
  },
};

export default ui;
