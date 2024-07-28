describe("MMS API Test", () => {
  it("should send an MMS message and validate the response", () => {
    const myHeaders = {
      Authorization: "Bearer gunitest-1717570519746.KfTh8qmO4paSKp0U!Gya",
    };

    const formdata = new FormData();
    formdata.append(
      "media",
      "https://guni-customer-logo.s3.ap-southeast-2.amazonaws.com/mms-temp/1693815474418-64d59e726d4406122e71e828-First%20and%20Last%20Position.png"
    );
    formdata.append("message", "mms test postman new token vishal singh.");
    formdata.append("sender", "#SharedNum#");
    formdata.append("contacts", '["405650337"]'); // Notice the quotes around the array

    cy.request({
      method: "POST",
      url: "https://appt.gunisms.com.au/api/v1/gatewaymms/",
      headers: {
        Authorization: myHeaders["Authorization"],
      },
      body: formdata,
      form: true, // Important to set this to true when sending FormData
    }).then((response) => {
      // Assertions
      expect(response.status).to.eq(200); // Check the status code
      cy.log(JSON.stringify(response.body)); // Log the response body

      // Add specific assertions based on the expected response structure
      // For example:
      // expect(response.body).to.have.property('success', true);
      // expect(response.body.message).to.include('MMS sent successfully');
    });
  });
});
