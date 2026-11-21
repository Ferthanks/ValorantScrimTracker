package uel.br.valorantscrimtracker.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uel.br.valorantscrimtracker.model.EstatisticaJogador;
import uel.br.valorantscrimtracker.service.EstatisticaJogadorService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EstatisticaJogadorController {

    private final EstatisticaJogadorService estatisticaService;

    public EstatisticaJogadorController(EstatisticaJogadorService estatisticaService) {
        this.estatisticaService = estatisticaService;
    }

    @GetMapping("/partidas/{partidaId}/estatisticas")
    public ResponseEntity<List<EstatisticaJogador>> listarPorPartida(@PathVariable Long partidaId) {
        return ResponseEntity.ok(estatisticaService.listarPorPartida(partidaId));
    }

    @GetMapping("/estatisticas/{id}")
    public ResponseEntity<EstatisticaJogador> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(estatisticaService.buscarPorId(id));
    }

    @PostMapping("/partidas/{partidaId}/estatisticas")
    public ResponseEntity<EstatisticaJogador> criar(
            @PathVariable Long partidaId,
            @Valid @RequestBody EstatisticaJogador estatistica) {
        EstatisticaJogador salva = estatisticaService.salvar(partidaId, estatistica);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/estatisticas/{id}")
    public ResponseEntity<EstatisticaJogador> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody EstatisticaJogador estatistica) {
        return ResponseEntity.ok(estatisticaService.atualizar(id, estatistica));
    }

    @DeleteMapping("/estatisticas/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        estatisticaService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }
}