import { IView } from "../IView";
import { Expense } from "../../model/Expense";

export interface IExpenseView extends IView {
  displayOptions(): void;
  displayExpenses(expenses: Expense[]): void;
  displayEditNamePrompt(): void;
  displayEditDayPrompt(): void;
  displayEditAmountPrompt(): void;
  displayEditExpensePrompt(expenses: Expense[]): void;
  displaySavePrompt(expense: Expense): void;
  displayDeleteExpensePrompt(expenses: Expense[]): void;
  displayMessage(message: string): void;

  pop(): void;
}