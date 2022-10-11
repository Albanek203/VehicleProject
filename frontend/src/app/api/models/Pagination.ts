export class Pagination {
  page: number;
  size: number;
  sort: string;

  constructor(page: number = 0, size: number = 10, sort: string = '') {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  static fromPrimeNg(primeNgEvent: any): Pagination {
    let pagination = new Pagination();
    pagination.page = primeNgEvent.first ? primeNgEvent.first / primeNgEvent.rows : 0;
    pagination.size = primeNgEvent.rows;
    if(primeNgEvent.sortField) pagination.sort = `${ primeNgEvent.sortField },${ primeNgEvent.sortOrder > 0 ? 'ASC' : 'DESC' }`
    return pagination;
  }
}
