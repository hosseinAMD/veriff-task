import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import Button from 'components/button/';
import SectionLoader from 'components/section-loader';
import SwitchInput from 'components/switch-input';
import { useFetch } from 'hooks/use-fetch';
import { useSubmit } from 'hooks/use-submit';
import { Answer, AnswerResult } from 'models/Answer';
import { Check } from 'models/Check';
import { fetchChecks, submitCheckResults } from 'services/api';
import { answerParser } from 'utils/answerParser';
import { answerCounter } from 'utils/answerCounter';
import t from 'i18n';
import './home.css';

const Home: React.FC = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const resHanlder = useCallback((res: Check[]) => {
    const sortedChecks = res.sort((a, b) => a.priority - b.priority);
    setChecks(sortedChecks);
  }, []);

  const afterSubmitHandler = () => {
    setIsFormSubmitted(true);
  };

  const { loading, error, fetchApi } = useFetch(fetchChecks, resHanlder, true);
  const {
    loading: submitLoading,
    error: submitError,
    submit,
    reset,
  } = useSubmit(submitCheckResults, afterSubmitHandler);

  const onChange = (id: string, value: AnswerResult) => {
    reset();
    const clonedAnswers = { ...answers, [id]: value };
    const checkIndex = checks.findIndex((item) => item.id === id);
    for (let index = checkIndex + 1; index < checks.length; index++) {
      clonedAnswers[checks[index].id] = undefined;
    }
    setAnswers(clonedAnswers);
  };

  const isSubmitDisabled = useMemo(() => {
    const { yesCounts, noCounts } = answerCounter(answers);
    return !(yesCounts === checks.length || noCounts > 0);
  }, [answers, checks]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedAnswers = answerParser(answers);
    submit(parsedAnswers);
  };

  const handleResetForm = () => {
    setAnswers({});
    setIsFormSubmitted(false);
  };

  if (isFormSubmitted) {
    return (
      <div className="submitted">
        <p>{t('formSubmitted')}</p>
        <Button onClick={handleResetForm}>{t('reset')}</Button>
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
