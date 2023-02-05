const express = require("express");
const app = express();
const tarefaRouter = require("./src/routes/tarefaRoute");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/tarefa", tarefaRouter);

app.use((req, res) => {
  res.status(404);
  res.send("Não encontrado 404");
});

app.listen(3030, () => console.log("rodando"));
