package uel.br.valorantscrimtracker.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uel.br.valorantscrimtracker.model.Partida;
import uel.br.valorantscrimtracker.service.PartidaService;

import java.util.List;

@RestController
@RequestMapping("/api/partidas")
@CrossOrigin(origins = "*")
public class PartidaController {

    private final PartidaService partidaService;

    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @GetMapping
    public ResponseEntity<List<Partida>> listar(
            @RequestParam(required = false) String oponente,
            @RequestParam(required = false) String mapa,
            @RequestParam(required = false) String ordenarPor,
            @RequestParam(required = false) String direcao) {
        return ResponseEntity.ok(partidaService.listar(oponente, mapa, ordenarPor, direcao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Partida> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(partidaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Partida> criar(@Valid @RequestBody Partida partida) {
        Partida salva = partidaService.salvar(partida);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Partida> atualizar(@PathVariable Long id, @Valid @RequestBody Partida partida) {
        return ResponseEntity.ok(partidaService.atualizar(id, partida));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        partidaService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }
}