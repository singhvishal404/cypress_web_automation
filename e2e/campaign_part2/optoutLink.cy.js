const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress";
describe("optout link", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });

  it("opt-out link", () => {
    let RESULT = [];
    let Tag = "";
    allure.step("REQUEST ", () => {})

    Tag += "\n";
    cy.xpath("//button[normalize-space()='Run Campaign']").click();

    cy.xpath("(//*[name()='svg'])[5]").click();
    cy.xpath("//span[normalize-space()='Business: vishal']").click();
    Tag += "senderid = vishal(businessname)";
    allure.step(Tag, () => {});
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//tbody/tr[1]/td[2]/span[1]")
      .invoke("text")
      .then((text) => {
        let Tag = "";
        cy.log(text);
        // Print the extracted text
        Tag += `group name(18 contacts):, ${text}`;
        allure.step(Tag, () => {});
      });
  

    cy.xpath("//tbody/tr[1]/td[1]").click();

    cy.wait(1000);
    cy.xpath(
      "//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']"
    ).click();
    cy.wait(2000);
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "optout testing"
    );

    allure.step("MESSAGE = optout testing", () => {});
    cy.xpath("//span[@class='ant-typography fs-6']").invoke("text").then(text => {
      cy.log(text);
      allure.step(`optout type = ${text}`, () => {})
  })
    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.wait(2000);
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.wait(3000);

    cy.xpath("//span[normalize-space()='History']").click();
    allure.step("RESULT =  ", () => {})

    cy.xpath("//tbody/tr[1]/td[4]/span[1]").click();
    cy.xpath("//tbody/tr[1]/td[2]/span[1]").invoke("text").as("text1");
    cy.xpath("//tbody/tr[1]/td[3]/span[1]").invoke("text").as("text2");

    cy.get("@text1").then((text1) => {
      cy.get("@text2").then((text2) => {
        
        allure.step(`RECIEVER: ${text2}`, () => {});
        allure.step(`SENDER: ${text1}`, () => {});

        cy.xpath(
          "//div[@class='ant-typography text-break ant-typography-ellipsis']"
        )
          .invoke("text")
          .then((text) => {
            const lastSixCharacters = text.slice(-6);
            cy.log("Last six characters:", lastSixCharacters);
            cy.visit(`appt.gunisms.com.au/optout/${lastSixCharacters}`).then(
              () => {
                cy.get("input").invoke("val", lastSixCharacters);


                cy.wait(3000);
                allure.step(`OPT OUT LINK = appt.gunisms.com.au/optout/${lastSixCharacters}`, () => {});
              }
            );
          });
        cy.xpath("//input[@name='number']").clear().type(text2); 
        cy.log(text2); 
        Tag += "\n";
        allure.step(`SENDER: ${text2}`, () => {});

        cy.xpath("//input[@name='sender']").clear().type(text1);
        cy.log(text1);
        cy.xpath("//input[@name='reason']").clear().type("testing");
        cy.xpath("//input[@value='this']").click();
        cy.xpath("//button[@type='submit']").click();
        cy.get(":nth-child(2) > .ant-typography").should("be.visible");
        cy.xpath("//span[normalize-space()='Audience']").click();
        cy.xpath("//li[normalize-space()='Opt-Out']").click();
        cy.xpath(
          "//input[@placeholder='Search for Blocked Contact Number']"
        ).type(text2);
       
        allure.step(`opted out Number: ${text2}`, () => {});

      });
    });
  });
  it.skip("opt-out_link through all campaign", () => {
    cy.xpath("//button[normalize-space()='Run Campaign']").click();

    // cy.xpath("//div[@title='Personal: 61405650398 ']").click();
    // cy.xpath("//span[normalize-space()='Business: vishal123']").click();
    cy.xpath("//div[@title='#SharedNum#']").click();

    cy.xpath("//button[@type='submit']").click();
    cy.xpath(
      "//tr[@class='ant-table-row ant-table-row-level-0 ant-table-row-selected']"
    ).click();

    cy.wait(1000);
    cy.xpath(
      "//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']"
    ).click();
    cy.wait(2000);
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "optout testing"
    );
    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.wait(2000);
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.wait(3000);
    cy.xpath("//span[normalize-space()='History']").click();
    cy.xpath("//tbody/tr[1]/td[4]/span[1]").click();
    cy.xpath("//tbody/tr[1]/td[2]/span[1]").invoke("text").as("text1");
    cy.xpath("//tbody/tr[1]/td[3]/span[1]").invoke("text").as("text2");
    cy.get("@text1").then((text1) => {
      cy.get("@text2").then((text2) => {
        cy.xpath(
          "//div[@class='ant-typography text-break ant-typography-ellipsis']"
        )
          .invoke("text")
          .then((text) => {
            const lastSixCharacters = text.slice(-6);
            cy.log("Last six characters:", lastSixCharacters);
            cy.visit(`appt.gunisms.com.au/optout/${lastSixCharacters}`).then(
              () => {
                cy.get("input").invoke("val", lastSixCharacters);
                cy.wait(2000);
              }
            );
          });
        cy.xpath("//input[@name='number']").clear().type(text2);
        cy.xpath("//input[@name='sender']").clear().type(text1);
        cy.xpath("//input[@name='reason']").clear().type("testing");
        cy.xpath("//input[@value='all']").click();
        cy.xpath("//button[@type='submit']").click();
        cy.get(":nth-child(2) > .ant-typography").should("be.visible");
        cy.xpath("//span[normalize-space()='Audience']").click();
        cy.xpath("//li[normalize-space()='Opt-Out']").click();
        cy.xpath(
          "//input[@placeholder='Search for Blocked Contact Number']"
        ).type(text2);
        cy.wait(1000);
        cy.reload();
        cy.wait(3000);

        allure.tag(Tag);
      });
    });
  });
});
