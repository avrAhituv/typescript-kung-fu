import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export class Model<T extends Record<string, any> = any> {
  private model: Partial<T> = {};
  private readonly changes = new Subject<Partial<T>>();
  public readonly changes$ = this.changes.asObservable();

  withState(state: Partial<T>): Model<T> {
    this.model = Object.assign(this.model, state);
    this.changes.next(state);

    return this;
  }

  getFieldChanges(field: string): Observable<unknown>;
  getFieldChanges(fields: string[]): Observable<Partial<T>>;
  getFieldChanges(fields: string[] | string): Observable<unknown> | Observable<Partial<T>> {
    if (!Array.isArray(fields)) {
      return this.changes$.pipe(
        map(o => o[fields]),
        filter(o => o !== undefined),
      );
    }

    return this.changes$.pipe(
      filter(o => fields.some(k => o[k] !== undefined)),
    );
  }
}