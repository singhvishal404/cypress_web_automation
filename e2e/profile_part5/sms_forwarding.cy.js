const { signin } = require("../../../common/signin");

describe("sms_forwarding", () => {
  it("sms_forwarding through any message", () => {
    // Visit the target URL
    cy.visit("https://appt.gunisms.com.au/");

    // Sign in using the signin function
    signin(cy);

    // Start a new campaign
    cy.xpath("//button[normalize-space()='Run Campaign']").click();
    cy.xpath("//i[@type='button']").click();
    cy.xpath("//input[@placeholder='Campaign Name']").type("testing");
    cy.xpath("(//*[name()='svg'])[5]").click();
    cy.xpath("//li[@label='#SharedNum#']").click();
    cy.xpath("//button[@type='submit']").click();

    // Extract the group name text
    cy.xpath("//input[@placeholder='Search for Group Name']").type("guni_sms_forwarding")
    cy.xpath("//tbody/tr[1]/td[2]/span[1]")
      .invoke("text")
      .then((text) => {
        cy.log(`Group name: ${text}`);
      });

    // Click on the first campaign to proceed
    cy.xpath("//tbody/tr[1]/td[4]").click();

    // Proceed through the campaign setup
    cy.xpath(
      "//div[contains(@class,'ant-col ant-col-24 text-start d-flex flex-wrap gap-2')]//button[contains(@type,'submit')][normalize-space()='Next']"
    ).click();
    cy.xpath("//textarea[@placeholder='Type a message']").type(
      "automation testing "
    );
    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();

    // Navigate to History and extract relevant data
    cy.xpath("//span[normalize-space()='History']").click();
    cy.xpath("//tbody/tr[2]/td[2]/span[1]").invoke("text").as("text1");
    cy.xpath("//tbody/tr[2]/td[3]/span[1]").invoke("text").as("text2");

    cy.get("@text1").then((text1) => {
      cy.get("@text2").then((text2) => {
        cy.log(`Text 1: ${text1}`);
        cy.log(`Text 2: ${text2}`);

        // Navigate to Sender IDs settings
        cy.xpath("//span[normalize-space()='Sender IDs']").click();
        cy.xpath("//div[normalize-space()='Settings']").click();
        cy.xpath(
          "//i[@class='fa fa-edit fw-bold profile_active__2t39N']"
        ).click();
        cy.wait(2000);

        // Enable SMS forwarding if disabled
        cy.xpath("//button[@id='settings-forwardReply-input']").then(
          ($switchButton) => {
            if ($switchButton.length > 0) {
              const ariaChecked = $switchButton.attr("aria-checked");
              if (ariaChecked === "false") {
                cy.wrap($switchButton).click();
              } else {
                cy.log("Switch button is already checked");
              }
            } else {
              cy.log("Switch button not found");
            }
          }
        );

        // Enter mobile number for forwarding
        let mobile_num = "405650337";
        cy.xpath("//input[@placeholder='Enter Mobile Number']")
          .clear()
          .type(mobile_num);
        cy.xpath("//button[@type='submit']").click();
        cy.xpath("//button[normalize-space()='Ok']").click();

        // any message
        cy.request({
          method: "POST",
          url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            body: "any message reply",
            from: text2,
            id: "01G6M5VSW41BYB0HW6MF6D003A",
            to: text1,
            type: "mo_text",
          },
        }).then((response) => {
          console.log(response);
          expect(response.status).to.equal(200);
          cy.xpath("//span[normalize-space()='History']").click();
          cy.wait(2000)
         
          // contains
          cy.xpath("//span[normalize-space()='Sender IDs']").click();
          cy.xpath("//div[normalize-space()='Settings']").click();
          cy.xpath(
            "//i[@class='fa fa-edit fw-bold profile_active__2t39N']"
          ).click();
          cy.xpath("//div[@class='ant-col ant-col-lg-24']//div[2]//div[1]//span[1]//div[1]//div[1]//span[1]//i[1]//*[name()='svg']").click();
          cy.xpath("//li[@label='Contains']").click();
          cy.xpath("//textarea[@placeholder='Enter keyword to match']")
            .clear()
            .type("hello");
          cy.xpath("//button[@type='submit']").click();
          cy.xpath("//button[normalize-space()='Ok']").click();
          cy.wait(2000);

          // Send another test SMS request
          cy.request({
            method: "POST",
            url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              body: "hello automation tester",
              from: text2,
              id: "01G6M5VSW41BYB0HW6MF6D003A",
              to: text1,
              type: "mo_text",
            },
          }).then((response) => {
            console.log(response);
            expect(response.status).to.equal(200);
            cy.xpath("//span[normalize-space()='History']").click();
            cy.wait(2000)
          });
          // not contains
          cy.xpath("//span[normalize-space()='Sender IDs']").click();
          cy.xpath("//div[normalize-space()='Settings']").click();
          cy.xpath(
            "//i[@class='fa fa-edit fw-bold profile_active__2t39N']"
          ).click();
          cy.xpath("//div[@class='ant-col ant-col-lg-24']//div[2]//div[1]//span[1]//div[1]//div[1]//span[1]//i[1]//*[name()='svg']").click();
          cy.xpath("//span[normalize-space()='Not Contains']").click();
          cy.xpath("//textarea[@placeholder='Enter keyword to match']")
          .clear()
          .type("hello");
        cy.xpath("//button[@type='submit']").click();
        cy.xpath("//button[normalize-space()='Ok']").click();
        cy.wait(2000);
        cy.request({
          method: "POST",
          url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            body: "hello automation tester",
            from: text2,
            id: "01G6M5VSW41BYB0HW6MF6D003A",
            to: text1,
            type: "mo_text",
          },
        }).then((response) => {
          console.log(response);
          expect(response.status).to.equal(200);
          cy.xpath("//span[normalize-space()='History']").click();
          cy.wait(2000)
        });
        // starts with
        cy.xpath("//span[normalize-space()='Sender IDs']").click();
        cy.xpath("//div[normalize-space()='Settings']").click();
        cy.xpath(
          "//i[@class='fa fa-edit fw-bold profile_active__2t39N']"
        ).click();
        cy.xpath("//div[@class='ant-col ant-col-lg-24']//div[2]//div[1]//span[1]//div[1]//div[1]//span[1]//i[1]//*[name()='svg']").click();
        cy.xpath("//span[normalize-space()='Starts With']").click();
        cy.xpath("//textarea[@placeholder='Enter keyword to match']")
        .clear()
        .type("hello");
      cy.xpath("//button[@type='submit']").click();
      cy.xpath("//button[normalize-space()='Ok']").click();
      cy.wait(2000);
      cy.request({
        method: "POST",
        url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          body: "hello automation tester",
          from: text2,
          id: "01G6M5VSW41BYB0HW6MF6D003A",
          to: text1,
          type: "mo_text",
        },
      }).then((response) => {
        console.log(response);
        expect(response.status).to.equal(200);
        cy.xpath("//span[normalize-space()='History']").click();
        cy.wait(2000)
      });
      // not starts with
      cy.xpath("//span[normalize-space()='Sender IDs']").click();
      cy.xpath("//div[normalize-space()='Settings']").click();
      cy.xpath(
        "//i[@class='fa fa-edit fw-bold profile_active__2t39N']"
      ).click();
      cy.xpath("//div[@class='ant-col ant-col-lg-24']//div[2]//div[1]//span[1]//div[1]//div[1]//span[1]//i[1]//*[name()='svg']").click();
      cy.xpath("//span[normalize-space()='Not Starts With']").click();
      cy.xpath("//textarea[@placeholder='Enter keyword to match']")
      .clear()
      .type("hello");
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.wait(2000);
    cy.request({
      method: "POST",
      url: "https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        body: "hello automation tester",
        from: text2,
        id: "01G6M5VSW41BYB0HW6MF6D003A",
        to: text1,
        type: "mo_text",
      },
    }).then((response) => {
      console.log(response);
      expect(response.status).to.equal(200);
      cy.xpath("//span[normalize-space()='History']").click();
      cy.wait(2000)
    });
    cy.xpath("//span[normalize-space()='Sender IDs']").click();
    cy.xpath("//div[normalize-space()='Settings']").click();
    cy.xpath(
      "//i[@class='fa fa-edit fw-bold profile_active__2t39N']"
    ).click();
    cy.wait(2000);

    // Enable SMS forwarding if disabled
    cy.xpath("//button[@id='settings-forwardReply-input']").then(
      ($switchButton) => {
        if ($switchButton.length > 0) {
          const ariaChecked = $switchButton.attr("aria-checked");
          if (ariaChecked === "true") {
            cy.wrap($switchButton).click();
          } else {
            cy.log("Switch button is already checked");
          }
        } else {
          cy.log("Switch button not found");
        }
      }
    );
    cy.xpath("//button[@type='submit']").click()
    cy.xpath("//button[normalize-space()='Ok']").click()
    cy.wait(2000)
  });
});
})
})
})
