type PrimeNgTableFilters = { [key: string]: { value: any, matchMode: string } };

export class PrimeNgUtil {
  static ngPrimeTableFiltersToParams(filters: PrimeNgTableFilters): { [key: string]: string } {
    let params: { [key: string]: string } = {};

    Object.keys(filters).forEach(key => {
      let filterObject = filters[key];
      let value = filterObject.value;
      let matchMode = filterObject.matchMode;
      if(value == undefined) return;
      if(matchMode == 'between') {
        params[key + 'From'] = value[0];
        params[key + 'To'] = value[1];
      } else {
        params[key] = value;
      }
    });
    return params;
  }
}
