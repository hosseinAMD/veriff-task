import { enStrings } from './en';

const translate = (key: string) => {
  return enStrings[key] || key;
};

export default translate;
