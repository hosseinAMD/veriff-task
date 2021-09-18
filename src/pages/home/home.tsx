import SectionLoader from 'components/section-loader/section-loader';
import SwitchInput from 'components/switch-input/switch-input';
import { useFetch } from 'hooks/use-fetch';
import { Answer, AnswerResult } from 'models/Answer';
import { Check } from 'models/Check';
import React, { useCallback, useState } from 'react';
import { fetchChecks } from 'services/api';

const Home: React.FC = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [answers, setAnswers] = useState<Answer>({});

  const resHanlder = useCallback((res: Check[]) => {
    const sortedChecks = res.sort((a, b) => a.priority - b.priority);
    setChecks(sortedChecks);
  }, []);

  const { loading, error, fetchApi } = useFetch(fetchChecks, resHanlder, true);

  const onChange = (id: string, value: AnswerResult) => {
    setAnswers({ ...answers, [id]: value });
  };

  return (
    <div>
      <SectionLoader
        loading={loading}
        error={error}
        onTryAgain={fetchApi}
        render={() => (
          <div>
            {checks.map(({ id, description }) => (
              <SwitchInput
                key={id}
                id={id}
                description={description}
                value={answers[id]}
                onChange={onChange}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default Home;
