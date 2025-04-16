"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideEffectAssistant = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  QuestDefine_1 = require("../QuestDefine"),
  SAMPLE_STEP = 200,
  SHOW_EFFECT_DISTANCE = 5e4,
  TRACE_DISTANCE = 500,
  PROFILE_KEY = "GuideEffectAssistant_GenerateNavigationPoint";
class EffectData {
  constructor() {
    (this.Duration = 0),
      (this.ShowTime = 0),
      (this.HideTime = 0),
      (this.EffectHandle = 0),
      (this.SplinePoints = void 0),
      (this.CurActor = void 0),
      (this.SplineData = void 0),
      (this.SplineLength = 0),
      (this.State = 0),
      (this.BestIndex = 0);
  }
}
class GuideEffectAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.$oo = 0),
      (this.Yoo = 0),
      (this.Joo = IComponent_1.EEffectSplineCreateMode.WholeLine),
      (this._0e = 0),
      (this.zoo = new Map()),
      (this.Zoo = new Set()),
      (this.ero = (e, i) => {
        if (
          i === QuestDefine_1.SCAN_SKILL_ID &&
          e === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()
        )
          if (this.$oo) {
            i = this.zoo.get(this.$oo);
            if (i) {
              var n,
                s,
                o =
                  Global_1.Global.BaseCharacter?.CharacterActorComponent
                    ?.ActorLocationProxy;
              let e = MathUtils_1.MathUtils.MaxFloat,
                t = -1;
              for ([n, s] of i) {
                if (!s.SplinePoints)
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Guide",
                      31,
                      "当前追踪任务Spline未找到",
                      ["TrackQuestId:", this.$oo],
                      ["SplineId", n],
                    )
                  );
                var [r, a, _] = this.tro(o, s);
                !r ||
                  _ >
                    ConfigManager_1.ConfigManager.LevelGamePlayConfig
                      .GenExtraGuideEffectMaxDist ||
                  ((s.BestIndex = a), _ < e && ((e = _), (t = n)));
              }
              var f,
                l,
                E =
                  e >
                  ConfigManager_1.ConfigManager.LevelGamePlayConfig
                    .GenExtraGuideEffectMinDist;
              this.iro();
              for ([f, l] of i) {
                var c,
                  h = this.oro(o, l, l.BestIndex, f === t && E);
                this.Yoo <= 0
                  ? Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Guide",
                      31,
                      "当前位置无法生成spline",
                      ["TrackQuestId:", this.$oo],
                      ["SplineId", f],
                    )
                  : ((c = l.SplineData.Effect),
                    (c = this.rro(c, h)),
                    (l.CurActor = h),
                    EffectSystem_1.EffectSystem.IsValid(c) &&
                      ((l.EffectHandle = c),
                      (l.State = 1),
                      EffectSystem_1.EffectSystem.GetEffectActor(
                        c,
                      ).K2_AttachToActor(h, void 0, 2, 2, 2, !1),
                      (h =
                        EffectSystem_1.EffectSystem.GetNiagaraComponent(
                          c,
                        )) instanceof UE.NiagaraComponent &&
                        h.ReinitializeSystem(),
                      this.Joo ===
                        IComponent_1.EEffectSplineCreateMode.EquidistantPoint &&
                        ((c = Math.ceil(l.SplineLength / this._0e)),
                        h.SetIntParameter(new UE.FName("SpawnCount"), c)),
                      (l.ShowTime = Time_1.Time.Now),
                      (l.HideTime =
                        l.ShowTime +
                        l.Duration * TimeUtil_1.TimeUtil.InverseMillisecond)));
              }
            } else
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Guide", 33, "当前追踪任务未配置引导特效", [
                  "TrackQuestId:",
                  this.$oo,
                ]);
          } else
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Guide", 33, "当前无追踪任务");
      }),
      (this.nro = (e, t, i) => {
        t === Protocol_1.Aki.Protocol.hTs.a3_ &&
          this.zoo.has(e) &&
          (this.$oo === e && (this.iro(), (this.$oo = void 0)),
          this.zoo.delete(e));
      }),
      (this.$Ct = (e) => {
        e === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
          (this.iro(),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
          (this.$oo = e ? e.Id : void 0));
      });
  }
  rro(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Guide", 31, "[GuideEffectAssistant] 生成新的特效");
    var i = MathUtils_1.MathUtils.DefaultTransformDouble;
    return EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      i,
      e,
      "[GuideEffectAssistant.GenerateEffectHandle]",
      new EffectContext_1.EffectContext(void 0, t),
    );
  }
  OnDestroy() {
    this.zoo.clear();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharUseSkill,
      this.ero,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.nro,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.$Ct,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharUseSkill,
      this.ero,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.nro,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.$Ct,
      );
  }
  iro() {
    var e = this.zoo.get(this.$oo);
    if (e) for (var [, t] of e) this.sro(t);
  }
  sro(e) {
    var t = e.CurActor;
    if (t?.IsValid()) {
      var i = e.EffectHandle;
      if (EffectSystem_1.EffectSystem.IsValid(i)) {
        if (1 === e.State) {
          const n = e.CurActor;
          this.Zoo.add(n),
            EffectSystem_1.EffectSystem.AddFinishCallback(
              e.EffectHandle,
              (e) => {
                this.aro(n);
              },
            ),
            (e.CurActor = void 0),
            EffectSystem_1.EffectSystem.StopEffectById(
              i,
              "[GuideEffectAssistant.ClearCurSplineAndEffectHandle]",
              !1,
            ),
            (e.State = 2);
        }
      } else
        ActorSystem_1.ActorSystem.Put(
          "GuideEffectAssistant.ClearSplineAndEffectHandle",
          t,
        ),
          (e.CurActor = void 0);
    }
  }
  aro(e) {
    e?.IsValid() &&
      this.Zoo.has(e) &&
      (this.Zoo.delete(e),
      ActorSystem_1.ActorSystem.Put("GuideEffectAssistant.AfterEffectEnd", e));
  }
  UpdateQuestGuideEffect(e) {
    if (this.$oo) {
      var t = this.zoo.get(this.$oo);
      if (t)
        for (var [, i] of t)
          Time_1.Time.Now >= i.HideTime &&
            (this.iro(), (i.HideTime = Number.MAX_VALUE));
    }
  }
  tro(e, t) {
    var i,
      n,
      t = t.SplinePoints;
    let s = Number.MAX_VALUE,
      o = -1;
    for ([i, n] of t.entries()) {
      var r = Vector_1.Vector.Dist(n, e);
      r < s && ((s = r), (o = i));
    }
    return -1 === o ? [!1, 0, 0] : [!0, o, s];
  }
  oro(t, e, i, n) {
    var s = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePathLine_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransformDouble,
      ),
      o =
        (s.D_K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0),
        s.GetComponentByClass(UE.SplineComponent.StaticClass())),
      r = e.SplinePoints,
      a = UE.NewArray(UE.VectorDouble);
    n && this.hro(t, r[i], a);
    var _ = i + 1 + Math.ceil(SHOW_EFFECT_DISTANCE / SAMPLE_STEP);
    _ = MathUtils_1.MathUtils.Clamp(_, i + 1, r.length);
    for (let e = i + 1; e < _; e++) {
      var f = Vector_1.Vector.Create();
      f.DeepCopy(r[e]), f.SubtractionEqual(t), a.Add(f.ToUeVector());
    }
    return o.D_SetSplinePoints(a, 0, !0), (this.Yoo = a.Num()), s;
  }
  hro(t, e, i) {
    var n = UE.NavigationSystemV1.FindPathToLocationSynchronously(
      GlobalData_1.GlobalData.World,
      t.ToUeVectorOld(),
      e.ToUeVectorOld(),
      void 0,
      void 0,
      !0,
    );
    for (let e = 0; e < n.PathPoints.Num(); e++) {
      var s = Vector_1.Vector.Create(n.PathPoints.Get(e)),
        s = (s.SubtractionEqual(t), s.ToUeVector());
      this.aoe(s, GlobalData_1.GlobalData.World),
        s.Set(
          s.X,
          s.Y,
          s.Z +
            ConfigManager_1.ConfigManager.LevelGamePlayConfig
              .ExtraGuideEffectRaiseDist,
        ),
        i.Add(s);
    }
  }
  lro(e, t) {
    var i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (i) {
      var n = (0, IComponent_1.getComponent)(
        i.ComponentsData,
        "SplineComponent",
      );
      if (n) {
        i = Vector_1.Vector.Create(
          i.Transform?.Pos.X ?? 0,
          i.Transform?.Pos.Y ?? 0,
          i.Transform?.Pos.Z ?? 0,
        );
        if (n.Option.Type !== IComponent_1.ESplineType.Effect)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              31,
              "[SceneItemGuidePathComponent.LoadPathAsset] SplineComponent配置类型不是Effect",
              ["SplineEntityId", e],
            );
        else {
          (this.Joo = n.Option.CreateOption.Type),
            this.Joo ===
              IComponent_1.EEffectSplineCreateMode.EquidistantPoint &&
              ((n = n.Option.CreateOption), (this._0e = n.Space));
          var s =
              ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
                e,
                Global_1.Global.BaseCharacter.EntityId,
                1,
              ),
            n =
              ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                e,
              );
          if (ObjectUtils_1.ObjectUtils.IsValid(n)) {
            n.D_K2_SetActorLocation(i.ToUeVector(), !1, void 0, !1);
            var o = new Array();
            for (let e = 0; e < s.GetNumberOfSplinePoints() - 1; ++e) {
              var r = s.GetDistanceAlongSplineAtSplinePoint(e),
                a = s.GetDistanceAlongSplineAtSplinePoint(e + 1);
              for (let e = r; e < a; e += SAMPLE_STEP) {
                const _ = s.D_GetLocationAtDistanceAlongSpline(e, 1);
                o.push(Vector_1.Vector.Create(_));
              }
            }
            const _ = s.D_GetLocationAtSplinePoint(
              s.GetNumberOfSplinePoints() - 1,
              1,
            );
            o.push(Vector_1.Vector.Create(_)),
              (t.SplinePoints = o),
              (t.SplineData = n.SplineData),
              (t.SplineLength = s.GetSplineLength());
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                31,
                "[SceneItemGuidePathComponent.LoadPathAsset] Spline生成失败",
                ["SplineEntityId", e],
              );
        }
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            31,
            "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到SplineComponent配置",
            ["SplineEntityId", e],
          );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Level",
          31,
          "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到Spline Entity",
          ["SplineEntityId", e],
        );
  }
  ClearQuestTraceEffect(e) {
    this.zoo.delete(e);
  }
  aoe(e, t) {
    if (!GuideEffectAssistant.uoe) {
      const i = UE.NewObject(UE.TraceLineElement.StaticClass());
      (i.bIsSingle = !0),
        (i.bIgnoreSelf = !0),
        i.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
        (GuideEffectAssistant.uoe = i);
    }
    const i = GuideEffectAssistant.uoe;
    (i.WorldContextObject = t),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, e),
      i.SetEndLocation(e.X, e.Y, e.Z - TRACE_DISTANCE);
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY),
      n = i.HitResult;
    t
      ? TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, e)
      : (i.SetEndLocation(e.X, e.Y, e.Z + TRACE_DISTANCE),
        TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY) &&
          ((n = i.HitResult),
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, e)));
  }
  AddQuestTraceEffect(e, t, i) {
    var n = new EffectData();
    let s = new Map();
    this.zoo.has(e) ? (s = this.zoo.get(e)) : this.zoo.set(e, s),
      s.set(i, n),
      (n.Duration = t),
      this.lro(i, n);
  }
  RemoveQuestTraceEffect(e, t) {
    var i,
      e = this.zoo.get(e);
    void 0 !== e &&
      void 0 !== (i = e.get(t)) &&
      (ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t, t),
      this.sro(i),
      e.delete(t));
  }
}
(exports.GuideEffectAssistant = GuideEffectAssistant).uoe = void 0;
//# sourceMappingURL=GuideEffectAssistant.js.map
