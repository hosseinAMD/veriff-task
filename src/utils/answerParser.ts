import { Answer, AnswerResult, ServerAnswer } from 'models/Answer';

export const answerParser = (localObj: Answer): ServerAnswer => {
  const responsedChecks: ServerAnswer = Object.keys(localObj)
    .filter((key) => localObj[key] !== undefined)
    .map((key) => ({ checkId: key, result: localObj[key] as AnswerResult }));
  return responsedChecks;
};
