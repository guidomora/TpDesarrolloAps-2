import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { createUser, fetchUsers, setPage, clearSuccess } from '@/features/users/usersSlice';
import { UserForm } from '@/components/users/UserForm';
import { UserList } from '@/components/users/UserList';
import { useAppDispatch, useAppSelector } from '@/store';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { items, status, error, page, totalPages, createStatus, createError, successMessage } = useAppSelector(
    (state) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handleCreateUser = (payload: { name: string; job: string }) => {
    dispatch(createUser(payload));
  };

  const handleRefresh = () => {
    dispatch(fetchUsers(page));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <UserList
          users={items}
          status={status}
          error={error}
          onRefresh={handleRefresh}
          header={
            <View style={styles.headerContent}>
              <Text style={styles.heading}>Gestor de Usuarios de Prueba</Text>
              <Text style={styles.subtitle}>
                Consume la API pública de reqres.in para listar usuarios y crear registros de prueba.
              </Text>

              <UserForm
                onSubmit={handleCreateUser}
                status={createStatus}
                error={createError}
                successMessage={successMessage}
                onSuccessHandled={() => dispatch(clearSuccess())}
              />

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Listado de usuarios</Text>
                <View style={styles.pagination}>
                  <Pressable
                    onPress={() => handlePageChange(page - 1)}
                    style={[styles.pageButton, page === 1 && styles.pageButtonDisabled]}
                    disabled={page === 1}>
                    <Text style={styles.pageButtonText}>Anterior</Text>
                  </Pressable>
                  <Text style={styles.pageIndicator}>
                    Página {page} de {totalPages}
                  </Text>
                  <Pressable
                    onPress={() => handlePageChange(page + 1)}
                    style={[styles.pageButton, page === totalPages && styles.pageButtonDisabled]}
                    disabled={page === totalPages}>
                    <Text style={styles.pageButtonText}>Siguiente</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContent: {
    gap: 12,
    paddingTop: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#475467',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  pageIndicator: {
    fontWeight: '600',
    color: '#475467',
  },
});
