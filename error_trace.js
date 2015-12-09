function stack(fn) {
  var e = new Error;
  Error.captureStackTrace(e, fn);
  return e.stack;
}

module.exports = function trace (err) {
  if (err && err.app_stack === undefined) {
    err.app_stack = stack(arguments.callee);
  }
  return err;
};

trace.log = function log (err, req, res) {
  if (err === null || err === undefined) return;

  var app_stack = err && err.app_stack || stack(arguments.callee);
  var info = '\n\n\n';
  if (req) {
    info += req.method + ' ' + req.url + ' ' + res.statusCode + '\n';
  }
  info += (err && err.stack || err) + '\n';
  info += app_stack;
  console.error(info);
};
