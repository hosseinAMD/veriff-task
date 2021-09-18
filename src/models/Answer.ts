export enum AnswerResult {
  YES = 'yes',
  NO = 'no',
}

export type Answer = Record<string, AnswerResult | undefined>;
