export const camelToSnake = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const snakeToCamel = (str: string): string => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());