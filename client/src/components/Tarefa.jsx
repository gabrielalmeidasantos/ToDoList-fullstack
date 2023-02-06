import React from "react";
import styles from "./Tarefa.module.css";
import axios from "axios";

function Tarefa({ titulo, finalizado, id, setAtualizar }) {
  function apagar(id) {
    axios
      .post("http://localhost:3030/api/tarefa/apagar", {
        id: id,
      })
      .then((response) => {
        setAtualizar((atualizar) => !atualizar);
      })
      .catch((err) => console.log(err));
  }

  function finalizar(id) {
    axios
      .post("http://localhost:3030/api/tarefa/editar", {
        id: id,
        finalizado: !finalizado,
      })
      .then((response) => {
        setAtualizar((atualizar) => !atualizar);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.tarefa}>
      <div>
        <div
          className={styles.circulo}
          style={{
            backgroundColor: finalizado ? "#32CD32" : "transparent",
          }}
          onClick={() => finalizar(id)}
        ></div>
        <span>{titulo}</span>
      </div>
      <span className={styles.remover} onClick={() => apagar(id)}>
        Remover
      </span>
    </div>
  );
}

export default Tarefa;
