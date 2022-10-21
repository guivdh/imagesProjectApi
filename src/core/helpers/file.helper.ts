export class FileHelper {

  /**
   * Change the file extension
   * @param fileName
   * @param newExtension Ex: 'pdf'
   */
  static changeExtension(fileName: string, newExtension: string) {
    const nameSplitted = fileName.split('.');
    if (nameSplitted.length > 1) {
      nameSplitted[nameSplitted.length - 1] = newExtension;
      fileName = nameSplitted.join('.');
    } else {
      fileName = fileName + '.pdf';
    }
    return fileName;
  }
}