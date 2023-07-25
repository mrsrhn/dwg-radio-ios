import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from '../Colors';

interface InfoMenuButtonProps {
  title: string;
  onPress: () => void;
  iconName: string;
}
function InfoMenuButton({ title, onPress, iconName }: InfoMenuButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Ionicons name={iconName} color={Colors.dwgDarkColor} size={20} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    minHeight: 40,
    padding: 10,
    borderColor: Colors.dwgDarkColor,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'flex-start',
  },
  title: {
    color: Colors.dwgDarkColor,
    fontSize: 15,
  },
});
export default InfoMenuButton;
