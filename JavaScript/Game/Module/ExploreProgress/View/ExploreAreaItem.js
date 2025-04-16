"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  MapUtil_1 = require("../../Map/MapUtil"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.q6e = void 0),
      (this.LPt = void 0),
      (this.OnExtendToggleStateChanged = (i) => {
        this.q6e && this.q6e(this, this.Pe, 1 === i);
      }),
      (this.gke = () => !this.LPt || this.LPt());
  }
  Initialize(i) {
    this.CreateByActorAsync(i.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[4, this.OnExtendToggleStateChanged]]);
  }
  OnStart() {
    this.GetExtendToggle(4).CanExecuteChange.Bind(this.gke);
  }
  OnBeforeDestroy() {
    (this.q6e = void 0),
      (this.LPt = void 0),
      this.GetExtendToggle(4).CanExecuteChange.Unbind();
  }
  Refresh(i) {
    var e = (this.Pe = i).AreaId,
      t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId() === e,
      s = ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.NameId),
      this.GetText(2).SetText(Math.floor(i.Progress).toString() + "%"),
      this.GetItem(3).SetUIActive(!1),
      this.GetSprite(0).SetUIActive(t),
      this.SetSelected(s === e, !0);
  }
  BindCanExecuteChange(i) {
    this.LPt = i;
  }
  SetSelected(i, e) {
    i
      ? this.GetExtendToggle(4).SetToggleState(1, e)
      : this.GetExtendToggle(4).SetToggleState(0, e);
  }
  BindOnSelected(i) {
    this.q6e = i;
  }
}
exports.ExploreAreaItem = ExploreAreaItem;
//# sourceMappingURL=ExploreAreaItem.js.map
