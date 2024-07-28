const { login, signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("template", () => {
  it("Add template", () => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    let Tag = ""
    Tag += "URL = https://appt.gunisms.com.au/ "
    cy.xpath(
      "//a[contains(@href,'/template')]//li//div[contains(@class,'mx-auto p-1 position-relative')]"
    ).click();
    Tag += "\n"
    cy.xpath("//button[normalize-space()='Add Template']").click();
    cy.xpath("//input[@placeholder='Enter Template Name']").type(
      "kapil sharma"
    );
   
    allure.step("template name = kapil sharma", () => {});

    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "hii this is a for sample testing message. "
    );
    allure.step("template message = hii this is a for sample testing message.", () => {});

    cy.xpath("//button[normalize-space()='Add Template']").click();
    cy.get(".ant-typography.m-0").should(
      "have.text",
      "New template have been added successfully"
    );
    cy.xpath("//button[normalize-space()='Ok']").click();
    allure.step("template pop up message = New template have been added successfully ", () => {})

  });
});
