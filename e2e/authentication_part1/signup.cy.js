import { faker } from '@faker-js/faker';
import * as allure from "allure-cypress"
import { name } from 'commander';
function generate_Australian_PhoneNumber() {
  const mobile_Number = `04${faker.datatype.number({ min: 10000000, max: 99999999 })}`;
  const formattedMobileNumber = mobile_Number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  return formattedMobileNumber;
}
describe("Signup", () => {
  it("signup.cy", () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    let Tag = ""
    cy.visit("https://appt.gunisms.com.au/");
    Tag += "URL = https://appt.gunisms.com.au/"
    cy.xpath("//span[@role='button']").click();
    cy.xpath("//input[@name='firstName']").type(firstName);
    Tag += `first name = ${firstName}`
    Tag += "\n"
    allure.step(`firstName = ${firstName}`, () => {})
    allure.step(`lastName = ${lastName}`, () => {})

    cy.xpath("//input[@name='lastName']").type(lastName);
    Tag += `last name= ${lastName}`
    Tag += "\n"

    cy.xpath("//input[@name='contact']").type(email);
    
    Tag += `email = ${email}`
    Tag += "\n"
    allure.step(`email = ${email}`, () => {})
    cy.xpath("//input[@name='password']").type("123456");
    let passwd
    passwd = "123456"
    allure.step(`PASSWORD = ${passwd}`, () => {})
    Tag += "\n"
    cy.xpath("//input[@name='cpassword']").type("123456");
    cy.xpath("//button[@type='submit']").click();
    cy.wait(8000);
   let mobile = generate_Australian_PhoneNumber()
    cy.xpath("//input[@name='mobile']").type(mobile)
    Tag += `mobile number for signup = ${mobile}`
    Tag += "\n"
    cy.xpath("//button[@type='submit']").click()
    cy.wait(3000);
    cy.xpath("//input[@name='otp']").type("789321")
    let OTP
    OTP = "789321"
    allure.step(`OTP = ${OTP}`, () => {})

    cy.xpath("//button[@type='submit']").click()

    cy.xpath("//span[normalize-space()='Verification']").click();
    cy.xpath("//button[normalize-space()='+ New Business Profile']").click();
    cy.xpath(
      "//input[@aria-label='Please enter verification code. Digit 1']"
    ).type("5");
    cy.xpath("//input[@aria-label='Digit 2']").type("6");
    cy.xpath("//input[@aria-label='Digit 3']").type("1");
    cy.xpath("//input[@aria-label='Digit 4']").type("4");
    cy.xpath("//input[@aria-label='Digit 5']").type("6");
    cy.xpath("//input[@aria-label='Digit 6']").type("7");
    cy.wait(3000);
   allure.tag(Tag)
  })
})
