describe('Single sms-mms-template_part4', () => {
    it('Should execute messaging.cy test', () => {
      try {
        require('./messaging.cy');
      } catch (error) {
        console.error("Error executing messaging.cy test:", error);
      }
    });
  
    it('Should execute quick sms to multiple numbers.cy test', () => {
      try {
        require('./quick sms to multiple numbers.cy');
      } catch (error) {
        console.error("Error executing quick sms to multiple numbers.cy test:", error);
      }
    });
  
    it('Should execute quick sms with shared number.cy test', () => {
      try {
        require('./quick sms with shared number.cy');
      } catch (error) {
        console.error("Error executing quick sms with shared number.cy test:", error);
      }
    });
  
    it('Should execute quick sms with template to multiple numbers.cy test', () => {
      try {
        require('./quick sms with template to multiple numbers.cy');
      } catch (error) {
        console.error("Error executing quick sms with template to multiple numbers.cy test:", error);
      }
    });
  
    it('Should execute quick sms with template.cy test', () => {
      try {
        require('./quick sms with template.cy');
      } catch (error) {
        console.error("Error executing quick sms with template.cy test:", error);
      }
    });
  
    it('Should execute quicksmsreply.cy test', () => {
      try {
        require('./quicksmsreply.cy');
      } catch (error) {
        console.error("Error executing quicksmsreply.cy test:", error);
      }
    });
  });