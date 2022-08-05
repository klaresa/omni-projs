import { Container } from "./styles";
import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

export function Dashboard() {
    return(
        <Container>
            <Summary/>
            <TransactionsTable/>
        </Container>
    );
}

/* o contexto é o compartilhamento de estado(informação) entre componentes da aplicação,
 sejam onde estiverem em nível hierárquico
*/
