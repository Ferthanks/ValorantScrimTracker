package uel.br.valorantscrimtracker.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import uel.br.valorantscrimtracker.model.EstatisticaJogador;
import uel.br.valorantscrimtracker.model.Jogador;
import uel.br.valorantscrimtracker.model.Partida;
import uel.br.valorantscrimtracker.repository.EstatisticaJogadorRepository;

import java.util.List;

@Service
public class EstatisticaJogadorService {

    private final EstatisticaJogadorRepository estatisticaRepository;
    private final PartidaService partidaService;
    private final JogadorService jogadorService;

    public EstatisticaJogadorService(EstatisticaJogadorRepository estatisticaRepository,
                                     PartidaService partidaService,
                                     JogadorService jogadorService) {
        this.estatisticaRepository = estatisticaRepository;
        this.partidaService = partidaService;
        this.jogadorService = jogadorService;
    }

    public EstatisticaJogador salvar(Long partidaId, EstatisticaJogador estatistica) {
        Partida partida = partidaService.buscarPorId(partidaId);
        estatistica.setPartida(partida);

        if (estatistica.getJogador() != null && estatistica.getJogador().getId() != null) {
            Jogador jogador = jogadorService.buscarPorId(estatistica.getJogador().getId());
            estatistica.setJogador(jogador);
        }

        return estatisticaRepository.save(estatistica);
    }

    public List<EstatisticaJogador> listarPorPartida(Long partidaId) {
        partidaService.buscarPorId(partidaId);
        return estatisticaRepository.findByPartidaId(partidaId);
    }

    public EstatisticaJogador buscarPorId(Long id) {
        return estatisticaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estatística não encontrada com ID: " + id));
    }

    public EstatisticaJogador atualizar(Long id, EstatisticaJogador dadosAtualizados) {
        EstatisticaJogador estatisticaExistente = buscarPorId(id);

        if (dadosAtualizados.getJogador() != null && dadosAtualizados.getJogador().getId() != null) {
            Jogador jogador = jogadorService.buscarPorId(dadosAtualizados.getJogador().getId());
            estatisticaExistente.setJogador(jogador);
        }

        estatisticaExistente.setAgente(dadosAtualizados.getAgente());
        estatisticaExistente.setKills(dadosAtualizados.getKills());
        estatisticaExistente.setDeaths(dadosAtualizados.getDeaths());
        estatisticaExistente.setAssists(dadosAtualizados.getAssists());

        return estatisticaRepository.save(estatisticaExistente);
    }

    public void deletarPorId(Long id) {
        EstatisticaJogador estatistica = buscarPorId(id);
        estatisticaRepository.delete(estatistica);
    }
}