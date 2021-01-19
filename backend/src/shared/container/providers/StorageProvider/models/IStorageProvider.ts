export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(ffile: string): Promise<void>;
}
