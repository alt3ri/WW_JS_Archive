"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageUiSequencePool = void 0);
const puerts_1 = require("puerts"),
  Pool_1 = require("../../../Core/Container/Pool"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  DamageSequenceHandle_1 = require("./DamageSequenceHandle");
class DamageUiSequencePool {
  static Preload(e, t, a) {
    let i = DamageUiSequencePool.J2t(e);
    0 < (i = i || DamageUiSequencePool.z2t(e, t)).Size ||
      DamageUiSequencePool.PreloadAdd(i, e, a);
  }
  static z2t(e, t) {
    t = new Pool_1.Pool(t, () => this.Z2t(e), this.h7);
    return this.eFt.set(e, t), t;
  }
  static J2t(e) {
    return this.eFt.get(e);
  }
  static Get(e, t) {
    var a,
      i = this.J2t(e);
    i && ((a = i.Get()) ? t && t(a) : (a = this.qp(i, e)).SpawnSequence(t));
  }
  static Recycle(e) {
    e.Reset();
    var t = e.GetPath(),
      t = this.J2t(t);
    t && t.Put(e);
  }
  static PreloadAdd(t, e, a) {
    if (!StringUtils_1.StringUtils.IsEmpty(e))
      for (let e = 0; e < a; e++) {
        var i = t.Create();
        if (!i) return;
        i.SpawnSequence(), t.Put(i);
      }
  }
  static qp(e, t) {
    return e.Create();
  }
  static Z2t(e) {
    var t;
    if (!StringUtils_1.StringUtils.IsEmpty(e))
      return (
        (t = new DamageSequenceHandle_1.DamageSequenceHandle()).Initialize(e), t
      );
  }
  static Clear() {
    for (const e of this.eFt.values()) e.Clear();
  }
}
((exports.DamageUiSequencePool = DamageUiSequencePool).SequenceActorRef = (0,
puerts_1.$ref)(void 0)),
  (DamageUiSequencePool.eFt = new Map()),
  (DamageUiSequencePool.h7 = (e) => {
    e.Destroy();
  });
//# sourceMappingURL=DamageUiSequencePool.js.map
