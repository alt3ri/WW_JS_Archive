"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCasterClassFactory = void 0);
class BulletCasterClassFactory {
  static GetInstance(t, s) {
    if (BulletCasterClassFactory.Rec.has(t))
      return new (BulletCasterClassFactory.Rec.get(t))(s);
  }
  static Register(s) {
    return function (t) {
      BulletCasterClassFactory.Rec.has(s) ||
        BulletCasterClassFactory.Rec.set(s, t);
    };
  }
}
(exports.BulletCasterClassFactory = BulletCasterClassFactory).Rec = new Map();
//# sourceMappingURL=BulletCasterFactory.js.map
