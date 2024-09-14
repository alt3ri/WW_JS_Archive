"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputSettingsManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Net_1 = require("../../Core/Net/Net"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  Global_1 = require("../Global"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
  InputSettings_1 = require("./InputSettings"),
  InputActionMapping_1 = require("./Maping/InputActionMapping"),
  InputAxisMapping_1 = require("./Maping/InputAxisMapping"),
  InputCombinationActionMapping_1 = require("./Maping/InputCombinationActionMapping"),
  InputCombinationAxisMapping_1 = require("./Maping/InputCombinationAxisMapping"),
  CHECK_COMBINATIONACTIONKEYMAP_SAVE_INTERVAL = 1e4;
class InputSettingsManager {
  static get DeviceLang() {
    return this.yza;
  }
  static set DeviceLang(t) {
    this.yza = t;
  }
  static Initialize() {
    (this.qEe = new InputActionMapping_1.InputActionMapping()),
      this.qEe.Initialize(),
      (this.GEe = new InputAxisMapping_1.InputAxisMapping()),
      this.GEe.Initialize(),
      (this.NEe =
        new InputCombinationActionMapping_1.InputCombinationActionMapping()),
      (this.OEe =
        new InputCombinationAxisMapping_1.InputCombinationAxisMapping()),
      this.RefreshAllActionKeys(),
      this.RefreshAllAxisKeys(),
      this.Z$a(),
      this.RefreshCombinationActionKeys(),
      this.RefreshCombinationAxisKeys(),
      this.ConvertInputActionSort(),
      this.sJa(),
      this.aJa();
  }
  static Clear() {
    this.Xkn(),
      this.$kn(),
      this.eXa(),
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
  static IsChatActionOrMapAction(t) {
    return (
      t === InputMappingsDefine_1.actionMappings.地图 ||
      t === InputMappingsDefine_1.actionMappings.聊天
    );
  }
  static tXa() {
    this.iXa.clear(), this.rXa.clear();
    for (const t of ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigList())
      StringUtils_1.StringUtils.IsBlank(t.FrenchKeyName) ||
        (this.iXa.set(t.KeyName, t.FrenchKeyName),
        this.rXa.set(t.FrenchKeyName, t.KeyName));
  }
  static Z$a() {
    var t;
    Platform_1.Platform.IsPcPlatform() &&
      ((this.yza = InputSettings_1.InputSettings.GetKeyboardPrimaryLangId()),
      this.tXa(),
      (t = (0, puerts_1.toManualReleaseDelegate)(InputSettingsManager.oXa)),
      UE.KuroStaticLibrary.BindDeviceLangChangeDelegate(t));
  }
  static eXa() {
    Platform_1.Platform.IsPcPlatform() &&
      (UE.KuroStaticLibrary.UnBindDeviceLangChangeDelegate(),
      (0, puerts_1.releaseManualReleaseDelegate)(InputSettingsManager.oXa));
  }
  static aXa(t, i) {
    if ("French" === t) {
      const n = this.iXa.get(i);
      return n ? n : i;
    }
    const n = this.rXa.get(i);
    return n || i;
  }
  static lXa(n) {
    for (const i of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      var t = i.ActionName,
        e = InputSettings_1.InputSettings.GetActionMappings(t);
      if (!(e.Num() <= 0)) {
        var a = [];
        let i = !1;
        for (let t = e.Num() - 1; 0 <= t; t--) {
          var s = e.Get(t).Key.KeyName.toString();
          InputSettings_1.InputSettings.GetKey(s)?.IsKeyboardKey
            ? ((i = !0), a.push(this.aXa(n, s)))
            : a.push(s);
        }
        i && InputSettingsManager.SetActionKeys(t, a);
      }
    }
  }
  static hXa(n) {
    for (const i of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      var t = i.AxisName,
        e = InputSettings_1.InputSettings.GetAxisMappings(t);
      if (!(e.Num() <= 0)) {
        var a = new Map();
        let i = !1;
        for (let t = e.Num() - 1; 0 <= t; t--) {
          var s = e.Get(t),
            o = s.Key.KeyName.toString(),
            s = s.Scale;
          InputSettings_1.InputSettings.GetKey(o)?.IsKeyboardKey
            ? ((i = !0), a.set(this.aXa(n, o), s))
            : a.set(o, s);
        }
        i && InputSettingsManager.SetAxisKeys(t, a);
      }
    }
  }
  static ChangeActionAndAxisPcKeys(t) {
    this.yza !== t &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InputSettings", 11, "识别到键盘设备切换", [
          "键盘设备语种",
          t,
        ]),
      ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.AllowChangeKeyReasonSet.add(
        "OnDeviceLangChange",
      ),
      (this.yza = t),
      this.lXa(t),
      this.hXa(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnDeviceLangChange,
      ),
      ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.AllowChangeKeyReasonSet.delete(
        "OnDeviceLangChange",
      ),
      Net_1.Net.IsServerConnected()) &&
      ControllerHolder_1.ControllerHolder.InputSettingsController?.InputSettingUpdateRequest();
  }
  static HandleGamepadMapActionAndChatAction(i, n) {
    var e = InputSettings_1.InputSettings.GetActionMappings(n);
    if (e && e.Num() <= 0) {
      let t = [];
      t = InputSettingsManager.CheckUseFrenchKeyboard
        ? i.FrancePcKeys
        : i.PcKeys;
      const r = i.GamepadKeys,
        g = t.concat(r);
      void InputSettingsManager.SetActionKeys(n, g);
    } else {
      var a = [];
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t).Key.KeyName.toString(),
          o = InputSettings_1.InputSettings.GetKey(s);
        o && !o.IsGamepadKey && a.push(s);
      }
      const r = i.GamepadKeys,
        g = a.concat(r);
      InputSettingsManager.SetActionKeys(n, g);
    }
  }
  static ResetDefaultInputKey() {
    this.ClearAllKeys(),
      this.RefreshAllActionKeys(!0),
      this.RefreshAllAxisKeys(!0),
      this.RefreshCombinationActionKeys(!0),
      this.RefreshCombinationAxisKeys();
  }
  static ClearAllKeys() {
    this.qEe?.ClearAllActionKeys(),
      this.GEe?.ClearAllAxisKeys(),
      this.ClearCombinationActionKeyMap(),
      this.gYa();
  }
  static RefreshAllActionKeys(t = !1) {
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      var i = e.ActionName;
      if (!t) {
        if (InputSettingsManager.IsChatActionOrMapAction(i)) {
          InputSettingsManager.HandleGamepadMapActionAndChatAction(e, i);
          continue;
        }
        var n = InputSettings_1.InputSettings.GetActionMappings(i);
        if (0 < n.Num()) {
          InputSettingsManager.RefreshActionKeys(i, n);
          continue;
        }
        n = this.GetActionBinding(i);
        if (n && !n.HasAnyKey()) {
          this.Gza(i, e);
          continue;
        }
      }
      this.Gza(i, e);
    }
  }
  static Gza(t, i) {
    let n = [];
    n = InputSettingsManager.CheckUseFrenchKeyboard ? i.FrancePcKeys : i.PcKeys;
    (i = i.GamepadKeys), (i = n.concat(i));
    InputSettingsManager.SetActionKeys(t, i);
  }
  static RefreshAllAxisKeys(t = !1) {
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      var i = e.AxisName;
      if (!t) {
        var n = InputSettings_1.InputSettings.GetAxisMappings(i);
        if (0 < n.Num()) {
          InputSettingsManager.RefreshAxisKeys(i, n);
          continue;
        }
        n = this.GetAxisBinding(i);
        if (n && !n.HasAnyKey()) {
          this.kza(i, e);
          continue;
        }
      }
      this.kza(i, e);
    }
  }
  static kza(t, i) {
    let n = new Map();
    n = InputSettingsManager.CheckUseFrenchKeyboard ? i.FrancePcKeys : i.PcKeys;
    var e,
      a,
      s,
      o,
      i = i.GamepadKeys,
      r = new Map();
    for ([e, a] of n) r.set(e, a);
    for ([s, o] of i) r.set(s, o);
    InputSettingsManager.SetAxisKeys(t, r);
  }
  static GetActionBinding(t) {
    return this.qEe.GetActionBinding(t);
  }
  static GetActionBindingMap() {
    return this.qEe.GetActionBindingMap();
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
  static GetAxisBindingMap() {
    return this.GEe.GetAxisBindingMap();
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
    if (
      (this.ClearCombinationActionKeyMap(),
      this.kEe.clear(),
      this.Ykn(),
      this.fYa(),
      !t)
    ) {
      t = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
        void 0,
      );
      if ((t && (this.kEe = t), this.kEe && 0 < this.kEe.size))
        for (var [i, n] of this.kEe)
          for (const s of n) {
            var e = this.FEe(i, s[0], s[1]),
              a =
                ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionName(
                  i,
                );
            a &&
              (e?.SetKeyboardVersion(a.KeyboardVersion),
              e?.SetGamepadVersion(a.GamepadVersion));
          }
    }
  }
  static fYa() {
    var t =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationActionConfig();
    if (t)
      for (const o of t) {
        var i,
          n,
          e,
          a,
          s = o.ActionName;
        for ([i, n] of o.PcKeys)
          this.AddCombinationActionKeyMap(s, i, n)?.SetKeyboardVersion(
            o.KeyboardVersion,
          );
        for ([e, a] of o.GamepadKeys)
          this.AddCombinationActionKeyMap(s, e, a)?.SetGamepadVersion(
            o.GamepadVersion,
          );
      }
  }
  static SetCombinationActionKeyboardKeys(t, i) {
    var n = this.GetCombinationActionBindingByActionName(t);
    if (n) {
      var e,
        a,
        s,
        o,
        r = new Map();
      n.GetPcKeyNameMap(r);
      for ([e, a] of r)
        InputSettingsManager.RemoveCombinationActionKeyMap(t, e, a);
      for ([s, o] of i)
        InputSettingsManager.AddCombinationActionKeyMap(t, s, o);
      return n;
    }
  }
  static SetCombinationActionGamepadKeys(t, i) {
    var n = this.GetCombinationActionBindingByActionName(t);
    if (n) {
      var e,
        a,
        s,
        o,
        r = new Map();
      n.GetGamepadKeyNameMap(r);
      for ([e, a] of r)
        InputSettingsManager.RemoveCombinationActionKeyMap(t, e, a);
      for ([s, o] of i)
        InputSettingsManager.AddCombinationActionKeyMap(t, s, o);
      return n;
    }
  }
  static ConvertInputActionSort() {
    var t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInputActionSort,
      !1,
    );
    if (!t && this.qEe) {
      for (const i of this.qEe?.GetActionBindingMap().values()) i.ConvertSort();
      InputSettings_1.InputSettings.SaveKeyMappings(),
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInputActionSort,
          !0,
        );
    }
  }
  static sJa() {
    LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInput,
      !1,
    ) ||
      (this.hJa(),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInput,
        !0,
      ));
  }
  static aJa() {
    LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsSavedKeyMappings,
      !1,
    ) ||
      (InputSettings_1.InputSettings.SaveKeyMappings(),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSavedKeyMappings,
        !0,
      ));
  }
  static hJa() {
    var t,
      i = this.GetActionBinding(InputMappingsDefine_1.actionMappings.幻象2);
    i &&
      i.HasKey("Gamepad_LeftTrigger") &&
      (t = this.GetCombinationActionBindingByActionName(
        InputMappingsDefine_1.actionMappings.幻象2,
      )) &&
      t.HasKey("Gamepad_LeftShoulder", "Gamepad_FaceButton_Left") &&
      (i.RemoveKeys(["Gamepad_LeftTrigger"]),
      (t = this.GetActionBinding(InputMappingsDefine_1.actionMappings.瞄准)) &&
        !t.HasKey("Gamepad_LeftTrigger") &&
        t.AddKeys(["Gamepad_LeftTrigger"]),
      (i = this.GetCombinationActionBindingByActionName(
        InputMappingsDefine_1.actionMappings.瞄准,
      ))) &&
      ((t = new Map()),
      i.GetGamepadKeyNameMap(t),
      "Gamepad_FaceButton_Left" === t.get("Gamepad_LeftShoulder")) &&
      i.RemoveKey("Gamepad_LeftShoulder");
  }
  static ClearCombinationActionKeyMap() {
    this.NEe?.Clear(), this.kEe.clear();
  }
  static AddCombinationActionKeyMap(t, i, n) {
    var e = this.FEe(t, i, n),
      a = this.kEe.get(t),
      s = [i, n];
    if (a) {
      for (var [o, r] of a) if (o === i && r === n) return e;
      a.push(s);
    } else this.kEe.set(t, [s]);
    return this.Ykn(), e;
  }
  static FEe(t, i, n) {
    var e = this.TryGetCombinationActionBinding(t);
    if (e)
      return (
        Log_1.Log.CheckInfo() &&
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
        this.PrintCurrentCombinationActionBinding(t),
        e
      );
  }
  static TryGetCombinationActionBinding(t) {
    let i = this.GetCombinationActionBindingByActionName(t);
    return (i = i || this.NEe.NewCombinationActionBinding(t, 0));
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
    this.Ykn(), this.PrintCurrentCombinationActionBinding(t);
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
  static PrintCurrentCombinationActionBinding(t, i = 0) {
    var n = new Map(),
      e = new Map(),
      a = new Map(),
      t = this.NEe?.GetCombinationActionBindingByActionName(t);
    t?.GetKeyMap(n), t?.GetPcKeyNameMap(e), t?.GetGamepadKeyNameMap(a);
  }
  static GetCombinationActionBindingByKeyName(t, i) {
    return this.NEe.GetCombinationActionBindingByKeyName(t, i);
  }
  static GetCombinationActionBindingByActionName(t) {
    return this.NEe.GetCombinationActionBindingByActionName(t);
  }
  static GetCombinationActionBindingMap() {
    return this.NEe.GetCombinationActionBindingMap();
  }
  static IsCombinationActionMainKey(t) {
    return this.NEe.IsMainKey(t);
  }
  static IsCombinationAction(t, i) {
    t = this.GetCombinationActionBindingByKeyName(t, i);
    return !(!t || t.size <= 0);
  }
  static RefreshCombinationAxisKeys() {
    var t =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig();
    if (t) for (const i of t) this.OEe?.NewCombinationAxisBinding(i);
  }
  static gYa() {
    this.OEe?.Clear();
  }
  static GetCombinationAxisBindingByKeyName(t, i) {
    return this.OEe.GetCombinationAxisBindingByKeyName(t, i);
  }
  static GetCombinationAxisBindingMapByMainKeyName(t) {
    return this.OEe.GetCombinationAxisBindingMapByMainKeyName(t);
  }
  static GetCombinationAxisBindingByAxisName(t) {
    return this.OEe.GetCombinationAxisBindingByAxisName(t);
  }
  static GetCombinationAxisBindingMap() {
    return this.OEe.GetCombinationAxisBindingMap();
  }
  static IsCombinationAxisMainKey(t) {
    return this.OEe.IsMainKey(t);
  }
  static IsCombinationAxis(t, i) {
    t = this.GetCombinationAxisBindingByKeyName(t, i);
    return !(!t || t.length <= 0);
  }
  static GetActionKeyDisplayData(t, i) {
    var n =
      Global_1.Global.CharacterController.GetCurrentPlatformCustomActionKeyNameList(
        i,
      );
    if (n) return t.RefreshInput(i, n), !0;
    n = InputSettingsManager.GetCombinationActionBindingByActionName(i);
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
    var n = InputSettingsManager.GetCombinationAxisBindingByAxisName(i);
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
  static Ykn() {
    (this.Jkn = !0), this.zkn();
  }
  static zkn() {
    this.Zkn() ||
      (this.eFn = TimerSystem_1.TimerSystem.Delay(() => {
        this.$kn() && this.Xkn();
      }, CHECK_COMBINATIONACTIONKEYMAP_SAVE_INTERVAL));
  }
  static Xkn() {
    void 0 !== this.eFn &&
      (TimerSystem_1.TimerSystem.Remove(this.eFn), (this.eFn = void 0));
  }
  static Zkn() {
    return void 0 !== this.eFn;
  }
  static $kn() {
    return !!this.Jkn && !(this.Jkn = !1);
  }
}
(exports.InputSettingsManager = InputSettingsManager),
  ((_a = InputSettingsManager).qEe = void 0),
  (InputSettingsManager.GEe = void 0),
  (InputSettingsManager.NEe = void 0),
  (InputSettingsManager.OEe = void 0),
  (InputSettingsManager.kEe = new Map()),
  (InputSettingsManager.Jkn = void 0),
  (InputSettingsManager.eFn = void 0),
  (InputSettingsManager.iXa = new Map()),
  (InputSettingsManager.rXa = new Map()),
  (InputSettingsManager.yza = ""),
  (InputSettingsManager.SkipGlobalSdkCheck = !1),
  (InputSettingsManager.oXa = () => {
    var t = InputSettings_1.InputSettings.GetKeyboardPrimaryLangId();
    _a.ChangeActionAndAxisPcKeys(t);
  });
//# sourceMappingURL=InputSettingsManager.js.map
