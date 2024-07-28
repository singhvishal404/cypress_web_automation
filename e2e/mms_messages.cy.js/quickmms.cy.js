const { login, signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("mms template", () => {

  it("Add template", () => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//span[normalize-space()='Messaging']").click();
    cy.xpath("//a[contains(@href,'/quick-message')]").click();``
    cy.xpath("//input[@value='mms']").click()
    cy.xpath("//i[@aria-label='icon: close']//*[name()='svg']").click()
    cy.xpath("//div[normalize-space()='Enter mobile numbers']").then($input => {
        $input.val('');
      });
      cy.wait(2000)
    cy.xpath("//div[normalize-space()='Enter mobile numbers']").type("481606117")
    cy.xpath("//input[@placeholder='Enter Subject']").type("send mms")
    cy.xpath("//textarea[@placeholder='Type a message']").type("mms testing through automation pls ignore")
    cy.xpath("//span[contains(@class,'d-flex gap-2')]").click()
    cy.fixture("imageanime.jpg", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("input[type='file']").then((el) => {
            const testFile = new File([fileContent], "imageanime.jpg", {
              type: "image/jpeg", // Set the correct MIME type for JPG images
            });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el[0].files = dataTransfer.files;
          cy.wrap(el).trigger("change", { force: true });
        });
  })
  cy.xpath("//button[normalize-space()='Add']").click()
  cy.wait(3000)
})
})
