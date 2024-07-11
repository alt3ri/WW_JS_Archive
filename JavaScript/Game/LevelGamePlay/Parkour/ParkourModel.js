"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourModel =
    exports.ParkourConfig =
    exports.ParkourPointInfo =
      void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class ParkourPointInfo {
  constructor(r) {
    (this.Point = void 0),
      (this.IsRecycled = !1),
      (this.Point = r),
      (this.IsRecycled = !1);
  }
}
exports.ParkourPointInfo = ParkourPointInfo;
class ParkourConfig {
  constructor() {
    (this.TAe = 0),
      (this.LAe = void 0),
      (this.DAe = void 0),
      (this.RAe = 0),
      (this.nx = void 0),
      (this.UAe = void 0),
      (this.mC = void 0),
      (this.AAe = void 0),
      (this.PAe = void 0);
  }
  set ConfigId(r) {
    this.TAe = r;
  }
  get ConfigId() {
    return this.TAe;
  }
  set ParkourActorList(r) {
    this.DAe = r;
  }
  get ParkourActorList() {
    return this.DAe;
  }
  set ParkourContext(r) {
    this.nx = r;
  }
  get ParkourContext() {
    return this.nx;
  }
  get ParkourInfo() {
    return this.LAe;
  }
  set ParkourInfo(r) {
    this.LAe = r;
  }
  set CurCheckPointCount(r) {
    this.RAe = r;
  }
  get CurCheckPointCount() {
    return this.RAe;
  }
  set OriginLocation(r) {
    this.UAe = r;
  }
  get OriginLocation() {
    return this.UAe;
  }
  set OriginRotation(r) {
    this.mC = r;
  }
  get OriginRotation() {
    return this.mC;
  }
  get TotalScore() {
    return this.AAe;
  }
  get MatchRoleOption() {
    return this.PAe;
  }
  set MatchRoleOption(r) {
    this.PAe = r;
  }
  ClearTotalScore() {
    this.AAe = new Map();
  }
  ClearParkourActorList() {
    if (this.DAe?.length) {
      for (const o of this.DAe)
        if (o?.length > 0)
          for (const t of o) {
            const r = t.Point;
            !t.IsRecycled &&
              r?.IsValid() &&
              (r.ReceiveEndPlay(0), ActorSystem_1.ActorSystem.Put(r));
          }
      this.DAe.length = 0;
    }
  }
}
exports.ParkourConfig = ParkourConfig;
class ParkourModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.xAe = new Map());
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.xAe.clear(), !0;
  }
  AddParkour(r, o, t) {
    let e, i, n, s;
    return this.xAe.get(r)
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            7,
            "[ParkourModel.AddParkour] 添加相同跑酷路线",
            ["ParkourConfigId", r],
          ),
        !1)
      : (n = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r))
        ? ((e = Vector_1.Vector.Create(
            n.Transform?.Pos.X ?? 0,
            n.Transform?.Pos.Y ?? 0,
            n.Transform?.Pos.Z ?? 0,
          )),
          (i = Rotator_1.Rotator.Create(
            n.Transform?.Rot?.Y ?? 0,
            n.Transform?.Rot?.Z ?? 0,
            n.Transform?.Rot?.X ?? 0,
          )),
          (n = (0, IComponent_1.getComponent)(
            n.ComponentsData,
            "SplineComponent",
          ))
            ? n.Option.Type !== IComponent_1.ESplineType.Parkour
              ? (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Level",
                    7,
                    "[ParkourModel.AddParkour] SplineComponent配置类型不是parkour",
                    ["ParkourConfigId", r],
                  ),
                !1)
              : (((s = new ParkourConfig()).OriginLocation = e),
                (s.OriginRotation = i),
                (s.ParkourContext =
                  LevelGeneralContextDefine_1.GeneralContext.Copy(o)),
                (s.ConfigId = r),
                (s.ParkourInfo = n.Option),
                (s.CurCheckPointCount = n.Option.CheckPointsRequire),
                (s.MatchRoleOption = t),
                this.xAe.set(r, s),
                !0)
            : (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Level",
                  7,
                  "[ParkourModel.AddParkour] 无法找到SplineComponent配置",
                  ["ParkourConfigId", r],
                ),
              !1))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              7,
              "[ParkourModel.AddParkour] 无法找到spline entity",
              ["ParkourConfigId", r],
            ),
          !1);
  }
  RemoveParkour(r) {
    const o = this.xAe.get(r);
    o &&
      (o.ClearParkourActorList(),
      o.ParkourContext?.Release(),
      this.xAe.delete(r));
  }
  GetParkour(r) {
    return this.xAe.get(r);
  }
}
exports.ParkourModel = ParkourModel;
// # sourceMappingURL=ParkourModel.js.map
