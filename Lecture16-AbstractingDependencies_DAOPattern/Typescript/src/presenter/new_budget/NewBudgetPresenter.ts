import { INewBudgetPresenter } from "./INewBudgetPresenter";
import { INewBudgetView } from "../../view/new_budget/INewBudgetView";
import { Budget } from "../../model/Budget";
import { ConnectionFactory } from "../../database/ConnectionFactory";

export class NewBudgetPresenter implements INewBudgetPresenter {
  newBudgetView: INewBudgetView;
  budget: Budget;

  constructor(budgetView: INewBudgetView) {
    this.newBudgetView = budgetView;
    this.budget = new Budget();
  }

  monthSelected(month: string): void {
    this.budget.month = month.toLowerCase();
    this.newBudgetView.displayYearPrompt();
  }

  yearSelected(year: number): void {
    this.budget.year = year;
    this.newBudgetView.displayMonthlyAllowancePrompt();
  }

  monthlyAllowanceSelected(allowance: number): void {
    this.budget.monthlyAllowance = allowance;
    this.newBudgetView.displaySavePrompt();
  }

  async handleSave(answer: string) {
    if (answer.toLowerCase() === 'y') {
      this.budget.id = this.budget.month + '_' + this.budget.year;
      let success = await this.createBudget(this.budget);
      this.newBudgetView.displayMessage(success ? 'New budget made successfully!' : 'New budget could not be created');
      this.newBudgetView.pop();
    } else if (answer.toLowerCase() === 'n') {
      this.newBudgetView.pop();
    } else {
      this.newBudgetView.displaySavePrompt();
    }
  }

  private async createBudget(budget: Budget): Promise<boolean> {
    return await this.run(
      'insert or ignore into budgets values(?, ?, ?, ?)',
      [
        budget.id,
        budget.month,
        budget.year,
        budget.monthlyAllowance
      ]
    );
  }

  private async run(sql: string, params: any[] = []): Promise<boolean> {
    return new Promise(resolve => {
      ConnectionFactory.getConnection().run(sql, params, (err: any) => {
        if (err) {
          console.log(`Error running sql: ${sql}, Error: ${err}`);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}