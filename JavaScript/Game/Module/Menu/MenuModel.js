"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuModel = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const MenuData_1 = require("./MenuData");
const MenuTool_1 = require("./MenuTool");
class MenuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Sxi = new Map()),
      (this.Exi = void 0),
      (this.yxi = void 0),
      (this.Ixi = void 0),
      (this.IsEdited = !1),
      (this.KeySettingInputControllerType = 0),
      (this.IsWaitForKeyInput = !1),
      (this.LowShake = 0),
      (this.MiddleShake = 0),
      (this.HighShake = 0),
      (this.SimulatedPlatform = -1),
      (this.IsCheckDeviceVendor = !0);
  }
  OnInit() {
    return this.Initialize(), !0;
  }
  OnClear() {
    return (
      this.Sxi.clear(),
      this.Exi?.clear(),
      this.yxi?.clear(),
      this.Ixi?.clear(),
      !0
    );
  }
  Initialize() {
    this.Txi(),
      this.CreateConfigByLocalConfig(),
      this.Lxi(),
      this.Dxi(),
      this.AOn();
  }
  ReInit() {
    this.Sxi.clear(),
      this.Exi?.clear(),
      this.yxi?.clear(),
      this.Ixi?.clear(),
      this.Initialize();
  }
  Lxi() {
    let e;
    let t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PlayMenuInfo,
      "",
    );
    !StringUtils_1.StringUtils.IsEmpty(t) ||
    GlobalData_1.GlobalData.IsPlayInEditor ||
    MenuTool_1.MenuTool.IsExcludeLanguageSetting(4)
      ? ((t = this.GetTargetConfig(51)),
        (LanguageSystem_1.LanguageSystem.PackageLanguage =
          MenuTool_1.MenuTool.GetLanguageCodeById(t)),
        (t = this.GetTargetConfig(52)),
        (t = MenuTool_1.MenuTool.GetAudioCodeById(t)) &&
          LanguageSystem_1.LanguageSystem.SetPackageAudio(
            t,
            GlobalData_1.GlobalData.World,
          ))
      : (LanguageSystem_1.LanguageSystem.FirstTimeSetLanguage(
          GlobalData_1.GlobalData.World,
        ),
        (t = MenuTool_1.MenuTool.GetLanguageIdByCode(
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        )),
        (e = MenuTool_1.MenuTool.GetSpeechTypeByLanguageType(t)),
        this.SetTargetConfig(51, t),
        this.SetTargetConfig(52, e),
        this.SaveLocalConfig(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Menu",
            8,
            "[InitLanguage]初始化语言数据",
            ["languageType", t],
            ["speechType", e],
          ));
  }
  Dxi() {
    (this.LowShake =
      CommonParamById_1.configCommonParamById.GetIntConfig("LowShake") / 100),
      (this.MiddleShake =
        CommonParamById_1.configCommonParamById.GetIntConfig("MiddleShake") /
        100),
      (this.HighShake =
        CommonParamById_1.configCommonParamById.GetIntConfig("HighShake") /
        100);
  }
  Txi() {
    let e, t, i;
    for (const o of ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuBaseConfig())
      !MenuTool_1.MenuTool.CheckPlatform(o.Platform) ||
        (this.IsCheckDeviceVendor &&
          !MenuTool_1.MenuTool.CheckDeviceVendor(o.FunctionId)) ||
        this.CheckIosReviewShield(o) ||
        ((e = o.MainType),
        (t = new MenuData_1.MenuData(o)),
        (i = this.Sxi.get(e)) && i.length > 0
          ? (i.push(t), this.Sxi.set(e, i))
          : this.Sxi.set(e, [t]));
    for (const a of this.Sxi.keys()) this.Rxi(a);
  }
  CreateConfigByLocalConfig() {
    let e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PlayMenuInfo,
      "",
    );
    StringUtils_1.StringUtils.IsEmpty(e) && (e = void 0),
      (this.Exi = new Map()),
      StringUtils_1.StringUtils.IsEmpty(e) ||
        (this.Exi = PublicUtil_1.PublicUtil.ObjToMap(JSON.parse(e))),
      this.Uxi(),
      MenuTool_1.ImageConfigTool.ResetImageConfig(this.Exi);
  }
  Uxi() {
    for (const e of this.Sxi.values())
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
        this.Exi.has(t.MenuDataFunctionId) ||
          this.Exi.set(t.MenuDataFunctionId, e);
      }
  }
  AOn() {
    for (const i of this.Sxi.values())
      for (const o of i) {
        const e = this.GetTargetConfig(o.MenuDataFunctionId);
        if (void 0 !== e && o.HasDisableFunction() && o.IsAffectedDisable(e))
          for (const a of o.DisableFunction) {
            const t = this.GetTargetMenuData(a);
            t && (t.IsEnable = !1);
          }
      }
  }
  SetTargetConfig(e, t) {
    this.Exi.set(e, t);
  }
  GetTargetConfig(e) {
    return this.Exi.get(e);
  }
  SaveLocalConfig() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Menu", 8, "保存数据!");
    const e = JSON.stringify(PublicUtil_1.PublicUtil.MapToObj(this.Exi));
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PlayMenuInfo,
      e,
    );
  }
  Rxi(e) {
    const t = this.Sxi.get(e);
    t &&
      t.length !== 0 &&
      (t.sort((e, t) =>
        e.MenuDataSubSort === t.MenuDataSubSort
          ? e.MenuDataFunctionSort - t.MenuDataFunctionSort
          : e.MenuDataSubSort - t.MenuDataSubSort,
      ),
      this.Sxi.set(e, t));
  }
  GetMainTypeList() {
    let t = new Array();
    for (const [i, o] of this.Sxi) {
      let e = o.length;
      for (const a of o) a.CheckCondition() || e--;
      e <= 0 || t.push(i);
    }
    return (
      (this.yxi = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainConfig()),
      t.sort((e, t) => {
        (e = this.yxi.get(e)), (t = this.yxi.get(t));
        return e.MainSort - t.MainSort;
      }),
      (t = MenuTool_1.MenuTool.IsExcludeLanguageSetting(4)
        ? t.filter((e) => e !== 4)
        : t)
    );
  }
  GetTargetConfigData(e) {
    return this.Sxi.get(e);
  }
  GetTargetMainInfo(e) {
    return this.yxi.get(e);
  }
  SetRestartMap(e, t) {
    this.Ixi || (this.Ixi = new Map());
    let i = this.Ixi.get(e);
    i
      ? ((i = [i[0], t]), this.Ixi.set(e, i))
      : ((i = this.GetTargetConfig(e)), this.Ixi.set(e, [i, t]));
  }
  CheckRestartValueChange(e, t) {
    return !this.Ixi || !(e = this.Ixi.get(e)) || e[1] !== t;
  }
  CheckRestartMap() {
    if (this.Ixi)
      for (const e of this.Ixi.values()) if (e[0] !== e[1]) return !0;
    return !1;
  }
  ClearRestartMap() {
    this.Ixi.clear();
  }
  GetTargetMenuData(e) {
    let t =
      ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuConfigByFunctionId(e);
    if (t) {
      (t = t.MainType), (t = this.Sxi.get(t));
      if (t) for (const i of t) if (i.MenuDataFunctionId === e) return i;
    }
  }
  GetMenuDataKeys() {
    if (this.Exi && this.Exi.size > 0) return this.Exi.keys();
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
// # sourceMappingURL=MenuModel.js.map
