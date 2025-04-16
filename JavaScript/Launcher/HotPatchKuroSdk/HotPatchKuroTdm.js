"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatchKuroTdm = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  Platform_1 = require("../Platform/Platform"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  HotPatchKuroSdk_1 = require("./HotPatchKuroSdk"),
  GLOBALROUTORADDRESS = "https://sg.tdatamaster.com:8013/tdm/v1/route",
  ROUTORADDRESS = "https://hc.tdm.qq.com:8013/tdm/v2/route";
class HotPatchKuroTdm {
  static IfCanUseTdm() {
    return !!UE.KuroStaticLibrary.IsModuleLoaded("KuroTDM");
  }
  static Init() {
    if (this.IfCanUseTdm()) {
      var r =
        "CN" !==
        BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
      if (!r && UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
        Platform_1.Platform.IsIOSPlatform() &&
          UE.TDMStaticLibrary.RegisterLifeCycle();
        let e = "kuro";
        HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() &&
          (e = UE.KuroSDKManager.GetPackageId());
        var o =
            BaseConfigController_1.BaseConfigController.GetPublicValue(
              "TDMAppId",
            ),
          t =
            BaseConfigController_1.BaseConfigController.GetPublicValue(
              "TDMAppKey",
            ),
          r =
            (LauncherLog_1.LauncherLog.Info(
              "Init TDMParam",
              ["appIdValue", o],
              ["appChannelValue", e],
              ["appKeyValue", t],
            ),
            LauncherLog_1.LauncherLog.Info("SetRouterAddress"),
            r
              ? (UE.TDMStaticLibrary.SetRouterAddress(!1, GLOBALROUTORADDRESS),
                LauncherLog_1.LauncherLog.Info("SetRouterAddress", [
                  "GLOBALROUTORADDRESS",
                  GLOBALROUTORADDRESS,
                ]))
              : (UE.TDMStaticLibrary.SetRouterAddress(!1, ROUTORADDRESS),
                LauncherLog_1.LauncherLog.Info("SetRouterAddress", [
                  "ROUTORADDRESS",
                  ROUTORADDRESS,
                ])),
            UE.TDMStaticLibrary.Initialize(o, e, t),
            BaseConfigController_1.BaseConfigController.GetPublicValue(
              "TDMUrl",
            )),
          o =
            ("Default" !== r &&
              (LauncherLog_1.LauncherLog.Info("tdm 链接", ["targetUrl", r]),
              UE.TDMStaticLibrary.SetRouterAddress(!1, r)),
            LauncherLog_1.LauncherLog.Info("GetDeviceInfo"),
            UE.TDMStaticLibrary.GetDeviceInfo());
        LauncherLog_1.LauncherLog.Info("TDM deviceInfo", ["deviceInfo", o]);
      }
    } else LauncherLog_1.LauncherLog.Info("不可使用tdm 初始化失败");
  }
}
exports.HotPatchKuroTdm = HotPatchKuroTdm;
//# sourceMappingURL=HotPatchKuroTdm.js.map
