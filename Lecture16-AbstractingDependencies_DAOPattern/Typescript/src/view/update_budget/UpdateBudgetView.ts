import { IUpdateBudgetView } from "./IUpdateBudgetView";
import { Budget } from "../../model/Budget";
import { IUpdateBudgetPresenter } from "../../presenter/update_budget/IUpdateBudgetPresenter";
import { UpdateBudgetPresenter } from "../../presenter/update_budget/UpdateBudgetPresenter";
import { Navigator } from "../Navigator";

export class UpdateBudgetView implements IUpdateBudgetView {
  updateBudgetPresenter?: IUpdateBudgetPresenter;

  private rl = require('readline-sync');

  start(args: any): void {
    this.updateBudgetPresenter = new UpdateBudgetPresenter(this);
    this.updateBudgetPresenter.fetchAllBudgets();
  }

  displayAllBudgets(budgets: Budget[]): void {
    console.log('\n######### Update Budget #########\n');

    for (var i = 0; i < budgets.length; i++) {
      console.log(`${i + 1}. ${budgets[i].toString()}`);
    }

    console.log('0. Go back');

    let selection = +this.rl.question(`Select the budget you would like to update (1 - ${budgets.length}) or go back (0): `);
    this.updateBudgetPresenter!.budgetSelected(selection);
  }

  displayEditingOptions(): void {
    console.log('What would you like to edit (1 - 3)?');
    console.log('1. Income');
    console.log('2. Expenses');
    console.log('3. Go back');

    let selection = this.rl.question('Your selection: ');
    this.updateBudgetPresenter!.editingOptionsSelected(selection);
  }

  displayMessage(message: string): void {
    console.log(message);
  }

  navigate(to: string, args: any): void {
    Navigator.push(to, args);
  }

  pop(): void {
    Navigator.pop();
  }
}