"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemSimpleGrid = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CommonItemSimpleGrid extends GridProxyAbstract_1.GridProxyAbstract {
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
      (this.OTt = (t) => {
        t === this.qTt && this.GetExtendToggle(4).SetToggleState(0, !1);
      }),
      (this.Bke = (t) => {
        this.NTt && 1 === t && this.NTt(this.qTt);
      }),
      t && this.CreateThenShowByActor(t);
  }
  get ItemId() {
    return this.qTt;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [4, UE.UIExtendToggle],
      [1, UE.UITexture],
      [0, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.Bke]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CloseItemTips,
      this.OTt,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseItemTips,
      this.OTt,
    );
  }
  ResetToggleClick() {
    this.GetExtendToggle(4).OnStateChange.Clear(),
      this.GetExtendToggle(4).OnStateChange.Add(this.Bke);
  }
  FTt() {
    var t = this.GetTexture(1),
      t = (this.SetItemIcon(t, this.qTt, this.GTt), this.GetSprite(0));
    this.SetItemQualityIcon(t, this.qTt, this.GTt, "BackgroundSprite");
  }
  Refresh(t, e, i) {
    var s = t[0],
      t = t[1];
    this.RefreshItem(s.ItemId, t);
  }
  SetQualityActive(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetCanReceiveActive(t) {
    this.GetSprite(5).SetUIActive(!1);
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
  RefreshItem(t, e = 0) {
    (this.qTt = t), this.FTt(), this.SetCount(e);
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
  async RefreshItemAsync(t, e = 0) {
    (this.qTt = t), await this.HTt(), this.SetCount(e);
  }
  async HTt() {
    const t = new CustomPromise_1.CustomPromise(),
      e =
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
        e.SetResult(void 0);
      },
    ),
      await e.Promise;
  }
}
exports.CommonItemSimpleGrid = CommonItemSimpleGrid;
//# sourceMappingURL=CommonItemSimpleGrid.js.map
