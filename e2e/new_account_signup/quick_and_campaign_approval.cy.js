const { signin } = require("../../../common/signin");
import { faker } from "@faker-js/faker";
import * as allure from "allure-cypress";
import { adminLogin, adminLogout } from "../../../common/adminlogin";
describe("quick sms approval and campaign approval ", () => {
  it("signin and verified verification form", () => {
   
    let Tag = "";
    cy.visit("https://appt.gunisms.com.au/");
    Tag += "URL = https://appt.gunisms.com.au/";

    cy.xpath("//input[@name='contact']").type("admindependency@yopmail.com");
    cy.xpath("//button[@type='submit']").click();
    cy.wait(3000);
    cy.xpath("//input[@name='password']").type("123456");

    cy.xpath("//button[@type='submit']").click();
    cy.wait(2000);
    cy.request({
      method: "GET",
      url: "https://apit.gunisms.com.au/api/v1/automation/fetch-otp?type=mobile&email=admindependency@yopmail.com",
    }).then((response) => {
      // Log the response body
      cy.log(response.body.data.shortCode);
      
    cy.xpath(
      "//input[@aria-label='Please enter verification code. Digit 1']"
    ).type(response.body.data.shortCode[0]);
    cy.log(response.body.data.shortCode[0]);
    cy.xpath("//input[@aria-label='Digit 2']").type(
      response.body.data.shortCode[1]
    );
    cy.xpath("//input[@aria-label='Digit 3']").type(
      response.body.data.shortCode[2]
    );
    cy.xpath("//input[@aria-label='Digit 4']").type(
      response.body.data.shortCode[3]
    );
    cy.xpath("//input[@aria-label='Digit 5']").type(
      response.body.data.shortCode[4]
    );
    cy.xpath("//input[@aria-label='Digit 6']").type(
      response.body.data.shortCode[5]
    );
    cy.wait(3000);
  })
   cy.xpath("//span[normalize-space()='Verification']").click();
       
        cy.xpath("//button[normalize-space()='+ New Business Profile']").should("be.visible").then(($button) => {
          if ($button.length > 0) {
            // If the element is visible, click on it
            cy.wrap($button).click();
          } else {
            // If the element is not visible, you can log a message or perform other actions
           
          }

        });  
          cy.wait(3000);
        cy.xpath("//input[@value='business']").click();
        cy.xpath("//input[@name='businessName']").type("business name");
        cy.xpath("//input[@name='contactName']").type("contact name");
        cy.xpath("//textarea[@name='address']").type("address");
        cy.xpath("//input[@name='website']").type("website.com");
        cy.xpath("//input[@name='contactEmail']").type("yopmail@gmail.com");
        cy.xpath("//input[@name='abn']").type("ABN");
        cy.xpath("//div[@class='ant-select-selection__placeholder']").click();
        cy.xpath("//li[normalize-space()='One Time Password']").click();
        cy.wait(2000);
        cy.xpath("//button[@type='submit']").click();
        cy.wait(3000);
        cy.xpath("//input[@type='checkbox']").click();
        cy.xpath("//button[normalize-space()='Submit']").click();
        cy.xpath("//strong[normalize-space()='Successfully Submitted!']").should(
          "be.visible"
        );
        cy.xpath("//button[normalize-space()='Ok']").click();
        adminLogin(cy)
        adminLogout(cy)
        cy.wait(3000)
        
        // automation of individual verification form
        cy.xpath("//button[normalize-space()='+ New Business Profile']").click();
        cy.xpath("//input[@value='individual']").click();
        cy.wait(2000);
        cy.xpath("//input[@name='contactName']").type("Contact Name");
        cy.xpath("//textarea[@name='address']").type("Address");
        cy.xpath("//input[@name='contactEmail']").type("unknown@yopmail.com");
        cy.xpath("//input[@name='abn']").type("ABN");
        cy.xpath("//div[@class='ant-select-selection__placeholder']").click();
        cy.xpath("//li[normalize-space()='Other (please describe)']").click();
        cy.xpath("//textarea[@name='description']").type(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        );
        cy.xpath("//button[@type='submit']").click();
        cy.wait(3000);
        cy.xpath("//input[@type='checkbox']").click();
        cy.xpath("//button[normalize-space()='Submit']").click();
        cy.wait(1000);
        cy.xpath("//button[normalize-space()='Ok']").click();
        cy.request({
            method: 'PUT',
            url: 'https://apit.gunisms.com.au/api/v1/automation/verification-form-reject?email=admindependency@yopmail.com',
            followRedirect: true  // Cypress automatically follows redirects by default
          }).then((response) => {
            // Handle response here
            console.log(response.body);
          })

    cy.xpath("//span[normalize-space()='Audience']").click();
    cy.xpath("//li[normalize-space()='Groups']").click();
    cy.xpath("//tbody/tr[1]/td[1]").click();
    cy.wait(2000);
    cy.xpath("//button[normalize-space()='Actions']").should("be.visible");
    const Business_name = faker.person.fullName();
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
    // add contact
    // for (let i = 0; i < 5; i++) {
    //   cy.xpath("//button[normalize-space()='Actions']").click();
    //   cy.xpath("//span[normalize-space()='Add Contacts']").click();
    //   cy.xpath("//button[normalize-space()='Add Single Contact']").click();
    //   cy.xpath("//input[@placeholder='Enter Number']").type(
    //     generate_Australian_PhoneNumber()
    //   );
    //   cy.xpath(
    //     "//input[@name='first_name' and @placeholder='Enter first_name']"
    //   ).type(business_name);
    //   cy.xpath("//button[@type='submit']").click();
    //   cy.xpath("//button[normalize-space()='Ok']").click();

    // }
    it("quick and campaign approval", () => {
   
    cy.xpath("//tbody/tr[1]/td[1]").click();
    cy.xpath("//button[normalize-space()='Actions']").click();
    cy.xpath("//span[normalize-space()='Run Campaign']").click();
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "campaign testing on staging"
    );
    

    cy.xpath(
      "//div[contains(@class,'mb-md-0 mb-3 d-flex')]//button[contains(@type,'submit')][normalize-space()='Next']"
    ).click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.xpath("//span[normalize-space()='Waiting Approval']").should("exist");
    // quick sms approval
    cy.xpath("//span[normalize-space()='Messaging']").click();
    cy.xpath("//li[normalize-space()='New Message']").click();
    cy.xpath("//div[normalize-space()='Enter mobile numbers']").type(
      "405650337{enter}"
    );
   
    cy.xpath("//input[@class='ant-select-search__field']");
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "testing automation of quick sms"
    );
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.xpath("//tbody/tr[1]/td[6]/span[1]").should(
      "have.text",
      "WAITING APPROVAL"
    );
  });
cy.wait(1000)
  cy.reload()
cy.wait(2000)
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
})
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
})
  