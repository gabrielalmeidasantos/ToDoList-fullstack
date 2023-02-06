import React from "react";
import styles from "./App.module.css";
import Tarefa from "./components/Tarefa";
import axios from "axios";

function App() {
  const [tarefas, setTarefas] = React.useState(null);
  const [inputTarefa, setInputTarefa] = React.useState();
  const [atualizar, setAtualizar] = React.useState(false);

  React.useEffect(() => listar(), [atualizar]);

  function listar(param = null) {
    if (param) {
      axios
        .get(`http://localhost:3030/api/tarefa/${param}`)
        .then((response) => {
          setTarefas(response.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:3030/api/tarefa/")
        .then((response) => {
          setTarefas(response.data);
        })
        .catch((err) => console.log(err));
    }
  }

  function cadastrar(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3030/api/tarefa/criar", {
        titulo: inputTarefa,
      })
      .then((response) => {
        setInputTarefa(() => "");
        setAtualizar((atualizar) => !atualizar);
      })
      .catch((err) => console.log(err));
    listar();
  }

  function TarefasComponent({ tarefas }) {
    return (
      <div className={styles.tarefas}>
        {tarefas?.tarefas?.map((t) => (
          <Tarefa
            titulo={t.titulo}
            finalizado={t.finalizado}
            key={t.id}
            id={t.id}
            setAtualizar={setAtualizar}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.main}>
        <form className={styles.container_tarefas} onSubmit={cadastrar}>
          <input
            type="text"
            placeholder="Criar uma tarefa..."
            value={inputTarefa}
            onChange={({ target }) => setInputTarefa(target.value)}
            required
          />
          <TarefasComponent tarefas={tarefas} />
          <div className={styles.filtros}>
            <span>{tarefas?.quantidade} tarefas</span>
            <span
              className={styles.opcao}
              onClick={() => {
                listar();
              }}
            >
              todas
            </span>
            <span
              className={styles.opcao}
              onClick={() => {
                listar("true");
              }}
            >
              completas
            </span>
            <span
              className={styles.opcao}
              onClick={() => {
                listar("false");
              }}
            >
              incompletas
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
