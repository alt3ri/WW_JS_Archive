"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineSettingView = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
const OnlineHallSettingButton_1 = require("./OnlineHallSettingButton");
const SETTING_COUNT_ID = 4;
class OnlineSettingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.hNi = Protocol_1.Aki.Protocol.J3s.Proto_ConfirmJoin),
      (this.lNi = void 0),
      (this.Eft = (e) => this.hNi !== e),
      (this._Ni = () => {
        OnlineController_1.OnlineController.WorldEnterPermissionsRequest(
          this.hNi,
        ),
          this.CloseMe();
      }),
      (this.uNi = (e) => {
        this.hNi = e;
        for (const [t, i] of this.lNi)
          t === this.hNi ? i.SetSelected(!0) : i.SetSelected(!1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this._Ni]]);
  }
  OnBeforeShow() {
    (this.hNi =
      ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting),
      this.cNi();
  }
  OnBeforeDestroy() {
    this.lNi && this.lNi.clear(), (this.lNi = void 0);
  }
  cNi() {
    this.lNi = new Map();
    let e;
    let t;
    const i = this.GetItem(1);
    const r = this.GetItem(0);
    this.mNi(i.GetOwner(), 0);
    for (let e = 1; e < SETTING_COUNT_ID; e++) {
      const s = LguiUtil_1.LguiUtil.CopyItem(i, r);
      this.mNi(s.GetOwner(), e);
    }
    this.hNi =
      ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
    for ([e, t] of this.lNi)
      e === this.hNi ? t.SetSelected(!0) : t.SetSelected(!1);
  }
  mNi(e, t) {
    e = new OnlineHallSettingButton_1.OnlineHallSettingButton(e, t);
    e.BindOnSettingButtonClickedCallback(this.uNi),
      e.BindCanToggleExecuteChange(this.Eft),
      this.lNi.set(t, e);
  }
}
exports.OnlineSettingView = OnlineSettingView;
// # sourceMappingURL=OnlineSettingView.js.map
