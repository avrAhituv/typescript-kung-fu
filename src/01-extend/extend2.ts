export type Model<TState> = TState & {
  withState<T>(state: T): Model<TState & T>;
}

export function createModel(): Model<unknown> {
  // object literal is good enough as an example
  return {
    withState<TState, T>(this: Model<TState>, state: T): Model<TState & T> {
      return Object.assign(this, state);
    },
  };
}
