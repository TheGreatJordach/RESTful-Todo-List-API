/**
 * HashAlgorithmInterface defines the contract for hashing algorithms.
 * It includes methods for hashing data and comparing data against a hashed value.
 *
 * @interface HashInterface
 */
export interface HashInterface {
  /**
   * Hashes the provided data.
   *
   * @param {string | Buffer} data - The data to be hashed. It can be a string or a Buffer.
   * @returns {Promise<string>} - A promise that resolves to the hashed string.
   *
   * @example
   * const hashAlgorithm: HashAlgorithmInterface = new SomeHashAlgorithm();
   * const data = "mySecretPassword";
   * hashAlgorithm.hashPassword(data).then((hashedData) => {
   *   console.log(`Hashed Data: ${hashedData}`);
   * }).catch((error) => {
   *   console.error(`Error hashing data: ${error}`);
   * });
   */
  hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Compares the provided data with an encrypted (hashed) string.
   *
   * @param {string | Buffer} data - The data to be compared. It can be a string or a Buffer.
   * @param {string} encrypt - The encrypted (hashed) string to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the data matches the encrypted string.
   *
   * @example
   * const hashAlgorithm: HashAlgorithmInterface = new SomeHashAlgorithm();
   * const data = "mySecretPassword";
   * const hashedData = "previouslyHashedData";
   * hashAlgorithm.comparePassword(data, hashedData).then((isMatch) => {
   *   if (isMatch) {
   *     console.log("Data matches the hashed value.");
   *   } else {
   *     console.log("Data does not match the hashed value.");
   *   }
   * }).catch((error) => {
   *   console.error(`Error comparing data: ${error}`);
   * });
   */
  comparePassword(data: string | Buffer, encrypt: string): Promise<boolean>;
}
