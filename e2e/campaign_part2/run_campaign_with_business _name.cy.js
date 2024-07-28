const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("campaign", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });

  it("campaign through business name ", () => {
    let Tag = ""
    allure.step("REQUEST = ", () => {})

    cy.wait(2000);
    cy.xpath("//button[normalize-space()='Run Campaign']").click();

    cy.log("hello world");

    cy.xpath("//i[@type='button']").click();
    cy.xpath("//input[@placeholder='Campaign Name']").type("testing");
    Tag += "name of the campaign = 'testing'"
    allure.step("name of the campaign = 'testing ", () => {})

    cy.wait(1000);
    cy.xpath("(//*[name()='svg'])[5]").click();

    cy.xpath("//span[normalize-space()='Business: vishal']").click()
  
    allure.step("senderid = vishal(business name)", () => {});

    cy.xpath("//span[@class='ant-typography fs-6']").invoke("text").then(text => {
      cy.log(text);
      allure.step(`optout type = ${text}`, () => {})
  });
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//tbody/tr[1]/td[2]/span[1]")
    .invoke("text")
    .then((text) => {
      let Tag = ""
      cy.log(text)
      // Print the extracted text
      Tag += `group name(18 contacts):, ${text}`;
      allure.tag(Tag)
    });
    Tag += "\n"


    cy.xpath("//tbody/tr[1]/td[4]").click({ force: true });
    cy.xpath(
      "//button[@class='btn text-nowrap app-btn_btnLightWithBg__3UKbv'][normalize-space()='Next']"
    ).click();
    cy.xpath("//span[normalize-space()='Use Template']").click();
    cy.xpath("(//td[contains(@title,'kapil sharma')])[1]").click();
    Tag += "used template = kapil sharma "
    Tag += "\n"
    cy.xpath("//span[@class='ant-typography fs-6']").invoke("text").then(text => {
      cy.log(text);
      allure.step(`optout type = ${text}`, () => {})
  })
    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.xpath("//span[normalize-space()='History']").click();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    allure.step("RESULT = ", () => {})
cy.xpath("//tbody/tr[1]/td[1]/div[1]").click()
    cy.xpath("//span[contains(@class,'ant-typography text-capitalize')]").invoke("text").then(text => {
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
  });
});
