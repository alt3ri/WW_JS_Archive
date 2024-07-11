"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixManager = void 0);
const LauncherConfigLib_1 = require("../../Define/LauncherConfigLib"),
  HotFixUiView_1 = require("./HotFixUiView"),
  HotPatchLogReport_1 = require("../../HotPatchLogReport"),
  LauncherSerialize_1 = require("../../Util/LauncherSerialize");
class HotFixManager {
  constructor() {
    (this.CEr = !1),
      (this.gEr = () => {
        this.fEr.SetConfirmationItemActive(!1);
      });
  }
  SetNetworkType(t) {
    this.pEr = t;
  }
  GetNetworkType() {
    return this.pEr;
  }
  async Init(t) {
    (this.fEr = new HotFixUiView_1.HotFixUiView()),
      await this.fEr.InitAsync(t),
      this.fEr.SetMaskButtonCallBack(() => {
        this.CEr && this.fEr.SetConfirmationItemActive(!0);
      });
  }
  async CloseHotFix() {
    await this.fEr.Hide(), this.fEr.Destroy();
  }
  Destroy() {
    this.fEr.Destroy(), (this.fEr = void 0);
  }
  async ShowInfo(t, i, ...s) {
    this.vEr(),
      this.fEr.SetProgressLeftActive(!0),
      this.fEr.SetProgressRightActive(!1),
      i && 0 < i.length && this.fEr.SetProgressLeftTips(i, ...s),
      t ? this.fEr.UpdateProgressRate(0) : this.fEr.SetProgressActive(!1),
      await this.WaitFrame();
  }
  async UpdateProgress(t, i, s, ...e) {
    this.fEr.SetProgressLeftTips(s, ...e),
      this.fEr.SetProgressActive(!0),
      this.fEr.UpdateProgressRate(i),
      (t || 1 <= i) && (await this.WaitFrame());
  }
  async UpdatePatchDownProgress(t, i, s, e, h, a) {
    this.fEr.SetProgressText("PatchDownload", h, a),
      this.fEr.SetPatchText("PatchDownID", s),
      this.fEr.SetSpeedText("PatchDownSpeed", e),
      this.fEr.SetProgressActive(!0),
      this.fEr.UpdateProgressRate(i),
      (t || 1 <= i) && (await this.WaitFrame());
  }
  async ShowDialog(i, s, e, h, a, o, ...r) {
    if (this.CEr)
      throw new Error(
        "已经有对话框，处理打开状态了，不能有新的对话框覆盖之前的。",
      );
    try {
      var n = new HotPatchLogReport_1.HotPatchLog(),
        c = ((n.s_step_id = "start_hotpatch_dialog"), { content: e, args: r });
      (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
        HotPatchLogReport_1.HotPatchLogReport.Report(n),
        (this.CEr = !0),
        this.fEr.SetRepairButtonEnable(!0);
      let t = !1;
      this.fEr.SetConfirmationTitle(s),
        this.fEr.SetConfirmationContent(e, ...r),
        this.fEr.SetConfirmationCloseButtonActive(!0),
        (t = i
          ? (this.fEr.SetConfirmationLeftButtonText(h),
            this.fEr.SetConfirmationRightButtonText(a),
            await this.MEr(!0))
          : (this.fEr.SetConfirmationMiddleButtonText(o), await this.SEr(!0))),
        await this.WaitFrame(),
        (this.CEr = !1),
        this.fEr.SetRepairButtonEnable(!1);
      var w = new HotPatchLogReport_1.HotPatchLog(),
        _ =
          ((w.s_step_id = "end_hotpatch_dialog"),
          { success: !0, info: { content: e, args: r, selectRet: t } });
      return (
        (w.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
        HotPatchLogReport_1.HotPatchLogReport.Report(w),
        t
      );
    } catch (t) {
      throw ((this.CEr = !1), t);
    }
  }
  async EEr() {
    return new Promise((t) => {
      this.fEr.SetNextFrameCallback(() => {
        t();
      }, 0);
    });
  }
  async WaitFrame(i = 1) {
    if (!(i <= 0)) for (let t = 0; t < i; t++) await this.EEr();
  }
  vEr() {
    this.fEr.SetContainerItemActive(!0), this.fEr.SetConfirmationItemActive(!1);
  }
  async MEr(i) {
    return (
      this.fEr.SetConfirmationLeftButtonActive(!0),
      this.fEr.SetConfirmationRightButtonActive(!0),
      this.fEr.SetConfirmationMiddleButtonActive(!1),
      this.fEr.SetConfirmationItemActive(!0),
      new Promise((t) => {
        this.fEr.SetConfirmationLeftButtonCallBack(() => {
          this.gEr(), t(!1);
        }),
          this.fEr.SetConfirmationRightButtonCallBack(() => {
            this.gEr(), t(!0);
          }),
          i &&
            this.fEr.SetConfirmationCloseButtonCallBack(() => {
              this.gEr(), this.ShowInfo(!1, "DownloadContinue");
            });
      })
    );
  }
  async SEr(i) {
    return (
      this.fEr.SetConfirmationLeftButtonActive(!1),
      this.fEr.SetConfirmationRightButtonActive(!1),
      this.fEr.SetConfirmationMiddleButtonActive(!0),
      this.fEr.SetConfirmationItemActive(!0),
      new Promise((t) => {
        this.fEr.SetConfirmationMiddleButtonCallBack(() => {
          this.gEr(), t(!0);
        }),
          i &&
            this.fEr.SetConfirmationCloseButtonCallBack(() => {
              this.gEr(), this.ShowInfo(!1, "DownloadContinue");
            });
      })
    );
  }
  static SetLocalText(t, s, ...e) {
    s = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(s);
    if (void 0 === s) t.SetText("");
    else {
      let i = s;
      if (e)
        for (let t = 0; t < e.length; t++) {
          var h = e[t],
            a = `{${t}}`;
          i = i.split(a).join(h);
        }
      t.SetText(i);
    }
  }
}
exports.HotFixManager = HotFixManager;
//# sourceMappingURL=HotFixManager.js.map
