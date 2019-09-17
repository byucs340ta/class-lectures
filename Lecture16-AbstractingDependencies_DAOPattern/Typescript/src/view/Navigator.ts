import { ViewFactory } from "./factory/ViewFactory";

export class Navigator {
  static views: any[] = [];

  static push(type: string, args?: any): void {
    let viewFactory = new ViewFactory();
    let view = viewFactory.make(type);
    if (view) {
      let map = [view, args];
      this.views.push(map);
      view.start(args);
    }
  }

  static pop(): void {
    if (this.views.length > 1) {
      this.views.pop();
      let map = this.views.pop();
      this.views.push(map!);

      let view = map[0];
      let args = map[1];

      view.start(args);
    }
  }
}