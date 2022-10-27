class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class JaEliminadoException extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

interface Defensivel {
    estaEliminado() : boolean;
    defenderAtaque(valorAtaque: number) : void;
}


class Guerreiro implements Defensivel {
    private idGuerreiro: number;
    private descricao: string;
    private forcaDeAtaque: number;
    private life: number = 10;

    constructor(idGuerreiro: number, descricao: string, forcaDeAtaque: number) {
        this.idGuerreiro = idGuerreiro;
        this.descricao = descricao;
        this.forcaDeAtaque = forcaDeAtaque;
    }

    estaEliminado() {
        if(this.life == 0) {
            return true;
        } else {
            return false;
        }
    }

    defenderAtaque(danoRecebido: number) {
        this.life -= danoRecebido;
    }

    atacar(guerreiroOuBase: Defensivel) {
        if (guerreiroOuBase.estaEliminado()) {
            throw new JaEliminadoException("Oponente já eliminado");
        }
        guerreiroOuBase.defenderAtaque(this.forcaDeAtaque);
    }

}

class BaseMilitar implements Defensivel{
    private idBase: number;
    private localizacaoX: number;
    private localizacaoY: number;
    private danoRecebido: number = 0;

    constructor(idBase: number, localizacaoX: number, localizacaoY: number) {
        this.idBase = idBase;
        this.localizacaoX = localizacaoX;
        this.localizacaoY = localizacaoY;
    }

    estaEliminado() {
        if(this.danoRecebido >= 90) {
            return true;
        } else {
            return false;
        }
    }

    defenderAtaque(danoRecebido: number) {
        this.danoRecebido += danoRecebido;
    }
}

class CenarioDeBatalha {
    avaliar(exercito1: Defensivel[], exercito2: Defensivel[]) { 
        let baseMilitaresRestantesExercito1: number = 0;
        let baseMilitaresRestantesExercito2: number = 0;

        let guerreirosRestantesExercito1: number = 0;
        let guerreirosRestantesExercito2: number = 0;

        for (let defensivel of exercito1) {
            if (defensivel instanceof Guerreiro) {
                if(!defensivel.estaEliminado()) {
                    guerreirosRestantesExercito1 += 1;
                }
            } else if (defensivel instanceof BaseMilitar) {
                if(!defensivel.estaEliminado()) {
                    baseMilitaresRestantesExercito1 += 1;
                }
            }
        }
        for (let defensivel of exercito2) {
            if (defensivel instanceof Guerreiro) {
                if(!defensivel.estaEliminado()) {
                    guerreirosRestantesExercito2 += 1;
                }
            } else if (defensivel instanceof BaseMilitar) {
                if(!defensivel.estaEliminado()) {
                    baseMilitaresRestantesExercito2 += 1;
                }
            }
        }
        if (baseMilitaresRestantesExercito1 > baseMilitaresRestantesExercito2) {
            console.log("Exercito 1 venceu");
        } else if (baseMilitaresRestantesExercito1 < baseMilitaresRestantesExercito1) {
            console.log("Exercito 2 venceu");
        } else {
            if (guerreirosRestantesExercito1 > guerreirosRestantesExercito2) {
                console.log("Exercito 1 venceu");
            } else if (guerreirosRestantesExercito1 < guerreirosRestantesExercito2) {
                console.log("Exercito 2 venceu")
            } else {
                console.log("Ainda não há um vencedor da guerra");
            }
        }
        
    }
}



class Teste {
    GuerraAteOFim() {
        let g1: Guerreiro = new Guerreiro(1, 'General', 3);
        let g2: Guerreiro = new Guerreiro(2, 'Capitao', 2);
        let g3: Guerreiro = new Guerreiro(3, 'Soldado', 1);
        let g4: Guerreiro = new Guerreiro(4, 'Soldado', 1);
        let g5: Guerreiro = new Guerreiro(5, 'General', 3);
        let g6: Guerreiro = new Guerreiro(1, 'Capitao', 1);
        let g7: Guerreiro = new Guerreiro(1, 'Soldado', 1);
        let g8: Guerreiro = new Guerreiro(1, 'Soldado', 1);

        let b1: BaseMilitar = new BaseMilitar(1, 20,25);
        let b2: BaseMilitar = new BaseMilitar(2,25,40);
        let b3: BaseMilitar = new BaseMilitar(3,40,35);
        let b4: BaseMilitar = new BaseMilitar(4,43,40);

        let exercito1: Defensivel[] = [g1, g2, g3, g4, b1, b2];
        let exercito2: Defensivel[] = [g5, g6, g7, g8, b3, b4];
        let cenario: CenarioDeBatalha = new CenarioDeBatalha();
        try {
            g1.atacar(g8);
            g8.atacar(g2);
            g1.atacar(g8);
            g5.atacar(b2);
            g1.atacar(g8);
            g3.atacar(g8);

            cenario.avaliar(exercito1, exercito2);

        } catch(e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.message);
            } else {
                if (e instanceof Error) {
                    console.log("Entrar em contato com o administrador");
                }
            }
        }
    }
}
let t1 = new Teste();

t1.GuerraAteOFim();
