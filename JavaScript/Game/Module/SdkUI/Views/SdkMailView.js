"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkMailView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  PlatformSdkReportData_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkReportData"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  SdkViewData_1 = require("../SdkViewData");
class SdkMailView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.knl = 0),
      (this.Nnl = []),
      (this.Fnl = []),
      (this.C0t = void 0),
      (this.Yai = (i) => {
        this.ndl();
      }),
      (this.sdl = () => {
        this.ndl();
      }),
      (this.N8e = () => {
        var i;
        1 === this.GetExtendToggle(7).GetToggleState() &&
          ((i = new PlatformSdkReportData_1.PlatformReportClickProtocol()),
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
            i,
          ));
      }),
      (this.Vnl = () => {
        var i;
        TimeUtil_1.TimeUtil.GetServerTime() - this.knl < 60 ||
          ((i = this.GetInputText(1).GetText()),
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)
            ? this.Hnl(i)
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "PSN_Tip_MailNotValid",
              ));
      }),
      (this.eDo = () => {
        this.CloseMe();
      }),
      (this.sOt = () => {
        const t = this.GetInputText(1).GetText();
        var i;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) {
          const e = this.GetInputText(2).GetText();
          6 !== e.length
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "PSN_Tip_MailCodeError",
              )
            : ((i = SdkViewData_1.SdkLoadPopUpViewData.Create(
                5,
                "Sdk_Bind_Mail_Loading",
              )),
              UiManager_1.UiManager.OpenView("SdkLoadPopUpView", i, () => {
                var i = new PlatformSdkReportData_1.PlatformReportClickLogin();
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                  i,
                ),
                  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().BindAccountThenLogin(
                    (i, t, e, r) => {
                      r
                        ? (UiManager_1.UiManager.CloseView("SdkMailView"),
                          UiManager_1.UiManager.CloseView("SdkLoginView"),
                          ControllerHolder_1.ControllerHolder.LoginController.OnSdkLoginResult(
                            r.code,
                            r.cuid,
                            r.username,
                          ))
                        : r || "" === i || "HttpFail" === i
                          ? r ||
                            ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                              214,
                            )),
                            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
                              r,
                            ))
                          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                              i,
                            ),
                        UiManager_1.UiManager.CloseView("SdkLoadPopUpView");
                    },
                    t,
                    e,
                  );
              }));
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "PSN_Tip_MailNotValid",
          );
      }),
      (this.jnl = () => {
        this.C0t &&
          0 < this.C0t.ProtocolData.length &&
          ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
            "",
            this.C0t.ProtocolData[0].Url,
          );
      }),
      (this.Wnl = () => {
        this.C0t &&
          1 < this.C0t.ProtocolData.length &&
          ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
            "",
            this.C0t.ProtocolData[1].Url,
          );
      }),
      (this.Qnl = () => {
        this.C0t &&
          2 < this.C0t.ProtocolData.length &&
          ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
            "",
            this.C0t.ProtocolData[2].Url,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITextInputComponent],
      [2, UE.UITextInputComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIExtendToggle],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIText],
      [13, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.eDo],
        [9, this.sOt],
        [3, this.jnl],
        [4, this.Wnl],
        [5, this.Qnl],
        [8, this.Vnl],
        [7, this.N8e],
      ]);
  }
  OnStart() {
    (this.C0t = this.OpenParam),
      (this.Nnl = [this.GetButton(3), this.GetButton(4), this.GetButton(5)]),
      (this.Fnl = [this.GetText(10), this.GetText(11), this.GetText(12)]),
      this.Knl(),
      this.$nl();
    var i = new PlatformSdkReportData_1.PlatformReportLoginWindow();
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
      i,
    ),
      this.ndl(),
      this.GetInputText(1).OnTextChange.Bind(this.sdl),
      this.GetInputText(2).OnTextChange.Bind(this.sdl),
      this.GetExtendToggle(7).OnStateChange.Add(this.Yai);
  }
  ndl() {
    var i = this.GetInputText(1).GetText(),
      t = this.GetInputText(2).GetText(),
      e = this.GetExtendToggle(7).GetToggleState();
    0 < i.length && 0 < t.length && 1 === e
      ? this.GetButton(9).SetSelfInteractive(!0)
      : this.GetButton(9).SetSelfInteractive(!1);
  }
  async Hnl(i) {
    var t = SdkViewData_1.SdkLoadPopUpViewData.Create(
      5,
      "Sdk_Send_MailCode_Loading",
    );
    const e = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("SdkLoadPopUpView", t, () => {
      e.SetResult();
    }),
      await e.Promise;
    var t =
      await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().RequestEmailCode(
        i,
      );
    t.IfSuccess && 0 === t.Code
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Sdk_Send_MailCode_Success",
        ),
        (this.knl = TimeUtil_1.TimeUtil.GetServerTime()))
      : t.IfSuccess
        ? "" !== t.Msg && "HttpFail" !== t.Msg
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              t.Msg,
            )
          : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(214)),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
              i,
            ))
        : ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(214)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
            t,
          )),
      UiManager_1.UiManager.CloseView("SdkLoadPopUpView");
  }
  $nl() {
    for (let i = 0; i < this.Nnl.length; i++)
      this.Nnl[i].RootUIComp.SetUIActive(!1), this.Fnl[i].SetUIActive(!1);
    if (this.C0t)
      for (let i = 0; i < this.Nnl.length; i++)
        i < this.C0t.ProtocolData.length
          ? (this.Nnl[i].RootUIComp.SetUIActive(!0),
            this.Fnl[i].SetUIActive(!0),
            this.Fnl[i].SetText(this.C0t.ProtocolData[i].Title))
          : (this.Nnl[i].RootUIComp.SetUIActive(!1),
            this.Fnl[i].SetUIActive(!1));
  }
  Knl() {
    var i = TimeUtil_1.TimeUtil.GetServerTime(),
      t = this.GetInputText(1).GetText();
    i - this.knl < 60 || 0 === t.length
      ? this.GetButton(8).SetSelfInteractive(!1)
      : this.GetButton(8).SetSelfInteractive(!0);
  }
  y3e() {
    var i = TimeUtil_1.TimeUtil.GetServerTime(),
      i = Math.floor(60 - (i - this.knl));
    i <= 0
      ? this.GetText(13).ShowTextNew("Send_MailCode")
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(13),
          "Send_MailCode_Cd",
          i.toString(),
        );
  }
  OnTick(i) {
    this.Knl(), this.y3e();
  }
}
exports.SdkMailView = SdkMailView;
//# sourceMappingURL=SdkMailView.js.map
