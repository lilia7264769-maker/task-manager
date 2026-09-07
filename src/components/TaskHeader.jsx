import plusIcon from "../assets/plus.svg";

const TaskHeader = () => {
  return (
    <header className="task-header">
      <div className="heading">
        <h1>Task Manager</h1>
        <p className="task-stats">2 of 5 completed</p>
      </div>
      <button className="add-task-btn">
        <img src={plusIcon} alt="" />
        Add task
      </button>
    </header>
  );
};

export default TaskHeader;
