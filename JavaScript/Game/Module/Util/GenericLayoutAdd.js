"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericLayoutAdd = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  LguiUtil_1 = require("./LguiUtil");
class GenericLayoutAdd {
  constructor(t, e) {
    (this.Kqo = void 0),
      (this.Qqo = void 0),
      (this.Xqo = new Map()),
      (this.$qo = []),
      (this.AQ = new Map()),
      (this.Kqo = t),
      (this.Qqo = e),
      this.Yqo();
  }
  Yqo() {
    if (this.Kqo) {
      var i = this.Jqo().GetAttachUIChildren();
      for (let t = 0, e = i.Num(); t < e; ++t) {
        var o = i.Get(t);
        o.SetUIActive(!1), this.Xqo.set(t, o);
      }
    }
  }
  Jqo() {
    return this.Kqo.GetRootComponent();
  }
  AddItemToLayout(o, r = 0) {
    var s = this.Xqo.get(r);
    if (s) {
      s.SetUIActive(!0);
      let i = this.AQ.get(r);
      i || ((i = new Map()), this.AQ.set(r, i));
      for (let t = 0, e = o.length; t < e; ++t) {
        var h = LguiUtil_1.LguiUtil.CopyItem(s, this.Jqo()),
          a = this.Qqo(o[t], h, t, r);
        i.set(a.Key, a.Value), this.$qo.push(h);
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
    for (const i of this.$qo) ActorSystem_1.ActorSystem.Put(i.GetOwner());
    this.$qo.length = 0;
  }
}
exports.GenericLayoutAdd = GenericLayoutAdd;
//# sourceMappingURL=GenericLayoutAdd.js.map
