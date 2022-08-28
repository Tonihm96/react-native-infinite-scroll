import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  email: string;
}

export function UserItem({ name, email }: Props) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
});
