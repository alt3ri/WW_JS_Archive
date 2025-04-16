"use strict";
var SceneItemExploreInteractComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var o,
        r = arguments.length,
        s =
          r < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, n);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (o = t[a]) &&
            (s = (r < 3 ? o(s) : 3 < r ? o(e, i, s) : o(e, i)) || s);
      return 3 < r && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemExploreInteractComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ExploreSkillInteractById_1 = require("../../../Core/Define/ConfigQuery/ExploreSkillInteractById"),
  GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../Module/SceneTeam/SceneTeamController"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  CameraController_1 = require("../../Camera/CameraController"),
  OUTLET_ANGLE_LIMIT_COS_VALUE = Math.cos((30 / 180) * Math.PI),
  DEFAULT_MAX_DISTANCE = 60,
  OVERWRITE_HOOK_LOCATION_KEY = "OverwriteLocation",
  manipulateInteractPointPointStateTagMap = new Map([
    [0, -422517001],
    [1, 1725677503],
    [2, -1335742570],
    [3, 968645625],
  ]);
class HangPointData {
  constructor(t, e) {
    (this.HangPointActor = t), (this.HangPointDir = e);
  }
}
let SceneItemExploreInteractComponent =
  (SceneItemExploreInteractComponent_1 = class SceneItemExploreInteractComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.EIe = void 0),
        (this.Oln = void 0),
        (this.vtn = void 0),
        (this.Gce = void 0),
        (this.YO = void 0),
        (this.Lie = void 0),
        (this.ac = 4),
        (this.Trl = void 0),
        (this.Hfn = void 0),
        (this.Gal = -1),
        (this.Oal = void 0),
        (this.HangPointData = new Set()),
        (this.IsMoving = !1),
        (this.kal = void 0),
        (this.Nal = void 0),
        (this.AttachParent = void 0),
        (this.DKo = []),
        (this.Fal = void 0),
        (this.Jzl = void 0),
        (this.Zzl = !1),
        (this.Evl = void 0),
        (this.aln = void 0),
        (this.Rhl = void 0),
        (this._sr = new Set()),
        (this.d4l = new Set()),
        (this.m4l = new Set()),
        (this.C4l = new Set()),
        (this.Ui_ = Vector_1.Vector.Create(50, 50, 150)),
        (this.Di_ = void 0),
        (this.Rnn = () => {
          var t = this.Hte.GetInteractionMainActor();
          switch (
            (t &&
              (t = t.GetActorByKey(OVERWRITE_HOOK_LOCATION_KEY)) &&
              (this.Evl = Vector_1.Vector.Create(t.D_K2_GetActorLocation())),
            this.Lo.Option.Type)
          ) {
            case IComponent_1.EExploreSkillInteractType.PullGiant:
            case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
              this.ChangeManipulateInteractPointState(0);
              break;
            case IComponent_1.EExploreSkillInteractType.PullStatue:
              this.Val();
          }
        }),
        (this.GUe = (t, e, i) => {
          var n = this.g4l(e);
          this.f4l(e) &&
            n &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.GUe,
            );
        }),
        (this.eln = (t) => {
          switch (this.Lo.Option.Type) {
            case IComponent_1.EExploreSkillInteractType.PullGiant:
            case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
            case IComponent_1.EExploreSkillInteractType.RagDollCrushingRock:
            case IComponent_1.EExploreSkillInteractType.RagDollDestroySolidRock:
            case IComponent_1.EExploreSkillInteractType.LonelyDollPollutant:
            case IComponent_1.EExploreSkillInteractType.Custom:
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange,
                t,
                this,
              );
          }
        });
    }
    get Bi_() {
      if (!this.Di_) {
        var t =
          GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
            "FloatStatue.BoundSize",
          );
        if (t) {
          var e = t.Value.split(",");
          if (e.length !== this.Ui_.Tuple.length)
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "雕像移动射线检测盒体FloatStatue.BoundSize配置错误,非x,y,z形式",
                ["Value", t.Value],
              );
          else
            for (let t = 0; t < this.Ui_.Tuple.length; t++)
              this.Ui_.Tuple[t] = (100 * parseFloat(e[t])) / 2;
        }
        (this.Di_ = UE.NewObject(UE.TraceBoxElement.StaticClass())),
          (this.Di_.WorldContextObject = this.Hte.Owner),
          (this.Di_.bIsSingle = !1),
          (this.Di_.bIgnoreSelf = !0),
          this.Di_.SetTraceTypeQuery(
            QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
          );
        var i =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
            this.Hte.GetSceneInteractionLevelHandleId(),
          );
        for (let t = 0; t < i.Num(); t++) this.Di_.ActorsToIgnore.Add(i.Get(t));
        (this.Di_.DrawTime = 0.5),
          TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
            this.Di_,
            this.Ui_.ToUeVector(),
          );
      }
      return (
        this.Di_.SetDrawDebugTrace(
          SceneItemExploreInteractComponent_1.StatueTraceDebug ? 1 : 0,
        ),
        this.Di_
      );
    }
    get Location() {
      return this.Evl ?? this.Hte.ActorLocationProxy;
    }
    get CreatureDataId() {
      return this.EIe.GetCreatureDataId();
    }
    get IsLocked() {
      return this.Oln.IsLocked;
    }
    get InteractActions() {
      switch (this.Lo.Option.Type) {
        case IComponent_1.EExploreSkillInteractType.PullGiant:
        case IComponent_1.EExploreSkillInteractType.Custom:
          return this.Lo.Option.Actions;
        default:
          return;
      }
    }
    get OnlineTypeCanInteract() {
      return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
        this.Hfn,
      );
    }
    get Type() {
      return this.Lo?.Option.Type;
    }
    get ExploreSkillUiResource() {
      return this.Lo?.ExploreSkillUiResource;
    }
    OnInitData(t) {
      var t = t.GetParam(SceneItemExploreInteractComponent_1)[0];
      return (
        (this.Lo = t),
        this.Lo.PlayerStateRestritionId &&
          ((t = {
            Type: "CheckPlayerStateRestriction",
            RestrictionId: this.Lo.PlayerStateRestritionId,
          }),
          (this.YO = { Type: 0, Conditions: [t] })),
        !0
      );
    }
    OnStart() {
      (this.Hte = this.Entity.GetComponent(200)),
        (this.EIe = this.Entity.GetComponent(0)),
        (this.Oln = this.Entity.GetComponent(128)),
        (this.Lie = this.Entity.GetComponent(194)),
        EventSystem_1.EventSystem.OnceWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        this.Lo.Option.Type !==
          IComponent_1.EExploreSkillInteractType.PullStatue &&
          this.Disable("非拉取雕像类型不用tick"),
        this.Lrl();
      var t = this.EIe?.GetBaseInfo();
      switch (((this.Hfn = t?.OnlineInteractType), this.Lo.Option.Type)) {
        case IComponent_1.EExploreSkillInteractType.PullGiant:
        case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
        case IComponent_1.EExploreSkillInteractType.RagDollCrushingRock:
        case IComponent_1.EExploreSkillInteractType.RagDollDestroySolidRock:
        case IComponent_1.EExploreSkillInteractType.LonelyDollPollutant:
        case IComponent_1.EExploreSkillInteractType.Custom:
          (this.vtn = this.Entity.GetComponent(84)),
            this.vtn?.Valid && this.vtn.AddOnPlayerOverlapCallback(this.eln);
          break;
        case IComponent_1.EExploreSkillInteractType.PullStatue:
          this.Gce = this.Entity.GetComponent(126);
      }
      return this.p4l(), !0;
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.GUe,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.GUe,
          ),
        !0
      );
    }
    p4l() {
      if (this.Lo?.IgnoresCollisionCfg) {
        this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
          GlobalData_1.GlobalData.World,
          UE.KuroActorSubsystem.StaticClass(),
        );
        var t = this.Lo.IgnoresCollisionCfg;
        for (const o of t.IgnoreEntitys) {
          var e =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
          e && e.Valid && e.Entity && e.Entity.Valid
            ? this.m4l.add(e.Entity)
            : this.C4l.add(o);
        }
        0 < this.C4l.size &&
          (EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.AddEntity,
            this.GUe,
          ) ||
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.AddEntity,
              this.GUe,
            ));
        for (const r of t.IgnoreActors) {
          var i = r.PathName.split(".")[1] + "." + r.PathName.split(".")[2],
            n = this.aln.GetActor(new UE.FName(i));
          n ? this._sr.add(n) : this.d4l.add(i);
        }
        0 < this.d4l.size &&
          ((this.Rhl = (t) => {
            var e = t?.toString();
            e &&
              this.d4l.has(e) &&
              (this.d4l.delete(e), (e = this.aln?.GetActor(t))) &&
              this._sr.add(e),
              0 === this.d4l.size &&
                this.aln?.OnAddToSubsystem.Remove(this.Rhl);
          }),
          this.aln.OnAddToSubsystem.Add(this.Rhl));
      }
    }
    CheckTraceResult(t, e) {
      if (t)
        for (let t = 0; t < e.HitResult.Actors.Num(); t++) {
          var i = e.HitResult.Actors.Get(t);
          if (void 0 !== i && !this._sr.has(i)) {
            let t = void 0;
            if (
              !(
                ((t = (
                  UE.KuroStaticLibrary.IsImplementInterface(
                    i.GetClass(),
                    UE.BPI_CreatureInterface_C.StaticClass(),
                  )
                    ? ActorUtils_1.ActorUtils
                    : ModelManager_1.ModelManager.SceneInteractionModel
                ).GetEntityByActor(i)) &&
                  this.m4l.has(t.Entity)) ||
                t?.Entity === this.Entity
              )
            )
              return !0;
          }
        }
      return !1;
    }
    OnTick(t) {
      this.Lo.Option.Type ===
        IComponent_1.EExploreSkillInteractType.PullStatue && this.Hal(t);
    }
    Lrl() {
      switch (this.Lo.Option.Type) {
        case IComponent_1.EExploreSkillInteractType.PullGiant:
          this.Trl = -611134292;
          break;
        case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
          this.Trl = -2047045017;
          break;
        case IComponent_1.EExploreSkillInteractType.RagDollCrushingRock:
          this.Trl = -798481435;
          break;
        case IComponent_1.EExploreSkillInteractType.RagDollDestroySolidRock:
          this.Trl = -154105489;
          break;
        case IComponent_1.EExploreSkillInteractType.LonelyDollPollutant:
          this.Trl = 795459287;
          break;
        case IComponent_1.EExploreSkillInteractType.Custom:
          var t = this.Lo.Option.LockConfigId,
            t =
              ExploreSkillInteractById_1.configExploreSkillInteractById.GetConfig(
                t,
              )?.Tag;
          t &&
            (this.Trl = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
      }
    }
    get MarkTagId() {
      return this.Trl;
    }
    Val() {
      var t;
      this.Lo &&
        this.Lo.Option.Type ===
          IComponent_1.EExploreSkillInteractType.PullStatue &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          this.Lo.Option.StatueInteractPointId,
        )) && t.Entity
          ? ((this.Oal = t.Entity.GetComponent(148)),
            (this.Oal.AttachParent = this).eJl())
          : ((this.Gal = this.Lo.Option.StatueInteractPointId),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.AddEntity,
              this.GUe,
            )));
    }
    eJl() {
      if (
        this.Oal &&
        this.Lo &&
        this.Lo.Option.Type ===
          IComponent_1.EExploreSkillInteractType.PullStatue
      ) {
        var t = this.Oal.HangingPoints;
        if (void 0 === t || 4 !== t.length)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              31,
              "[SceneItemExploreInteractComponent]雕像交互点挂点数量不正确",
              ["PbDataId", this.Lo.Option.StatueInteractPointId],
            );
        else {
          this.HangPointData.clear();
          for (const o of t) {
            var e = this.Hte?.GetInteractionMainActor().GetActorByKey(o);
            if (void 0 === e)
              return void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  31,
                  "[SceneItemExploreInteractComponent]雕像交互点挂点不存在",
                  ["PbDataId", this.Lo.Option.StatueInteractPointId],
                  ["PointKey", o],
                )
              );
            var i = Vector_1.Vector.Create(e.D_K2_GetActorLocation()),
              n = Vector_1.Vector.Create(this.Hte.ActorLocationProxy);
            i.Subtraction(n, n),
              (n.Z = 0),
              n.Normalize(),
              this.HangPointData.add(new HangPointData(e, n));
          }
        }
      }
    }
    g4l(t) {
      if (!(0 < this.HangPointData.size)) {
        if (!t?.Valid) return !1;
        t = t.Entity.GetComponent(0);
        if (this.Gal !== t?.GetPbDataId()) return !1;
        this.Lo.Option.Type ===
          IComponent_1.EExploreSkillInteractType.PullStatue && this.Val();
      }
      return !0;
    }
    f4l(t) {
      return (
        0 === this.C4l.size ||
        (!!t?.Valid &&
          (this.C4l.has(t.PbDataId) &&
            (this.m4l.add(t.Entity), this.C4l.delete(t.PbDataId)),
          0 === this.C4l.size))
      );
    }
    get PullTime() {
      switch (this.Lo.Option.Type) {
        case IComponent_1.EExploreSkillInteractType.PullGiant:
        case IComponent_1.EExploreSkillInteractType.StatueInteractPoint:
          return this.Lo.Option.PullTime;
        default:
          return -1;
      }
    }
    get MatchRoleOption() {
      return this.Lo?.MatchRoleOption;
    }
    OnClear() {
      return this.vtn?.RemoveOnPlayerOverlapCallback(this.eln), !0;
    }
    CheckCondition() {
      return (
        void 0 === this.YO ||
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          this.YO,
          this.Hte.Owner,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
        )
      );
    }
    TypeSpecialCheck() {
      return (
        this.Lo.Option.Type !==
          IComponent_1.EExploreSkillInteractType.StatueInteractPoint ||
        this.jal()
      );
    }
    ChangeManipulateInteractPointState(t) {
      this.Valid &&
        this.ac !== t &&
        (this.Lie.RemoveTag(
          manipulateInteractPointPointStateTagMap.get(this.ac),
        ),
        (this.ac = t),
        this.Lie.AddTag(manipulateInteractPointPointStateTagMap.get(this.ac)));
    }
    GetLockWeight(t) {
      var e = this.Lo?.SearchTargetCfg;
      if (!e) return 0;
      switch (e.Type) {
        case IComponent_1.EExploreSkillSearchTargetCfg.EnterScreenWeight:
          return e.Weight;
        case IComponent_1.EExploreSkillSearchTargetCfg.AngleWeight:
          return this.CalcAngleWeight(t);
        default:
          return 0;
      }
    }
    CalcAngleWeight(t) {
      var e = this.Lo.SearchTargetCfg,
        i = this.Hte.ActorLocationProxy,
        n = Vector_1.Vector.Create(i),
        o = (n.SubtractionEqual(t), n.Normalize(), Vector_1.Vector.Create());
      CameraController_1.CameraController.CameraRotator.Vector(o),
        o.Normalize();
      let r = -MathUtils_1.MathUtils.MaxFloat;
      var s = Vector_1.Vector.DotProduct(n, o);
      for (const a of e.AngleWeight)
        s > Math.cos((a.Angle / 180) * Math.PI) && (r = a.Weight);
      return r === -MathUtils_1.MathUtils.MaxFloat
        ? -MathUtils_1.MathUtils.MaxFloat
        : ((n = Vector_1.Vector.Dist(i, t) / 100),
          (o = DEFAULT_MAX_DISTANCE - n < 1 ? 1 : DEFAULT_MAX_DISTANCE - n),
          r * o);
    }
    Hal(t) {
      if (void 0 === this.Oal)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Temp",
            31,
            "[SceneItemExploreInteractComponent]雕像交互点未初始化",
            ["PbDataId", this.EIe?.GetPbDataId()],
          );
      else if (0 !== this.HangPointData.size) {
        var i = Global_1.Global.BaseCharacter,
          i = Vector_1.Vector.Create(i?.D_K2_GetActorLocation()),
          n = Vector_1.Vector.Create(this.Hte.ActorLocationProxy);
        i.Subtraction(this.Hte.ActorLocationProxy, n), (n.Z = 0), n.Normalize();
        let t = -MathUtils_1.MathUtils.MaxFloat,
          e = void 0;
        for (const r of this.HangPointData) {
          var o = Vector_1.Vector.DotProduct(r.HangPointDir, n);
          o > t && ((t = o), (e = r.HangPointActor));
        }
        void 0 !== e && (this.Oal.AttachStatueInteractPoint = e);
      }
    }
    StartMove(t, e, i) {
      if (void 0 !== this.kal) {
        var n = new SceneItemMoveComponent_1.MoveTarget(t, i);
        (this.IsMoving = !0),
          this.Lie?.HasTag(180377415) || this.Lie?.AddTag(180377415),
          this.Gce.AddMoveTarget(n);
        const o = () => {
          this.Lie?.HasTag(180377415) && this.Lie?.RemoveTag(180377415),
            (this.IsMoving = !1),
            this.kal.RequestMatchOutlet(this.Entity, t, e),
            (this.kal = void 0),
            this.Gce.RemoveStopMoveCallback(o),
            this.eJl();
        };
        this.Gce.AddStopMoveCallback(o),
          this.Gce.AddSimpleRotation(
            this.Hte.Owner,
            this.Hte.ActorRotationProxy,
            e,
            i,
          );
      }
    }
    StartInteractPullStatue() {
      (this.Zzl = !0), (this.Jzl = this.Fal);
    }
    EndInteractPullStatue() {
      (this.Zzl = !1), (this.Jzl = void 0);
    }
    TraceToOutlet(t, e) {
      var i = Vector_1.Vector.Create(this.Hte.ActorLocationProxy),
        i =
          ((i.Z += this.Ui_.Z),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Bi_, i),
          (t.Z += this.Ui_.Z),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Bi_, t),
          TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
            this.Bi_,
            e,
          ),
          TraceElementCommon_1.TraceElementCommon.BoxTrace(
            this.Bi_,
            "[StatueInteractBoxTrace]",
          ));
      if (i)
        for (let t = 0; t < this.Bi_.HitResult.Actors.Num(); t++) {
          var n = this.Bi_.HitResult.Actors.Get(t);
          if (void 0 !== n) {
            let t = void 0;
            n = (t = (
              UE.KuroStaticLibrary.IsImplementInterface(
                n.GetClass(),
                UE.BPI_CreatureInterface_C.StaticClass(),
              )
                ? ActorUtils_1.ActorUtils
                : ModelManager_1.ModelManager.SceneInteractionModel
            ).GetEntityByActor(n))?.Entity?.GetComponent(261);
            if (!t || !n) return !0;
          }
        }
      return !1;
    }
    get HangingPoints() {
      if (
        this.Lo.Option.Type ===
        IComponent_1.EExploreSkillInteractType.StatueInteractPoint
      )
        return this.Lo.Option.HangingPointList;
    }
    set AttachStatueInteractPoint(t) {
      this.Nal !== t &&
        (void 0 !== this.Nal && this.Hte?.Owner?.K2_DetachFromActor(1, 1, 1),
        void 0 !== (this.Nal = t)) &&
        this.Hte?.Owner?.K2_AttachToActor(t, void 0, 2, 2, 1, !1);
    }
    get AttachStatueInteractPoint() {
      return this.Nal;
    }
    MoveToOutlet() {
      var t, e, i;
      this.Type ===
        IComponent_1.EExploreSkillInteractType.StatueInteractPoint &&
        void 0 !== this.AttachParent &&
        ((t = Vector_1.Vector.Create(
          this.Jzl.GetMatchLocation(this.AttachParent.Entity),
        )),
        (e = Rotator_1.Rotator.Create(
          this.Jzl.GetMatchRotation(this.AttachParent.Entity),
        )),
        (i = Vector_1.Vector.Dist(this.Location, t)),
        (i = Math.min(
          i /
            ModelManager_1.ModelManager.ManipulateInteractModel
              .StatueInteractMoveSpeed,
          ModelManager_1.ModelManager.ManipulateInteractModel
            .StatueInteractMaxMoveTime,
        )),
        (this.AttachParent.kal = this.Jzl),
        (this.Jzl.EntityInSocket = this.AttachParent.Entity),
        this.AttachParent.StartMove(t, e, i),
        (this.Fal = void 0));
    }
    jal() {
      if (this.Zzl) return !1;
      if (void 0 === this.AttachParent || this.AttachParent.IsMoving) return !1;
      if (this.Oln?.IsLocked) return !1;
      if (this.Lie?.HasTag(-709838471)) return !1;
      var t = this.AttachParent.Entity.GetComponent(128);
      if (void 0 === t || t.IsLocked) return !1;
      t = this.AttachParent.Entity.GetComponent(194);
      if (void 0 === t || t.HasTag(-709838471)) return !1;
      t = this.AttachParent.Entity.GetComponent(200);
      if (void 0 === t) return !1;
      var e = this.AttachParent.MatchRoleOption;
      if (
        e &&
        0 < e?.length &&
        !SceneTeamController_1.SceneTeamController.IsMatchRoleOption(e)
      )
        return !1;
      e =
        Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(3);
      if (void 0 === e) return !1;
      this.Fal = void 0;
      var t = Vector_1.Vector.Create(t.ActorLocationProxy),
        i = Vector_1.Vector.Create(e.ActorLocationProxy),
        e = Vector_1.Vector.Dist2D(t, i),
        n =
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
            e,
            1,
            this.DKo,
          ),
          Vector_1.Vector.Create(t));
      n.SubtractionEqual(i), (n.Z = 0), n.Normalize();
      let o = MathUtils_1.MathUtils.MaxFloat;
      for (const _ of this.DKo) {
        var r = _.Entity?.GetComponent(261);
        if (
          void 0 !== r &&
          !r.EntityInSocket &&
          r.TryMatch(this.AttachParent.Entity)
        ) {
          var s = _.Entity?.GetComponent(200);
          if (void 0 !== s) {
            var a = Vector_1.Vector.Create(s.ActorLocationProxy),
              a =
                (a.SubtractionEqual(i),
                (a.Z = 0),
                a.Normalize(),
                Vector_1.Vector.DotProduct(n, a)),
              h =
                ModelManager_1.ModelManager.ManipulateInteractModel
                  ?.StatueInteractCheckAngle;
            let t = OUTLET_ANGLE_LIMIT_COS_VALUE;
            a <
              (t = void 0 !== h && 0 < h ? Math.cos((h / 180) * Math.PI) : t) ||
              (a = Vector_1.Vector.Dist2D(i, s.ActorLocationProxy)) > o ||
              ((h = r.GetMatchLocation(this.AttachParent.Entity)),
              (s = r.GetMatchRotation(this.AttachParent.Entity)),
              this.AttachParent.TraceToOutlet(h, s)) ||
              ((o = a), (this.Fal = r));
          }
        }
      }
      return void 0 !== this.Fal;
    }
  });
(SceneItemExploreInteractComponent.StatueTraceDebug = !1),
  (SceneItemExploreInteractComponent = SceneItemExploreInteractComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(148)],
      SceneItemExploreInteractComponent,
    )),
  (exports.SceneItemExploreInteractComponent =
    SceneItemExploreInteractComponent);
//# sourceMappingURL=SceneItemExploreInteractComponent.js.map
