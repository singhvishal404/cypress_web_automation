const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("logout", () => {


  it("simple logout test", () => {
    let Tag = ""
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    Tag += "URL = https://appt.gunisms.com.au/"
    let EMAIL
    allure.step(Tag, () => {});
    EMAIL = "guniautomation@yopmail.com"

    allure.step(EMAIL, () => {});

    Tag += "\n" 
    let PASSWD
     PASSWD = "123456"
    allure.step(PASSWD, () => {});
    
    cy.xpath("//img[@alt='menu']").trigger("Logout").click();
    cy.xpath(
      "//body/div/div/div/div/div[@role='tooltip']/div/div/div/ul/li[1]/span[1]"
    ).click();
    cy.xpath("//button[normalize-space()='Log Out']").click();
    cy.title().should("contain", "Sign-In | Guni Online and Bulk SMS Gateway");
    
  });
});
