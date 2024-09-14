"use strict";
function getServiceDependencies(e) {
  return e[exports.DI_DEPENDENCIES] || [];
}
function storeServiceDependency(e, r, t) {
  r[exports.DI_TARGET] === r
    ? r[exports.DI_DEPENDENCIES].push({ Id: e, Index: t })
    : ((r[exports.DI_DEPENDENCIES] = [{ Id: e, Index: t }]),
      (r[exports.DI_TARGET] = r));
}
function createDecorator(e) {
  var r;
  return exports.serviceIds.has(e)
    ? exports.serviceIds.get(e)
    : (((r = function e(r, t, o) {
        if (3 !== arguments.length)
          throw new Error(
            "@IServiceName-decorator can only be used to decorate a parameter",
          );
        storeServiceDependency(e, r, o);
      }).toString = () => e),
      exports.serviceIds.set(e, r),
      r);
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.createDecorator =
    exports.getServiceDependencies =
    exports.DI_DEPENDENCIES =
    exports.DI_TARGET =
    exports.serviceIds =
      void 0),
  (exports.serviceIds = new Map()),
  (exports.DI_TARGET = "DI_TARGET"),
  (exports.DI_DEPENDENCIES = "DI_DEPENDENCIES"),
  (exports.getServiceDependencies = getServiceDependencies),
  (exports.createDecorator = createDecorator);
//# sourceMappingURL=Instantiation.js.map
