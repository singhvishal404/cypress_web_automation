const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress";

describe("campaign", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });

  it("scheduled campaign", () => {
    let Tag = "REQUEST";
    let RESULT = "RESULT";

    cy.xpath("//button[normalize-space()='Run Campaign']").click();
    cy.log("hello world");
    allure.step(Tag, () => {});

    cy.xpath("//i[@type='button']").click();
    cy.xpath("//input[@placeholder='Campaign Name']").type("testing");
    allure.step("name of the campaign = testing", () => {});
    cy.xpath("(//*[name()='svg'])[5]").click();
    cy.xpath("//li[@label='#SharedNum#']").click();
    Tag += "\nSENDERID = shared number\n";
    cy.xpath("//button[@type='submit']").click();

    cy.xpath("//tbody/tr[1]/td[2]/span[1]")
      .invoke("text")
      .then((text) => {
        let tag = `group name(18 contacts):, ${text}`;
        cy.log(text);
        allure.tag(tag);
      });

    Tag += "\n";

    cy.xpath("//tbody/tr[1]/td[4]").click();
    cy.xpath(
      "//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']"
    ).click();
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "scheduled campaign testing"
    );
    Tag += " message = scheduled campaign testing";
    allure.step("message = scheduled campaign testing", () => {});
    Tag += "\n";
    allure.step(Tag, () => {});

    cy.xpath("//span[@class='ant-typography fs-6']")
      .invoke("text")
      .then((text) => {
        cy.log(text);
        allure.step(`optout type = ${text}`, () => {});
      });

    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath(
      "//label[@class='border rounded-xl ant-radio-button-wrapper']//div[@class='ant-col ant-col-20']"
    ).click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Schedule']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.xpath("//div[normalize-space()='Scheduled']").click();

    cy.xpath("//span[normalize-space()='Scheduled']").should("exist");
    allure.step("RESULT = ", () => {});

    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > span:nth-child(1)"
    )
      .invoke("text")
      .then((text) => {
        cy.log(text);
        allure.step(`Campaign Name = ${text}`, () => {});
      });

    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)"
    )
      .invoke("text")
      .then((text) => {
        cy.log(text);
        allure.step(`Added Date = ${text}`, () => {});
      });

    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(3)"
    )
      .invoke("text")
      .then((text) => {
        cy.log(text);
        allure.step(`Total Recipients = ${text}`, () => {});
      });

    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(4)"
    )
      .invoke("text")
      .then((text) => {
        cy.log(text);
        allure.step(`Scheduled Date = ${text}`, () => {});
      });

    cy.xpath(
      "//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[1]/div[3]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[5]"
    )
      .invoke("text")
      .then((text) => {
        cy.log(text);
        allure.step(`Sender = ${text}`, () => {});
      });

    cy.xpath(
      "//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[1]/div[3]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[4]")
      .invoke("text")
      .then((text) => {
        cy.log(text);
        allure.step(`Sender = ${text}`, () => {});
      });
      cy.get("(body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(6) > span:nth-child(1)").then(text => {
  // Use the text content as needed
  cy.log(text);
  allure.step(`status of the message = ${text}`, () => {})
})
    })
  })
