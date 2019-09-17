import { IView } from "../IView";

export interface IMainView extends IView {
  displayOptions(): void;
  navigate(to: string): void;
}