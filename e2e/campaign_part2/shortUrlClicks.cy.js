const { signin } = require("../../../common/signin");
import * as allure from "allure-cypress";
describe("short url links", () => {
  beforeEach(() => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
  });
  it("short url clicks", () => {
    let _;
    let Tag = [];
    let responce_Tag = "";

    cy.wait(2000);
    cy.xpath("//button[normalize-space()='Run Campaign']").click();
    cy.log("hello world");
    cy.xpath("//i[@type='button']").click();
    cy.xpath("//input[@placeholder='Campaign Name']").type("testing");
    // Tag += "name of the campaign = testing"
    // Tag += "\n"
    cy.wait(2000);
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//tbody/tr[1]/td[2]/span[1]")
      .invoke("text")
      .then((text) => {
        let responce_Tag = "";
        responce_Tag += "REQUEST = ";
        cy.log(text);
        // Print the extracted text
        responce_Tag += `group name(18 contacts): ${text}`;
        allure.step(responce_Tag, () => {});
      });
    // Tag += "\n"
    cy.xpath("//tbody/tr[1]/td[4]").click({ force: true });
    cy.xpath(
      "//button[@class='btn text-nowrap app-btn_btnLightWithBg__3UKbv'][normalize-space()='Next']"
    ).click();
    cy.xpath("//span[normalize-space()='Use Template']").click();
    cy.xpath("(//td[@title='kapil sharma'])[1]").click({ force: true });
    
    responce_Tag += "templatename = kapil sharma"
    allure.step(responce_Tag, () => {});
    // add short url
    cy.xpath("//span[normalize-space()='Add Short URL']").click();
    cy.xpath("//input[@placeholder='Enter URL']").type(
      "https://www.livechat.com/typing-speed-test/#/"
    );
    Tag.push({
      label: "ADD AHORT URL",
      value: "https://www.livechat.com/typing-speed-test/#/",
    });
    allure.step("ADD short url = https://www.livechat.com/typing-speed-test/#/", () => {});
    cy.xpath("//button[normalize-space()='Add']").click();
    cy.xpath("//button[normalize-space()='Test And Continue']").click();
    cy.xpath("//button[normalize-space()='Skip']").click();
    cy.xpath("//button[normalize-space()='Send']").click();
    cy.xpath("//button[normalize-space()='Send Campaign']").click();
    cy.xpath("//button[normalize-space()='Ok']").click();
    cy.xpath("//span[normalize-space()='History']").click();
    cy.wait(2000);
    allure.step("RESULT = ", () => {})

    cy.xpath("//tbody/tr[1]/td[2]/span[1]").invoke("text").as("text1");
    cy.xpath("//tbody/tr[1]/td[3]/span[1]").invoke("text").as("text2");
    cy.get("@text1").then((text1) => {
      cy.get("@text2").then((text2) => {
        cy.log(text1);
        cy.log(text2);

        allure.step(`Sender: ${text1}`, () => {});

        allure.step(`Reciever: ${text2}`, () => {});
      });
    });
    cy.xpath("//tbody/tr[1]/td[2]").click();
    cy.wait(2000);
    cy.xpath("//div[@class='ant-table-body']//table[@class='ant-table-fixed']")
        .find("tr")
        .eq(0)
        .first()
        .click();
    cy.xpath(
      "//div[@class='ant-typography text-break ant-typography-ellipsis']"
    ).then(($body) => {
      const message = $body.text();
      function extractShorturl(str) {
        const regex = /t\.tnly\.cc\/\w+/;
        const match = str.match(regex);
        return match ? match[0] : "";
      }
      const url = extractShorturl(message);
      cy.wait(2000);
      cy.xpath("//tbody/tr[1]/td[2]/span[1]")
        .invoke("text")
        .then((sender) => {
          // Use the text content as needed
          console.log(sender);
        });
      cy.xpath("//tbody/tr[1]/td[3]/span[1]")
        .invoke("text")
        .then((reciver) => {
          // Use the text content as needed
          console.log(reciver);
          allure.step(reciver, () => {});
          // allure.descriptionHtml(
          //   `<div>
          //           <span style="font-weight: bold;margin-right: 3px;">reciever</span>
          //           <span>${reciver}</span>
          //       </div>`
          // );
        });
      let link = "";
      link += `${url}`;
      cy.log(url);
      cy.log(extractShorturl(message));
      cy.log(message);
      allure.link(link);
      Tag.push({
        label: "RESULT",
        value: message,
      });
      allure.step(`Message: ${message}`, () => {});
      cy.log(message);
      cy.wait(2000);
      cy.visit(url);
      cy.wait(2000);
      cy.visit("https://appt.gunisms.com.au/campaign");
      cy.wait(2000);

      cy.log(Tag);
      Tag.map((_) =>
        allure.descriptionHtml(
          `<div>
                    <span style="font-weight: bold;margin-right: 3px;">${_.label}</span>
                    <span>${_.value}</span>
                </div>`
        )
      );
    });
  });
});
