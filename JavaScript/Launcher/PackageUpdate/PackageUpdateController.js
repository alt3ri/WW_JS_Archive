"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PackageUpdateController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  HotPatchKuroSdk_1 = require("../HotPatchKuroSdk/HotPatchKuroSdk"),
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
        (this.hIn = e);
      var t =
          BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
            "PatchVersion",
          ),
        r = UE.GameplayStatics.GetPlatformName(),
        o = UE.KuroLauncherLibrary.GetAppVersion(),
        i =
          BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
      (this.lIn =
        `packageId=${e}&platform=${r}&appVersion=${o}&patchVersion=${t}&area=` +
        i),
        (this._In = (0, puerts_1.toManualReleaseDelegate)(this.uIn)),
        (this.cIn = (0, puerts_1.toManualReleaseDelegate)(this.mIn)),
        await this.lEr(a),
        (0, puerts_1.releaseManualReleaseDelegate)(this.uIn),
        (0, puerts_1.releaseManualReleaseDelegate)(this.mIn),
        (this._In = void 0),
        (this.cIn = void 0);
    } catch (e) {
      e instanceof Error
        ? LauncherLog_1.LauncherLog.ErrorWithStack(e.message, e)
        : LauncherLog_1.LauncherLog.Error("open package update view failed.", [
            "error",
            e,
          ]);
    } finally {
      AppUtil_1.AppUtil.QuitGame();
    }
  }
  static dIn(e, a, t) {
    (e = e.MainUrl + "?" + a), (a = UE.KuroHttp.GetDefaultHeader());
    UE.KuroHttp.Get(e, a, t);
  }
  static CIn(e, a, t, r, o) {
    200 !== r
      ? ((r = e.SubUrl + "?" + a),
        LauncherLog_1.LauncherLog.Info("打开链接", ["updateData!.descUrl", r]),
        UE.KismetSystemLibrary.LaunchURL(r))
      : ((r = e.MainUrl + "?" + a),
        LauncherLog_1.LauncherLog.Info("打开链接", ["updateData!.descUrl", r]),
        UE.KismetSystemLibrary.LaunchURL(r));
  }
  static async lEr(e) {
    let a = !1,
      t =
        (HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() &&
          this.hIn === TAPPACKAGEID &&
          (a = !0),
        !0);
    var r,
      o,
      i = () => {
        var e =
          BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
            .PackageUpdateDescUrl;
        this.dIn(e, this.lIn, this.cIn);
      },
      s = () => {
        var e;
        a
          ? UE.TapUpdateStaticLibrary.UpdateGame(void 0)
          : this._On.has(this.hIn)
            ? ((e = this._On.get(this.hIn)),
              LauncherLog_1.LauncherLog.Info("打开链接", ["finalUrl", e]),
              UE.KismetSystemLibrary.LaunchURL(e))
            : ("Windows" !== UE.GameplayStatics.GetPlatformName() &&
                ((e =
                  BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
                    .PackageUpdateUrl),
                this.dIn(e, this.lIn, this._In)),
              "Windows" === UE.GameplayStatics.GetPlatformName() && (t = !1));
      };
    for (
      a &&
      !this._Er &&
      ((r =
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "TaptapClientId",
        )),
      (o =
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "TaptapClientToken",
        )),
      UE.TapUpdateStaticLibrary.Init(r, o),
      (this._Er = !0));
      t;

    )
      await this.uEr(e, i, s, s);
  }
  static async uEr(e, a, t, r) {
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
  ((_a = PackageUpdateController)._Er = !1),
  (PackageUpdateController._In = void 0),
  (PackageUpdateController.cIn = void 0),
  (PackageUpdateController.lIn = ""),
  (PackageUpdateController.hIn = ""),
  (PackageUpdateController._On = new Map([
    [CNIOS, "https://apps.apple.com/cn/app/%E9%B8%A3%E6%BD%AE/id6450693428"],
    [GLOBALIOS, "https://apps.apple.com/us/app/wuthering-waves/id6475033368"],
    [
      GLOBALANDROID,
      "https://play.google.com/store/apps/details?id=com.kurogame.wutheringwaves.global",
    ],
  ])),
  (PackageUpdateController.mIn = (e, a, t) => {
    _a.CIn(
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        .PackageUpdateDescUrl,
      _a.lIn,
      e,
      a,
      t,
    );
  }),
  (PackageUpdateController.uIn = (e, a, t) => {
    _a.CIn(
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        .PackageUpdateUrl,
      _a.lIn,
      e,
      a,
      t,
    );
  });
//# sourceMappingURL=PackageUpdateController.js.map
