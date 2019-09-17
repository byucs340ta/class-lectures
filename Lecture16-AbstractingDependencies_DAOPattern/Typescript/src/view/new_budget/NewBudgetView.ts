import { INewBudgetView } from "./INewBudgetView";
import { INewBudgetPresenter } from "../../presenter/new_budget/INewBudgetPresenter";
import { NewBudgetPresenter } from "../../presenter/new_budget/NewBudgetPresenter";
import { Navigator } from "../Navigator";

export class NewBudgetView implements INewBudgetView {
  newBudgetPresenter?: INewBudgetPresenter;

  private rl = require('readline-sync');

  start(args: any): void {
    this.newBudgetPresenter = new NewBudgetPresenter(this);
    this.displayMonthPrompt();
  }

  displayMonthPrompt(): void {
    let month = this.rl.question('What month is this new budget for? ');
    this.newBudgetPresenter!.monthSelected(month);
  }

  displayYearPrompt(): void {
    let year: number = this.rl.question('What year is this new budget for? ');
    this.newBudgetPresenter!.yearSelected(year);
  }

  displayMonthlyAllowancePrompt(): void {
    let allowance: number = this.rl.question('What is your monthly allowance? ');
    this.newBudgetPresenter!.monthlyAllowanceSelected(allowance);
  }

  displaySavePrompt(): void {
    let answer = this.rl.question('Save? (y/n) ');
    this.newBudgetPresenter!.handleSave(answer);
  }

  displayMessage(message: string): void {
    console.log(message);
  }

  pop(): void {
    Navigator.pop();
  }
}