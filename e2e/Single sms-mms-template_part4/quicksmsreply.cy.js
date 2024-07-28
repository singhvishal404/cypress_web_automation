const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("quicksms reply", () => {
  it("quick sms reply with business name", () => {

    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
let Tag = ""
    // Click on "Run Campaign" and verify its visibility
    cy.xpath("//button[normalize-space()='Run Campaign']").should("be.visible");
    allure.step("REQUEST = ", () => {});

    // Navigate to New Message
    cy.xpath("//span[normalize-space()='Messaging']").click();
    cy.xpath("//li[normalize-space()='New Message']").click();

    // Fill in message details
    cy.xpath("//div[normalize-space()='Enter mobile numbers']").type(
      "405650337{enter}"
    );
    Tag += "mobile number = 405650337"
    allure.step("mobile number = 405650337", () => {});

    cy.xpath("//i[@aria-label='icon: down']//*[name()='svg']").click();
    Tag += "\n"
    let MobileNumber = "405650337"
    allure.step(`mobile number = ${MobileNumber}`, () => {});
    cy.xpath("//span[normalize-space()='Business: vishal']").click();
    Tag += "senderid = vishal(business name)"
    allure.step("senderid = vishal(business name) ", () => {});

    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "automation quick sms"
    );
    Tag += "\n"
    let SenderID = "vishal(business name)"

    allure.step("sender Id = vishal(business name)", () => {});
    Tag += "textarea message = automation quick sms"
    allure.step("message = automation quick sms", () => {});
    cy.xpath("//input[@name='replyLink']").click();
    cy.xpath("//input[@placeholder='Enter Reply Page Text']").type("testing");
    Tag += "Enter Reply Page Text = testing"
    Tag += "\n"
    allure.step("Enter Reply Page Text = testing ", () => {});

    cy.xpath("//button[@type='submit']").click();
    cy.wait(3000);
    cy.reload();
    allure.step("RESULT = ", () => {});

    // Extract last six characters from a message
    cy.xpath("//tbody/tr[1]/td[4]/span[1]").click();
    cy.xpath(
      "//div[@class='ant-typography text-break ant-typography-ellipsis']"
    )
      .invoke("text")
      .then((text) => {
        const lastSixCharacters = text.slice(-6);
        cy.log("Last six characters:", lastSixCharacters);
        Tag += `last six characters of reply link = ${lastSixCharacters}`
        Tag += "\n"
        allure.step(`last six characters of reply link = ${lastSixCharacters}`, () => {});

        // Visit reply page and perform actions
        cy.visit(`https://appt.gunisms.com.au/reply/${lastSixCharacters}`);
        cy.get("input").invoke("val", lastSixCharacters);
        Tag += `reply link =https://appt.gunisms.com.au/reply/${lastSixCharacters} `
        Tag += "\n"
        allure.step(`reply link =https://appt.gunisms.com.au/reply/${lastSixCharacters} `, () => {});

        // Wait for the input field to be visible and type the reply
        cy.xpath("//input[@placeholder='Type your response here...']")
          .should("be.visible")
          .clear()
          .type("reply");
          Tag += "\n"

        cy.xpath("//input[@value='Confirm']").click();
        let QuickSMSReply = "reply"
        allure.step(`message = ${QuickSMSReply}`, () => {});
        // Verify the reply in the History section
        cy.xpath("//span[normalize-space()='History']").click();
        cy.wait(2000);
        cy.reload();
        cy.wait(3000);
        cy.xpath("//tbody/tr[1]/td[4]/span[1]").click();
        // Get and compare the reply messages
        cy.xpath(
          "//div[@class='ant-typography text-break ant-typography-ellipsis']"
        )
          .invoke("text")
          .then((historyReplyMessage) => {
            expect(historyReplyMessage).to.equal("reply");
            allure.step(`type = ${historyReplyMessage}`, () => {});

          });
      });
  });
});
