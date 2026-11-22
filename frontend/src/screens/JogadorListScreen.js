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
import JogadorItem from '../components/JogadorItem';
import { colors } from '../theme';

export default function JogadorListScreen({ navigation }) {
    const [jogadores, setJogadores] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState('');
    const [direcao, setDirecao] = useState('asc');

    async function carregarJogadores() {
        try {
            const response = await api.get('/jogadores', {
                params: {
                    nickname: busca,
                    ordenarPor: 'nickname',
                    direcao: direcao,
                },
            });
            setJogadores(response.data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os jogadores.');
        } finally {
            setCarregando(false);
        }
    }

    // Atualiza a lista sempre que a busca ou a ordenação mudar
    useEffect(() => {
        carregarJogadores();
    }, [busca, direcao]);

    // Recarrega a lista quando voltar da tela de cadastro/edição
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregarJogadores();
        });
        return unsubscribe;
    }, [navigation]);

    function excluirJogador(id) {
        Alert.alert('Excluir Jogador', 'Tem certeza que deseja excluir?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                onPress: async () => {
                    try {
                        await api.delete(`/jogadores/${id}`);
                        carregarJogadores();
                    } catch (error) {
                        Alert.alert('Erro', 'Não foi possível excluir o jogador.');
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
                onPress={() => navigation.navigate('JogadorForm')}
            >
                <Text style={styles.textoBotaoNovo}>+ Novo Jogador</Text>
            </Pressable>

            <TextInput
                style={styles.input}
                placeholder="Pesquisar por nickname..."
                value={busca}
                onChangeText={setBusca}
            />

            <View style={styles.linhaOrdenacao}>
                <Pressable
                    style={[styles.botaoOrdem, direcao === 'asc' && styles.botaoOrdemAtivo]}
                    onPress={() => setDirecao('asc')}
                >
                    <Text style={[styles.textoOrdem, direcao === 'asc' && styles.textoOrdemAtivo]}>
                        Ordenar A - Z
                    </Text>
                </Pressable>

                <Pressable
                    style={[styles.botaoOrdem, direcao === 'desc' && styles.botaoOrdemAtivo]}
                    onPress={() => setDirecao('desc')}
                >
                    <Text style={[styles.textoOrdem, direcao === 'desc' && styles.textoOrdemAtivo]}>
                        Ordenar Z - A
                    </Text>
                </Pressable>
            </View>

            <FlatList
                data={jogadores}
                keyExtractor={(item) => String(item.id)}
                ListEmptyComponent={
                    <Text style={styles.textoVazio}>Nenhum jogador cadastrado.</Text>
                }
                renderItem={({ item }) => (
                    <JogadorItem
                        jogador={item}
                        onEditar={(jogador) => navigation.navigate('JogadorForm', { jogador })}
                        onDeletar={(id) => excluirJogador(id)}
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