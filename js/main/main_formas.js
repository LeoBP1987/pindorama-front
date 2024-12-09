import ui from "../ui.js";
import api from "../api.js";
import carrega from "../funcoes/carrega_pagina.js";

const formularioForma = document.getElementById("form-formas");
const inputFormaId = document.getElementById("forma-id");
const inputFormaNome = document.getElementById("forma-nome");
const textFormaDescricao = document.getElementById("forma-descricao");
const btnPublicar = document.getElementById("btn-publicar");
const btnDescartar = document.getElementById("btn-descartar");
const btnApagar = document.getElementById("botao-apagar");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const editModalForma = document.getElementById("modal-edit");
const btnEditModal = document.getElementById("btn-edit-modal");

document.addEventListener("DOMContentLoaded", async () => {
  await reinderizaFormasMain();

  formularioForma.addEventListener("submit", adicionarEeditarForma);

  fechaModalEdit();

  btnDescartar.addEventListener("click", () => {
    btnApagar.classList.add("invisivel");
    btnPublicar.textContent = "Publicar";
    inputFormaId.value = "";
  });

  btnEditModal.addEventListener("click", async () => {
    await preencheFormaEdit(editModalForma.dataset.id);
    editModalForma.style.display = "none";
    btnApagar.classList.remove("invisivel");
  });

  btnApagar.addEventListener("click", apagarForma);
});

async function reinderizaFormasMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.formas.reinderizarFormasUi();
  } catch (error) {
    alert("Erro ao reinderizar formas; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

function fechaModalEdit() {
  editModalForma.addEventListener("click", (evento) => {
    if (evento.target === editModalForma) {
      editModalForma.style.display = "none";
    }
  });

  btnFecharModal.addEventListener("click", () => {
    editModalForma.style.display = "none";
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 27) {
      editModalForma.style.display = "none";
    }
  });
}

async function adicionarEeditarForma(evento) {
  evento.preventDefault();

  const formaId = inputFormaId.value;
  const formaNome = inputFormaNome.value;
  const formaDescricao = textFormaDescricao.value;

  if (formaNome.trim() === "" || formaDescricao.trim() === "") {
    alert("O formulário de Forma não pode conter valores em branco");
    return;
  }

  if (formaId) {
    try {
      await api.editarForma({
        id: formaId,
        forma: formaNome,
        descricao: formaDescricao,
      });
      await reinderizaFormasMain();
    } catch (error) {
      alert("Erro ao editar forma; Arquivo Main");
      throw error;
    }
  } else {
    try {
      await api.adicionarForma({ forma: formaNome, descricao: formaDescricao });
      await reinderizaFormasMain();
    } catch (error) {
      alert("Erro ao adicionar de forma; Arquivo Main");
      throw error;
    }
  }
}

async function preencheFormaEdit(id) {
  const forma = await api.buscarFormaPorId(id);
  inputFormaId.value = forma.id;
  inputFormaNome.value = forma.forma;
  textFormaDescricao.value = forma.descricao;

  btnPublicar.textContent = "Editar";
}

async function apagarForma(evento) {
  evento.preventDefault();

  const confirmacao = confirm(
    `Tem certeza que deseja apagar a forma ${inputFormaNome.value} ?`
  );

  if (confirmacao) {
    try {
      const forma = inputFormaId.value;

      await api.apagarForma(forma);
      await reinderizaFormasMain();
    } catch (error) {
      alert("Erro ao requisitar a deleção da forma; Arquivo Main.");
      throw error;
    }
  } else {
    return;
  }
}
