"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemUtil = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AreaMarkItem_1 = require("./MarkItem/AreaMarkItem"),
  ConfigMarkItem_1 = require("./MarkItem/ConfigMarkItem"),
  CustomMarkItem_1 = require("./MarkItem/CustomMarkItem"),
  DynamicEntityMarkItem_1 = require("./MarkItem/DynamicEntityMarkItem"),
  EntityMarkItem_1 = require("./MarkItem/EntityMarkItem"),
  FixedSceneGamePlayMarkItem_1 = require("./MarkItem/FixedSceneGamePlayMarkItem"),
  LandscapeMark_1 = require("./MarkItem/LandscapeMark"),
  MingSuNpcMarkItem_1 = require("./MarkItem/MingSuNpcMarkItem"),
  ParkourMarkItem_1 = require("./MarkItem/ParkourMarkItem"),
  PlayerMarkItem_1 = require("./MarkItem/PlayerMarkItem"),
  SceneGameplayMarkItem_1 = require("./MarkItem/SceneGameplayMarkItem"),
  SoundBoxMarkItem_1 = require("./MarkItem/SoundBoxMarkItem"),
  TaskMarkItem_1 = require("./MarkItem/TaskMarkItem"),
  TeleportMarkItem_1 = require("./MarkItem/TeleportMarkItem"),
  TemporaryTeleportMarkItem_1 = require("./MarkItem/TemporaryTeleportMarkItem"),
  TreasureBoxDetectorMarkItem_1 = require("./MarkItem/TreasureBoxDetectorMarkItem"),
  TreasureBoxMarkItem_1 = require("./MarkItem/TreasureBoxMarkItem");
class MarkItemUtil {
  static Create(r, a, t, k) {
    if (r) {
      let e = void 0;
      switch (r.CreateType) {
        case 0:
          e = MarkItemUtil.CreateConfigMark(r.MarkId, r.MarkConfig, a, t, k);
          break;
        case 2:
          (e = new PlayerMarkItem_1.PlayerMarkItem(k, r, a, t))?.Initialize();
          break;
        case 1:
          e = MarkItemUtil.CreateDynamicMark(r, a, t, k);
      }
      return e;
    }
  }
  static GetTrackSourceTypeByMarkType(e) {
    return 10 !== e ? 1 : 4;
  }
  static CreateConfigMark(r, a, t, k, M) {
    if (a) {
      let e = void 0;
      switch (a.ObjectType) {
        case 1:
          e = new AreaMarkItem_1.AreaMarkItem(r, a, M, t, k);
          break;
        case 5:
        case 6:
          e = new TeleportMarkItem_1.TeleportMarkItem(r, a, M, t, k);
          break;
        case 8:
          e = new MingSuNpcMarkItem_1.MingSuNpcMarkItem(r, a, M, t, k);
          break;
        case 7:
          e = new EntityMarkItem_1.EntityMarkItem(
            r,
            a,
            M,
            Vector_1.Vector.Create(a.MarkVector),
            t,
            k,
          );
          break;
        case 9:
          e = void 0;
          break;
        case 10:
          e = new SceneGameplayMarkItem_1.SceneGameplayMarkItem(r, a, M, t, k);
          break;
        case 13:
          e = new ParkourMarkItem_1.ParkourMarkItem(r, a, M, t, k);
          break;
        case 19:
          e = new FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem(
            r,
            a,
            M,
            t,
            k,
          );
          break;
        case 20:
          e = new LandscapeMark_1.LandscapeMarkItem(r, a, M, t, k);
          break;
        default:
          e = new ConfigMarkItem_1.ConfigMarkItem(r, a, M, t, k);
      }
      return e?.Initialize(), e;
    }
  }
  static CreateDynamicMark(r, a, t, k) {
    if (r) {
      let e = void 0;
      switch (r.MarkType) {
        case 9:
          e = new CustomMarkItem_1.CustomMarkItem(r, k, a, t);
          break;
        case 12:
          e = new TaskMarkItem_1.TaskMarkItem(r, k, a, t);
          break;
        case 7:
          e = MarkItemUtil.CreateDynamicEntityMark(
            r.MarkId,
            r.MarkConfigId,
            k,
            r.TrackTarget,
            a,
            t,
            !1,
          );
          break;
        case 15:
          e = new TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem(
            r,
            k,
            a,
            t,
          );
          break;
        case 16:
        case 21:
          e = new SoundBoxMarkItem_1.SoundBoxMarkItem(r, k, a, t);
          break;
        case 18:
          e = new TreasureBoxMarkItem_1.TreasureBoxMarkItem(r, k, a, t);
          break;
        case 17:
          e = new TreasureBoxDetectorMarkItem_1.TreasureBoxDetectorMarkItem(
            r,
            k,
            a,
            t,
          );
          break;
        default:
          return;
      }
      return e?.Initialize(), e;
    }
  }
  static CreateEntityMark(e, r, a, t, k, M) {
    r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
    if (r)
      return (
        (e = new EntityMarkItem_1.EntityMarkItem(
          e,
          r,
          a,
          t,
          k,
          M,
        ))?.Initialize(),
        e
      );
  }
  static CreateDynamicEntityMark(e, r, a, t, k, M, m = !0) {
    r = ConfigManager_1.ConfigManager.MapConfig.GetDynamicConfigMark(r);
    if (r)
      return (
        (e = new DynamicEntityMarkItem_1.DynamicEntityMarkItem(
          e,
          r,
          a,
          t,
          k,
          M,
        )),
        m && e.Initialize(),
        e
      );
  }
  static IsTrackPointedMarkInCurrentDungeon(e, r = !1) {
    if (1 !== e.TrackSource) return !0;
    var a =
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
    if (e.Id <= 0) {
      const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(
        e.Id,
      );
      return t && t.MapId ? 12 === t.MarkType || a === t.MapId : r;
    }
    const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e.Id);
    return t && t.MapId
      ? 12 === t.MarkType || a === t.MapId
      : (e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.Id)) &&
          e.MapId
        ? a === e.MapId
        : r;
  }
  static IsHideTrackInView(e) {
    return 12 !== e.MarkType && 1 === e.TrackSource;
  }
}
exports.MarkItemUtil = MarkItemUtil;
//# sourceMappingURL=MarkItemUtil.js.map
