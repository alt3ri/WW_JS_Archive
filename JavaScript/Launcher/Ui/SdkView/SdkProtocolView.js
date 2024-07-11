"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkProtocolViewData =
    exports.SdkProtocolViewLayoutData =
    exports.SdkProtocolView =
      void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  HotFixManager_1 = require("../HotFix/HotFixManager"),
  LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  LaunchUtil_1 = require("../LaunchUtil");
class SdkProtocolView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.C0t = void 0),
      (this.ts = void 0),
      (this.HGe = void 0),
      (this.nIa = void 0),
      (this.sIa = void 0),
      (this.aIa = void 0),
      (this.hIa = void 0),
      (this.lIa = []),
      (this.Byr = (t) => {
        this.SetRootActorLaunchComponentsAction(t);
      }),
      (this._Ia = () => {
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
  }
  OnStart() {
    (this.ts = this.GetText(3)),
      (this.HGe = this.GetText(5)),
      (this.nIa = this.GetButton(0)),
      (this.sIa = this.GetButton(1)),
      this.nIa?.OnClickCallBack.Bind(this._Ia),
      this.sIa?.OnClickCallBack.Bind(this.eDo),
      (this.aIa = this.GetItem(2)),
      this.aIa?.SetUIActive(!1),
      (this.hIa = this.GetItem(4)),
      this.RefreshView();
  }
  RefreshView() {
    this.Pqe(), this.mGe(), this.v4e();
  }
  v4e() {
    if (this.C0t?.LayoutData) {
      var i = this.C0t.LayoutData.length;
      for (let t = 0; t < i; t++) {
        var o = UE.LGUIBPLibrary.DuplicateActor(this.aIa?.GetOwner(), this.hIa),
          s = new ProtocolItem();
        s.SetActor(o),
          s.SetActive(!0),
          s.Refresh(this.C0t.LayoutData[t]),
          this.lIa.push(s);
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
    this.lIa.forEach((t) => {
      t.Destroy();
    }),
      (this.lIa.length = 0);
  }
}
exports.SdkProtocolView = SdkProtocolView;
class ProtocolItem extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.c8i = void 0),
      (this.ts = void 0),
      (this.nqe = () => {
        this.Pe?.ClickCallBack?.();
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
    (this.Pe = t),
      HotFixManager_1.HotFixManager.SetLocalText(this.ts, t.TextId);
  }
}
class SdkProtocolViewLayoutData {
  constructor() {
    (this.TextId = ""), (this.ClickCallBack = () => {});
  }
  static CreateLayoutData(t, i) {
    var o = new SdkProtocolViewLayoutData();
    return (o.TextId = t), (o.ClickCallBack = i), o;
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
              () => {},
            ),
          ),
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "PrivacyPolicy",
              () => {},
            ),
          ))
        : (o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "UserProtocol",
              () => {},
            ),
          ),
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "PrivacyPolicy",
              () => {},
            ),
          ),
          o.push(
            SdkProtocolViewLayoutData.CreateLayoutData(
              "ChildProtocol",
              () => {},
            ),
          )),
      SdkProtocolViewData.Create("SdkProtocolTitle", "SdkProtocolDesc", t, i, o)
    );
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
