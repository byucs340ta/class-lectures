export interface IIncomePresenter {
  fetchIncome(): void;
  optionSelected(selection: string): void;
  projectedIncomeSelected(income: number): void;
  actualIncomeSelected(income: number): void;
  handleSave(answer: string): void;
}