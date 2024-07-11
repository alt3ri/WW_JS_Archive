"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemGrid = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../Util/LguiUtil");
class CommonItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = void 0) {
    super(),
      (this.qTt = 0),
      (this.GTt = void 0),
      (this.NTt = (t) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t,
        );
      }),
      (this.OTt = (t) => {
        t === this.qTt && this.GetExtendToggle(0).SetToggleState(0, !1);
      }),
      (this.Bke = (t) => {
        this.NTt && 1 === t && this.NTt(this.qTt);
      }),
      t && this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UISprite],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UITexture],
      [12, UE.UIItem],
      [13, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Bke]]);
  }
  OnStart() {
    this.SHe(),
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
  SHe() {
    this.SetEmpty(!1), this.SetLock(!1), this.SetRoleHead(), this.kTt();
  }
  FTt() {
    this.SetItemIcon(this.GetTexture(3), this.qTt, this.GTt),
      this.SetItemQualityIcon(this.GetSprite(4), this.qTt, this.GTt);
  }
  Refresh(t, i, e) {
    var s = t[0],
      t = t[1];
    this.RefreshItem(s.ItemId, t);
  }
  SetQualityActive(t) {
    this.GetSprite(4).SetUIActive(t);
  }
  SetBelongViewName(t) {
    this.GTt = t;
  }
  RefreshItem(t, i = 0) {
    (this.qTt = t), this.FTt(), this.VTt(i);
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  VTt(t = 0) {
    t
      ? (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "ShowCount", t),
        this.GetItem(12).SetUIActive(!0))
      : this.GetItem(12).SetUIActive(!1);
  }
  SetRoleHead(t) {
    var i = this.GetTexture(6),
      e = this.GetSprite(7);
    StringUtils_1.StringUtils.IsEmpty(t)
      ? (i.SetUIActive(!1), e.SetUIActive(!1))
      : (i.SetUIActive(!0), e.SetUIActive(!0), this.SetTextureByPath(t, i));
  }
  kTt(t = 0) {
    t
      ? (this.GetText(8).SetText(t.toFixed(0)), this.GetItem(9).SetUIActive(!0))
      : this.GetItem(9).SetUIActive(!1);
  }
  SetMask(t) {
    this.GetTexture(11).SetUIActive(t);
  }
  SetEmpty(t) {
    this.GetItem(2).SetUIActive(t), this.GetItem(1).SetUIActive(!t);
  }
  SetLock(t) {
    this.GetItem(5).SetUIActive(t);
  }
  SetReceived(t) {
    this.GetItem(13).SetUIActive(t);
  }
  SetCountTextVisible(t) {
    this.GetItem(12).SetUIActive(t);
  }
  async RefreshItemAsync(t, i = 0) {
    (this.qTt = t), await this.HTt(), this.VTt(i);
  }
  async HTt() {
    const t = new CustomPromise_1.CustomPromise(),
      i =
        (this.GetTexture(3).SetUIActive(!1),
        this.SetItemIcon(this.GetTexture(3), this.qTt, this.GTt, () => {
          t.SetResult(void 0), this.GetTexture(3)?.SetUIActive(!0);
        }),
        await t.Promise,
        new CustomPromise_1.CustomPromise());
    this.SetItemQualityIcon(
      this.GetSprite(4),
      this.qTt,
      this.GTt,
      "BackgroundSprite",
      () => {
        i.SetResult(void 0);
      },
    ),
      await i.Promise;
  }
}
exports.CommonItemGrid = CommonItemGrid;
//# sourceMappingURL=CommonItemGrid.js.map
