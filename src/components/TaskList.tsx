import TaskItem from "./TaskItem";
import { Task } from "../types";

// Описываем, какие пропсы (данные) ожидает получить наш список задач
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void; //это функция, которая принимает id типа number и ничего не возвращает (void)
  onOpenModal: (task: Task) => void; //это функция, которая принимает задачу и ничего не возвращает (void)
}

const TaskList = ({ tasks, onToggleTask, onOpenModal }: TaskListProps) => {
  return (
    <div className="task-list h-[280px] overflow-y-auto flex flex-col divide-y divide-[var(--border-light)]">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
};

export default TaskList;
