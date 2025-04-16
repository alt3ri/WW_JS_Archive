"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.addMarkFilterInTeamModeSet =
    exports.serverMarkIgnoreReadConfigSet =
    exports.Circle =
    exports.FishingPointMarkCreateInfo =
    exports.FishingShipMarkCreateInfo =
    exports.FISHING_SHIP_MARK_ID =
    exports.PlayerMarkCreateInfo =
    exports.QuestMarkCreateInfo =
    exports.DynamicMarkCreateInfo =
    exports.ConfigMarkCreateInfo =
    exports.MarkCreateInfo =
    exports.WORLD_MAP_MAX_SCALE =
    exports.DEFAULT_MAP_BORDER_ID =
    exports.DETAIL_TILE_SPACE =
    exports.HHA_BIG_WORLD_MAP_ID =
    exports.BIG_WORLD_MAP_ID =
    exports.MARK_WORLD_TO_HASH_SCALE =
    exports.MARK_HASH_XY_PANDING =
    exports.MARK_SCOPE =
    exports.UNIT =
    exports.MINI_MAP_UPDATE_GAP =
    exports.MINI_MAP_RADIUS =
    exports.DETAIL_TILE_REALSIZE =
    exports.worldToScreenScale =
    exports.world2UiUnit =
    exports.FLOAT_0_01 =
      void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
(exports.FLOAT_0_01 = 0.01),
  (exports.world2UiUnit = Vector_1.Vector.Create(
    exports.FLOAT_0_01,
    -exports.FLOAT_0_01,
    exports.FLOAT_0_01,
  )),
  (exports.worldToScreenScale = Vector2D_1.Vector2D.Create(
    exports.FLOAT_0_01,
    -exports.FLOAT_0_01,
  )),
  (exports.DETAIL_TILE_REALSIZE = 850),
  (exports.MINI_MAP_RADIUS = 200),
  (exports.MINI_MAP_UPDATE_GAP = 20),
  (exports.UNIT = 100),
  (exports.MARK_SCOPE = 50),
  (exports.MARK_HASH_XY_PANDING = 1e5),
  (exports.MARK_WORLD_TO_HASH_SCALE = 0.01),
  (exports.BIG_WORLD_MAP_ID = 8),
  (exports.HHA_BIG_WORLD_MAP_ID = 900),
  (exports.DETAIL_TILE_SPACE = Math.round(exports.DETAIL_TILE_REALSIZE)),
  (exports.DEFAULT_MAP_BORDER_ID = 1),
  (exports.WORLD_MAP_MAX_SCALE = 2.5);
