"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class PlatformController extends ControllerBase_1.ControllerBase {
  static Init() {
    return this.ControlScreenSaver(!1), this.Bfa(), this.oXi(), this.OnInit();
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
  static Bfa() {
    Info_1.Info.IsPcPlatform() ||
      ModelManager_1.ModelManager.PlatformModel?.RefreshPlatformByDevice(
        "InitDeviceInfo",
      );
  }
  static ControlScreenSaver(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Platform", 28, "控制屏幕", ["state", e]),
      UE.KismetSystemLibrary.ControlScreensaver(e);
  }
  static SendClientBasicInfo() {
    var e = new Protocol_1.Aki.Protocol._Yn(),
      t = PlatformController.PackageClientBasicInfo();
    (e.j9n = t),
      Net_1.Net.Call(8083, e, () => {}),
      t &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Platform",
          8,
          "客户端上报一些设备基础信息",
          ["CPU", t.X7n],
          ["DeviceId", t.$7n],
          ["Model", t.Y7n],
          ["NetStatus", t.J7n],
          ["Platform", t.h7n],
        );
  }
  static PackageClientBasicInfo() {
    var e = new Protocol_1.Aki.Protocol.j9n(),
      t =
        ((e.J7n = ModelManager_1.ModelManager.PlatformModel.GetNetStatus()),
        (e.h7n = ModelManager_1.ModelManager.PlatformModel.GetPlatformName()),
        ModelManager_1.ModelManager.KuroSdkModel.GetBasicInfo()),
      t =
        ((e.X7n = t?.CPUModelName ?? ""),
        (e.$7n = t?.DeviceId ?? ""),
        (e.Y7n = t?.ModelName ?? ""),
        (e.z7n = UE.ThinkingAnalytics.GetDeviceId()),
        (e.XVn = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        ).LanguageType),
        UE.KuroStaticLibrary.GetMacAddress());
    return StringUtils_1.StringUtils.IsEmpty(t) || (e.Z7n = t), e;
  }
}
(exports.PlatformController = PlatformController).nXi = (e, t) => {
  0 === t ||
    Info_1.Info.IsInKeyBoard() ||
    Info_1.Info.IsMobilePlatform() ||
    Info_1.Info.SwitchInputControllerType(1, "MouseAxisInput");
};
//# sourceMappingURL=PlatformController.js.map
