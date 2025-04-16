"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class PlatformController extends ControllerBase_1.ControllerBase {
  static Init() {
    return this.ControlScreenSaver(!1), this._Ea(), this.oXi(), this.OnInit();
  }
  static OnClear() {
    return this.rXi(), !0;
  }
  static oXi() {
    InputDistributeController_1.InputDistributeController.BindAxis(
      InputMappingsDefine_1.axisMappings.MouseMove,
      this.nXi,
    );
  }
  static rXi() {
    InputDistributeController_1.InputDistributeController.UnBindAxis(
      InputMappingsDefine_1.axisMappings.MouseMove,
      this.nXi,
    );
  }
  static _Ea() {
    Info_1.Info.IsPcPlatform() ||
      ModelManager_1.ModelManager.PlatformModel?.RefreshPlatformByDevice(
        "InitDeviceInfo",
      );
  }
  static ControlScreenSaver(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Platform", 27, "控制屏幕", ["state", e]),
      UE.KismetSystemLibrary.ControlScreensaver(e);
  }
  static SendClientBasicInfo() {
    var e = new Protocol_1.Aki.Protocol.fYn(),
      r = PlatformController.PackageClientBasicInfo();
    (e.Z9n = r),
      Net_1.Net.Call(18408, e, () => {}),
      r &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Platform",
          27,
          "客户端上报一些设备基础信息",
          ["CPU", r.rHn],
          ["DeviceId", r.oHn],
          ["Model", r.nHn],
          ["NetStatus", r.sHn],
          ["Platform", r.f7n],
        );
  }
  static PackageClientBasicInfo() {
    var e = new Protocol_1.Aki.Protocol.Z9n(),
      r =
        ((e.sHn = ModelManager_1.ModelManager.PlatformModel.GetNetStatus()),
        (e.f7n = cpp_1.KuroApplication.IniPlatformName()),
        ModelManager_1.ModelManager.KuroSdkModel.GetBasicInfo()),
      r =
        ((e.rHn = r?.CPUModelName ?? ""),
        (e.oHn = r?.DeviceId ?? ""),
        (e.nHn = r?.ModelName ?? ""),
        (e.aHn = UE.ThinkingAnalytics.GetDeviceId()),
        (e.r9n = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        ).LanguageType),
        (e.kll =
          ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId() ??
          ""),
        CloudGameManager_1.CloudGameManager.IsCloudGame &&
          (e.Yu_ =
            CloudGameManagerLauncher_1.CloudGameManagerLauncher.ServerTag),
        UE.KuroStaticLibrary.GetMacAddress());
    return StringUtils_1.StringUtils.IsEmpty(r) || (e.hHn = r), e;
  }
}
(exports.PlatformController = PlatformController).nXi = (e, r) => {
  0 === r ||
    Info_1.Info.IsInKeyBoard() ||
    CloudGameManager_1.CloudGameManager.IsCloudGame ||
    Info_1.Info.SwitchInputControllerType(1, "MouseAxisInput");
};
//# sourceMappingURL=PlatformController.js.map
