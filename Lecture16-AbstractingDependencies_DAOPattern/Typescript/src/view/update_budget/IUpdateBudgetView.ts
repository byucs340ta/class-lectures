import { IView } from "../IView";
import { Budget } from "../../model/Budget";

export interface IUpdateBudgetView extends IView {
  displayAllBudgets(budget: Budget[]): void;
  displayEditingOptions(): void;
  displayMessage(message: string): void;
  navigate(to: string, args: any): void;
  pop(): void;
}