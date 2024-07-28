import * as allure from "allure-cypress";
  const { signin } = require("../../../common/signin");
describe("add group", () => {
  beforeEach(() => {
    let Tag = ""
    cy.visit("https://appt.gunisms.com.au/");
    Tag += "URL = https://appt.gunisms.com.au/"
    Tag += "\n"

     signin(cy);
  });
  it('ADD_GROUP', () => {
    let Tag = ""

    cy.xpath("//span[normalize-space()='Audience']").click();
    cy.xpath("//li[normalize-space()='Groups']").click();
    cy.xpath("//button[normalize-space()='Add Group']").click();
    cy.xpath("//p[contains(text(),'Import file from')]").click()
    cy.fixture("testing_group (2)_automation (2).xlsx", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('input[type="file"]').then((el) => {
          const testFile = new File([fileContent], "testing_group (2)_automation (2).xlsx", {
            type: "application/vnd.ms-excel",
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el[0].files = dataTransfer.files;
          cy.wrap(el).trigger("change", { force: true });
        });
        Tag += "ADD group = testing_group (2)_automation (2).xlsx"
        allure.tag(Tag)
      });
      cy.xpath("(//button[normalize-space()='Next'])[1]").click()
      cy.wait(2000);
      cy.xpath("//tbody/tr[1]/td[2]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/span[1]/i[1]//*[name()='svg']").click()
      cy.xpath("//span[@class='ant-typography text-capitalize ant-typography-ellipsis ant-typography-ellipsis-single-line'][normalize-space()='mobile number']").click()
      Tag += "selected fields in the group = mobile number"
      Tag += "\n"

      cy.xpath("//tbody/tr[2]/td[2]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]").click()
      Tag += ",first name "
      cy.xpath("//span[contains(@class,'ant-typography text-capitalize ant-typography-ellipsis ant-typography-ellipsis-single-line')][normalize-space()='first_name']").click()
      cy.xpath("//div[@class='ant-select-selection__placeholder']").click()
      cy.xpath("//span[@class='ant-typography text-capitalize ant-typography-ellipsis ant-typography-ellipsis-single-line']").click()
      Tag += ",last name"
      cy.xpath("//button[normalize-space()='Finalize Import']").click()
      cy.wait(2000)
      cy.xpath("//button[normalize-space()='Ok']").click()
      cy.wait(2000)
      allure.tag(Tag)
    })  
  })


