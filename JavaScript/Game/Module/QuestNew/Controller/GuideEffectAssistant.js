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
              var o,
                n,
                s =
                  Global_1.Global.BaseCharacter?.CharacterActorComponent
                    ?.ActorLocationProxy;
              let e = MathUtils_1.MathUtils.MaxFloat,
                t = -1;
              for ([o, n] of i) {
                if (!n.SplinePoints)
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Guide",
                      32,
                      "当前追踪任务Spline未找到",
                      ["TrackQuestId:", this.$oo],
                      ["SplineId", o],
                    )
                  );
                var [r, a, _] = this.tro(s, n);
                !r ||
                  _ >
                    ConfigManager_1.ConfigManager.LevelGamePlayConfig
                      .GenExtraGuideEffectMaxDist ||
                  ((n.BestIndex = a), _ < e && ((e = _), (t = o)));
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
                  h = this.oro(s, l, l.BestIndex, f === t && E);
                this.Yoo <= 0
                  ? Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Guide",
                      32,
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
                Log_1.Log.Debug("Guide", 34, "当前追踪任务未配置引导特效", [
                  "TrackQuestId:",
                  this.$oo,
                ]);
          } else
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Guide", 34, "当前无追踪任务");
      }),
      (this.nro = (e, t, i) => {
        t === Protocol_1.Aki.Protocol.tTs.Proto_Finish &&
          this.zoo.has(e) &&
          (this.$oo === e && (this.iro(), (this.$oo = void 0)),
          this.zoo.delete(e));
      }),
      (this.$Ct = (e) => {
        e === Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest &&
          (this.iro(),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
          (this.$oo = e ? e.Id : void 0));
      });
  }
  rro(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Guide", 32, "[GuideEffectAssistant] 生成新的特效");
    var i = MathUtils_1.MathUtils.DefaultTransform;
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
          const o = e.CurActor;
          this.Zoo.add(o),
            EffectSystem_1.EffectSystem.AddFinishCallback(
              e.EffectHandle,
              (e) => {
                this.aro(o);
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
      } else ActorSystem_1.ActorSystem.Put(t), (e.CurActor = void 0);
    }
  }
  aro(e) {
    e?.IsValid() &&
      this.Zoo.has(e) &&
      (this.Zoo.delete(e), ActorSystem_1.ActorSystem.Put(e));
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
      o,
      t = t.SplinePoints;
    let n = Number.MAX_VALUE,
      s = -1;
    for ([i, o] of t.entries()) {
      var r = Vector_1.Vector.Dist(o, e);
      r < n && ((n = r), (s = i));
    }
    return -1 === s ? [!1, 0, 0] : [!0, s, n];
  }
  oro(t, e, i, o) {
    var n = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePathLine_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      ),
      s =
        (n.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0),
        n.GetComponentByClass(UE.SplineComponent.StaticClass())),
      r = e.SplinePoints,
      a = UE.NewArray(UE.Vector);
    o && this.hro(t, r[i], a);
    var _ = i + 1 + Math.ceil(SHOW_EFFECT_DISTANCE / SAMPLE_STEP);
    _ = MathUtils_1.MathUtils.Clamp(_, i + 1, r.length);
    for (let e = i + 1; e < _; e++) {
      var f = Vector_1.Vector.Create();
      f.DeepCopy(r[e]), f.SubtractionEqual(t), a.Add(f.ToUeVector());
    }
    return s.SetSplinePoints(a, 0, !0), (this.Yoo = a.Num()), n;
  }
  hro(t, e, i) {
    var o = UE.NavigationSystemV1.FindPathToLocationSynchronously(
      GlobalData_1.GlobalData.World,
      t.ToUeVector(),
      e.ToUeVector(),
      void 0,
      void 0,
      !0,
    );
    for (let e = 0; e < o.PathPoints.Num(); e++) {
      var n = Vector_1.Vector.Create(o.PathPoints.Get(e)),
        n = (n.SubtractionEqual(t), n.ToUeVector());
      this.aoe(n, GlobalData_1.GlobalData.World),
        n.Set(
          n.X,
          n.Y,
          n.Z +
            ConfigManager_1.ConfigManager.LevelGamePlayConfig
              .ExtraGuideEffectRaiseDist,
        ),
        i.Add(n);
    }
  }
  lro(e, t) {
    var i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (i) {
      var o = (0, IComponent_1.getComponent)(
        i.ComponentsData,
        "SplineComponent",
      );
      if (o) {
        i = Vector_1.Vector.Create(
          i.Transform?.Pos.X ?? 0,
          i.Transform?.Pos.Y ?? 0,
          i.Transform?.Pos.Z ?? 0,
        );
        if (o.Option.Type !== IComponent_1.ESplineType.Effect)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[SceneItemGuidePathComponent.LoadPathAsset] SplineComponent配置类型不是Effect",
              ["SplineEntityId", e],
            );
        else {
          (this.Joo = o.Option.CreateOption.Type),
            this.Joo ===
              IComponent_1.EEffectSplineCreateMode.EquidistantPoint &&
              ((o = o.Option.CreateOption), (this._0e = o.Space));
          var n =
              ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
                e,
                Global_1.Global.BaseCharacter.EntityId,
                1,
              ),
            o =
              ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                e,
              );
          if (ObjectUtils_1.ObjectUtils.IsValid(o)) {
            o.K2_SetActorLocation(i.ToUeVector(), !1, void 0, !1);
            var s = new Array();
            for (let e = 0; e < n.GetNumberOfSplinePoints() - 1; ++e) {
              var r = n.GetDistanceAlongSplineAtSplinePoint(e),
                a = n.GetDistanceAlongSplineAtSplinePoint(e + 1);
              for (let e = r; e < a; e += SAMPLE_STEP) {
                const _ = n.GetWorldLocationAtDistanceAlongSpline(e);
                s.push(Vector_1.Vector.Create(_));
              }
            }
            const _ = n.GetWorldLocationAtSplinePoint(
              n.GetNumberOfSplinePoints() - 1,
            );
            s.push(Vector_1.Vector.Create(_)),
              (t.SplinePoints = s),
              (t.SplineData = o.SplineData),
              (t.SplineLength = n.GetSplineLength());
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                32,
                "[SceneItemGuidePathComponent.LoadPathAsset] Spline生成失败",
                ["SplineEntityId", e],
              );
        }
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            32,
            "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到SplineComponent配置",
            ["SplineEntityId", e],
          );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Level",
          32,
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
      o = i.HitResult;
    t
      ? TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, e)
      : (i.SetEndLocation(e.X, e.Y, e.Z + TRACE_DISTANCE),
        TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY) &&
          ((o = i.HitResult),
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, e)));
  }
  AddQuestTraceEffect(e, t, i) {
    var o = new EffectData();
    let n = new Map();
    this.zoo.has(e) ? (n = this.zoo.get(e)) : this.zoo.set(e, n),
      n.set(i, o),
      (o.Duration = t),
      this.lro(i, o);
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
