const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress";

describe("workflow", () => {
  it("workflow", () => {
    cy.visit("https://appt.gunisms.com.au/");

    // Sign in using the signin function
    signin(cy);
    cy.xpath("div[class='applayout_item__2UJHb applayout_active__1eHHH mx-auto p-1'] span[class='ant-typography applayout_label__3g3H8 d-flex justify-content-between align-items-center']").click()
cy.xpath("//li[normalize-space()='Workflow Actions']").click()
cy.wait()
  cy.xpath("//button[@role='switch']").invoke('attr', 'aria-checked')
.then((checked) => {
  if (checked === 'false') {
    cy.xpath("//button[@type='button' and @role='switch']").click();
  } else {
    cy.log('The switch is already on.');
  }
});
cy.xpath("//span[normalize-space()='Campaign']").click()
    // Ensure the campaign button is visible and click on the dashboard
    cy.xpath("//button[normalize-space()='Run Campaign']").should("be.visible");
    cy.xpath("//span[normalize-space()='Dashboard']").click();

    // Start the campaign process
    cy.xpath("//button[normalize-space()='Run Campaign']").click();
    cy.xpath("(//*[name()='svg'])[5]").click();
    cy.xpath("//span[normalize-space()='Dedicated: 61447213465']").invoke("text").then(text => {
      // Use the text content as needed
      cy.log(text);
      allure.step(`campaign name = ${text}`, () => {})
    });
    cy.xpath("//span[normalize-space()='Dedicated: 61447213465']").click();
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//tbody/tr[1]/td[4]").click({ force: true });

    // Proceed through the campaign steps
    cy.xpath(
      "//button[@class='btn text-nowrap app-btn_btnLightWithBg__3UKbv'][normalize-space()='Next']"
    ).click();
    cy.xpath("//textarea[@placeholder='Type a message']").type("dedicated number testing");
    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();

    // Navigate to History and refresh the page
    cy.xpath("//span[normalize-space()='History']").click();
    cy.wait(1000);
    cy.reload();
    cy.wait(2000);

    // Extract text values
    cy.xpath("//tbody/tr[1]/td[2]/span[1]").invoke("text").as("text1");
    cy.xpath("//tbody/tr[1]/td[3]/span[1]").invoke("text").as("text2");

    cy.get("@text1").then((text1) => {
      cy.get("@text2").then((text2) => {
        cy.log(`Text 1: ${text1}`);
        cy.log(`Text 2: ${text2}`);

        // Send a test SMS request
        cy.request({
          method: "POST",
          url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            body: "testing",
            from: text2,
            id: "01G6M5VSW41BYB0HW6MF6D003A",
            to: "61447213465",
            type: "mo_text",
          },
        }).then((response) => {
          // Log the response to the Cypress console
          Cypress.log({ name: "API Response", message: response });
          
          // Perform assertions on the response
          expect(response.status).to.equal(200);

          // Additional checks if needed
          cy.xpath("//span[normalize-space()='History']").click();
          cy.wait(2000)
          cy.reload()
          cy.xpath("//tbody/tr[1]/td[1]").click()
          cy.xpath("//tbody/tr[@class='ant-table-expanded-row ant-table-expanded-row-level-1']/td/div[@class='ant-row-flex ant-row-flex-middle']/div[@class='ant-col ant-col-24']/div[1]/div[1]")
          .invoke('text')
          .then((text) => {
            // Log the text content to the Cypress console
            cy.log(text);
            // Optionally, you can also use the text content for further steps or assertions
            allure.step(`camapaing name: ${text}`, () => {});
          });
             cy.xpath("//tbody//div[4]").invoke('text')
             .then((text) => {
               // Log the text content to the Cypress console
               cy.log(text);
               // Optionally, you can also use the text content for further steps or assertions
               allure.step(`type: ${text}`, () => {});
             });     
             cy.xpath("//div[@class='ant-typography text-break ant-typography-ellipsis']").invoke('text')
             .then((text) => {
               // Log the text content to the Cypress console
               cy.log(text);
               // Optionally, you can also use the text content for further steps or assertions
               allure.step(`message: ${text}`, () => {});
             }); 
              // Other assertions or actions as needed
        });
      });
    });
  });
});