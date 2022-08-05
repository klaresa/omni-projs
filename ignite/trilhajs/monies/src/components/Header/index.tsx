import logoImg from '../../assets/logo.svg';
import { Container, Content } from "./styles";

interface HeaderProps {
    onOpenNewTransactionModal: () => void; // uma funcao que n tem parametro e nem tem retorno
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="Monies logo"/>

                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    );
}
