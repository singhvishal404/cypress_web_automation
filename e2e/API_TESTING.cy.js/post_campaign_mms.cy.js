describe('Bulk SMS API Test', () => {
    it('should send a bulk SMS request and validate the response', () => {
      const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": "Bearer gunitest-1717570995636.oo3LJs0!SD0jBdUOa"
      };
  
      const raw = {
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
  
      cy.request({
        method: 'POST',
        url: 'https:// apit.gunisms.com.au/api/v1/gateway/bulk',
        headers: myHeaders,
        body: raw
      }).then((response) => {
        // Assertions
        expect(response.status).to.eq(200); // Check the status code
        cy.log(JSON.stringify(response.body)); // Log the response body
  
        // Add specific assertions based on the expected response structure
        // For example:
        // expect(response.body).to.have.property('message', 'SMS Campaign Sent Successfully');
        // expect(response.body.data).to.have.property('success', true);
        // expect(response.body.data).to.have.property('bulkId');
      });
    });
  });
  