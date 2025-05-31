export const log = (...args: unknown[]) => {
  console.log(...args);
  return args;
};

export const logWithMessage = (message: string, ...args: unknown[]) => {
  console.log(message, ...args);
  return args;
};
