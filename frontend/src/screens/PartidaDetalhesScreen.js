import React, { useState, useEffect } from 'react';
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

export default function PartidaDetalhesScreen({ route }) {
    const { partida } = route.params;

    const [rounds, setRounds] = useState([]);
    const [estatisticas, setEstatisticas] = useState([]);
    const [jogadores, setJogadores] = useState([]);

    // Campos de Estatística
    const [jogadorId, setJogadorId] = useState(null);
    const [agente, setAgente] = useState('');
    const [kills, setKills] = useState('');
    const [deaths, setDeaths] = useState('');
    const [assists, setAssists] = useState('');

    // Campos de Round
    const [numeroRound, setNumeroRound] = useState('');
    const [lado, setLado] = useState('');
    const [vencedor, setVencedor] = useState('');
    const [tipoCompra, setTipoCompra] = useState('');

    async function carregarDados() {
        try {
            const resRounds = await api.get(`/partidas/${partida.id}/rounds`);
            const resStats = await api.get(`/partidas/${partida.id}/estatisticas`);
            const resJogadores = await api.get('/jogadores');

            setRounds(resRounds.data);
            setEstatisticas(resStats.data);
            setJogadores(resJogadores.data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados da partida.');
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    async function salvarEstatistica() {
        if (!jogadorId || agente === '') {
            Alert.alert('Atenção', 'Selecione um jogador e digite o agente.');
            return;
        }

        try {
            await api.post(`/partidas/${partida.id}/estatisticas`, {
                jogador: { id: jogadorId },
                agente: agente,
                kills: Number(kills) || 0,
                deaths: Number(deaths) || 0,
                assists: Number(assists) || 0,
            });
            setAgente('');
            setKills('');
            setDeaths('');
            setAssists('');
            carregarDados();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar estatística.');
        }
    }

    async function excluirEstatistica(id) {
        await api.delete(`/estatisticas/${id}`);
        carregarDados();
    }

    async function salvarRound() {
        if (numeroRound === '' || lado === '' || vencedor === '') {
            Alert.alert('Atenção', 'Preencha número, lado e vencedor do round.');
            return;
        }

        try {
            await api.post(`/partidas/${partida.id}/rounds`, {
                numeroRound: Number(numeroRound),
                lado: lado,
                vencedor: vencedor,
                tipoCompra: tipoCompra || 'Armado',
            });
            setNumeroRound('');
            setLado('');
            setVencedor('');
            setTipoCompra('');
            carregarDados();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar round.');
        }
    }

    async function excluirRound(id) {
        await api.delete(`/rounds/${id}`);
        carregarDados();
    }

    return (
        <ScrollView style={styles.container}>
            {/* Resumo da Partida */}
            <View style={styles.headerCard}>
                <Text style={styles.headerTitulo}>
                    {partida.mapa} vs {partida.oponente}
                </Text>
                <Text style={styles.headerPlacar}>
                    {partida.placarSeuTime} x {partida.placarOponente}
                </Text>
            </View>

            {/* ESTATÍSTICAS */}
            <Text style={styles.secao}>Estatísticas</Text>
            {estatisticas.map((item) => (
                <View key={item.id} style={styles.item}>
                    <Text>
                        {item.jogador?.nickname} ({item.agente}) - {item.kills}/{item.deaths}/{item.assists}
                    </Text>
                    <Pressable onPress={() => excluirEstatistica(item.id)}>
                        <Text style={styles.excluir}>Excluir</Text>
                    </Pressable>
                </View>
            ))}

            <View style={styles.box}>
                <Text style={styles.label}>Escolha o Jogador:</Text>
                <View style={styles.linha}>
                    {jogadores.map((j) => (
                        <Pressable
                            key={j.id}
                            style={[styles.chip, jogadorId === j.id && styles.chipAtivo]}
                            onPress={() => setJogadorId(j.id)}
                        >
                            <Text style={jogadorId === j.id ? styles.textoBranco : null}>
                                {j.nickname}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Agente (ex: Jett)"
                    value={agente}
                    onChangeText={setAgente}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Kills"
                    keyboardType="numeric"
                    value={kills}
                    onChangeText={setKills}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Deaths"
                    keyboardType="numeric"
                    value={deaths}
                    onChangeText={setDeaths}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Assists"
                    keyboardType="numeric"
                    value={assists}
                    onChangeText={setAssists}
                />

                <Pressable style={styles.botao} onPress={salvarEstatistica}>
                    <Text style={styles.textoBranco}>Adicionar Estatística</Text>
                </Pressable>
            </View>

            {/* ROUNDS */}
            <Text style={styles.secao}>Rounds</Text>
            {rounds.map((r) => (
                <View key={r.id} style={styles.item}>
                    <Text>
                        Round {r.numeroRound}: {r.vencedor} ({r.lado} - {r.tipoCompra})
                    </Text>
                    <Pressable onPress={() => excluirRound(r.id)}>
                        <Text style={styles.excluir}>Excluir</Text>
                    </Pressable>
                </View>
            ))}

            <View style={[styles.box, { marginBottom: 30 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Número do Round (ex: 1)"
                    keyboardType="numeric"
                    value={numeroRound}
                    onChangeText={setNumeroRound}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Lado (Ataque ou Defesa)"
                    value={lado}
                    onChangeText={setLado}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Vencedor (Seu Time ou Oponente)"
                    value={vencedor}
                    onChangeText={setVencedor}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Compra (Pistol, Eco, Armado)"
                    value={tipoCompra}
                    onChangeText={setTipoCompra}
                />

                <Pressable style={styles.botao} onPress={salvarRound}>
                    <Text style={styles.textoBranco}>Adicionar Round</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 16 },
    headerCard: { backgroundColor: colors.secondary, padding: 16, borderRadius: 8, alignItems: 'center' },
    headerTitulo: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    headerPlacar: { color: colors.primary, fontSize: 26, fontWeight: 'bold', marginTop: 4 },
    secao: { fontSize: 18, fontWeight: 'bold', marginTop: 18, marginBottom: 8, color: colors.text },
    item: { backgroundColor: colors.card, padding: 12, borderRadius: 8, marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between' },
    excluir: { color: colors.danger, fontWeight: 'bold' },
    box: { backgroundColor: colors.card, padding: 12, borderRadius: 8, marginTop: 6 },
    label: { fontWeight: 'bold', marginBottom: 6 },
    linha: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
    chip: { padding: 8, borderRadius: 6, borderWidth: 1, borderColor: colors.border },
    chipAtivo: { backgroundColor: colors.secondary, borderColor: colors.secondary },
    input: { borderWidth: 1, borderColor: colors.border, borderRadius: 6, padding: 8, marginBottom: 8 },
    botao: { backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
    textoBranco: { color: '#FFF', fontWeight: 'bold' },
});