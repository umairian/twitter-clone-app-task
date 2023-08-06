class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default {
  generateErrorInstance({
    status,
    message,
  }: {
    status: number;
    message: string;
  }) {
    const error = new CustomError(message, status);
    return error;
  },
};
