"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionCommonItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RoleVisionCommonItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i, s = !1) {
    super(),
      (this.AnimationState = !1),
      (this.CurrentIndex = void 0),
      (this.CurrentData = void 0),
      (this.RoleId = 0),
      (this.ShowType = 0),
      (this.wqe = void 0),
      (this.NeedRedDot = !1),
      (this.OnDragItemDragBegin = () => {
        this.OnDragBegin();
      }),
      (this.OnDragItemDragEnd = () => {
        this.OnDragEnd();
      }),
      (this.OnClickVision = () => {}),
      (this.OnUnOverlay = () => {
        this.OnItemUnOverlay();
      }),
      (this.OnOverlay = () => {
        this.OnItemOverlay();
      }),
      (this.OnScrollToScrollView = () => {
        this.OnScrollToScrollViewEvent();
      }),
      (this.OnRemoveFromScrollView = () => {
        this.OnRemoveFromScrollViewEvent();
      }),
      (this.CurrentIndex = e),
      (this.wqe = t),
      (this.RoleId = i),
      (this.NeedRedDot = s);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner()), this.SetUiActive(!0);
  }
  OnDragBegin() {}
  OnDragEnd() {}
  SetShowType(t) {
    this.ShowType = t;
  }
  ResetPosition() {
    this.OnResetPosition();
  }
  OnResetPosition() {}
  SetAnimationState(t) {
    (this.AnimationState = t), this.OnChangeAnimationState();
  }
  OnChangeAnimationState() {}
  GetCurrentIndex() {
    return this.CurrentIndex;
  }
  GetCurrentData() {
    return this.CurrentData;
  }
  SetAniLightState(t) {}
  UpdateItem(t) {
    (this.CurrentData = t),
      this.xCo(t),
      this.Kbe(t),
      this.BGt(t),
      this.OnUpdateItem(t);
  }
  Kbe(t) {
    this.GetVisionTextureComponent().SetUIActive(void 0 !== t),
      t &&
        ((t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          t.GetConfigId(!0),
        )),
        this.SetTextureByPath(
          t.IconMiddle,
          this.GetVisionTextureComponent(),
          "VisionEquipmentView",
        ));
  }
  BGt(t) {
    this.GetVisionQualitySprite().SetUIActive(void 0 !== t);
  }
  PlaySequence(t) {
    this.OnPlaySequence(t);
  }
  OnPlaySequence(t) {}
  xCo(t) {}
  SetSelected() {
    this.OnSelected();
  }
  OnSelected() {}
  SetUnSelected() {
    this.OnUnSelected();
  }
  OnUnSelected() {}
  OnUpdateItem(t) {}
  OnItemUnOverlay() {}
  OnScrollToScrollViewEvent() {}
  OnRemoveFromScrollViewEvent() {}
  OnItemOverlay() {}
  OnBeforeDestroy() {
    this.OnBeforeClearComponent();
  }
  SetToggleState(t, e = !1, i = !1) {
    this.GetSelectToggle().ToggleState !== t &&
      this.GetSelectToggle().SetToggleStateForce(t, e, i);
  }
  OnBeforeClearComponent() {}
}
exports.RoleVisionCommonItem = RoleVisionCommonItem;
//# sourceMappingURL=RoleVisionCommonItem.js.map
