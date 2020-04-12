import {
  Token,
  Tokens,
  TokenSets,
  Operators,
  PostfixExpression,
  OperatorStack,
  OperatorToken,
} from '../types';

import { OPERATOR_PRECEDENCE } from './const';

export const addOperatorsToOutput = (
  output: PostfixExpression,
  operators: OperatorStack,
): [PostfixExpression, OperatorStack] => [
  [
    ...output,
    ...operators.reduceRight<OperatorStack>(
      (acc, operator: OperatorToken) => [...acc, operator],
      [],
    ),
  ],
  [],
];

export const previousOperatorTakesPrecedent = (
  previousOperator: Operators,
  nextOperator: Operators,
): Boolean =>
  OPERATOR_PRECEDENCE[previousOperator] <= OPERATOR_PRECEDENCE[nextOperator];

export const validateToken = (
  token: Token,
  expectedTokens: TokenSets,
): void => {
  switch (expectedTokens) {
    case TokenSets.OPERAND:
      if (token.name === Tokens.OPERAND) {
        return;
      }
      break;
    case TokenSets.OPERAND_OR_NOT:
      if (token.name === Tokens.OPERAND) {
        return;
      }
      if (token.value === Operators.NOT) {
        return;
      }
      break;
    case TokenSets.OPERATOR:
      if (token.name === Tokens.OPERATOR && token.value !== Operators.NOT) {
        return;
      }
      break;
  }
  throw new TypeError('Invalid token');
};
