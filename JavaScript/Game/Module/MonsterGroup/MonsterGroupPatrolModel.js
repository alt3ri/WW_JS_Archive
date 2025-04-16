"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterGroupInfo =
    exports.MonsterPatrolInfo =
    exports.MonsterGroupPatrolModel =
    exports.MONSTER_GROUP_PATROL_KEY =
      void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Net_1 = require("../../../Core/Net/Net"),
  SplineCurve_1 = require("../../../Core/Utils/Curve/SplineCurve"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  REPARAM_STEPS = 6,
  END_DISTANCE = 30,
  IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : void 0;
exports.MONSTER_GROUP_PATROL_KEY = "MonsterGroupPatrol";
class MonsterGroupPatrolModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.MonsterPbDataIdList = new Set()),
      (this.MonsterEntityInfoMap = new Map()),
      (this.MonsterGroups = new Map());
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return (
      this.MonsterPbDataIdList.clear(),
      this.MonsterEntityInfoMap.clear(),
      this.MonsterGroups.clear(),
      !0
    );
  }
  RecordGroupMonsterPbDataId(t) {
    for (const o of t)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          42,
          "[GroupAi.Patrol] 记录群组巡逻实体PbDataId",
          ["Id", o],
        ),
        this.MonsterPbDataIdList.add(o);
  }
  IsMonsterInGroup(t) {
    return this.MonsterPbDataIdList.has(t);
  }
  RemoveMonsterGroup(t) {
    if (this.MonsterGroups.has(t)) {
      var o = this.MonsterGroups.get(t);
      for (const r of o.GroupInfo)
        this.MonsterPbDataIdList.delete(r[1].EntityId);
      o.Clear(), this.MonsterGroups.delete(t);
    }
  }
  GetMonsterGroup(t) {
    if (this.MonsterGroups.size) return this.MonsterGroups.get(t);
  }
  GetMonsterInfoByEntityId(t) {
    return this.MonsterEntityInfoMap.get(t);
  }
  GenerateAddMonsterGroup(t, o) {
    o = this.k2l(t, o);
    return o
      ? (this.MonsterGroups.set(t, o), !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            42,
            "[GroupAi.Patrol] 等实体加载完后没有GroupInfo",
          ),
        !1);
  }
  k2l(t, o) {
    t = new MonsterGroupInfo(t);
    if (t.Init(o)) {
      for (const r of t.GroupInfo)
        this.MonsterEntityInfoMap.set(r[1].EntityId, r[1]);
      return t;
    }
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 初始化失败，不进行群组游荡");
  }
}
exports.MonsterGroupPatrolModel = MonsterGroupPatrolModel;
class MonsterPatrolInfo {
  constructor(t, o, r) {
    (this.PbDataId = 0),
      (this.EntityId = 0),
      (this.IsCaptain = !1),
      (this.PauseLocation = Vector_1.Vector.Create()),
      (this.PauseDirection = Vector_1.Vector.Create()),
      (this.RelativeLocation = Vector_1.Vector.Create()),
      (this.Group = void 0),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.PatrolComp = void 0),
      (this.Tih = 0),
      (this.PbDataId = t),
      (this.EntityId = o.Entity.Id),
      (this.ActorComp = o),
      (this.MoveComp = this.ActorComp.Entity.GetComponent(176)),
      (this.Group = r);
  }
  get GroupPatrolState() {
    return this.Tih;
  }
  set GroupPatrolState(t) {
    t !== this.Tih &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "[GroupAi.Patrol] ChangeInfoPatrolStateInternal",
          ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()],
          ["EntityId", this.ActorComp?.Entity?.Id],
          ["val", t],
        ),
      this.Group.ChangeInfoPatrolStateInternal(this.Tih, t),
      (this.Tih = t));
  }
  ResetRelativeLocation() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
      this.PbDataId,
    );
    this.RelativeLocation.Set(
      t?.Transform?.Pos.X ?? 0,
      t?.Transform?.Pos.Y ?? 0,
      t?.Transform?.Pos.Z ?? 0,
    );
  }
  SetIsCaptain() {
    (this.IsCaptain = !0),
      (this.PatrolComp = this.ActorComp.Entity.GetComponent(47)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "[GroupAi.Patrol] 更新群组队长",
          ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()],
          ["EntityId", this.ActorComp?.Entity?.Id],
        );
  }
  CalculateRelativeLocation(t, o) {
    this.IsCaptain ||
      (MonsterPatrolInfo.Lih.Set(t, o, Vector_1.Vector.OneVectorProxy),
      MonsterPatrolInfo.Lih.InverseTransformPosition(
        this.RelativeLocation,
        this.RelativeLocation,
      ),
      (this.RelativeLocation.Z = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "[GroupAi.Patrol] 更新相对队长坐标",
          ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()],
          ["EntityId", this.ActorComp?.Entity?.Id],
          ["RelativeLocation", this.RelativeLocation],
        ));
  }
}
(exports.MonsterPatrolInfo = MonsterPatrolInfo).Lih =
  Transform_1.Transform.Create();
