
export type Model = { toJSON: () => JSONObject };
export type ModelValues<T extends Model> = Omit<T, keyof Model>;

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export type JSONArray = Array<JSONValue>;
