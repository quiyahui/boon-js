import { DELIMITERS, SPECIAL_CHARACTERS } from './const';

// TODO: Add tests to this function
export const findNextDelimiter = (expression: string): number => {
  const nextDelimiterIndex = expression
    .split('')
    .findIndex(char => DELIMITERS.has(char) || SPECIAL_CHARACTERS[char]);

  return nextDelimiterIndex === -1 ? expression.length : nextDelimiterIndex;
};
