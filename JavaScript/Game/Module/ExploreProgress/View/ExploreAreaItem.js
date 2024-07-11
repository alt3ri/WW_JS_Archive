"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ExploreProgressDefine_1 = require("../ExploreProgressDefine");
class ExploreAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.q6e = void 0),
      (this.LPt = void 0),
      (this.OnExtendToggleStateChanged = (e) => {
        this.q6e && this.q6e(this, this.Pe, 1 === e);
      }),
      (this.gke = () => !this.LPt || this.LPt());
  }
  Initialize(e) {
    this.CreateByActorAsync(e.GetOwner());
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
  Refresh(e) {
    var i = (this.Pe = e).AreaId,
      t =
        ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        ) === i,
      s = ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.NameId),
      this.GetText(2).SetText(Math.floor(e.Progress).toString() + "%"),
      this.GetItem(3).SetUIActive(!1),
      this.GetSprite(0).SetUIActive(t),
      this.SetSelected(s === i, !0);
  }
  BindCanExecuteChange(e) {
    this.LPt = e;
  }
  SetSelected(e, i) {
    e
      ? this.GetExtendToggle(4).SetToggleState(1, i)
      : this.GetExtendToggle(4).SetToggleState(0, i);
  }
  BindOnSelected(e) {
    this.q6e = e;
  }
}
exports.ExploreAreaItem = ExploreAreaItem;
//# sourceMappingURL=ExploreAreaItem.js.map
