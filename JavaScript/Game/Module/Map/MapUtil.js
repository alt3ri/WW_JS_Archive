"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapUtil = void 0);
const ue_1 = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const GeneralLogicTreeController_1 = require("../GeneralLogicTree/GeneralLogicTreeController");
const MapDefine_1 = require("./MapDefine");
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
    var e = Vector2D_1.Vector2D.Create(e);
    const t =
      (e.DivisionEqual(100 * MapDefine_1.DETAIL_TILE_REALSIZE),
      Math.ceil(e.X + r));
    return { X: t, Y: Math.ceil(-e.Y + r) };
  }
  static GetTrackPositionByTrackTarget(r, t, o, i = !0) {
    if (!r) return Vector_1.Vector.ZeroVectorProxy;
    let n;
    var o = o ?? Vector_1.Vector.Create();
    if (r instanceof Vector_1.Vector) o.DeepCopy(r);
    else if (r instanceof Vector2D_1.Vector2D) o.Set(r.X, r.Y, 0);
    else if (r instanceof ue_1.Actor)
      r.IsValid() && o.FromUeVector(r.K2_GetActorLocation());
    else {
      let e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
      if (
        !(e =
          e || ModelManager_1.ModelManager.CreatureModel.GetEntityById(r)) ||
        !e?.IsInit
      )
        return (
          (n = i
            ? ModelManager_1.ModelManager.GameModeModel.MapId
            : MapDefine_1.BIG_WORLD_MAP_ID),
          GeneralLogicTreeController_1.GeneralLogicTreeController.RequestEntityPosition(
            n,
            r,
            o,
          ),
          o?.Equality(Vector_1.Vector.ZeroVectorProxy) && this.qLi(r, o, i),
          o ?? Vector_1.Vector.ZeroVectorProxy
        );
      GeneralLogicTreeController_1.GeneralLogicTreeController.GetEntityPos(
        e,
        t,
        o,
      );
    }
    return o;
  }
  static qLi(e, r, t = !0) {
    (t = t
      ? ModelManager_1.ModelManager.GameModeModel?.MapId
      : MapDefine_1.BIG_WORLD_MAP_ID),
      (e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, t));
    e && r.FromUeVector(e), r.Division(100, r);
  }
  static IsInBigWorld(e) {
    return e === MapDefine_1.BIG_WORLD_MAP_ID;
  }
  static CrossingTest(r, t) {
    let o = !1;
    let i;
    let n = !1;
    let a;
    let s = r[r.length - 1];
    let l = r[0];
    let c = ((o = s.Y >= t.Y), (n = !1), 0);
    const _ = r.length;
    for (let e = 0; e < _; e++)
      (i = l.Y >= t.Y),
        o !== i &&
          ((a = s.X >= t.X) == l.X >= t.X
            ? a && (n = !n)
            : l.X - ((l.Y - t.Y) * (s.X - l.X)) / (s.Y - l.Y) >= t.X &&
              (n = !n),
          (o = i)),
        (s = l),
        (c += 1),
        (l = r[c]);
    return n;
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
      (0, IComponent_1.getComponent)(e, "BaseInfoComponent").Category
        .ExploratoryDegree === 8
    );
  }
}
exports.MapUtil = MapUtil;
// # sourceMappingURL=MapUtil.js.map
