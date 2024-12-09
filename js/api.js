const URLBASE = "https://pindorama-api-aeddc593eeca.herokuapp.com";

const api = {
  async buscarCriaturas() {
    try {
      const criaturas = await fetch(`${URLBASE}/criaturas/`);
      return await criaturas.json();
    } catch (error) {
      alert("Erro na requisição GET para criaturas; Arquivo api");
      throw error;
    }
  },

  async buscarCriaturaPorId(id) {
    try {
      const criatura = await fetch(`${URLBASE}/criaturas/${id}/`);
      return await criatura.json();
    } catch (error) {
      alert("Erro na requisição GET para uma Criatura; Arquivo api");
      throw error;
    }
  },

  async buscaCriaturaPorTipo(id_tipo) {
    try {
      const criaturas = await fetch(`${URLBASE}/criaturas/${id_tipo}/tipo/`);

      return await criaturas.json();
    } catch (error) {
      alert("Erro na requisição GET de criaturas por Tipo; Arquivo api");
      throw error;
    }
  },

  async buscaCriaturaPorForma(id_forma) {
    try {
      const criaturas = await fetch(`${URLBASE}/criaturas/${id_forma}/forma/`);

      return await criaturas.json();
    } catch (error) {
      alert("Erro na requisição GET de criaturas por Forma; Arquivo api");
      throw error;
    }
  },

  async buscaCriaturaPorOrigem(id_origem) {
    try {
      const criaturas = await fetch(
        `${URLBASE}/criaturas/${id_origem}/origem/`
      );

      return await criaturas.json();
    } catch (error) {
      alert("Erro na requisição GET de criaturas por Origem; Arquivo api");
      throw error;
    }
  },

  async buscaCriaturaPorEtiqueta(etiqueta) {
    try {
      const criaturas = await fetch(
        `${URLBASE}/etiquetas/${etiqueta}/criaturas/`
      );

      return await criaturas.json();
    } catch (error) {
      alert("Erro na requisição GET de criaturas por Etiqueta; Arquivo api");
      throw error;
    }
  },

  async adicionarCriatura(criatura) {
    try {
      const response = await fetch(`${URLBASE}/criaturas/`, {
        method: "POST",
        body: criatura,
      });

      if (response.ok) {
        return await response.json();
      } else {
        return false;
      }
    } catch (error) {
      alert("Erro na requisição POST para criaturas; Arquivo api");
      throw error;
    }
  },

  async editarCriatura(criatura) {
    try {
      const response = await fetch(
        `${URLBASE}/criaturas/${criatura.get("id")}/`,
        {
          method: "PUT",
          body: criatura,
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        return false;
      }
    } catch (error) {
      alert("Erro na requisição PUT para criaturas; Arquivo api");
      throw error;
    }
  },

  async apagarCriatura(criatura) {
    try {
      await fetch(`${URLBASE}/criaturas/${criatura}/`, {
        method: "DELETE",
      });

      return alert("Criatura deletada com Sucesso.");
    } catch (error) {
      alert("Erro na requisição DELETE para criaturas; Arquivo api");
      throw error;
    }
  },

  async buscarTipos() {
    try {
      const tipos = await fetch(`${URLBASE}/tipos/`);
      return await tipos.json();
    } catch (error) {
      alert("Erro na requisição GET para tipos; Arquivo api");
      throw error;
    }
  },

  async buscarTipoPorId(id) {
    try {
      const tipos = await fetch(`${URLBASE}/tipos/${id}/`);
      return await tipos.json();
    } catch (error) {
      alert("Erro na requisição GET para um Tipo; Arquivo api");
      throw error;
    }
  },

  async adicionarTipo(tipo) {
    try {
      const response = await fetch(`${URLBASE}/tipos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tipo),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição POST para tipo; Arquivo api");
      throw error;
    }
  },

  async editarTipo(tipo) {
    try {
      const response = await fetch(`${URLBASE}/tipos/${tipo.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tipo),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição PUT para tipo; Arquivo api");
      throw error;
    }
  },

  async apagarTipo(tipo) {
    try {
      await fetch(`${URLBASE}/tipos/${tipo}/`, {
        method: "DELETE",
      });

      return alert("Tipo apagado com sucesso.");
    } catch (error) {
      alert("Erro na requisição DELETE para tipo; Arquivo api");
      throw error;
    }
  },

  async buscarFormas() {
    try {
      const formas = await fetch(`${URLBASE}/formas/`);
      return await formas.json();
    } catch (error) {
      alert("Erro na requisição GET para formas; Arquivo api");
      throw error;
    }
  },

  async buscarFormaPorId(id) {
    try {
      const forma = await fetch(`${URLBASE}/formas/${id}/`);
      return await forma.json();
    } catch (error) {
      console.error(
        "Erro na requisição GET para uma forma; Arquivo api:",
        error
      );
      alert("Erro na requisição GET para uma forma; Arquivo api");
      throw error;
    }
  },

  async adicionarForma(forma) {
    try {
      const response = await fetch(`${URLBASE}/formas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forma),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição POST de formas; Arquivo api");
      throw error;
    }
  },

  async editarForma(forma) {
    try {
      const response = await fetch(`${URLBASE}/formas/${forma.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forma),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição PUT para formas; Arquivo api");
      throw error;
    }
  },

  async apagarForma(forma) {
    try {
      await fetch(`${URLBASE}/formas/${forma}/`, {
        method: "DELETE",
      });

      return alert("Tipo apagado com sucesso.");
    } catch (error) {
      alert("Erro na requisição DELETE para formas; Arquivo api");
      throw error;
    }
  },

  async buscarOrigens() {
    try {
      const origens = await fetch(`${URLBASE}/origens/`);
      return await origens.json();
    } catch (error) {
      alert("Erro na requisição GET para origens; Arquivo api");
      throw error;
    }
  },

  async buscarOrigemPorId(id) {
    try {
      const origem = await fetch(`${URLBASE}/origens/${id}/`);
      return await origem.json();
    } catch (error) {
      console.error(
        "Erro na requisição GET para uma origem; Arquivo api:",
        error
      );
      alert("Erro na requisição GET para uma origem; Arquivo api");
      throw error;
    }
  },

  async adicionarOrigem(origem) {
    try {
      const response = await fetch(`${URLBASE}/origens/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(origem),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição POST de origens; Arquivo api");
      throw error;
    }
  },

  async editarOrigem(origem) {
    try {
      const response = await fetch(`${URLBASE}/origens/${origem.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(origem),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição PUT para origens; Arquivo api");
      throw error;
    }
  },

  async apagarOrigem(origem) {
    try {
      await fetch(`${URLBASE}/origens/${origem}/`, {
        method: "DELETE",
      });

      return alert("Origem apagado com sucesso.");
    } catch (error) {
      alert("Erro na requisição DELETE para origens; Arquivo api");
      throw error;
    }
  },

  async buscarEtiquetasPorCriatura(id_criatura) {
    try {
      const etiquetas = await fetch(
        `${URLBASE}/etiquetas/${id_criatura}/criaturas/`
      );

      return await etiquetas.json();
    } catch (error) {
      alert("Erro na requisição GET para Etiquetas por Criaturas; Arquivo api");
      throw error;
    }
  },

  async adicionarEtiqueta(etiqueta) {
    try {
      const response = await fetch(`${URLBASE}/etiquetas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etiqueta),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição POST para etiqueta; Arquivo api");
      throw error;
    }
  },

  async apagarEtiqueta(etiqueta) {
    try {
      await fetch(`${URLBASE}/etiquetas/${etiqueta}/`, {
        method: "DELETE",
      });
    } catch (error) {
      alert("Erro na requisição DELETE para etiquetas; Arquivo api");
      throw error;
    }
  },

  async buscarAlbumPorCriatura(id_criatura) {
    try {
      const response = await fetch(
        `${URLBASE}/album/${id_criatura}/criaturas/`
      );

      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    } catch (error) {
      alert("Erro na requisição GET para Album; Arquivo api");
      throw error;
    }
  },

  async adicionaroFotoAlbum(foto) {
    try {
      const response = await fetch(`${URLBASE}/album/`, {
        method: "POST",
        body: foto,
      });

      return response.json();
    } catch (error) {
      alert("Erro na requisição POST para Album; Arquivo api");
      throw error;
    }
  },

  async apagarFotoAlbum(id_foto) {
    try {
      await fetch(`${URLBASE}/album/${id_foto}/`, {
        method: "DELETE",
      });
    } catch (error) {
      alert("Erro na requisição DELETE para Album; Arquivo api");
      throw error;
    }
  },

  async buscarLendaPorCriatura(id_criatura) {
    try {
      const response = await fetch(
        `${URLBASE}/lendas/${id_criatura}/criaturas/`
      );

      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    } catch (error) {
      alert("Erro na requisição GET para lendas por criatura; Arquivo api");
      throw error;
    }
  },

  async buscarLendaPorId(id_lenda) {
    try {
      const response = await fetch(`${URLBASE}/lendas/${id_lenda}/`);

      return await response.json();
    } catch {
      alert("Erro na requisição GET para lenda por ID. Arquivo api");
    }
  },

  async adicionarLenda(lenda) {
    try {
      const response = await fetch(`${URLBASE}/lendas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lenda),
      });

      return response.json();
    } catch (error) {
      alert("Erro na requisição POST para lendas; Arquivo api");
      throw error;
    }
  },

  async editarLenda(lenda) {
    try {
      const response = await fetch(`${URLBASE}/lendas/${lenda.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lenda),
      });

      return await response.json();
    } catch (error) {
      alert("Erro na requisição PUT para lendas; Arquivo api");
      throw error;
    }
  },

  async apagarLenda(id_lenda) {
    try {
      await fetch(`${URLBASE}/lendas/${id_lenda}/`, {
        method: "DELETE",
      });
    } catch (error) {
      alert("Erro na requisição DELETE para lendas; Arquivo api");
      throw error;
    }
  },

  async buscarElementos() {
    try {
      const elementos = await fetch(`${URLBASE}/elementos/`);
      return await elementos.json();
    } catch (error) {
      alert("Erro na requisição GET para elementos; Arquivo api");
      throw error;
    }
  },

  async buscarElementoPorId(id) {
    try {
      const elemento = await fetch(`${URLBASE}/elementos/${id}/`);
      return await elemento.json();
    } catch (error) {
      alert("Erro na requisição GET para uma Elemento; Arquivo api");
      throw error;
    }
  },

  async adicionarElemento(elemento) {
    try {
      const response = await fetch(`${URLBASE}/elementos/`, {
        method: "POST",
        body: elemento,
      });

      if (response.ok) {
        return await response.json();
      } else {
        return false;
      }
    } catch (error) {
      alert("Erro na requisição POST para elementos; Arquivo api");
      throw error;
    }
  },

  async editarElemento(elemento) {
    try {
      const response = await fetch(
        `${URLBASE}/elementos/${elemento.get("id")}/`,
        {
          method: "PUT",
          body: elemento,
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        return false;
      }
    } catch (error) {
      alert("Erro na requisição PUT para elementos; Arquivo api");
      throw error;
    }
  },

  async apagarElemento(elemento) {
    try {
      await fetch(`${URLBASE}/elementos/${elemento}/`, {
        method: "DELETE",
      });
    } catch (error) {
      alert("Erro na requisição DELETE para elementos; Arquivo api");
      throw error;
    }
  },
};

export default api;
