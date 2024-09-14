"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingMemoryView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../../../Common/Button/ButtonItem"),
  BuildingMapMoveComponent_1 = require("../Build/BuildingMapMoveComponent"),
  BuildingMapTileModule_1 = require("../Build/BuildingMapTileModule");
class MoonChasingMemoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.kDn = void 0),
      (this.o4o = void 0),
      (this.lqe = void 0),
      (this.Cho = void 0),
      (this.v7s = []),
      (this.M7s = () => {
        UiManager_1.UiManager.OpenView("MoonChasingMemoryDetailView", this.v7s),
          ModelManager_1.ModelManager.MoonChasingModel.RemoveMemoryRedDot();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIDraggableComponent],
    ];
  }
  async OnBeforeStartAsync() {
    await ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonAllDataRequest(),
      await this.JDn(),
      this.S7s(),
      this.VKs(),
      (this.v7s =
        await ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonMemoryInfoRequest());
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      });
  }
  OnBeforeShow() {
    var e =
      ModelManager_1.ModelManager.MoonChasingModel.CheckMemoryRedDotState();
    this.Cho.SetRedDotVisible(e);
  }
  OnBeforeDestroy() {
    this.o4o.Destroy();
  }
  VKs() {
    (this.Cho = new ButtonItem_1.ButtonItem(this.GetItem(1))),
      this.Cho.SetFunction(this.M7s);
  }
  S7s() {
    this.o4o = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(
      this.GetDraggable(2),
      !1,
      !1,
    );
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig(
      "MoonFiestaMapSizeParam",
    );
    this.o4o.SetScaleSafeArea(e, 2), this.o4o.SetScale(e, 4);
  }
  async JDn() {
    (this.kDn = new BuildingMapTileModule_1.BuildingMapTileModule(!1, !0)),
      await this.kDn.CreateThenShowByActorAsync(
        this.GetDraggable(2).GetOwner(),
      ),
      this.kDn.SetAllBuildingExhibitionMode(!0);
  }
}
exports.MoonChasingMemoryView = MoonChasingMemoryView;
//# sourceMappingURL=MoonChasingMemoryView.js.map
