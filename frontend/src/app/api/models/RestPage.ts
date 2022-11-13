export class RestPage<T> {
  content: Array<T> = [];
  totalElements: number = 0;
  totalPages: number = 0;
  number: number = 0;
  numberOfElement: number = 0;
  size: number = 0;
  empty: boolean = true;
  first: boolean = false;
  last: boolean = false;
}
