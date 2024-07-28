const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress"
describe("run campaign through the group", () => {
  beforeEach(() => {
    let Tag = ""
    Tag += "url = https://appt.gunisms.com.au/"
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//span[normalize-space()='Audience']").click();
    cy.xpath("//li[normalize-space()='Groups']").click();
    allure.Tag(Tag)
  })
  it("run campaign through group", () => {
    let Tag = ""
    cy.xpath("//tbody/tr[1]/td[1]").invoke('text').then(text => {
      cy.log(text)
      Tag += `group name = ${text}`
      allure.step(`group name = ${text}`, () => {});

      Tag += "\n"

    })
    cy.xpath("//tbody/tr[1]").click()
    cy.xpath("//button[normalize-space()='Actions']").click()
    cy.xpath("//span[normalize-space()='Run Campaign']").click()
    cy.wait(2000)
    cy.xpath("//button[@class='btn text-nowrap app-btn_btnLightWithBg__3UKbv rounded ms-2']").click()
    cy.xpath("//textarea[@placeholder='Type a message']").type("run campaign through group")
    Tag += "TEXTAREA MESSAGE = run campaign through group "
    Tag += "\n"
    allure.step("message : run campaign through group ", () => {});

    cy.xpath("//button[normalize-space()='Test And Continue']").click()
    cy.xpath("//button[normalize-space()='Skip']").click()
    cy.xpath("//button[normalize-space()='Send']").click()
    cy.xpath("//button[normalize-space()='Send Campaign']").click()
    cy.xpath("//button[normalize-space()='Ok']").click()
   

  })

})