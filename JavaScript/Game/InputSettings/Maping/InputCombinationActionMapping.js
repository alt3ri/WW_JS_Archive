"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationActionMapping = void 0);
const InputCombinationActionBinding_1 = require("../Binding/InputCombinationActionBinding");
class InputCombinationActionMapping {
  constructor() {
    (this.YSe = new Map()), (this.JSe = new Map()), (this.zSe = new Set());
  }
  Clear() {
    for (const i of this.YSe.values()) i.Clear();
    this.YSe.clear(), this.JSe.clear(), this.zSe.clear();
  }
  NewCombinationActionBinding(i, n) {
    const t =
      new InputCombinationActionBinding_1.InputCombinationActionBinding();
    return t.Initialize(i, n), this.YSe.set(i, t), t;
  }
  AddKey(i, n, t) {
    i.AddKey(n, t);
    let e = this.JSe.get(n);
    let o = (e || ((e = new Map()), this.JSe.set(n, e)), e.get(t));
    o || ((o = new Map()), e.set(t, o)),
      o.set(i.GetActionName(), i),
      this.zSe.add(n);
  }
  RemoveKey(i, n, t) {
    i.RemoveKey(n);
    const e = i.GetActionName();
    const o = this.JSe.get(n);
    if (o) {
      var s = o.get(t);
      if (!s) return;
      s.delete(e),
        s.size <= 0 && o.delete(t),
        o.size <= 0 && (this.JSe.delete(n), this.zSe.delete(n));
    } else this.zSe.delete(n);
    s = new Map();
    i.GetKeyMap(s), s.size <= 0 && this.YSe.delete(e);
  }
  GetCombinationActionBindingByKeyName(i, n) {
    i = this.JSe.get(i);
    if (i) return i.get(n);
  }
  GetCombinationActionBindingByActionName(i) {
    return this.YSe.get(i);
  }
  IsMainKey(i) {
    return this.zSe.has(i);
  }
}
exports.InputCombinationActionMapping = InputCombinationActionMapping;
// # sourceMappingURL=InputCombinationActionMapping.js.map
