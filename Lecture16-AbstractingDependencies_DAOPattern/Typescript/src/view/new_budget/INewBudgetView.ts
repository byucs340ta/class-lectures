import { IView } from "../IView";

export interface INewBudgetView extends IView {
  displayMonthPrompt(): void;
  displayYearPrompt(): void;
  displayMonthlyAllowancePrompt(): void;
  displaySavePrompt(): void;
  displayMessage(message: string): void;
  pop(): void;
}