import { add, sub } from 'date-fns';
import {
  FUTURE_DAYS_TO_SHOW,
  PASSED_DAYS_TO_SHOW,
} from '../stores/programStore';
import useCurrentTime from './useCurrentTime';

const useProgramDatesToShow = () => {
  const today = useCurrentTime();

  const firstDay = sub(today, { days: PASSED_DAYS_TO_SHOW });
  const days = Array.from(
    { length: PASSED_DAYS_TO_SHOW + FUTURE_DAYS_TO_SHOW + 1 },
    (_, i) => {
      const date = add(firstDay, { days: i });
      return date;
    }
  );

  return days;
};

export default useProgramDatesToShow;
