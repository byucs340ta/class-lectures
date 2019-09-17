import { IIncomePresenter } from "./IIncomePresenter";
import { IIncomeView } from "../../view/income/IIncomeView";
import { Budget } from "../../model/Budget";
import { Income } from "../../model/Income";
import { ConnectionFactory } from "../../database/ConnectionFactory";

export class IncomePresenter implements IIncomePresenter {
  incomeView: IIncomeView;
  budget: Budget;
  currIncome?: Income;
  editableIncome?: Income;

  constructor(incomeView: IIncomeView, args: any) {
    this.incomeView = incomeView;
    this.budget = <Budget>args;
  }

  async fetchIncome() {
    this.currIncome = await this.getIncome(this.budget.id!);
    if (this.currIncome) {
      this.editableIncome = new Income(this.currIncome.id, this.currIncome.projected, this.currIncome.actual);
    }
    this.incomeView.displayOptions();
  }

  optionSelected(selection: string): void {
    switch (selection) {
      case '1':
        if (this.currIncome) this.incomeView.displayIncome(this.currIncome);
        else this.incomeView.displayMessage("You don't have a saved income for this budget");
        this.incomeView.displayOptions();
        break;
      case '2':
        if (!this.editableIncome) this.editableIncome = new Income();
        this.incomeView.displayEditProjectedIncomePrompt(this.budget.month!, this.budget.year!);
        break;
      case '3':
        if (!this.editableIncome) this.editableIncome = new Income(this.budget.month!, this.budget.year!);
        this.incomeView.displayEditActualIncomePrompt(this.budget.month!, this.budget.year!);
        break;
      case '4':
        this.incomeView.displaySavePrompt(this.editableIncome ? this.editableIncome : new Income());
        break;
      case '5':
        this.incomeView.pop();
        break;
      default:
        this.incomeView.displayOptions();
        break;
    }
  }

  projectedIncomeSelected(income: number): void {
    this.editableIncome!.projected = income;
    this.incomeView.displayOptions();
  }

  actualIncomeSelected(income: number): void {
    this.editableIncome!.actual = income;
    this.incomeView.displayOptions();
  }

  async handleSave(answer: string) {
    if (!this.editableIncome) {
      this.incomeView.displayMessage("You haven't made any edits yet.");
      this.incomeView.displayOptions();
      return;
    }

    if (answer.toLowerCase() === 'y') {
      let message: string;
      if (!this.currIncome) {
        this.editableIncome.id = this.budget.id;
        let success = await this.createIncome(this.editableIncome);
        message = success ? 'Income created successfully' : 'Income creation failed';
      } else {
        let success = await this.createIncome(this.editableIncome);
        message = success ? 'Income updated successfully' : 'Income update failed';
      }
      this.currIncome = await this.getIncome(this.budget.id!);
      this.incomeView.displayMessage(message);
    }
    this.incomeView.displayOptions();
  }

  private async getIncome(id: string): Promise<Income | undefined> {
    let income = await this.getData<Income>(
      'select incomes.id, incomes.projected, incomes.actual '
      + 'from incomes '
      + 'where id = ?',
      [id]
    );

    if (income) {
      return new Income(income.id, income.projected, income.actual);
    }
  }

  private async createIncome(income: Income): Promise<boolean> {
    return await this.run(
      'insert or ignore into incomes values(?, ?, ?)',
      [
        income.id,
        income.projected,
        income.actual
      ]
    );
  }

  private async updateIncome(income: Income): Promise<boolean> {
    return await this.run('update incomes set projected = ?, '
      + 'actual = ?'
      + 'where id = ?',
      [
        income.projected,
        income.actual,
        income.id
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

  private async getData<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise(resolve => {
      ConnectionFactory.getConnection().get(sql, params, (err: any, result: T) => {
        if (err) {
          console.log(`Error running sql: ${sql}, Error: ${err}`);
          resolve();
        } else {
          resolve(result);
        }
      });
    });
  }
}