import { IUpdateBudgetPresenter } from "./IUpdateBudgetPresenter";
import { IUpdateBudgetView } from "../../view/update_budget/IUpdateBudgetView";
import { Budget } from "../../model/Budget";
import { ConnectionFactory } from "../../database/ConnectionFactory";

export class UpdateBudgetPresenter implements IUpdateBudgetPresenter {
  updateBudgetView: IUpdateBudgetView;
  selectedBudget?: Budget;
  allBudgets: Budget[];

  constructor(updateBudgetView: IUpdateBudgetView) {
    this.updateBudgetView = updateBudgetView;
    this.allBudgets = [];
  }

  async fetchAllBudgets() {
    let budgets = await this.getAllBudgets();
    if (budgets == undefined || budgets.length == 0) {
      this.updateBudgetView.displayMessage('You have no budgets');
      this.updateBudgetView.pop();
      return;
    }
    this.allBudgets = <Budget[]>budgets;
    this.updateBudgetView.displayAllBudgets(this.allBudgets);
  }

  budgetSelected(selection: number): void {
    if (selection === 0) {
      this.updateBudgetView.pop();
      return;
    } else if (selection
      && selection > this.allBudgets.length
    ) {
      this.updateBudgetView.displayAllBudgets(this.allBudgets);
      return;
    }

    this.selectedBudget = this.allBudgets[selection - 1];
    this.updateBudgetView.displayEditingOptions();
  }

  editingOptionsSelected(selection: string): void {
    switch (selection) {
      case '1':
        this.updateBudgetView.navigate('income', this.selectedBudget);
        break;
      case '2':
        this.updateBudgetView.navigate('expense', this.selectedBudget);
        break;
      case '3':
        this.updateBudgetView.pop();
        break;
      case '4':
        this.updateBudgetView.displayEditingOptions();
        break;
    }
  }

  async getAllBudgets(): Promise<Budget[] | undefined> {
    let budgets = await this.getAllData<Budget>(
      'select budgets.id, budgets.month, budgets.year, budgets.monthlyAllowance from budgets'
    );
    if (budgets) {
      let b: Budget[] = [];
      budgets.forEach(budget => {
        b.push(new Budget(budget.id, budget.month, budget.year, budget.monthlyAllowance));
      });
      return b;
    }
  }

  private async getAllData<T>(sql: string, params: any[] = []): Promise<T[] | undefined> {
    return new Promise(resolve => {
      ConnectionFactory.getConnection().all(sql, params, (err: any, results: T[]) => {
        if (err) {
          console.log(`Error running sql: ${sql}, Error: ${err}`);
          resolve();
        } else {
          resolve(results);
        }
      });
    });
  }
}