"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkProtocolViewData =
    exports.SdkProtocolViewLayoutData =
    exports.SdkProtocolView =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  PlatformSdkConfig_1 = require("../../Platform/PlatformSdk/PlatformSdkConfig"),
  PlatformSdkManagerNew_1 = require("../../Platform/PlatformSdk/PlatformSdkManagerNew"),
  HotFixManager_1 = require("../HotFix/HotFixManager"),
  LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  LaunchUtil_1 = require("../LaunchUtil");
class SdkProtocolView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.C0t = void 0),
      (this.ts = void 0),
      (this.HGe = void 0),
      (this.uAa = void 0),
      (this.cAa = void 0),
      (this.cxa = void 0),
      (this.mxa = void 0),
      (this.dxa = void 0),
      (this.Cxa = void 0),
      (this.gxa = void 0),
      (this.fxa = []),
      (this.CAa = []),
      (this.TickManager = void 0),
      (this.Byr = (t) => {
        this.SetRootActorLaunchComponentsAction(t);
      }),
      (this.gAa = () => {
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
    ),
      (this.TickManager = new UE.KuroTickManager(t, "SdkProtocolView"));
  }
  OnStart() {
    (this.ts = this.GetText(3)),
      (this.HGe = this.GetText(5)),
      (this.uAa = this.GetButton(0)),
      (this.cAa = this.GetButton(1)),
      this.uAa?.OnClickCallBack.Bind(this.gAa),
      this.cAa?.OnClickCallBack.Bind(this.eDo),
      (this.cxa = this.GetButton(2)),
      (this.mxa = this.GetButton(6)),
      (this.dxa = this.GetButton(7)),
      (this.Cxa = this.GetButton(8)),
      (this.gxa = this.GetButton(9)),
      this.fxa.push(this.cxa, this.mxa, this.dxa, this.Cxa, this.gxa);
    for (const t of this.fxa) t.RootUIComp.SetUIActive(!1);
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
          s = this.fxa[t].RootUIComp;
        o.SetActor(s.GetOwner()),
          o.SetActive(!0),
          o.Refresh(this.C0t.LayoutData[t]),
          this.CAa.push(o);
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
    this.TickManager && (this.TickManager = void 0), (this.CAa.length = 0);
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
    return (
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
        ? (o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "UserProtocol",
              "手柄LT",
              (t) => {
                this.gka(
                  t,
                  PlatformSdkConfig_1.PlatformSdkConfig.GetTermsOfService(),
                );
              },
            ),
          ),
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "PrivacyPolicy",
              "手柄RT",
              (t) => {
                this.gka(
                  t,
                  PlatformSdkConfig_1.PlatformSdkConfig.GetPrivacyPolicy(),
                );
              },
            ),
          ))
        : (o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "UserProtocol",
              "手柄LT",
              (t) => {
                this.gka(
                  t,
                  PlatformSdkConfig_1.PlatformSdkConfig.GetTermsOfService(),
                );
              },
            ),
          ),
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "PrivacyPolicy",
              "手柄RT",
              (t) => {
                this.gka(
                  t,
                  PlatformSdkConfig_1.PlatformSdkConfig.GetPrivacyPolicy(),
                );
              },
            ),
          ),
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "ChildProtocol",
              "手柄右边上键",
              (t) => {
                this.gka(
                  t,
                  PlatformSdkConfig_1.PlatformSdkConfig.GetChildPolicy(),
                );
              },
            ),
          )),
      SdkProtocolViewData.Create("SdkProtocolTitle", "SdkProtocolDesc", t, i, o)
    );
  }
  static gka(i, t) {
    if (
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.OpenWebBrowser(
        t,
      )
    ) {
      const o = (t) => {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PollWebViewClose() &&
          (i.TickManager.RemoveTick(0),
          (0, puerts_1.releaseManualReleaseDelegate)(o));
      };
      i.TickManager.AddTick(0, (0, puerts_1.toManualReleaseDelegate)(o));
    }
  }
  static Create(t, i, o, s, e) {
    var r = new SdkProtocolViewData();
    return (
      (r.TitleId = t),
      (r.DescTextId = i),
      (r.EnterCallback = o),
      (r.CancelCallback = s),
      (r.LayoutData = e),
      r
    );
  }
}
exports.SdkProtocolViewData = SdkProtocolViewData;
//# sourceMappingURL=SdkProtocolView.js.map
