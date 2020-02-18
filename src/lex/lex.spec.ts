import { PROJECT_NAME } from '../const';
import { Tokens } from '../types';

import { lex } from './lex';
import {
  withAndOperator,
  withNestedParentheses,
  withOrOperator,
  withOrOperatorAnswer,
  withParentheses,
  withParenthesesAnswer,
  withNestedParenthesesAnswer,
  withNotOperator,
  withNotOperatorAnswer,
  withMultipleNestedNotOperators,
  withMultipleNestedNotOperatorsAnswer,
  withXorOperator,
  withXorOperatorAnswer,
  withSpacedParentheses,
  withSpacedParenthesesAnswer,
  withLineBreaks,
  withLineBreaksAnswer,
  withTrailingWhitespace,
  withTrailingWhitespaceAnswer,
  emptyString,
  whitespace,
  newLine,
  severalWhitespaces,
} from './testData';
import { lexEntireExpression } from './testUtils';

describe('lex', () => {
  test('should parse one token and return remaining string', () => {
    const result = lex(withAndOperator);

    expect(result).toEqual({
      token: {
        type: Tokens.VARIABLE,
        value: 'first',
      },
      remainingString: ' AND second',
    });
  });

  test('should parse an entire expression', () => {
    const result = lexEntireExpression(withOrOperator);

    expect(result).toEqual(withOrOperatorAnswer);
  });

  test('should lex a expressions with any sequence of tokens', () => {
    const tests = {
      [withParentheses]: withParenthesesAnswer,
      [withNestedParentheses]: withNestedParenthesesAnswer,
      [withNotOperator]: withNotOperatorAnswer,
      [withMultipleNestedNotOperators]: withMultipleNestedNotOperatorsAnswer,
      [withXorOperator]: withXorOperatorAnswer,
    };

    Object.entries(tests).forEach(([expression, response]) => {
      expect(lexEntireExpression(expression)).toEqual(response);
    });
  });

  test('should lex expressions in a range of formats', () => {
    const tests = {
      [withSpacedParentheses]: withSpacedParenthesesAnswer,
      [withLineBreaks]: withLineBreaksAnswer,
      [withTrailingWhitespace]: withTrailingWhitespaceAnswer,
    };

    Object.entries(tests).forEach(([expression, response]) => {
      expect(lexEntireExpression(expression)).toEqual(response);
    });
  });

  test('should throw if no token is found', () => {
    const tests = [emptyString, whitespace, severalWhitespaces, newLine];

    tests.forEach(expression => {
      expect(() => {
        lex(expression);
      }).toThrow(`Invalid ${PROJECT_NAME}: No tokens found`);
    });
  });
});
