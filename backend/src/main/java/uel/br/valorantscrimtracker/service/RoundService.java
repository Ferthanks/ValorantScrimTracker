package uel.br.valorantscrimtracker.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import uel.br.valorantscrimtracker.model.Partida;
import uel.br.valorantscrimtracker.model.Round;
import uel.br.valorantscrimtracker.repository.RoundRepository;

import java.util.List;

@Service
public class RoundService {

    private final RoundRepository roundRepository;
    private final PartidaService partidaService;

    public RoundService(RoundRepository roundRepository, PartidaService partidaService) {
        this.roundRepository = roundRepository;
        this.partidaService = partidaService;
    }

    public Round salvar(Long partidaId, Round round) {
        Partida partida = partidaService.buscarPorId(partidaId);
        round.setPartida(partida);
        return roundRepository.save(round);
    }

    public List<Round> listarPorPartida(Long partidaId) {
        partidaService.buscarPorId(partidaId);
        return roundRepository.findByPartidaIdOrderByNumeroRoundAsc(partidaId);
    }

    public Round buscarPorId(Long id) {
        return roundRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Round não encontrado com ID: " + id));
    }

    public Round atualizar(Long id, Round dadosAtualizados) {
        Round roundExistente = buscarPorId(id);

        roundExistente.setNumeroRound(dadosAtualizados.getNumeroRound());
        roundExistente.setLado(dadosAtualizados.getLado());
        roundExistente.setVencedor(dadosAtualizados.getVencedor());
        roundExistente.setTipoCompra(dadosAtualizados.getTipoCompra());

        return roundRepository.save(roundExistente);
    }

    public void deletarPorId(Long id) {
        Round round = buscarPorId(id);
        roundRepository.delete(round);
    }
}