describe('Vonage SMS API Test', () => {
  it('should send a message and validate the response', () => {
    const myHeaders = {
      "Content-Type": "application/json"
    };

    const raw = {
      "msisdn": "61480079214",
      "to": "405650337",
      "messageId": "340000008BFCA517",
      "text": "vonage testing",
      "type": "text",
      "keyword": "HELLO",
      "api-key": "f666c781",
      "message-timestamp": "2024-02-13 09:37:16"
    };

    cy.request({
      method: 'POST',
      url: 'https://apitgwvonage.gunisms.com.au/sms/incoming/au/',
      headers: myHeaders,
      body: raw
    }).then((response) => {
      // Assertions
      expect(response.status).to.eq(200); // Check the status code
      cy.log(JSON.stringify(response.body)); // Log the response body

      // Add specific assertions based on the expected response structure
      // For example:
      // expect(response.body).to.have.property('someProperty');
      // expect(response.body.someProperty).to.equal('someValue');
    });
  });
});
