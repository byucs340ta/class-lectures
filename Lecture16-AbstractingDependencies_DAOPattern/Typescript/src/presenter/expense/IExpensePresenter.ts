export interface IExpensePresenter {
  fetchExpenses(): void;
  optionSelected(selection: string): void;
  editDay(day: number): void;
  editName(name: string): void;
  editAmount(amount: number): void;
  editSelectedExpense(selection: number): void;
  handleSave(answer: string): void;
  deleteSelectedExpense(selection: number): void;
}