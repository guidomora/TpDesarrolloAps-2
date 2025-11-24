import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { Colors } from '@/constants/theme';
import { User } from '@/utils/userHelpers';

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  return (
    <View style={styles.card}>
      {user.avatar ? <Image source={{ uri: user.avatar }} style={styles.avatar} /> : <View style={styles.placeholder} />}
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        {user.email ? <Text style={styles.email}>{user.email}</Text> : null}
        {user.job ? <Text style={styles.job}>Puesto: {user.job}</Text> : null}
        {user.createdAt ? <Text style={styles.createdAt}>Creado: {new Date(user.createdAt).toLocaleString()}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  placeholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: Colors.light.icon,
    opacity: 0.25,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#11181C',
  },
  email: {
    color: '#55606D',
  },
  job: {
    color: Colors.light.tint,
    fontWeight: '500',
  },
  createdAt: {
    color: '#7a7a7a',
    fontSize: 12,
  },
});
