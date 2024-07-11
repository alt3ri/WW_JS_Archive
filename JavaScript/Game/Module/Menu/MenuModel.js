"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  MenuController_1 = require("./MenuController"),
  MenuData_1 = require("./MenuData"),
  MenuDefine_1 = require("./MenuDefine"),
  MenuTool_1 = require("./MenuTool");
class MenuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Ewi = new Map()),
      (this.Swi = void 0),
      (this.ywi = void 0),
      (this.Iwi = void 0),
      (this.IsEdited = !1),
      (this.KeySettingInputControllerType = 0),
      (this.IsWaitForKeyInput = !1),
      (this.LowShake = 0),
      (this.MiddleShake = 0),
      (this.HighShake = 0),
      (this.CheckEditedMenuDataSaveTimerId = void 0),
      (this.SimulatedPlatform = -1),
      (this.IsCheckDeviceVendor = !0);
  }
  OnInit() {
    return this.Initialize(), !0;
  }
  OnClear() {
    return (
      this.Ewi.clear(),
      this.Swi?.clear(),
      this.ywi?.clear(),
      this.Iwi?.clear(),
      !0
    );
  }
  Initialize() {
    this.Twi(),
      this.CreateConfigByLocalConfig(),
      this.Lwi(),
      this.Dwi(),
      this._fa(),
      this.OIa();
  }
  ReInit() {
    this.Ewi.clear(),
      this.Swi?.clear(),
      this.ywi?.clear(),
      this.Iwi?.clear(),
      this.Initialize();
  }
  Lwi() {
    var e, t;
    void 0 !==
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData,
      ) ||
    GlobalData_1.GlobalData.IsPlayInEditor ||
    MenuTool_1.MenuTool.IsExcludeLanguageSetting(4)
      ? ((e = this.GetTargetConfig(51)),
        (LanguageSystem_1.LanguageSystem.PackageLanguage =
          MenuTool_1.MenuTool.GetLanguageCodeById(e)),
        (e = this.GetTargetConfig(52)),
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
        this.SetTargetConfig(51, e),
        this.SetTargetConfig(52, t),
        this.SaveLocalConfig(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Menu",
            8,
            "[InitLanguage]初始化语言数据",
            ["languageType", e],
            ["speechType", t],
          ));
  }
  Dwi() {
    (this.LowShake =
      CommonParamById_1.configCommonParamById.GetIntConfig("LowShake") / 100),
      (this.MiddleShake =
        CommonParamById_1.configCommonParamById.GetIntConfig("MiddleShake") /
        100),
      (this.HighShake =
        CommonParamById_1.configCommonParamById.GetIntConfig("HighShake") /
        100);
  }
  Twi() {
    var e, t, i;
    for (const o of ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuBaseConfig())
      !MenuTool_1.MenuTool.CheckPlatform(o.Platform) ||
        (this.IsCheckDeviceVendor &&
          !MenuTool_1.MenuTool.CheckDeviceVendor(o.FunctionId)) ||
        this.CheckIosReviewShield(o) ||
        ((e = o.MainType),
        (t = new MenuData_1.MenuData(o)),
        (i = this.Ewi.get(e)) && 0 < i.length
          ? (i.push(t), this.Ewi.set(e, i))
          : this.Ewi.set(e, [t]));
    for (const a of this.Ewi.keys()) this.Rwi(a);
  }
  CreateConfigByLocalConfig() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData,
    );
    (this.Swi = e ?? new Map()),
      this.Uwi(),
      MenuTool_1.ImageConfigTool.ResetImageConfig(this.Swi);
  }
  Uwi() {
    for (const e of this.Ewi.values())
      for (const t of e) {
        let e = 0;
        switch (t.MenuDataSetType) {
          case 1:
            e = t.MenuDataSliderDefault;
            break;
          case 2:
          case 4:
            e = t.MenuDataOptionsDefault;
        }
        this.Swi.has(t.MenuDataFunctionId) ||
          this.IsGameQualityTarget(t.MenuDataFunctionId) ||
          this.Swi.set(t.MenuDataFunctionId, e);
      }
  }
  IsGameQualityTarget(e) {
    return void 0 !== this.FunctionIdToGameQualityKey(e);
  }
  _fa() {
    for (const i of this.Ewi.values())
      for (const o of i) {
        var e = this.GetTargetConfig(o.MenuDataFunctionId);
        if (void 0 !== e && o.HasDisableFunction() && o.IsAffectedDisable(e))
          for (const a of o.DisableFunction) {
            var t = this.GetTargetMenuData(a);
            t && (t.IsEnable = !1);
          }
      }
  }
  OIa() {
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
          this.kIa(89),
          this.kIa(90),
          this.kIa(91),
          this.kIa(92)),
        Info_1.Info.IsMobilePlatform() &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Menu", 8, "[ViewSensitivity]转化Mobile视角灵敏度"),
          this.kIa(94),
          this.kIa(95),
          this.kIa(96),
          this.kIa(97)),
        this.SaveLocalConfig(),
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .IsConvertAllViewSensitivity,
          !0,
        ));
  }
  kIa(e) {
    var t,
      i = this.GetTargetConfig(e);
    void 0 !== i &&
      i < 50 &&
      ((t = Math.floor(22.22 + 0.555 * i)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Menu",
          8,
          "[ViewSensitivity]转化视角灵敏度",
          ["functionId", e],
          ["value", i],
          ["newValue", t],
        ),
      MenuController_1.MenuController.ApplyTargetConfig(e, t));
  }
  FunctionIdToGameQualityKey(e) {
    return MenuDefine_1.functionIdToGameQualityKeyMap.get(e);
  }
  SetTargetConfig(e, t) {
    this.Swi.set(e, t);
  }
  GetTargetConfig(e) {
    return this.Swi.get(e);
  }
  SaveLocalConfig() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Menu", 8, "保存数据!"),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData,
        this.Swi,
      );
  }
  Rwi(e) {
    var t = this.Ewi.get(e);
    t &&
      0 !== t.length &&
      (t.sort((e, t) =>
        e.MenuDataSubSort === t.MenuDataSubSort
          ? e.MenuDataFunctionSort - t.MenuDataFunctionSort
          : e.MenuDataSubSort - t.MenuDataSubSort,
      ),
      this.Ewi.set(e, t));
  }
  GetMainTypeList() {
    let t = new Array();
    for (var [i, o] of this.Ewi) {
      let e = o.length;
      for (const a of o) a.CheckCondition() || e--;
      e <= 0 || t.push(i);
    }
    return (
      (this.ywi = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainConfig()),
      t.sort((e, t) => {
        (e = this.ywi.get(e)), (t = this.ywi.get(t));
        return e.MainSort - t.MainSort;
      }),
      (t = MenuTool_1.MenuTool.IsExcludeLanguageSetting(4)
        ? t.filter((e) => 4 !== e)
        : t)
    );
  }
  GetTargetConfigData(e) {
    return this.Ewi.get(e);
  }
  GetTargetMainInfo(e) {
    return this.ywi.get(e);
  }
  SetRestartMap(e, t) {
    this.Iwi || (this.Iwi = new Map());
    var i = this.Iwi.get(e);
    i
      ? ((i = [i[0], t]), this.Iwi.set(e, i))
      : ((i = this.GetTargetConfig(e)), this.Iwi.set(e, [i, t]));
  }
  CheckRestartValueChange(e, t) {
    return !this.Iwi || !(e = this.Iwi.get(e)) || e[1] !== t;
  }
  CheckRestartMap() {
    if (this.Iwi)
      for (const e of this.Iwi.values()) if (e[0] !== e[1]) return !0;
    return !1;
  }
  ClearRestartMap() {
    this.Iwi.clear();
  }
  GetTargetMenuData(e) {
    var t =
      ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuConfigByFunctionId(e);
    if (t) {
      (t = t.MainType), (t = this.Ewi.get(t));
      if (t) for (const i of t) if (i.MenuDataFunctionId === e) return i;
    }
  }
  GetMenuDataKeys() {
    if (this.Swi && 0 < this.Swi.size) return this.Swi.keys();
  }
  CheckIosReviewShield(e) {
    return !(
      !ConfigManager_1.ConfigManager.CommonConfig.GetIosReviewShieldMenuArray()?.includes(
        e.Id,
      ) ||
      !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()
    );
  }
}
exports.MenuModel = MenuModel;
//# sourceMappingURL=MenuModel.js.map
