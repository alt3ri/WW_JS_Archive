"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomKeyActionData = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  InputSettings_1 = require("../InputSettings/InputSettings");
class CustomKeyActionData {
  constructor() {
    (this.l$a = new Map()), (this.UT1 = new Set()), (this._$a = new Set());
  }
  SetCustomAction(t, o) {
    let e = this.l$a.get(t);
    e || ((e = new Set()), this.l$a.set(t, e)),
      e.add(o),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "InputSettings",
          10,
          "[CustomAction]设置临时Action输入按键",
          ["keyName", t],
          ["actionName", o],
          ["CustomKeyActionMap", this.l$a],
        );
  }
  ResetAllCustomAction(t) {
    this.l$a.delete(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "InputSettings",
          10,
          "[CustomAction]还原所有临时Action输入按键",
          ["keyName", t],
          ["CustomKeyActionMap", this.l$a],
        );
  }
  ResetCustomAction(t, o) {
    var e = this.l$a.get(t);
    e &&
      (e.delete(o), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "InputSettings",
        10,
        "[CustomAction]还原临时Action输入按键",
        ["keyName", t],
        ["CustomKeyActionMap", this.l$a],
      );
  }
  GetCustomActionName(t) {
    if (!(0 < this.UT1.size)) {
      t = this.l$a?.get(t);
      if (t) return t;
    }
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    if (this.l$a) {
      var o,
        e,
        s = Info_1.Info.IsInKeyBoard(),
        i = Info_1.Info.IsInGamepad(),
        n = [];
      for ([o, e] of this.l$a)
        e.has(t) &&
          ((s && InputSettings_1.InputSettings.IsKeyboardKey(o)) ||
            (i && InputSettings_1.InputSettings.IsGamepadKey(o))) &&
          n.push(o);
      if (!(n.length <= 0)) return n;
    }
  }
  SetActionEnable(t, o) {
    o ? this._$a.delete(t) : this._$a.add(t);
  }
  IsActionEnable(t) {
    return 0 < this.UT1.size || !this._$a.has(t);
  }
  DisableCustomInputData(t) {
    this.UT1.add(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          10,
          "[CustomAction]临时禁用自定义输入数据",
          ["reason", t],
          ["CacheReasonSet", this.UT1],
        );
  }
  EnableCustomInputData(t) {
    this.UT1.delete(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          10,
          "[CustomAction]恢复使用自定义输入数据",
          ["reason", t],
          ["CacheReasonSet", this.UT1],
        );
  }
  Clear() {
    this.l$a.clear(), this.UT1.clear(), this._$a.clear();
  }
}
exports.CustomKeyActionData = CustomKeyActionData;
//# sourceMappingURL=CustomKeyActionData.js.map
