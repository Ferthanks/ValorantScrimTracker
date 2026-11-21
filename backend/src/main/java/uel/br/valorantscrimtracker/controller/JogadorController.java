package uel.br.valorantscrimtracker.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uel.br.valorantscrimtracker.model.Jogador;
import uel.br.valorantscrimtracker.service.JogadorService;

import java.util.List;

@RestController
@RequestMapping("/api/jogadores")
@CrossOrigin(origins = "*")
public class JogadorController {

    private final JogadorService jogadorService;

    public JogadorController(JogadorService jogadorService) {
        this.jogadorService = jogadorService;
    }

    @GetMapping
    public ResponseEntity<List<Jogador>> listar(
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) String ordenarPor,
            @RequestParam(required = false) String direcao) {
        return ResponseEntity.ok(jogadorService.listar(nickname, ordenarPor, direcao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jogador> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(jogadorService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Jogador> criar(@Valid @RequestBody Jogador jogador) {
        Jogador salvo = jogadorService.salvar(jogador);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jogador> atualizar(@PathVariable Long id, @Valid @RequestBody Jogador jogador) {
        return ResponseEntity.ok(jogadorService.atualizar(id, jogador));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        jogadorService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }
}