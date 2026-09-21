import { useEffect, useRef } from "react";
import { Filter } from "../types";

interface TaskFilterProps {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
}

const TaskFilter = ({ activeFilter, setActiveFilter }: TaskFilterProps) => {
  const filters = ["all", "active", "completed"] as const;
  //for animation of the slider, we need to know the position and width of the button that was clicked. We can get this information using refs.
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const moveSlider = (filter: Filter) => {
    const index = filters.indexOf(filter);
    const button = buttonRefs.current[index];
    const slider = sliderRef.current;

    if (!button || !slider) return;

    slider.style.left = `${button.offsetLeft}px`;
    slider.style.width = `${button.offsetWidth}px`;
  };

  useEffect(() => {
    moveSlider(activeFilter);
  }, [activeFilter]);

  return (
    <div className="relative flex bg-[var(--bg-grey)] p-1 rounded-xl w-max gap-2">
      <div
        ref={sliderRef}
        className="absolute z-0 bg-white rounded-lg transition-all duration-200 top-1 bottom-1"
      />

      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            ref={(el) => {
              buttonRefs.current[filters.indexOf(filter)] = el;
            }}
            onClick={() => {
              setActiveFilter(filter);
            }}
            className={`relative z-10 px-3 py-1 rounded-lg text-[15px] transition-all duration-200 cursor-pointer capitalize ${
              isActive
                ? "text-[var(--text-black)] font-medium"
                : "text-[var(--text-muted)] font-normal hover:text-[var(--color-black)]"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default TaskFilter;
