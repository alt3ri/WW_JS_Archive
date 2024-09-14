"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DetectorPanel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel");
class DetectorPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.ZAt = void 0),
      (this.oza = void 0),
      (this.T2o = () => {
        MapController_1.MapController.RequestRemoveDynamicMapMark(
          this.u2o.MarkId,
        ),
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
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner());
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.T2o);
  }
  OnBeforeDestroy() {
    this.ZAt.Destroy(), this.oza.Destroy();
  }
  OnShowWorldMapSecondaryUi(t) {
    (this.u2o = t), this.L2o();
    t =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "TreasureBoxDetectionMaxNum",
      ) ?? 0;
    this.GetText(1).SetText(
      StringUtils_1.StringUtils.Format(
        "{0}{1}/{2}",
        this.u2o.GetTitleText(),
        ModelManager_1.ModelManager.MapModel.GetMarkCountByType(17).toString(),
        t.toString(),
      ),
    ),
      this.GetText(4).SetText(this.u2o.GetDescText()),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!0),
      this.GetItem(26).SetUIActive(!1),
      this.GetItem(25).SetUIActive(!1),
      this.GetItem(32).SetUIActive(!1),
      this.oza.SetUiActive(!1);
  }
  L2o() {
    this.u2o && this.ZAt.SetLocalTextNew("Text_TeleportDelete_Text");
  }
}
exports.DetectorPanel = DetectorPanel;
//# sourceMappingURL=DetectorPanel.js.map
