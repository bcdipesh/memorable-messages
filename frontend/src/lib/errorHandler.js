class ErrorHandler extends Error {
  /**
   * Creates a custom error object with additional information.
   *
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} message - The human-readable error message.
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
