const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("SIGNIN", () => {
  it("sign in with password", () => {
    let Tag = ""
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    Tag += "URL = https://appt.gunisms.com.au/"
    Tag += "\n"
    let EMAIL
    EMAIL = "guniautomation@yopmail.com"
    allure.step(`EMAIL = ${EMAIL}`, () => {})
    Tag += "\n"
    let PASSWD
    PASSWD = "123456"
    allure.step(`PASSWORD = ${PASSWD}`, () => {})
    cy.xpath("//button[normalize-space()='Run Campaign']").should("be.visible");
allure.tag(Tag)
    // // send quick sms approval
    // cy.xpath("//span[normalize-space()='Messaging']").click()
    // cy.xpath("//li[normalize-space()='New Message']").click()
    // cy.xpath("//input[@placeholder='Enter mobile numbers']").type("405650337")
    // cy.xpath("//div[@class='ant-popover ant-popover-placement-bottomLeft']//li[2]").click()
    // // cy.xpath("//div[@class='ant-popover ant-popover-placement-bottomLeft']//li[2]").click()
    // cy.xpath("//textarea[@placeholder='Type a message']").type("testing automation of quick sms")
    // cy.xpath("//button[@type='submit']").click()
    // cy.wait(3000);
    // // cy.xpath("//button[normalize-space()='Ok']").click()
    // cy.wait(2000);
    // cy.xpath("//span[normalize-space()='History']").click()
    // cy.xpath("//tbody/tr[1]/td[6]/span[1]").should('contains', "WAITING APPROVAL")
    //     // send campaign aproval message
    // cy.xpath("//span[contains(@class,'ant-typography applayout_label__3g3H8 d-flex justify-content-start align-items-center')][normalize-space()='Campaign']").click()
    // cy.xpath("//button[normalize-space()='Run Campaign']").click()
    // cy.xpath("//button[@type='submit']").click()
    // cy.xpath("//input[@value='6540a54b9bd7403d761400fb']").click()
    // cy.xpath("//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']").click()
    // cy.xpath("//textarea[@placeholder='Type a message']").type("campaign testing on staging")
    // cy.xpath("//div[contains(@class,'mb-md-0 mb-3 d-flex')]//button[contains(@type,'submit')][normalize-space()='Next']").click()
    // cy.xpath("//button[normalize-space()='Send']").click()
  });

  it("sign in with number", () => {
    let tag = ""
    cy.visit("https://appt.gunisms.com.au/");
    tag += "URL = https://appt.gunisms.com.au/"
    allure.step("URL = https://appt.gunisms.com.au/", () => {})

    cy.xpath("//input[@name='contact']").type("405650337");
    tag += "\n"
    tag += "mobilenumber = 405650337" 
    allure.step("mobilenumber = 405650337", () => {})

    cy.xpath("//button[@type='submit']").click();
    cy.wait(2000);
    tag += "\n"
    cy.xpath(
      "//input[@aria-label='Please enter verification code. Digit 1']"
    ).type("5");
    cy.xpath("//input[@aria-label='Digit 2']").type("6");
    cy.xpath("//input[@aria-label='Digit 3']").type("1");
    cy.xpath("//input[@aria-label='Digit 4']").type("4");
    cy.xpath("//input[@aria-label='Digit 5']").type("6");
    cy.xpath("//input[@aria-label='Digit 6']").type("7");
    cy.wait(3000);
    cy.xpath("//button[normalize-space()='Run Campaign']").should("be.visible");
tag += " OTP = 561467"
allure.step("OTP = 561467", () => {})

  });

})
