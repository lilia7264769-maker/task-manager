export type ModalMode = "add" | "edit" | null;

export type Filter = "all" | "active" | "completed";

export type Task = {
  id: number;
  title: string;
  time: string;
  completed: boolean;
};