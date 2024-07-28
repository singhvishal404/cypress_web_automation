const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("quicksms with template", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//span[normalize-space()='Messaging']").click();
    cy.xpath("//a[contains(@href,'/quick-message')]").click();
  });
  it("quick sms with template", () => {
    let Tag = "";
    cy.xpath("//div[normalize-space()='Enter mobile numbers']").type("405650337{enter}");
    Tag += "mobile number = 405650337"
    Tag += "\n";
    let MobileNumber = "405650337";
    allure.step(`mobile number = ${MobileNumber}`, () => {});
    cy.xpath("//div[@class='ant-card-body']").click();

    cy.xpath("//i[@aria-label='icon: down']//*[name()='svg']").click();
    cy.xpath("//span[normalize-space()='#SharedNum#']").click();
    Tag += "senderid = shared number "

    cy.xpath("//i[@aria-label='icon: down']//*[name()='svg']").click()
    cy.xpath("//div[@title='#SharedNum#']").click();
    Tag += "senderid = shared number ";

    Tag += "\n"
    let SenderID = "shared number";
    allure.step(`sender ID= ${SenderID}`, () => {});
    cy.xpath("//span[normalize-space()='Use Template']").click()
    cy.xpath("//tbody/tr[1]/td[2]").click()
    Tag += "used template name = kapil sharma";
    Tag += "\n"
    allure.step("used template name = kapil sharma", () => {});

    cy.xpath("//button[@type='submit']").click();
    cy.wait(1000)
    cy.xpath("//span[normalize-space()='History']").click();
    cy.wait(2000);
    cy.reload()
    cy.wait(2000);
    allure.step("RESULT = ", () => {});

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
   
