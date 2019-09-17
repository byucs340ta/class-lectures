import { IView } from "../IView";

export interface IViewFactory {
  make(type: string): IView | undefined;
}