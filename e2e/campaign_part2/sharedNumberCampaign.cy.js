const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
import { faker } from "@faker-js/faker";

describe("campaign", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });
  it("campaign through shared number and then reply stop ", () => {
    function generate_Australian_PhoneNumber() {
      const mobile_Number = `04${faker.datatype.number({ min: 10000000, max: 99999999 })}`;
      const formattedMobileNumber = mobile_Number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
      return formattedMobileNumber;
    }
    let Tag = ""

    cy.xpath("//span[normalize-space()='Audience']").click();
    cy.xpath("//li[normalize-space()='Groups']").click();
    cy.xpath("//button[normalize-space()='Add Group']").click();
    cy.xpath("//p[contains(text(),'Import file from')]").click()
    cy.fixture("testing_group (3)_automation (1).xlsx", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('input[type="file"]').then((el) => {
          const testFile = new File([fileContent], "testing_group (3)_automation (1).xlsx", {
            type: "application/vnd.ms-excel",
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el[0].files = dataTransfer.files;
          cy.wrap(el).trigger("change", { force: true });
        });
        cy.xpath("//button[@type='submit']").click()
        cy.wait(2000);
        cy.xpath("//tbody/tr[1]/td[2]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/span[1]/i[1]//*[name()='svg']").click()
        cy.xpath("//span[@class='ant-typography text-capitalize ant-typography-ellipsis ant-typography-ellipsis-single-line'][normalize-space()='mobile number']").click()
        
  
        cy.xpath("//tbody/tr[2]/td[2]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]").click()
        cy.xpath("//span[contains(@class,'ant-typography text-capitalize ant-typography-ellipsis ant-typography-ellipsis-single-line')][normalize-space()='first_name']").click()
        cy.xpath("//div[@class='ant-select-selection__placeholder']").click()
        cy.xpath("//span[@class='ant-typography text-capitalize ant-typography-ellipsis ant-typography-ellipsis-single-line']").click()
        cy.xpath("//button[normalize-space()='Finalize Import']").click()
        cy.wait(2000)
        cy.xpath("//button[normalize-space()='Ok']").click()
        cy.wait(3000)
        cy.xpath("//tbody/tr[1]/td[2]").click()
        cy.xpath("//tbody/tr[1]/td[1]").click()
        cy.xpath("//button[normalize-space()='Actions']").click()
        cy.xpath("//span[normalize-space()='Edit Contact']").click()
        cy.xpath("//input[@placeholder='Enter Number']").clear().type(generate_Australian_PhoneNumber())
        cy.xpath("//button[@type='submit']").click()
        cy.xpath("//button[normalize-space()='Ok']").click()
        cy.xpath("//span[normalize-space()='Campaign']").click()
    allure.step("REQUEST = ", () => {})

    cy.xpath("//button[normalize-space()='Run Campaign']").click();
                                                                                               // cy.xpath("//button[normalize-space()='Create New']").click()
    cy.xpath("//i[@type='button']").click();
    cy.xpath("//input[@placeholder='Campaign Name']").type("testing");
    
    allure.step("name of the campaign = testing", () => {})

    cy.xpath("(//*[name()='svg'])[5]").click();
    cy.xpath("//li[@label='#SharedNum#']").click()
    allure.step("sender id = shared number", () => {})

    cy.xpath("//button[@type='submit']").click();
    cy.wait(2000)
    cy.reload()

    cy.xpath("//tbody/tr[1]/td[2]/span[1]")
    .invoke("text")
    .then((text) => {
      let Tag = ""
      cy.log(text)
      // Print the extracted text
      Tag += `group name(18 contacts):, ${text}`;
      allure.tag(Tag)
    });
    cy.xpath("//tbody/tr[1]/td[4]").click();
    cy.xpath(
      "//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']"
    ).click();
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "automation testing "
    );

    allure.step("message = automation testing", () => {})

    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    // cy.xpath("//button[normalize-space()='Send Test SMS']").click()
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.xpath("//span[normalize-space()='History']").click();
    allure.step("RESULT = ", () => {})

    cy.xpath("//tbody/tr[2]/td[2]/span[1]").invoke("text").as("text1");
    cy.xpath("//tbody/tr[2]/td[3]/span[1]").invoke("text").as("text2");
    cy.get("@text1").then((text1) => {
      cy.get("@text2").then((text2) => {
        Tag += `sender = ${text1}`
        Tag += `reciver = ${text2}`
        allure.step(`sender = ${text1}`, () => {})
        allure.step(`reciver = ${text2}`, () => {})

        cy.log(text1)
        cy.log(text2)
        cy.request({
          method: "POST",
          url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            body: "stop",
            from: text2,
            id: "01G6M5VSW41BYB0HW6MF6D003A",
            to: text1,
            type: "mo_text",
          },
        }).then((response) => {
          // Log the response to the Cypress console
          cy.log(response);
          cy.wait(1000);
          allure.step(`api response = ${response}`, () => {})

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
              expect(historyReplyMessage).to.equal("stop");
              cy.wait(2000)
              Tag += `history message = ${historyReplyMessage}`
              allure.step(`history message = ${historyReplyMessage}`, () => {})

            })

          // Other assertions as needed
          cy.xpath("//span[normalize-space()='Audience']").click();
          cy.xpath("//li[normalize-space()='Opt-Out']").click();
          cy.xpath(
            "//input[@placeholder='Search for Blocked Contact Number']"
          ).type(text2);
          allure.step(`blocked number = ${text2}`, () => {})

        });
        cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[6]/div[1]/span[1]").then(text => {
  // Use the text content as needed
  cy.log(text);
  allure.step(`status of the message = ${text}`, () => {})
})
      });

    });
  });
});
})
