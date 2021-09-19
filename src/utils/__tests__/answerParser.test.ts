import { Answer, AnswerResult, ServerAnswer } from 'models/Answer';
import { answerParser } from 'utils/answerParser';

describe('answerParser', () => {
  const MOCK_OBJ_FILLED: Answer = {
    aaa: AnswerResult.YES,
    bbb: AnswerResult.NO,
  };
  const MOCK_OBJ_IMPERFECT: Answer = { ...MOCK_OBJ_FILLED, ccc: undefined };
  const PARSED_OBJ: ServerAnswer = [
    { checkId: 'aaa', result: AnswerResult.YES },
    { checkId: 'bbb', result: AnswerResult.NO },
  ];

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
