"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerMarkCreateInfo =
    exports.TemporaryTeleportMarkCreateInfo =
    exports.QuestMarkCreateInfo =
    exports.DynamicMarkCreateInfo =
    exports.ConfigMarkCreateInfo =
    exports.MarkCreateInfo =
    exports.WORLD_MAP_MAX_SCALE =
    exports.DEFAULT_MAP_BORDER_ID =
    exports.DETAIL_TILE_SPACE =
    exports.BIG_WORLD_MAP_ID =
    exports.MARK_HASH_XY_PANDING =
    exports.MARK_SCOPE =
    exports.UNIT =
    exports.MINI_MAP_UPDATE_GAP =
    exports.MINI_MAP_RADIUS =
    exports.DETAIL_TILE_REALSIZE =
    exports.worldToScreenScale =
    exports.world2UiUnit =
    exports.FLOAT_0_01 =
    exports.CALMING_WIND_BELL_MARKID =
      void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
(exports.CALMING_WIND_BELL_MARKID = 2),
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
  (exports.BIG_WORLD_MAP_ID = 8),
  (exports.DETAIL_TILE_SPACE = Math.round(exports.DETAIL_TILE_REALSIZE)),
  (exports.DEFAULT_MAP_BORDER_ID = 1),
  (exports.WORLD_MAP_MAX_SCALE = 2.5);
class MarkCreateInfo {
  constructor(t) {
    this.CreateType = t;
  }
}
class ConfigMarkCreateInfo extends (exports.MarkCreateInfo = MarkCreateInfo) {
  constructor(t, e) {
    super(0),
      (this.MarkConfig = t),
      void (this.MarkId = 0) === e && (this.MarkId = t.MarkId);
  }
}
exports.ConfigMarkCreateInfo = ConfigMarkCreateInfo;
class DynamicMarkCreateInfo extends MarkCreateInfo {
  constructor(t, e, r, s = void 0, o, p = !1, x, a) {
    super(1),
      (this.TrackTarget = t),
      (this.MarkConfigId = e),
      (this.MarkType = r),
      (this.MarkId = s),
      (this.TrackSource = o),
      (this.DestroyOnUnTrack = p),
      (this.TeleportId = x),
      (this.EntityConfigId = a),
      (this.MapId = 0),
      (this.MapId = exports.BIG_WORLD_MAP_ID);
  }
}
class QuestMarkCreateInfo extends (exports.DynamicMarkCreateInfo =
  DynamicMarkCreateInfo) {
  constructor(t, e, r, s, o, p, x = void 0, a) {
    super(s, o, p, x, a),
      (this.DungeonId = t),
      (this.TreeId = e),
      (this.NodeId = r),
      (this.TrackTarget = s),
      (this.MarkConfigId = o),
      (this.MarkType = p),
      (this.MarkId = x),
      (this.TrackSource = a),
      (this.MapId = t);
  }
}
exports.QuestMarkCreateInfo = QuestMarkCreateInfo;
class TemporaryTeleportMarkCreateInfo extends DynamicMarkCreateInfo {
  constructor(t, e, r, s = void 0, o) {
    super(t, e, r, s, o);
  }
}
exports.TemporaryTeleportMarkCreateInfo = TemporaryTeleportMarkCreateInfo;
class PlayerMarkCreateInfo extends MarkCreateInfo {
  constructor(t, e, r) {
    super(2), (this.PlayerId = t), (this.PlayerIndex = e), (this.Position = r);
  }
}
exports.PlayerMarkCreateInfo = PlayerMarkCreateInfo;
// # sourceMappingURL=MapDefine.js.map
