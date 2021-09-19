import { answerParser } from 'utils/answerParser';
import {
  MOCK_OBJ_FILLED,
  MOCK_OBJ_IMPERFECT,
  PARSED_OBJ,
} from 'utils/test-mocks/answer';

describe('answerParser', () => {
  test('should return empty array for empty object input', () => {
    expect(answerParser({})).toEqual([]);
  });

  test('should return array with same length and correct values for filled object input', () => {
    expect(answerParser(MOCK_OBJ_FILLED).length).toBe(2);
    expect(answerParser(MOCK_OBJ_FILLED)).toEqual(PARSED_OBJ);
  });

  test('should return array with correct length and correct values for imperfect object input', () => {
    expect(answerParser(MOCK_OBJ_IMPERFECT).length).toBe(2);
    expect(answerParser(MOCK_OBJ_IMPERFECT)).toEqual(PARSED_OBJ);
  });
});
