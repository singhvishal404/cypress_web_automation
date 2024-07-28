const { login, signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("mms template", () => {

  it("Add template", () => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
 cy.xpath(
      "//a[contains(@href,'/template')]//li//div[contains(@class,'mx-auto p-1 position-relative')]"
    ).click();
    cy.xpath("//h4[normalize-space()='MMS']").click();
    cy.xpath("//button[normalize-space()='Add Template']").click();
    cy.xpath("//input[@placeholder='Enter Template Name']").type("mms template")
    cy.xpath("//input[@placeholder='Enter Subject']").type("add mms template")
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
cy.xpath("//textarea[@placeholder='Type a message']").type("add mms template testing ")
cy.xpath("//button[@type='submit']").click()
cy.xpath("//body/div[5]/div[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[3]/button[1]").click()
  })
})
