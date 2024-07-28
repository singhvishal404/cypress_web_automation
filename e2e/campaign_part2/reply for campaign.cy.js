const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("reply camapign", () => {
  it("reply for campaign ", () => {
    let Tag = ""
    allure.step("REQUEST = ", () => {})

    Tag += "URL = https://appt.gunisms.com.au"
    

    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//button[normalize-space()='Run Campaign']").should("be.visible");
    cy.xpath("//span[normalize-space()='Dashboard']").click();
    cy.xpath("//button[normalize-space()='Run Campaign']").click();
    // cy.xpath("//button[normalize-space()='Create New']").click()
    cy.xpath("(//*[name()='svg'])[5]").click();
    cy.xpath("//li[@label='#SharedNum#']").click()
    Tag += ".  senderid = sharednumber"
    
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
  

    cy.xpath("//tbody/tr[1]/td[4]").click({ force: true });
    cy.xpath(
      "//button[@class='btn text-nowrap app-btn_btnLightWithBg__3UKbv'][normalize-space()='Next']"
    ).click();
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "reply campaign  number testing"
    );
    Tag += " message = reply campaign  number testing"
    allure.step(Tag, () => {});
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
    cy.wait(2000);
    allure.step("RESULT = ", () => {})

    cy.xpath("//tbody/tr[1]/td[2]/span[1]").invoke("text").as("text1");
    cy.xpath("//tbody/tr[1]/td[3]/span[1]").invoke("text").as("text2");
    cy.get("@text1").then((text1) => {
      cy.get("@text2").then((text2) => {
        cy.log(text1)
        cy.log(text2)
        Tag += `sender = ${text1}}`
        allure.step(`sender = ${text1}`, () => {});


        Tag += `reciver = ${text2}`
        allure.step(`reciver = ${text2}`, () => {});

        cy.request({
          method: "POST",
          url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            body: "reply_campaign",
            from: text2,
            id: "01G6M5VSW41BYB0HW6MF6D003A",
            to: text1,
            type: "mo_text",
          },
        }).then((response) => {
          // Log the response to the Cypress console
          cy.log(response);

          // Perform assertions on the response
          expect(response.status).to.equal(200);
          cy.xpath("//span[normalize-space()='History']").click();
          cy.wait(2000);
          cy.reload();
          cy.wait(3000);
          cy.xpath("//tbody/tr[1]/td[4]/span[1]").click();
          cy.xpath(
            "//div[@class='ant-typography text-break ant-typography-ellipsis']"
          )
            .invoke("text")
            .then((historyReplyMessage) => {
              expect(historyReplyMessage).to.equal("reply_campaign");
              Tag += "reply message = reply_campaign "
              allure.step("reply message = reply_campaign ", () => {});

            })
            cy.xpath("//span[@class='ant-typography text-capitalize']").then(text => {
              // Use the text content as needed
              cy.log(text);
              allure.step(`campaign name = ${text}`, () => {})
            });
            cy.xpath("//tbody/tr[6]/td[1]").then(text => {
  // Use the text content as needed
  cy.log(text);
  allure.step(`status of the message = ${text}`, () => {})
})
        });
      });
    });

  });
});
