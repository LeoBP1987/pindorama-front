import ui from "../ui.js";
import api from "../api.js";
import carrega from "../funcoes/carrega_pagina.js";

const formularioOrigem = document.getElementById("form-origens");
const inputOrigemId = document.getElementById("origem-id");
const inputOrigemNome = document.getElementById("origem-nome");
const textOrigemDescricao = document.getElementById("origem-descricao");
const btnPublicar = document.getElementById("btn-publicar");
const btnDescartar = document.getElementById("btn-descartar");
const btnApagar = document.getElementById("botao-apagar");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const editModalOrigem = document.getElementById("modal-edit");
const btnEditModal = document.getElementById("btn-edit-modal");

document.addEventListener("DOMContentLoaded", async () => {
  await reinderizaOrigensMain();

  formularioOrigem.addEventListener("submit", adicionarEeditarOrigem);

  fechaModalEdit();

  btnDescartar.addEventListener("click", () => {
    btnApagar.classList.add("invisivel");
    btnPublicar.textContent = "Publicar";
    inputOrigemId.value = "";
  });

  btnEditModal.addEventListener("click", async () => {
    await preencheOrigemEdit(editModalOrigem.dataset.id);
    editModalOrigem.style.display = "none";
    btnApagar.classList.remove("invisivel");
  });

  btnApagar.addEventListener("click", apagarOrigem);
});

async function reinderizaOrigensMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.origens.reinderizarOrigensUI();
  } catch (error) {
    alert("Erro ao reinderizar origens; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

function fechaModalEdit() {
  editModalOrigem.addEventListener("click", (evento) => {
    if (evento.target === editModalOrigem) {
      editModalOrigem.style.display = "none";
    }
  });

  btnFecharModal.addEventListener("click", () => {
    editModalOrigem.style.display = "none";
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 27) {
      editModalOrigem.style.display = "none";
    }
  });
}

async function adicionarEeditarOrigem(evento) {
  evento.preventDefault();

  const origemId = inputOrigemId.value;
  const origemNome = inputOrigemNome.value;
  const origemDescricao = textOrigemDescricao.value;

  if (origemNome.trim() === "" || origemDescricao.trim() === "") {
    alert("O formulário de Origem não pode conter valores em branco");
    return;
  }

  if (origemId) {
    try {
      await api.editarOrigem({
        id: origemId,
        origem: origemNome,
        descricao: origemDescricao,
      });
      await reinderizaOrigensMain();
    } catch (error) {
      alert("Erro ao editar origem; Arquivo Main");
      throw error;
    }
  } else {
    try {
      await api.adicionarOrigem({
        origem: origemNome,
        descricao: origemDescricao,
      });
      await reinderizaOrigensMain();
    } catch (error) {
      alert("Erro ao adicionar de origem; Arquivo Main");
      throw error;
    }
  }
}

async function preencheOrigemEdit(id) {
  const origem = await api.buscarOrigemPorId(id);
  inputOrigemId.value = origem.id;
  inputOrigemNome.value = origem.origem;
  textOrigemDescricao.value = origem.descricao;

  btnPublicar.textContent = "Editar";
}

async function apagarOrigem(evento) {
  evento.preventDefault();

  const confirmacao = confirm(
    `Tem certeza que deseja apagar a origem ${inputOrigemNome.value} ?`
  );

  if (confirmacao) {
    try {
      const origem = inputOrigemId.value;

      await api.apagarOrigem(origem);
      await reinderizaOrigensMain();
    } catch (error) {
      alert("Erro ao requisitar a deleção da origem; Arquivo Main.");
      throw error;
    }
  } else {
    return;
  }
}
