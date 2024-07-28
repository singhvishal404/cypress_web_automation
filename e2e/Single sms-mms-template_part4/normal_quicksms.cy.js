const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress";

describe("single quick sms", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//span[normalize-space()='Messaging']").click();
    cy.xpath("//a[contains(@href,'/quick-message')]").click();
  });

  it("send quickmessage", () => {
    let Tag = "";

    cy.xpath("//div[normalize-space()='Enter mobile numbers']").type("405650337{enter}");
    allure.step("REQUEST = ", () => {});

    allure.step("URL = https://appt.gunisms.com.au/", () => {});

    cy.xpath("//i[@aria-label='icon: down']//*[name()='svg']").click();
    cy.xpath("//span[normalize-space()='#SharedNum#']").click();
    
    // Check text area message of sending message
    cy.xpath("//textarea[@placeholder='Type a message']").type(" vishal testing ");
    allure.step("message = vishal testing", () => {});

    allure.step("RESULT = ", () => {});

    cy.xpath("//button[@type='submit']").click();
    cy.wait(1000);
    cy.xpath("//span[normalize-space()='History']").click();
    cy.wait(4000);
    cy.xpath("//tbody/tr[1]/td[6]/span[1]").then(($status) => {
      const statusText = $status.text().toLowerCase(); // Convert to lowercase for case-insensitive comparison
      expect(statusText.includes("sent") || statusText.includes("delivered")).to.be.true;
      Tag += `STATUS OF THE MESSAGE =  ${statusText}\n`;
      allure.step(`STATUS OF THE MESSAGE = ${statusText}`, () => {});
  })
  cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[1]/div[1]").click()
      cy.xpath("//tbody/tr[2]/td[2]/div[1]/div[1]/div[1]/div[2]/span[1]").invoke("text").then(text => {
        // Use the text content as needed
        cy.log(text);
        allure.step(`type = ${text}`, () => {})
    });
cy.xpath("//tbody/tr[1]/td[2]/span[1]").invoke("text").then(text => {
  // Use the text content as needed
  cy.log(text);
  allure.step(`sender = ${text}`, () => {}) // sender invoke
});
cy.xpath("//tbody/tr[2]/td[1]").invoke("text").then(text => {
  // Use the text content as needed
  cy.log(text);
  allure.step(`reciver = ${text}`, () => {}) // reciver invoke
});
cy.xpath("//tbody/tr[2]/td[1]").invoke("text").then(text => {
  // Use the text content as needed
  cy.log(text);
  allure.step(`message = ${text}`, () => {})
  });
});
})