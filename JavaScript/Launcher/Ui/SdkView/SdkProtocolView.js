"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkProtocolViewData =
    exports.SdkProtocolViewLayoutData =
    exports.SdkProtocolView =
      void 0);
const BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  PlatformSdkConfig_1 = require("../../Platform/PlatformSdk/PlatformSdkConfig"),
  PlatformSdkManagerNew_1 = require("../../Platform/PlatformSdk/PlatformSdkManagerNew"),
  PlatformSdkReportData_1 = require("../../Platform/PlatformSdk/PlatformSdkReportData"),
  HotFixManager_1 = require("../HotFix/HotFixManager"),
  LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  LaunchUtil_1 = require("../LaunchUtil");
class SdkProtocolView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.C0t = void 0),
      (this.ts = void 0),
      (this.HGe = void 0),
      (this.aRa = void 0),
      (this.hRa = void 0),
      (this.gxa = void 0),
      (this.fxa = void 0),
      (this.pxa = void 0),
      (this.vxa = void 0),
      (this.Mxa = void 0),
      (this.Sxa = []),
      (this.uRa = []),
      (this.Byr = (t) => {
        this.SetRootActorLaunchComponentsAction(t);
      }),
      (this.cRa = () => {
        this.C0t?.EnterCallback?.();
      }),
      (this.eDo = () => {
        this.C0t?.CancelCallback?.();
      });
  }
  SetViewData(t) {
    this.C0t = t;
  }
  async Init(t, i) {
    await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
      "/Game/Aki/UI/Module/HotFix/Prefab/UiView_PSProtocol.UiView_PSProtocol",
      t,
      i,
      this.Byr,
    );
    t = new PlatformSdkReportData_1.PlatformReportAgreementShow();
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
      t,
    );
  }
  OnStart() {
    (this.ts = this.GetText(3)),
      (this.HGe = this.GetText(5)),
      (this.aRa = this.GetButton(0)),
      (this.hRa = this.GetButton(1)),
      this.aRa?.OnClickCallBack.Bind(this.cRa),
      this.hRa?.OnClickCallBack.Bind(this.eDo),
      (this.gxa = this.GetButton(2)),
      (this.fxa = this.GetButton(6)),
      (this.pxa = this.GetButton(7)),
      (this.vxa = this.GetButton(8)),
      (this.Mxa = this.GetButton(9)),
      this.Sxa.push(this.gxa, this.fxa, this.pxa, this.vxa, this.Mxa);
    for (const t of this.Sxa) t.RootUIComp.SetUIActive(!1);
    HotFixManager_1.HotFixManager.SetLocalText(
      this.GetText(10),
      "SdkProtocolRefuse",
    ),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(11),
        "SdkProtocolConfirm",
      ),
      this.RefreshView();
  }
  RefreshView() {
    this.Pqe(), this.mGe(), this.v4e();
  }
  v4e() {
    if (this.C0t?.LayoutData) {
      var i = this.C0t.LayoutData.length;
      for (let t = 0; t < i; t++) {
        var o = new ProtocolItem(this),
          s = this.Sxa[t].RootUIComp;
        o.SetActor(s.GetOwner()),
          o.SetActive(!0),
          o.Refresh(this.C0t.LayoutData[t]),
          this.uRa.push(o);
      }
    }
  }
  mGe() {
    this.C0t &&
      this.HGe &&
      HotFixManager_1.HotFixManager.SetLocalText(this.HGe, this.C0t.TitleId);
  }
  Pqe() {
    this.C0t &&
      this.ts &&
      HotFixManager_1.HotFixManager.SetLocalText(this.ts, this.C0t.DescTextId);
  }
  OnBeforeDestroy() {
    this.uRa.length = 0;
  }
}
exports.SdkProtocolView = SdkProtocolView;
class ProtocolItem extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor(t) {
    super(),
      (this.Owner = t),
      (this.Data = void 0),
      (this.c8i = void 0),
      (this.ts = void 0),
      (this.nqe = () => {
        this.Data?.ClickCallBack?.(this.Owner);
      });
  }
  SetActor(t) {
    this.SetRootActorLaunchComponentsAction(t);
  }
  OnStart() {
    (this.c8i = this.GetButton(0)),
      this.c8i?.OnClickCallBack.Bind(this.nqe),
      (this.ts = this.GetText(1));
  }
  Refresh(t) {
    (this.Data = t),
      HotFixManager_1.HotFixManager.SetLocalText(this.ts, t.TextId);
  }
}
class SdkProtocolViewLayoutData {
  constructor() {
    (this.TextId = ""),
      (this.KeyShortCut = ""),
      (this.ClickCallBack = () => {});
  }
  static CreateLayoutData(t, i, o) {
    var s = new SdkProtocolViewLayoutData();
    return (s.TextId = t), (s.KeyShortCut = i), (s.ClickCallBack = o), s;
  }
}
exports.SdkProtocolViewLayoutData = SdkProtocolViewLayoutData;
class SdkProtocolViewData {
  constructor() {
    (this.TitleId = ""),
      (this.DescTextId = ""),
      (this.EnterCallback = () => {}),
      (this.CancelCallback = () => {}),
      (this.LayoutData = []);
  }
  static CreateViewData(t, i) {
    var o = [];
    if (
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
    ) {
      const s = PlatformSdkConfig_1.PlatformSdkConfig.GetTermsOfService(),
        r = PlatformSdkConfig_1.PlatformSdkConfig.GetPrivacyPolicy();
      s &&
        "" !== s &&
        o.push(
          SdkProtocolViewLayoutData.CreateLayoutData(
            "UserProtocol",
            "手柄LT",
            (t) => {
              this.vFa(t, s);
            },
          ),
        ),
        r &&
          "" !== r &&
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "PrivacyPolicy",
              "手柄RT",
              (t) => {
                this.vFa(t, r);
              },
            ),
          );
    } else {
      const e = PlatformSdkConfig_1.PlatformSdkConfig.GetTermsOfService(),
        a = PlatformSdkConfig_1.PlatformSdkConfig.GetPrivacyPolicy(),
        h = PlatformSdkConfig_1.PlatformSdkConfig.GetChildPolicy();
      e &&
        "" !== e &&
        o.push(
          SdkProtocolViewLayoutData.CreateLayoutData(
            "UserProtocol",
            "手柄LT",
            (t) => {
              this.vFa(t, e);
            },
          ),
        ),
        a &&
          "" !== a &&
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "PrivacyPolicy",
              "手柄RT",
              (t) => {
                this.vFa(t, a);
              },
            ),
          ),
        h &&
          "" !== h &&
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "ChildProtocol",
              "手柄右边上键",
              (t) => {
                this.vFa(t, h);
              },
            ),
          );
    }
    return SdkProtocolViewData.Create(
      "SdkProtocolTitle",
      "SdkProtocolDesc",
      t,
      i,
      o,
    );
  }
  static vFa(t, i) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.OpenWebView(
      i,
    );
  }
  static Create(t, i, o, s, r) {
    var e = new SdkProtocolViewData();
    return (
      (e.TitleId = t),
      (e.DescTextId = i),
      (e.EnterCallback = o),
      (e.CancelCallback = s),
      (e.LayoutData = r),
      e
    );
  }
}
exports.SdkProtocolViewData = SdkProtocolViewData;
//# sourceMappingURL=SdkProtocolView.js.map
