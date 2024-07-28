const xlsx = require('xlsx')
const path = require('path');
import * as allure from "allure-cypress"
describe("file scheduler common profile ", () => {
  it("file scheduler common profile ", () => {
    cy.visit("https://appt.gunisms.com.au/");
  
    cy.xpath("//input[@name='contact']").type("admindependency@yopmail.com");
    cy.xpath("//button[@type='submit']").click();
    cy.wait(3000);
    cy.xpath("//input[@name='password']").type("123456");

    cy.xpath("//button[@type='submit']").click();
    cy.wait(2000);
    cy.request({
      method: "GET",
      url: "https://apit6110.gunisms.com.au/api/v1/automation/fetch-otp?type=mobile&email=admindependency@yopmail.com",
    }).then((response) => {
      // Log the response body
      cy.log(response.body.data.shortCode);
      
    
    cy.xpath(
      "//input[@aria-label='Please enter verification code. Digit 1']"
    ).type(response.body.data.shortCode[0]);
    cy.log(response.body.data.shortCode[0]);
    cy.xpath("//input[@aria-label='Digit 2']").type(
      response.body.data.shortCode[1]
    );
    cy.xpath("//input[@aria-label='Digit 3']").type(
      response.body.data.shortCode[2]
    );
    cy.xpath("//input[@aria-label='Digit 4']").type(
      response.body.data.shortCode[3]
    );
    cy.xpath("//input[@aria-label='Digit 5']").type(
      response.body.data.shortCode[4]
    );
    cy.xpath("//input[@aria-label='Digit 6']").type(
      response.body.data.shortCode[5]
    );
    cy.wait(3000);
    cy.xpath("//span[normalize-space()='Messaging']").click()
    cy.xpath("//li[normalize-space()='File Scheduler']").click()
    cy.xpath("//button[normalize-space()='+']").click()
    // cy.xpath("//span[@class='btn btn-success btn-sm words-dont-break-out']").click()
   
    cy.task('readAndModifyExcel')
    cy.wait(2000)
    cy.fixture("filescheduler_xls_template (4)_download.xlsx", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.xpath("//input[@type='file']").then((el) => {
          const testFile = new File([fileContent], "filescheduler_xls_template (4)_download.xlsx", {
            type: "application/vnd.ms-excel",
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el[0].files = dataTransfer.files;
          cy.wrap(el).trigger("change", { force: true });
          cy.wait(2000)
        });
      })

  })
  cy.xpath("//div[@class='form-group']//div[@class='form-group']//i[@aria-label='icon: down']//*[name()='svg']").click()
  cy.xpath("//li[normalize-space()='#SharedNum#']").click()
  cy.xpath("//div[4]//div[1]//div[1]//span[1]//i[1]//*[name()='svg']").click()
  cy.xpath("//li[normalize-space()='IST|UTC +5:30']").click()
  cy.xpath("//textarea[@name='message']").type("common file scheduler testing  ")
  cy.xpath("//button[@type='submit']").click()

})
})
