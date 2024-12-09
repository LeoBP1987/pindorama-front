const fotoBotao = document.getElementById("foto-botao");
const fotoInput = document.getElementById("carregar-foto-campo");

fotoBotao.addEventListener("click", () => {
  fotoInput.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = () => {
      reject(`Erro ao ler o arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imgPrevi = document.getElementById("previ-img");
const imgNome = document.querySelector(".main_formulario_foto_nome");

fotoInput.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imgPrevi.src = conteudoDoArquivo.url;
      imgNome.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura do arquivo!");
      throw erro;
    }
  }
});
