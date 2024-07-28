import { faker } from "@faker-js/faker";
const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("SENDERID", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });

  it("business number request", () => {
    
let Tag = ""

    const business_name = faker.person.fullName();
    cy.wait(2000)
    cy.xpath("//span[normalize-space()='Sender IDs']").click();
    cy.xpath("//button[normalize-space()='Add Sender ID']").click();
    cy.xpath("//span[normalize-space()='Business Name']").click();
    cy.xpath("//input[@placeholder='Enter business name']").type("vishal");
    Tag += "business name request = vishal"
    cy.xpath("//button[@type='submit']").click();
    cy.wait(1000)
    cy.xpath("//button[normalize-space()='Ok']").click()
  });
  it("personal number", () => {
    let Tag = ""

    function generate_Australian_PhoneNumber() {
      const mobile_Number = `04${faker.datatype.number({
        min: 10000000,
        max: 99999999,
      })}`;
      const formattedMobileNumber = mobile_Number.replace(
        /(\d{4})(\d{3})(\d{3})/,
        "$1 $2 $3"
      );
      return formattedMobileNumber;
    }

    cy.xpath("//span[normalize-space()='Sender IDs']").click();
    cy.xpath("//button[normalize-space()='Add Sender ID']").click();
    cy.xpath("//span[normalize-space()='Personal Number']").click();
    cy.xpath("//input[@placeholder='Enter a personal number']").type(
      generate_Australian_PhoneNumber()
    );
    Tag += "personal number request = 481606117"
    cy.xpath("//button[@type='submit']").click();
    cy.wait(2000)
    cy.xpath(
      "//input[@aria-label='Please enter verification code. Digit 1']"
    ).type("5");
    cy.xpath("//input[@aria-label='Digit 2']").type("6");
    cy.xpath("//input[@aria-label='Digit 3']").type("1");
    cy.xpath("//input[@aria-label='Digit 4']").type("4");
    cy.xpath("//input[@aria-label='Digit 5']").type("6");
    cy.xpath("//input[@aria-label='Digit 6']").type("7");
    allure.tag(Tag)
  });
});
