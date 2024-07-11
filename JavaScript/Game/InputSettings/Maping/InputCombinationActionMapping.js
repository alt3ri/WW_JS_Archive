"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputCombinationActionMapping = void 0);
const InputCombinationActionBinding_1 = require("../Binding/InputCombinationActionBinding");
class InputCombinationActionMapping {
  constructor() {
    (this.YEe = new Map()), (this.JEe = new Map()), (this.zEe = new Set());
  }
  Clear() {
    for (const i of this.YEe.values()) i.Clear();
    this.YEe.clear(), this.JEe.clear(), this.zEe.clear();
  }
  NewCombinationActionBinding(i, n) {
    var t = new InputCombinationActionBinding_1.InputCombinationActionBinding();
    return t.Initialize(i, n), this.YEe.set(i, t), t;
  }
  AddKey(i, n, t) {
    i.AddKey(n, t);
    let e = this.JEe.get(n),
      o = (e || ((e = new Map()), this.JEe.set(n, e)), e.get(t));
    o || ((o = new Map()), e.set(t, o)),
      o.set(i.GetActionName(), i),
      this.zEe.add(n);
  }
  RemoveKey(i, n, t) {
    i.RemoveKey(n);
    var e = i.GetActionName(),
      o = this.JEe.get(n);
    if (o) {
      var s = o.get(t);
      if (!s) return;
      s.delete(e),
        s.size <= 0 && o.delete(t),
        o.size <= 0 && (this.JEe.delete(n), this.zEe.delete(n));
    } else this.zEe.delete(n);
    s = new Map();
    i.GetKeyMap(s), s.size <= 0 && this.YEe.delete(e);
  }
  GetCombinationActionBindingByKeyName(i, n) {
    i = this.JEe.get(i);
    if (i) return i.get(n);
  }
  GetCombinationActionBindingByActionName(i) {
    return this.YEe.get(i);
  }
  IsMainKey(i) {
    return this.zEe.has(i);
  }
}
exports.InputCombinationActionMapping = InputCombinationActionMapping;
//# sourceMappingURL=InputCombinationActionMapping.js.map
