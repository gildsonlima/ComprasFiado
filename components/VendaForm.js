import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VendaForm({ navigation }) {
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const adicionarVenda = async () => {
    try {
      const venda = { cliente, produto, valor, quantidade };
      const vendas = JSON.parse(await AsyncStorage.getItem('vendas')) || [];
      vendas.push(venda);
      await AsyncStorage.setItem('vendas', JSON.stringify(vendas));
      Alert.alert('Sucesso', 'Venda adicionada com sucesso!');
      navigation.navigate('Vendas');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a venda.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Cliente" value={cliente} onChangeText={setCliente} />
      <TextInput placeholder="Produto" value={produto} onChangeText={setProduto} />
      <TextInput placeholder="Valor" value={valor} onChangeText={setValor} />
      <TextInput placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} />
      <Button title="Adicionar Venda" onPress={adicionarVenda} />
    </View>
  );
}