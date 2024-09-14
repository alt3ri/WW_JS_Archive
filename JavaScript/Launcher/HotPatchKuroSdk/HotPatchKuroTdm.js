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
    var e =
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
    return !(!UE.KuroStaticLibrary.IsModuleLoaded("KuroTDM") && !e);
  }
  static Init() {
    if (this.IfCanUseTdm()) {
      if (UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
        Platform_1.Platform.IsIOSPlatform() &&
          UE.TDMStaticLibrary.RegisterLifeCycle();
        let e = "kuro";
        HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() &&
          (e = UE.KuroSDKManager.GetPackageId());
        var r =
            BaseConfigController_1.BaseConfigController.GetPublicValue(
              "TDMAppId",
            ),
          o =
            BaseConfigController_1.BaseConfigController.GetPublicValue(
              "TDMAppKey",
            ),
          t =
            (LauncherLog_1.LauncherLog.Info(
              "Init TDMParam",
              ["appIdValue", r],
              ["appChannelValue", e],
              ["appKeyValue", o],
            ),
            "CN" !==
              BaseConfigController_1.BaseConfigController.GetPublicValue(
                "SdkArea",
              )),
          t =
            (LauncherLog_1.LauncherLog.Info("SetRouterAddress"),
            t
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
            UE.TDMStaticLibrary.Initialize(r, e, o),
            BaseConfigController_1.BaseConfigController.GetPublicValue(
              "TDMUrl",
            )),
          r =
            ("Default" !== t &&
              (LauncherLog_1.LauncherLog.Info("tdm 链接", ["targetUrl", t]),
              UE.TDMStaticLibrary.SetRouterAddress(!1, t)),
            LauncherLog_1.LauncherLog.Info("GetDeviceInfo"),
            UE.TDMStaticLibrary.GetDeviceInfo());
        LauncherLog_1.LauncherLog.Info("TDM deviceInfo", ["deviceInfo", r]);
      }
    } else LauncherLog_1.LauncherLog.Info("不可使用tdm 初始化失败");
  }
}
exports.HotPatchKuroTdm = HotPatchKuroTdm;
//# sourceMappingURL=HotPatchKuroTdm.js.map
