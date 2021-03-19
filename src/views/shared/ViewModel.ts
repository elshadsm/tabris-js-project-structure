import { Properties } from 'tabris';
import { Constructor, Injector } from 'tabris-decorators';
import { Action } from '@actions/Action';

export abstract class ViewModel {

  constructor() {
    this.init();
  }

  protected init(): void {
    // May be overridden in subclass.
  }

  dispatch<
    SubActionConstructor extends Constructor<Action>,
    SubAction extends InstanceType<SubActionConstructor> = InstanceType<SubActionConstructor>
  >(
    constructor: SubActionConstructor,
    properties?: Properties<SubAction>
  ): SubAction {
    const instance = Injector.get(this).resolve(constructor);
    if (properties) {
      Object.assign(instance, properties);
    }
    instance.exec();
    return instance;
  }

}
