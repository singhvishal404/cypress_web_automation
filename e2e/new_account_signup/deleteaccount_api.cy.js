
import { faker } from "@faker-js/faker";
import * as allure from "allure-cypress";
const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("https://apit.gunisms.com.au/api/v1/automation/delete-particular-user?email=admindependency@yopmail.com", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    
      
      describe("first delete accouht and then signup", () => {
          it("first delete accouht and then signup", () => {
            function generate_Australian_PhoneNumber() {
                const mobile_Number = `04${faker.datatype.number({ min: 10000000, max: 99999999 })}`;
                const formattedMobileNumber = mobile_Number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
                return formattedMobileNumber;
              }
    cy.visit("https://appt.gunisms.com.au/");

    cy.xpath("//span[@role='button']").click();
    cy.xpath("//input[@name='firstName']").type("vishal");

    cy.xpath("//input[@name='lastName']").type("singhh");
    

    cy.xpath("//input[@name='contact']").type("admindependency@yopmail.com");
    
    cy.xpath("//input[@name='password']").type("123456");
    
    cy.xpath("//input[@name='cpassword']").type("123456");
    cy.xpath("//button[@type='submit']").click();
    cy.wait(8000);
   let mobile = generate_Australian_PhoneNumber()
    cy.xpath("//input[@name='mobile']").type(mobile)
   
    cy.xpath("//button[@type='submit']").click()
    cy.wait(2000);
    cy.xpath("//input[@name='otp']").type("561467")

    cy.xpath("//button[@type='submit']").click()

          })
        })