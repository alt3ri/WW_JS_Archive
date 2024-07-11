"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericLayoutAdd = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const LguiUtil_1 = require("./LguiUtil");
class GenericLayoutAdd {
  constructor(t, e) {
    (this.$bo = void 0),
      (this.Ybo = void 0),
      (this.Jbo = new Map()),
      (this.zbo = []),
      (this.AQ = new Map()),
      (this.$bo = t),
      (this.Ybo = e),
      this.Zbo();
  }
  Zbo() {
    if (this.$bo) {
      const i = this.eqo().GetAttachUIChildren();
      for (let t = 0, e = i.Num(); t < e; ++t) {
        const o = i.Get(t);
        o.SetUIActive(!1), this.Jbo.set(t, o);
      }
    }
  }
  eqo() {
    return this.$bo.GetRootComponent();
  }
  AddItemToLayout(o, r = 0) {
    const s = this.Jbo.get(r);
    if (s) {
      s.SetUIActive(!0);
      let i = this.AQ.get(r);
      i || ((i = new Map()), this.AQ.set(r, i));
      for (let t = 0, e = o.length; t < e; ++t) {
        const h = LguiUtil_1.LguiUtil.CopyItem(s, this.eqo());
        const a = this.Ybo(o[t], h, t, r);
        i.set(a.Key, a.Value), this.zbo.push(h);
      }
      s.SetUIActive(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("ModuleUtil", 11, "查找不到对应HierarchyIndex的UIItem");
  }
  GetLayoutItemByKey(t, e = 0) {
    e = this.AQ.get(e);
    if (e) return e.get(t);
  }
  GetLayoutItemMap(t = 0) {
    t = this.AQ.get(t);
    if (t) return t;
  }
  ClearChildren() {
    for (const t of this.AQ.values()) {
      for (const e of t.values()) e.Destroy();
      t.clear();
    }
    this.AQ.clear();
    for (const i of this.zbo) ActorSystem_1.ActorSystem.Put(i.GetOwner());
    this.zbo.length = 0;
  }
}
exports.GenericLayoutAdd = GenericLayoutAdd;
// # sourceMappingURL=GenericLayoutAdd.js.map
