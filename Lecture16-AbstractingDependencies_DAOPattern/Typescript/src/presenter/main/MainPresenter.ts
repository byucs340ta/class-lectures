import { IMainPresenter } from "./IMainPresenter";
import { IMainView } from "../../view/main/IMainView";

export class MainPresenter implements IMainPresenter {
  mainView: IMainView;

  constructor(mainView: IMainView) {
    this.mainView = mainView;
  }

  optionSelected(selection: string): void {
    switch (selection) {
      case '1':
        this.mainView.navigate('new_budget');
        break;
      case '2':
        this.mainView.navigate('update_budget');
        break;
      case '3':
        process.exit(0);
        break;
      default:
        this.mainView.displayOptions();
        break;
    }
  }
}