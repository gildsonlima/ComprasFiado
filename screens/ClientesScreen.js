import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClienteList from '../components/ClienteList';

export default function ClientesScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarClientes = async () => {
        const clientes = JSON.parse(await AsyncStorage.getItem('clientes')) || [];
        setClientes(clientes);
      };
      carregarClientes();
    }, [])
  );

  const limparDados = async () => {
    try {
      await AsyncStorage.removeItem('clientes');
      await AsyncStorage.removeItem('vendas');
      setClientes([]);
      Alert.alert('Sucesso', 'Dados limpos com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível limpar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate('ClienteForm')} style={styles.button}>
        Adicionar Cliente
      </Button>
      <ClienteList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 16,
  },
});