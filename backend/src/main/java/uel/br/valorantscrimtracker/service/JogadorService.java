package uel.br.valorantscrimtracker.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uel.br.valorantscrimtracker.model.Jogador;
import uel.br.valorantscrimtracker.repository.JogadorRepository;

import java.util.List;

@Service
public class JogadorService {

    private final JogadorRepository jogadorRepository;

    public JogadorService(JogadorRepository jogadorRepository) {
        this.jogadorRepository = jogadorRepository;
    }

    public Jogador salvar(Jogador jogador) {
        return jogadorRepository.save(jogador);
    }

    public List<Jogador> listar(String nickname, String ordenarPor, String direcao) {
        Sort.Direction direction = "desc".equalsIgnoreCase(direcao) ? Sort.Direction.DESC : Sort.Direction.ASC;
        String campoOrdenacao = (ordenarPor != null && !ordenarPor.isBlank()) ? ordenarPor : "id";
        Sort sort = Sort.by(direction, campoOrdenacao);

        if (nickname != null && !nickname.isBlank()) {
            return jogadorRepository.findByNicknameContainingIgnoreCase(nickname, sort);
        }
        return jogadorRepository.findAll(sort);
    }

    public Jogador buscarPorId(Long id) {
        return jogadorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Jogador não encontrado com ID: " + id));
    }

    public Jogador atualizar(Long id, Jogador dadosAtualizados) {
        Jogador jogadorExistente = buscarPorId(id);

        jogadorExistente.setNickname(dadosAtualizados.getNickname());
        jogadorExistente.setTag(dadosAtualizados.getTag());
        jogadorExistente.setFuncao(dadosAtualizados.getFuncao());

        return jogadorRepository.save(jogadorExistente);
    }

    public void deletarPorId(Long id) {
        Jogador jogador = buscarPorId(id);
        jogadorRepository.delete(jogador);
    }
}