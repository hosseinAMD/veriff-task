import { Answer, AnswerResult, ServerAnswer } from 'models/Answer';
import { AnswerCounterResult } from 'utils/answerCounter';

export const MOCK_OBJ_FILLED: Answer = {
  aaa: AnswerResult.YES,
  bbb: AnswerResult.NO,
};

export const MOCK_OBJ_IMPERFECT: Answer = {
  ...MOCK_OBJ_FILLED,
  ccc: undefined,
};

export const PARSED_OBJ: ServerAnswer = [
  { checkId: 'aaa', result: AnswerResult.YES },
  { checkId: 'bbb', result: AnswerResult.NO },
];

export const EMPTY_COUNTER_RESULT: AnswerCounterResult = {
  yesCounts: 0,
  noCounts: 0,
};

export const VALUED_COUNTER_RESULT: AnswerCounterResult = {
  yesCounts: 1,
  noCounts: 1,
};
