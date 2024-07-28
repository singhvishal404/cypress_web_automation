import { faker } from "@faker-js/faker";
import * as allure from "allure-cypress";
describe("Signup", () => {
    it("signup.cy", () => {
        let tag = ""
        cy.request({
            method: "GET",
            url: "https://apit6110.gunisms.com.au/api/v1/automation/delete-particular-user",
            followRedirect: true,
        }).then((response) => {
            // Handle response
            console.log(response.body);
        });
        const business_name = faker.person.fullName();
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

        cy.visit("https://appt.gunisms.com.au/");
        cy.xpath("//span[@role='button']").click();
        cy.xpath("//input[@name='firstName']").type("automation");
        // tag += "first_name = automation";
        allure.tag("last_name = testing")
        cy.xpath("//input[@name='lastName']").type("testing");
        tag += "last_name = testing"
        allure.step(`last_name = ${last_name}`, () => {})
        // allure.tag("last_name = testing")
        cy.xpath("//input[@name='contact']").type("guniautomation@yopmail.com");
        tag += "email = guniautomation@yopmail.com"
        allure.step(`email = ${email}`, () => {})
        // allure.tag("email = guniautomation@yopmail.com");
        cy.xpath("//input[@name='password']").type("123456");
        tag += "passwd = 123456"
        allure.step(`passwd = ${passwd}`, () => {})
        // allure.tag("passwd = 123456");
        cy.xpath("//input[@name='cpassword']").type("123456");
        cy.xpath("//button[@type='submit']").click();
        cy.wait(4000);
        cy.xpath("//input[@name='mobile']").type("405610385");
        cy.xpath("//button[@type='submit']").click();
        cy.wait(2000);
        cy.request({
            method: "GET",
            url: "https://apit6110.gunisms.com.au/api/v1/automation/fetch-otp?type=mobile",
        }).then((response) => {
            // Log the response body
            cy.log(response.body.data.shortCode);
            cy.xpath("//input[@name='otp']").type(response.body.data.shortCode);
        });

        cy.xpath("//button[@type='submit']").click();
        cy.xpath("//span[normalize-space()='Audience']").click();
        cy.xpath("//li[normalize-space()='Groups']").click();
        cy.xpath("//tbody/tr[1]/td[1]").click();
        cy.wait(2000);
        cy.xpath("//button[normalize-space()='Actions']").should("be.visible");
        cy.xpath(
            "//span[contains(@class,'ant-typography applayout_label__3g3H8 d-flex justify-content-start align-items-center')][normalize-space()='Campaign']"
        ).click();
        cy.xpath("//button[normalize-space()='Run Campaign']").click();
        cy.xpath("//button[@type='submit']").click();
        cy.xpath("//td[@class='ant-table-selection-column']").click();
        cy.xpath(
            "//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']"
        ).click();
        cy.xpath("//textarea[@placeholder='Type a message']").type(
            "campaign testing on staging"
        );
        cy.xpath(
            "//div[contains(@class,'mb-md-0 mb-3 d-flex')]//button[contains(@type,'submit')][normalize-space()='Next']"
        ).click();
        cy.xpath("//button[normalize-space()='Send']").click();
        cy.xpath("//button[normalize-space()='Send Campaign']").click();
        cy.xpath("//button[normalize-space()='Ok']").click();
        const element = cy.xpath("//td[@class='text-capitalize']");
        element.should(($status) => {
            const statusText = $status.text();
            expect(statusText.includes("SENT"));
        });
        // add contact
        cy.xpath("//span[normalize-space()='Audience']").click();
        cy.xpath("//li[normalize-space()='Groups']").click();
        cy.xpath("//tbody/tr[1]/td[1]").click();
        for (let i = 0; i < 3; i++) {
            cy.xpath("//button[normalize-space()='Actions']").click();
            cy.xpath("//span[normalize-space()='Add Contacts']").click();
            cy.xpath("//button[normalize-space()='Add Single Contact']").click();
            tag += `group contacts ${i} add single contact`
            // allure.tag(group contacts ${i} add single contact);
            let contact_number_in_group = generate_Australian_PhoneNumber();
            cy.xpath("//input[@placeholder='Enter Number']").type(
                contact_number_in_group
            );
            tag += contact_number_in_group
            // allure.tag(contact_number_in_group);
            cy.xpath(
                "//input[@name='first_name' and @placeholder='Enter first_name']"
            ).type(business_name);
            cy.xpath("//button[@type='submit']").click();
            cy.xpath("//button[normalize-space()='Ok']").click();
        }
        cy.wait(3000);
        // automation of business name verification form
        // cy.xpath("//span[normalize-space()='Verification']").click();
        // cy.xpath("//button[normalize-space()='+ New Business Profile']").click();
        // cy.wait(2000),
        // cy.request({
        //   method: "GET",
        //   url: "https://apit6110.gunisms.com.au/api/v1/automation/fetch-otp?type=email",
        // }).then((response) => {

        //   // Log the response body

        //   cy.log(response.body.data.shortCode);

        //   cy.xpath(
        //     "//input[@aria-label='Please enter verification code. Digit 1']"
        //   ).type(response.body.data.shortCode[0]);
        //   cy.xpath("//input[@aria-label='Digit 2']").type(
        //     response.body.data.shortCode[1]
        //   );
        //   cy.xpath("//input[@aria-label='Digit 3']").type(
        //     response.body.data.shortCode[2]
        //   );
        //   cy.xpath("//input[@aria-label='Digit 4']").type(
        //     response.body.data.shortCode[3]
        //   );
        //   cy.xpath("//input[@aria-label='Digit 5']").type(
        //     response.body.data.shortCode[4]
        //   );
        //   cy.xpath("//input[@aria-label='Digit 6']").type(
        //     response.body.data.shortCode[5]
        //   );
        // });
        // cy.xpath("//button[normalize-space()='+ New Business Profile']").should("be.visible").then(($button) => {
        //   if ($button.length > 0) {
        //     // If the element is visible, click on it
        //     cy.wrap($button).click();
        //   } else {
        //     // If the element is not visible, you can log a message or perform other actions
        //     cy.log("Element is not visible. Skipping click...");
        //   }

        // });    cy.wait(3000);
        // cy.xpath("//input[@value='business']").click();
        // cy.xpath("//input[@name='businessName']").type("business name");
        // cy.xpath("//input[@name='contactName']").type("contact name");
        // cy.xpath("//textarea[@name='address']").type("address");
        // cy.xpath("//input[@name='website']").type("website.com");
        // cy.xpath("//input[@name='contactEmail']").type("yopmail@gmail.com");
        // cy.xpath("//input[@name='abn']").type("ABN");
        // cy.xpath("//div[@class='ant-select-selection__placeholder']").click();
        // cy.xpath("//li[normalize-space()='One Time Password']").click();
        // cy.wait(2000);
        // cy.xpath("//button[@type='submit']").click();
        // cy.wait(3000);
        // cy.xpath("//input[@type='checkbox']").click();
        // cy.xpath("//button[normalize-space()='Submit']").click();
        // cy.xpath("//strong[normalize-space()='Successfully Submitted!']").should(
        //   "be.visible"
        // );
        // cy.xpath("//button[normalize-space()='Ok']").click();
        // cy.request({
        //   method: "PUT",
        //   url: "https://apit6110.gunisms.com.au/api/v1/automation/verification-form-approve",
        //   headers: {
        //     // If there are any headers needed, you can specify them here
        //     // Example: Authorization: 'Bearer <token>'
        //   },
        //   body: {
        //     // If you need to send any data in the request body, specify it here
        //     // Example: key: 'value'
        //   },
        // }).then((response) => {
        //   // Handle response here
        //   console.log(response.body);
        // });
        // cy.wait(3000)
        // // automation of individual verification form
        // cy.xpath("//button[normalize-space()='+ New Business Profile']").click();
        // cy.xpath("//input[@value='individual']").click();
        // cy.wait(2000);
        // cy.xpath("//input[@name='contactName']").type("Contact Name");
        // cy.xpath("//textarea[@name='address']").type("Address");
        // cy.xpath("//input[@name='contactEmail']").type("unknown@yopmail.com");
        // cy.xpath("//input[@name='abn']").type("ABN");
        // cy.xpath("//div[@class='ant-select-selection__placeholder']").click();
        // cy.xpath("//li[normalize-space()='Other (please describe)']").click();
        // cy.xpath("//textarea[@name='description']").type(
        //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        // );
        // cy.xpath("//button[@type='submit']").click();
        // cy.wait(3000);
        // cy.xpath("//input[@type='checkbox']").click();
        // cy.xpath("//button[normalize-space()='Submit']").click();
        // cy.wait(1000);
        // cy.xpath("//button[normalize-space()='Ok']").click();
        // cy.request({
        //     method: 'PUT',
        //     url: 'https://apit6110.gunisms.com.au/api/v1/automation/verification-form-reject',
        //     followRedirect: true  // Cypress automatically follows redirects by default
        //   }).then((response) => {
        //     // Handle response here
        //     console.log(response.body);
        //   })
        // // send quick sms approval
        cy.xpath("//span[normalize-space()='Messaging']").click();
        cy.xpath("//li[normalize-space()='New Message']").click();
        cy.xpath("//input[@class='ant-select-search__field']");
        cy.xpath("//textarea[@placeholder='Type a message']").type(
            "testing automation of quick sms"
        );
        cy.xpath("//button[@type='submit']").click();
        cy.wait(3000);
        cy.reload();
        cy.wait(2000);
        cy.xpath("//tbody/tr[1]/td[6]/span[1]").should(($status) => {
            const statusText = $status.text();
            expect(statusText.includes("SENT") || statusText.includes("DELIVERED")).to
                .be.true;
        });
        allure.tag(tag)
    });
});