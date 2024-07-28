const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("security for changing password", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });
  it("security", () => {
    let Tag = ""

    cy.xpath("//img[@alt='menu']").trigger("Security").click();
    cy.xpath(
      "//span[normalize-space()='Security']"
    ).click();
    cy.xpath("//input[@placeholder='Enter Old password']").type("123456");
    Tag += "OLD PASSWORD = 123456"
    Tag += "\n"

    cy.xpath("//input[@placeholder='Password']").type("123456");
    Tag += "NEW PASSWORD = 123456"
    Tag += "\n"

    cy.xpath("//input[@placeholder='Confirm Password']").type("123456");
    Tag += "CONFIRM NEW PASSWORD = 123456"
    Tag += "\n"

    cy.xpath("//button[@type='submit']").click();
    cy.xpath(
      "//strong[normalize-space()='Password created successfully']"
    ).should("be.visible");
    allure.tag(Tag)
  });
  it("wrong password", () => {
    let Tag = ""

    cy.xpath("//img[@alt='menu']").trigger("Security").click();
    cy.xpath(
      "//span[normalize-space()='Security']"
    ).click();
    cy.xpath("//input[@placeholder='Enter Old password']").type("vishal@1223");
    Tag += " OLD PASSWD = vishal@1223"
    Tag += "\n"

    cy.xpath("//input[@placeholder='Password']").type("vishal@1223");
    Tag += "new passwd = vishal@1223"
    Tag += "\n"

    cy.xpath("//input[@placeholder='Confirm Password']").type("vishal@1223");
    Tag += "confirm passwd = vishal@1223"
    Tag += "\n"

    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//span[@class='text-center']").should("be.visible");
    allure.tag(Tag)
  });
});
