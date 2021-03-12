export type Model = {toJSON: () => string};
export type ModelValues<T extends Model> = Omit<T, keyof Model>;
