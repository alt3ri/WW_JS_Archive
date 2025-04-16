"use strict";
var GamePlayWalkingPatternComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        n = arguments.length,
        r =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (o = t[a]) &&
            (r = (n < 3 ? o(r) : 3 < n ? o(e, i, r) : o(e, i)) || r);
      return 3 < n && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePlayWalkingPatternComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue"),
  GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils"),
  TsGameSplineActor_1 = require("../../LevelGamePlay/Common/TsGameSplineActor"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
let GamePlayWalkingPatternComponent =
  (GamePlayWalkingPatternComponent_1 = class GamePlayWalkingPatternComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.mBe = void 0),
        (this.HFl = void 0),
        (this.Hnr = void 0),
        (this.zie = void 0),
        (this.WFl = void 0),
        (this.QFl = void 0),
        (this.KFl = void 0),
        (this.$Fl = void 0),
        (this.qsh = void 0),
        (this.Fsh = 0),
        (this.Hln = 0),
        (this.Wlh = 0),
        (this.XFl = 0),
        (this.YFl = 0),
        (this.zFl = void 0),
        (this.JFl = new Queue_1.Queue()),
        (this.ZFl = void 0),
        (this.e3l = void 0),
        (this.Vsh = 0),
        (this.r$t = !1),
        (this.ksh = 0),
        (this.Nsh = 0),
        (this.wdt = -1),
        (this.Qlh = -1),
        (this.Nme = Vector_1.Vector.Create()),
        (this.Hsh = Vector_1.Vector.Create()),
        (this.g_n = (t, e) => {
          this.t3l(t);
        }),
        (this.Etn = (t) => {
          var e;
          t &&
            !this.r$t &&
            ((this.r$t = !0),
            (e = this.Nsh / this.ksh),
            (this.Vsh = 0),
            e >= this.Fsh && e <= this.Hln
              ? (this.Vsh =
                  100 - ((e - this.Fsh) / (this.Hln - this.Fsh)) * 100)
              : e < this.Fsh
                ? (this.Vsh = 100)
                : (this.Vsh = 0),
            (this.Vsh = Math.min(this.Vsh, (this.Qlh / this.wdt) * 100)),
            t) &&
            this.EDe();
        });
    }
    OnInitData(t) {
      t = t.GetParam(GamePlayWalkingPatternComponent_1)[0];
      return (this.Lo = t), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(200)),
        (this.mBe = this.Entity.GetComponent(131)),
        (this.HFl = this.Disable(
          "GamePlayWalkingPatternComponent 默认关闭Tick",
        )),
        this.i3l(),
        this.r3l(),
        this.mSe(),
        this.t3l(this.mBe.StateTagId),
        !0
      );
    }
    i3l() {
      (this.Hnr = ActorSystem_1.ActorSystem.Get(
        TsGameSplineActor_1.default.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransformDouble,
      )),
        (this.zie =
          GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(
            this.Lo.SplineEntityId,
            this.Hnr,
          ));
      var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
        this.Lo.SplineEntityId,
      );
      void 0 === t
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "[GamePlayWalkingPatternComponent]找不到entityData",
            ["SplineEntityId", this.Lo.SplineEntityId],
          )
        : void 0 ===
            (t = (0, IComponent_1.getComponent)(
              t.ComponentsData,
              "SplineComponent",
            ))
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              31,
              "[GamePlayWalkingPatternComponent]找不到SplineComponent",
              ["SplineEntityId", this.Lo.SplineEntityId],
            )
          : t.Option.Type !== IComponent_1.ESplineType.Effect
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "[GamePlayWalkingPatternComponent]引用的样条不是Effect类型",
                ["SplineEntityId", this.Lo.SplineEntityId],
              )
            : ((this.WFl = t.Option.Effect),
              (this.QFl = this.Lo.SpineEffectExistDuration),
              (this.ZFl = this.Lo.ReplaySpineEffect));
    }
    o3l() {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.Lo.EndEntityId,
      );
      t?.Valid && t.Entity?.Valid
        ? ((this.qsh = t.Entity),
          EventSystem_1.EventSystem.AddWithTarget(
            this.qsh,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.Etn,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            31,
            "[WalkingPatternBehaviorNode]找不到EndEntity",
            ["EndEntityId", this.Lo.EndEntityId],
          );
    }
    r3l() {
      var t =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "WalkingPattern.MinDist",
        );
      t && (this.Fsh = parseInt(t.Value)),
        (t =
          GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
            "WalkingPattern.MaxDist",
          )) && (this.Hln = parseInt(t.Value)),
        (t =
          GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
            "WalkingPattern.CheckPointDist",
          )) && (this.Wlh = parseInt(t.Value)),
        (t =
          GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
            "WalkingPattern.StepNum",
          )) && (this.XFl = parseInt(t.Value)),
        (t =
          GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
            "WalkingPattern.RecordMinDist",
          )) && (this.YFl = parseInt(t.Value));
    }
    mSe() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.g_n,
      );
    }
    OnTick(t) {
      var e = Global_1.Global.BaseCharacter;
      e &&
        (this.Nme.FromUeVector(e.D_K2_GetActorLocation()),
        (void 0 !== this.zFl &&
          Vector_1.Vector.Dist2D(this.zFl, this.Nme) < this.YFl) ||
          ((this.zFl = Vector_1.Vector.Create(this.Nme)),
          this.Klh(),
          this.Wsh(),
          this.n3l()));
    }
    Klh() {
      var t, e;
      void 0 === this.zie ||
        this.Qlh >= this.wdt ||
        ((t = MathUtils_1.MathUtils.Clamp(this.Qlh, 0, this.wdt - 1)),
        (e = Vector_1.Vector.Create(
          this.zie?.D_GetLocationAtSplinePoint(t, 1),
        )),
        Vector_1.Vector.Dist2D(this.Nme, e) < this.Wlh && (this.Qlh = t + 1));
    }
    Wsh() {
      var t;
      void 0 !== this.zie &&
        (this.Hsh.FromUeVector(
          this.zie.D_FindLocationClosestToWorldLocation(
            this.Nme.ToUeVector(),
            1,
          ),
        ),
        (t = Vector_1.Vector.Dist2D(this.Nme, this.Hsh)),
        (this.Nsh += t),
        this.ksh++);
    }
    n3l() {
      var t, e;
      void 0 !== Global_1.Global.BaseCharacter &&
        void 0 !== this.Hte &&
        ((t = Vector_1.Vector.Create(this.Nme)).SubtractionEqual(
          this.Hte.ActorLocationProxy,
        ),
        this.JFl.Size >= this.XFl && this.JFl.Pop(),
        void 0 !==
          (e =
            Global_1.Global.BaseCharacter.CharacterActorComponent
              ?.HalfHeight) && (t.Z -= e),
        this.JFl.Push(t));
    }
    OnEnd() {
      return this.s3l(), this.a3l(), this.dSe(), !0;
    }
    dSe() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.g_n,
      );
    }
    t3l(t) {
      switch (
        (951335035 === t
          ? this.HFl &&
            (this.Enable(
              this.HFl,
              "GamePlayWalkingPatternComponent 激活态开启Tick",
            ),
            (this.HFl = void 0))
          : (void 0 === this.HFl &&
              (this.HFl = this.Disable(
                "GamePlayWalkingPatternComponent 非激活态关闭Tick",
              )),
            void 0 !== this.qsh &&
              EventSystem_1.EventSystem.HasWithTarget(
                this.qsh,
                EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
                this.Etn,
              ) &&
              EventSystem_1.EventSystem.RemoveWithTarget(
                this.qsh,
                EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
                this.Etn,
              )),
        1052000749 !== t && this.a3l(),
        t)
      ) {
        case 984890273:
          this.s3l(), this.a3l();
          break;
        case 934557416:
          this.l3l(), this.h3l();
          break;
        case 951335035:
          this.o3l(), this.h3l(!1, this.QFl);
          break;
        case 1035223130:
          this.h3l();
          break;
        case 1052000749:
          this.h3l(!1), this._3l();
      }
    }
    l3l() {
      (this.ksh = 0),
        (this.Nsh = 0),
        (this.r$t = !1),
        (this.wdt = this.zie?.GetNumberOfSplinePoints() ?? -1),
        (this.Qlh = 0);
    }
    h3l(t = !0, e = void 0) {
      if (
        (this.KFl &&
          (TimerSystem_1.TimerSystem.Remove(this.KFl), (this.KFl = void 0)),
        t)
      )
        this.$Fl && this.s3l();
      else if (this.$Fl)
        return void (
          void 0 !== e &&
          (this.KFl = TimerSystem_1.TimerSystem.Delay(() => {
            this.s3l();
          }, e * TimeUtil_1.TimeUtil.InverseMillisecond))
        );
      (this.$Fl = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        MathUtils_1.MathUtils.DefaultTransformDouble,
        this.WFl,
        "WalkingPattern",
      )),
        EffectSystem_1.EffectSystem.GetEffectActor(this.$Fl).K2_AttachToActor(
          this.Hnr,
          void 0,
          2,
          2,
          2,
          !1,
        ),
        void 0 !== e &&
          (this.KFl = TimerSystem_1.TimerSystem.Delay(() => {
            this.s3l();
          }, e * TimeUtil_1.TimeUtil.InverseMillisecond));
    }
    s3l() {
      this.$Fl &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.$Fl,
          "WalkingPattern.StopPreviewEffect",
          !1,
        ),
        (this.$Fl = void 0));
    }
    _3l() {
      if (void 0 !== this.ZFl) {
        this.e3l && this.a3l();
        for (var t = UE.NewArray(UE.VectorDouble); !this.JFl.Empty; ) {
          var e = this.JFl.Pop();
          t.Add(e.ToUeVector());
        }
        var i = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
          this.Hte.ActorLocationProxy,
          t,
          this.ZFl,
        );
        this.e3l = i?.EffectHandle;
      }
    }
    a3l() {
      this.e3l &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.e3l,
          "WalkingPattern.StopPlaybackEffect",
          !1,
        ),
        (this.e3l = void 0));
    }
    EDe() {
      var t = Protocol_1.Aki.Protocol.L0_.create();
      (t.ORs = ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()),
        (t.F4n = this.Hte.CreatureData.GetCreatureDataId()),
        (t.Eps = this.Vsh),
        Net_1.Net.Call(15132, t, (t) => {
          t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Q4n,
              26153,
            );
        });
    }
  });
(GamePlayWalkingPatternComponent = GamePlayWalkingPatternComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(265)],
    GamePlayWalkingPatternComponent,
  )),
  (exports.GamePlayWalkingPatternComponent = GamePlayWalkingPatternComponent);
//# sourceMappingURL=GamePlayWalkingPatternComponent.js.map
