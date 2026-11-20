package uel.br.valorantscrimtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "tb_estatisticas")
@Data
public class EstatisticaJogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "partida_id")
    private Partida partida;

    @ManyToOne
    @JoinColumn(name = "jogador_id")
    private Jogador jogador;

    @NotBlank(message = "O agente é obrigatório")
    private String agente;

    @NotNull(message = "O número de kills é obrigatório")
    @Min(value = 0, message = "Kills não pode ser negativo")
    private Integer kills;

    @NotNull(message = "O número de deaths é obrigatório")
    @Min(value = 0, message = "Deaths não pode ser negativo")
    private Integer deaths;

    @NotNull(message = "O número de assists é obrigatório")
    @Min(value = 0, message = "Assists não pode ser negativo")
    private Integer assists;
}