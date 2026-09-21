import xmarkIcon from "../assets/xmark.svg";
import { useState } from "react";
import { Task, ModalMode } from "../types";

interface TaskModalProps {
  selectedTask: Task | null;
  modalMode: ModalMode;
  onClose: () => void;
  onSave: (title: string, time: string) => void;
  onDelete: () => void;
}

const toInputTime = (time: string) => {
  const [clock, period] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
const fromInputTime = (time: string) => {
  let [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
};

const TaskModal = ({
  onClose,
  selectedTask,
  modalMode,
  onSave,
  onDelete,
}: TaskModalProps) => {
  const [taskName, setTaskName] = useState(selectedTask?.title ?? "");
  const [time, setTime] = useState(
    selectedTask ? toInputTime(selectedTask.time) : "20:00",
  );
  // чтобы placeholder работал правильно
  const [isFocused, setIsFocused] = useState(false);

  return (
    // fixed inset-0 означает: этот слой прикреплён к окну браузера и растянут на весь экран.
    <div className="fixed inset-0 z-10 bg-black/34 flex items-center justify-center">
      <div className="w-[500px] max-w-full flex-shrink-0 bg-white rounded-[var(--border-radius-card)] p-[32px_32px] flex flex-col gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // предотвращаем перезагрузку страницы при сабмите формы
            onSave(taskName, fromInputTime(time));
          }}
        >

        {/* Modal Header */}
        <div className="flex justify-between">
          <h2>{modalMode === "add" ? "Add Task" : "Edit Task"}</h2>
          <img
            src={xmarkIcon}
            alt="Close"
            onClick={onClose}
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>

        {/* Name input,floating label */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 bg-[var(--bg-grey)] px-3 py-2 rounded-[var(--border-radius-btn)]">
            {(isFocused || taskName) && (
              <label className="text-[14px] text-[var(--text-muted)]">
                Task Name
              </label>
            )}
            <input
              type="text"
              placeholder={
                isFocused || taskName ? "" : "What needs to be done?"
              }
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="text-[18px] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
          </div>

          {/* Time */}
          <div
            className="flex flex-col gap-2 bg-[var(--bg-grey)] px-3 py-2 rounded-[var(--border-radius-btn)]"
            onClick={(e) => {
              const input = e.currentTarget.querySelector("input");
              input?.showPicker();
            }}
          >
            <label className="text-[14px] text-[var(--text-muted)]">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>
        {/* buttons */}
        <div className="flex justify-end gap-4 mt-4">
          {modalMode === "edit" && (
            <button
              type="button"
              onClick={onDelete}
              className="text-[#9D4F4F] px-4 py-2 rounded-[var(--border-radius-btn)] hover:text-[#9D4F4F]/70 transition-colors duration-200"
            >
              Delete Task
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded-[var(--border-radius-btn)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/80 transition-colors duration-200"
          >
            {modalMode === "edit" ? "Save" : "Add Task"}
          </button>
        </div>
        </form>
      </div>
      
    </div>
  );
};

export default TaskModal;
