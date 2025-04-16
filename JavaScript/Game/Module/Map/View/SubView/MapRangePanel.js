"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRangePanel = void 0);
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MarkRangeImageComponent_1 = require("../../Marks/MarkItemView/Components/MarkRangeImageComponent");
class MapRangePanel {
  constructor(e) {
    (this.Map = e),
      (this.jnn = void 0),
      (this.TRi = void 0),
      (this.VGc = void 0),
      (this.jGc = void 0),
      (this.HGc = void 0),
      (this.h2l = () => {
        this.SetRangeComponentHide();
      }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HideNavigateMarkRange,
        this.h2l,
      );
  }
  async wNl() {
    this.jnn ||
      ((this.jnn = new MarkRangeImageComponent_1.MarkRangeImageComponent()),
      (this.TRi = this.jnn.CreateThenShowByResourceIdAsync(
        "UiItem_MarkArea_Prefab",
        this.Map.GetRootItem(),
        !0,
      ))),
      await this.TRi;
  }
  async SetRangeComponentShow(e, t, i) {
    await this.wNl();
    var a =
      t && i
        ? 0
        : ConfigManager_1.ConfigManager.CommonConfig.GetPlayPointTrackRange();
    this.jnn?.SetUiActive(!0),
      this.jnn?.GetRootItem().SetAnchorOffset(e.ToUeVector2D(!0)),
      this.jnn?.RangeArea.SetWidth(t ?? a),
      this.jnn?.RangeArea.SetHeight(i ?? a),
      (ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo = {
        Position: e,
        Width: t,
        Height: i,
        MapId: this.Map.MapId,
        Gravity: this.Map.MapGravity,
      });
  }
  async SetRangeComponentHide() {
    await this.BNl(),
      this.jnn?.SetUiActive(!1),
      (ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo = void 0);
  }
  async BNl() {
    await this.TRi;
  }
  CheckExploreMarkRangeInfo() {
    var e = ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo;
    e &&
      e.MapId === this.Map.MapId &&
      e.Gravity === this.Map.MapGravity &&
      (this.Fx_()
        ? this.SetRangeComponentHide()
        : this.SetRangeComponentShow(e.Position, e.Width, e.Height));
  }
  MiniMapUpdate() {
    var e = ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo;
    e && e.MapId === this.Map.MapId && e.Gravity === this.Map.MapGravity
      ? (this.VGc?.X === e.Position.X &&
          this.VGc?.Y === e.Position.Y &&
          this.HGc === e.Gravity &&
          this.jGc === e.MapId &&
          !this.Fx_()) ||
        (this.CheckExploreMarkRangeInfo(),
        (this.VGc = Vector2D_1.Vector2D.Create(e.Position.X, e.Position.Y)),
        (this.HGc = e.Gravity),
        (this.jGc = e.MapId))
      : this.SetRangeComponentHide();
  }
  Fx_() {
    var e,
      t = ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo;
    return (
      !!t &&
      (!!t.IsDiscover ||
        (!!(t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(
          t.MarkId,
        )) &&
          ((e = t.RelativeDungeonId),
          (t = t.RelativeId),
          ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayDiscover(
            e,
            t,
          ))))
    );
  }
  Destroy() {
    this.jnn &&
      ((this.jnn.SkipDestroyActor = !1),
      this.jnn.Destroy(),
      (this.jnn = void 0)),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HideNavigateMarkRange,
        this.h2l,
      );
  }
}
exports.MapRangePanel = MapRangePanel;
//# sourceMappingURL=MapRangePanel.js.map
