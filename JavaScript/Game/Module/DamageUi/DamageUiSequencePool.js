"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageUiSequencePool = void 0);
const puerts_1 = require("puerts");
const Pool_1 = require("../../../Core/Container/Pool");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const DamageSequenceHandle_1 = require("./DamageSequenceHandle");
class DamageUiSequencePool {
  static Preload(e, t, a) {
    let i = DamageUiSequencePool.Ykt(e);
    (i = i || DamageUiSequencePool.Jkt(e, t)).Size > 0 ||
      DamageUiSequencePool.PreloadAdd(i, e, a);
  }
  static Jkt(e, t) {
    t = new Pool_1.Pool(t, () => this.zkt(e), this.h7);
    return this.Zkt.set(e, t), t;
  }
  static Ykt(e) {
    return this.Zkt.get(e);
  }
  static Get(e, t) {
    let a;
    const i = this.Ykt(e);
    i && ((a = i.Get()) ? t && t(a) : (a = this.qp(i, e)).SpawnSequence(t));
  }
  static Recycle(e) {
    e.Reset();
    var t = e.GetPath();
    var t = this.Ykt(t);
    t && t.Put(e);
  }
  static PreloadAdd(t, e, a) {
    if (!StringUtils_1.StringUtils.IsEmpty(e))
      for (let e = 0; e < a; e++) {
        const i = t.Create();
        if (!i) return;
        i.SpawnSequence(), t.Put(i);
      }
  }
  static qp(e, t) {
    return e.Create();
  }
  static zkt(e) {
    let t;
    if (!StringUtils_1.StringUtils.IsEmpty(e))
      return (
        (t = new DamageSequenceHandle_1.DamageSequenceHandle()).Initialize(e), t
      );
  }
  static Clear() {
    for (const e of this.Zkt.values()) e.Clear();
  }
}
((exports.DamageUiSequencePool = DamageUiSequencePool).SequenceActorRef = (0,
puerts_1.$ref)(void 0)),
  (DamageUiSequencePool.Zkt = new Map()),
  (DamageUiSequencePool.h7 = (e) => {
    e.Destroy();
  });
// # sourceMappingURL=DamageUiSequencePool.js.map
