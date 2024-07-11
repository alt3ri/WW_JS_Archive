"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingMainModule = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LongPressButton_1 = require("../../../../../Util/LongPressButton"),
  BuildingMapMoveComponent_1 = require("./BuildingMapMoveComponent"),
  BuildingMapTileModule_1 = require("./BuildingMapTileModule");
class BuildingMainModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.kDn = void 0),
      (this.o4o = void 0),
      (this.Hwt = void 0),
      (this.ZoomIn = void 0),
      (this.ZoomOut = void 0),
      (this.Djs = (i) => {
        3 !== i && this.Hwt.SetValue(this.o4o.MapScale, !1);
      }),
      (this.P4o = () => {
        this.o4o.LongPressScroll(-this.o4o.ScaleStep);
      }),
      (this.w4o = () => {
        this.o4o.LongPressScroll(this.o4o.ScaleStep);
      }),
      (this.rHs = (i) => {
        this.o4o.SliderScroll(i);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDraggableComponent],
      [1, UE.UIItem],
      [2, UE.UISliderComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
    ];
  }
  async JDn() {
    (this.kDn = new BuildingMapTileModule_1.BuildingMapTileModule(!0, !1)),
      await this.kDn.CreateThenShowByActorAsync(
        this.GetDraggable(0).GetOwner(),
      ),
      this.kDn.SetBuildingItemActive(!1);
  }
  X9s() {
    (this.o4o = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(
      this.GetDraggable(0),
    )),
      this.o4o.SetScaleSafeArea(0.45, 0.6),
      this.o4o.SetChangeScaleCallback(this.Djs);
  }
  nHs() {
    (this.Hwt = this.GetSlider(2)),
      this.Hwt.SetMinValue(this.o4o.MapScaleSafeArea.Min, !1, !1),
      this.Hwt.SetMaxValue(this.o4o.MapScaleSafeArea.Max, !1, !1),
      this.Hwt.OnValueChangeCb.Bind(this.rHs),
      this.Hwt.SetValue(this.o4o.MapScaleSafeArea.Min, !0),
      (this.ZoomIn = new LongPressButton_1.LongPressButton(
        this.GetButton(3),
        this.w4o,
      )),
      (this.ZoomOut = new LongPressButton_1.LongPressButton(
        this.GetButton(4),
        this.P4o,
      )),
      this.GetItem(1)?.SetUIActive(!1);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.JDn()]);
  }
  OnStart() {
    this.X9s(), this.nHs();
  }
  RefreshModule() {
    this.kDn.RefreshRole();
  }
  OnBeforeShow() {
    this.o4o.BindTouch(), this.o4o.AddGamepadEvent();
  }
  OnAfterHide() {
    this.o4o.UnbindTouch(), this.o4o.RemoveGamepadEvent();
  }
  OnBeforeDestroy() {
    this.o4o.Destroy();
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    return this.kDn.GetGuideUiItemAndUiItemForShowEx(i);
  }
  HideBuildingModule() {
    this.GetItem(1)?.SetUIActive(!1), this.kDn.SetBuildingItemActive(!1);
  }
  ShowBuilding() {
    this.GetItem(1)?.SetUIActive(!0), this.kDn.SetBuildingItemActive(!0);
  }
  RefreshBuilding(i) {
    this.kDn.RefreshBuildingItem(i);
  }
}
exports.BuildingMainModule = BuildingMainModule;
//# sourceMappingURL=BuildingMainModule.js.map
