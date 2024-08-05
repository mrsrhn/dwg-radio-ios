import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../Colors';
import useConfig from '../hooks/useConfig';
import HistoryViewItem from './HistoryViewItem';

import { Ionicons } from '@expo/vector-icons';

import { getStringsForProgramHeader } from '../utils/splitItemsByDate';
import useStores from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { indexForLastDay } from '../stores/programStore';
import useRadioProgramItems from '../hooks/useRadioProgramItems';

const ProgramView = observer(() => {
  const { configStrings } = useConfig();
  const { programStore } = useStores();
  const { programItems, currentlyPlaying } = useRadioProgramItems(
    programStore.radioProgramToDisplay
  );

  const { previousDayString, selectedDayString, nextDayString } =
    getStringsForProgramHeader(programStore.radioProgramToDisplay);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{configStrings.program}</Text>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButtonContainer}
          onPress={() => programStore.updateRadioProgramToDisplay('backward')}
        >
          <View style={styles.chevronContainer}>
            {programStore.radioProgramToDisplay !== 0 && (
              <Ionicons
                name="chevron-back-outline"
                color={Colors.dwgDarkColor}
                size={20}
              />
            )}
          </View>
          <Text style={styles.date}>{previousDayString}</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.date}>
            {programStore.isShowingProgramForToday
              ? configStrings.today
              : selectedDayString}
          </Text>
        </View>
        <Pressable
          style={styles.forwardButtonContainer}
          onPress={() => programStore.updateRadioProgramToDisplay('forward')}
        >
          <Text style={styles.date}>{nextDayString}</Text>
          <View style={styles.chevronContainer}>
            {programStore.radioProgramToDisplay !== indexForLastDay && (
              <Ionicons
                name="chevron-forward-outline"
                color={Colors.dwgDarkColor}
                size={20}
              />
            )}
          </View>
        </Pressable>
      </View>
      {programItems.map((item, index) => (
        <View key={item.id}>
          <HistoryViewItem
            title={item.title}
            artist={item.artist}
            time={item.time}
            hasBeenPlayed={item.hasBeenPlayed}
            url={item.url}
            highlighted={index === currentlyPlaying}
          />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.dwgBackgroundColor,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevronContainer: { width: 20 },
  titleContainer: { alignItems: 'center' },
  title: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.dwgDarkColor,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: Colors.dwgDarkColor,
    alignItems: 'center',
  },
  backButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  forwardButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default ProgramView;
