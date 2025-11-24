import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';

interface Props {
  onSubmit: (payload: { name: string; job: string }) => void;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  successMessage?: string | null;
  onSuccessHandled: () => void;
}

export function UserForm({ onSubmit, status, error, successMessage, onSuccessHandled }: Props) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    if (status === 'succeeded' && successMessage) {
      setName('');
      setJob('');
      const timeout = setTimeout(onSuccessHandled, 2500);
      return () => clearTimeout(timeout);
    }
  }, [status, successMessage, onSuccessHandled]);

  const handleSubmit = () => {
    if (name.trim() && job.trim() && status !== 'loading') {
      onSubmit({ name: name.trim(), job: job.trim() });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear usuario de prueba</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Rol o puesto"
        value={job}
        onChangeText={setJob}
        style={styles.input}
        autoCapitalize="sentences"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {status === 'succeeded' && successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <Pressable style={[styles.button, status === 'loading' && styles.buttonDisabled]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{status === 'loading' ? 'Creando...' : 'Crear usuario'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 16,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  errorText: {
    color: '#DC2626',
  },
  successText: {
    color: '#16A34A',
    fontWeight: '600',
  },
});
