"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ue_1 = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTree/GeneralLogicTreeController"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
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
  static WorldToScreenPosition(e) {
    var r = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.D_ProjectWorldToScreen(r, e, this.Swl, !1)) {
      r = (0, puerts_1.$unref)(this.Swl);
      if (r) {
        var e = r.X,
          t = r.Y;
        if (!isNaN(e) && !isNaN(t) && isFinite(e) && isFinite(t)) return r;
      }
    }
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
  static GetTrackPositionByTrackTarget(e, r, t, a, i = !0) {
    var [t, o] = this.PDl(e, t);
    return t || MapUtil.GetEntityPosition(e, r, a, o, i), o;
  }
  static GetTrackUiPositionByTrackTargetConfig(e, r) {
    e = MapUtil.GetTrackPositionByTrackTargetConfig(e, r);
    return MapUtil.WorldPosition2UiPosition(e);
  }
  static GetTrackPositionByTrackTargetConfig(e, r, t) {
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(r),
      i = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId,
      i = ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(i);
    if (!a && !i) {
      const [M, o] = MapUtil.PDl(e, t);
      return M ? o : MapUtil.GetEntityPositionByConfig(e, r, o);
    }
    if (a && i) {
      const [l, o] = MapUtil.PDl(e, t);
      return l ? o : MapUtil.GetEntityPosition(e, !1, r, o);
    }
    const o = t ?? Vector_1.Vector.Create();
    let n = void 0;
    return (
      (n = i
        ? ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapLocation(
            e,
            r,
          )
        : ModelManager_1.ModelManager.MapModel.GetDungeonExitLocation(
            e,
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          )) && o.FromUeVector(n),
      o.Division(100, o),
      o
    );
  }
  static PDl(e, r) {
    return e
      ? ((r = r ?? Vector_1.Vector.Create()),
        e instanceof Vector_1.Vector
          ? (r.DeepCopy(e), [!0, r])
          : e instanceof Vector2D_1.Vector2D
            ? (r.Set(e.X, e.Y, 0), [!0, r])
            : e instanceof ue_1.Actor
              ? (e.IsValid() && r.FromUeVector(e.D_K2_GetActorLocation()),
                [!0, r])
              : [!1, r])
      : [!0, Vector_1.Vector.ZeroVectorProxy];
  }
  static GetEntityPosition(e, r, t = 0, a, i = !1) {
    var o,
      a = a ?? Vector_1.Vector.Create();
    if (
      MapUtil.IsDungeonDiffWorld(
        t,
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      )
    )
      return MapUtil.qDi(e, a, t), a ?? Vector_1.Vector.ZeroVectorProxy;
    let n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    return (n =
      n || ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)) &&
      n?.IsInit
      ? (GeneralLogicTreeController_1.GeneralLogicTreeController.GetEntityPos(
          n,
          r,
          a,
        ),
        a)
      : ((o =
          t === ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
            ? t
            : ModelManager_1.ModelManager.WorldMapModel
                .CurrentWorldMapConfigId),
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestEntityPosition(
          o,
          e,
          a,
        ),
        a?.Equality(Vector_1.Vector.ZeroVectorProxy) && MapUtil.qDi(e, a, t),
        i &&
          a?.Equality(Vector_1.Vector.ZeroVectorProxy) &&
          MapLogger_1.MapLogger.ErrorOnce(
            e,
            63,
            "获取实体位置失败, 可能会导致地图或者主界面追踪追到原点",
            ["pbDataOrEntityId:", e],
            ["addHalfCapsule", r],
            ["传入的参数副本Id:", t],
            ["最终使用的副本Id:", o],
            [
              "当前玩家所处副本Id:",
              ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            ],
            [
              "CurrentWorldMapConfigId:",
              ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId,
            ],
          ),
        a ?? Vector_1.Vector.ZeroVectorProxy);
  }
  static GetEntityPositionByConfig(e, r, t) {
    t = t ?? Vector_1.Vector.Create();
    return MapUtil.qDi(e, t, r), t ?? Vector_1.Vector.ZeroVectorProxy;
  }
  static GetWorldMapLevelOneAreaId() {
    var e = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    return e && 0 !== e.AreaId
      ? ((e = e.AreaId),
        ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e))
      : ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        );
  }
  static GetMapNameByInstanceId(e, r) {
    var t = MapUtil.GetInstanceDungeonBelongWorldId(e) ?? e,
      a =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetAllMapRangeConfigByMapId(
          t,
        );
    if (a)
      for (const l of a) {
        if (!(4 <= l.AreaRange.length))
          return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
            l.MapName,
          );
        var i = l.AreaRange[0],
          o = l.AreaRange[1],
          n = l.AreaRange[2],
          M = l.AreaRange[3];
        if (i <= r.X && r.X <= n && o <= r.Y && r.Y <= M)
          return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
            l.MapName,
          );
      }
    a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(t);
    return a
      ? ConfigManager_1.ConfigManager.MapConfig.GetLocalText(a.MapName)
      : (MapLogger_1.MapLogger.Error(
          63,
          "[地图系统]找不到副本Id对应的地图配置->",
          ["instanceId", e],
          ["mapId", t],
          ["worldPosition", r],
        ),
        ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
          "Country_1_Title",
        ));
  }
  static qDi(e, r, t) {
    0 !== t &&
      (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t)) &&
      ((e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
        e,
        t.MapConfigId,
      )) && r.FromUeVector(e),
      r.Division(100, r));
  }
  static CrossingTest(r, t) {
    let a = !1;
    var i;
    let o = !1;
    var n;
    let M = r[r.length - 1],
      l = r[0],
      s = ((a = M.Y >= t.Y), (o = !1), 0);
    var _ = r.length;
    for (let e = 0; e < _; e++)
      (i = l.Y >= t.Y),
        a !== i &&
          ((n = M.X >= t.X) == l.X >= t.X
            ? n && (o = !o)
            : l.X - ((l.Y - t.Y) * (M.X - l.X)) / (M.Y - l.Y) >= t.X &&
              (o = !o),
          (a = i)),
        (M = l),
        (s += 1),
        (l = r[s]);
    return o;
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
  static MinBoundingCircle(n, r = 10) {
    if (0 !== n.length) {
      if (1 === n.length) return new MapDefine_1.Circle(n[0].X, n[0].Y, 0);
      var e, t, a, i, M;
      if (2 === n.length)
        return (
          ([i, M] = n),
          (e = M.X - i.X),
          (t = M.Y - i.Y),
          (a = (i.X + M.X) / 2),
          (i = (i.Y + M.Y) / 2),
          (M = Math.sqrt(e * e + t * t) / 2),
          new MapDefine_1.Circle(a, i, M)
        );
      const g = n[0];
      let o = void 0;
      for (let e = 0; e < r; e++) {
        var l = n.filter(
          (e) =>
            Vector2D_1.Vector2D.Distance(e, g) <=
            Vector2D_1.Vector2D.Distance(
              e,
              n[Math.floor(Math.random() * n.length)],
            ),
        );
        l.length < n.length &&
          (l = MapUtil.MinBoundingCircle(l)) &&
          (!o || l.R < o.R) &&
          (o = l);
      }
      if (
        !o ||
        !n.every(
          (e) =>
            Vector2D_1.Vector2D.Distance(
              e,
              Vector2D_1.Vector2D.Create(o.X, o.Y),
            ) <= o.R,
        )
      ) {
        let e = 1 / 0,
          r = -1 / 0,
          t = 1 / 0,
          a = -1 / 0;
        for (const f of n)
          (e = Math.min(e, f.X)),
            (r = Math.max(r, f.X)),
            (t = Math.min(t, f.Y)),
            (a = Math.max(a, f.Y));
        var s = (e + r) / 2,
          _ = (t + a) / 2;
        let i = 0;
        for (const u of n) {
          var c = Vector2D_1.Vector2D.Distance(
            Vector2D_1.Vector2D.Create(s, _),
            u,
          );
          i = Math.max(i, c);
        }
        o = new MapDefine_1.Circle(s, _, i);
      }
      return o;
    }
  }
  static IsDungeonDiffWorld(t, a) {
    if (0 !== t && 0 !== a) {
      (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t)),
        (a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(a));
      if (void 0 !== t && void 0 !== a) {
        var i = t.InstSubType,
          o = a.InstSubType;
        let e = t.MapConfigId,
          r = a.MapConfigId;
        return (
          12 === i && ((i = MapUtil.slh(t)), (e = i.MapConfigId)),
          12 === o && ((t = MapUtil.slh(a)), (r = t.MapConfigId)),
          e !== r
        );
      }
    }
  }
  static GetInstanceDungeonBelongWorldId(e) {
    var r;
    return 0 !== e &&
      void 0 !==
        (r =
          ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e)) &&
      12 === r.InstSubType
      ? MapUtil.slh(r).Id
      : e;
  }
  static slh(e) {
    var r, t;
    if (!(e.EntranceEntities.length < 1))
      return (
        (r = e.EntranceEntities[0].DungeonId),
        void 0 ===
          (t =
            ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r)) &&
          MapLogger_1.MapLogger.Error(
            63,
            "[地图系统]世界副本查找入口实体失败->入口副本配置为空",
            ["config", e],
            ["entranceDungeonId", r],
          ),
        t
      );
    MapLogger_1.MapLogger.Error(
      63,
      "[地图系统]世界副本查找入口实体失败->实体列表为空",
      ["config", e],
    );
  }
  static GetLastBigScenePlayerUiPosition() {
    var e = this.GetLastBigScenePlayerPosition();
    return this.WorldPosition2UiPosition2D(
      Vector2D_1.Vector2D.Create(e.X, e.Y),
    );
  }
  static GetLastBigScenePlayerPosition() {
    var e = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    return e
      ? e.Position
      : (e =
            ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapLocation(
              0,
              ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            ))
        ? e.Division(100, e)
        : GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
  }
  static GetGamePlayKey(e, r) {
    return e + "_" + r;
  }
  static IsStandardGravity(e) {
    return MathUtils_1.MathUtils.IsNearlyEqual(e, -1);
  }
}
(exports.MapUtil = MapUtil).Swl = (0, puerts_1.$ref)(void 0);
//# sourceMappingURL=MapUtil.js.map
