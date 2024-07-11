"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralPanel = void 0);
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const MapController_1 = require("../../../Map/Controller/MapController");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapDefine_1 = require("../../WorldMapDefine");
class GeneralPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.dko = void 0),
      (this.$Ut = void 0),
      (this.Rko = () => {
        MapController_1.MapController.RequestTrackMapMark(
          this.dko.MarkType,
          this.dko.MarkId,
          !this.dko.IsTracked,
        ),
          this.Uko(),
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
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.$Ut.SetFunction(this.Rko);
  }
  OnShowWorldMapSecondaryUi(t) {
    (this.dko = t),
      this.Uko(),
      this.GetText(1).SetText(this.dko.GetTitleText()),
      this.GetText(4).ShowTextNew(this.dko.MarkConfig.MarkDesc),
      this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
      this.GetItem(12).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1);
    var t = this.dko.GetAreaText();
    const e = void 0 !== t;
    this.GetText(3).SetUIActive(e),
      this.GetItem(22).SetUIActive(e),
      e && this.GetText(3).SetText(t),
      this.RootItem.SetUIActive(!0);
  }
  Uko() {
    this.dko &&
      this.$Ut.SetLocalText(
        this.dko.IsTracked
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
  OnBeforeDestroy() {
    this.$Ut.Destroy();
  }
}
exports.GeneralPanel = GeneralPanel;
// # sourceMappingURL=GeneralPanel.js.map
