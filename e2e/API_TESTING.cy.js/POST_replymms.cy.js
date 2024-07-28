import * as allure from "allure-cypress";

describe('MMS Postback API Test', () => {
  it('should send a MMS postback request', () => {
    const myHeaders = {
      "Content-Type": "application/xml"
    };

    const raw = `<?xml version='1.0'?>
<postback>
    <origin>MMS_MO</origin>
    <code>N401</code>
    <from>405650337</from>
    <to>61439543139</to>
    <message-subject></message-subject>
    <keyword></keyword>
    <tracking-id>MMSMOw5TGu0PS</tracking-id>
    <operator-id></operator-id>
    <timestamp>2023-12-20T06:16:09.718069+00:00</timestamp>
    <content>
        <file>https://my.mmsmsg.com/mmsmo/w5TGu0PS/A8fAfYJCy.smil</file>
        <file>https://my.mmsmsg.com/mmsmo/w5TGu0PS/d1smxs6zD.jpeg</file>
        <file>https://my.mmsmsg.com/mmsmo/w5TGu0PS/RtwEiFnmw.txt</file>
    </content>
</postback>`;

    // Log the raw XML to the Cypress log
    cy.log('Request Body:', raw);
    
    // Print the raw XML to the browser console
    console.log('Request Body:', raw);
    
    // Attach the raw XML to the Allure report
    allure.step('Request Body', () => {
      allure.attachment('Request Body', raw, 'application/xml');
    });

    cy.request({
      method: 'POST',
      url: 'https://apitgwsinch.gunisms.com.au/mms/incoming/au/sinch',
      headers: myHeaders,
      body: raw,
    }).then((response) => {
      // Assert the status code
      expect(response.status).to.eq(200);
      
      // Log the full response body
      cy.log('Full Response:', response.body);
      console.log('Full Response:', response.body);

      // Start Allure step
      allure.step('Response Details', () => {
        allure.attachment('Full Response', response.body, 'text/plain');
      });
    })
  });
});