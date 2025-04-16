"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelTabDynamicScrollItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MapTravelTabDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ActivityBaseData = t),
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
    (this.JZ = new MapTravelTabItem(this.ActivityBaseData)),
      await this.JZ.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.JZ.SelectedCallBack = this.SelectedCallBack),
      (this.fuo = new MapTravelTabItemLock(this.ActivityBaseData)),
      await this.fuo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.fuo.SelectedCallBack = this.SelectedCallBack);
  }
  GetUsingItem(t) {
    return t.IsUnlock ? this.cma(1) : this.cma(0);
  }
  cma(t) {
    return this.GetItem(t).GetOwner();
  }
  Update(t, i) {
    (this.Data = t),
      this.fuo.SetUiActive(!t.IsUnlock),
      this.JZ.SetUiActive(t.IsUnlock),
      (t.IsUnlock ? this.JZ : this.fuo).RefreshByData(t, i),
      this.IsSelectedOn?.(t, i)
        ? this.SetSelected(!0, !1)
        : this.SetSelected(!1, !1);
  }
  SetSelected(t, i) {
    this.fuo.SetToggleState(t, !!i && !this.Data.IsUnlock),
      this.JZ.SetToggleState(t, !!i && this.Data.IsUnlock);
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
exports.MapTravelTabDynamicScrollItem = MapTravelTabDynamicScrollItem;
class MapTravelTabItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ActivityBaseData = t),
      (this.Data = void 0),
      (this.Index = 0),
      (this.SelectedCallBack = void 0),
      (this.AVl = () => {
        this.Data && this.SelectedCallBack?.(this.Data, this.Index);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.AVl]]);
  }
  SetToggleState(t, i) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, i);
  }
  RefreshByData(t, i) {
    (this.Data = t), (this.Index = i);
  }
}
class MapTravelTabItem extends MapTravelTabItemBase {
  RefreshByData(t, i) {
    super.RefreshByData(t, i);
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t.AreaId),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Title),
        this.ActivityBaseData.IsAreaTaskFinish(t.AreaId)),
      s = this.ActivityBaseData.GetAreaRewardState(t.AreaId);
    this.GetItem(2).SetUIActive(i),
      this.GetItem(3).SetUIActive(!t.IsUnlock),
      this.GetItem(4).SetUIActive(s);
  }
}
class MapTravelTabItemLock extends MapTravelTabItemBase {
  OnStart() {
    this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(4).SetUIActive(!1);
  }
  RefreshByData(t, i) {
    super.RefreshByData(t, i);
    i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t.AreaId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Title);
  }
}
//# sourceMappingURL=MapTravelTabDynamicScrollItem.js.map
