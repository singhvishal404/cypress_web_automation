const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress";
import { faker } from "@faker-js/faker";

describe("group operations", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//span[normalize-space()='Audience']").click();
    cy.xpath("//li[normalize-space()='Groups']").click();
  });

  it("view group and add contact", () => {
    let Tag = "";
    const FFull_Name = faker.person.fullName();
    const groupname = faker.company.buzzAdjective();
    
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

    const random_aus_number = generate_Australian_PhoneNumber();

    cy.xpath("//tbody/tr[1]/td[1]").click();
    cy.wait(2000);
    cy.xpath("//button[normalize-space()='Actions']").should("be.visible");

    // Add contact 
    cy.xpath("//tbody/tr[1]/td[1]").invoke("text").then((text) => {
      Tag += `group name(18 contacts) = ${text}`;
      Tag += "\n";
      allure.step(`group name(18 contacts) = ${text}`, () => {});

      cy.xpath("//tbody/tr[1]/td[1]").click();
      cy.xpath("//button[normalize-space()='Actions']").click();
      cy.xpath("//span[normalize-space()='Add Contacts']").click();
      cy.xpath("//button[normalize-space()='Add Single Contact']").click();
      cy.xpath("//input[@placeholder='Enter Number']").type(random_aus_number);
      allure.step(`add single contact number: ${random_aus_number}`, () => {});
      Tag += "\n";

      cy.xpath("//input[@placeholder='Enter first name']").type(FFull_Name);
      allure.step(`single contact name: ${FFull_Name}`, () => {});
      cy.xpath("//button[@type='submit']").click();
      cy.xpath("//button[normalize-space()='Ok']").click();
      cy.xpath(`//span[normalize-space()='${random_aus_number}']`).should('exist');
      allure.tag(Tag);
    });
  });

  it("create group in the group", () => {
    let Tag = "";
    const groupname = faker.company.buzzAdjective();

    cy.xpath("//tbody/tr[1]/td[1]").click();
    cy.xpath("(//td[@class='ant-table-selection-column'])[1]").click();
    cy.xpath("//body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/td[1]/span[1]/label[1]").click();
    cy.xpath("//button[normalize-space()='Actions']").click();
    cy.xpath("//span[normalize-space()='Create Group']").click();
    cy.xpath("//input[@placeholder='Name of the Group']").type(groupname);
    Tag += "\n";
    allure.step(`group name : ${groupname}`, () => {});

    const expectedText = groupname;

    cy.xpath("//button[@id='create-group-btn']").click();
    cy.xpath("//button[normalize-space()='Go to Group']").click();
    allure.tag(Tag);
  });

  it("delete group contact", () => {
    cy.xpath("//tbody/tr[1]").click();
    cy.xpath("//*[@id='page-content-wrapper']/div/div/div/div[5]/div/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]").click();
    cy.xpath("//button[normalize-space()='Actions']").click();
    cy.xpath("//span[normalize-space()='Delete Contacts']").click();
    cy.xpath("//button[normalize-space()='Yes']").click();
    cy.wait(2000);
    cy.xpath("//button[normalize-space()='Ok']").click();
  });
});