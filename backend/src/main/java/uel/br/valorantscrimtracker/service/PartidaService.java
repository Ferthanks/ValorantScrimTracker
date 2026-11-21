package uel.br.valorantscrimtracker.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uel.br.valorantscrimtracker.model.Partida;
import uel.br.valorantscrimtracker.repository.PartidaRepository;

import java.util.List;

@Service
public class PartidaService {

    private final PartidaRepository partidaRepository;

    public PartidaService(PartidaRepository partidaRepository) {
        this.partidaRepository = partidaRepository;
    }

    public Partida salvar(Partida partida) {
        return partidaRepository.save(partida);
    }

    public List<Partida> listar(String oponente, String mapa, String ordenarPor, String direcao) {
        Sort.Direction direction = "desc".equalsIgnoreCase(direcao) ? Sort.Direction.DESC : Sort.Direction.ASC;
        String campoOrdenacao = (ordenarPor != null && !ordenarPor.isBlank()) ? ordenarPor : "id";
        Sort sort = Sort.by(direction, campoOrdenacao);

        if (oponente != null && !oponente.isBlank()) {
            return partidaRepository.findByOponenteContainingIgnoreCase(oponente, sort);
        }
        if (mapa != null && !mapa.isBlank()) {
            return partidaRepository.findByMapaContainingIgnoreCase(mapa, sort);
        }
        return partidaRepository.findAll(sort);
    }

    public Partida buscarPorId(Long id) {
        return partidaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Partida não encontrada com ID: " + id));
    }

    public Partida atualizar(Long id, Partida dadosAtualizados) {
        Partida partidaExistente = buscarPorId(id);

        if (dadosAtualizados.getDataPartida() != null) {
            partidaExistente.setDataPartida(dadosAtualizados.getDataPartida());
        }
        partidaExistente.setMapa(dadosAtualizados.getMapa());
        partidaExistente.setOponente(dadosAtualizados.getOponente());
        partidaExistente.setPlacarSeuTime(dadosAtualizados.getPlacarSeuTime());
        partidaExistente.setPlacarOponente(dadosAtualizados.getPlacarOponente());

        return partidaRepository.save(partidaExistente);
    }

    public void deletarPorId(Long id) {
        Partida partida = buscarPorId(id);
        partidaRepository.delete(partida);
    }
}
