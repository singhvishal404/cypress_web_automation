const myHeaders = {
  "Content-Type": "application/json"
};

const raw = {
  "body": "reply campaign",
  "from": "491680337",
  "id": "01G6M5VSW41BYB0HW6MF6D003A",
  "to": "61447213465",
  "type": "mo_text"
};

describe('SMS Incoming API Test', () => {
  it('should send a reply campaign message and validate the response', () => {
    cy.request({
      method: 'POST',
      url: 'https://apitgwsinch.gunisms.com.au/sms/incoming/au/sinch',
      headers: myHeaders,
      body: raw
    }).then((response) => {
      // Assertions
      expect(response.status).to.eq(200); // Check the status code
      expect(response.body).to.have.property('message'); // Check if the response has a 'message' property
      cy.log(JSON.stringify(response.body)); // Log the response body

      // If you have specific content to check within the response body
      
    });
  });
});
