"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityInstanceEntranceScrollItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityInstanceEntranceScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.ABl = void 0),
      (this.DBl = void 0),
      (this.RBl = void 0),
      (this.PBl = void 0),
      (this.xBl = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async WZt() {
    (this.ABl = new MainContentItem()),
      (this.DBl = new SubContentItem()),
      (this.RBl = new MainContentItem()),
      (this.PBl = new SubContentItem()),
      this.AddChild(this.ABl),
      this.AddChild(this.DBl),
      this.AddChild(this.RBl),
      this.AddChild(this.PBl),
      await Promise.all([
        this.ABl.CreateByActorAsync(this.GetItem(0).GetOwner()),
        this.DBl.CreateByActorAsync(this.GetItem(1).GetOwner()).finally(),
        this.RBl.CreateByActorAsync(this.GetItem(2).GetOwner()),
        this.PBl.CreateByActorAsync(this.GetItem(3).GetOwner()).finally(),
      ]);
  }
  GetUsingItem(t) {
    var i = !t.GetLockState();
    if (0 === t.GetStyle()) {
      const s = i ? this.GetItem(0) : this.GetItem(2);
      return s.GetOwner();
    }
    const s = i ? this.GetItem(1) : this.GetItem(3);
    return s.GetOwner();
  }
  Update(t, i) {
    var s = !(this.Data = t).GetLockState(),
      e = t.GetStyle();
    (0 === e ? (s ? this.ABl : this.RBl) : s ? this.DBl : this.PBl).RefreshView(
      t,
    );
    let h = void 0;
    (h =
      0 === e
        ? s
          ? this.GetItem(0)
          : this.GetItem(2)
        : s
          ? this.GetItem(1)
          : this.GetItem(3)),
      this.xBl !== h && this.xBl?.SetUIActive(!1),
      (this.xBl = h),
      this.xBl?.SetUIActive(!0);
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.ActivityInstanceEntranceScrollItem = ActivityInstanceEntranceScrollItem;
class SubContentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.OnClickExtendToggle = (t) => {
        1 === t &&
          this.fGt.GetSelectCallBack()?.(this.fGt.GetSelectDataIndex());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [2, UE.UIText],
      [1, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  RefreshView(t) {
    (this.fGt = t),
      this.Oqe(this.fGt),
      this.NFe(this.fGt),
      this.e6e(this.fGt),
      this.wBl(this.fGt),
      this.Iwn(this.fGt);
  }
  Oqe(t) {
    t = t.GetSelectState();
    this.GetExtendToggle(0)?.SetToggleStateForce(t ? 1 : 0);
  }
  NFe(t) {
    t = t.GetLockState();
    this.GetItem(3).SetUIActive(t);
  }
  e6e(t) {
    t = t.GetFinishState();
    this.GetItem(4).SetUIActive(t);
  }
  wBl(t) {
    t = t.GetInstanceDifficultIconPath();
    t && this.SetTextureByPath(t, this.GetTexture(1));
  }
  Iwn(t) {
    var i;
    t.GetLockState()
      ? ((i = t.GetUnLockDesc()), this.GetText(2)?.SetText(i))
      : ((i = t.GetDesc()), this.GetText(2)?.SetText(i));
  }
}
class MainContentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.fGt = void 0),
      (this.BBl = (t) => {
        1 === t &&
          ((t = this.fGt.HaveChildData()),
          this.fGt.GetSelectCallBack()?.(this.fGt.GetSelectDataIndex()),
          t
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshActivityEntranceScroller,
                this.fGt.GetSelectUiLogicIndex(),
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshActivityEntranceItemContent,
                this.fGt.GetSelectUiLogicIndex(),
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [5, UE.UIItem],
      [7, UE.UIItem],
      [6, UE.UIItem],
      [4, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.BBl]]);
  }
  RefreshView(t) {
    (this.fGt = t),
      this.Oqe(t),
      this.bBl(t),
      this.NFe(t),
      this.e6e(t),
      this.qBl(t),
      this.wBl(t),
      this.mGe(t),
      this.GBl(t),
      this.kBl(t),
      this.HEl(t);
  }
  Oqe(t) {
    t = t.GetSelectState();
    this.GetExtendToggle(0)?.SetToggleStateForce(t ? 1 : 0);
  }
  bBl(t) {
    t = t.GetSelectState();
    this.GetItem(5)?.SetUIActive(t);
  }
  NFe(t) {
    t = t.GetLockState();
    this.GetItem(7).SetUIActive(t);
  }
  e6e(t) {
    t = t.GetFinishState();
    this.GetItem(6).SetUIActive(t);
  }
  qBl(t) {
    var i = t.HaveChildData(),
      t = t.GetSelectState();
    this.GetItem(1)?.SetUIActive(i && t);
  }
  wBl(t) {
    this.GetTexture(2)?.SetUIActive(!1);
    t = t.GetInstanceDifficultIconPath();
    t && this.SetTextureByPath(t, this.GetTexture(2));
  }
  mGe(t) {
    this.GetText(3)?.SetText("");
    t = t.GetInstanceName();
    "" !== t && this.GetText(3)?.SetText(t);
  }
  GBl(t) {
    var i;
    t.GetLockState()
      ? ((i = t.GetUnLockDesc()), this.GetText(8)?.SetText(i))
      : ((i = t.GetSubTitle()), this.GetText(8)?.SetText(i));
  }
  kBl(t) {
    t = t.HaveChildData();
    this.GetItem(4).SetUIActive(t);
  }
  HEl(t) {
    t = t.GetRedDotState();
    this.GetItem(9).SetUIActive(t);
  }
}
//# sourceMappingURL=ActivityInstanceEntranceScrollItem.js.map
