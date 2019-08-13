Function.prototype.call = function(context) {
  // 当context为空或者null时指向window
  var context = Object(context) || window;
  // 获取要执行的函数
  var func = this;
  if (typeof func !== 'function') throw new TypeError('this is not function');
  context.fn = func;
  var args = [];
  for(var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  };
  var res = eval('context.fn(' + args + ')');
  delete context.fn
  return res
}

Function.prototype.apply = function(context, args) {
  // 当context为空或者null时指向window
  var context = Object(context) || window;
  // 获取要执行的函数
  var func = this;
  var arr = []
  if (typeof func !== 'function') throw new TypeError('this is not function');
  context.fn = func;
  for(var i = 0; i < args.length; i++) {
    arr.push('args[' + i + ']')
  }
  var res = eval('context.fn(' + args + ')');
  delete context[caller]
  return res
}