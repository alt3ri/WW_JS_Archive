"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputSettingsManager = void 0);
const Log_1 = require("../../Core/Common/Log");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const ConfigManager_1 = require("../Manager/ConfigManager");
const InputSettings_1 = require("./InputSettings");
const InputActionMapping_1 = require("./Maping/InputActionMapping");
const InputAxisMapping_1 = require("./Maping/InputAxisMapping");
const InputCombinationActionMapping_1 = require("./Maping/InputCombinationActionMapping");
const InputCombinationAxisMapping_1 = require("./Maping/InputCombinationAxisMapping");
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
class InputSettingsManager {
  static Initialize() {
    (this.qSe = new InputActionMapping_1.InputActionMapping()),
      this.qSe.Initialize(),
      (this.GSe = new InputAxisMapping_1.InputAxisMapping()),
      this.GSe.Initialize(),
      (this.NSe =
        new InputCombinationActionMapping_1.InputCombinationActionMapping()),
      (this.OSe =
        new InputCombinationAxisMapping_1.InputCombinationAxisMapping()),
      this.OSe.Initialize(),
      this.RefreshAllActionKeys(),
      this.RefreshAllAxisKeys(),
      this.RefreshCombinationActionKeys();
  }
  static Clear() {
    this.qSe.Clear(),
      (this.qSe = void 0),
      this.GSe.Clear(),
      (this.GSe = void 0),
      this.NSe.Clear(),
      (this.NSe = void 0),
      this.OSe.Clear(),
      (this.OSe = void 0);
  }
  static get SVs() {
    return (
      InputSettings_1.InputSettings.GetKeyboardPrimaryLangId() === "French"
    );
  }
  static P9s(t) {
    return (
      t === InputMappingsDefine_1.actionMappings.地图 ||
      t === InputMappingsDefine_1.actionMappings.聊天
    );
  }
  static RefreshAllActionKeys(i = !1) {
    for (const s of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      const n = s.ActionName;
      if (!i && !InputSettingsManager.P9s(n)) {
        var e = InputSettings_1.InputSettings.GetActionMappings(n);
        if (e.Num() > 0) {
          InputSettingsManager.RefreshActionKeys(n, e);
          continue;
        }
      }
      let t = [];
      t = InputSettingsManager.SVs ? s.FrancePcKeys : s.PcKeys;
      var e = s.GamepadKeys;
      const a = t.concat(e);
      InputSettingsManager.SetActionKeys(n, a);
    }
  }
  static ClearAllKeys() {
    this.qSe?.ClearAllActionKeys(), this.GSe?.ClearAllAxisKeys();
  }
  static RefreshAllAxisKeys(i = !1) {
    for (const c of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      const n = c.AxisName;
      if (!i) {
        var e = InputSettings_1.InputSettings.GetAxisMappings(n);
        if (e.Num() > 0) {
          InputSettingsManager.RefreshAxisKeys(n, e);
          continue;
        }
      }
      let t = new Map();
      t = InputSettingsManager.SVs ? c.FrancePcKeys : c.PcKeys;
      var a;
      var s;
      var o;
      var r;
      var e = c.GamepadKeys;
      const g = new Map();
      for ([a, s] of t) g.set(a, s);
      for ([o, r] of e) g.set(o, r);
      InputSettingsManager.SetAxisKeys(n, g);
    }
  }
  static GetActionBinding(t) {
    return this.qSe.GetActionBinding(t);
  }
  static GetActionBindingByConfigId(t) {
    return this.qSe.GetActionBindingByConfigId(t);
  }
  static CheckGetActionKeyIconPath(t) {
    const i = t.GetCurrentPlatformKey();
    if (i) {
      const n = i.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(n)) return n;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("InputSettings", 8, "此按键配置了空的图标路径", [
          "KeyName",
          i.GetKeyName(),
        ]);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "Action找不到对应按键",
          ["ActionName", t.GetActionName()],
          ["KeyName", void 0],
        );
  }
  static GetActionBindingByActionMappingType(t) {
    return this.qSe.GetActionBindingByActionMappingType(t);
  }
  static SetActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "设置Action按键", ["actionName", t]),
      this.qSe.SetKeys(t, i);
  }
  static RefreshActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "刷新Action按键", ["actionName", t]),
      this.qSe.RefreshKeysByActionMappings(t, i);
  }
  static AddActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "添加Action按键", ["actionName", t]),
      this.qSe.AddKeys(t, i);
  }
  static RemoveActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除按键", ["actionName", t]),
      this.qSe.RemoveKeys(t, i);
  }
  static RemoveActionKeysByCondition(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除Action中符合条件的按键映射", [
        "actionName",
        t,
      ]),
      this.qSe.RemoveKeysByCondition(t, i);
  }
  static GetAxisBinding(t) {
    return this.GSe.GetAxisBinding(t);
  }
  static GetAxisBindingByAxisMappingType(t) {
    return this.GSe.GetAxisBindingByAxisMappingType(t);
  }
  static CheckGetAxisKeyIconPath(t) {
    const i = t.GetCurrentPlatformKey();
    if (i) {
      const n = i.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(n)) return n;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("InputSettings", 8, "此按键配置了空的图标路径", [
          "KeyName",
          i.KeyName,
        ]);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InputSettings",
          8,
          "Axis找不到对应按键",
          ["AxisName", t.GetAxisName()],
          ["KeyName", void 0],
        );
  }
  static ContainAxisKeyByType(t, i) {
    for (const n of this.GSe.GetAxisBindingByAxisMappingType(t))
      if (n.HasKey(i)) return { IsContain: !0, ContainAxisBinding: n };
    return { IsContain: !1, ContainAxisBinding: void 0 };
  }
  static SetAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "设置Axis按键", ["axisName", t]),
      this.GSe.SetKeys(t, i);
  }
  static RefreshAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "刷新Axis按键", ["axisName", t]),
      this.GSe.RefreshKeys(t, i);
  }
  static AddAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "添加Action按键", ["actionName", t]),
      this.GSe.AddKeys(t, i);
  }
  static RemoveAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除按键", ["actionName", t]),
      this.GSe.RemoveKeys(t, i);
  }
  static RemoveAxisKeysByCondition(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除Action中符合条件的按键映射", [
        "actionName",
        t,
      ]),
      this.GSe.RemoveKeysByCondition(t, i);
  }
  static RefreshCombinationActionKeys(t = !1) {
    this.ClearCombinationActionKeyMap();
    let i = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
      void 0,
    );
    if ((i && (this.kSe = i), this.kSe && this.kSe.size > 0 && !t))
      for (const [n, e] of this.kSe) for (const c of e) this.FSe(n, c[0], c[1]);
    else {
      this.kSe.clear(),
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
          this.kSe,
        );
      i =
        ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationActionConfig();
      if (i)
        for (const p of i) {
          var a;
          var s;
          var o;
          var r;
          const g = p.ActionName;
          for ([a, s] of p.PcKeys) this.AddCombinationActionKeyMap(g, a, s);
          for ([o, r] of p.GamepadKeys)
            this.AddCombinationActionKeyMap(g, o, r);
        }
    }
  }
  static ClearCombinationActionKeyMap() {
    this.NSe?.Clear(), this.kSe.clear();
  }
  static AddCombinationActionKeyMap(t, i, n) {
    this.FSe(t, i, n);
    const e = this.kSe.get(t);
    const a = [i, n];
    if (e) {
      for (const [s, o] of e) if (s === i && o === n) return;
      e.push(a);
    } else this.kSe.set(t, [a]);
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
      this.kSe,
    );
  }
  static FSe(t, i, n) {
    let e = this.GetCombinationActionBindingByActionName(t);
    (e = e || this.NSe?.NewCombinationActionBinding(t, 0)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          8,
          "添加组合键按键",
          ["ActionName", e.GetActionName()],
          ["mainKeyName", i],
          ["secondaryKeyName", n],
        ),
      this.NSe?.AddKey(e, i, n),
      InputSettings_1.InputSettings.NewInputCombinationActionKey(
        e.GetActionName(),
        i,
        n,
      ),
      this.PrintCurrentCombinationActionBinding(t));
  }
  static RemoveCombinationActionKeyMap(t, i, n) {
    this.VSe(t, i, n);
    const e = this.kSe.get(t);
    if (e) {
      const a = [];
      for (let t = 0; t < e.length; t++) {
        const s = e[t];
        s[0] === i && s[1] === n && a.push(t);
      }
      for (const o of a) e.splice(o, 1);
      e.length <= 0 && this.kSe.delete(t);
    } else this.kSe.delete(t);
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
      this.kSe,
    ),
      this.PrintCurrentCombinationActionBinding(t);
  }
  static VSe(t, i, n) {
    t = this.GetCombinationActionBindingByActionName(t);
    t &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          8,
          "删除组合键按键",
          ["ActionName", t.GetActionName()],
          ["RemoveMainKey", i],
          ["RemoveSecondaryKeyName", n],
        ),
      this.NSe?.RemoveKey(t, i, n),
      InputSettings_1.InputSettings.RemoveCombinationActionMapping(
        t.GetActionName(),
        i,
        n,
      ));
  }
  static PrintCurrentCombinationActionBinding(t, i = "0") {
    const n = new Map();
    const e = new Map();
    const a = new Map();
    var t = this.NSe?.GetCombinationActionBindingByActionName(t);
    t?.GetKeyMap(n),
      t?.GetPcKeyNameMap(e),
      t?.GetGamepadKeyNameMap(a),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          8,
          "当前组合键按键",
          ["Id", i],
          ["ActionName", t?.GetActionName()],
          ["KeyMap", n],
          ["PcKeyMap", e],
          ["GamepadKeyMap", a],
        );
  }
  static GetCombinationActionBindingByKeyName(t, i) {
    return this.NSe.GetCombinationActionBindingByKeyName(t, i);
  }
  static GetCombinationActionBindingByActionName(t) {
    return this.NSe.GetCombinationActionBindingByActionName(t);
  }
  static IsCombinationActionMainKey(t) {
    return this.NSe.IsMainKey(t);
  }
  static IsCombinationAction(t, i) {
    t = this.GetCombinationActionBindingByKeyName(t, i);
    return !(!t || t.size <= 0);
  }
  static GetCombinationAxisBindingByKeyName(t, i) {
    return this.OSe.GetCombinationAxisBindingByKeyName(t, i);
  }
  static GetCombinationAxisBindingMapByMainKeyName(t) {
    return this.OSe.GetCombinationAxisBindingMapByMainKeyName(t);
  }
  static GetCombinationAxisBindingByActionName(t) {
    return this.OSe.GetCombinationAxisBindingByActionName(t);
  }
  static IsCombinationAxisMainKey(t) {
    return this.OSe.IsMainKey(t);
  }
  static IsCombinationAxis(t, i) {
    t = this.GetCombinationAxisBindingByKeyName(t, i);
    return !(!t || t.length <= 0);
  }
  static GetActionKeyDisplayData(t, i) {
    let n = InputSettingsManager.GetCombinationActionBindingByActionName(i);
    if (n) {
      var e = new Map();
      if ((n.GetCurrentPlatformKeyNameMap(e), e && e.size > 0))
        return t.RefreshCombinationInput(i, e), !0;
    }
    n = InputSettingsManager.GetActionBinding(i);
    if (n) {
      e = [];
      if ((n.GetCurrentPlatformKeyNameList(e), e.length > 0))
        return t.RefreshInput(i, e), !0;
    }
    return !1;
  }
  static GetAxisKeyDisplayData(t, i) {
    let n = InputSettingsManager.GetCombinationAxisBindingByActionName(i);
    if (n) {
      var e = new Map();
      if ((n.GetCurrentPlatformKeyNameMap(e), e && e.size > 0))
        return t.RefreshCombinationInput(i, e), !0;
    }
    n = InputSettingsManager.GetAxisBinding(i);
    if (n) {
      e = [];
      if ((n.GetCurrentPlatformKeyNameList(e), e.length > 0))
        return t.RefreshInput(i, e), !0;
    }
    return !1;
  }
}
((exports.InputSettingsManager = InputSettingsManager).qSe = void 0),
  (InputSettingsManager.GSe = void 0),
  (InputSettingsManager.NSe = void 0),
  (InputSettingsManager.OSe = void 0),
  (InputSettingsManager.kSe = new Map()),
  (InputSettingsManager.SkipGlobalSdkCheck = !1);
// # sourceMappingURL=InputSettingsManager.js.map
