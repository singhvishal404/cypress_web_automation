const { signin } = require("../../../common/signin");

describe("SENDERID", () => {

  
  it("set default sender id", () => {
    
  cy.visit("https://appt.gunisms.com.au/");
  signin(cy);

    cy.xpath("//span[normalize-space()='Sender IDs']").click();
    cy.xpath("//span[contains(text(),'#SharedNum#')]").click()
    cy.xpath("//button[normalize-space()='Ok']").click()
    cy.xpath("//span[normalize-space()='Campaign']").click()
    cy.xpath("//button[normalize-space()='Run Campaign']").click()
    cy.wait(2000)
    cy.xpath("//div[@title='#SharedNum#']").should('be.visible')

   
  })
})