"use strict";
function fbCreate(r, e, t) {
  const o = t.value;
  return (
    (t.value = function (...e) {
      var t = r.name;
      return exports.createClassSet.add(t), o?.apply(this, e);
    }),
    t
  );
}
function fbProperty(t, r, e) {
  const o = e.get;
  var s = t.constructor.name;
  let p = void 0;
  return (
    exports.allPropertySet.has(s)
      ? (p = exports.allPropertySet.get(s))
      : ((p = new Set()), exports.allPropertySet.set(s, p)),
    p?.add(r),
    exports.initPropertySet.has(s) || exports.initPropertySet.set(s, new Set()),
    (e.get = function () {
      var e = t.constructor.name;
      return exports.initPropertySet.get(e)?.add(r), o?.apply(this);
    }),
    e
  );
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.fbProperty =
    exports.fbCreate =
    exports.createClassSet =
    exports.initPropertySet =
    exports.allPropertySet =
      void 0),
  (exports.allPropertySet = new Map()),
  (exports.initPropertySet = new Map()),
  (exports.createClassSet = new Set()),
  (exports.fbCreate = fbCreate),
  (exports.fbProperty = fbProperty);
//# sourceMappingURL=FbProperty.js.map
