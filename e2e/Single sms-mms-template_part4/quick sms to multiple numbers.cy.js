import { faker } from "@faker-js/faker";
import * as allure from "allure-cypress";
const { signin } = require("../../../common/signin");

describe("quick sms multiple number testing", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//span[normalize-space()='Messaging']").click();
    cy.xpath("//a[contains(@href,'/quick-message')]").click();
  });

  it("quicksms with multiple numbers", () => {
    let Tag = "";

    function generate_Australian_PhoneNumber() {
      const mobile_Number = `4${faker.datatype.number({
        min: 10000000,
        max: 99999999,
      })}`;
      const formattedMobileNumber = mobile_Number.replace(
        /(\d{4})(\d{3})(\d{3})/,
        "$1 $2 $3"
      );
      return formattedMobileNumber;
    }

    const phoneNumber = generate_Australian_PhoneNumber();
    allure.step("REQUEST = ", () => {});

    cy.xpath("//div[normalize-space()='Enter mobile numbers']")
      .type("405650337,405650334,405650445{enter}");
    Tag += "mobile number = 405650337,405650334,405650445\n";
    allure.step("mobile number = 405650337,405650334,405650445", () => {});

    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "quick sms with multiple numbers"
    );
    allure.step("message = quick sms with multiple numbers", () => {});

    allure.step("RESULT = ", () => {});

    cy.xpath("//button[@type='submit']").click();
    cy.wait(1000);
    cy.xpath("//span[normalize-space()='History']").click();
    cy.wait(2000);
    cy.reload();
    cy.wait(2000);
   
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
