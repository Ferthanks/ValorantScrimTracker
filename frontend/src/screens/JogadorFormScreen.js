import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    StyleSheet,
} from 'react-native';
import api from '../services/api';
import { colors } from '../theme';

export default function JogadorFormScreen({ navigation, route }) {
    // Se vier um jogador pelos parâmetros, estamos editando
    const jogadorEditar = route.params?.jogador;

    const [nickname, setNickname] = useState(jogadorEditar ? jogadorEditar.nickname : '');
    const [tag, setTag] = useState(jogadorEditar ? jogadorEditar.tag : '');
    const [funcao, setFuncao] = useState(jogadorEditar ? jogadorEditar.funcao : 'Duelista');

    async function salvar() {
        if (nickname === '' || tag === '' || funcao === '') {
            Alert.alert('Atenção', 'Preencha todos os campos!');
            return;
        }

        const dadosJogador = {
            nickname: nickname,
            tag: tag,
            funcao: funcao,
        };

        try {
            if (jogadorEditar) {
                await api.put(`/jogadores/${jogadorEditar.id}`, dadosJogador);
                Alert.alert('Sucesso', 'Jogador atualizado!');
            } else {
                await api.post('/jogadores', dadosJogador);
                Alert.alert('Sucesso', 'Jogador cadastrado!');
            }
            navigation.goBack();
        } catch (error) {
            const mensagem = error.response?.data?.mensagem || 'Erro ao salvar jogador.';
            Alert.alert('Erro', mensagem);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nickname</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Aspas"
                value={nickname}
                onChangeText={setNickname}
            />

            <Text style={styles.label}>Tag</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: BR1"
                value={tag}
                onChangeText={setTag}
            />

            <Text style={styles.label}>Função</Text>
            <View style={styles.grupoFuncoes}>
                {['Duelista', 'Iniciador', 'Controlador', 'Sentinela'].map((item) => (
                    <Pressable
                        key={item}
                        style={[styles.botaoFuncao, funcao === item && styles.botaoFuncaoAtivo]}
                        onPress={() => setFuncao(item)}
                    >
                        <Text style={[styles.textoFuncao, funcao === item && styles.textoFuncaoAtivo]}>
                            {item}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Pressable style={styles.botaoSalvar} onPress={salvar}>
                <Text style={styles.textoBotaoSalvar}>Salvar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    grupoFuncoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4,
    },
    botaoFuncao: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    botaoFuncaoAtivo: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },
    textoFuncao: {
        color: colors.text,
        fontWeight: 'bold',
    },
    textoFuncaoAtivo: {
        color: '#FFFFFF',
    },
    botaoSalvar: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    textoBotaoSalvar: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});