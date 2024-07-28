const { signin } = require("../../../common/signin");
describe("pagination", () => {
  it("history pagination", () => {
    cy.visit("https://appt.gunisms.com.au/");
    signin(cy);
    cy.xpath("//span[normalize-space()='History']").click();
    const elementToClick =
      cy.xpath("//i[@class='anticon anticon-right']//*[name()='svg']")
        .click();
    const numberOfClicks = 5;
    // Click on the element multiple times using a loop

    for (let i = 0; i < numberOfClicks; i++) {
      elementToClick.click();
    }
  });
});
