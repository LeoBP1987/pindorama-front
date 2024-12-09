import api from "../api.js";
import ui from "../ui.js";
import carrega from "../funcoes/carrega_pagina.js";

const listaLendas = document.getElementById("lista-lendas");
const divformularioLendas = document.getElementById("add-lendas");
const formularioLendas = document.getElementById("form-lendas");
const linkAdicionarLenda = document.getElementById("adicionar-lenda");
const id_criatura = localStorage.getItem("idCriatura");
const titulo = document.getElementById("titulo-lendas");
const inputLendaId = document.getElementById("lenda-id");
const inputLendaNome = document.getElementById("lenda-nome");
const textLendaDescricao = document.getElementById("lenda-descricao");
const inputLendaFonte = document.getElementById("fonte-nome");
const btnApagar = document.getElementById("botao-apagar");
const btnPublicar = document.getElementById("btn-publicar");
const btnDescartar = document.getElementById("btn-descartar");

const editModalLenda = document.getElementById("modal-edit");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnEditModal = document.getElementById("btn-editar-modal");

document.addEventListener("DOMContentLoaded", async () => {
  const criatura = await api.buscarCriaturaPorId(id_criatura);
  titulo.textContent = `${criatura.criatura}`;
  await reinderizaLendasMain();

  fechaModalEdit();

  linkAdicionarLenda.addEventListener("click", alterarParaAdicionarLenda);

  formularioLendas.addEventListener("submit", adicionarEeditarLenda);

  btnEditModal.addEventListener("click", preparaEdicao);

  btnDescartar.addEventListener("click", alterarParaAdicionarLenda);

  btnApagar.addEventListener("click", apagarLendaMain);
});

async function reinderizaLendasMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.lendas.reinderizarLendasPorCriatuasUI();
  } catch (error) {
    alert("Erro ao reinderizar Lendas; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

function fechaModalEdit() {
  editModalLenda.addEventListener("click", (evento) => {
    if (evento.target === editModalLenda) {
      editModalLenda.style.display = "none";
    }
  });

  btnFecharModal.addEventListener("click", () => {
    editModalLenda.style.display = "none";
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 27) {
      editModalLenda.style.display = "none";
    }
  });
}

function alterarParaAdicionarLenda() {
  limparFormLendas();
  listaLendas.classList.toggle("invisivel");
  divformularioLendas.classList.toggle("invisivel");
}

async function adicionarEeditarLenda(evento) {
  evento.preventDefault();

  const lendaId = inputLendaId.value;
  const lendaNome = inputLendaNome.value;
  const lendaDescricao = textLendaDescricao.value;
  const lendaFonte = inputLendaFonte.value;

  if (
    lendaNome.trim() === "" ||
    lendaDescricao.trim() === "" ||
    lendaFonte.trim() === ""
  ) {
    alert("O formulário de Lenda não pode conter valores em branco");
    return;
  }

  if (lendaId) {
    try {
      await api.editarLenda({
        id: lendaId,
        criatura: id_criatura,
        titulo: lendaNome,
        estoria: lendaDescricao,
        fonte: lendaFonte,
      });
      await reinderizaLendasMain();
    } catch (error) {
      alert("Erro ao editar lenda; Arquivo Main");
      throw error;
    }
  } else {
    try {
      await api.adicionarLenda({
        criatura: id_criatura,
        titulo: lendaNome,
        estoria: lendaDescricao,
        fonte: lendaFonte,
      });
      await reinderizaLendasMain();
    } catch (error) {
      alert("Erro ao adicionar de lenda; Arquivo Main");
      throw error;
    }
  }

  alterarParaAdicionarLenda();
}

async function preparaEdicao() {
  const lenda = await api.buscarLendaPorId(editModalLenda.dataset.id);

  inputLendaId.value = lenda.id;
  inputLendaNome.value = lenda.titulo;
  textLendaDescricao.value = lenda.estoria;
  inputLendaFonte.value = lenda.fonte;

  btnPublicar.textContent = "Editar";
  btnApagar.classList.remove("invisivel");

  editModalLenda.style.display = "none";
  listaLendas.classList.add("invisivel");
  divformularioLendas.classList.remove("invisivel");
}

function limparFormLendas() {
  formularioLendas.reset();
  btnPublicar.textContent = "Publicar";
  btnApagar.classList.add("invisivel");
}

async function apagarLendaMain() {
  const confirmar = confirm("Tem certeza que deseja apagar a lenda ?");

  if (confirmar) {
    await api.apagarLenda(inputLendaId.value);
    await reinderizaLendasMain();
    alert("Lenda apagada com sucesso!");
    alterarParaAdicionarLenda();
  } else {
    return;
  }
}
