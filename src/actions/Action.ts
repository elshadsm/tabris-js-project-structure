
export interface Action {

  exec(arg1?: unknown, arg2?: unknown, arg3?: unknown, ...remaining: unknown[]): unknown;

}
