"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputSettings = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputActionKey_1 = require("./Key/InputActionKey"),
  InputAxisKey_1 = require("./Key/InputAxisKey"),
  InputCombinationActionKey_1 = require("./Key/InputCombinationActionKey"),
  InputCombinationAxisKey_1 = require("./Key/InputCombinationAxisKey"),
  InputKey_1 = require("./Key/InputKey");
class InputSettings {
  static Initialize() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "初始化InputSettings"),
      (this.CSe = UE.InputSettings.GetInputSettings()),
      this.Refresh();
  }
  static Clear() {
    (this.CSe = void 0),
      (this.vSe = void 0),
      (this.MSe = void 0),
      (this.SSe = void 0),
      this.ESe.clear(),
      this.ySe.clear(),
      this.ISe();
  }
  static Refresh() {
    this.q9s(), this.G9s(), this.O9s();
  }
  static q9s() {
    var e = this.GetActionNames();
    for (let t = 0; t < e.Num(); t++) {
      var n = e.Get(t),
        s =
          ((this.MSe = (0, puerts_1.$ref)(void 0)),
          this.CSe.GetActionMappingByName(n, this.MSe),
          (0, puerts_1.$unref)(this.MSe));
      let i = this.ESe.get(n.toString());
      i || ((i = new Map()), this.ESe.set(n.toString(), i));
      for (let t = 0; t < s.Num(); t++) {
        var a = s.Get(t),
          o = a.Key.KeyName.toString();
        this.TSe(o),
          i.get(o)?.IsEqual(a) ||
            ((a =
              InputActionKey_1.InputActionKey.NewByInputActionKeyMapping(a)),
            i.set(o, a));
      }
      s.Empty();
    }
  }
  static G9s() {
    var e = this.GetAxisNames();
    for (let t = 0; t < e.Num(); t++) {
      var n = e.Get(t),
        s =
          (this.CSe.GetAxisMappingByName(n, this.SSe),
          (0, puerts_1.$unref)(this.SSe));
      let i = this.ySe.get(n.toString());
      i || ((i = new Map()), this.ySe.set(n.toString(), i));
      for (let t = 0; t < s.Num(); t++) {
        var a = s.Get(t),
          o = a.Key.KeyName.toString();
        this.TSe(o),
          i.get(o)?.IsEqual(a) ||
            ((a = InputAxisKey_1.InputAxisKey.NewByInputAxisKeyMapping(a)),
            i.set(o, a));
      }
      s.Empty();
    }
  }
  static RemoveCombinationActionMapping(t, e, n) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "InputSettings",
        8,
        "删除组合Action按键映射",
        ["actionName", t],
        ["mainKeyName", e],
        ["secondaryKeyName", n],
      );
    t = this.LSe.get(t);
    if (t) {
      var s = t.get(e);
      if (s) {
        let i = -1;
        for (let t = 0; t < s.length; t++)
          if (s[t].GetSecondaryKey()?.GetKeyName() === n) {
            i = t;
            break;
          }
        0 <= i && s?.splice(i, 1), s.length <= 0 && t.delete(e);
      }
    }
  }
  static NewInputCombinationActionKey(t, i, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "InputSettings",
        8,
        "添加组合Action按键映射",
        ["actionName", t],
        ["mainKeyName", i],
        ["secondaryKeyName", e],
      ),
      this.TSe(i),
      this.TSe(e);
    e = InputCombinationActionKey_1.InputCombinationActionKey.New(t, i, e);
    let n = this.LSe.get(t);
    if (n) {
      let t = n.get(i);
      t ? t.push(e) : ((t = [e]), n.set(i, t));
    } else (n = new Map()).set(i, [e]), this.LSe.set(t, n);
  }
  static O9s() {
    this.RSe.clear();
    for (const p of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig()) {
      var t,
        i,
        e,
        n,
        s = p.AxisName,
        a = p.SecondaryKeyScaleMap;
      for ([t, i] of p.PcKeyMap) {
        var o = a.get(t);
        this.DSe(s, i, t, o);
      }
      for ([e, n] of p.GamepadKeyMap) {
        var r = a.get(e);
        this.DSe(s, n, e, r);
      }
    }
  }
  static DSe(t, i, e, n) {
    this.TSe(i), this.TSe(e);
    let s = this.RSe.get(t),
      a = (s || ((s = new Map()), this.RSe.set(t, s)), s.get(i));
    a || ((a = []), s.set(i, a));
    t = InputCombinationAxisKey_1.InputCombinationAxisKey.New(t, i, e, n);
    a.push(t);
  }
  static SaveKeyMappings() {
    this.CSe?.SaveKeyMappings();
  }
  static TSe(t) {
    this.USe.has(t) || this.ASe(t);
  }
  static ASe(t) {
    var i = new InputKey_1.InputKey(t);
    this.USe.set(t, i);
  }
  static ISe() {
    this.USe.clear();
  }
  static GetKey(t) {
    return this.USe.get(t);
  }
  static GetUeKey(t) {
    return this.GetKey(t)?.ToUeKey();
  }
  static GetInputAnalogKeyState(t) {
    return this.GetKey(t)?.GetInputAnalogKeyState();
  }
  static IsInputKeyDown(t) {
    t = this.GetKey(t);
    return !!t && t.IsInputKeyDown();
  }
  static IsKeyboardKey(t) {
    var i = this.GetKey(t);
    return i
      ? i.IsKeyboardKey
      : ((i = new UE.Key(new UE.FName(t))),
        UE.KismetInputLibrary.Key_IsKeyboardKey(i));
  }
  static IsGamepadKey(t) {
    var i = this.GetKey(t);
    return i
      ? i.IsGamepadKey
      : ((i = new UE.Key(new UE.FName(t))),
        UE.KismetInputLibrary.Key_IsGamepadKey(i));
  }
  static IsMouseButton(t) {
    var i = this.GetKey(t);
    return i
      ? i.IsMouseButton
      : ((i = new UE.Key(new UE.FName(t))),
        UE.KismetInputLibrary.Key_IsMouseButton(i));
  }
  static IsValidKey(t) {
    return (
      "Keyboard_Invalid" !== t &&
      "Gamepad_Invalid" !== t &&
      "GenericUSBController_ButtonInvalid" !== t
    );
  }
  static GetKeyIconPath(t) {
    var i = this.GetKey(t);
    if (i) {
      var e,
        n = ConfigManager_1.ConfigManager.InputSettingsConfig;
      if (i.IsKeyboardKey || i.IsMouseButton)
        return (e = n?.GetPcKeyConfig(t)) ? e.KeyIconPath : void 0;
      if (i.IsGamepadKey) {
        var s = n?.GetGamepadKeyConfig(t);
        if (!s) return;
        switch (ModelManager_1.ModelManager.PlatformModel.PlatformType) {
          case 6:
            return s.KeyIconPath;
          case 7:
            return s.PsKeyIconPath;
          default:
            return s.KeyIconPath;
        }
      }
    }
  }
  static SetActionMapping(t, i) {
    if (this.CSe?.IsValid()) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          8,
          "设置Action按键映射",
          ["actionName", t],
          ["keys", i],
        ),
        this.PSe(t);
      for (const e of i) this.xSe(t, e);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "设置Action按键映射时，InputSetting不可用",
          ["actionName", t],
        );
  }
  static AddActionMapping(t, i) {
    this.CSe?.IsValid()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            8,
            "添加Action按键映射",
            ["actionName", t],
            ["key", i],
          ),
        this.xSe(t, i))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "添加Action按键映射时，InputSetting不可用",
          ["actionName", t],
        );
  }
  static xSe(t, i) {
    this.TSe(i);
    let e = this.GetInputActionKeyMap(t);
    e || ((e = new Map()), this.ESe.set(t, e));
    t = InputActionKey_1.InputActionKey.New(t, !1, !1, !1, !1, i);
    this.CSe.AddActionMapping(t.ToUeInputActionKeyMapping()), e.set(i, t);
  }
  static RemoveActionMappingByCondition(t, i) {
    if (i)
      if (this.CSe?.IsValid()) {
        var e = this.GetInputActionKeyMap(t);
        if (e) {
          var n = [];
          for (const s of e.values()) i(s.KeyName) && n.push(s);
          for (const a of n) this.wSe(a, e);
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InputSettings",
            8,
            "删除Action按键映射时，InputSetting不可用",
            ["actionName", t],
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("InputSettings", 8, "请使用RemoveActionMapping");
  }
  static RemoveActionMapping(t, i) {
    var e, n;
    this.CSe?.IsValid()
      ? (e = this.GetInputActionKeyMap(t)) &&
        ((n = e.get(i))
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "InputSettings",
                8,
                "删除Action按键映射",
                ["actionName", t],
                ["key", i],
              ),
            this.wSe(n, e))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "InputSettings",
              8,
              "删除Action按键映射时,找不到对应按键",
              ["actionName", t],
              ["key", i],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "删除Action按键映射时，InputSetting不可用",
          ["actionName", t],
        );
  }
  static wSe(t, i) {
    var e = t.KeyName;
    this.CSe.RemoveActionMapping(t.ToUeInputActionKeyMapping()), i.delete(e);
  }
  static ClearActionMapping(t) {
    this.CSe?.IsValid()
      ? this.PSe(t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "删除Action所有按键映射时，InputSetting不可用",
          ["actionName", t],
        );
  }
  static PSe(t) {
    t = this.GetInputActionKeyMap(t);
    if (t) {
      for (const i of t.values())
        this.CSe.RemoveActionMapping(i.ToUeInputActionKeyMapping());
      t.clear();
    }
  }
  static GetInputActionKeyMap(t) {
    return this.ESe.get(t);
  }
  static GetInputActionKey(t, i) {
    t = this.ESe.get(t);
    if (t) return t.get(i);
  }
  static GetActionNames() {
    return this.CSe.GetActionNames(this.vSe), (0, puerts_1.$unref)(this.vSe);
  }
  static GetActionMappings(t) {
    return (
      (this.MSe = (0, puerts_1.$ref)(void 0)),
      this.CSe.GetActionMappingByName(
        FNameUtil_1.FNameUtil.GetDynamicFName(t),
        this.MSe,
      ),
      (0, puerts_1.$unref)(this.MSe)
    );
  }
  static SetAxisMapping(t, i) {
    if (this.CSe?.IsValid()) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          8,
          "设置Axis按键映射",
          ["actionName", t],
          ["keys", i],
        );
      var e,
        n,
        s = this.GetInputAxisKeyMap(t);
      if (s) {
        var a = [];
        for (const p of s.values()) {
          var o = p.KeyName;
          (i.has(o) && p.Scale === i.get(o)) || a.push(p);
        }
        for (const g of a)
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              8,
              "删除不在新数据里的数据",
              ["AxisName", t],
              ["key", g.KeyName],
            ),
            this.BSe(g, s);
      }
      for ([e, n] of i) {
        var r = this.GetInputAxisKey(t, e);
        (r && r.Scale === i.get(e)) ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              8,
              "新增不在当前的数据",
              ["axisName", t],
              ["key", e],
            ),
          this.bSe(t, n, e));
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "设置Axis按键映射时，InputSetting不可用",
          ["actionName", t],
        );
  }
  static AddAxisMapping(t, i, e) {
    this.CSe?.IsValid()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            8,
            "添加Axis按键映射",
            ["axisName", t],
            ["key", i],
            ["scale", e],
          ),
        this.bSe(t, e, i))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "添加Axis按键映射时，InputSetting不可用",
          ["actionName", t],
        );
  }
  static bSe(t, i, e) {
    this.TSe(e);
    let n = this.GetInputAxisKeyMap(t);
    n || ((n = new Map()), this.ySe.set(t, n));
    t = InputAxisKey_1.InputAxisKey.New(t, i, e);
    this.CSe.AddAxisMapping(t.ToUeInputAxisKeyMapping()), n.set(e, t);
  }
  static RemoveAxisMappingByCondition(t, i) {
    if (i)
      if (this.CSe?.IsValid()) {
        var e = this.GetInputAxisKeyMap(t);
        if (e) {
          var n = [];
          for (const s of e.values()) i(s.KeyName) && n.push(s);
          for (const a of n) this.BSe(a, e);
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InputSettings",
            8,
            "删除Action按键映射时，InputSetting不可用",
            ["actionName", t],
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("InputSettings", 8, "请使用RemoveActionMapping");
  }
  static RemoveAxisMapping(t, i) {
    var e, n;
    this.CSe?.IsValid()
      ? (e = this.GetInputAxisKeyMap(t)) &&
        ((n = e.get(i))
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "InputSettings",
                8,
                "删除Axis按键映射",
                ["axisName", t],
                ["key", i],
              ),
            this.BSe(n, e))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "InputSettings",
              8,
              "删除Axis按键映射,找不到对应按键",
              ["actionName", t],
              ["key", i],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "添加Axis按键映射时，InputSetting不可用",
          ["actionName", t],
        );
  }
  static BSe(t, i) {
    var e = t.KeyName;
    this.CSe.RemoveAxisMapping(t.ToUeInputAxisKeyMapping()), i.delete(e);
  }
  static ClearAxisMapping(t) {
    var i = this.GetInputAxisKeyMap(t);
    if (i) {
      for (const e of i.values())
        this.CSe.RemoveAxisMapping(e.ToUeInputAxisKeyMapping());
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InputSettings", 8, "删除Axis所有按键映射", [
          "axisName",
          t,
        ]),
        i.clear();
    }
  }
  static GetInputAxisKeyMap(t) {
    return this.ySe.get(t);
  }
  static GetInputAxisKey(t, i) {
    t = this.ySe.get(t);
    if (t) return t.get(i);
  }
  static GetAxisNames() {
    return this.CSe.GetAxisNames(this.vSe), (0, puerts_1.$unref)(this.vSe);
  }
  static GetAxisMappings(t) {
    return (
      (this.SSe = (0, puerts_1.$ref)(void 0)),
      this.CSe.GetAxisMappingByName(
        FNameUtil_1.FNameUtil.GetDynamicFName(t),
        this.SSe,
      ),
      (0, puerts_1.$unref)(this.SSe)
    );
  }
  static GetCombinationActionKeyMap(t) {
    return this.LSe.get(t);
  }
  static GetCombinationActionKey(t, i) {
    t = this.LSe.get(t);
    if (t) return t.get(i);
  }
  static GetCombinationAxisKeyMap(t) {
    return this.RSe.get(t);
  }
  static GetCombinationAxisKey(t, i) {
    t = this.RSe.get(t);
    if (t) return t.get(i);
  }
  static SetUseMouseForTouch(t) {
    this.CSe && (this.CSe.bUseMouseForTouch = t);
  }
  static GetKeyboardPrimaryLangId() {
    return this.CSe
      ? this.CSe.GetKeyboardPrimaryLangId().toString()
      : "Default";
  }
}
((exports.InputSettings = InputSettings).CSe = void 0),
  (InputSettings.USe = new Map()),
  (InputSettings.ESe = new Map()),
  (InputSettings.ySe = new Map()),
  (InputSettings.LSe = new Map()),
  (InputSettings.RSe = new Map()),
  (InputSettings.vSe = (0, puerts_1.$ref)(void 0)),
  (InputSettings.MSe = (0, puerts_1.$ref)(void 0)),
  (InputSettings.SSe = (0, puerts_1.$ref)(void 0));
//# sourceMappingURL=InputSettings.js.map
