import api from "../api.js";
import ui from "../ui.js";
import carrega from "../funcoes/carrega_pagina.js";

const imgPesquisa = document.getElementById("main-pesquisa");
const botaoAdicionar = document.getElementById("adicionar-criatura");
const selectPesquisa = document.getElementById("pesquisa");
const selectConteudoPesquisa = document.getElementById("pesquisa-conteudo");
const inputEtiquetaPesquisa = document.getElementById("pesquisa-etiqueta");
const linkPesquisa = document.getElementById("fazer-pesquisa");
const modalSobre = document.getElementById("modal-sobre");

document.addEventListener("DOMContentLoaded", async () => {
  await reinderizaCriaturasMain();

  const apresenta = localStorage.getItem("apresenta");

  if (!apresenta) {
    chamaApresentacao();
  }

  await alteraPesquisa();

  botaoAdicionar.addEventListener("click", () => {
    localStorage.setItem("acao", "adiciona");
  });

  selectPesquisa.addEventListener("change", async () => {
    const escolha = selectPesquisa.value;
    await preparaConteudoPesquisa(escolha);
  });

  linkPesquisa.addEventListener("click", async () => {
    const barraPromise = carrega.carregandoBarra();

    try {
      await pesquisarCriaturas();
    } catch (error) {
      alert("Erro ao pesquisar criaturas; Arquivo main_index");
      throw error;
    } finally {
      carrega.finalizaCarregamento();
    }

    await barraPromise;
  });
});

async function reinderizaCriaturasMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.index.reinderizarCriaturasUI();
  } catch (error) {
    alert("Erro ao reinderizar criaturas; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

async function alteraPesquisa() {
  imgPesquisa.addEventListener("click", async () => {
    const criaturaPesquisa = document.getElementById("criaturas-pesquisa");

    criaturaPesquisa.classList.toggle("invisivel");
    selectConteudoPesquisa.classList.remove("invisivel");
    inputEtiquetaPesquisa.classList.add("invisivel");
    const tipos = await api.buscarTipos();
    tipos.forEach((tipo) => {
      let opcao = document.createElement("option");
      opcao.value = tipo.id;
      opcao.textContent = tipo.tipo;

      selectConteudoPesquisa.appendChild(opcao);
    });
  });
}

async function preparaConteudoPesquisa(escolha) {
  selectConteudoPesquisa.classList.remove("invisivel");
  inputEtiquetaPesquisa.classList.add("invisivel");
  selectConteudoPesquisa.innerHTML = "";

  switch (escolha) {
    case "tipo": {
      const tipos = await api.buscarTipos();
      tipos.forEach((tipo) => {
        let opcao = document.createElement("option");
        opcao.value = tipo.id;
        opcao.textContent = tipo.tipo;

        selectConteudoPesquisa.appendChild(opcao);
      });
      break;
    }
    case "forma": {
      const formas = await api.buscarFormas();
      formas.forEach((forma) => {
        let opcao = document.createElement("option");
        opcao.value = forma.id;
        opcao.textContent = forma.forma;

        selectConteudoPesquisa.appendChild(opcao);
      });
      break;
    }
    case "origem": {
      const origens = await api.buscarOrigens();
      origens.forEach((origem) => {
        let opcao = document.createElement("option");
        opcao.value = origem.id;
        opcao.textContent = origem.origem;

        selectConteudoPesquisa.appendChild(opcao);
      });
      break;
    }
    case "etiqueta": {
      selectConteudoPesquisa.classList.add("invisivel");
      inputEtiquetaPesquisa.classList.remove("invisivel");
      break;
    }
    default: {
      alert("Escolha uma opção valida!");
      break;
    }
  }
}

async function pesquisarCriaturas() {
  const tipo_pesquisa = selectPesquisa.value;
  const id = selectConteudoPesquisa.value;
  const etiqueta = inputEtiquetaPesquisa.value.toLowerCase();

  if (tipo_pesquisa === "etiqueta") {
    await ui.index.pesquisaCriatura(tipo_pesquisa, etiqueta);
  } else {
    await ui.index.pesquisaCriatura(tipo_pesquisa, id);
  }
}

function chamaApresentacao() {
  const modalSobre = document.getElementById("modal-sobre");

  modalSobre.style.display = "flex";

  localStorage.setItem("apresenta", true);

  fechaModalSobre();
}

function fechaModalSobre() {
  modalSobre.addEventListener("click", (evento) => {
    if (evento.target === modalSobre) {
      modalSobre.style.display = "none";
    }
  });

  document
    .getElementById("botao-fechar-modal-sobre")
    .addEventListener("click", () => {
      modalSobre.style.display = "none";
    });

  document.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 27) {
      modalSobre.style.display = "none";
    }
  });
}
