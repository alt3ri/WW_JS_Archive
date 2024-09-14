"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapUtil = void 0);
const ue_1 = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTree/GeneralLogicTreeController"),
  MapDefine_1 = require("./MapDefine"),
  MapLogger_1 = require("./Misc/MapLogger");
class MapUtil {
  static WorldPosition2UiPosition(e, r) {
    r = r ?? Vector_1.Vector.Create();
    return e.Multiply(MapDefine_1.world2UiUnit, r), r;
  }
  static WorldPosition2UiPosition2D(e, r) {
    r = r ?? Vector2D_1.Vector2D.Create();
    return e.Multiply(MapDefine_1.worldToScreenScale, r);
  }
  static UiPosition2WorldPosition(e, r) {
    r = r ?? Vector_1.Vector.Create();
    return e.Division(MapDefine_1.world2UiUnit, r);
  }
  static GetTilePosition(e, r = 0) {
    var e = Vector2D_1.Vector2D.Create(e),
      t =
        (e.DivisionEqual(100 * MapDefine_1.DETAIL_TILE_REALSIZE),
        Math.ceil(e.X + r));
    return { X: t, Y: Math.ceil(-e.Y + r) };
  }
  static GetTilePositionByUiPosition(e) {
    var e = Vector2D_1.Vector2D.Create(e),
      r = (e.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE), Math.ceil(e.X));
    return { X: r, Y: Math.ceil(e.Y) };
  }
  static GetTrackPositionByTrackTarget(e, r, t, a = !0) {
    return e
      ? ((t = t ?? Vector_1.Vector.Create()),
        e instanceof Vector_1.Vector
          ? t.DeepCopy(e)
          : e instanceof Vector2D_1.Vector2D
            ? t.Set(e.X, e.Y, 0)
            : e instanceof ue_1.Actor
              ? e.IsValid() && t.FromUeVector(e.K2_GetActorLocation())
              : MapUtil.GetEntityPosition(e, r, a, t),
        t)
      : Vector_1.Vector.ZeroVectorProxy;
  }
  static GetEntityPosition(e, r, t, a) {
    let n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    n = n || ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    a = a ?? Vector_1.Vector.Create();
    return n && n?.IsInit
      ? (GeneralLogicTreeController_1.GeneralLogicTreeController.GetEntityPos(
          n,
          r,
          a,
        ),
        a)
      : ((r = t
          ? MapUtil.GetCurrentMapOrDungeonId()
          : MapUtil.GetCurrentBigMapOrWorldMapId()),
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestEntityPosition(
          r,
          e,
          a,
        ),
        a?.Equality(Vector_1.Vector.ZeroVectorProxy) && this.qDi(e, a, t),
        a ?? Vector_1.Vector.ZeroVectorProxy);
  }
  static GetCurrentBigMapOrWorldMapId() {
    var e = ModelManager_1.ModelManager.WorldMapModel.WorldMapMapId;
    return void 0 === e ? MapUtil.GetCurrentBigMapId() : e;
  }
  static GetCurrentBigMapId() {
    return 3 === ModelManager_1.ModelManager.GameModeModel.MapId
      ? MapDefine_1.BIG_WORLD_MAP_ID
      : ModelManager_1.ModelManager.GameModeModel.MapId;
  }
  static CurrentInBigMap() {
    var e = this.GetCurrentMapOrDungeonId();
    return this.IsInBigWorld(e);
  }
  static GetCurrentMapOrDungeonId() {
    return ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
      .MapConfigId;
  }
  static IsInBigWorld(e) {
    return ConfigManager_1.ConfigManager.WorldMapConfig.IsInBigWorld(e);
  }
  static GetConfigMarkBelongMapId(e, r) {
    var t = MapUtil.GetCurrentBigMapOrWorldMapId();
    return 7 === r
      ? (ConfigManager_1.ConfigManager.MapConfig.GetDynamicConfigMark(e)
          ?.MapId ?? t)
      : t;
  }
  static GetMarkBelongMapId(e, r) {
    var t,
      a = ModelManager_1.ModelManager.MapModel.GetMark(r, e);
    return void 0 === a
      ? void 0 !==
        (t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e))
        ? t.MapId
        : (MapLogger_1.MapLogger.Error(
            64,
            "[地图系统]找不到标记Id对应的地图Id->",
            ["markId", e],
            ["markType", r],
          ),
          MapDefine_1.BIG_WORLD_MAP_ID)
      : (a.MapId ?? MapDefine_1.BIG_WORLD_MAP_ID);
  }
  static GetWorldMapAreaId(e) {
    return ModelManager_1.ModelManager.WorldMapModel.WorldMapMapId
      ? MapUtil.CurrentInBigMap()
        ? (ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(e) ?? 0)
        : (ModelManager_1.ModelManager.AreaModel.GetLastAreaId(e) ??
          ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(e) ??
          0)
      : (MapLogger_1.MapLogger.Error(
          64,
          "[地图系统]获取世界地图玩家所处区域Id失败，请检查是否使用场景不正确->",
        ),
        0);
  }
  static GetInstanceDungeonTempWorldName(e, r) {
    return e === MapDefine_1.BIG_WORLD_MAP_ID
      ? 2e5 < r.X && r.Y < 2e5
        ? ConfigManager_1.ConfigManager.MapConfig.GetLocalText("Area_11_Title")
        : ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
            "Country_1_Title",
          )
      : e === MapDefine_1.HHA_BIG_WORLD_MAP_ID
        ? ConfigManager_1.ConfigManager.MapConfig.GetLocalText("Area_15_Title")
        : ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
            "Country_1_Title",
          );
  }
  static qDi(e, r, t = !0) {
    (t = t
      ? MapUtil.GetCurrentMapOrDungeonId()
      : MapUtil.GetCurrentBigMapOrWorldMapId()),
      (e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, t));
    e && r.FromUeVector(e), r.Division(100, r);
  }
  static CrossingTest(r, t) {
    let a = !1;
    var n;
    let i = !1;
    var o;
    let M = r[r.length - 1],
      _ = r[0],
      l = ((a = M.Y >= t.Y), (i = !1), 0);
    var s = r.length;
    for (let e = 0; e < s; e++)
      (n = _.Y >= t.Y),
        a !== n &&
          ((o = M.X >= t.X) == _.X >= t.X
            ? o && (i = !i)
            : _.X - ((_.Y - t.Y) * (M.X - _.X)) / (M.Y - _.Y) >= t.X &&
              (i = !i),
          (a = n)),
        (M = _),
        (l += 1),
        (_ = r[l]);
    return i;
  }
  static IsTemporaryTeleportEntity(e) {
    e = e.ComponentsData;
    return (
      void 0 !== (0, IComponent_1.getComponent)(e, "DynamicTeleportComponent")
    );
  }
  static IsTreasureBox(e) {
    e = e.ComponentsData;
    return void 0 !== (0, IComponent_1.getComponent)(e, "TreasureBoxComponent");
  }
  static IsSoundBox(e) {
    e = e.ComponentsData;
    return (
      8 ===
      (0, IComponent_1.getComponent)(e, "BaseInfoComponent").Category
        .ExploratoryDegree
    );
  }
  static GetSmallestEnclosingCircle(e) {
    e = MapUtil.HGa(e);
    const n = (e, r, t) => {
      if (0 === t || 3 === r.length)
        return 0 === r.length
          ? new MapDefine_1.Circle(0, 0, -1)
          : 1 === r.length
            ? new MapDefine_1.Circle(r[0].X, r[0].Y, 0)
            : 2 === r.length
              ? new MapDefine_1.Circle(
                  (r[0].X + r[1].X) / 2,
                  (r[0].Y + r[1].Y) / 2,
                  Math.sqrt((r[0].X - r[1].X) ** 2 + (r[0].Y - r[1].Y) ** 2) /
                    2,
                )
              : MapUtil.jGa(r[0], r[1], r[2]);
      let a = n(e.slice(1), r, t - 1);
      return (
        Math.sqrt((e[0].X - a.X) ** 2 + (e[0].Y - a.Y) ** 2) > a.R &&
          (r.push(e[0]), (a = n(e.slice(1), r, t - 1)), r.pop()),
        a
      );
    };
    return n(e, [], e.length);
  }
  static jGa(e, r, t) {
    var a = r.X - e.X,
      n = r.Y - e.Y,
      i = t.X - e.X,
      o = t.Y - e.Y,
      M = a * (e.X + r.X) + n * (e.Y + r.Y),
      _ = i * (e.X + t.X) + o * (e.Y + t.Y),
      t = 2 * (a * (t.Y - r.Y) - n * (t.X - r.X));
    return 0 == t
      ? new MapDefine_1.Circle(0, 0, 0)
      : ((r = (o * M - n * _) / t),
        (o = (a * _ - i * M) / t),
        (n = Math.sqrt((r - e.X) ** 2 + (o - e.Y) ** 2)),
        new MapDefine_1.Circle(r, o, n));
  }
  static HGa(r) {
    for (let e = r.length - 1; 0 < e; e--) {
      var t = Math.floor(Math.random() * (e + 1));
      [r[e], r[t]] = [r[t], r[e]];
    }
    return r;
  }
  static IsDungeonDiffWorld(r, t) {
    let a = r === t;
    if (0 !== r && 0 !== t) {
      var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r),
        t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
      if (void 0 !== n && void 0 !== t) {
        var i,
          n = n.InstSubType;
        let e = t.InstSubType;
        return (
          12 === e &&
            ((t = t.EntranceEntities[0].DungeonId),
            (i =
              ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)),
            (e = i.InstSubType),
            (a = r === t)),
          !a && 13 === n && 13 === e
        );
      }
    }
  }
}
exports.MapUtil = MapUtil;
//# sourceMappingURL=MapUtil.js.map
