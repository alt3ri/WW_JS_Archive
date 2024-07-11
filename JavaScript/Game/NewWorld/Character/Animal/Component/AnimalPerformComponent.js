"use strict";
let AnimalPerformComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let r;
    const n = arguments.length;
    let o =
      n < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, e, i, s);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (r = t[h]) && (o = (n < 3 ? r(o) : n > 3 ? r(e, i, o) : r(e, i)) || o);
    return n > 3 && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalPerformComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent");
const DEFAULT_SIGHT_RANGE = 300;
const SIGHT_OPEN_DEGREE = 80;
const GAMEPLAY_TAG_DISAPPEAR = 1800978500;
const GAMEPLAY_TAG_BLUR = -1683566877;
const DESTROY_DISAPPEAR_TIME = 2e3;
const GAMEPLAY_TAG_INVISIBILITY = -208062360;
const GAMEPLAY_TAG_ON_HIT = -1555907721;
const ALERT_RANGE = 500;
const GAMEPLAY_TAG_ALERT = 836814667;
let AnimalPerformComponent =
  (AnimalPerformComponent_1 = class AnimalPerformComponent extends (
    BasePerformComponent_1.BasePerformComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.dbr = void 0),
        (this.Cbr = void 0),
        (this.gbr = !1),
        (this.fbr = Vector_1.Vector.Create()),
        (this.pbr = -1),
        (this.vbr = !1),
        (this.TBr = void 0),
        (this.Mbr = !1),
        (this.PendingDestroy = !0),
        (this.Sbr = (t, e) => {
          e &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAnimalDying,
              this.Entity,
            );
        }),
        (this.Ebr = (t, e) => {
          e &&
            (this.PendingDestroy
              ? (this.Cbr.AddTag(GAMEPLAY_TAG_INVISIBILITY),
                this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
                  CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN,
                ),
                TimerSystem_1.TimerSystem.Delay(() => {
                  this.Entity &&
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.DelayRemoveEntityFinished,
                      this.Entity,
                    );
                }, DESTROY_DISAPPEAR_TIME))
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.DelayRemoveEntityFinished,
                  this.Entity,
                ));
        }),
        (this.ybr = (t, e) => {
          const i = this.TBr.get(t);
          i &&
            (e
              ? (this.Ibr(i),
                t === GAMEPLAY_TAG_DISAPPEAR &&
                  (this.Cbr.AddTag(GAMEPLAY_TAG_INVISIBILITY),
                  this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
                    CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN,
                  )))
              : (this.Tbr(),
                t === GAMEPLAY_TAG_DISAPPEAR &&
                  (this.Cbr.RemoveTag(GAMEPLAY_TAG_INVISIBILITY),
                  this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
                    CharacterNameDefines_1.CharacterNameDefines.PAWN,
                  ))));
        }),
        (this.k$e = () => {
          this.Entity.GetComponent(0).GetEntityType() !==
            Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
            (ModelManager_1.ModelManager.GameModeModel.IsMulti
              ? (this.Hte.SetAutonomous(!0), this.Lbr())
              : this.Dbr());
        }),
        (this.Rbr = (e) => {
          if (e.BulletDataMain.Base.DamageId !== BigInt(0)) {
            let t = !1;
            var e = e.Attacker;
            let i = e.GetComponent(0);
            (t =
              i?.IsRole() ||
              i?.IsVision() ||
              ((i = e.GetComponent(47)) &&
                EntitySystem_1.EntitySystem.Get(i.RoleId)
                  ?.GetComponent(0)
                  ?.IsRole())
                ? !0
                : t) && this.Cbr.AddTag(GAMEPLAY_TAG_ON_HIT);
          }
        }),
        (this.Abr = (t) => {
          !t?.Valid ||
            t.Id === this.Entity.Id ||
            ((t = t.GetComponent(3).ActorLocationProxy),
            this.Hte.ActorLocationProxy.Subtraction(t, this.fbr),
            this.fbr.Size() > ALERT_RANGE) ||
            this.Cbr.AddTag(GAMEPLAY_TAG_ALERT);
        }),
        (this.Ubr = (t, e, i) => {
          !this.Pbr(e) ||
            this.Cbr.HasTag(GAMEPLAY_TAG_BLUR) ||
            this.Cbr.AddTag(GAMEPLAY_TAG_BLUR);
        }),
        (this.xbr = (t, e, i, s) => {
          this.Pbr(e) &&
            this.Cbr.HasTag(GAMEPLAY_TAG_BLUR) &&
            this.Cbr.RemoveTag(GAMEPLAY_TAG_BLUR);
        });
    }
    HandlePendingDestroy() {
      this.PendingDestroy
        ? this.Entity.GetComponent(185).AddTag(-1000614969)
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          );
    }
    OnInitData(t) {
      t = t.GetParam(AnimalPerformComponent_1)[0];
      return (
        (this.gbr = (t || void 0)?.IsStare ?? !1), (this.TBr = new Map()), !0
      );
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(3)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              30,
              "[AnimalPerformComponent] 初始化失败 Actor Component Undefined",
            ),
          !1
        );
      if (((this.AnimComp = this.Entity.GetComponent(160)), !this.AnimComp))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              30,
              "[AnimalPerformComponent] 初始化失败 Animation Component Undefined",
              ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
              ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
            ),
          !1
        );
      this.AnimComp.EnableSightDirect = this.gbr;
      const t = this.AnimComp.MainAnimInstance;
      if (t) {
        const e = t.材质配置;
        const i = e.Num();
        for (let t = 0; t < i; ++t) {
          var s;
          const r = e.GetKey(t);
          r.TagName.includes("动物.")
            ? ((s = e.Get(r)), this.TBr.set(r.TagId, s.ToAssetPathName()))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Animal",
                30,
                "[AnimalPerformComponent] 材质GameplayTag不符合规范",
                ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
                ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
                ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
              );
        }
      }
      if (((this.dbr = this.Entity.GetComponent(104)), !this.dbr))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              30,
              "[AnimalPerformComponent] 初始化失败 Perception Component Undefined",
              ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
              ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
            ),
          !1
        );
      if (
        (this.dbr.SetSightRange(DEFAULT_SIGHT_RANGE),
        (this.Cbr = this.Entity.GetComponent(185)),
        !this.Cbr)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              30,
              "[AnimalPerformComponent] 初始化失败 GameplayTag Component Undefined",
              ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
              ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
            ),
          !1
        );
      for (const n of this.TBr)
        this.Cbr.AddTagAddOrRemoveListener(n[0], this.ybr);
      return (
        this.Cbr.AddTagAddOrRemoveListener(-1000614969, this.Ebr),
        this.Cbr.AddTagAddOrRemoveListener(1008164187, this.Sbr),
        this.Ore(),
        !0
      );
    }
    OnActivate() {
      this.Entity.GetComponent(0).GetEntityType() !==
        Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (this.Hte.SetAutonomous(!0), this.Lbr());
    }
    OnTick(t) {
      this.gbr &&
        (this.dbr.IsInSightRange && this.wbr()
          ? this.Bbr(Global_1.Global.BaseCharacter.CharacterActorComponent)
          : this.Bbr(void 0));
    }
    wbr() {
      var t = Global_1.Global.BaseCharacter.CharacterActorComponent;
      var t =
        (this.fbr.FromUeVector(t.ActorLocationProxy),
        this.fbr.SubtractionEqual(this.Hte.ActorLocationProxy),
        (this.fbr.Z = 0),
        this.fbr.Normalize(),
        MathUtils_1.MathUtils.GetAngleByVectorDot(
          this.fbr,
          this.Hte.ActorForwardProxy,
        ));
      return t <= SIGHT_OPEN_DEGREE;
    }
    Bbr(t) {
      this.gbr && this.AnimComp.SetSightTargetItem(t);
    }
    OnEnd() {
      this.Dbr(), this.kre();
      for (const t of this.TBr)
        this.Cbr.RemoveTagAddOrRemoveListener(t[0], this.ybr);
      return this.Cbr.RemoveTagAddOrRemoveListener(1008164187, this.Sbr), !0;
    }
    Ibr(t) {
      this.pbr > -1 && this.Tbr(),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.PD_CharacterControllerData_C,
          (t) => {
            t?.IsValid() &&
              this &&
              this.Hte &&
              this.Hte.Actor?.IsValid() &&
              (this.pbr =
                this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                  t,
                ));
          },
        );
    }
    Tbr() {
      this.pbr > -1 &&
        this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.pbr,
        ),
        (this.pbr = -1);
    }
    Lbr() {
      let t;
      this.Mbr ||
        (this.Hte?.Valid &&
          this.Hte.Actor?.IsValid() &&
          UE.KuroStaticLibrary.IsObjectClassByName(
            this.Hte.Actor,
            CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET,
          ) &&
          ((t = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Add(
            this.Ubr,
          ),
          t.OnComponentEndOverlap.Add(this.xbr),
          (this.Mbr = !0)));
    }
    Dbr() {
      let t;
      this.Mbr &&
        this.Hte?.Valid &&
        this.Hte.Actor?.IsValid() &&
        UE.KuroStaticLibrary.IsObjectClassByName(
          this.Hte.Actor,
          CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET,
        ) &&
        ((t = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Remove(
          this.Ubr,
        ),
        t.OnComponentEndOverlap.Remove(this.xbr),
        (this.Mbr = !1));
    }
    SetUiOpenPerformance(t, e) {
      const i = this.Entity.GetComponent(14);
      i.CurrentState() === 6
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Animal",
            30,
            "开启系统UI失败，系统UI已开启",
            ["ConfigID", this.Hte.CreatureData.GetPbDataId()],
            ["已开启系统UI", t],
          )
        : ((i.GetState(7).SystemUiViewName = t), i.SwitchState(7));
    }
    InitFeedingAnimalConfig(t, e) {
      this.Entity.GetComponent(14).GetState(7).InitFeedingAnimalConfig(t, e);
    }
    Pbr(t) {
      var t = ActorUtils_1.ActorUtils.GetEntityByActor(t, !1);
      return !(
        !t?.Valid ||
        !t.Entity.GetComponent(0).IsRole() ||
        !(t = t.Entity.GetComponent(3))?.Valid ||
        t.IsAutonomousProxy
      );
    }
    Ore() {
      this.vbr ||
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletHitSpecialCharacter,
          this.Rbr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.k$e,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnAnimalDying,
          this.Abr,
        ),
        (this.vbr = !0));
    }
    kre() {
      this.vbr &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletHitSpecialCharacter,
          this.Rbr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.k$e,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnAnimalDying,
          this.Abr,
        ),
        (this.vbr = !1));
    }
  });
(AnimalPerformComponent = AnimalPerformComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(154)],
    AnimalPerformComponent,
  )),
  (exports.AnimalPerformComponent = AnimalPerformComponent);
// # sourceMappingURL=AnimalPerformComponent.js.map
