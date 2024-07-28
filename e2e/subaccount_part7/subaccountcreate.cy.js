const { signin } = require("../../../common/signin");
import { faker } from '@faker-js/faker';

import * as allure from "allure-cypress"
describe("subaccount", () => {
  it("subaccount create", () => {
    let Tag = ""
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    allure.step("REQUEST", () => {});

    
    cy.xpath("//button[normalize-space()='Run Campaign']").should("be.visible");
cy.xpath("//span[normalize-space()='Sub-Accounts']").click()
cy.xpath("//button[normalize-space()='Invite']").click()
cy.xpath("//input[@placeholder='Email']").type("subaccounttest121@yopmail.com")
allure.step("EMAIL = subaccounttest121@yopmail.com", () => {});

cy.xpath("//button[@type='submit']").click()
cy.xpath("//tr[contains(@data-row-key,'mms')]//input[contains(@type,'checkbox')]").click()
cy.xpath("//tr[contains(@data-row-key,'group')]//input[contains(@type,'checkbox')]").click()
cy.xpath("//tr[contains(@data-row-key,'integration')]//input[contains(@type,'checkbox')]").click()
cy.xpath("//button[@type='submit']").click()
cy.xpath("//button[normalize-space()='Copy Link']").click()

cy.window().then((win) => {
    // Use the Clipboard API to read the content of the clipboard
    return win.navigator.clipboard.readText();
  }).then((copiedContent) => {
    // Store the copied content in a Cypress variable
    cy.wrap(copiedContent).as('copiedElementOrURL');
    allure.step(`COPIED LINK = ${copiedContent}`, () => {});

  });

  // Now you can use the variable '@copiedElementOrURL' to access the copied content
  // For example, you can log it to the Cypress command log
  cy.get('@copiedElementOrURL').then((copiedContent) => {
    cy.log('Copied Content:', copiedContent);
    cy.xpath("//img[@alt='menu']").trigger("Logout").click();
    cy.xpath(
      "//body/div/div/div/div/div[@role='tooltip']/div/div/div/ul/li[1]/span[1]"
    ).click();
    cy.xpath("//button[normalize-space()='Log Out']").click();
    cy.title().should("contain", "Sign-In | Guni Online and Bulk SMS Gateway");
    cy.visit(copiedContent)
  });
  allure.step("signup new subaccount", () => {});

  cy.xpath("//input[@name='firstName']").type("vishal")
  allure.step("name = vishal", () => {});

  cy.xpath("//input[@name='lastName']").type("singh")
  allure.step("name = singh", () => {});

cy.xpath("//input[@name='password']").type("123456")
allure.step("passwd = 123456", () => {});

cy.xpath("//input[@name='confirmPassword']").type("123456")
allure.step("confirm passwd = 123456", () => {});

cy.xpath("//button[@type='submit']").click()
cy.wait(2000)
cy.xpath("//input[@name='contact']").type("subaccounttest121@yopmail.com");
allure.step("login subaccount", () => {});
allure.step("email = subaccounttest121@yopmail.com", () => {});

cy.xpath("//button[@type='submit']").click();
cy.wait(2000)
cy.xpath("//input[@name='password']").type("123456");
allure.step("passwd =123456", () => {});

  cy.xpath("//button[@type='submit']").click();
  cy.wait(2000)
  cy.request({
    method: "GET",
    url: "https://apit6110.gunisms.com.au/api/v1/automation/fetch-otp?type=mobile",
  }).then((response) => {
    // Log the response body
    cy.log(response.body.data.shortCode);
    // cy.xpath("//input[@name='otp']").type(response.body.data.shortCode);
  
  cy.xpath(
    "//input[@aria-label='Please enter verification code. Digit 1']"
  ).type(response.body.data.shortCode[0]);
  cy.log(response.body.data.shortCode[0])
  cy.xpath("//input[@aria-label='Digit 2']").type(response.body.data.shortCode[1]);
  cy.xpath("//input[@aria-label='Digit 3']").type(response.body.data.shortCode[2]);
  cy.xpath("//input[@aria-label='Digit 4']").type(response.body.data.shortCode[3]);
  cy.xpath("//input[@aria-label='Digit 5']").type(response.body.data.shortCode[4]);
  cy.xpath("//input[@aria-label='Digit 6']").type(response.body.data.shortCode[5]);
  cy.wait(3000);
    
  });
});
});
 