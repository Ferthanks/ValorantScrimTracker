package uel.br.valorantscrimtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "tb_rounds")
@Data
public class Round {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "partida_id")
    private Partida partida;

    @NotNull(message = "O número do round é obrigatório")
    @Min(value = 1, message = "O número do round deve ser no mínimo 1")
    private Integer numeroRound;

    @NotBlank(message = "O lado (Ataque/Defesa) é obrigatório")
    private String lado;

    @NotBlank(message = "O vencedor do round é obrigatório")
    private String vencedor;

    // Campo opcional
    private String tipoCompra;
}