var log = new Log();

var authenticate = function (username, password) {
    var HTTPConstants = Packages.org.apache.axis2.transport.http.HTTPConstants;
    var AuthStub = Packages.org.wso2.carbon.authenticator.stub.AuthenticationAdminStub;
    var carbon = require("carbon");
    var AUTH_SERVICE = "/services/AuthenticationAdmin";
    var authUrl = carbon.server.address("https") + AUTH_SERVICE;
    var authAdminClient = new AuthStub(authUrl);

    if (authAdminClient.login(username, password, "localhost")) {
        var serviceContext = authAdminClient._getServiceClient().getLastOperationContext().getServiceContext();
        var sessionCookie = serviceContext.getProperty(HTTPConstants.COOKIE_STRING);
        log.info('Session cookie ' + sessionCookie);
        return sessionCookie;
    } else {
        log.info('Authentication failure');
        return false;
    }
};