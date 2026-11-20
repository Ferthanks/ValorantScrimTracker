package uel.br.valorantscrimtracker.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uel.br.valorantscrimtracker.model.Jogador;

import java.util.List;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Long> {

    List<Jogador> findByNicknameContainingIgnoreCase(String nickname, Sort sort);
}
