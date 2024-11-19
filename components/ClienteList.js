// components/ClienteList.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClienteList({ navigation }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const carregarClientes = async () => {
      const clientes = JSON.parse(await AsyncStorage.getItem('clientes')) || [];
      setClientes(clientes);
    };
    carregarClientes();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <List.Item
              title={item.nome}
              description={`Telefone: ${item.telefone}\nEndereço: ${item.endereco}`}
              left={props => <List.Icon {...props} icon="account" />}
              onPress={() => navigation.navigate('VendasCliente', { cliente: item })}
            />
            <Divider />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});