"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MapDefine_1 = require("../Map/MapDefine");
class WorldMapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LevelEventDisableFlag = !1),
      (this.CustomMarkSize = 0),
      (this.MapScale = -0),
      (this.MapScaleMin = -0),
      (this.MapScaleMax = -0),
      (this.vFo = !1),
      (this.MFo = void 0),
      (this.CurrentFocalMarkType = 0),
      (this.CurrentFocalMarkId = 0),
      (this.IsBattleViewOpen = !1),
      (this.SFo = void 0);
  }
  get HideCustomMarks() {
    return (
      !(
        !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() ||
        ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
      ) || this.vFo
    );
  }
  set HideCustomMarks(e) {
    (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
      (this.vFo = e);
  }
  get WaitToTeleportMarkItem() {
    return this.MFo;
  }
  set WaitToTeleportMarkItem(e) {
    this.MFo = e;
  }
  OnInit() {
    return (
      (this.CustomMarkSize =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetCommonValue(
          "custom_mark_size",
        )),
      this.ResetMapScale(),
      !(this.HideCustomMarks = !1)
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
    return (t =
      t || r === MapDefine_1.BIG_WORLD_MAP_ID
        ? t
        : ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
            MapDefine_1.BIG_WORLD_MAP_ID,
            e,
          )?.Transform[0])
      ? Vector_1.Vector.Create(t.X, t.Y, t.Z)
      : Vector_1.Vector.Create(0, 0, 0);
  }
  GetEntityAreaId(e) {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetEntityData(e)?.AreaId ?? 0
    );
  }
  UpdateAreaExploreInfo(e) {
    if (e) {
      var r = new Array();
      for (const t of e.e5n)
        r.push({ ExploreProgressId: t._Ls, ExplorePercent: t.lLs });
      this.SFo = { AreaId: e.wFn, ExploreProgress: r, ExplorePercent: e.lLs };
    }
  }
  GetAreaExploreInfo() {
    return this.SFo;
  }
}
exports.WorldMapModel = WorldMapModel;
//# sourceMappingURL=WorldMapModel.js.map
