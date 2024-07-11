"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineSettingView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  OnlineController_1 = require("../OnlineController"),
  OnlineHallSettingButton_1 = require("./OnlineHallSettingButton"),
  SETTING_COUNT_ID = 4;
class OnlineSettingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.hOi = Protocol_1.Aki.Protocol.$8s.Proto_ConfirmJoin),
      (this.lOi = void 0),
      (this.Bpt = (e) => this.hOi !== e),
      (this._Oi = () => {
        OnlineController_1.OnlineController.WorldEnterPermissionsRequest(
          this.hOi,
        ),
          this.CloseMe();
      }),
      (this.uOi = (e) => {
        this.hOi = e;
        for (var [t, i] of this.lOi)
          t === this.hOi ? i.SetSelected(!0) : i.SetSelected(!1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this._Oi]]);
  }
  OnBeforeShow() {
    (this.hOi =
      ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting),
      this.cOi();
  }
  OnBeforeDestroy() {
    this.lOi && this.lOi.clear(), (this.lOi = void 0);
  }
  cOi() {
    this.lOi = new Map();
    var e,
      t,
      i = this.GetItem(1),
      r = this.GetItem(0);
    this.mOi(i.GetOwner(), 0);
    for (let e = 1; e < SETTING_COUNT_ID; e++) {
      var s = LguiUtil_1.LguiUtil.CopyItem(i, r);
      this.mOi(s.GetOwner(), e);
    }
    this.hOi =
      ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
    for ([e, t] of this.lOi)
      e === this.hOi ? t.SetSelected(!0) : t.SetSelected(!1);
  }
  mOi(e, t) {
    e = new OnlineHallSettingButton_1.OnlineHallSettingButton(e, t);
    e.BindOnSettingButtonClickedCallback(this.uOi),
      e.BindCanToggleExecuteChange(this.Bpt),
      this.lOi.set(t, e);
  }
}
exports.OnlineSettingView = OnlineSettingView;
//# sourceMappingURL=OnlineSettingView.js.map
