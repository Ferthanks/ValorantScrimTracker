package uel.br.valorantscrimtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uel.br.valorantscrimtracker.model.EstatisticaJogador;

import java.util.List;

@Repository
public interface EstatisticaJogadorRepository extends JpaRepository<EstatisticaJogador, Long> {

    List<EstatisticaJogador> findByPartidaId(Long partidaId);
}