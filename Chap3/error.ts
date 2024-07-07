export class ArgumentNullError extends Error {
  constructor(argumentName: string) {
    super(`${argumentName}: ${argumentName} is null`);
  }
}

export class ArgumentError extends Error {
  constructor(message: string, argumentName: string) {
    super(`${argumentName}: ${message}`);
  }
}
