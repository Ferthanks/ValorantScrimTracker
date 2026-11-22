import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    Alert,
    StyleSheet,
} from 'react-native';
import api from '../services/api';
import { colors } from '../theme';

export default function PartidaFormScreen({ navigation, route }) {
    const partidaEditar = route.params?.partida;

    const [mapa, setMapa] = useState(partidaEditar ? partidaEditar.mapa : '');
    const [oponente, setOponente] = useState(partidaEditar ? partidaEditar.oponente : '');
    const [dataPartida, setDataPartida] = useState(
        partidaEditar ? partidaEditar.dataPartida : '2026-11-22'
    );
    const [placarSeuTime, setPlacarSeuTime] = useState(
        partidaEditar ? String(partidaEditar.placarSeuTime) : '0'
    );
    const [placarOponente, setPlacarOponente] = useState(
        partidaEditar ? String(partidaEditar.placarOponente) : '0'
    );

    async function salvar() {
        if (mapa === '' || oponente === '' || dataPartida === '') {
            Alert.alert('Atenção', 'Preencha mapa, oponente e data!');
            return;
        }

        const dadosPartida = {
            mapa: mapa,
            oponente: oponente,
            dataPartida: dataPartida,
            placarSeuTime: Number(placarSeuTime),
            placarOponente: Number(placarOponente),
        };

        try {
            if (partidaEditar) {
                await api.put(`/partidas/${partidaEditar.id}`, dadosPartida);
                Alert.alert('Sucesso', 'Partida atualizada!');
            } else {
                await api.post('/partidas', dadosPartida);
                Alert.alert('Sucesso', 'Partida cadastrada!');
            }
            navigation.goBack();
        } catch (error) {
            const mensagem =
                error.response?.data?.mensagem ||
                'Erro ao salvar partida. Verifique a data (AAAA-MM-DD).';
            Alert.alert('Erro', mensagem);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Mapa</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Ascent, Haven, Bind..."
                value={mapa}
                onChangeText={setMapa}
            />

            <Text style={styles.label}>Time Oponente</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: LOUD Academy"
                value={oponente}
                onChangeText={setOponente}
            />

            <Text style={styles.label}>Data da Partida (AAAA-MM-DD)</Text>
            <TextInput
                style={styles.input}
                placeholder="2026-11-22"
                value={dataPartida}
                onChangeText={setDataPartida}
            />

            <View style={styles.linhaPlacar}>
                <View style={styles.colunaPlacar}>
                    <Text style={styles.label}>Placar Seu Time</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={placarSeuTime}
                        onChangeText={setPlacarSeuTime}
                    />
                </View>

                <View style={styles.colunaPlacar}>
                    <Text style={styles.label}>Placar Oponente</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={placarOponente}
                        onChangeText={setPlacarOponente}
                    />
                </View>
            </View>

            <Pressable style={styles.botaoSalvar} onPress={salvar}>
                <Text style={styles.textoBotaoSalvar}>Salvar Partida</Text>
            </Pressable>
        </ScrollView>
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
    linhaPlacar: {
        flexDirection: 'row',
        gap: 12,
    },
    colunaPlacar: {
        flex: 1,
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