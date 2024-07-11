"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ExploreProgressDefine_1 = require("../ExploreProgressDefine");
class ExploreAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.EVe = void 0),
      (this.yAt = void 0),
      (this.OnExtendToggleStateChanged = (e) => {
        this.EVe && this.EVe(this, this.Pe, e === 1);
      }),
      (this.DTt = () => !this.yAt || this.yAt());
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
    this.GetExtendToggle(4).CanExecuteChange.Bind(this.DTt);
  }
  OnBeforeDestroy() {
    (this.EVe = void 0),
      (this.yAt = void 0),
      this.GetExtendToggle(4).CanExecuteChange.Unbind();
  }
  Refresh(e) {
    const i = (this.Pe = e).AreaId;
    const t =
      ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
        ExploreProgressDefine_1.AREA_LEVEL,
      ) === i;
    const s = ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.NameId),
      this.GetText(2).SetText(Math.floor(e.Progress).toString() + "%"),
      this.GetItem(3).SetUIActive(!1),
      this.GetSprite(0).SetUIActive(t),
      this.SetSelected(s === i, !0);
  }
  BindCanExecuteChange(e) {
    this.yAt = e;
  }
  SetSelected(e, i) {
    e
      ? this.GetExtendToggle(4).SetToggleState(1, i)
      : this.GetExtendToggle(4).SetToggleState(0, i);
  }
  BindOnSelected(e) {
    this.EVe = e;
  }
}
exports.ExploreAreaItem = ExploreAreaItem;
// # sourceMappingURL=ExploreAreaItem.js.map
