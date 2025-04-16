"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentAreaPanel = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MapLogger_1 = require("../../../Map/Misc/MapLogger"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class EnrichmentAreaPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.OnDelBtnClick = () => {
        this.u2o &&
          (MapController_1.MapController.RequestTrackEnrichmentArea(),
          this.Close());
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.LayoutContext.ConfirmButtonItem.SetUiActive(!1),
      this.LayoutContext.DelButton.RootUIComp.SetUIActive(!0);
  }
  OnShowWorldMapSecondaryUi(r) {
    (this.u2o = r),
      (this.LayoutContext.MarkItem = r),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(
        this.LayoutContext,
      );
    var r = this.u2o.MarkConfig.MarkTitle,
      e = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
        this.u2o.GetEnrichmentItemNameId(),
      ),
      r =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r, e),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByServerMarkItem(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
          this.LayoutContext,
        ),
        this.u2o.MarkConfig.MarkDesc);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r, e),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.UpdateRightDownIconActive(),
      this.UpdateTopRightIconByTeleportState(),
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
exports.EnrichmentAreaPanel = EnrichmentAreaPanel;
//# sourceMappingURL=EnrichmentAreaPanel.js.map
