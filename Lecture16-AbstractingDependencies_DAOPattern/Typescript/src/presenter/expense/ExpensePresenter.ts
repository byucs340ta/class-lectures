import { IExpensePresenter } from "./IExpensePresenter";
import { IExpenseView } from "../../view/expense/IExpenseView";
import { Budget } from "../../model/Budget";
import { Expense } from "../../model/Expense";
import { isUndefined } from "util";
import { ConnectionFactory } from "../../database/ConnectionFactory";

export class ExpensePresenter implements IExpensePresenter {
  expenseView: IExpenseView;
  budget: Budget;
  allExpenses?: Expense[];
  editableExpense?: Expense;

  constructor(expenseView: IExpenseView, args: object | undefined) {
    this.expenseView = expenseView;
    this.budget = <Budget>args;
  }

  async fetchExpenses() {
    this.setExpenses(await this.getAllExpenses(this.budget.id!));
    this.expenseView.displayOptions();
  }

  optionSelected(selection: string): void {
    switch (selection) {
      case '1':
        if (this.allExpenses && this.allExpenses.length > 0) {
          this.expenseView.displayExpenses(this.allExpenses);
        } else {
          this.expenseView.displayMessage('You have no expenses for this budgeet');
        }
        this.expenseView.displayOptions();
        break;
      case '2':
        this.editableExpense = new Expense();
        this.editableExpense.createId();
        this.editableExpense.month = this.budget.month;
        this.editableExpense.year = this.budget.year;
        this.editableExpense.budgetId = this.budget.id;
        this.expenseView.displayEditNamePrompt();
        break;
      case '3':
        if (this.allExpenses && this.allExpenses.length > 0) {
          this.expenseView.displayEditExpensePrompt(this.allExpenses!);
        } else {
          this.expenseView.displayMessage("You don't have any expenses to edit");
          this.expenseView.displayOptions();
        }
        break;
      case '4':
        if (this.allExpenses && this.allExpenses.length > 0) {
          this.expenseView.displayDeleteExpensePrompt(this.allExpenses!);
        } else {
          this.expenseView.displayMessage("You don't have any expenses to delete");
          this.expenseView.displayOptions();
        }
        break;
      case '5':
        this.expenseView.pop();
        break;
      default:
        this.expenseView.displayOptions();
        break;
    }
  }

  editName(name: string): void {
    this.editableExpense!.name = name;
    this.expenseView.displayEditDayPrompt();
  }

  editDay(day: number): void {
    this.editableExpense!.day = day;
    this.expenseView.displayEditAmountPrompt();
  }

  editAmount(amount: number): void {
    this.editableExpense!.amount = amount;
    this.expenseView.displaySavePrompt(this.editableExpense!);
  }

  editSelectedExpense(selection: number): void {
    if (selection
      && selection > 0
      && selection <= this.allExpenses!.length
    ) {
      this.editableExpense = this.allExpenses![selection - 1];
      this.expenseView.displayEditDayPrompt();
    }
  }

  async handleSave(answer: string) {
    if (answer.toLowerCase() === 'y') {
      let message: string;
      if (this.allExpenses
        && this.allExpenses.includes(this.editableExpense!)
      ) {
        let success = await this.updateExpense(this.editableExpense!);
        message = success ? 'Expense updated successfully' : 'Expense update failed';
      } else {
        let success = await this.createExpense(this.editableExpense!);
        message = success ? 'Expense created successfully' : 'Expense creation failed';
      }
      this.setExpenses(await this.getAllExpenses(this.budget.id!));
      this.expenseView.displayMessage(message);
    }
    this.expenseView.displayOptions();
  }

  async deleteSelectedExpense(selection: number) {
    if (selection
      && selection > 0
      && selection <= this.allExpenses!.length
    ) {
      let expenseToDelete = this.allExpenses![selection - 1];
      let success = await this.deleteExpense(expenseToDelete.id!);
      let message = success ? 'Expense deleted successfully' : 'Expense deletion failed';
      this.expenseView.displayMessage(message);
      if (success) {
        this.setExpenses(await this.getAllExpenses(this.budget.id!));
      }
      this.expenseView.displayOptions();
    }
  }

  private setExpenses(expenses: Expense[] | undefined): void {
    if (expenses) {
      this.allExpenses = expenses.sort((a, b) => a.day! - b.day!);
    }
  }

  private async getAllExpenses(budgetId: string): Promise<Expense[] | undefined> {
    let expenses = await this.getAllData<Expense>(
      'select expenses.id, expenses.month, expenses.day, expenses.year, expenses.name, expenses.amount, expenses.budgetId '
      + 'from expenses '
      + 'inner join budgets on budgets.id = expenses.budgetId '
      + 'where expenses.budgetId = ?',
      [budgetId]
    );

    if (expenses) {
      let e: Expense[] = [];
      expenses.forEach(expense => {
        e.push(new Expense(expense.id, expense.month, expense.day, expense.year, expense.name, expense.amount, expense.budgetId));
      });
      return e;
    }
  }

  private async createExpense(expense: Expense): Promise<boolean> {
    return await this.run(
      'insert or ignore into expenses values(?, ?, ?, ?, ?, ?, ?)',
      [
        expense.id,
        expense.month,
        expense.day,
        expense.year,
        expense.name,
        expense.amount,
        expense.budgetId
      ]
    );
  }

  private async updateExpense(expense: Expense): Promise<boolean> {
    return await this.run('update expenses set month = ?, '
      + 'day = ?, '
      + 'year = ?, '
      + 'name = ?, '
      + 'amount = ? '
      + 'where id = ?',
      [
        expense.month,
        expense.day,
        expense.year,
        expense.name,
        expense.amount,
        expense.id
      ]
    );
  }

  private async deleteExpense(id: string): Promise<boolean> {
    return await this.run('delete from expenses where id = ?', [id]);
  }

  async run(sql: string, params: any[] = []): Promise<boolean> {
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