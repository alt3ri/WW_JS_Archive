"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BoxPanel = void 0);
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine");
class BoxPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments), (this.u2o = void 0);
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
    this.RootItem.SetRaycastTarget(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.u2o = e),
      this.GetText(1).SetText(this.u2o.GetTitleText()),
      this.GetText(4).SetText(this.u2o.GetDescText()),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetButton(11).RootUIComp.SetUIActive(!1);
  }
}
exports.BoxPanel = BoxPanel;
//# sourceMappingURL=BoxPanel.js.map
