"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputDistributeHandle = exports.InputIdentification = void 0);
const InputEnums_1 = require("../../../Game/Input/InputEnums");
class InputIdentification {
  constructor(t) {
    (this.Hmr = InputEnums_1.EInputAction.None),
      (this.jmr = InputEnums_1.EInputAxis.None),
      (this.FGi = t);
  }
  get Name() {
    return this.FGi;
  }
  GetInputAction() {
    var t;
    return (
      this.Hmr ||
      ((t = this.FGi)
        ? ((this.Hmr = InputEnums_1.EInputAction[t]), this.Hmr)
        : void 0)
    );
  }
  GetInputAxis() {
    var t;
    return (
      this.jmr ||
      ((t = this.FGi)
        ? ((this.jmr = InputEnums_1.EInputAxis[t]), this.jmr)
        : void 0)
    );
  }
}
exports.InputIdentification = InputIdentification;
class InputCallback {
  constructor(t) {
    (this.fIo = []),
      (this.Wmr = []),
      (this.Kmr = !1),
      (this.Qmr = new InputIdentification(t));
  }
  Call(t) {
    this.Kmr = !0;
    for (const s of this.fIo) s(this.Qmr.Name, t, this.Qmr);
    this.Xmr(), (this.Kmr = !1);
  }
  Add(t) {
    (this.Kmr ? this.Wmr : this.fIo).push(t);
  }
  Xmr() {
    if (!(this.Wmr.length <= 0)) {
      for (const t of this.Wmr) this.fIo.push(t);
      this.Wmr.length = 0;
    }
  }
  Remove(t) {
    t = this.fIo.indexOf(t);
    t < 0 || this.fIo.splice(t, 1);
  }
  Clear() {
    (this.Qmr = void 0), (this.fIo.length = 0);
  }
  Length() {
    return this.fIo.length;
  }
}
class InputDistributeHandle {
  constructor(t, s) {
    (this.$mr = t), (this.B7 = new InputCallback(s));
  }
  Reset() {
    this.B7.Clear(), (this.B7 = void 0);
  }
  Bind(t) {
    this.B7.Add(t);
  }
  UnBind(t) {
    this.B7.Remove(t);
  }
  Call(t) {
    this.B7.Call(t);
  }
  GetCallbackLength() {
    return this.B7.Length();
  }
  GetInputDistributeTag() {
    return this.$mr;
  }
}
exports.InputDistributeHandle = InputDistributeHandle;
//# sourceMappingURL=InputDistributeHandle.js.map
