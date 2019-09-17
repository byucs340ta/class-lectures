export interface IUpdateBudgetPresenter {
  fetchAllBudgets(): void;
  budgetSelected(selection: number): void;
  editingOptionsSelected(selection: string): void;
}