import { IExpenseView } from "./IExpenseView";
import { Expense } from "../../model/Expense";
import { Navigator } from "../Navigator";
import { IExpensePresenter } from "../../presenter/expense/IExpensePresenter";
import { ExpensePresenter } from "../../presenter/expense/ExpensePresenter";

export class ExpenseView implements IExpenseView {
  expensePresenter?: IExpensePresenter;

  private rl = require('readline-sync');

  start(args: any): void {
    this.expensePresenter = new ExpensePresenter(this, args);
    this.expensePresenter.fetchExpenses();
  }

  displayOptions(): void {
    console.log('\n######### Expenses #########\n');
    console.log('Select an option:');
    console.log('1. View all expenses');
    console.log('2. Add an expense');
    console.log('3. Edit an expense');
    console.log('4. Delete an expense');
    console.log('5. Go back');

    let selection = this.rl.question('Your selection: ');
    this.expensePresenter!.optionSelected(selection);
  }

  displayExpenses(expenses: Expense[]): void {
    for (var i = 0; i < expenses.length; i++) {
      console.log(`${i + 1}. ${expenses[i].toString()}`);
    }
  }

  displayEditNamePrompt(): void {
    let name = this.rl.question('What is the name of this expense? ');
    this.expensePresenter!.editName(name);
  }

  displayEditDayPrompt(): void {
    let day: number = +this.rl.question('What day was this expense made? Use number representation: ');
    this.expensePresenter!.editDay(day);
  }

  displayEditAmountPrompt(): void {
    let amount: number = this.rl.question('How much was this expense? ');
    this.expensePresenter!.editAmount(amount);
  }

  displayEditExpensePrompt(expenses: Expense[]): void {
    this.displayExpenses(expenses);

    let selection: number = +this.rl.question(`Select which expense you would like to edit (1 - ${expenses.length}): `);
    this.expensePresenter!.editSelectedExpense(selection);
  }

  displaySavePrompt(expense: Expense): void {
    let answer = this.rl.question(`\n${expense.toString()}\nSave (y/n) `);
    this.expensePresenter!.handleSave(answer);
  }

  displayDeleteExpensePrompt(expenses: Expense[]): void {
    this.displayExpenses(expenses);

    let selection: number = +this.rl.question(`Select which expense you would like to delete (1 - ${expenses.length}): `);
    this.expensePresenter!.deleteSelectedExpense(selection);

  }

  displayMessage(message: string): void {
    console.log(message);
  }

  pop(): void {
    Navigator.pop();
  }
}