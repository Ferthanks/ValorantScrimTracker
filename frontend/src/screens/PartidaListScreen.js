import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
    ActivityIndicator,
    Alert,
    StyleSheet,
} from 'react-native';
import api from '../services/api';
import PartidaItem from '../components/PartidaItem';
import { colors } from '../theme';

export default function PartidaListScreen({ navigation }) {
    const [partidas, setPartidas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [buscaOponente, setBuscaOponente] = useState('');
    const [direcao, setDirecao] = useState('desc');

    async function carregarPartidas() {
        try {
            const response = await api.get('/partidas', {
                params: {
                    oponente: buscaOponente,
                    ordenarPor: 'dataPartida',
                    direcao: direcao,
                },
            });
            setPartidas(response.data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as partidas.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarPartidas();
    }, [buscaOponente, direcao]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregarPartidas();
        });
        return unsubscribe;
    }, [navigation]);

    function excluirPartida(id) {
        Alert.alert('Excluir Partida', 'Tem certeza que deseja excluir esta partida?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                onPress: async () => {
                    try {
                        await api.delete(`/partidas/${id}`);
                        carregarPartidas();
                    } catch (error) {
                        Alert.alert('Erro', 'Não foi possível excluir a partida.');
                    }
                },
            },
        ]);
    }

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.botaoNovo}
                onPress={() => navigation.navigate('PartidaForm')}
            >
                <Text style={styles.textoBotaoNovo}>+ Nova Partida</Text>
            </Pressable>

            <TextInput
                style={styles.input}
                placeholder="Pesquisar por time oponente..."
                value={buscaOponente}
                onChangeText={setBuscaOponente}
            />

            <View style={styles.linhaOrdenacao}>
                <Pressable
                    style={[styles.botaoOrdem, direcao === 'desc' && styles.botaoOrdemAtivo]}
                    onPress={() => setDirecao('desc')}
                >
                    <Text style={[styles.textoOrdem, direcao === 'desc' && styles.textoOrdemAtivo]}>
                        Mais Recentes
                    </Text>
                </Pressable>

                <Pressable
                    style={[styles.botaoOrdem, direcao === 'asc' && styles.botaoOrdemAtivo]}
                    onPress={() => setDirecao('asc')}
                >
                    <Text style={[styles.textoOrdem, direcao === 'asc' && styles.textoOrdemAtivo]}>
                        Mais Antigas
                    </Text>
                </Pressable>
            </View>

            <FlatList
                data={partidas}
                keyExtractor={(item) => String(item.id)}
                ListEmptyComponent={
                    <Text style={styles.textoVazio}>Nenhuma partida registrada.</Text>
                }
                renderItem={({ item }) => (
                    <PartidaItem
                        partida={item}
                        onDetalhes={(partida) => navigation.navigate('PartidaDetalhes', { partida })}
                        onEditar={(partida) => navigation.navigate('PartidaForm', { partida })}
                        onDeletar={(id) => excluirPartida(id)}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    centralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoNovo: {
        backgroundColor: colors.primary,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    textoBotaoNovo: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    linhaOrdenacao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        gap: 8,
    },
    botaoOrdem: {
        flex: 1,
        backgroundColor: colors.card,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
    },
    botaoOrdemAtivo: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },
    textoOrdem: {
        color: colors.text,
        fontWeight: 'bold',
    },
    textoOrdemAtivo: {
        color: '#FFFFFF',
    },
    textoVazio: {
        textAlign: 'center',
        color: colors.textSecondary,
        marginTop: 30,
    },
});