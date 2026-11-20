package uel.br.valorantscrimtracker.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uel.br.valorantscrimtracker.model.Partida;

import java.util.List;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {

    List<Partida> findByOponenteContainingIgnoreCase(String oponente, Sort sort);

    List<Partida> findByMapaContainingIgnoreCase(String mapa, Sort sort);
}