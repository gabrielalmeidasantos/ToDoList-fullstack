const express = require("express");
const router = express.Router();
const {
  Listar,
  Criar,
  Editar,
  Apagar,
} = require("../controllers/tarefaController");

router.get("/", Listar);
router.get("/?:finalizado", Listar);
router.post("/criar", Criar);
router.post("/editar", Editar);
router.post("/apagar", Apagar);

module.exports = router;
