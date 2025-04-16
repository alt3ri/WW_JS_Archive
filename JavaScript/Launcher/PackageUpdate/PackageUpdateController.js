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
  PlatformSdkManagerNew_1 = require("../Platform/PlatformSdk/PlatformSdkManagerNew"),
  AppUtil_1 = require("../Update/AppUtil"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  TAPPACKAGEID = "A1425",
  CNIOS = "A1351",
  GLOBALIOS = "A1725",
  GLOBALANDROID = "A1723",
  CNMAC = "A1475",
  GLOBALMAC = "A1828";
class PackageUpdateController {
  static async TryOpenPackageUpdateTipsView(e) {
    try {
      let a = "";
      HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk()
        ? (a = UE.KuroSDKManager.GetPackageId())
        : "" !==
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetPackageId() &&
          (a =
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetPackageId()),
        LauncherLog_1.LauncherLog.Info("整包配置", ["currentPackageId", a]),
        (this.UTn = a);
      var t =
          BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
            "PatchVersion",
          ),
        r = cpp_1.KuroApplication.IniPlatformName(),
        o = UE.KuroLauncherLibrary.GetAppVersion(),
        i =
          BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
      (this.ATn =
        `packageId=${a}&platform=${r}&appVersion=${o}&patchVersion=${t}&area=` +
        i),
        (this.PTn = (0, puerts_1.toManualReleaseDelegate)(this.xTn)),
        (this.wTn = (0, puerts_1.toManualReleaseDelegate)(this.BTn)),
        await this.syr(e),
        (0, puerts_1.releaseManualReleaseDelegate)(this.xTn),
        (0, puerts_1.releaseManualReleaseDelegate)(this.BTn),
        (this.PTn = void 0),
        (this.wTn = void 0);
    } catch (a) {
      a instanceof Error
        ? LauncherLog_1.LauncherLog.ErrorWithStack(a.message, a)
        : LauncherLog_1.LauncherLog.Error("open package update view failed.", [
            "error",
            a,
          ]);
    } finally {
      AppUtil_1.AppUtil.QuitGame("整包更新");
    }
  }
  static bTn(a, e, t) {
    (a = a.MainUrl + "?" + e), (e = UE.KuroHttp.GetDefaultHeader());
    UE.KuroHttp.Get(a, e, t);
  }
  static qTn(a, e, t, r, o) {
    200 !== r
      ? ((r = a.SubUrl + "?" + e),
        LauncherLog_1.LauncherLog.Info("打开链接", ["updateData!.descUrl", r]),
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenExternalUrl(
          r,
        ))
      : ((r = a.MainUrl + "?" + e),
        LauncherLog_1.LauncherLog.Info("打开链接", ["updateData!.descUrl", r]),
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenExternalUrl(
          r,
        ));
  }
  static async syr(a) {
    let e = !1,
      t = !1,
      r = !0,
      o =
        ((HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() ||
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) &&
          (this.UTn === TAPPACKAGEID
            ? (e = !0)
            : this.qxl.includes(this.UTn) && ((t = !0), (r = !1))),
        !0);
    var i,
      l,
      p = () => {
        var a =
          BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
            .PackageUpdateDescUrl;
        this.bTn(a, this.ATn, this.wTn);
      },
      s = () => {
        var a;
        e
          ? UE.TapUpdateStaticLibrary.UpdateGame(void 0)
          : t
            ? (o = !0)
            : this.Nkn.has(this.UTn)
              ? ((a = this.Nkn.get(this.UTn)),
                LauncherLog_1.LauncherLog.Info("打开链接", ["finalUrl", a]),
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenExternalUrl(
                  a,
                ))
              : Platform_1.Platform.IsWindowsPlatform()
                ? (o = !1)
                : ((a =
                    BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
                      .PackageUpdateUrl),
                  this.bTn(a, this.ATn, this.PTn));
      };
    for (
      e &&
      !this.ayr &&
      ((i =
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "TaptapClientId",
        )),
      (l =
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "TaptapClientToken",
        )),
      UE.TapUpdateStaticLibrary.Init(i, l),
      (this.ayr = !0));
      o;

    )
      await this.hyr(a, r, p, s, s);
  }
  static async hyr(a, e, t, r, o) {
    var i = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
        ? "NewVersionDownloadTips"
        : "NewVersionDetailDownloadGetReward",
      a = await a.ShowDialog(
        e,
        "HotFixTipsTitle",
        i,
        "NewVersionDetailDesc",
        "ConfirmText",
        "ConfirmText",
      );
    e ? (a ? r : t)?.() : o();
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
    [CNMAC, "https://apps.apple.com/cn/app/%E9%B8%A3%E6%BD%AE/id6450693428"],
    [GLOBALMAC, "https://apps.apple.com/us/app/wuthering-waves/id6475033368"],
  ])),
  (PackageUpdateController.qxl = ["A1768", "A1788", "A1801"]),
  (PackageUpdateController.BTn = (a, e, t) => {
    _a.qTn(
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        .PackageUpdateDescUrl,
      _a.ATn,
      a,
      e,
      t,
    );
  }),
  (PackageUpdateController.xTn = (a, e, t) => {
    _a.qTn(
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        .PackageUpdateUrl,
      _a.ATn,
      a,
      e,
      t,
    );
  });
//# sourceMappingURL=PackageUpdateController.js.map
