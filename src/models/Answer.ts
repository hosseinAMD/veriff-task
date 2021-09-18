export enum AnswerResult {
  YES = 'yes',
  NO = 'no',
}

export type Answer = Record<string, AnswerResult | undefined>;

export type ServerAnswer = {
  checkId: string;
  result: AnswerResult;
}[];
