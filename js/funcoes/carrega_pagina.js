const carregando = document.getElementById("carregando");
const barra = document.getElementById("carregando-barra");
let estaCarregando;

const carrega = {
  async carregandoBarra() {
    carregando.style.display = "flex";
    barra.style.width = "0%";

    estaCarregando = true;

    let i = 0;
    while (estaCarregando) {
      barra.style.width = `${i}%`;
      await new Promise((resolve) => setTimeout(resolve, 15));
      i++;
      if (i > 100) {
        i = 0;
      }
    }
  },

  finalizaCarregamento() {
    barra.style.width = "0%";
    carregando.style.display = "none";
    estaCarregando = false;
  },
};

export default carrega;
