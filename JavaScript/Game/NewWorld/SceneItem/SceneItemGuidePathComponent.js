"use strict";
var SceneItemGuidePathComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        h = arguments.length,
        n =
          h < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (o = t[r]) &&
            (n = (h < 3 ? o(n) : 3 < h ? o(e, i, n) : o(e, i)) || n);
      return 3 < h && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemGuidePathComponent = exports.SCAN_SKILL_ID = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayUtils_1 = require("../../LevelGamePlay/LevelGamePlayUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  colorString = FNameUtil_1.FNameUtil.GetDynamicFName("Color"),
  colorRed = new UE.LinearColor(12, 2, 2, 1),
  colorBlue = new UE.LinearColor(6, 8, 15, 1),
  colorYellow = new UE.LinearColor(12, 8, 4, 1),
  finishTag = 1298716444,
  activatedTag = -3775711,
  normalTag = -1152559349;
exports.SCAN_SKILL_ID = 210004;
let SceneItemGuidePathComponent =
  (SceneItemGuidePathComponent_1 = class SceneItemGuidePathComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.tfn = void 0),
        (this.md = void 0),
        (this.sxr = void 0),
        (this.ifn = void 0),
        (this.ofn = 0),
        (this.rfn = 0),
        (this.dce = !1),
        (this.r$t = !1),
        (this.rvi = 0),
        (this.nfn = void 0),
        (this.sfn = void 0),
        (this.afn = void 0),
        (this.hfn = void 0),
        (this.lfn = !1),
        (this._fn = 0),
        (this.ufn = new Map()),
        (this.cfn = (t, e = !1) => {
          (this.lfn && !e) ||
            (this.dce
              ? this.mfn(t)
              : this.dfn(!1, () => {
                  this.mfn(t);
                }));
        }),
        (this.ero = (t, e) => {
          e !== exports.SCAN_SKILL_ID ||
            t !== Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ||
            ((e = Global_1.Global.BaseCharacter?.CharacterActorComponent),
            (t = Vector_1.Vector.Create(e?.ActorLocationProxy)),
            (e = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy)),
            Vector_1.Vector.Distance(t, e) > this._fn) ||
            ((t = this.Entity.GetComponent(0)),
            (e =
              LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(
                t,
              )),
            this.cfn(e.Interval, !0));
        }),
        (this.g_n = (t, e) => {
          1298716444 === t
            ? ((this.r$t = !0),
              Info_1.Info.EnableForceTick
                ? this.Cfn(1, !0)
                : (this.tfn.HasFinishTag = !0))
            : -3775711 === t
              ? ((this.dce = !0),
                Info_1.Info.EnableForceTick || (this.tfn.HasActiveTag = !0),
                this.dfn(!0))
              : -1152559349 === t &&
                (this.r$t &&
                  ((this.r$t = !1),
                  Info_1.Info.EnableForceTick || (this.tfn.HasFinishTag = !1)),
                this.dce) &&
                ((this.dce = !1),
                Info_1.Info.EnableForceTick || (this.tfn.HasActiveTag = !1));
        }),
        (this.gfn = (t, e) => {
          Info_1.Info.EnableForceTick ||
            (5 === t &&
              ((this.sxr = this.Disable(
                "[SceneItemGuidePathComponent.OnEffectFinish] 特效加载完成，由C++组件接管tick",
              )),
              (this.tfn.NiagaraComponent =
                EffectSystem_1.EffectSystem.GetNiagaraComponent(e)),
              this.tfn.StartTick(
                this.sfn,
                this.afn,
                this.hfn,
                colorString,
                this.rfn / 1e3,
                this.ofn / 1e3,
              )));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemGuidePathComponent_1)[0];
      if (((this.Lo = t), void 0 !== this.Lo.ColorChangeOption))
        switch (this.Lo.ColorChangeOption.Type) {
          case IComponent_1.EColorChangeStrategyOfSplineEffect.RGB:
            if (this.ffn(this.Lo.ColorChangeOption)) break;
            return !1;
        }
      return (
        void 0 !== this.Lo.ScanOption &&
          ((this.lfn = !0), (this._fn = this.Lo.ScanOption.ResponseRange)),
        !0
      );
    }
    ffn(t) {
      var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.RedState);
      if (this.ufn.has(e)) return !1;
      this.ufn.set(e, colorRed);
      e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.YellowState);
      if (this.ufn.has(e)) return !1;
      this.ufn.set(e, colorYellow);
      e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.BlueState);
      return (
        !this.ufn.has(e) &&
        (this.ufn.set(e, colorBlue),
        (this.sfn = this.ufn.get(normalTag)),
        (this.hfn = this.ufn.get(finishTag)),
        (this.afn = this.sfn.op_Subtraction(this.ufn.get(activatedTag))),
        !0)
      );
    }
    OnActivate() {
      return (
        (this.Hte = this.Entity.GetComponent(1)),
        (this.Lie = this.Entity.GetComponent(181)),
        (this.sxr = this.Disable(
          "[SceneItemGuidePathComponent.OnActivate] 默认Disable",
        )),
        Info_1.Info.EnableForceTick ||
          ((this.tfn = this.Hte.Owner.GetComponentByClass(
            UE.KuroSceneItemGuidePathComponent.StaticClass(),
          )),
          this.tfn?.IsValid() ||
            (this.tfn = this.Hte.Owner.AddComponentByClass(
              UE.KuroSceneItemGuidePathComponent.StaticClass(),
              !1,
              new UE.Transform(),
              !1,
            )),
          this.tfn.SetComponentTickEnabled(!1)),
        this.pfn(),
        !0
      );
    }
    vfn() {
      var t = this.Entity?.GetComponent(0).GetPbEntityInitData(),
        t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "EntityStateComponent",
        ).StateChangeBehaviors;
      0 < t?.length &&
        (t = t[0].DelayChangeState) &&
        (this.rfn = t.Time * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnScanStart,
          this.cfn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnScanStart,
            this.cfn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.CharUseSkill,
          this.ero,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CharUseSkill,
            this.ero,
          ),
        this.md?.IsValid() &&
          (this.Mfn(),
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
            this.Lo.SplineEntityId,
            this.Entity.GetComponent(0).GetPbDataId(),
          )),
        !0
      );
    }
    OnTick(t) {
      Info_1.Info.EnableForceTick || this.Efn(t);
    }
    OnForceTick(t) {
      this.Efn(t);
    }
    Efn(e) {
      if (this.r$t) this.Cfn(1, !0);
      else {
        let t = this.dce ? 1 : 0;
        this.dce ||
          0 === this.rfn ||
          ((this.ofn -= e),
          (this.ofn = this.ofn <= 0 ? 0 : this.ofn),
          (t = this.ofn / this.rfn)),
          this.Cfn(t, !1);
      }
    }
    pfn() {
      var t,
        e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
          this.Lo.SplineEntityId,
        );
      e
        ? (t = (0, IComponent_1.getComponent)(
            e.ComponentsData,
            "SplineComponent",
          ))
          ? t.Option.Type !== IComponent_1.ESplineType.Effect
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[SceneItemGuidePathComponent.LoadPathAsset] SplineComponent配置类型不是Effect",
                ["SplineEntityId", this.Lo.SplineEntityId],
              )
            : (ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
                this.Lo.SplineEntityId,
                this.Entity.GetComponent(0).GetPbDataId(),
              ),
              (t = Vector_1.Vector.Create(
                e.Transform?.Pos.X ?? 0,
                e.Transform?.Pos.Y ?? 0,
                e.Transform?.Pos.Z ?? 0,
              )),
              (this.md =
                ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                  this.Lo.SplineEntityId,
                )),
              this.md.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !1),
              this.Entity.GetComponent(0).GetBaseInfo()?.ScanFunction?.ScanId
                ? EventSystem_1.EventSystem.AddWithTarget(
                    this.Entity,
                    EventDefine_1.EEventName.OnScanStart,
                    this.cfn,
                  )
                : this.szr(),
              this.lfn &&
                EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.CharUseSkill,
                  this.ero,
                ),
              this.Lo.ColorChangeOption &&
                (EventSystem_1.EventSystem.AddWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemStateChange,
                  this.g_n,
                ),
                this.vfn(),
                this.Sfn()))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              32,
              "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到SplineComponent配置",
              ["SplineEntityId", this.Lo.SplineEntityId],
            )
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            32,
            "[SceneItemGuidePathComponent.LoadPathAsset] 无法找到Spline Entity",
            ["SplineEntityId", this.Lo.SplineEntityId],
          );
    }
    dfn(e = !1, i = void 0) {
      var t = Protocol_1.Aki.Protocol.Ems.create();
      (t.F4n = MathUtils_1.MathUtils.NumberToLong(
        this.Hte.CreatureData.GetCreatureDataId(),
      )),
        Net_1.Net.Call(25654, t, (t) => {
          t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Q4n,
              28766,
            ),
            (this.ofn = t.ZLs),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneItem",
                32,
                "response",
                ["entityID", t.F4n],
                ["resetTime", t.ZLs],
              ),
            e &&
              this.tfn?.IsValid() &&
              this.tfn.StartTick(
                this.sfn,
                this.afn,
                this.hfn,
                colorString,
                this.rfn / 1e3,
                this.ofn / 1e3,
              ),
            void 0 !== i && i();
        });
    }
    Sfn() {
      this.Lie.HasTag(-3775711) &&
        ((this.dce = !0),
        Info_1.Info.EnableForceTick || (this.tfn.HasActiveTag = !0)),
        this.Lie.HasTag(1298716444) &&
          ((this.r$t = !0),
          Info_1.Info.EnableForceTick || (this.tfn.HasFinishTag = !0));
    }
    mfn(t) {
      this.szr(),
        void 0 !== this.sxr &&
          this.Enable(this.sxr, "SceneItemGuidePathComponent.ShowGuidePath"),
        (this.sxr = void 0) !== this.ifn &&
          (TimerSystem_1.TimerSystem.Remove(this.ifn), (this.ifn = void 0)),
        (this.ifn = TimerSystem_1.TimerSystem.Delay(() => {
          this.Mfn(),
            void 0 === this.sxr &&
              (this.sxr = this.Disable(
                "[SceneItemGuidePathComponent.ShowGuidePath] 超时触发Disable",
              )),
            (this.ifn = void 0);
        }, t * TimeUtil_1.TimeUtil.InverseMillisecond));
    }
    Mfn() {
      EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
        (Info_1.Info.EnableForceTick || this.tfn.SetComponentTickEnabled(!1),
        EffectSystem_1.EffectSystem.StopEffectById(
          this.rvi,
          "[SceneItemGuidePathComponent.HideEffect]",
          !1,
        ),
        (this.rvi = 0));
    }
    szr() {
      this.rvi || this.NQt();
    }
    Cfn(t, e) {
      let i = void 0;
      (i = e ? this.hfn : this.sfn.op_Subtraction(this.afn.op_Multiply(t))),
        this.nfn?.IsValid() || this.yfn(),
        this.nfn?.SetColorParameter(colorString, i);
    }
    NQt() {
      var t = this.md.SplineData;
      (this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        this.Hte.ActorTransform,
        t.Effect,
        "[SceneItemGuidePathComponent.SpawnEffect]",
        new EffectContext_1.EffectContext(this.Entity.Id),
        3,
        void 0,
        this.gfn,
      )),
        EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
          EffectSystem_1.EffectSystem.GetEffectActor(this.rvi).K2_AttachToActor(
            this.md,
            void 0,
            2,
            2,
            2,
            !1,
          ),
        this.yfn();
    }
    yfn() {
      EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
        ((this.nfn = EffectSystem_1.EffectSystem.GetNiagaraComponent(this.rvi)),
        this.nfn?.IsValid()) &&
        (this.nfn.bForceSolo = !0);
    }
  });
(SceneItemGuidePathComponent = SceneItemGuidePathComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(140)],
    SceneItemGuidePathComponent,
  )),
  (exports.SceneItemGuidePathComponent = SceneItemGuidePathComponent);
//# sourceMappingURL=SceneItemGuidePathComponent.js.map
