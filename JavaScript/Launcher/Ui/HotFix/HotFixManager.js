"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherConfigLib_1 = require("../../Define/LauncherConfigLib"),
  HotPatchLogReport_1 = require("../../HotPatchLogReport"),
  PlatformSdkManagerNew_1 = require("../../Platform/PlatformSdk/PlatformSdkManagerNew"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherSerialize_1 = require("../../Util/LauncherSerialize"),
  SdkProtocolView_1 = require("../SdkView/SdkProtocolView"),
  HotFixUiView_1 = require("./HotFixUiView");
class HotFixManager {
  constructor() {
    (this.cyr = !1),
      (this.myr = () => {
        this.dyr.SetConfirmationItemActive(!1);
      });
  }
  SetNetworkType(t) {
    this.Cyr = t;
  }
  GetNetworkType() {
    return this.Cyr;
  }
  async Init(t) {
    (this.dyr = new HotFixUiView_1.HotFixUiView()),
      await this.dyr.InitAsync(t),
      this.dyr.SetMaskButtonCallBack(() => {
        this.cyr && this.dyr.SetConfirmationItemActive(!0);
      });
  }
  async CloseHotFix() {
    await this.dyr.Hide(), this.dyr.Destroy();
  }
  Destroy() {
    this.dyr.Destroy(), (this.dyr = void 0);
  }
  async ShowInfo(t, i, ...e) {
    this.gyr(),
      this.dyr.SetProgressLeftActive(!0),
      this.dyr.SetProgressRightActive(!1),
      i && 0 < i.length && this.dyr.SetProgressLeftTips(i, ...e),
      t ? this.dyr.UpdateProgressRate(0) : this.dyr.SetProgressActive(!1),
      await this.WaitFrame();
  }
  async UpdateProgress(t, i, e, ...a) {
    this.dyr.SetProgressLeftTips(e, ...a),
      this.dyr.SetProgressActive(!0),
      this.dyr.UpdateProgressRate(i),
      (t || 1 <= i) && (await this.WaitFrame());
  }
  async UpdatePatchDownProgress(t, i, e, a, r, o) {
    this.dyr.SetProgressText("PatchDownload", r, o),
      this.dyr.SetPatchText("PatchDownID", e),
      this.dyr.SetSpeedText("PatchDownSpeed", a),
      this.dyr.SetProgressActive(!0),
      this.dyr.UpdateProgressRate(i),
      (t || 1 <= i) && (await this.WaitFrame());
  }
  async ShowDialog(i, e, a, r, o, s, ...h) {
    var t;
    if (
      (UE.KuroVariableFunctionLibrary.HasStringValue("back_to_game") &&
        (UE.KuroAudioStatics.SetState(
          "reconnect_auto_login",
          "not_in_auto_login",
        ),
        UE.KuroVariableFunctionLibrary.RemoveStringValue("back_to_game"),
        (t = (0, puerts_1.$ref)(void 0)),
        UE.KuroVariableFunctionLibrary.GetObject("loading_widget", t)) &&
        (UE.KuroVariableFunctionLibrary.RemoveObject("loading_widget"),
        (t = (0, puerts_1.$unref)(t))?.IsValid()) &&
        t.RemoveFromParent(),
      this.cyr)
    )
      throw new Error(
        "已经有对话框，处理打开状态了，不能有新的对话框覆盖之前的。",
      );
    try {
      var n = new HotPatchLogReport_1.HotPatchLog(),
        c = ((n.s_step_id = "start_hotpatch_dialog"), { content: a, args: h });
      (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
        HotPatchLogReport_1.HotPatchLogReport.Report(n),
        (this.cyr = !0),
        this.dyr.SetRepairButtonEnable(!0);
      let t = !1;
      this.dyr.SetConfirmationTitle(e),
        this.dyr.SetConfirmationContent(a, ...h),
        this.dyr.SetConfirmationCloseButtonActive(!0),
        (t = i
          ? (this.dyr.SetConfirmationLeftButtonText(r),
            this.dyr.SetConfirmationRightButtonText(o),
            await this.fyr(!0))
          : (this.dyr.SetConfirmationMiddleButtonText(s), await this.pyr(!0))),
        await this.WaitFrame(),
        (this.cyr = !1),
        this.dyr.SetRepairButtonEnable(!1);
      var _ = new HotPatchLogReport_1.HotPatchLog(),
        w =
          ((_.s_step_id = "end_hotpatch_dialog"),
          { success: !0, info: { content: a, args: h, selectRet: t } });
      return (
        (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(w)),
        HotPatchLogReport_1.HotPatchLogReport.Report(_),
        t
      );
    } catch (t) {
      throw ((this.cyr = !1), t);
    }
  }
  async vyr() {
    return new Promise((t) => {
      this.dyr.SetNextFrameCallback(() => {
        t();
      }, 0);
    });
  }
  async WaitFrame(i = 1) {
    if (!(i <= 0)) for (let t = 0; t < i; t++) await this.vyr();
  }
  gyr() {
    this.dyr.SetContainerItemActive(!0), this.dyr.SetConfirmationItemActive(!1);
  }
  async fyr(i) {
    return (
      this.dyr.SetConfirmationLeftButtonActive(!0),
      this.dyr.SetConfirmationRightButtonActive(!0),
      this.dyr.SetConfirmationMiddleButtonActive(!1),
      this.dyr.SetConfirmationItemActive(!0),
      new Promise((t) => {
        this.dyr.SetConfirmationLeftButtonCallBack(() => {
          this.myr(), t(!1);
        }),
          this.dyr.SetConfirmationRightButtonCallBack(() => {
            this.myr(), t(!0);
          }),
          i &&
            this.dyr.SetConfirmationCloseButtonCallBack(() => {
              this.myr(), this.ShowInfo(!1, "DownloadContinue");
            });
      })
    );
  }
  async pyr(i) {
    return (
      this.dyr.SetConfirmationLeftButtonActive(!1),
      this.dyr.SetConfirmationRightButtonActive(!1),
      this.dyr.SetConfirmationMiddleButtonActive(!0),
      this.dyr.SetConfirmationItemActive(!0),
      new Promise((t) => {
        this.dyr.SetConfirmationMiddleButtonCallBack(() => {
          this.myr(), t(!0);
        }),
          i &&
            this.dyr.SetConfirmationCloseButtonCallBack(() => {
              this.myr(), this.ShowInfo(!1, "DownloadContinue");
            });
      })
    );
  }
  async ShowPrivacyProtocolView() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().NeedPrivacyProtocol()
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetPrivacyAgreeState()
        ? (LauncherLog_1.LauncherLog.Info(
            "PlatformSdkManagerNew.GetPlatformSdk().GetPrivacyAgreeState() true",
          ),
          !0)
        : new Promise((t) => {
            var i = SdkProtocolView_1.SdkProtocolViewData.CreateViewData(
              () => {
                LauncherLog_1.LauncherLog.Info("Sdk同意协议"),
                  this.dyr?.SetProtocolViewViewState(!1),
                  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SavePrivacyAgreeState(
                    !0,
                  ),
                  t(!0);
              },
              () => {
                LauncherLog_1.LauncherLog.Info("Sdk拒绝协议"),
                  this.dyr?.SetProtocolViewViewState(!1),
                  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SavePrivacyAgreeState(
                    !1,
                  ),
                  t(!1);
              },
            );
            this.dyr?.ShowProtocolView(i);
          })
      : (LauncherLog_1.LauncherLog.Info(
          "PlatformSdkManagerNew.GetPlatformSdk().NeedPrivacyProtocol() false",
        ),
        !0);
  }
  static SetLocalText(t, e, ...a) {
    e = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(e);
    if (void 0 === e) t.SetText("");
    else {
      let i = e;
      if (a)
        for (let t = 0; t < a.length; t++) {
          var r = a[t],
            o = `{${t}}`;
          i = i.split(o).join(r);
        }
      t.SetText(i);
    }
  }
}
exports.HotFixManager = HotFixManager;
//# sourceMappingURL=HotFixManager.js.map
