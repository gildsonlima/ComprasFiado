import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, List, Divider, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import 'react-native-get-random-values'; // Importar a configuração
import { v4 as uuidv4 } from 'uuid';

export default function VendasClienteScreen({ route, navigation }) {
  const { cliente } = route.params;
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataPrevista, setDataPrevista] = useState('');
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const carregarVendas = async () => {
      const todasVendas = JSON.parse(await AsyncStorage.getItem('vendas')) || [];
      const vendasCliente = todasVendas.filter(venda => venda.clienteId === cliente.id);
      setVendas(vendasCliente);
    };
    carregarVendas();
  }, []);

  const adicionarVenda = async () => {
    try {
      const venda = { id: uuidv4(), clienteId: cliente.id, produto, valor, quantidade, dataPrevista, paga: false };
      const todasVendas = JSON.parse(await AsyncStorage.getItem('vendas')) || [];
      todasVendas.push(venda);
      await AsyncStorage.setItem('vendas', JSON.stringify(todasVendas));
      setVendas([...vendas, venda]);
      setProduto('');
      setValor('');
      setQuantidade('');
      setDataPrevista('');
      Alert.alert('Sucesso', 'Venda adicionada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a venda.');
    }
  };

  const marcarComoPaga = async (id) => {
    try {
      const todasVendas = JSON.parse(await AsyncStorage.getItem('vendas')) || [];
      const index = todasVendas.findIndex(venda => venda.id === id);
      if (index !== -1) {
        todasVendas[index].paga = true;
        await AsyncStorage.setItem('vendas', JSON.stringify(todasVendas));
        setVendas(todasVendas.filter(venda => venda.clienteId === cliente.id));
        Alert.alert('Sucesso', 'Venda marcada como paga!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível marcar a venda como paga.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Produto"
        value={produto}
        onChangeText={setProduto}
        style={styles.input}
        mode="outlined"
      />
      <TextInputMask
        type={'money'}
        value={valor}
        onChangeText={setValor}
        customTextInput={TextInput}
        customTextInputProps={{
          label: 'Valor',
          mode: 'outlined',
          style: styles.input,
          keyboardType: 'numeric',
        }}
      />
      <TextInput
        label="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInputMask
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY'
        }}
        value={dataPrevista}
        onChangeText={setDataPrevista}
        customTextInput={TextInput}
        customTextInputProps={{
          label: 'Data Prevista de Pagamento',
          mode: 'outlined',
          style: styles.input,
          keyboardType: 'numeric',
        }}
      />
      <Button mode="contained" onPress={adicionarVenda} style={styles.button}>
        Adicionar Venda
      </Button>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <List.Item
              style={{ backgroundColor: item.paga ? '#e0f2f1' : '#fff' }}
              title={item.produto}
              description={`Valor: ${item.valor}\nQuantidade: ${item.quantidade}\nData Prevista: ${item.dataPrevista}\nPaga: ${item.paga ? 'Sim' : 'Não'}`}
              descriptionNumberOfLines={4}
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
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});