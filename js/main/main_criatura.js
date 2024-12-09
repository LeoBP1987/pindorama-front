import ui from "../ui.js";
import carrega from "../funcoes/carrega_pagina.js";

const botaoEditar = document.getElementById("botao-criatura-editar");

document.addEventListener("DOMContentLoaded", async () => {
  await reinderizaCriaturaPorIdMain();

  botaoEditar.addEventListener("click", () => {
    localStorage.setItem("acao", "edita");
  });
});

async function reinderizaCriaturaPorIdMain() {
  const barraPromise = carrega.carregandoBarra();

  try {
    const criatura_id = localStorage.getItem("idCriatura");
    await ui.criatura.reinderizarCriaturaPorIdUI(criatura_id);
  } catch (error) {
    alert("Erro ao reinderizar criatura por id; Arquivo main_index");
    throw error;
  } finally {
    carrega.finalizaCarregamento();
  }

  await barraPromise;
}
