export enum AnswerResult {
  YES = 'yes',
  NO = 'no',
}

export interface Answer {
  checkId: string;
  result: AnswerResult;
}
