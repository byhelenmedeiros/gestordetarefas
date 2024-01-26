import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import "./Dashboard.css";

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
    category: "",
    favorite: false,
    sharedWith: [],
    priority: "Alta", // Define a prioridade padrão como "Alta"
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:4242/api/tasks", {});

      if (!response.ok) {
        throw new Error("Falha ao buscar tarefas");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error.message);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch("http://localhost:4242/api/tasks/create", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchTasks();
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          completed: false,
          category: "",
          favorite: false,
          sharedWith: [],
          priority: "Alta", // Define a prioridade padrão como "Alta" após adicionar a tarefa
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error.message);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`http://localhost:4242/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (response.ok) {
        fetchTasks(); // Atualiza a lista de tarefas após a edição.
        setEditingTask(null); // Limpa o estado de edição.
      } else {
        // Trate erros aqui, se necessário.
        console.error("Erro ao editar tarefa:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao editar tarefa:", error.message);
    }
  };
  

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:4242/api/tasks/delete/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });
  
      if (response.ok) {
        fetchTasks(); // 
      } else {
        console.error("Erro ao deletar tarefa:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error.message);
    }
  };
  
  const logout = () => {
    AuthService.logout();
  };

  function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <div className="dashboard">
      <main className="dashboard__main">
        <div className="dashboard__section">
          <div className="dashboard__container">
            <h1 className="dashboard__title">
              Seja Bem-vindo ao TaskMaster, {formatName(currentUser)}!
            </h1>
            <p className="dashboard__tasks">Aqui estão todas as suas tarefas.</p>
            <div className="dashboard__logout">
              <button className="dashboard__button-perfil" onClick={logout}>
                Meu perfil
              </button>
              <button className="dashboard__button-sair" onClick={logout}>
                Sair
              </button>
            </div>
          </div>

          {/* Formulário para adicionar tarefas */}
          <div className="dashboard__form">
            <div className="dashboard__form-group">
              <label className="dashboard__label" htmlFor="tarefa">
                Sua tarefa:
              </label>
              <input
                type="text"
                className="dashboard__input"
                placeholder="Estudar javascript, estudar JAVA..."
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </div>

            <div className="dashboard__form-group">
              <label className="dashboard__label" htmlFor="descricao">
                Descrição da tarefa:
              </label>
              <input
                type="text"
                className="dashboard__input"
                placeholder="Descrição"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>

            <div className="dashboard__form-group">
              <label className="dashboard__label" htmlFor="data">
                Data de conclusão:
              </label>
              <input
                type="datetime-local"
                className="dashboard__input"
                placeholder="dd/mm/aaaa"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>

            <div className="dashboard__form-group">
              <label className="dashboard__label" htmlFor="descricao">
                Status da tarefa:
              </label>
              <div className="dashboard__checkbox-group">
                <input
                  type="checkbox"
                  className="dashboard__checkbox-input"
                  checked={newTask.completed}
                  onChange={(e) => setNewTask({ ...newTask, completed: e.target.checked })}
                />
                <label className="dashboard__checkbox-label">Concluída</label>
              </div>
            </div>

            <div className="dashboard__form-group">
              <label className="dashboard__label" htmlFor="categoria">
                Escolha a categoria dessa tarefa:
              </label>
              <input
                type="text"
                className="dashboard__input"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              />
            </div>

            <div className="dashboard__form-group">
              <label className="dashboard__label" htmlFor="share">
                Compartilhar com:
              </label>
              <input
                type="text"
                className="dashboard__input"
                placeholder=""
                value={newTask.sharedWith}
                onChange={(e) => setNewTask({ ...newTask, sharedWith: e.target.value })}
              />
            </div>

            <div className="dashboard__form-group">
              <label className="dashboard__label" htmlFor="descricao">
                Prioridade:
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            <div className="dashboard__button-right">
              <button className="dashboard__button-task" onClick={addTask}>
                Adicionar Tarefa
              </button>
            </div>
          </div>

          <ul className="dashboard__card-list">
            {tasks.map((task) => (
              <li key={task.id} className="dashboard__card">
                <div className="dashboard__card-header">
                  <h2 className="dashboard__card-title">{task.title}</h2>
                </div>
                <div className="dashboard__card-details">
                  <h6>{task.description}</h6>
                  <hr />
                  <p>Data de conclusão: {task.dueDate}</p>
                  <p>Categoria: {task.category}</p>
                  <p>Prioridade: {task.priority}</p>
                  <div className="dashboard__button-buttons">
                    <button className="dashboard__button-primary" onClick={() => editTask(task.id)}>
                      Editar
                    </button>
                    <button className="dashboard__button-danger" onClick={() => deleteTask(task.id)}>
                      Deletar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
