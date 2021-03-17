
export abstract class ViewModel {

  constructor() {
    this.init();
  }

  protected init(): void {
    // May be overridden in subclass.
  }

}
