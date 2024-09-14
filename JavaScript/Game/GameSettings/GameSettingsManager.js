"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsManager = void 0);
const UE = require("ue"),
  Application_1 = require("../../Core/Application/Application"),
  Info_1 = require("../../Core/Common/Info"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../Common/PublicUtil"),
  GlobalData_1 = require("../GlobalData"),
  MenuTool_1 = require("../Module/Menu/MenuTool"),
  GameSettingsDefine_1 = require("./GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("./GameSettingsDeviceRender"),
  GameSettingsHandle_1 = require("./GameSettingsHandle");
class GameSettingsManager {
  static Initialize() {
    this.kGa(), this.NGa(), this.RefreshFullScreenMode();
  }
  static Clear() {
    this.SaveAll(), this.FGa.clear();
  }
  static kGa() {
    for (const a of GameSettingsDefine_1.gameSettingsRegisterList) {
      let e = void 0;
      var t = a.GameSettingId,
        i = a.GameSettingHandleClass;
      (e = new (i || GameSettingsHandle_1.GameSettingsHandle)(a)).Load(),
        this.FGa.set(t, e);
    }
  }
  static SetApplySave(e, t) {
    e = this.Get(e);
    return !!e && (e.Set(t), !!e.Apply()) && e.Save();
  }
  static InitSetApplySave(e, t) {
    e = this.Get(e);
    if (!e) return !1;
    if (e.IsInitializeApplied) return !1;
    let i = t;
    return (
      void 0 !== e.GetDefaultValueCallback && (i = e.GetDefaultValueCallback()),
      e.Set(i),
      !!e.InitializeApply() && e.Save()
    );
  }
  static InitSetSave(e, t) {
    e = this.Get(e);
    if (!e) return !1;
    if (e.IsInitializeApplied) return !1;
    let i = t;
    return (
      void 0 !== e.GetDefaultValueCallback && (i = e.GetDefaultValueCallback()),
      e.Set(i),
      !!e.Save() && (e.IsInitializeApplied = !0)
    );
  }
  static Set(e, t, i = !1) {
    e = this.Get(e);
    return !!e && (e.Set(t, i), !0);
  }
  static Save(e) {
    e = this.Get(e);
    return !!e && e.Save();
  }
  static SaveAll() {
    for (const e of this.FGa.values()) e.Save();
  }
  static Apply(e) {
    e = this.Get(e);
    return !!e && e.Apply();
  }
  static RefreshCurrentValue(e) {
    e = this.Get(e);
    e && e.RefreshCurrentValue();
  }
  static ReApply(e) {
    e = this.Get(e);
    return !!e && e.ReApply();
  }
  static Get(e) {
    return this.FGa.get(e);
  }
  static GetCurrentValue(e) {
    var t = this.FGa.get(e);
    return t
      ? t.GetCurrentValue()
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameSettings",
            8,
            "获得对应设置项的当前值时，设置项找不到",
            ["gameSettingId", e],
          ),
        0);
  }
  static GetEditValue(e) {
    var t = this.FGa.get(e);
    return t
      ? t.GetEditorValue()
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameSettings",
            8,
            "获得对应设置项的编辑值时，设置项找不到",
            ["gameSettingId", e],
          ),
        0);
  }
  static GetGameSettingsHandleMap() {
    return this.FGa;
  }
  static NGa() {
    var e,
      t,
      i = this.Get(51),
      a = this.Get(52);
    i &&
      a &&
      (GlobalData_1.GlobalData.IsPlayInEditor ||
      Application_1.Application.IsPublicationApp()
        ? ((e = i.GetCurrentValue()),
          (LanguageSystem_1.LanguageSystem.PackageLanguage =
            MenuTool_1.MenuTool.GetLanguageCodeById(e)),
          (e = a.GetCurrentValue()),
          (e = MenuTool_1.MenuTool.GetAudioCodeById(e)) &&
            LanguageSystem_1.LanguageSystem.SetPackageAudio(
              e,
              GlobalData_1.GlobalData.World,
            ))
        : (LanguageSystem_1.LanguageSystem.FirstTimeSetLanguage(
            GlobalData_1.GlobalData.World,
          ),
          (e = MenuTool_1.MenuTool.GetLanguageIdByCode(
            LanguageSystem_1.LanguageSystem.PackageLanguage,
          )),
          (t = MenuTool_1.MenuTool.GetSpeechTypeByLanguageType(e)),
          i.Set(e),
          a.Set(t),
          i.Save(),
          a.Save(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Menu",
              8,
              "[InitLanguage]初始化语言数据",
              ["languageType", e],
              ["speechType", t],
            )));
  }
  static RefreshFullScreenMode() {
    var e = UE.GameUserSettings.GetGameUserSettings().GetFullscreenMode(),
      t = this.Get(6);
    let i = GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX;
    if (
      (t && t.HasLocalStorageValue && (i = t.GetCurrentValue()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          8,
          "刷新当前全屏模式",
          ["fullscreenMode", e],
          ["resolutionValue", i],
        ),
      0 <= UE.KismetSystemLibrary.GetCommandLine().search("-windowed"))
    )
      (t =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
          GameSettingsDefine_1.WINDOWS_RESOLUTION_INDEX,
        )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Menu",
            8,
            "刷新当前全屏模式-使用-windowed参数启动，将全屏模式设为窗口，并且设置分辨率",
            ["fullscreenMode", e],
            ["resolution", t],
          ),
        this.jZa(i);
    else
      switch (e) {
        case 0:
        case 1:
          this.Set(5, 0), this.Apply(5);
          break;
        case 2:
          this.jZa(i);
      }
  }
  static jZa(e) {
    this.Set(5, 1, !0), this.Set(6, e), this.Apply(5), this.Apply(6);
  }
  static ConvertLocalMenuData() {
    var t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertOldMenuData,
      !1,
    );
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          8,
          "[ViewSensitivity]打印是否转化旧的设置本地保存",
          ["IsConvertOldMenuData", t],
        ),
      !t)
    ) {
      let e = void 0;
      if (
        !(e = LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData,
        ))
      ) {
        t = LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.PlayMenuInfo,
        );
        if (
          !(e = StringUtils_1.StringUtils.IsEmpty(t)
            ? e
            : PublicUtil_1.PublicUtil.ObjToMap(JSON.parse(t)))
        )
          return;
      }
      this.Ska(e, 93),
        this.Ska(e, 98),
        this.Ska(e, 11),
        this.Ska(e, 1),
        this.Ska(e, 2),
        this.Ska(e, 3),
        this.Ska(e, 4),
        this.Ska(e, 69),
        this.Ska(e, 70),
        this.Ska(e, 6),
        this.Ska(e, 51),
        this.Ska(e, 52),
        this.Ska(e, 59),
        this.Ska(e, 88),
        this.Ska(e, 56),
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertOldMenuData,
          !0,
        );
    }
  }
  static Ska(e, t) {
    e = e.get(t);
    e && this.SetApplySave(t, e);
  }
  static ConvertViewSensitivity() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertAllViewSensitivity,
      !1,
    );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Menu", 8, "[ViewSensitivity]打印是否转化了灵敏度", [
        "isConvertViewSensitivity",
        e,
      ]),
      e ||
        (Info_1.Info.IsPcPlatform() &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Menu", 8, " [ViewSensitivity]转化Pc视角灵敏度"),
          this.Rxa(89),
          this.Rxa(90),
          this.Rxa(91),
          this.Rxa(92)),
        Info_1.Info.IsMobilePlatform() &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Menu", 8, "[ViewSensitivity]转化Mobile视角灵敏度"),
          this.Rxa(94),
          this.Rxa(95),
          this.Rxa(96),
          this.Rxa(97)),
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .IsConvertAllViewSensitivity,
          !0,
        ));
  }
  static Rxa(e) {
    var t,
      i,
      a = this.Get(e);
    a &&
      void 0 !== (t = a.GetCurrentValue()) &&
      t < 50 &&
      ((i = Math.floor(22.22 + 0.555 * t)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          8,
          "[ViewSensitivity]转化视角灵敏度",
          ["functionId", e],
          ["value", t],
          ["newValue", i],
        ),
      a.Set(i),
      a.Apply(),
      a.Save());
  }
}
((exports.GameSettingsManager = GameSettingsManager).FGa = new Map()),
  (GameSettingsManager.IsGameSettingsAppliedOnOpenLoading = !1);
//# sourceMappingURL=GameSettingsManager.js.map
