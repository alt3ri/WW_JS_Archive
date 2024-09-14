"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuModel = void 0);
const Application_1 = require("../../../Core/Application/Application"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  MenuData_1 = require("./MenuData"),
  MenuDefine_1 = require("./MenuDefine"),
  MenuTool_1 = require("./MenuTool");
class MenuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.XGa = new Map()),
      (this.YGa = new Map()),
      (this.ywi = void 0),
      (this.IsEdited = !1),
      (this.KeySettingInputControllerType = 0),
      (this.IsWaitForKeyInput = !1),
      (this.LowShake = 0),
      (this.MiddleShake = 0),
      (this.HighShake = 0),
      (this.CheckEditedMenuDataSaveTimerId = void 0),
      (this.SimulatedPlatform = -1),
      (this.IsCheckDeviceVendor = !0),
      (this.AllowResolutionList = void 0),
      (this.QualityInfoPercentage = 0),
      (this.IsOpenedImageOverloadConfirmBox = !1);
  }
  OnInit() {
    return this.Initialize(), !0;
  }
  OnClear() {
    return this.XGa.clear(), this.ywi?.clear(), !0;
  }
  Initialize() {
    this.Dwi();
  }
  ReInit() {
    this.XGa.clear(), this.ywi?.clear(), this.Initialize();
  }
  Dwi() {
    (this.LowShake =
      CommonParamById_1.configCommonParamById.GetIntConfig("LowShake") / 100),
      (this.MiddleShake =
        CommonParamById_1.configCommonParamById.GetIntConfig("MiddleShake") /
        100),
      (this.HighShake =
        CommonParamById_1.configCommonParamById.GetIntConfig("HighShake") /
        100),
      (this.AllowResolutionList =
        CommonParamById_1.configCommonParamById.GetIntArrayConfig(
          "AllowResolutionList",
        ));
  }
  CreateConfigByBaseConfig() {
    for (const a of ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuBaseConfig())
      if (MenuTool_1.MenuTool.CheckPlatform(a.Platform)) {
        var n = a.FunctionId;
        if (
          (!this.IsCheckDeviceVendor ||
            MenuTool_1.MenuTool.CheckDeviceVendor(n)) &&
          !MenuTool_1.MenuTool.CheckIosReviewShield(a.Id)
        ) {
          var t = a.MainType,
            i = MenuDefine_1.functionMenuDataMapping.get(n);
          let e = void 0;
          (e = new (i || MenuData_1.MenuData)()).Initialize(a);
          (i = this.YGa.get(n)),
            (i =
              (i && 0 < i.length ? i.push(e) : this.YGa.set(n, [e]),
              this.XGa.get(t)));
          i && 0 < i.length ? i.push(e) : this.XGa.set(t, [e]);
        }
      }
    for (const e of this.XGa.keys()) this.Rwi(e);
  }
  ClearMenuDataMap() {
    this.XGa.clear();
  }
  RefreshMenuDataEnable() {
    for (const t of this.XGa.values())
      for (const i of t) {
        var e = this.GetGameSettingsHandleEditValue(i.FunctionId);
        if (void 0 !== e && i.HasDisableFunction() && i.IsAffectedDisable(e))
          for (const a of i.DisableFunction) {
            var n = this.GetMenuDataByFunctionId(a);
            if (n) for (const r of n) r.SetEnable(!1);
          }
      }
  }
  GetGameSettingsHandleEditValue(e) {
    e = GameSettingsManager_1.GameSettingsManager.Get(e);
    if (e) return e.GetEditorValue();
  }
  Rwi(e) {
    var n = this.XGa.get(e);
    n &&
      0 !== n.length &&
      (n.sort((e, n) =>
        e.SubSort === n.SubSort
          ? e.FunctionSort - n.FunctionSort
          : e.SubSort - n.SubSort,
      ),
      this.XGa.set(e, n));
  }
  GetMainTypeList() {
    this.ywi = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainConfig();
    let n = new Array();
    for (var [t, i] of this.XGa) {
      let e = i.length;
      for (const a of i) a.CheckCondition() || e--;
      e <= 0 ||
        (void 0 === this.ywi?.get(t)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Menu",
              65,
              "未能获得主类型配置（MainType）",
              ["main type id", t],
              ["MainConfigs", this.ywi],
            )
          : n.push(t));
    }
    return (
      n.sort((e, n) => {
        (e = this.ywi.get(e)), (n = this.ywi.get(n));
        return e.MainSort - n.MainSort;
      }),
      (n = Application_1.Application.IsPublicationApp()
        ? n.filter((e) => 4 !== e)
        : n)
    );
  }
  GetTargetConfigData(e) {
    return this.XGa.get(e);
  }
  GetTargetMainInfo(e) {
    return this.ywi.get(e);
  }
  GetMenuDataByFunctionId(e) {
    return this.YGa.get(e);
  }
  IsInMenuDataByFunctionId(e) {
    return this.YGa.has(e);
  }
  GetQualitySettingScore() {
    let e = 0;
    e = Info_1.Info.IsPcOrGamepadPlatform()
      ? ((n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(6)),
        ((n =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(
            n,
          )).X *
          n.Y) /
          2073600)
      : ((n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(67)),
        MenuDefine_1.mobileResolutionScores[n]);
    var n = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate / 30,
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(54),
      i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(55),
      a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(56),
      r = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(58),
      s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(57),
      o = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(63),
      M = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(64),
      _ = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(65),
      u = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(87),
      g = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(127),
      f = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(132),
      h = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(79);
    return (
      (MenuDefine_1.qualityLevelScores[
        GameSettingsDeviceRender_1.GameSettingsDeviceRender
          .GameQualitySettingLevel
      ] +
        MenuDefine_1.shadowQualityScores[
          MathUtils_1.MathUtils.Clamp(
            t,
            0,
            MenuDefine_1.shadowQualityScores.length - 1,
          )
        ] +
        MenuDefine_1.niagaraQualityScores[
          MathUtils_1.MathUtils.Clamp(
            i,
            0,
            MenuDefine_1.niagaraQualityScores.length - 1,
          )
        ] +
        MenuDefine_1.imageDetailScores[
          MathUtils_1.MathUtils.Clamp(
            a,
            0,
            MenuDefine_1.imageDetailScores.length - 1,
          )
        ] +
        MenuDefine_1.sceneAoScores[
          MathUtils_1.MathUtils.Clamp(
            r,
            0,
            MenuDefine_1.sceneAoScores.length - 1,
          )
        ] +
        MenuDefine_1.antiAliasingScores[
          MathUtils_1.MathUtils.Clamp(
            s,
            0,
            MenuDefine_1.antiAliasingScores.length - 1,
          )
        ] +
        MenuDefine_1.volumeFogScores[
          MathUtils_1.MathUtils.Clamp(
            o,
            0,
            MenuDefine_1.volumeFogScores.length - 1,
          )
        ] +
        MenuDefine_1.volumeLightScores[
          MathUtils_1.MathUtils.Clamp(
            M,
            0,
            MenuDefine_1.volumeLightScores.length - 1,
          )
        ] +
        MenuDefine_1.motionBlurScores[
          MathUtils_1.MathUtils.Clamp(
            _,
            0,
            MenuDefine_1.motionBlurScores.length - 1,
          )
        ] +
        MenuDefine_1.amdFsrScores[
          MathUtils_1.MathUtils.Clamp(
            u,
            0,
            MenuDefine_1.amdFsrScores.length - 1,
          )
        ] +
        MenuDefine_1.metalFxScores[
          MathUtils_1.MathUtils.Clamp(
            g,
            0,
            MenuDefine_1.metalFxScores.length - 1,
          )
        ] +
        MenuDefine_1.bloomScores[
          MathUtils_1.MathUtils.Clamp(f, 0, MenuDefine_1.bloomScores.length - 1)
        ] +
        MenuDefine_1.npcDensityScores[
          MathUtils_1.MathUtils.Clamp(
            h,
            0,
            MenuDefine_1.npcDensityScores.length - 1,
          )
        ]) *
      e *
      n
    );
  }
  GetGameQualityLoadInfo() {
    var e = this.GetQualitySettingScore(),
      n =
        (100 * e) /
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore;
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          41,
          "图像配置负载信息",
          ["SettingScore", e],
          [
            "DeviceScore",
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.DeviceScore,
          ],
          ["LoadPercentage", n],
        ),
      80 < (n = MathUtils_1.MathUtils.Clamp(n, 0, 100))
        ? {
            Desc: MenuDefine_1.SEETING_LOAD_OVER,
            Percentage: n,
            BarColor: MenuDefine_1.SEETING_LOAD_OVER_COLOR,
          }
        : 60 < n
          ? {
              Desc: MenuDefine_1.SEETING_LOAD_LAGGY,
              Percentage: n,
              BarColor: MenuDefine_1.SEETING_LOAD_LAGGY_COLOR,
            }
          : {
              Desc: MenuDefine_1.SEETING_LOAD_FLUID,
              Percentage: n,
              BarColor: MenuDefine_1.SEETING_LOAD_FLUID_COLOR,
            }
    );
  }
}
exports.MenuModel = MenuModel;
//# sourceMappingURL=MenuModel.js.map
