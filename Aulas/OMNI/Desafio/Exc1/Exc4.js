
function experiencia(anos) {
    if (anos < 1){
        console.log('Iniciante');
    } else if (anos >= 1 && anos <= 3) {
        console.log('Intermediario');
    } else if (anos >= 3 && anos <=6){
        console.log('Acancado')
    } else {
        console.log('Jedi Master')
    }
}

var anosEstudo = 7;
experiencia(anosEstudo);