"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class UiModelBase {
  constructor() {
    (this.Id = 0), (this.bPo = new Array());
  }
  GetComponent(o) {
    return this.bPo[o];
  }
  CheckGetComponent(o) {
    const t = this.GetComponent(o);
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
    const t = o.Id;
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
      if (t >= this.bPo.length)
        for (let o = this.bPo.length; o <= t; o++) this.bPo.push(void 0);
      this.bPo[t]
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiComponent",
            44,
            "添加组件失败：组件已存在，请勿重复添加！",
            ["uiModelName", this.constructor.name],
            ["componentName", o.name],
          )
        : ((o = new o()).Create(this), (this.bPo[t] = o));
    }
  }
  Init() {
    for (const o of this.bPo) o?.Init();
  }
  Start() {
    for (const o of this.bPo) o?.Start();
  }
  Tick(o) {
    for (const t of this.bPo) t && t.NeedTick && t.Tick(o);
  }
  End() {
    for (const o of this.bPo) o?.End();
  }
  Clear() {
    for (const o of this.bPo) o?.Clear();
  }
}
exports.UiModelBase = UiModelBase;
// # sourceMappingURL=UiModelBase.js.map
