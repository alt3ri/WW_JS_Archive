"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideEffectAssistant = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const QuestDefine_1 = require("../QuestDefine");
const SAMPLE_STEP = 200;
const SHOW_EFFECT_DISTANCE = 5e4;
const TRACE_DISTANCE = 500;
const PROFILE_KEY = "GuideEffectAssistant_GenerateNavigationPoint";
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
      (this.zio = 0),
      (this.Zio = 0),
      (this.eoo = IComponent_1.EEffectSplineCreateMode.WholeLine),
      (this._0e = 0),
      (this.too = new Map()),
      (this.ioo = new Set()),
      (this.ooo = (e, i) => {
        if (
          i === QuestDefine_1.SCAN_SKILL_ID &&
          e === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()
        )
          if (this.zio) {
            i = this.too.get(this.zio);
            if (i) {
              let o;
              let n;
              const s =
                Global_1.Global.BaseCharacter?.CharacterActorComponent
                  ?.ActorLocationProxy;
              let e = MathUtils_1.MathUtils.MaxFloat;
              let t = -1;
              for ([o, n] of i) {
                if (!n.SplinePoints)
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Guide",
                      32,
                      "当前追踪任务Spline未找到",
                      ["TrackQuestId:", this.zio],
                      ["SplineId", o],
                    )
                  );
                const [r, a, _] = this.roo(s, n);
                !r ||
                  _ >
                    ConfigManager_1.ConfigManager.LevelGamePlayConfig
                      .GenExtraGuideEffectMaxDist ||
                  ((n.BestIndex = a), _ < e && ((e = _), (t = o)));
              }
              let f;
              let l;
              const E =
                e >
                ConfigManager_1.ConfigManager.LevelGamePlayConfig
                  .GenExtraGuideEffectMinDist;
              this.noo();
              for ([f, l] of i) {
                var c;
                let h = this.soo(s, l, l.BestIndex, f === t && E);
                this.Zio <= 0
                  ? Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Guide",
                      32,
                      "当前位置无法生成spline",
                      ["TrackQuestId:", this.zio],
                      ["SplineId", f],
                    )
                  : ((c = l.SplineData.Effect),
                    (c = this.aoo(c, h)),
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
                      this.eoo ===
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
                  this.zio,
                ]);
          } else
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Guide", 34, "当前无追踪任务");
      }),
      (this.hoo = (e, t, i) => {
        t === Protocol_1.Aki.Protocol.kMs.Proto_Finish &&
          this.too.has(e) &&
          (this.zio === e && (this.noo(), (this.zio = void 0)),
          this.too.delete(e));
      }),
      (this.Gdt = (e) => {
        e === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
          (this.noo(),
          (e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
          (this.zio = e ? e.Id : void 0));
      });
  }
  aoo(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Guide", 32, "[GuideEffectAssistant] 生成新的特效");
    const i = MathUtils_1.MathUtils.DefaultTransform;
    return EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      i,
      e,
      "[GuideEffectAssistant.GenerateEffectHandle]",
      new EffectContext_1.EffectContext(void 0, t),
    );
  }
  OnDestroy() {
    this.too.clear();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharUseSkill,
      this.ooo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.hoo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gdt,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharUseSkill,
      this.ooo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.hoo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gdt,
      );
  }
  noo() {
    const e = this.too.get(this.zio);
    if (e) for (const [, t] of e) this.loo(t);
  }
  loo(e) {
    const t = e.CurActor;
    if (t?.IsValid()) {
      const i = e.EffectHandle;
      if (EffectSystem_1.EffectSystem.IsValid(i)) {
        if (e.State === 1) {
          const o = e.CurActor;
          this.ioo.add(o),
            EffectSystem_1.EffectSystem.AddFinishCallback(
              e.EffectHandle,
              (e) => {
                this._oo(o);
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
  _oo(e) {
    e?.IsValid() &&
      this.ioo.has(e) &&
      (this.ioo.delete(e), ActorSystem_1.ActorSystem.Put(e));
  }
  UpdateQuestGuideEffect(e) {
    if (this.zio) {
      const t = this.too.get(this.zio);
      if (t)
        for (const [, i] of t)
          Time_1.Time.Now >= i.HideTime &&
            (this.noo(), (i.HideTime = Number.MAX_VALUE));
    }
  }
  roo(e, t) {
    let i;
    let o;
    var t = t.SplinePoints;
    let n = Number.MAX_VALUE;
    let s = -1;
    for ([i, o] of t.entries()) {
      const r = Vector_1.Vector.Dist(o, e);
      r < n && ((n = r), (s = i));
    }
    return s === -1 ? [!1, 0, 0] : [!0, s, n];
  }
  soo(t, e, i, o) {
    const n = ActorSystem_1.ActorSystem.Get(
      UE.BP_BasePathLine_C.StaticClass(),
      MathUtils_1.MathUtils.DefaultTransform,
    );
    const s =
      (n.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0),
      n.GetComponentByClass(UE.SplineComponent.StaticClass()));
    const r = e.SplinePoints;
    const a = UE.NewArray(UE.Vector);
    o && this.uoo(t, r[i], a);
    let _ = i + 1 + Math.ceil(SHOW_EFFECT_DISTANCE / SAMPLE_STEP);
    _ = MathUtils_1.MathUtils.Clamp(_, i + 1, r.length);
    for (let e = i + 1; e < _; e++) {
      const f = Vector_1.Vector.Create();
      f.DeepCopy(r[e]), f.SubtractionEqual(t), a.Add(f.ToUeVector());
    }
    return s.SetSplinePoints(a, 0, !0), (this.Zio = a.Num()), n;
  }
  uoo(t, e, i) {
    const o = UE.NavigationSystemV1.FindPathToLocationSynchronously(
      GlobalData_1.GlobalData.World,
      t.ToUeVector(),
      e.ToUeVector(),
      void 0,
      void 0,
      !0,
    );
    for (let e = 0; e < o.PathPoints.Num(); e++) {
      var n = Vector_1.Vector.Create(o.PathPoints.Get(e));
      var n = (n.SubtractionEqual(t), n.ToUeVector());
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
  coo(e, t) {
    let i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
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
          (this.eoo = o.Option.CreateOption.Type),
            this.eoo ===
              IComponent_1.EEffectSplineCreateMode.EquidistantPoint &&
              ((o = o.Option.CreateOption), (this._0e = o.Space));
          const n =
            ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
              e,
              Global_1.Global.BaseCharacter.EntityId,
              1,
            );
          var o =
            ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
              e,
            );
          if (ObjectUtils_1.ObjectUtils.IsValid(o)) {
            o.K2_SetActorLocation(i.ToUeVector(), !1, void 0, !1);
            const s = new Array();
            for (let e = 0; e < n.GetNumberOfSplinePoints() - 1; ++e) {
              const r = n.GetDistanceAlongSplineAtSplinePoint(e);
              const a = n.GetDistanceAlongSplineAtSplinePoint(e + 1);
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
    this.too.delete(e);
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
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY);
    let o = i.HitResult;
    t
      ? TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, e)
      : (i.SetEndLocation(e.X, e.Y, e.Z + TRACE_DISTANCE),
        TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY) &&
          ((o = i.HitResult),
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, e)));
  }
  AddQuestTraceEffect(e, t, i) {
    const o = new EffectData();
    let n = new Map();
    this.too.has(e) ? (n = this.too.get(e)) : this.too.set(e, n),
      n.set(i, o),
      (o.Duration = t),
      this.coo(i, o);
  }
  RemoveQuestTraceEffect(e, t) {
    let i;
    var e = this.too.get(e);
    void 0 !== e &&
      void 0 !== (i = e.get(t)) &&
      (ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t, t),
      this.loo(i),
      e.delete(t));
  }
}
(exports.GuideEffectAssistant = GuideEffectAssistant).uoe = void 0;
// # sourceMappingURL=GuideEffectAssistant.js.map
