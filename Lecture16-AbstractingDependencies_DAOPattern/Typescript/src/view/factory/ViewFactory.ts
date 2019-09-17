import { IViewFactory } from './IViewFactory';
import { IView } from '../IView';
import { MainView } from '../main/MainView';
import { NewBudgetView } from '../new_budget/NewBudgetView';
import { UpdateBudgetView } from '../update_budget/UpdateBudgetView';
import { IncomeView } from '../income/IncomeView';
import { ExpenseView } from '../expense/ExpenseView';

export class ViewFactory implements IViewFactory {
  make(type: string): IView | undefined {
    if (type === 'main') {
      return new MainView();
    } else if (type === 'new_budget') {
      return new NewBudgetView();
    } else if (type === 'update_budget') {
      return new UpdateBudgetView();
    } else if (type === 'income') {
      return new IncomeView();
    } else if (type === 'expense') {
      return new ExpenseView();
    }
  }
}