"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapSoundBoxSfxMgr = void 0);
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  MapLogger_1 = require("../../../Misc/MapLogger"),
  SOUND_MARK_INRANGE_DISTANCE_SQUARE = 434850964;
class MapSoundBoxSfxMgr {
  OnMarkItemBecomeVisible(e, r) {
    var a, M;
    (16 !== e.MarkType && 21 !== e.MarkType) ||
      ((a = e.MarkId),
      ModelManager_1.ModelManager.TeleportModel.IsTeleport
        ? ModelManager_1.ModelManager.WorldMapModel.SetPlaySoundMarkSfxForbidden(
            a,
            !1,
          )
        : (r = Vector_1.Vector.DistSquared(r, e.WorldPosition)) >=
            SOUND_MARK_INRANGE_DISTANCE_SQUARE ||
          ((e =
            ModelManager_1.ModelManager.WorldMapModel.IsSoundMarkSfxForbidden(
              a,
            )),
          (M =
            ModelManager_1.ModelManager.WorldMapModel.IsSoundMarkSfxCoolingDown(
              a,
            )),
          ModelManager_1.ModelManager.WorldMapModel.SetPlaySoundMarkSfxForbidden(
            a,
            !0,
          ),
          e) ||
          M ||
          (MapLogger_1.MapLogger.Debug(
            63,
            "[地图系统] 地图声匣子音效 播放 ->OnMarkItemBecomeVisible And PlaySfx",
            ["MarkId", a],
            ["distSquare", r],
          ),
          ModelManager_1.ModelManager.WorldMapModel.RecordPlaySoundMarkSfx(a),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_find_shengxia")));
  }
  OnMarkItemBecomeInvisible(e) {
    var r = e.MarkId;
    (16 !== e.MarkType && 21 !== e.MarkType) ||
      (MapLogger_1.MapLogger.Debug(
        63,
        "[地图系统] 地图声匣子音效 ->OnMarkItemBecomeInvisible",
        ["MarkId", r],
      ),
      ModelManager_1.ModelManager.WorldMapModel.SetPlaySoundMarkSfxForbidden(
        r,
        !1,
      ));
  }
}
exports.MapSoundBoxSfxMgr = MapSoundBoxSfxMgr;
//# sourceMappingURL=MapSoundBoxSfxMgr.js.map
