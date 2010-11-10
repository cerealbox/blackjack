require("./rx");

Function.prototype.arguments = function() {
   var definition = this.toString();

   return /^.*?\((.*?)\)/gi.exec(definition)[1].split(",").map(function(arg) { return arg.trim() });
};
Function.prototype.toObservable = function() {
   var that = this;
   var args = [];
   for(var cnt = 0; cnt < arguments.length-1;cnt++) {
      args.push(arguments[cnt]);
   }
   return Rx.Observable.Create(function(observer) {
      var func = that.bind(null);
      func(function(err, value) {
         if (arguments.length > 2) {
            value = [];
            for(var cnt = 1; cnt < arguments.length; cnt++) {
               value.push(arguments[cnt]);
            }
            value.length = arguments.length -1;

            for(var cnt = 0; cnt < args; cnt++) {
               if (value[cnt]) {
                  value[args[cnt]] = value[cnt];
               }
            }
         }
         if (err) {
            observer.OnError(err);
         }
         else {
            observer.OnNext(value);
            observer.OnCompleted();
         }
      });
   });
};


/*
Object.prototype.toObservable = function() {
   var that = this;
   var func = that[arguments[0]];
   var args = [];
   for(var cnt = 1; cnt < arguments.length-1;cnt++) {
      args.push(arguments[cnt]);
   }

   return Rx.Observable.Create(function(observer) {
      var boundFunc = func.bind(that, args);
      boundFunc(function(err, value) {
         if (err) {
            observer.OnError(err);
         }
         else {
            observer.OnNext(value);
            observer.OnCompleted();
         }
      });
   });
}
*/
// connect.toObservable("husain", "password")
// sys.connect.bind(sys).toObservable("husain", "password")
// sys.toObservable("connect", "jhusain" , "password")
// sys.connect("husain", "password", function(err,cont) {});

