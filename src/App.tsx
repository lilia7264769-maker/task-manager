import { useState } from "react";

import TaskHeader from "./components/TaskHeader";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import TaskModal from "./components/TaskModal";

import { Task, Filter, ModalMode } from "./types";

export default function App() {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Research for marketing brief",
      time: "8:00 PM",
      completed: true,
    },
    { id: 2, title: "Do laundry", time: "11:30 AM", completed: true },
    { id: 3, title: "Feed dogs", time: "6:00 PM", completed: false },
    { id: 4, title: "Reply to emails", time: "9:00 PM", completed: false },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  // Функция для переключения состояния задачи (выполнена/не выполнена)
  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map(
        (task) =>
          task.id === id ? { ...task, completed: !task.completed } : task, // Если это не та задача, мы оставляем её как есть.
      ),
    );
  };

  //если не подходит по статусу → убрать
  const filteredTasks = tasks.filter((task) => {
    // фильтр по статусу
    if (activeFilter === "active" && task.completed) {
      return false;
    }
    if (activeFilter === "completed" && !task.completed) {
      return false;
    }
    // фильтр по поиску
    if (!task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
    setModalMode("edit");
  };
  const handleOpenAddModal = () => {
    setSelectedTask(null);
    setModalMode("add");
  };
  const handleCloseModal = () => {
    setModalMode(null);
  };
  const handleSaveTask = (title: string, time: string) => {
    if (modalMode === "add") {
      const newTask: Task = {
        id: Date.now(), // Простая генерация ID
        title,
        time,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    if (modalMode === "edit" && selectedTask) {
      setTasks(
        tasks.map((t) =>
          t.id === selectedTask.id ? { ...t, title, time } : t,
        ),
      );  
    }
    
    handleCloseModal();
  };
  const handleDeleteTask = () => {
  if (selectedTask) {
    setTasks(tasks.filter((task) => task.id !== selectedTask.id));
    handleCloseModal();
  }
};

  return (
    <>
      <main className="w-[500px] max-w-full flex-shrink-0 bg-white rounded-[var(--border-radius-card)] p-[32px_32px] flex flex-col gap-6">
        <TaskHeader onOpenAddModal={handleOpenAddModal} />
        <TaskFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onOpenModal={handleOpenModal}
        />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </main>

      {modalMode && (
        <TaskModal
          selectedTask={selectedTask}
          modalMode={modalMode}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
}
