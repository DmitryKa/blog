var http = require('http');
var util = require('util');

var HttpError = function(status, message){
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || 'Error'
};

util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;

var ServerError = function(status, message){
    Error.apply(this, arguments);
    Error.captureStackTrace(this, ServerError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || 'Error'
};

util.inherits(ServerError, Error);

ServerError.prototype.name = 'ServerError';

exports.ServerError = ServerError;

