import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { User } from '@/utils/userHelpers';

import { UserCard } from './UserCard';

interface Props {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  onRefresh: () => void;
  header?: React.ReactNode;
}

export function UserList({ users, status, error, onRefresh, header }: Props) {
  const isLoading = status === 'loading' && users.length === 0;
  const isRefreshing = status === 'loading' && users.length > 0;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={styles.helperText}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Ocurrió un error al cargar los usuarios.'}</Text>
        <Text style={styles.helperText} onPress={onRefresh}>
          Toca para reintentar
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <UserCard user={item} />}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={<Text style={styles.helperText}>No hay usuarios cargados.</Text>}
      ListHeaderComponent={header}
      contentContainerStyle={[styles.listContent, users.length === 0 ? styles.centered : undefined]}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  helperText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  errorText: {
    color: '#DC2626',
    fontWeight: '600',
    textAlign: 'center',
  },
});
