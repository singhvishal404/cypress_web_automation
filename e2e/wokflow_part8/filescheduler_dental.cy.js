const { signin } = require("../../../common/signin");
const xlsx = require("xlsx");
const path = require("path");
import * as allure from "allure-cypress";

describe("file scheduler dental profile", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });

  it("file scheduler dental profile", () => {
    cy.xpath("//span[normalize-space()='Messaging']").click();
    cy.xpath("//li[normalize-space()='File Scheduler']").click();
    cy.xpath("//button[normalize-space()='+']").click();

    cy.fixture("Dentist file (4).xls", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.xpath("//input[@type='file']").then((el) => {
          const testFile = new File([fileContent], "Dentist file (4).xls", {
            type: "application/vnd.ms-excel",
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el[0].files = dataTransfer.files;
          cy.wrap(el).trigger("change", { force: true });
          cy.wait(2000);
        });
      });

    cy.xpath(
      "//div[@class='form-group']//div[@class='form-group']//i[@aria-label='icon: down']//*[name()='svg']"
    ).click();
    cy.xpath("//li[normalize-space()='Dedicated: 61447213465']").click();

    var time = new Date();
    time.setMinutes(time.getMinutes() + 2);
    let newTimeString =
      time.getFullYear() +
      "-" +
      ("0" + (time.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + time.getDate()).slice(-2) +
      " " +
      ("0" + time.getHours()).slice(-2) +
      ":" +
      ("0" + time.getMinutes()).slice(-2) +
      ":" +
      ("0" + time.getSeconds()).slice(-2);

          // Update the date input field
    cy.xpath("//input[@placeholder='Select date']").click();
    cy.xpath("//input[contains(@class,'ant-calendar-input')]")
      .clear()
      .type(newTimeString, { force: true });
    cy.xpath("//a[normalize-space()='Ok']").click();
    cy.xpath(
      "//div[5]//div[1]//div[1]//span[1]//i[1]//*[name()='svg']"
    ).click();
    cy.xpath("//li[normalize-space()='IST|UTC +5:30']").click();
    cy.xpath("//textarea[@name='message']").type("file scheduler testing");
    cy.xpath("//button[@type='submit']").click();

    cy.wait(1000);

    cy.visit("https://appt.gunisms.com.au/history")
    
    cy.wait(150000);

    // First status check for "sent" or "delivered"
    cy.xpath("//tbody/tr[1]/td[6]/span[1]").then(($status) => {
      const statusText = $status.text().toLowerCase();
      expect(statusText.includes("sent") || statusText.includes("delivered")).to.be.true;
    });

    // Extracting text values
    cy.xpath("//tbody/tr[2]/td[1]").invoke("text").then((receiver) => {
      cy.xpath("//tbody/tr[1]/td[2]/span[1]").invoke("text").then((sender) => {
        // Perform API request with extracted values
        cy.request({
          method: "POST",
          url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            body: "yes",
            from: receiver,
            id: "01G6M5VSW41BYB0HW6MF6D003A",
            to: sender,
            type: "mo_text",
          },
        }).then((response) => {
          cy.log(response);
          expect(response.status).to.equal(200);
        });
      });
    });

    cy.wait(3000);
    cy.reload();
    cy.wait(2000);

    // Second status check for "received"
    cy.xpath("//tbody/tr[1]/td[6]/span[1]").then(($status) => {
      const statusText = $status.text().toLowerCase();
      expect(statusText).to.contain("received");
      allure.step(`STATUS OF THE MESSAGE = ${statusText}`, () => {});
      cy.wait(2000)
      
    });
  });
})