class MonsterGroupInfo {
  constructor(t) {
    (this.O2l = 0),
      (this.wih = -1),
      (this.GAl = 0),
      (this.kAl = 0),
      (this.Aih = []),
      (this.GroupInfo = new Map()),
      (this.xKl = !1),
      (this._Dt = 0),
      (this.RKl = void 0),
      (this.N2l = 0),
      (this.Htn = 0),
      (this.md = void 0),
      (this.$ie = void 0),
      (this.F2l = !1),
      (this.OAl = 0),
      (this.V2l = !1),
      (this.wKl = !1),
      (this._Dt = t);
  }
  get CaptainInfo() {
    if (this.GroupInfo.has(this.wih)) return this.GroupInfo.get(this.wih);
  }
  Init(t) {
    return (
      (this.N2l = t.Option.Leader),
      this.kih(t.Entities),
      !!this.Oih(t.Option.SplineEntityId) &&
        ((this.RKl = EntitySystem_1.EntitySystem.GetComponent(this._Dt, 1)),
        this.H2l())
    );
  }
  H2l() {
    return this.j2l(), !!this.W2l() && (this.Q2l(), this.K2l(), !0);
  }
  Clear() {
    this.ExitPatrol(),
      this.GroupInfo.clear(),
      (this.$ie = void 0),
      (this.md = void 0),
      (this.$ie = void 0);
  }
  CheckMonsterValid() {
    MonsterGroupInfo.$2l.length = 0;
    for (const o of this.GroupInfo) {
      var t = o[1];
      (t.ActorComp?.Valid && t.MoveComp?.Valid) ||
        MonsterGroupInfo.$2l.push(t.EntityId);
    }
    if (0 < MonsterGroupInfo.$2l.length) {
      for (const r of MonsterGroupInfo.$2l) this.GroupInfo.delete(r);
      if (0 === this.GroupInfo.size) return !1;
      this.H2l();
    }
    return !0;
  }
  GetAllMonsterInState() {
    for (let t = 0; t < 4; t++) if (this.Aih[t] === this.GAl) return t;
    return 4;
  }
  ChangeInfoPatrolStateInternal(t, o) {
    this.Aih[t]--, this.Aih[o]++;
  }
  ReadyToStartPatrol() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      this.NAl(t);
    }
  }
  PausePatrol() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      2 === t.GroupPatrolState &&
        ((t.GroupPatrolState = 1),
        this.X2l(t),
        t.IsCaptain
          ? t.PatrolComp?.PausePatrol(
              this.Htn,
              exports.MONSTER_GROUP_PATROL_KEY,
            )
          : t.MoveComp?.MoveController.StopMove());
    }
    this.PKl();
  }
  ExitPatrol() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      2 === t.GroupPatrolState &&
        ((t.GroupPatrolState = 3),
        t.IsCaptain
          ? t.PatrolComp?.StopPatrol(this.Htn)
          : t.MoveComp?.MoveController.StopMove());
    }
    this.PKl();
  }
  CheckMonsterMoveSpeed() {
    for (const e of this.GroupInfo) {
      const i = e[1];
      var t, o, r;
      i.IsCaptain
        ? this.FAl(i)
        : (o = i.MoveComp?.MoveController) &&
          ((t = Math.min(END_DISTANCE, 0.5 * i.ActorComp.Radius)),
          (r = o.GetMoveToLocationLogic()?.GetCurrentDistance() ?? -1) < 0
            ? o.NavigateMoveToLocation({
                Position: this.STl(i),
                ReferencePosition: () => this.STl(i),
                Distance: END_DISTANCE + t,
                MoveState: CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
                ReturnTimeoutFailed: 3,
              })
            : (o = i.ActorComp?.Owner) instanceof UE.Character &&
              ((r =
                0.02 *
                  MathUtils_1.MathUtils.Clamp(r - 50 - t, -50, 300) *
                  0.125 +
                0.875),
              o.SetAnimRootMotionTranslationScale(r)));
    }
  }
  kih(t) {
    var o = new Array();
    for (const s of t) {
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(s, o);
      var r = o[0]?.Entity,
        e = r?.GetComponent(3),
        i = r?.GetComponent(44);
      r && e
        ? i
          ? ((i = new MonsterPatrolInfo(s, e, this)),
            this.GroupInfo.set(r.Id, i))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("AI", 42, "[GroupAi.Patrol] 实体没有移动组件", [
              "PbDataId",
              s,
            ])
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("AI", 42, "[GroupAi.Patrol] 没有实体", [
            "PbDataId",
            s,
          ]);
    }
  }
  Oih(t) {
    var o,
      r,
      e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    return e
      ? (o = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "SplineComponent",
        )) && o.Option.Points
        ? o.Option.Points.length < 2
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "AI",
                42,
                "[GroupAi.Patrol] 群组巡逻样条点数量小于2",
                ["SplineEntityId", t],
              ),
            !1)
          : ((r = new SplineCurve_1.SplineCurve(REPARAM_STEPS)).InitPoints(
              o.Option.Points,
            ),
            e.Transform && r.SetSplineTransform(e.Transform, !1),
            (this.Htn = t),
            (this.md = r),
            (this.$ie = o).Option.Type === IComponent_1.ESplineType.Patrol &&
              o.Option.CycleOption?.Type ===
                IComponent_1.EPatrolCycleMode.Loop &&
              (this.F2l = o.Option.CycleOption.IsCircle),
            !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("AI", 42, "[GroupAi.Patrol] 无法找到样条组件配置", [
              "SplineEntityId",
              t,
            ]),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            42,
            "[GroupAi.Patrol] 无法找到SplineEntityData",
            ["SplineEntityId", t],
          ),
        !1);
  }
  j2l() {
    for (let t = (this.Aih.length = 0); t < 4; t++) this.Aih.push(0);
    for (const o of this.GroupInfo) {
      var t = o[1];
      this.Aih[t.GroupPatrolState] = this.Aih[t.GroupPatrolState] + 1;
    }
    this.GAl = this.GroupInfo.size;
  }
  W2l() {
    this.wih = -1;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(this.N2l)
      ?.Transform?.Pos;
    MonsterGroupInfo.jye.Set(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
    let o = MathUtils_1.MathUtils.MaxFloat,
      r = 0;
    for (const s of this.GroupInfo) {
      var e = s[1],
        i =
          ((e.IsCaptain = !1),
          e.ResetRelativeLocation(),
          Vector_1.Vector.DistSquared(
            e.RelativeLocation,
            MonsterGroupInfo.jye,
          ));
      o > i && ((o = i), (r = e.EntityId));
    }
    return (
      !!this.GroupInfo.has(r) &&
      (this.GroupInfo.get(r).SetIsCaptain(), (this.wih = r), !0)
    );
  }
  Q2l() {
    if (this.CaptainInfo?.ActorComp) {
      let t = 0,
        o = 0;
      this.kAl = 0;
      for (const i of this.GroupInfo) {
        var r,
          e = i[1];
        !e.IsCaptain &&
          ((r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            this.N2l,
          )?.Transform?.Rot),
          MonsterGroupInfo.Gco.Set(r?.Y ?? 0, r?.Z ?? 0, r?.X ?? 0),
          MonsterGroupInfo.Gco.Quaternion(MonsterGroupInfo.jJo),
          e.CalculateRelativeLocation(
            this.CaptainInfo.RelativeLocation,
            MonsterGroupInfo.jJo,
          ),
          (0 === t || t > e.RelativeLocation.X) && (t = e.RelativeLocation.X),
          0 === o || o < e.RelativeLocation.X) &&
          (o = e.RelativeLocation.X);
      }
      this.kAl = t + o;
    }
  }
  K2l() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      this.X2l(t);
    }
  }
  X2l(t) {
    let o = this.O2l;
    (o < 0 || o >= this.md.GetSplinePointsNum()) && (o = 0),
      this.md.GetDirectionAtSplinePoint(o, 1, MonsterGroupInfo.jye),
      (MonsterGroupInfo.jye.Z = 0),
      this.V2l && MonsterGroupInfo.jye.UnaryNegation(MonsterGroupInfo.jye),
      t.PauseDirection.DeepCopy(MonsterGroupInfo.jye),
      t.IsCaptain
        ? this.md.GetLocationAtSplinePoint(o, 1, MonsterGroupInfo.jye)
        : (MonsterGroupInfo.jye.Rotation(MonsterGroupInfo.Gco),
          MonsterGroupInfo.Lih.SetRotation(
            MonsterGroupInfo.Gco.Quaternion(MonsterGroupInfo.jJo),
          ),
          this.md.GetLocationAtSplinePoint(o, 1, MonsterGroupInfo.jye),
          MonsterGroupInfo.Lih.SetLocation(MonsterGroupInfo.jye),
          MonsterGroupInfo.Lih.SetScale3D(Vector_1.Vector.OneVectorProxy),
          MonsterGroupInfo.Lih.TransformPosition(
            t.RelativeLocation,
            MonsterGroupInfo.jye,
          )),
      t.PauseLocation.DeepCopy(MonsterGroupInfo.jye);
  }
  NAl(t) {
    t.MoveComp &&
      !t.MoveComp.MoveController.IsMoving() &&
      t.MoveComp.MoveController.MoveToLocation({
        Position: t.PauseLocation,
        CallbackList: [
          () => {
            t.GroupPatrolState = 2;
          },
        ],
        Distance: END_DISTANCE,
        MoveState: CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
        ReturnTimeoutFailed: 3,
      });
  }
  VAl(t) {
    if (this.OAl !== t) {
      this.OAl = t;
      for (const r of this.GroupInfo) {
        var o = r[1];
        o.IsCaptain ||
          ((o.RelativeLocation.X *= -1),
          (o.RelativeLocation.Y *= -1),
          (o.RelativeLocation.X += this.kAl));
      }
      this.V2l = !this.V2l;
    }
  }
  STl(t) {
    return (
      MonsterGroupInfo.Lih.FromUeTransform(
        this.CaptainInfo.ActorComp.ActorTransform,
      ),
      MonsterGroupInfo.Lih.TransformPosition(
        t.RelativeLocation,
        MonsterGroupInfo.jye,
      ),
      (MonsterGroupInfo.jye.Z -= this.CaptainInfo.ActorComp.HalfHeight),
      MonsterGroupInfo.jye
    );
  }
  FAl(o) {
    const r = o.PatrolComp;
    var t;
    r &&
      !r.IsInPatrol() &&
      (!r || r.GetIsPauseState(this.Htn)
        ? ((o.GroupPatrolState = 2),
          r.ResumePatrol(this.Htn, exports.MONSTER_GROUP_PATROL_KEY),
          (t = r.IsPositiveDirection()),
          this.UKl(t))
        : ((t = {
            DebugMode: !1,
            UseNearestPoint: !0,
            IgnorePointDirection: !0,
            ReturnFalseWhenNavigationFailed: !1,
            NoRequestServer: !0,
            OnArrivePointHandle: () => {
              var t = this.md.GetSplinePointsNum() - 1;
              (this.O2l = o.PatrolComp.GetLastPointRawIndex()),
                this.F2l &&
                  this.O2l % t == 0 &&
                  (this.VAl(this.O2l),
                  (t = r.IsPositiveDirection()),
                  this.DKl(t)),
                this.BJo();
            },
            OnPatrolEndHandle: () => {
              this.ExitPatrol();
            },
          }),
          (o.GroupPatrolState = 2),
          r.StartSplineCurvePatrol(this.Htn, this.md, this.$ie, t),
          (this.wKl = r.IsPositiveDirection()),
          this.UKl(this.wKl)));
  }
  UKl(t) {
    var o, r;
    this.xKl ||
      ((this.xKl = !0),
      (o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
        this._Dt,
      )),
      ((r = Protocol_1.Aki.Protocol.Kes.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(o)),
      (r.V4n = t),
      Net_1.Net.Call(17943, r, () => {}),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "[GroupAi.Patrol] 开始群组巡逻，通知服务器",
          ["管理器PbDataId", this._Dt],
          ["巡逻方向", t ? "正" : "逆"],
        ));
  }
  PKl() {
    var t, o;
    this.xKl &&
      ((this.xKl = !1),
      (t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
        this._Dt,
      )),
      ((o = Protocol_1.Aki.Protocol.Xes.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(t)),
      Net_1.Net.Call(22325, o, () => {}),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 中止群组巡逻，通知服务器", [
        "管理器PbDataId",
        this._Dt,
      ]);
  }
  DKl(t) {
    var o, r;
    this.xKl &&
      t !== this.wKl &&
      ((this.wKl = t),
      (o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
        this._Dt,
      )),
      ((r = Protocol_1.Aki.Protocol.Jes.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(o)),
      (r.V4n = t),
      Net_1.Net.Call(21855, r, () => {}),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "AI",
        42,
        "[GroupAi.Patrol] 切换群组巡逻方向，通知服务器",
        ["管理器PbDataId", this._Dt],
        ["巡逻方向", t ? "正" : "逆"],
      );
  }
  BJo() {
    if (this.xKl)
      for (const i of this.GroupInfo) {
        var t,
          o,
          r,
          e = i[1];
        e.IsCaptain
          ? (this.RKl?.SetActorLocation(
              e.ActorComp.ActorLocation,
              "设置群组AI管理器位置到队长位置",
              !1,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "AI",
                42,
                "[GroupAi.Patrol] 设置群组AI管理器位置到队长位置",
                ["EntityId", this._Dt],
                ["ActorLocation", e.ActorComp.ActorLocation],
              ))
          : e.MoveComp?.MoveController &&
            (((t = (o =
              e.ActorComp.Entity.GetComponent(67)).GetCurrentMoveSample()).P5n =
              e.ActorComp.ActorLocationProxy),
            o.PendingMoveInfos.push(t),
            ((r = Protocol_1.Aki.Protocol.Yus.create()).uhh = ModelManager_1
              .ModelManager.GameModeModel.IsMulti
              ? ModelManager_1.ModelManager.OnlineModel.OwnerId
              : ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
            r.WRs.push(o.CollectPendingMoveInfos()),
            Net_1.Net.Send(16361, r),
            Info_1.Info.IsBuildDevelopmentOrDebug &&
              ((o = {
                scene_id:
                  ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
                instance_id:
                  ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
                msg_id: 16361,
                immediately: !0,
                sub_count: r.WRs.length,
                is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
                ed: IS_WITH_EDITOR,
                br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
              }),
              (r = JSON.stringify(o)),
              CombatDebugController_1.CombatDebugController.DataReport(
                "COMBAT_MESSAGE_COUNT",
                r,
              )),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "AI",
              42,
              "[GroupAi.Patrol] 向服务器同步怪物位置",
              ["EntityId", e.EntityId],
              ["PbDataId", e.PbDataId],
              ["X", t.P5n.X],
              ["Y", t.P5n.Y],
              ["Z", t.P5n.Z],
            );
      }
  }
}
((exports.MonsterGroupInfo = MonsterGroupInfo).$2l = []),
  (MonsterGroupInfo.jye = Vector_1.Vector.Create()),
  (MonsterGroupInfo.Lih = Transform_1.Transform.Create()),
  (MonsterGroupInfo.Gco = Rotator_1.Rotator.Create()),
  (MonsterGroupInfo.jJo = Quat_1.Quat.Create());
//# sourceMappingURL=MonsterGroupPatrolModel.js.map
