"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralPanel = void 0);
const ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine");
class GeneralPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.ZAt = void 0),
      (this.T2o = () => {
        MapController_1.MapController.RequestTrackMapMark(
          this.u2o.MarkType,
          this.u2o.MarkId,
          !this.u2o.IsTracked,
        ),
          this.L2o(),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.T2o);
  }
  OnShowWorldMapSecondaryUi(t) {
    (this.u2o = t),
      this.L2o(),
      this.GetText(1).SetText(this.u2o.GetTitleText()),
      this.GetText(4).ShowTextNew(this.u2o.MarkConfig.MarkDesc),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetItem(12).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1);
    var t = this.u2o.GetAreaText(),
      e = void 0 !== t;
    this.GetText(3).SetUIActive(e),
      this.GetItem(22).SetUIActive(e),
      e && this.GetText(3).SetText(t),
      this.RootItem.SetUIActive(!0);
  }
  L2o() {
    this.u2o &&
      this.ZAt.SetLocalText(
        this.u2o.IsTracked
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
  OnBeforeDestroy() {
    this.ZAt.Destroy();
  }
}
exports.GeneralPanel = GeneralPanel;
//# sourceMappingURL=GeneralPanel.js.map
