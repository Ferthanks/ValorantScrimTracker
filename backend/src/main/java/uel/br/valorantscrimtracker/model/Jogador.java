package uel.br.valorantscrimtracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "tb_jogadores")
@Data
public class Jogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nickname do jogador é obrigatório")
    private String nickname;

    @NotBlank(message = "A tag do jogador é obrigatória")
    private String tag;

    // Campo opcional
    private String funcao;
}