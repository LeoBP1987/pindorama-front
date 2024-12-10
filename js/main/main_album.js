import api from "../api.js";
import ui from "../ui.js";
import carrega from "../funcoes/carrega_pagina.js";

const titulo = document.getElementById("titulo-album");
const editModalFoto = document.getElementById("modal-edit");
const btnFecharModal = document.getElementById("btn-voltar-modal");
const btnApagar = document.getElementById("btn-apagar-modal");
const btnPublicar = document.getElementById("foto-publicar");
const linkAdicionaFoto = document.getElementById("add-nova-foto");
const imgPrevi = document.getElementById("previ-img");
const nomePrevi = document.querySelector(".main_formulario_foto_nome");
const mainAlbum = document.getElementById("main-album-slides");
const formularioNovaFoto = document.getElementById("main-album-add-foto");
const inputFoto = document.getElementById("carregar-foto-campo");
const inputFonte = document.getElementById("album-fonte");
const id_criatura = localStorage.getItem("idCriatura");
const btnDescartar = document.getElementById("foto-descartar");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {
  const criatura = await api.buscarCriaturaPorId(id_criatura);
  titulo.textContent = `${criatura.criatura}`;
  await reinderizaAlbumMain();

  fechaModalEdit();

  btnApagar.addEventListener("click", async () => {
    const confirmar = confirm("Tem certeza que deseja apagar a foto ?");

    if (confirmar) {
      await api.apagarFotoAlbum(editModalFoto.dataset.id);
      await reinderizaAlbumMain();
      editModalFoto.style.display = "none";
    }
  });

  linkAdicionaFoto.addEventListener("click", ativaModoAdicionarFoto);

  btnPublicar.addEventListener("click", adicionarFoto);

  btnDescartar.addEventListener("click", limparFormularioNovaFoto);

  btnNext.addEventListener("click", () => {
    const slide = document.querySelectorAll(".slide");
    currentIndex = (currentIndex + 1) % slide.length;
    showSlide(currentIndex);
  });

  btnPrev.addEventListener("click", () => {
    const slide = document.querySelectorAll(".slide");
    currentIndex = (currentIndex - 1 + slide.length) % slide.length;
    showSlide(currentIndex);
  });
});

async function reinderizaAlbumMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.album.reinderizaAlbumCriaturaUI();
  } catch (error) {
    alert("Erro ao reinderizar album; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

async function adicionarFoto(evento) {
  evento.preventDefault();

  if (inputFoto.files.length !== 0) {
    const imgFoto = inputFoto.files[0];
    const fonte = inputFonte.value;

    const foto = new FormData();

    foto.append("criatura", id_criatura);
    foto.append("foto", imgFoto);
    foto.append("fonte", fonte);

    await api.adicionaroFotoAlbum(foto);
    await reinderizaAlbumMain();
    limparFormularioNovaFoto();
    ativaModoAdicionarFoto();
    alert("Foto adicionada com Sucesso");
  } else {
    alert(
      "Você precisa selecionar o arquivo da foto que deseja adicionar ao album."
    );
    return;
  }
}

function fechaModalEdit() {
  editModalFoto.addEventListener("click", (evento) => {
    if (evento.target === editModalFoto) {
      editModalFoto.style.display = "none";
    }
  });

  btnFecharModal.addEventListener("click", () => {
    editModalFoto.style.display = "none";
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 27) {
      editModalFoto.style.display = "none";
    }
  });
}

function ativaModoAdicionarFoto() {
  formularioNovaFoto.classList.toggle("invisivel");
  mainAlbum.classList.toggle("invisivel");
  limparFormularioNovaFoto();
}

function limparFormularioNovaFoto() {
  inputFoto.value = "";
  inputFonte.value = "";
  imgPrevi.src = "https://pindorama-s3.s3.sa-east-1.amazonaws.com/static/assets/sem_imagem.jpg";
  imgPrevi.alt = "Imagem que representa a ausência de imagem";
  nomePrevi.textContent = "foto_perfil.png";
}

function showSlide(index) {
  const slides = document.getElementById("lista-album");
  slides.style.transform = `translateX(${-index * 500}px)`;
}
