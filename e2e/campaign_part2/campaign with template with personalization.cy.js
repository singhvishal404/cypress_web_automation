const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("campaign with template", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });
  it("campaign  with personilisation", () => {
    let Tag = ""
    allure.step("REQUEST", () => {})

    cy.xpath("//button[normalize-space()='Run Campaign']").click();
    Tag += "URL = https://appt.gunisms.com.au/"
    Tag += "\n"

    cy.xpath("(//*[name()='svg'])[5]").click();
    cy.xpath("//li[@label='#SharedNum#']").click()
    Tag += " senderid = SharedNum"
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//tbody/tr[1]/td[2]/span[1]")
    .invoke("text")
    .then((text) => {
      let Tag = ""
      cy.log(text)
      // Print the extracted text
      Tag += `group name (18 contacts):, ${text}`;
      allure.tag(Tag)
    });
    Tag += "\n"

    cy.xpath("//tbody/tr[1]/td[4]").click();

    cy.wait(1000);
    cy.xpath(
      "//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']"
    ).click();
    cy.wait(2000);
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      " testing with personilisation"
    );
    Tag += "TEXTAREA MESSSAGE = testing with personilisation "
    allure.step(Tag, () => {});

    cy.xpath("//span[@class='ant-typography fs-6']").invoke("text").then(text => {
      cy.log(text);
      allure.step(`optout type = ${text}`, () => {})
  })
    cy.xpath("//span[normalize-space()='Personalize']").click()
    cy.xpath("//span[normalize-space()='first name']").click()
    cy.xpath("//span[normalize-space()='last name']").click()
    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.wait(1000)
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.wait(2000);
    cy.xpath("//span[normalize-space()='History']").click();
    cy.wait(2000)
    cy.xpath("//tbody/tr[1]/td[3]").click()
    allure.step("RESULT", () => {})

cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/div[1]/div[1]/div[2]").invoke("text").then(text => {
  // Use the text content as needed
  cy.log(text);
});
    cy.xpath("//span[@class='ant-typography text-capitalize']").invoke("text").then(text => {
      // Use the text content as needed
      cy.log(text);
      allure.step(`campaign name = ${text}`, () => {})
    });
    cy.xpath("//tbody/tr[2]/td[2]/div[1]/div[1]/div[1]/div[4]").invoke("text").then(text => {
      // Use the text content as needed
      cy.log(text);
      allure.step(`type = ${text}`, () => {})
  })
  cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)").invoke("text").then(text => {
    // Use the text content as needed
    cy.log(text);
    allure.step(`Message = ${text}`, () => {})
    
})
cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[6]/div[1]/span[1]").then(text => {
  // Use the text content as needed
  cy.log(text);
  allure.step(`status of the message = ${text}`, () => {})
})
})
})