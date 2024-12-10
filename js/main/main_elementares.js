import api from "../api.js";
import ui from "../ui.js";
import carrega from "../funcoes/carrega_pagina.js";

const linkNovoElemento = document.getElementById("add_novo_elemento");
const listaElementos = document.getElementById("lista-elementos");
const divFormularioElementos = document.getElementById(
  "main-formulario-elementos"
);
const formularioElementos = document.getElementById("form-elementos");
const imgFormElementos = document.getElementById("previ-img");
const prevNome = document.querySelector(".main_formulario_foto_nome");
const btnDescartar = document.getElementById("btn-descartar");
const btnPublicar = document.getElementById("btn-publicar");
const btnApagar = document.getElementById("botao-apagar");
const inputFoto = document.getElementById("carregar-foto-campo");
const inputId = document.getElementById("elemento-id");
const inputNome = document.getElementById("elemento-nome");
const inputTipo = document.getElementById("elemento-tipo");
const textDescricao = document.getElementById("elemento-descricao");

const editModalElemento = document.getElementById("modal-edit");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnEditModal = document.getElementById("btn-editar-modal");

document.addEventListener("DOMContentLoaded", async () => {
  await reinderizaElementaresMain();

  linkNovoElemento.addEventListener("click", alterarParaNovoElemento);

  formularioElementos.addEventListener("submit", adicionarEeditarElemento);

  btnDescartar.addEventListener("click", alterarParaNovoElemento);

  fechaModalEdit();

  btnEditModal.addEventListener("click", () => {
    preencherEdicao();
  });

  btnApagar.addEventListener("click", () => {
    apagarElementoMain();
  });
});

async function reinderizaElementaresMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.elementos.reinderizarElementosUI();
  } catch (error) {
    alert("Erro ao reinderizar Origens; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

function alterarParaNovoElemento() {
  limpaFormulario();
  listaElementos.classList.toggle("invisivel");
  divFormularioElementos.classList.toggle("invisivel");
}

function limpaFormulario() {
  formularioElementos.reset();
  imgFormElementos.src = "https://pindorama-s3.s3.sa-east-1.amazonaws.com/static/assets/sem_imagem.jpg";
  imgFormElementos.alt = "Imagem que representa a ausência de imagem";
  prevNome.textContent = "foto_perfil.png";

  btnPublicar.textContent = "Publicar";
  btnApagar.classList.add("invisivel");
}

async function adicionarEeditarElemento(evento) {
  evento.preventDefault();

  const foto = inputFoto.files[0];
  const id = inputId.value;
  const nome = inputNome.value;
  const tipo = inputTipo.value;
  const descricao = textDescricao.value;

  const elemento = new FormData();

  id ? elemento.append("id", id) : null;
  elemento.append("elemento", nome);
  elemento.append("tipo", tipo);
  elemento.append("descricao", descricao);
  foto ? elemento.append("foto_elemento", foto) : null;

  if (id) {
    await api.editarElemento(elemento);
  } else {
    await api.adicionarElemento(elemento);
  }

  await reinderizaElementaresMain();
  alterarParaNovoElemento();
}

function fechaModalEdit() {
  editModalElemento.addEventListener("click", (evento) => {
    if (evento.target === editModalElemento) {
      editModalElemento.style.display = "none";
    }
  });

  btnFecharModal.addEventListener("click", () => {
    editModalElemento.style.display = "none";
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 27) {
      editModalElemento.style.display = "none";
    }
  });
}

async function preencherEdicao() {
  const elemento = await api.buscarElementoPorId(editModalElemento.dataset.id);

  inputId.value = elemento.id;
  imgFormElementos.src = elemento.foto_elemento
    ? elemento.foto_elemento
    : "https://pindorama-s3.s3.sa-east-1.amazonaws.com/static/assets/sem_imagem.jpg.jpg";
  imgFormElementos.alt = `Imagem do elemento ${elemento.elemento}`;
  prevNome.textContent = elemento.foto_elemento.name;
  inputNome.value = elemento.elemento;
  inputTipo.value = elemento.tipo;
  textDescricao.value = elemento.descricao;

  btnPublicar.textContent = "Editar";
  btnApagar.classList.remove("invisivel");

  listaElementos.classList.toggle("invisivel");
  divFormularioElementos.classList.toggle("invisivel");
  editModalElemento.style.display = "none";
}

async function apagarElementoMain() {
  const confirmar = confirm("Tem certeza que deseja apagar a elemento ?");

  if (confirmar) {
    await api.apagarElemento(inputId.value);
    await reinderizaElementaresMain();
    alert("Elemento apagado com sucesso!");
  } else {
    return;
  }
}
