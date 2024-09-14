"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PackageUpdateController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  HotPatchKuroSdk_1 = require("../HotPatchKuroSdk/HotPatchKuroSdk"),
  Platform_1 = require("../Platform/Platform"),
  AppUtil_1 = require("../Update/AppUtil"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  TAPPACKAGEID = "A1425",
  CNIOS = "A1351",
  GLOBALIOS = "A1725",
  GLOBALANDROID = "A1723";
class PackageUpdateController {
  static async TryOpenPackageUpdateTipsView(a) {
    try {
      let e = "";
      HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() &&
        (e = UE.KuroSDKManager.GetPackageId()),
        LauncherLog_1.LauncherLog.Info("整包配置", ["currentPackageId", e]),
        (this.UTn = e);
      var t =
          BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
            "PatchVersion",
          ),
        r = cpp_1.KuroApplication.IniPlatformName(),
        o = UE.KuroLauncherLibrary.GetAppVersion(),
        i =
          BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
      (this.ATn =
        `packageId=${e}&platform=${r}&appVersion=${o}&patchVersion=${t}&area=` +
        i),
        (this.PTn = (0, puerts_1.toManualReleaseDelegate)(this.xTn)),
        (this.wTn = (0, puerts_1.toManualReleaseDelegate)(this.BTn)),
        await this.syr(a),
        (0, puerts_1.releaseManualReleaseDelegate)(this.xTn),
        (0, puerts_1.releaseManualReleaseDelegate)(this.BTn),
        (this.PTn = void 0),
        (this.wTn = void 0);
    } catch (e) {
      e instanceof Error
        ? LauncherLog_1.LauncherLog.ErrorWithStack(e.message, e)
        : LauncherLog_1.LauncherLog.Error("open package update view failed.", [
            "error",
            e,
          ]);
    } finally {
      AppUtil_1.AppUtil.QuitGame("整包更新");
    }
  }
  static bTn(e, a, t) {
    (e = e.MainUrl + "?" + a), (a = UE.KuroHttp.GetDefaultHeader());
    UE.KuroHttp.Get(e, a, t);
  }
  static qTn(e, a, t, r, o) {
    200 !== r
      ? ((r = e.SubUrl + "?" + a),
        LauncherLog_1.LauncherLog.Info("打开链接", ["updateData!.descUrl", r]),
        UE.KismetSystemLibrary.LaunchURL(r))
      : ((r = e.MainUrl + "?" + a),
        LauncherLog_1.LauncherLog.Info("打开链接", ["updateData!.descUrl", r]),
        UE.KismetSystemLibrary.LaunchURL(r));
  }
  static async syr(e) {
    let a = !1,
      t =
        (HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() &&
          this.UTn === TAPPACKAGEID &&
          (a = !0),
        !0);
    var r,
      o,
      i = () => {
        var e =
          BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
            .PackageUpdateDescUrl;
        this.bTn(e, this.ATn, this.wTn);
      },
      s = () => {
        var e;
        a
          ? UE.TapUpdateStaticLibrary.UpdateGame(void 0)
          : this.Nkn.has(this.UTn)
            ? ((e = this.Nkn.get(this.UTn)),
              LauncherLog_1.LauncherLog.Info("打开链接", ["finalUrl", e]),
              UE.KismetSystemLibrary.LaunchURL(e))
            : Platform_1.Platform.IsWindowsPlatform()
              ? (t = !1)
              : ((e =
                  BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
                    .PackageUpdateUrl),
                this.bTn(e, this.ATn, this.PTn));
      };
    for (
      a &&
      !this.ayr &&
      ((r =
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "TaptapClientId",
        )),
      (o =
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "TaptapClientToken",
        )),
      UE.TapUpdateStaticLibrary.Init(r, o),
      (this.ayr = !0));
      t;

    )
      await this.hyr(e, i, s, s);
  }
  static async hyr(e, a, t, r) {
    ((await e.ShowDialog(
      !0,
      "HotFixTipsTitle",
      "NewVersionDetailDownloadGetReward",
      "NewVersionDetailDesc",
      "ConfirmText",
      void 0,
    ))
      ? t
      : a)?.();
  }
}
(exports.PackageUpdateController = PackageUpdateController),
  ((_a = PackageUpdateController).ayr = !1),
  (PackageUpdateController.PTn = void 0),
  (PackageUpdateController.wTn = void 0),
  (PackageUpdateController.ATn = ""),
  (PackageUpdateController.UTn = ""),
  (PackageUpdateController.Nkn = new Map([
    [CNIOS, "https://apps.apple.com/cn/app/%E9%B8%A3%E6%BD%AE/id6450693428"],
    [GLOBALIOS, "https://apps.apple.com/us/app/wuthering-waves/id6475033368"],
    [
      GLOBALANDROID,
      "https://play.google.com/store/apps/details?id=com.kurogame.wutheringwaves.global",
    ],
  ])),
  (PackageUpdateController.BTn = (e, a, t) => {
    _a.qTn(
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        .PackageUpdateDescUrl,
      _a.ATn,
      e,
      a,
      t,
    );
  }),
  (PackageUpdateController.xTn = (e, a, t) => {
    _a.qTn(
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        .PackageUpdateUrl,
      _a.ATn,
      e,
      a,
      t,
    );
  });
//# sourceMappingURL=PackageUpdateController.js.map
