import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  ListRenderItemInfo,
  ActivityIndicator
} from 'react-native';
import { UserItem } from '../../components/UserItem';

import { User, useUsers } from '../../hooks/users';

export function Home() {
  const { users, endReached, refreshing, requestUsers, refresh } = useUsers();

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return <UserItem name={item.profile.name} email={item.email} />;
  }

  function keyExtractor(item: User) {
    return item.id;
  }

  function onListEndReached() {
    !endReached && requestUsers();
  }

  useEffect(() => {
    requestUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User list</Text>
      </View>
      <FlatList
        style={styles.userList}
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={onListEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={!endReached && <ActivityIndicator size={50} />}
        ListFooterComponentStyle={styles.footerLoader}
      />
      <StatusBar backgroundColor='transparent' translucent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    backgroundColor: 'hsl(203, 92%, 19%);',
    height: 150,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  userList: {
    width: '100%'
  },
  footerLoader: { marginVertical: 20 }
});
