import { IMainView } from "./IMainView";
import { IMainPresenter } from "../../presenter/main/IMainPresenter";
import { MainPresenter } from "../../presenter/main/MainPresenter";
import { Navigator } from "../Navigator";

export class MainView implements IMainView {
  mainPresenter?: IMainPresenter;

  private rl = require('readline-sync');

  start(args: any): void {
    this.mainPresenter = new MainPresenter(this);

    this.displayOptions();
  }

  displayOptions(): void {
    console.log('\n######### HOME #########\n');
    console.log('1. Make a new budget');
    console.log('2. Update an existing budget');
    console.log('3. Quit');

    let selection = this.rl.question('Your selection: ');
    this.mainPresenter!.optionSelected(selection);
  }

  navigate(to: string): void {
    Navigator.push(to);
  }
}