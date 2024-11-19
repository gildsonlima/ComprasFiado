import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { List, Divider, IconButton, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VendasScreen({ navigation }) {
  const [vendas, setVendas] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const todasVendas = JSON.parse(await AsyncStorage.getItem('vendas')) || [];
      const todosClientes = JSON.parse(await AsyncStorage.getItem('clientes')) || [];
      setVendas(todasVendas);
      setClientes(todosClientes);
    };
    carregarDados();
  }, []);

  const marcarComoPaga = async (id) => {
    try {
      const todasVendas = JSON.parse(await AsyncStorage.getItem('vendas')) || [];
      const index = todasVendas.findIndex(venda => venda.id === id);
      if (index !== -1) {
        todasVendas[index].paga = true;
        await AsyncStorage.setItem('vendas', JSON.stringify(todasVendas));
        setVendas(todasVendas);
        Alert.alert('Sucesso', 'Venda marcada como paga!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível marcar a venda como paga.');
    }
  };

  const obterNomeCliente = (clienteId) => {
    const cliente = clientes.find(cliente => cliente.id === clienteId);
    return cliente ? cliente.nome : 'Cliente desconhecido';
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <List.Item
              style={{ backgroundColor: item.paga ? '#e0f2f1' : '#fff' }}
              title={item.produto}
              description={`Cliente: ${obterNomeCliente(item.clienteId)}\nValor: ${item.valor}\nQuantidade: ${item.quantidade}\nData Prevista: ${item.dataPrevista}\nPaga: ${item.paga ? 'Sim' : 'Não'}`}
              descriptionNumberOfLines={5}
              right={props => (
                item.paga ? (
                  <IconButton icon="check" color="green" />
                ) : (
                  <Button onPress={() => marcarComoPaga(item.id)}>Marcar como Paga</Button>
                )
              )}
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