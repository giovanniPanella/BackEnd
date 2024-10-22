const express = require("express");
const router = express.Router();
const db = require("../db/models");

//Rota Cadastrar Pedido
router.post("/", async (req, res) => {
  const { item, quantidade } = req.body;
  try {
    // Conta o número de pedidos no banco
    const countUser = await db.pedidos.count();
    // Busca o último pedido com OP
    let OP = 1; // Inicia com 1 caso não haja pedidos cadastrados
    if (countUser > 0) {
      const ultimoOp = await db.pedidos.findOne({
        attributes: ['OP'],
        order: [['id', 'DESC']] // Pega o último pedido baseado no ID
      });
      // Incrementa o último OP
      OP = ultimoOp.dataValues.OP + 1;
    }
    const dataPedidos = await db.pedidos.create({ OP, item, quantidade });

    return res.json({
      error: false,
      message: "Pedido Cadastrado Com Sucesso",
      dataPedidos,
    });

  } catch (erro) {
    return res.status(400).json({
      error: true,
      message: "Pedido não Cadastrado: " + erro.message,
    });
  }
});
//Rota Ver Pedido
router.get("/acompanhar/:op", async(req, res) => {
  const { op } = req.params

  const pedido = await db.pedidos.findOne({
    attributes: ['id', 'OP','item', 'quantidade', 'status', 'produzido', 'updatedAt'],
    where: { op }
});
if (pedido) {
   // Retornar objeto como resposta
    return res.json({
        error: false,
        pedido
        
    });
} else {
    // Retornar objeto como resposta
    return res.status(400).json({
        error: true,
        message: "Erro: Pedido não encontrado!"
    });
}
});
//Rota Editar Pedido
router.put("/acompanhar/:id", async(req, res) => {
  const { item, quantidade } = req.body; // Pegando os dados do corpo da requisição
  const { id } = req.params;
  await db.pedidos.update({ item, quantidade }, { where: { id} })
    .then(() => {
        return res.json({
            error: false,
            message: "Pedido editado com sucesso!"
        })
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Erro: Pedido não editado! "+erro
        })
    })
})
//Rota Deletar Pedido
router.delete("/acompanhar/:id", async (req, res) => {
  const { id } = req.params
  await db.pedidos.destroy({
    // Acrescentar o WHERE na instrução SQL indicando qual registro excluir no BD
    where: { id }
}).then(() => {
    return res.json({
        error: false,
        message: "Pedido deletado com sucesso!"
    });
}).catch((erro) => {
    return res.status(400).json({
        error: true,
        message: "Erro: Pedido não apagado!"+erro
    });
});



});

module.exports = router;
