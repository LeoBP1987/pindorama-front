import api from "../api.js";
import ui from "../ui.js";
import carrega from "../funcoes/carrega_pagina.js";

const formularioCriatura = document.getElementById("form-nova-criatura");
const inputId = document.getElementById("criatura-id");
const nomeCriatura = document.getElementById("criatura-nome");
const descricaoCriatura = document.getElementById("criatura-descricao");
const inputFoto = document.getElementById("carregar-foto-campo");
const selectTipo = document.getElementById("criatura-tipo");
const selectForma = document.getElementById("criatura-forma");
const selectOrigem = document.getElementById("criatura-origem");
const selectModo = document.getElementById("criatura-modo");
const botaoPublicar = document.getElementById("botao-publicar");
const botaoDescartar = document.getElementById("botao-descartar");
const fotoImg = document.getElementById("previ-img");
const fotoNome = document.querySelector(".main_formulario_foto_nome");
const botaoApagar = document.getElementById("botao-apagar");
const titulo = document.getElementById("titulo-add-criatura");
const inputEtiqueta = document.getElementById("input-add-etiqueta");
const listaEtiquetas = document.getElementById("lista-etiquetas");
const criatura_id = localStorage.getItem("idCriatura");

document.addEventListener("DOMContentLoaded", async () => {
  await carregaPagina();

  formularioCriatura.addEventListener("submit", adicionarEeditarCriatura);

  inputEtiqueta.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
      adicionarEtiqueta(evento);
    }
  });

  botaoApagar.addEventListener("click", async () => {
    const confirma = confirm("Tem certeza que deseja apagar a criatura?");

    if (confirma) {
      await api.apagarCriatura(criatura_id);
      window.location.href = "http://127.0.0.1:5500/index.html";
    } else {
      return;
    }
  });
});

async function carregaPagina() {
  const barraPromise = carrega.carregandoBarra();

  try {
    await ui.nova_criatura.carregaSelectTipo();
    await ui.nova_criatura.carregaSelectForma();
    await ui.nova_criatura.carregaSelectOrigem();

    const acao = localStorage.getItem("acao");

    if (acao === "edita") {
      preparaEdicao(criatura_id);
    } else {
      preparaAdicao();
    }
  } catch (error) {
    alert(
      "Erro ao carregar página de Edição/Adição de criaturas; Arquivo main_index"
    );
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}

async function adicionarEeditarCriatura(evento) {
  evento.preventDefault();

  const foto = inputFoto.files[0];
  const id = inputId.value;
  const nome = nomeCriatura.value;
  const tipo = selectTipo.value;
  const forma = selectForma.value;
  const origem = selectOrigem.value;
  const modo = selectModo.value;
  const descricao = descricaoCriatura.value;

  const criatura = new FormData();

  id ? criatura.append("id", id) : null;
  criatura.append("criatura", nome);
  criatura.append("tipo", tipo);
  criatura.append("forma", forma);
  criatura.append("origem", origem);
  foto ? criatura.append("foto_perfil", foto) : null;
  criatura.append("descricao", descricao);
  criatura.append("modo", modo);

  let criatura_criada;

  if (id) {
    criatura_criada = await api.editarCriatura(criatura);
  } else {
    criatura_criada = await api.adicionarCriatura(criatura);
  }

  const itensEtiquetas = document.querySelectorAll(".item_lista_etiquetas");

  if (criatura_criada) {
    for (const item of itensEtiquetas) {
      if (item.dataset.context === "inativo") {
        await api.adicionarEtiqueta({
          criatura: criatura_criada.id,
          etiqueta: item.textContent.toLowerCase(),
        });
        item.setAttribute("data-context", "ativo");
      }
    }
  } else {
    alert("Erro ao criar criatura; Arquivo Main");
  }

  window.location.href = "http://127.0.0.1:5500/index.html";
}

function valida_etiqueta(etiqueta) {
  const regex = /^[A-Za-zÀ-ÿ]+$/;
  return !regex.test(etiqueta);
}

async function imprimiEtiqueta(etiqueta, estado) {
  const etiquetaTexto = estado === "ativo" ? etiqueta.etiqueta : etiqueta;

  try {
    const etiquetaNova = document.createElement("li");
    etiquetaNova.textContent = etiquetaTexto;
    etiquetaNova.classList.add("item_lista_etiquetas");
    etiquetaNova.setAttribute("data-context", estado);

    if (estado === "ativo") {
      etiquetaNova.setAttribute("data-id", etiqueta.id);
    }

    const imgFechar = document.createElement("img");
    imgFechar.src = "/assets/fechar.svg";
    imgFechar.classList.add("lista_etiquetas_fechar");
    imgFechar.addEventListener("click", async () => {
      if (etiquetaNova.dataset.context === "ativo") {
        await api.apagarEtiqueta(etiquetaNova.dataset.id);
        etiquetaNova.remove();
      } else {
        etiquetaNova.remove();
      }
    });

    etiquetaNova.appendChild(imgFechar);
    listaEtiquetas.appendChild(etiquetaNova);
    inputEtiqueta.value = "";
  } catch (error) {
    console.error("Erro ao imprimir etiqueta");
    throw error;
  }
}

async function adicionarEtiqueta(evento) {
  evento.preventDefault();
  const etiquetaTexto = inputEtiqueta.value;
  const validaEtiquetaTexto = valida_etiqueta(etiquetaTexto);

  if (!validaEtiquetaTexto) {
    await imprimiEtiqueta(etiquetaTexto, "inativo");
  } else {
    alert("A etiqueta não pode conter espaços e/ou caracteres especiais.");
    return;
  }
}

async function preparaEdicao(criatura_id) {
  const criatura = await api.buscarCriaturaPorId(criatura_id);

  titulo.textContent = "Editar Criatura";
  botaoPublicar.textContent = "Editar";
  botaoApagar.classList.remove("invisivel");
  botaoDescartar.textContent = "Fechar";

  botaoDescartar.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/index.html";
  });

  inputId.value = criatura.id;
  nomeCriatura.value = criatura.criatura;
  descricaoCriatura.value = criatura.descricao;
  fotoImg.src = criatura.foto_perfil
    ? criatura.foto_perfil
    : "/assets/criatura_sem_imagem.jpg";
  fotoImg.alt = `Imagem da criatura ${criatura.criatura}`;
  selectTipo.value = criatura.tipo;
  selectForma.value = criatura.forma;
  selectOrigem.value = criatura.origem;
  selectModo.value = criatura.modo;

  const etiquetas = await api.buscarEtiquetasPorCriatura(criatura.id);
  etiquetas.forEach((etiqueta) => imprimiEtiqueta(etiqueta, "ativo"));
}

function preparaAdicao() {
  listaEtiquetas.innerHTML = "";
  titulo.textContent = "Nova Criatura";
  botaoPublicar.textContent = "Publicar";
  botaoApagar.classList.add("invisivel");
  formularioCriatura.reset();
  fotoImg.src = "/assets/sem_imagem.jpg";
  fotoImg.alt = "Imagem Padrão para adição de criatura";
  fotoNome.textContent = "foto_perfil.png";

  botaoDescartar.addEventListener("click", () => {
    listaEtiquetas.innerHTML = "";
    fotoImg.src = "/assets/sem_imagem.jpg";
    fotoImg.alt = "Imagem Padrão para adição de criatura";
    fotoNome.textContent = "foto_perfil.png";
  });
}
