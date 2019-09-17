export interface INewBudgetPresenter {
  monthSelected(month: string): void;
  yearSelected(year: number): void;
  monthlyAllowanceSelected(allowance: number): void;
  handleSave(answer: string): void;
}