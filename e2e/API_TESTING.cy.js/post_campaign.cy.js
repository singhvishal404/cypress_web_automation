import { faker } from "@faker-js/faker";
import * as allure from "allure-cypress";

describe('Bulk SMS API Test', () => {
  it('should send a bulk SMS request', () => {
    const myHeaders = {
      "Content-Type": "application/json",
      "Authorization": "Bearer gunitest-1717570995636.oo3LJs0!SD0jBdUOa"
    };

    const requestBody = {
      "name": "My BulkSMS",
      "description": "My BulkSMS Description",
      "sender": "61447213465",
      "message": "vishal testing bulk message by potman API on staging",
      "contacts": [
        "61405650337",
        "61481606117"
      ],
      "optout": true,
      "replyStopToOptOut": false
    };

    // Log the requestBody to the Cypress log
    cy.log('Request Body:', JSON.stringify(requestBody, null, 2));
    
    // Print the requestBody to the browser console
    console.log('Request Body:', requestBody);
    
    // Log the requestBody in Allure step
    allure.step('Request Body', () => {
      allure.attachment('Request Body', JSON.stringify(requestBody, null, 2), 'application/json');
    });

    cy.request({
      method: 'POST',
      url: 'https://apit.gunisms.com.au/api/v1/gateway/bulk',
      headers: myHeaders,
      body: requestBody,
    }).then((response) => {
      // Assert the status code
      expect(response.status).to.eq(200);
      
      // Log the full response body
      cy.log('Full Response:', JSON.stringify(response.body, null, 2));
      console.log('Full Response:', response.body);

      // Extract specific parts of the response
      const responseBody = response.body;
      const status = responseBody.status;
      const message = responseBody.message;
      const bulkId = responseBody.data.bulkId;
      const queueResponse = responseBody.data.queueResponse;

      // Assertions
      expect(status).to.be.true;
      expect(message).to.eq("SMS Campaign Sent Successfully");
      expect(bulkId).to.exist;
      expect(queueResponse.Result).to.eq("Added in queue successfully!");

      // Log the response details in Allure step
      allure.step('Response Details', () => {
        allure.attachment('Full Response', JSON.stringify(response.body, null, 2), 'application/json');
        allure.attachment('Status', status.toString(), 'text/plain');
        allure.attachment('Message', message, 'text/plain');
        allure.attachment('Bulk ID', bulkId, 'text/plain');
        allure.attachment('Queue Response Result', queueResponse.Result, 'text/plain');
      });
    })
  });
});