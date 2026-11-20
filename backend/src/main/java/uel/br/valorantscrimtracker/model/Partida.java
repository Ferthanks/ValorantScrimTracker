package uel.br.valorantscrimtracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tb_partidas")
@Data
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Campo opcional: assume a data atual caso não seja informado
    private LocalDate dataPartida = LocalDate.now();

    @NotBlank(message = "O mapa é obrigatório")
    private String mapa;

    @NotBlank(message = "O nome do time oponente é obrigatório")
    private String oponente;

    @NotNull(message = "O placar do seu time é obrigatório")
    @Min(value = 0, message = "O placar não pode ser negativo")
    private Integer placarSeuTime;

    @NotNull(message = "O placar do oponente é obrigatório")
    @Min(value = 0, message = "O placar não pode ser negativo")
    private Integer placarOponente;

    @OneToMany(mappedBy = "partida", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Round> rounds;

    @OneToMany(mappedBy = "partida", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstatisticaJogador> estatisticas;

    @PrePersist
    public void preencherDataPadrao() {
        if (this.dataPartida == null) {
            this.dataPartida = LocalDate.now();
        }
    }
}
