export interface WithId {
  id: string;
}

export abstract class Collection<T extends WithId> {
  private collection: T[] = [];

  getAll(): T[] {
    return this.collection;
  }

  length(): number {
    return this.collection.length;
  }

  find(cb: (value: T) => boolean): T | undefined {
    return this.collection.find(cb);
  }

  add(element: T): void {
    this.collection.push(element);
  }

  update(id: string, change: Partial<T>) {
    this.collection = this.collection.map((element) =>
      element.id === id ? { ...element, ...change } : element,
    );
  }

  remove(id: string): void {
    this.collection = this.collection.filter((element) => element.id !== id);
  }

  removeBy(cb: (value: T) => boolean): void {
    this.collection = this.collection.filter(cb);
  }
}
