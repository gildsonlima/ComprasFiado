import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VendaList() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const carregarVendas = async () => {
      const vendas = JSON.parse(await AsyncStorage.getItem('vendas')) || [];
      setVendas(vendas);
    };
    carregarVendas();
  }, []);

  return (
    <View>
      <FlatList
        data={vendas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Cliente: {item.cliente}</Text>
            <Text>Produto: {item.produto}</Text>
            <Text>Valor: {item.valor}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
          </View>
        )}
      />
    </View>
  );
}