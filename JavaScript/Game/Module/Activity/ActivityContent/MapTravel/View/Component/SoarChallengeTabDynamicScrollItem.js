"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoarChallengeTabDynamicScrollItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class SoarChallengeTabDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.JZ = void 0),
      (this.fuo = void 0),
      (this.Data = void 0),
      (this.SelectedCallBack = void 0),
      (this.IsSelectedOn = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.JZ = new MapTravelTabItem()),
      await this.JZ.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.JZ.SelectedCallBack = this.SelectedCallBack),
      (this.fuo = new MapTravelTabItemLock()),
      await this.fuo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.fuo.SelectedCallBack = this.SelectedCallBack);
  }
  GetUsingItem(t) {
    return t.IsUnlock ? this.cma(1) : this.cma(0);
  }
  cma(t) {
    return this.GetItem(t).GetOwner();
  }
  Update(t, e) {
    (this.Data = t),
      this.fuo.SetUiActive(!t.IsUnlock),
      this.JZ.SetUiActive(t.IsUnlock),
      (t.IsUnlock ? this.JZ : this.fuo).RefreshByData(t),
      this.IsSelectedOn?.(t)
        ? this.SetSelected(!0, !1)
        : this.SetSelected(!1, !1);
  }
  SetSelected(t, e) {
    this.fuo.SetToggleState(t, !!e && !this.Data.IsUnlock),
      this.JZ.SetToggleState(t, !!e && this.Data.IsUnlock);
  }
  SetItemNewVisible(t) {
    this.Data?.IsUnlock && this.JZ.SetItemNewVisible(t);
  }
  BindSelectedCallBack(t) {
    this.SelectedCallBack = t;
  }
  BindIsSelectedOn(t) {
    this.IsSelectedOn = t;
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.SoarChallengeTabDynamicScrollItem = SoarChallengeTabDynamicScrollItem;
class MapTravelTabItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.SelectedCallBack = void 0),
      (this.AVl = () => {
        this.Data && this.SelectedCallBack?.(this.Data);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.AVl]]);
  }
  SetToggleState(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
}
class MapTravelTabItem extends MapTravelTabItemBase {
  RefreshByData(t) {
    (this.Data = t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameTextId),
      this.GetItem(2).SetUIActive(t.IsFinished),
      this.GetItem(3).SetUIActive(!t.IsUnlock),
      this.GetItem(4).SetUIActive(t.HasRedDot),
      this.GetItem(5).SetUIActive(t.IsUnlock && t.IsNew && !t.HasRedDot);
  }
  SetItemNewVisible(t) {
    this.GetItem(5).SetUIActive(t);
  }
}
class MapTravelTabItemLock extends MapTravelTabItemBase {
  OnStart() {
    this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(4).SetUIActive(!1);
  }
  RefreshByData(t) {
    (this.Data = t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameTextId);
  }
}
//# sourceMappingURL=SoarChallengeTabDynamicScrollItem.js.map
