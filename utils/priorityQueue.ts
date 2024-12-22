export class PriorityQueue<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.comparator = comparator;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  enqueue(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  dequeue(): T {
    const item = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return item;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (this.comparator(element, parent) >= 0) break;
      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  private bubbleDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild: T | undefined, rightChild: T | undefined;
      let swapIndex = -1;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.comparator(leftChild, element) < 0) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === -1 && this.comparator(rightChild, element) < 0) ||
          (swapIndex !== -1 && this.comparator(rightChild, leftChild!) < 0)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === -1) break;
      this.heap[index] = this.heap[swapIndex];
      index = swapIndex;
    }
    this.heap[index] = element;
  }
}
