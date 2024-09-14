"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class WorldMapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LevelEventDisableFlag = !1),
      (this.CustomMarkSize = 0),
      (this.MapScale = -0),
      (this.MapScaleMin = -0),
      (this.MapScaleMax = -0),
      (this.g3o = !1),
      (this.f3o = void 0),
      (this.CurrentFocalMarkType = 0),
      (this.CurrentFocalMarkId = 0),
      (this.WorldMapMapId = void 0),
      (this.IsBattleViewOpen = !1),
      (this.p3o = void 0);
  }
  get HideCustomMarks() {
    return this.g3o;
  }
  set HideCustomMarks(e) {
    this.g3o = e;
  }
  get WaitToTeleportMarkItem() {
    return this.f3o;
  }
  set WaitToTeleportMarkItem(e) {
    this.f3o = e;
  }
  OnInit() {
    return (
      (this.CustomMarkSize =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetCommonValue(
          "custom_mark_size",
        )),
      this.ResetMapScale(),
      (this.HideCustomMarks = !1),
      !(this.WorldMapMapId = void 0)
    );
  }
  OnLeaveLevel() {
    return !0;
  }
  ResetMapScale() {
    this.MapScale =
      (ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(1)
        ?.BigMapDefaultScale ?? 0) / 100;
    var e = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(1);
    e &&
      ((this.MapScaleMax = e.BigMapMaxScale / e.BigMapDefaultScale),
      (this.MapScaleMin = e.BigMapMinScale / e.BigMapDefaultScale));
  }
  GetEntityPosition(e, r) {
    let t =
      ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
        r,
        e,
      )?.Transform[0];
    return (
      t ||
        ConfigManager_1.ConfigManager.WorldMapConfig.IsInBigWorld(r) ||
        ((r = ModelManager_1.ModelManager.GameModeModel.MapId),
        (t =
          ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
            r,
            e,
          )?.Transform[0])),
      t
        ? Vector_1.Vector.Create(t.X, t.Y, t.Z)
        : Vector_1.Vector.Create(0, 0, 0)
    );
  }
  GetEntityAreaId(e) {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetEntityData(e)?.AreaId ?? 0
    );
  }
  UpdateAreaExploreInfo(e) {
    if (e) {
      var r = new Array();
      for (const t of e.HVn)
        r.push({ ExploreProgressId: t.qPs, ExplorePercent: t.BPs });
      this.p3o = { AreaId: e.p6n, ExploreProgress: r, ExplorePercent: e.BPs };
    }
  }
  GetAreaExploreInfo() {
    return this.p3o;
  }
}
exports.WorldMapModel = WorldMapModel;
//# sourceMappingURL=WorldMapModel.js.map
