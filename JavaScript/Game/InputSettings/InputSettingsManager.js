"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputSettingsManager = void 0);
const Log_1 = require("../../Core/Common/Log"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
  InputSettings_1 = require("./InputSettings"),
  InputActionMapping_1 = require("./Maping/InputActionMapping"),
  InputAxisMapping_1 = require("./Maping/InputAxisMapping"),
  InputCombinationActionMapping_1 = require("./Maping/InputCombinationActionMapping"),
  InputCombinationAxisMapping_1 = require("./Maping/InputCombinationAxisMapping"),
  CHECK_COMBINATIONACTIONKEYMAP_SAVE_INTERVAL = 1e4;
class InputSettingsManager {
  static Initialize() {
    (this.qEe = new InputActionMapping_1.InputActionMapping()),
      this.qEe.Initialize(),
      (this.GEe = new InputAxisMapping_1.InputAxisMapping()),
      this.GEe.Initialize(),
      (this.NEe =
        new InputCombinationActionMapping_1.InputCombinationActionMapping()),
      (this.OEe =
        new InputCombinationAxisMapping_1.InputCombinationAxisMapping()),
      this.OEe.Initialize(),
      this.RefreshAllActionKeys(),
      this.RefreshAllAxisKeys(),
      this.RefreshCombinationActionKeys();
  }
  static Clear() {
    this.Nkn(),
      this.kkn(),
      this.qEe.Clear(),
      (this.qEe = void 0),
      this.GEe.Clear(),
      (this.GEe = void 0),
      this.NEe.Clear(),
      (this.NEe = void 0),
      this.OEe.Clear(),
      (this.OEe = void 0);
  }
  static get CheckUseFrenchKeyboard() {
    return (
      "French" === InputSettings_1.InputSettings.GetKeyboardPrimaryLangId()
    );
  }
  static Tia(t) {
    return (
      t === InputMappingsDefine_1.actionMappings.地图 ||
      t === InputMappingsDefine_1.actionMappings.聊天
    );
  }
  static AIa(i, n) {
    var e = InputSettings_1.InputSettings.GetActionMappings(n);
    if (e && e.Num() <= 0) {
      let t = [];
      t = InputSettingsManager.CheckUseFrenchKeyboard
        ? i.FrancePcKeys
        : i.PcKeys;
      const o = i.GamepadKeys,
        r = t.concat(o);
      void InputSettingsManager.SetActionKeys(n, r);
    } else {
      var a = [];
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t).Key.KeyName.toString();
        InputSettings_1.InputSettings.GetKey(s)?.IsKeyboardKey && a.push(s);
      }
      const o = i.GamepadKeys,
        r = a.concat(o);
      InputSettingsManager.SetActionKeys(n, r);
    }
  }
  static RefreshAllActionKeys(i = !1) {
    for (const s of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      var n = s.ActionName;
      if (!i) {
        if (InputSettingsManager.Tia(n)) {
          InputSettingsManager.AIa(s, n);
          continue;
        }
        var e = InputSettings_1.InputSettings.GetActionMappings(n);
        if (0 < e.Num()) {
          InputSettingsManager.RefreshActionKeys(n, e);
          continue;
        }
      }
      let t = [];
      t = InputSettingsManager.CheckUseFrenchKeyboard
        ? s.FrancePcKeys
        : s.PcKeys;
      var e = s.GamepadKeys,
        a = t.concat(e);
      InputSettingsManager.SetActionKeys(n, a);
    }
  }
  static ClearAllKeys() {
    this.qEe?.ClearAllActionKeys(), this.GEe?.ClearAllAxisKeys();
  }
  static RefreshAllAxisKeys(i = !1) {
    for (const p of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      var n = p.AxisName;
      if (!i) {
        var e = InputSettings_1.InputSettings.GetAxisMappings(n);
        if (0 < e.Num()) {
          InputSettingsManager.RefreshAxisKeys(n, e);
          continue;
        }
      }
      let t = new Map();
      t = InputSettingsManager.CheckUseFrenchKeyboard
        ? p.FrancePcKeys
        : p.PcKeys;
      var a,
        s,
        o,
        r,
        e = p.GamepadKeys,
        g = new Map();
      for ([a, s] of t) g.set(a, s);
      for ([o, r] of e) g.set(o, r);
      InputSettingsManager.SetAxisKeys(n, g);
    }
  }
  static GetActionBinding(t) {
    return this.qEe.GetActionBinding(t);
  }
  static GetActionBindingByConfigId(t) {
    return this.qEe.GetActionBindingByConfigId(t);
  }
  static CheckGetActionKeyIconPath(t) {
    var i = t.GetCurrentPlatformKey();
    if (i) {
      var n = i.GetKeyIconPath();
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
    return this.qEe.GetActionBindingByActionMappingType(t);
  }
  static SetActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "设置Action按键", ["actionName", t]),
      this.qEe.SetKeys(t, i);
  }
  static RefreshActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "刷新Action按键", ["actionName", t]),
      this.qEe.RefreshKeysByActionMappings(t, i);
  }
  static AddActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "添加Action按键", ["actionName", t]),
      this.qEe.AddKeys(t, i);
  }
  static RemoveActionKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除按键", ["actionName", t]),
      this.qEe.RemoveKeys(t, i);
  }
  static RemoveActionKeysByCondition(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除Action中符合条件的按键映射", [
        "actionName",
        t,
      ]),
      this.qEe.RemoveKeysByCondition(t, i);
  }
  static GetAxisBinding(t) {
    return this.GEe.GetAxisBinding(t);
  }
  static GetAxisBindingByAxisMappingType(t) {
    return this.GEe.GetAxisBindingByAxisMappingType(t);
  }
  static CheckGetAxisKeyIconPath(t) {
    var i = t.GetCurrentPlatformKey();
    if (i) {
      var n = i.GetKeyIconPath();
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
    for (const n of this.GEe.GetAxisBindingByAxisMappingType(t))
      if (n.HasKey(i)) return { IsContain: !0, ContainAxisBinding: n };
    return { IsContain: !1, ContainAxisBinding: void 0 };
  }
  static SetAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "设置Axis按键", ["axisName", t]),
      this.GEe.SetKeys(t, i);
  }
  static RefreshAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "刷新Axis按键", ["axisName", t]),
      this.GEe.RefreshKeys(t, i);
  }
  static AddAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "添加Action按键", ["actionName", t]),
      this.GEe.AddKeys(t, i);
  }
  static RemoveAxisKeys(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除按键", ["actionName", t]),
      this.GEe.RemoveKeys(t, i);
  }
  static RemoveAxisKeysByCondition(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "删除Action中符合条件的按键映射", [
        "actionName",
        t,
      ]),
      this.GEe.RemoveKeysByCondition(t, i);
  }
  static RefreshCombinationActionKeys(t = !1) {
    this.ClearCombinationActionKeyMap();
    var i = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
      void 0,
    );
    if ((i && (this.kEe = i), this.kEe && 0 < this.kEe.size && !t))
      for (var [n, e] of this.kEe) for (const p of e) this.FEe(n, p[0], p[1]);
    else {
      this.kEe.clear(), this.Fkn();
      i =
        ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationActionConfig();
      if (i)
        for (const c of i) {
          var a,
            s,
            o,
            r,
            g = c.ActionName;
          for ([a, s] of c.PcKeys) this.AddCombinationActionKeyMap(g, a, s);
          for ([o, r] of c.GamepadKeys)
            this.AddCombinationActionKeyMap(g, o, r);
        }
    }
  }
  static ClearCombinationActionKeyMap() {
    this.NEe?.Clear(), this.kEe.clear();
  }
  static AddCombinationActionKeyMap(t, i, n) {
    this.FEe(t, i, n);
    var e = this.kEe.get(t),
      a = [i, n];
    if (e) {
      for (var [s, o] of e) if (s === i && o === n) return;
      e.push(a);
    } else this.kEe.set(t, [a]);
    this.Fkn();
  }
  static FEe(t, i, n) {
    let e = this.GetCombinationActionBindingByActionName(t);
    (e = e || this.NEe?.NewCombinationActionBinding(t, 0)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          8,
          "添加组合键按键",
          ["ActionName", e.GetActionName()],
          ["mainKeyName", i],
          ["secondaryKeyName", n],
        ),
      this.NEe?.AddKey(e, i, n),
      InputSettings_1.InputSettings.NewInputCombinationActionKey(
        e.GetActionName(),
        i,
        n,
      ),
      this.PrintCurrentCombinationActionBinding(t));
  }
  static RemoveCombinationActionKeyMap(t, i, n) {
    this.VEe(t, i, n);
    var e = this.kEe.get(t);
    if (e) {
      var a = [];
      for (let t = 0; t < e.length; t++) {
        var s = e[t];
        s[0] === i && s[1] === n && a.push(t);
      }
      for (const o of a) e.splice(o, 1);
      e.length <= 0 && this.kEe.delete(t);
    } else this.kEe.delete(t);
    this.Fkn(), this.PrintCurrentCombinationActionBinding(t);
  }
  static VEe(t, i, n) {
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
      this.NEe?.RemoveKey(t, i, n),
      InputSettings_1.InputSettings.RemoveCombinationActionMapping(
        t.GetActionName(),
        i,
        n,
      ));
  }
  static PrintCurrentCombinationActionBinding(t, i = "0") {
    var n = new Map(),
      e = new Map(),
      a = new Map(),
      t = this.NEe?.GetCombinationActionBindingByActionName(t);
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
    return this.NEe.GetCombinationActionBindingByKeyName(t, i);
  }
  static GetCombinationActionBindingByActionName(t) {
    return this.NEe.GetCombinationActionBindingByActionName(t);
  }
  static IsCombinationActionMainKey(t) {
    return this.NEe.IsMainKey(t);
  }
  static IsCombinationAction(t, i) {
    t = this.GetCombinationActionBindingByKeyName(t, i);
    return !(!t || t.size <= 0);
  }
  static GetCombinationAxisBindingByKeyName(t, i) {
    return this.OEe.GetCombinationAxisBindingByKeyName(t, i);
  }
  static GetCombinationAxisBindingMapByMainKeyName(t) {
    return this.OEe.GetCombinationAxisBindingMapByMainKeyName(t);
  }
  static GetCombinationAxisBindingByActionName(t) {
    return this.OEe.GetCombinationAxisBindingByActionName(t);
  }
  static IsCombinationAxisMainKey(t) {
    return this.OEe.IsMainKey(t);
  }
  static IsCombinationAxis(t, i) {
    t = this.GetCombinationAxisBindingByKeyName(t, i);
    return !(!t || t.length <= 0);
  }
  static GetActionKeyDisplayData(t, i) {
    var n = InputSettingsManager.GetCombinationActionBindingByActionName(i);
    if (n) {
      var e = new Map();
      if ((n.GetCurrentPlatformKeyNameMap(e), e && 0 < e.size))
        return t.RefreshCombinationInput(i, e), !0;
    }
    n = InputSettingsManager.GetActionBinding(i);
    if (n) {
      e = [];
      if ((n.GetCurrentPlatformKeyNameList(e), 0 < e.length))
        return t.RefreshInput(i, e), !0;
    }
    return !1;
  }
  static GetAxisKeyDisplayData(t, i) {
    var n = InputSettingsManager.GetCombinationAxisBindingByActionName(i);
    if (n) {
      var e = new Map();
      if ((n.GetCurrentPlatformKeyNameMap(e), e && 0 < e.size))
        return t.RefreshCombinationInput(i, e), !0;
    }
    n = InputSettingsManager.GetAxisBinding(i);
    if (n) {
      e = [];
      if ((n.GetCurrentPlatformKeyNameList(e), 0 < e.length))
        return t.RefreshInput(i, e), !0;
    }
    return !1;
  }
  static Fkn() {
    (this.Vkn = !0), this.Hkn();
  }
  static Hkn() {
    this.jkn() ||
      (this.Wkn = TimerSystem_1.TimerSystem.Delay(() => {
        this.kkn() && this.Nkn();
      }, CHECK_COMBINATIONACTIONKEYMAP_SAVE_INTERVAL));
  }
  static Nkn() {
    void 0 !== this.Wkn &&
      (TimerSystem_1.TimerSystem.Remove(this.Wkn), (this.Wkn = void 0));
  }
  static jkn() {
    return void 0 !== this.Wkn;
  }
  static kkn() {
    return !(
      !this.Vkn ||
      (LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
        this.kEe,
      ),
      (this.Vkn = !1))
    );
  }
}
((exports.InputSettingsManager = InputSettingsManager).qEe = void 0),
  (InputSettingsManager.GEe = void 0),
  (InputSettingsManager.NEe = void 0),
  (InputSettingsManager.OEe = void 0),
  (InputSettingsManager.kEe = new Map()),
  (InputSettingsManager.Vkn = void 0),
  (InputSettingsManager.Wkn = void 0),
  (InputSettingsManager.SkipGlobalSdkCheck = !1);
//# sourceMappingURL=InputSettingsManager.js.map
