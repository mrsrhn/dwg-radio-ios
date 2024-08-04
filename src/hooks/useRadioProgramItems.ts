import { useMemo } from 'react';
import useProgram from '../api/history';
import { splitAndSortItemsByDate } from '../utils/splitItemsByDate';
import getTimeFromIsoDate from '../utils/getTimeFromIsoDate';
import useCurrentTime from './useCurrentTime';
import { indexForToday } from '../stores/programStore';

type ProgramItem = {
  id: string;
  title: string;
  artist: string;
  time: string;
  url: string;
  hasBeenPlayed: boolean;
};

const useRadioProgramItems = (
  selectedProgramIndex: number
): { programItems: ProgramItem[]; currentlyPlaying?: number } => {
  const history = useProgram();
  const currentTime = useCurrentTime();

  const isShowingProgramForToday = selectedProgramIndex === indexForToday;

  const splittedProgramItems = useMemo(
    () => splitAndSortItemsByDate(history?.data?.items ?? []),
    [history?.data?.items]
  );

  const currentlyPlaying = isShowingProgramForToday
    ? splittedProgramItems[selectedProgramIndex].findLastIndex(
        (item) => item.program_timestamp < currentTime.toISOString()
      )
    : undefined;

  const dataToDisplay = useMemo(
    () =>
      splittedProgramItems[selectedProgramIndex].map((item) => ({
        id: item.program_id,
        title: item.program_title,
        artist: item.program_author,
        time: getTimeFromIsoDate(item.program_timestamp),
        url: item.program_download,
        hasBeenPlayed: item.program_timestamp < currentTime.toISOString(),
      })),
    [splittedProgramItems, selectedProgramIndex, currentTime]
  );

  return { programItems: dataToDisplay, currentlyPlaying };
};

export default useRadioProgramItems;
