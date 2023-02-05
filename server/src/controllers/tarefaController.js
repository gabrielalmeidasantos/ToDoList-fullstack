const tarefaModel = require("../models/tarefaModel");

async function Listar(req, res) {
  try {
    let tarefas = null;
    let finalizado = req.params.finalizado;

    if (finalizado) {
      if (finalizado === "true") {
        tarefas = await tarefaModel.findAll({
          where: {
            finalizado: true,
          },
        });
      } else if (finalizado === "false") {
        tarefas = await tarefaModel.findAll({
          where: {
            finalizado: false,
          },
        });
      } else {
        res.send("Nenhuma tarefa encontrada");
        return res.status(404);
      }
    } else {
      tarefas = await tarefaModel.findAll();
    }
    return res.json({
      quantidade: tarefas.length,
      tarefas,
    });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}

async function Criar(req, res) {
  try {
    const tarefas = await tarefaModel.create({
      titulo: req.body.titulo,
      finalizado: false,
    });

    res.json(tarefas);
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}

async function Editar(req, res) {
  try {
    const tarefa = await tarefaModel.findByPk(req.body.id);
    if (tarefa) {
      tarefa.finalizado = req.body.finalizado;
      await tarefa.save();
    }

    res.json(tarefa);
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}

async function Apagar(req, res) {
  try {
    const tarefa = await tarefaModel.findByPk(req.body.id);
    if (tarefa) {
      await tarefa.destroy();
      res.json(tarefa);
    } else {
      res.send("Tarefa não encontrada");
    }
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}

module.exports = {
  Listar,
  Criar,
  Editar,
  Apagar,
};
