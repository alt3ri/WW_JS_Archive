"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionItemViewTool = exports.MenuTool = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class MenuTool {
  static CheckPlatform(e) {
    var r = ModelManager_1.ModelManager.MenuModel?.SimulatedPlatform;
    if (-1 !== r && void 0 !== r)
      switch (e) {
        case 1:
          return 1 === r;
        case 2:
          return 2 === r || 4 === r || 3 === r;
        case 3:
          return 2 === r || 3 === r;
        case 4:
          return 2 === r || 4 === r;
        case 5:
          return 5 === r;
        default:
          return !0;
      }
    switch (e) {
      case 1:
        return Info_1.Info.IsPcOrGamepadPlatform();
      case 2:
        return Info_1.Info.IsMobilePlatform();
      case 3:
        return 2 === Info_1.Info.PlatformType;
      case 4:
        return 1 === Info_1.Info.PlatformType;
      case 5:
        return Info_1.Info.IsPs5Platform();
      default:
        return !0;
    }
  }
  static CheckDeviceVendor(e) {
    var r =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlssGpuDevice(),
      t = UE.XeSSBlueprintLibrary.IsXeSSSupported(),
      n = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFsrDevice(),
      a = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsPWSDKDevice();
    switch (e) {
      case 81:
        return r;
      case 82:
        return !1;
      case 83:
      case 84:
      case 85:
        return r;
      case 87:
        return n;
      case 128:
        return a;
      case 127:
        return GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice();
      case 125:
      case 126:
        return t;
      case 58:
        return (
          !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformScreenBad() &&
          1 !== Info_1.Info.PlatformType
        );
      default:
        return !0;
    }
  }
  static CheckIosReviewShield(e) {
    return !(
      !ConfigManager_1.ConfigManager.CommonConfig.GetIosReviewShieldMenuArray()?.includes(
        e,
      ) ||
      !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()
    );
  }
  static GetLanguageDefineData() {
    return LanguageSystem_1.LanguageSystem.GetAllLanguageDefines();
  }
  static GetAudioCodeById(e) {
    var r = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    return r
      ? r.AudioCode
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Menu", 31, "LanguageSystem 未定义此语种", [
            "非法值",
            e,
          ]),
        CommonDefine_1.ENGLISH_ISO639_1);
  }
  static GetLanguageCodeById(e) {
    var r = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
    return r
      ? r.LanguageCode
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Menu", 11, "LanguageSystem 未定义此语种", [
            "非法值",
            e,
          ]),
        CommonDefine_1.ENGLISH_ISO639_1);
  }
  static GetLanguageIdByCode(e) {
    var r = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(e);
    return r
      ? r.LanguageType
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Menu", 11, "LanguageSystem 未定义此语种", [
            "非法值",
            e,
          ]),
        this.GetLanguageIdByCode(CommonDefine_1.ENGLISH_ISO639_1));
  }
  static GetSpeechTypeByLanguageType(e) {
    return LanguageSystem_1.LanguageSystem.GetSpeechTypeByLanguageType(e);
  }
}
exports.MenuTool = MenuTool;
class FunctionItemViewTool {
  static GetSliderPosition(e, r, t = 0) {
    var n = e[0],
      e = e[1],
      n = MathUtils_1.MathUtils.GetRangePct(n, e, r);
    return MathUtils_1.MathUtils.GetFloatPointFloor(n * e, t);
  }
  static CheckNotice(e) {
    return 0 < e.OptionsValueList?.length || 0 < e.RelationFuncIds.length;
  }
}
exports.FunctionItemViewTool = FunctionItemViewTool;
//# sourceMappingURL=MenuTool.js.map
