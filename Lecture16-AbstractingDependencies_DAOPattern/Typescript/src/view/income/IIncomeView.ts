import { IView } from "../IView";
import { Income } from "../../model/Income";

export interface IIncomeView extends IView {
  displayOptions(): void;
  displayIncome(income: Income): void;
  displayEditProjectedIncomePrompt(month: string, year: number): void;
  displayEditActualIncomePrompt(month: string, year: number): void;
  displaySavePrompt(income: Income): void;
  displayMessage(message: string): void;
  pop(): void;
}