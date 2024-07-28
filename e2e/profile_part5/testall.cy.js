describe('profile_part5', () => {
    it('Should execute security.cy test', () => {
      require('./security.cy');
    });
  
    it('Should execute senderid.cy test', () => {
      require('./senderid.cy');
    });
    it('Should execute set_default_senderid.cy test', () => {
        require('./set_default_senderid.cy');
    });
    it('Should execute sms_forwarding.cy test', () => {
        require('./sms_forwarding.cy');  
    });
});