const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress";
describe("SIGNIN with wrong password", () => {
  it("sign in with wrong password", () => {
    let Tag = "";
    cy.visit("https://appt.gunisms.com.au/");
    cy.xpath("//input[@name='contact']").type("vishalsinghtanver@gmail.com");
    Tag += "URL = https://appt.gunisms.com.au/";
    let email;
    allure.step(Tag, () => {});
    email = "vishalsinghtanver100@gmail.com";

    allure.step(email, () => {});

    cy.xpath("//button[@type='submit']").click();
    Tag += "\n";
    let passwd;
    cy.wait(3000);
    cy.xpath("//input[@name='password']").type("vishal@122");
    passwd = "vishal@122";
    allure.step(passwd, () => {});

    cy.xpath("//button[@type='submit']").click();
    cy.wait(2000);
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//span[@class='text-center']").should("be.visible");
    cy.xpath("//span[@class='text-center']")
      .invoke("text")
      .then((text) => {
        // Use the text content as needed
        cy.log(text);
        allure.step(`POP UP MESSAGE = ${text}`, () => {});
      });
  });
});
