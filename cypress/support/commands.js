// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }
Cypress.Commands.add('LoginSalesforce', (Usuario, Senha) => {

   
    
cy.visit('https://dhs000001xj0cmau-dev-ed.develop.lightning.force.com');
    cy.get('#username').click().type(Usuario);
    cy.get('#password').click().type(Senha);
    cy.get('#rememberUn').click();
    cy.get('#Login').click();
    cy.get('.btn').click();
        //cy.screenshot();
    //cy.get('.btn').click();
    //cy.screenshot();
   /* cy.origin('https://dhs000001xj0cmau-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home', () => {
        
    })*/
});

Cypress.Commands.add("AcessarProcessoTribunal", (NumeroProcesso, NumeroChaveDocumento, ePessoaFisica, Situacao) => {
    cy.visit('https://eproc.jfrj.jus.br/eproc/');
    cy.contains('Consulta Pública de Processos').click();
    if (NumeroProcesso != 0) {
        cy.get('#txtNumProcesso').type(NumeroProcesso);
    }
    if (NumeroChaveDocumento != 0 || NumeroChaveDocumento != '' || NumeroChaveDocumento != null) {
        console.debug(NumeroChaveDocumento);
        cy.get('#txtNumChaveDocumento').type(NumeroChaveDocumento);
    }

    if (ePessoaFisica == "Sim") {
        cy.get('#rdoPessoaFisica').check();
    } else {
        cy.get('#rdoPessoaJuridica').click().check();
    }

    cy.get('#sbmNovo').click();
    cy.screenshot()
    // cy.get('#txtSituacao').should('Be.visible', Situacao);
});
