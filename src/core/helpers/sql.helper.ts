export class SqlHelper {
  static prepareQuery(query: string) {
    let i = 1;
    while (query.indexOf('?') !== -1) {
      query = query.replace('?', `$${i}`);
      i++;
    }

    return query;
  }
}
