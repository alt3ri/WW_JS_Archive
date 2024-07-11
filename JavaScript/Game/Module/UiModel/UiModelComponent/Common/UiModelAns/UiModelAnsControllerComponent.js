"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    let s;
    const i = arguments.length;
    let r =
      i < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, o)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, o, n);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (s = e[h]) && (r = (i < 3 ? s(r) : i > 3 ? s(t, o, r) : s(t, o)) || r);
    return i > 3 && r && Object.defineProperty(t, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelAnsControllerComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const UiModelComponentDefine_1 = require("../../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../../UiModelComponentBase");
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
      (this.mBr = new Map()),
      (this.dBr = new Map()),
      (this.CBr = new AnsContextSet()),
      (this.gBr = new AnsContextSet());
  }
  OnInit() {
    this.NeedTick = !0;
  }
  RegisterAnsTrigger(e, t, o) {
    this.dBr.set(e, new AnsContextTrigger(t, o));
  }
  AddAns(e, t) {
    let o = this.mBr.get(e);
    let n = (o || ((o = new AnsContextSet()), this.mBr.set(e, o)), o.Has(t));
    n || (o.Add(t), (n = t)), this.fBr(n), n.ExistCount++;
  }
  ReduceAns(e, t) {
    var e = this.mBr.get(e);
    e
      ? (e = e.Has(t))
        ? (t = e.ExistCount) <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 44, "Ans不成对,Ans数量为0,无法减少", [
              "AnsCount",
              t,
            ])
          : (this.fBr(e), e.ExistCount--)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 44, "Ans不成对,查找不到对应的AnsContext")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 44, "Ans不成对,Set不存在");
  }
  fBr(e) {
    this.gBr.Has(e) || (this.gBr.Add(e), (e.CacheCount = e.ExistCount));
  }
  Tick(e) {
    let t = this.CBr.AnsContextSet;
    if (t.size > 0) {
      for (const i of t) {
        var o;
        const n = i.CacheCount;
        const s = i.ExistCount;
        n === 0 && s > 0
          ? (o = this.dBr.get(i.constructor.name)) && o.OnBegin(i)
          : n > 0 &&
            s === 0 &&
            (o = this.dBr.get(i.constructor.name)) &&
            o.OnEnd(i);
      }
      this.CBr.Clear();
    }
    t = this.gBr.AnsContextSet;
    if (t.size > 0) {
      for (const r of t) this.CBr.Add(r);
      this.gBr.Clear();
    }
  }
};
(UiModelAnsControllerComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(6)],
  UiModelAnsControllerComponent,
)),
  (exports.UiModelAnsControllerComponent = UiModelAnsControllerComponent);
// # sourceMappingURL=UiModelAnsControllerComponent.js.map
