import { Answer, AnswerResult } from 'models/Answer';

export interface AnswerCounterResult {
  yesCounts: number;
  noCounts: number;
}

export const answerCounter = (answers: Answer): AnswerCounterResult => {
  let yesCounts = 0;
  let noCounts = 0;
  const values = Object.values(answers).filter((item) => item !== undefined);
  values.forEach((val) => {
    if (val === AnswerResult.NO) noCounts += 1;
    if (val === AnswerResult.YES) yesCounts += 1;
  });
  return { yesCounts, noCounts };
};
