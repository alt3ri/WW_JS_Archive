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
        (this.Efn = void 0),
        (this.md = void 0),
        (this.Uxr = void 0),
        (this.yfn = void 0),
        (this.Ifn = 0),
        (this.Tfn = 0),
        (this.dce = !1),
        (this.rXt = !1),
        (this.opi = 0),
        (this.Lfn = void 0),
        (this.Dfn = void 0),
        (this.Rfn = void 0),
        (this.Afn = void 0),
        (this.Ufn = !1),
        (this.Pfn = 0),
        (this.xfn = new Map()),
        (this.wfn = (t, e = !1) => {
          (this.Ufn && !e) ||
            (this.dce
              ? this.Bfn(t)
              : this.bfn(!1, () => {
                  this.Bfn(t);
                }));
        }),
        (this.ooo = (t, e) => {
          e !== exports.SCAN_SKILL_ID ||
            t !== Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ||
            ((e = Global_1.Global.BaseCharacter?.CharacterActorComponent),
            (t = Vector_1.Vector.Create(e?.ActorLocationProxy)),
            (e = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy)),
            Vector_1.Vector.Distance(t, e) > this.Pfn) ||
            ((t = this.Entity.GetComponent(0)),
            (e =
              LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(
                t,
              )),
            this.wfn(e.Interval, !0));
        }),
        (this.gIe = (t, e) => {
          t.includes(1298716444)
            ? ((this.rXt = !0),
              Info_1.Info.EnableForceTick
                ? this.qfn(1, !0)
                : (this.Efn.HasFinishTag = !0))
            : t.includes(-3775711)
              ? ((this.dce = !0),
                Info_1.Info.EnableForceTick || (this.Efn.HasActiveTag = !0),
                this.bfn(!0))
              : t.includes(-1152559349) &&
                (this.rXt &&
                  ((this.rXt = !1),
                  Info_1.Info.EnableForceTick || (this.Efn.HasFinishTag = !1)),
                this.dce) &&
                ((this.dce = !1),
                Info_1.Info.EnableForceTick || (this.Efn.HasActiveTag = !1));
        }),
        (this.Gfn = (t, e) => {
          Info_1.Info.EnableForceTick ||
            (5 === t &&
              ((this.Uxr = this.Disable(
                "[SceneItemGuidePathComponent.OnEffectFinish] 特效加载完成，由C++组件接管tick",
              )),
              (this.Efn.NiagaraComponent =
                EffectSystem_1.EffectSystem.GetNiagaraComponent(e)),
              this.Efn.StartTick(
                this.Dfn,
                this.Rfn,
                this.Afn,
                colorString,
                this.Tfn / 1e3,
                this.Ifn / 1e3,
              )));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemGuidePathComponent_1)[0];
      if (((this.Lo = t), void 0 !== this.Lo.ColorChangeOption))
        switch (this.Lo.ColorChangeOption.Type) {
          case IComponent_1.EColorChangeStrategyOfSplineEffect.RGB:
            if (this.Nfn(this.Lo.ColorChangeOption)) break;
            return !1;
        }
      return (
        void 0 !== this.Lo.ScanOption &&
          ((this.Ufn = !0), (this.Pfn = this.Lo.ScanOption.ResponseRange)),
        !0
      );
    }
    Nfn(t) {
      var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.RedState);
      if (this.xfn.has(e)) return !1;
      this.xfn.set(e, colorRed);
      e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.YellowState);
      if (this.xfn.has(e)) return !1;
      this.xfn.set(e, colorYellow);
      e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.BlueState);
      return (
        !this.xfn.has(e) &&
        (this.xfn.set(e, colorBlue),
        (this.Dfn = this.xfn.get(normalTag)),
        (this.Afn = this.xfn.get(finishTag)),
        (this.Rfn = this.Dfn.op_Subtraction(this.xfn.get(activatedTag))),
        !0)
      );
    }
    OnActivate() {
      return (
        (this.Hte = this.Entity.GetComponent(1)),
        (this.Lie = this.Entity.GetComponent(177)),
        (this.Uxr = this.Disable(
          "[SceneItemGuidePathComponent.OnActivate] 默认Disable",
        )),
        Info_1.Info.EnableForceTick ||
          ((this.Efn = this.Hte.Owner.GetComponentByClass(
            UE.KuroSceneItemGuidePathComponent.StaticClass(),
          )),
          this.Efn?.IsValid() ||
            (this.Efn = this.Hte.Owner.AddComponentByClass(
              UE.KuroSceneItemGuidePathComponent.StaticClass(),
              !1,
              new UE.Transform(),
              !1,
            )),
          this.Efn.SetComponentTickEnabled(!1)),
        this.Ofn(),
        !0
      );
    }
    kfn() {
      var t = this.Entity?.GetComponent(0).GetPbEntityInitData(),
        t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "EntityStateComponent",
        ).StateChangeBehaviors;
      0 < t?.length &&
        (t = t[0].DelayChangeState) &&
        (this.Tfn = t.Time * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnScanStart,
          this.wfn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnScanStart,
            this.wfn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnLevelTagChanged,
            this.gIe,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.CharUseSkill,
          this.ooo,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CharUseSkill,
            this.ooo,
          ),
        this.md?.IsValid() &&
          (this.Ffn(),
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
            this.Lo.SplineEntityId,
            this.Entity.GetComponent(0).GetPbDataId(),
          )),
        !0
      );
    }
    OnTick(t) {
      Info_1.Info.EnableForceTick || this.Vfn(t);
    }
    OnForceTick(t) {
      this.Vfn(t);
    }
    Vfn(e) {
      if (this.rXt) this.qfn(1, !0);
      else {
        let t = this.dce ? 1 : 0;
        this.dce ||
          0 === this.Tfn ||
          ((this.Ifn -= e),
          (this.Ifn = this.Ifn <= 0 ? 0 : this.Ifn),
          (t = this.Ifn / this.Tfn)),
          this.qfn(t, !1);
      }
    }
    Ofn() {
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
                    this.wfn,
                  )
                : this.Lzr(),
              this.Ufn &&
                EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.CharUseSkill,
                  this.ooo,
                ),
              this.Lo.ColorChangeOption &&
                (EventSystem_1.EventSystem.AddWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnLevelTagChanged,
                  this.gIe,
                ),
                this.kfn(),
                this.Hfn()))
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
    bfn(e = !1, i = void 0) {
      var t = Protocol_1.Aki.Protocol.M_s.create();
      (t.rkn = MathUtils_1.MathUtils.NumberToLong(
        this.Hte.CreatureData.GetCreatureDataId(),
      )),
        Net_1.Net.Call(11173, t, (t) => {
          t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.lkn,
              15876,
            ),
            (this.Ifn = t.REs),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneItem",
                32,
                "response",
                ["entityID", t.rkn],
                ["resetTime", t.REs],
              ),
            e &&
              this.Efn?.IsValid() &&
              this.Efn.StartTick(
                this.Dfn,
                this.Rfn,
                this.Afn,
                colorString,
                this.Tfn / 1e3,
                this.Ifn / 1e3,
              ),
            void 0 !== i && i();
        });
    }
    Hfn() {
      this.Lie.HasTag(-3775711) &&
        ((this.dce = !0),
        Info_1.Info.EnableForceTick || (this.Efn.HasActiveTag = !0)),
        this.Lie.HasTag(1298716444) &&
          ((this.rXt = !0),
          Info_1.Info.EnableForceTick || (this.Efn.HasFinishTag = !0));
    }
    Bfn(t) {
      this.Lzr(),
        void 0 !== this.Uxr &&
          this.Enable(this.Uxr, "SceneItemGuidePathComponent.ShowGuidePath"),
        (this.Uxr = void 0) !== this.yfn &&
          (TimerSystem_1.TimerSystem.Remove(this.yfn), (this.yfn = void 0)),
        (this.yfn = TimerSystem_1.TimerSystem.Delay(() => {
          this.Ffn(),
            void 0 === this.Uxr &&
              (this.Uxr = this.Disable(
                "[SceneItemGuidePathComponent.ShowGuidePath] 超时触发Disable",
              )),
            (this.yfn = void 0);
        }, t * TimeUtil_1.TimeUtil.InverseMillisecond));
    }
    Ffn() {
      EffectSystem_1.EffectSystem.IsValid(this.opi) &&
        (Info_1.Info.EnableForceTick || this.Efn.SetComponentTickEnabled(!1),
        EffectSystem_1.EffectSystem.StopEffectById(
          this.opi,
          "[SceneItemGuidePathComponent.HideEffect]",
          !1,
        ),
        (this.opi = 0));
    }
    Lzr() {
      this.opi || this.NKt();
    }
    qfn(t, e) {
      let i = void 0;
      (i = e ? this.Afn : this.Dfn.op_Subtraction(this.Rfn.op_Multiply(t))),
        this.Lfn?.IsValid() || this.jfn(),
        this.Lfn?.SetColorParameter(colorString, i);
    }
    NKt() {
      var t = this.md.SplineData;
      (this.opi = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        this.Hte.ActorTransform,
        t.Effect,
        "[SceneItemGuidePathComponent.SpawnEffect]",
        new EffectContext_1.EffectContext(this.Entity.Id),
        3,
        void 0,
        this.Gfn,
      )),
        EffectSystem_1.EffectSystem.IsValid(this.opi) &&
          EffectSystem_1.EffectSystem.GetEffectActor(this.opi).K2_AttachToActor(
            this.md,
            void 0,
            2,
            2,
            2,
            !1,
          ),
        this.jfn();
    }
    jfn() {
      EffectSystem_1.EffectSystem.IsValid(this.opi) &&
        ((this.Lfn = EffectSystem_1.EffectSystem.GetNiagaraComponent(this.opi)),
        this.Lfn?.IsValid()) &&
        (this.Lfn.bForceSolo = !0);
    }
  });
(SceneItemGuidePathComponent = SceneItemGuidePathComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(137)],
    SceneItemGuidePathComponent,
  )),
  (exports.SceneItemGuidePathComponent = SceneItemGuidePathComponent);
//# sourceMappingURL=SceneItemGuidePathComponent.js.map
