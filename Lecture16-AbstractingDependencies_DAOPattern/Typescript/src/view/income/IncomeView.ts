import { IIncomeView } from "./IIncomeView";
import { Income } from "../../model/Income";
import { IIncomePresenter } from "../../presenter/income/IIncomePresenter";
import { IncomePresenter } from "../../presenter/income/IncomePresenter";
import { Navigator } from "../Navigator";

export class IncomeView implements IIncomeView {
  incomePresenter?: IIncomePresenter;

  private rl = require('readline-sync');

  start(args: any): void {
    this.incomePresenter = new IncomePresenter(this, args);
    this.incomePresenter.fetchIncome();
  }

  displayOptions(): void {
    console.log('\n######### Income #########\n');
    console.log('What would you like to do?');
    console.log('1. See current montly income');
    console.log('2. Edit projected income');
    console.log('3. Edit actual income');
    console.log('4. Save');
    console.log('5. Go back');

    let selection = this.rl.question('Your selection: ');
    this.incomePresenter!.optionSelected(selection);
  }

  displayIncome(income: Income): void {
    console.log(income.toString());
  }

  displayEditProjectedIncomePrompt(month: string, year: number): void {
    let income = this.rl.question(`What is your projected income for ${month} ${year}? `);
    this.incomePresenter!.projectedIncomeSelected(income);
  }

  displayEditActualIncomePrompt(month: string, year: number): void {
    let income = this.rl.question(`What is your actual income for ${month} ${year}? `);
    this.incomePresenter!.actualIncomeSelected(income);
  }

  displaySavePrompt(income: Income): void {
    let answer = this.rl.question(`Would you like to save this income:\n${income.toString()}\n(y/n)? `);
    this.incomePresenter!.handleSave(answer);
  }

  displayMessage(message: string): void {
    console.log(message);
  }

  pop(): void {
    Navigator.pop();
  }
}