class MarkCreateInfo {
  constructor(e) {
    this.CreateType = e;
  }
}
class ConfigMarkCreateInfo extends (exports.MarkCreateInfo = MarkCreateInfo) {
  constructor(e, t) {
    super(0),
      (this.MarkConfig = e),
      void (this.MarkId = 0) === t && (this.MarkId = e.MarkId);
  }
}
exports.ConfigMarkCreateInfo = ConfigMarkCreateInfo;
class DynamicMarkCreateInfo extends MarkCreateInfo {
  constructor(e) {
    super(1),
      (this.CreateParams = void 0),
      (this.CreateParams = e),
      void 0 === this.CreateParams.MapAndDungeonInfo &&
        (this.CreateParams.MapAndDungeonInfo = {
          MapConfigId: exports.BIG_WORLD_MAP_ID,
        });
    let t = this.CreateParams.MapAndDungeonInfo?.MapConfigId;
    0 === t && (t = exports.BIG_WORLD_MAP_ID),
      (this.CreateParams.MapAndDungeonInfo.MapConfigId =
        t ??
        ConfigManager_1.ConfigManager.MapConfig.SearchMapConfigByType(
          this.CreateParams.MarkConfigId,
          e.MarkType,
        )?.MapId);
    var r = this.CreateParams.MapAndDungeonInfo.DungeonId;
    this.CreateParams.MapAndDungeonInfo.DungeonId =
      r ??
      ConfigManager_1.ConfigManager.MapConfig.SearchMarkInstanceDungeonId(
        this.CreateParams.MarkConfigId,
        e.MarkType,
      );
  }
  get TrackTarget() {
    return this.CreateParams.TrackTarget;
  }
  set TrackTarget(e) {
    this.CreateParams.TrackTarget = e;
  }
  get MarkConfigId() {
    return this.CreateParams.MarkConfigId;
  }
  set MarkConfigId(e) {
    this.CreateParams.MarkConfigId = e;
  }
  get MarkType() {
    return this.CreateParams.MarkType;
  }
  get MarkId() {
    return this.CreateParams.MarkId;
  }
  set MarkId(e) {
    this.CreateParams.MarkId = e;
  }
  get TrackSource() {
    return this.CreateParams.TrackSource;
  }
  get DestroyOnUnTrack() {
    return this.CreateParams.DestroyOnUnTrack ?? !1;
  }
  get TeleportId() {
    return this.CreateParams.TeleportId;
  }
  set TeleportId(e) {
    this.CreateParams.TeleportId = e;
  }
  get EntityConfigId() {
    return this.CreateParams.EntityConfigId;
  }
  get AreaId() {
    return this.CreateParams.AreaId;
  }
  set AreaId(e) {
    this.CreateParams.AreaId = e;
  }
  get IsServerDisable() {
    return this.CreateParams.IsServerDisable ?? !1;
  }
  set IsServerDisable(e) {
    this.CreateParams.IsServerDisable = e;
  }
  get MapId() {
    return this.CreateParams.MapAndDungeonInfo.MapConfigId;
  }
  get InstanceDungeonId() {
    return this.CreateParams.MapAndDungeonInfo.DungeonId;
  }
  get MapGravity() {
    if (void 0 !== this.CreateParams.Gravity) return this.CreateParams.Gravity;
    if (void 0 !== this.EntityConfigId) {
      var e =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetEntityGravityDirection(
          this.MapId,
          this.EntityConfigId,
        );
      if (0 !== e) return e;
    }
    return 9 !== this.MarkType &&
      ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(this.MapId)
      ? 1
      : 0;
  }
}
class QuestMarkCreateInfo extends (exports.DynamicMarkCreateInfo =
  DynamicMarkCreateInfo) {
  get TreeId() {
    return this.CreateParams.TreeId;
  }
  get NodeId() {
    return this.CreateParams.NodeId;
  }
  constructor(e) {
    void 0 !== e.MapAndDungeonInfo &&
      (e.MapAndDungeonInfo.MapConfigId = e.MapAndDungeonInfo.DungeonId),
      super(e);
  }
}
exports.QuestMarkCreateInfo = QuestMarkCreateInfo;
class PlayerMarkCreateInfo extends MarkCreateInfo {
  constructor(e, t, r, s, o = 1) {
    super(2),
      (this.PlayerId = e),
      (this.PlayerIndex = t),
      (this.Position = r),
      (this.MapId = s),
      (this.Gravity = o);
  }
}
(exports.PlayerMarkCreateInfo = PlayerMarkCreateInfo),
  (exports.FISHING_SHIP_MARK_ID = 8);
class FishingShipMarkCreateInfo extends DynamicMarkCreateInfo {
  constructor(e) {
    super(e);
  }
}
exports.FishingShipMarkCreateInfo = FishingShipMarkCreateInfo;
class FishingPointMarkCreateInfo extends DynamicMarkCreateInfo {
  get FishPointDetectSourceType() {
    return this.CreateParams.FishPointDetectSourceType;
  }
  constructor(e) {
    super(e);
  }
}
exports.FishingPointMarkCreateInfo = FishingPointMarkCreateInfo;
class Circle {
  constructor(e = 0, t = 0, r = 0) {
    (this.X = e), (this.Y = t), (this.R = r);
  }
}
(exports.Circle = Circle),
  (exports.serverMarkIgnoreReadConfigSet = new Set([12, 9, 22, 23])),
  (exports.addMarkFilterInTeamModeSet = new Set([
    Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint,
    Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_SoundBox,
    Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HookLockSoundBox,
    Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_CalmingWindBell,
  ]));
//# sourceMappingURL=MapDefine.js.map
