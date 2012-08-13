function SRP_REGISTER()
{
  var that;

  // Initiate the registration process
  SRP.prototype.register = function()
  {
    session = this;
    this.remote.register(session, session.register_receive_salt);
  };

  // Receive the salt for registration
  SRP.prototype.register_receive_salt = function(response)
  {
    if(response.salt)
    {
      var s = response.salt;
      var v = session.getV(s);
      session.remote.register_send_verifier(session, session.registered_user);
    }
    else if(response.error)
    {
      session.error_message(response.error);
    }
  };
  // The user has been registered successfully, now login
  SRP.prototype.registered_user = function(response)
  {
    if(response.ok)
    {
      session.identify();
    }
  };  
};
SRP_REGISTER();