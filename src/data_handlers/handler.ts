export interface TableHandler<T> {
  dropTable(): void;
  createTable(): void;
  get(): T[];
  getById(id: number): T;
  insert(data: T): void;
  update(data: T): void;
  deleteById(id: number): void;
}
