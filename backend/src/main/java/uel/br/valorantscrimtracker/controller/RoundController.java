package uel.br.valorantscrimtracker.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uel.br.valorantscrimtracker.model.Round;
import uel.br.valorantscrimtracker.service.RoundService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RoundController {

    private final RoundService roundService;

    public RoundController(RoundService roundService) {
        this.roundService = roundService;
    }

    @GetMapping("/partidas/{partidaId}/rounds")
    public ResponseEntity<List<Round>> listarPorPartida(@PathVariable Long partidaId) {
        return ResponseEntity.ok(roundService.listarPorPartida(partidaId));
    }

    @GetMapping("/rounds/{id}")
    public ResponseEntity<Round> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(roundService.buscarPorId(id));
    }

    @PostMapping("/partidas/{partidaId}/rounds")
    public ResponseEntity<Round> criar(@PathVariable Long partidaId, @Valid @RequestBody Round round) {
        Round salvo = roundService.salvar(partidaId, round);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/rounds/{id}")
    public ResponseEntity<Round> atualizar(@PathVariable Long id, @Valid @RequestBody Round round) {
        return ResponseEntity.ok(roundService.atualizar(id, round));
    }

    @DeleteMapping("/rounds/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        roundService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }
}