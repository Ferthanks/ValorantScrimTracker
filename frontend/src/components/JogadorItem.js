import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function JogadorItem({ jogador, onEditar, onDeletar }) {
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.nickname}>
                    {jogador.nickname} <Text style={styles.tag}>#{jogador.tag}</Text>
                </Text>
                <Text style={styles.funcao}>Função: {jogador.funcao}</Text>
            </View>

            <View style={styles.acoes}>
                <Pressable
                    style={[styles.botao, styles.botaoEditar]}
                    onPress={() => onEditar(jogador)}
                >
                    <Text style={styles.textoBotao}>Editar</Text>
                </Pressable>

                <Pressable
                    style={[styles.botao, styles.botaoExcluir]}
                    onPress={() => onDeletar(jogador.id)}
                >
                    <Text style={styles.textoBotao}>Excluir</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        paddingRight: 8,
    },
    nickname: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.text,
    },
    tag: {
        fontSize: 14,
        fontWeight: 'normal',
        color: colors.textSecondary,
    },
    funcao: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    acoes: {
        flexDirection: 'row',
        gap: 8,
    },
    botao: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    botaoEditar: {
        backgroundColor: colors.secondary,
    },
    botaoExcluir: {
        backgroundColor: colors.danger,
    },
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
});