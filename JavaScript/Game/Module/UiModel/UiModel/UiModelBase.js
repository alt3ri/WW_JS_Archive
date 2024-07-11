"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class UiModelBase {
  constructor() {
    (this.Id = 0), (this.xxo = new Array());
  }
  GetComponent(o) {
    return this.xxo[o];
  }
  CheckGetComponent(o) {
    var t = this.GetComponent(o);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            44,
            "获取组件失败",
            ["Id", this.Id],
            ["uiModelName", this.constructor.name],
            ["component", o],
          )),
      t
    );
  }
  AddComponent(o) {
    var t = o.Id;
    if (t < 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiComponent",
          44,
          "组件未注册, 请检查是否使用装饰器RegisterUiModelComponent注册",
          ["uiModelName", this.constructor.name],
          ["componentName", o.name],
        );
    else {
      if (t >= this.xxo.length)
        for (let o = this.xxo.length; o <= t; o++) this.xxo.push(void 0);
      this.xxo[t]
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiComponent",
            44,
            "添加组件失败：组件已存在，请勿重复添加！",
            ["uiModelName", this.constructor.name],
            ["componentName", o.name],
          )
        : ((o = new o()).Create(this), (this.xxo[t] = o));
    }
  }
  Init() {
    for (const o of this.xxo) o?.Init();
  }
  Start() {
    for (const o of this.xxo) o?.Start();
  }
  Tick(o) {
    for (const t of this.xxo) t && t.NeedTick && t.Tick(o);
  }
  End() {
    for (const o of this.xxo) o?.End();
  }
  Clear() {
    for (const o of this.xxo) o?.Clear();
  }
}
exports.UiModelBase = UiModelBase;
//# sourceMappingURL=UiModelBase.js.map
