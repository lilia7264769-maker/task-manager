import checkedIcon from "../assets/checked-circle.svg";
import uncheckedIcon from "../assets/unchecked-circle.svg";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: number) => void;
  onOpenModal: (task: Task) => void;
}

const TaskItem = ({ task, onToggleTask, onOpenModal }: TaskItemProps) => {
  return (
    <div
      onClick={() => onOpenModal(task)}
      className="flex items-center justify-between w-full p-4 cursor-pointer group hover:bg-[var(--bg-grey)]"
    >
      {/* Левая часть: Название и время */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[18px] font-medium text-slate-900 tracking-wide">
          {task.title}
        </span>
        <span className="text-[14px] text-[var(--text-muted)] font-normal">
          {task.time}
        </span>
      </div>

      {/* Правая часть: чекбокс */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleTask(task.id);
        }}
        className="focus:outline-none cursor-pointer"
      >
        {task.completed ? (
          <img src={checkedIcon} alt="" />
        ) : (
          <img src={uncheckedIcon} alt="" />
        )}
      </button>
    </div>
  );
};

export default TaskItem;
