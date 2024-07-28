import * as allure from "allure-cypress";

describe('Quick SMS API Test', () => {
  it('should send a quick SMS request', () => {
    const myHeaders = {
      "Content-Type": "application/json",
      "Authorization": "Bearer gunitest-1717570995636.oo3LJs0!SD0jBdUOa"
    };

    const requestBody = {
      "sender": "ashok",
      "message": "testing api new token vishal quick sms",
      "contacts": [
        "61405650337"
      ]
    };

    // Log the requestBody to the Cypress log
    cy.log('Request Body:', JSON.stringify(requestBody, null, 2));
    
    // Print the requestBody to the browser console
    console.log('Request Body:', requestBody);
    
    // Attach the requestBody to the Allure report
    allure.step('Request Body', () => {
      allure.attachment('Request Body', JSON.stringify(requestBody, null, 2), 'application/json');
    });

    cy.request({
      method: 'POST',
      url: 'https://apit.gunisms.com.au/api/v1/gateway',
      headers: myHeaders,
      body: requestBody,
    }).then((response) => {
      // Assert the status code
      expect(response.status).to.eq(200);
      
      // Log the full response body
      cy.log('Full Response:', JSON.stringify(response.body, null, 2));
      console.log('Full Response:', response.body);

      // Start Allure step
      allure.step('Response Details', () => {
        allure.attachment('Full Response', JSON.stringify(response.body, null, 2), 'application/json');
      });
    })
  });
});