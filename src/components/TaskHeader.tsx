import plusIcon from "../assets/plus.svg";

interface TaskHeaderProps {
  onOpenAddModal: () => void;
}

const TaskHeader = ({ onOpenAddModal }: TaskHeaderProps) => {
  return (
    <header className="flex items-start justify-between w-full">
      <div className="flex flex-col gap-[6px]">
        <h1 className="text-[24px] font-medium">Task Manager</h1>
        <p className="text-[15px] text-[var(--text-muted)]">2 of 5 completed</p>
      </div>
      <button
        onClick={onOpenAddModal}
        className="inline-flex items-center gap-[12px] px-3 py-[10px] rounded-[var(--border-radius-btn)] text-[var(--color-primary)] bg-[#ebf3ff transition-colors duration-200 hover:bg-[#dbeafe]"
      >
        <img src={plusIcon} alt="+" className="w-5 h-5" />
        Add task
      </button>
    </header>
  );
};

export default TaskHeader;
