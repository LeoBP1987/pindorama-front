import api from "../api.js";
import ui from "../ui.js";
import carrega from "../funcoes/carrega_pagina.js";

const formularioTipo = document.getElementById("form-tipo");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const editModalTipo = document.getElementById("modal-edit");
const btnEditModal = document.getElementById("btn-edit-modal");
const inputTipoNome = document.getElementById("tipo-nome");
const textTipoDescricao = document.getElementById("tipo-descricao");
const btnPublicar = document.getElementById("btn-publicar");
const btnApagar = document.getElementById("botao-apagar");
const btnDescartar = document.getElementById("btn-descartar");
const inputTipoId = document.getElementById("tipo-id");

document.addEventListener("DOMContentLoaded", async () => {
  await reinderizaTiposMain();

  formularioTipo.addEventListener("submit", adicionarEeditarTipo);

  fechaModalEdit();

  btnDescartar.addEventListener("click", () => {
    btnApagar.classList.add("invisivel");
    btnPublicar.textContent = "Publicar";
    inputTipoId.value = "";
  });

  btnEditModal.addEventListener("click", () => {
    preencheTipoEdit(editModalTipo.dataset.id);
    editModalTipo.style.display = "none";
    btnApagar.classList.remove("invisivel");
  });

  btnApagar.addEventListener("click", apagarTipo);
});

async function reinderizaTiposMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.tipos.reinderizarTiposUi();
  } catch (error) {
    alert("Erro ao reinderizar Tipos; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

async function adicionarEeditarTipo(evento) {
  evento.preventDefault();

  const tipoId = inputTipoId.value;
  const tipoNome = inputTipoNome.value;
  const tipoDescricao = textTipoDescricao.value;

  if (tipoNome.trim() === "" || tipoDescricao.trim() === "") {
    alert("O formulário de Tipo não pode conter valores em branco");
    return;
  }

  if (tipoId) {
    try {
      await api.editarTipo({
        id: tipoId,
        tipo: tipoNome,
        descricao: tipoDescricao,
      });
      await reinderizaTiposMain();
    } catch (error) {
      alert("Erro ao editar tipo; Arquivo Main");
      throw error;
    }
  } else {
    try {
      await api.adicionarTipo({ tipo: tipoNome, descricao: tipoDescricao });
      await reinderizaTiposMain();
    } catch (error) {
      alert("Erro ao adicionar de tipo; Arquivo Main");
      throw error;
    }
  }
}

function fechaModalEdit() {
  editModalTipo.addEventListener("click", (evento) => {
    if (evento.target === editModalTipo) {
      editModalTipo.style.display = "none";
    }
  });

  btnFecharModal.addEventListener("click", () => {
    editModalTipo.style.display = "none";
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 27) {
      editModalTipo.style.display = "none";
    }
  });
}

async function preencheTipoEdit(id) {
  const tipo = await api.buscarTipoPorId(id);
  inputTipoId.value = tipo.id;
  inputTipoNome.value = tipo.tipo;
  textTipoDescricao.value = tipo.descricao;

  btnPublicar.textContent = "Editar";
}

async function apagarTipo(evento) {
  evento.preventDefault();

  const confirmacao = confirm(
    `Tem certeza que deseja apagar o tipo ${inputTipoNome.value} ?`
  );

  if (confirmacao) {
    try {
      const tipo = inputTipoId.value;

      await api.apagarTipo(tipo);
      await reinderizaTiposMain();
    } catch (error) {
      alert("Erro ao requisitar a deleção do tipo; Arquivo Main.");
      throw error;
    }
  } else {
    return;
  }
}
