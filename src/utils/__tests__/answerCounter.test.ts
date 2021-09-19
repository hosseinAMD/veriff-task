import { answerCounter } from 'utils/answerCounter';
import {
  EMPTY_COUNTER_RESULT,
  MOCK_OBJ_FILLED,
  MOCK_OBJ_IMPERFECT,
  VALUED_COUNTER_RESULT,
} from 'utils/test-mocks/answer';

describe('answerCunter', () => {
  test('should return zero for both values for empty object', () => {
    expect(answerCounter({})).toEqual(EMPTY_COUNTER_RESULT);
  });

  test('should return correct value for filled object', () => {
    expect(answerCounter(MOCK_OBJ_FILLED)).toEqual(VALUED_COUNTER_RESULT);
  });

  test('should return correct value for imperfect object', () => {
    expect(answerCounter(MOCK_OBJ_IMPERFECT)).toEqual(VALUED_COUNTER_RESULT);
  });
});
