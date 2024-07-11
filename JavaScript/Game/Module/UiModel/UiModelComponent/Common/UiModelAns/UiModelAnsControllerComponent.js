"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var s,
      i = arguments.length,
      r =
        i < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, o, n);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (r = (i < 3 ? s(r) : 3 < i ? s(t, o, r) : s(t, o)) || r);
    return 3 < i && r && Object.defineProperty(t, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelAnsControllerComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  UiModelComponentDefine_1 = require("../../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../../UiModelComponentBase");
class AnsContextSet {
  constructor() {
    this.AnsContextSet = new Set();
  }
  Has(e) {
    if (this.AnsContextSet.has(e)) return e;
    for (const t of this.AnsContextSet) if (t.IsEqual(e)) return t;
  }
  Add(e) {
    this.Has(e) || this.AnsContextSet.add(e);
  }
  Delete(e) {
    return this.AnsContextSet.delete(e);
  }
  Clear() {
    this.AnsContextSet.clear();
  }
}
class AnsContextTrigger {
  constructor(e, t) {
    (this.OnBegin = e), (this.OnEnd = t);
  }
}
let UiModelAnsControllerComponent = class UiModelAnsControllerComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Hwr = new Map()),
      (this.jwr = new Map()),
      (this.Wwr = new AnsContextSet()),
      (this.Kwr = new AnsContextSet());
  }
  OnInit() {
    this.NeedTick = !0;
  }
  RegisterAnsTrigger(e, t, o) {
    this.jwr.set(e, new AnsContextTrigger(t, o));
  }
  AddAns(e, t) {
    let o = this.Hwr.get(e),
      n = (o || ((o = new AnsContextSet()), this.Hwr.set(e, o)), o.Has(t));
    n || (o.Add(t), (n = t)), this.Qwr(n), n.ExistCount++;
  }
  ReduceAns(e, t) {
    var e = this.Hwr.get(e);
    e
      ? (e = e.Has(t))
        ? (t = e.ExistCount) <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 44, "Ans不成对,Ans数量为0,无法减少", [
              "AnsCount",
              t,
            ])
          : (this.Qwr(e), e.ExistCount--)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 44, "Ans不成对,查找不到对应的AnsContext")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 44, "Ans不成对,Set不存在");
  }
  Qwr(e) {
    this.Kwr.Has(e) || (this.Kwr.Add(e), (e.CacheCount = e.ExistCount));
  }
  Tick(e) {
    var t = this.Wwr.AnsContextSet;
    if (0 < t.size) {
      for (const i of t) {
        var o,
          n = i.CacheCount,
          s = i.ExistCount;
        0 === n && 0 < s
          ? (o = this.jwr.get(i.constructor.name)) && o.OnBegin(i)
          : 0 < n &&
            0 === s &&
            (o = this.jwr.get(i.constructor.name)) &&
            o.OnEnd(i);
      }
      this.Wwr.Clear();
    }
    t = this.Kwr.AnsContextSet;
    if (0 < t.size) {
      for (const r of t) this.Wwr.Add(r);
      this.Kwr.Clear();
    }
  }
};
(UiModelAnsControllerComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(6)],
  UiModelAnsControllerComponent,
)),
  (exports.UiModelAnsControllerComponent = UiModelAnsControllerComponent);
//# sourceMappingURL=UiModelAnsControllerComponent.js.map
