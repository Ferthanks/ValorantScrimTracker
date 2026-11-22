import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function PartidaItem({ partida, onDetalhes, onEditar, onDeletar }) {
    const venceu = partida.placarSeuTime > partida.placarOponente;
    const empatou = partida.placarSeuTime === partida.placarOponente;
    const corPlacar = venceu ? colors.success : empatou ? colors.textSecondary : colors.danger;

    return (
        <View style={styles.card}>
            <Pressable onPress={() => onDetalhes(partida)}>
                <View style={styles.cabecalho}>
                    <Text style={styles.mapa}>{partida.mapa}</Text>
                    <Text style={styles.data}>{partida.dataPartida}</Text>
                </View>

                <View style={styles.placarRow}>
                    <Text style={styles.oponente}>vs {partida.oponente}</Text>
                    <Text style={[styles.placar, { color: corPlacar }]}>
                        {partida.placarSeuTime} x {partida.placarOponente}
                    </Text>
                </View>
            </Pressable>

            <View style={styles.acoes}>
                <Pressable
                    style={[styles.botao, styles.botaoDetalhes]}
                    onPress={() => onDetalhes(partida)}
                >
                    <Text style={styles.textoBotao}>Detalhes</Text>
                </Pressable>

                <Pressable
                    style={[styles.botao, styles.botaoEditar]}
                    onPress={() => onEditar(partida)}
                >
                    <Text style={styles.textoBotao}>Editar</Text>
                </Pressable>

                <Pressable
                    style={[styles.botao, styles.botaoExcluir]}
                    onPress={() => onDeletar(partida.id)}
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
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: colors.secondary,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapa: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    data: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    placarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 12,
    },
    oponente: {
        fontSize: 15,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    placar: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    acoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 10,
    },
    botao: {
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    botaoDetalhes: {
        backgroundColor: colors.primary,
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