"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DetectorPanel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MapLogger_1 = require("../../../Map/Misc/MapLogger"),
  MapExploreToolController_1 = require("../../../MapExploreTool/MapExploreToolController"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class DetectorPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.OnDelBtnClick = () => {
        var r = ModelManager_1.ModelManager.MapModel.GetBoxSlotInfoByMarkId(
          this.u2o.MarkId,
        );
        r &&
          (MapExploreToolController_1.MapExploreToolController.RemoveTreasureBoxSlotRequest(
            r.b7n,
          ),
          this.Close());
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.LayoutContext.DelButton.RootUIComp.SetUIActive(!0),
      this.LayoutContext.ConfirmButtonItem.SetUiActive(!1);
  }
  OnShowWorldMapSecondaryUi(r) {
    (this.u2o = r), (this.LayoutContext.MarkItem = r);
    var e =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "TreasureBoxDetectionMaxNum",
      ) ?? 0;
    this.GetText(1).SetText(
      StringUtils_1.StringUtils.Format(
        "{0}{1}/{2}",
        this.u2o.GetTitleText(),
        ModelManager_1.ModelManager.MapModel.GetMarkCountByType(17).toString(),
        e.toString(),
      ),
    ),
      this.LayoutContext.DescriptionText.SetText(r.GetDescText()),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
      this.UpdateQuickGotoActive(!0);
  }
  HandleTrack() {
    var r = this.LayoutContext.MarkItem;
    r &&
      (this.CheckAndShowCrossMapTips(r),
      MapLogger_1.MapLogger.Debug(
        63,
        "[地图系统]->追踪",
        ["markId", r.MarkId],
        ["IsTracked", r.IsTracked],
      ),
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: r.MarkType,
        MarkId: r.MarkId,
        Track: !r.IsTracked,
        TrackMode: 0,
      }),
      this.Close());
  }
}
exports.DetectorPanel = DetectorPanel;
//# sourceMappingURL=DetectorPanel.js.map
