import { Flamengo } from "../../../Arquivos/Usuario.JS";
import { Vasco } from "../../../Arquivos/Usuario.JS";
describe("13 - CND DO ISS DE NITEROI", () => {
    const User = [Vasco, Flamengo];
    for (let index = 0; index < User.length; index++) {
        const element = User[index];
        emitirCertidao(element.nomePessoa, element.CNPJ)
    }
});

function emitirCertidao(nomePessoa, CNPJ) {
    let ver = CNPJ;
    let resultado, valido;
    if (ver.length == 14) {
        resultado = "Emitir"
        valido = true;
    } else {
        resultado = "Não emitir"
    }
    it(resultado + " CND DO ISS DE NITEROI do(a) " + nomePessoa, () => {
        cy.viewport(1455, 679);
        cy.visit("https://fazenda.niteroi.rj.gov.br/certidao/");
        cy.get("label > input").click().type(CNPJ);
        cy.get("form > input").click();
        if (valido) {
            cy.location("href").should("eq", "https://fazenda.niteroi.rj.gov.br/certidao/");
            cy.get("section > a").click();
        } else {
            cy.get('p.erro').should('be.visible').and('have.text', 'O CNPJ digitado é inválido.');
        }

    });
}