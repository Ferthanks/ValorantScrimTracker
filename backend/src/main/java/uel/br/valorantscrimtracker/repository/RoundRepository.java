package uel.br.valorantscrimtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uel.br.valorantscrimtracker.model.Round;

import java.util.List;

@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {

    List<Round> findByPartidaIdOrderByNumeroRoundAsc(Long partidaId);
}