import Button from 'components/button/button';
import SectionLoader from 'components/section-loader/section-loader';
import SwitchInput from 'components/switch-input/switch-input';
import { useFetch } from 'hooks/use-fetch';
import { Answer, AnswerResult } from 'models/Answer';
import { Check } from 'models/Check';
import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import { fetchChecks, submitCheckResults } from 'services/api';
import t from 'i18n';
import './home.css';
import { answerParser } from 'utils/answerParser';

const Home: React.FC = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const resHanlder = useCallback((res: Check[]) => {
    const sortedChecks = res.sort((a, b) => a.priority - b.priority);
    setChecks(sortedChecks);
  }, []);

  const { loading, error, fetchApi } = useFetch(fetchChecks, resHanlder, true);

  const onChange = (id: string, value: AnswerResult) => {
    setSubmitError('');
    const clonedAnswers = { ...answers, [id]: value };
    const checkIndex = checks.findIndex((item) => item.id === id);
    for (let index = checkIndex + 1; index < checks.length; index++) {
      clonedAnswers[checks[index].id] = undefined;
    }
    setAnswers(clonedAnswers);
  };

  const isSubmitDisabled = useMemo(() => {
    let yesCounts = 0;
    let noCounts = 0;
    const values = Object.values(answers).filter((item) => item !== undefined);
    values.forEach((val) => {
      if (val === AnswerResult.NO) noCounts += 1;
      if (val === AnswerResult.YES) yesCounts += 1;
    });
    return !(yesCounts === checks.length || noCounts > 0);
  }, [answers, checks]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedAnswers = answerParser(answers);
    setSubmitLoading(true);
    setSubmitError(undefined);
    submitCheckResults(parsedAnswers)
      .then(() => {
        setIsFormSubmitted(true);
        setSubmitLoading(false);
      })
      .catch(() => {
        setSubmitError(t('defaultError'));
        setSubmitLoading(false);
      });
  };

  const handleReset = () => {
    setAnswers({});
    setIsFormSubmitted(false);
  };

  if (isFormSubmitted) {
    return (
      <div className="submitted">
        <p>{t('formSubmitted')}</p>
        <Button onClick={handleReset}>{t('reset')}</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <SectionLoader
        loading={loading}
        error={error}
        onTryAgain={fetchApi}
        render={() => (
          <>
            {checks.map(({ id, description }, index) => {
              const prevCheck =
                index !== 0 ? answers[checks[index - 1].id] : AnswerResult.YES;
              return (
                <SwitchInput
                  key={id}
                  id={id}
                  description={description}
                  value={answers[id]}
                  disabled={prevCheck !== AnswerResult.YES}
                  onChange={onChange}
                />
              );
            })}
            <div className="form-control">
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                loading={submitLoading}
              >
                {t('submit')}
              </Button>
            </div>
          </>
        )}
      />
      {submitError && <p className="error">{submitError}</p>}
    </form>
  );
};

export default Home;
