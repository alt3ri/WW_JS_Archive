"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemSimpleGridButton = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CommonItemSimpleGridButton extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = void 0) {
    super(),
      (this.qTt = 0),
      (this.tPt = "ShowCount"),
      (this.GTt = void 0),
      (this.NTt = (t) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t,
        );
      }),
      (this.ije = () => {
        this.NTt && this.NTt(this.qTt);
      }),
      t && this.CreateThenShowByActor(t);
  }
  get ItemId() {
    return this.qTt;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [4, UE.UIButtonComponent],
      [1, UE.UITexture],
      [0, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[4, this.ije]]);
  }
  OnStart() {}
  OnBeforeDestroy() {}
  FTt() {
    var t = this.GetTexture(1),
      t = (this.SetItemIcon(t, this.qTt, this.GTt), this.GetSprite(0));
    this.SetItemQualityIcon(t, this.qTt, this.GTt, "BackgroundSprite");
  }
  Refresh(t, i, e) {
    var s = t[0],
      t = t[1];
    this.RefreshItem(s.ItemId, t);
  }
  SetQualityActive(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetCanReceiveActive(t) {
    this.GetSprite(5).SetUIActive(t);
  }
  SetLockReceiveActive(t) {
    this.GetSprite(6).SetUIActive(t);
  }
  SetReceivedActive(t) {
    this.GetItem(7).SetUIActive(t);
  }
  SetBelongViewName(t) {
    this.GTt = t;
  }
  RefreshItem(t, i = 0) {
    (this.qTt = t), this.FTt(), this.SetCount(i);
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  SetCount(t = 0) {
    t
      ? (LguiUtil_1.LguiUtil.SetLocalText(this.GetCountText(), this.tPt, t),
        this.GetCountItem().SetUIActive(!0))
      : this.GetCountItem().SetUIActive(!1);
  }
  GetCountText() {
    return this.GetText(2);
  }
  GetCountItem() {
    return this.GetItem(3);
  }
  SetCountTextId(t) {
    this.tPt = t;
  }
  async RefreshItemAsync(t, i = 0) {
    (this.qTt = t), await this.HTt(), this.SetCount(i);
  }
  async HTt() {
    const t = new CustomPromise_1.CustomPromise(),
      i =
        (this.SetItemIcon(this.GetTexture(1), this.qTt, void 0, () => {
          t.SetResult(void 0);
        }),
        await t.Promise,
        new CustomPromise_1.CustomPromise());
    this.SetItemQualityIcon(
      this.GetSprite(0),
      this.qTt,
      void 0,
      "BackgroundSprite",
      () => {
        i.SetResult(void 0);
      },
    ),
      await i.Promise;
  }
}
exports.CommonItemSimpleGridButton = CommonItemSimpleGridButton;
//# sourceMappingURL=CommonItemSimpleGridButton.js.map
