"use strict";
var AnimalPerformComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var r,
        o = arguments.length,
        h =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (r = t[n]) &&
            (h = (o < 3 ? r(h) : 3 < o ? r(e, i, h) : r(e, i)) || h);
      return 3 < o && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalPerformComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
  BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent"),
  DEFAULT_SIGHT_RANGE = 300,
  SIGHT_OPEN_DEGREE = 80,
  GAMEPLAY_TAG_DISAPPEAR = 1800978500,
  GAMEPLAY_TAG_BLUR = -1683566877,
  DESTROY_DISAPPEAR_TIME = 2e3,
  GAMEPLAY_TAG_INVISIBILITY = -208062360,
  GAMEPLAY_TAG_ON_HIT = -1555907721,
  ALERT_RANGE = 500,
  GAMEPLAY_TAG_ALERT = 836814667;
let AnimalPerformComponent =
  (AnimalPerformComponent_1 = class AnimalPerformComponent extends (
    BasePerformComponent_1.BasePerformComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.jBr = void 0),
        (this.WBr = void 0),
        (this.KBr = !1),
        (this.QBr = Vector_1.Vector.Create()),
        (this.XBr = -1),
        (this.$Br = !1),
        (this.tBr = void 0),
        (this.VTl = void 0),
        (this.HTl = void 0),
        (this.YBr = !1),
        (this.PendingDestroy = !0),
        (this.JBr = (t, e) => {
          e &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAnimalDying,
              this.Entity,
            );
        }),
        (this.zBr = (t, e) => {
          e &&
            (this.PendingDestroy
              ? (this.WBr.AddTag(GAMEPLAY_TAG_INVISIBILITY),
                this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
                  CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN,
                ),
                TimerSystem_1.TimerSystem.Delay(() => {
                  this.Entity &&
                    ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
                      this.Entity,
                    );
                }, DESTROY_DISAPPEAR_TIME))
              : ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
                  this.Entity,
                ));
        }),
        (this.ZBr = (t, e) => {
          var i = this.tBr.get(t);
          i &&
            (e
              ? (this.ebr(i),
                t === GAMEPLAY_TAG_DISAPPEAR &&
                  (this.WBr.AddTag(GAMEPLAY_TAG_INVISIBILITY),
                  this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
                    CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN,
                  )))
              : (this.tbr(),
                t === GAMEPLAY_TAG_DISAPPEAR &&
                  (this.WBr.RemoveTag(GAMEPLAY_TAG_INVISIBILITY),
                  this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
                    CharacterNameDefines_1.CharacterNameDefines.PAWN,
                  ))));
        }),
        (this.zYe = () => {
          this.Entity.GetComponent(0).GetEntityType() !==
            Protocol_1.Aki.Protocol.kks.Proto_Monster &&
            (ModelManager_1.ModelManager.GameModeModel.IsMulti
              ? (this.Hte.SetAutonomous(!0), this.ibr())
              : this.obr());
        }),
        (this.rbr = (e) => {
          if (0 !== e.CollisionInfo.DamageId) {
            let t = !1;
            e = e.Attacker.GetComponent(0);
            (t =
              e?.IsRole() ||
              e?.IsVision() ||
              (e &&
                ModelManager_1.ModelManager.CreatureModel.GetEntity(
                  e.GetSummonerId(),
                )
                  ?.Entity?.GetComponent(0)
                  ?.IsRole())
                ? !0
                : t) && this.WBr.AddTag(GAMEPLAY_TAG_ON_HIT);
          }
        }),
        (this.nbr = (t) => {
          !t?.Valid ||
            t.Id === this.Entity.Id ||
            ((t = t.GetComponent(3).ActorLocationProxy),
            this.Hte.ActorLocationProxy.Subtraction(t, this.QBr),
            this.QBr.Size() > ALERT_RANGE) ||
            this.WBr.AddTag(GAMEPLAY_TAG_ALERT);
        }),
        (this.sbr = (t, e, i) => {
          !this.abr(e) ||
            this.WBr.HasTag(GAMEPLAY_TAG_BLUR) ||
            this.WBr.AddTag(GAMEPLAY_TAG_BLUR);
        }),
        (this.hbr = (t, e, i, s) => {
          this.abr(e) &&
            this.WBr.HasTag(GAMEPLAY_TAG_BLUR) &&
            this.WBr.RemoveTag(GAMEPLAY_TAG_BLUR);
        });
    }
    HandlePendingDestroy() {
      this.PendingDestroy
        ? this.Entity.GetComponent(203).AddTag(-1000614969)
        : ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
            this.Entity,
          );
    }
    OnInitData(t) {
      var t = t.GetParam(AnimalPerformComponent_1)[0],
        t = t || void 0,
        e = this.Entity.GetComponent(0);
      if (
        ((this.KBr = t?.IsStare ?? !1),
        (this.tBr = new Map()),
        "CollectAnimal" === t?.SpecialAnimalConfig?.Type)
      ) {
        (this.VTl = new Map()), (this.HTl = new Map());
        for (const i of t.SpecialAnimalConfig.PartsMap)
          this.VTl.set(i.Slot, i.Skeleton),
            this.HTl.set(i.Slot, !!e.PbAnimalInitialPartIds?.includes(i.Slot));
      }
      return !0;
    }
    OnStart() {
      if (
        (super.OnStart(), (this.Hte = this.Entity.GetComponent(3)), !this.Hte)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              29,
              "[AnimalPerformComponent] 初始化失败 Actor Component Undefined",
            ),
          !1
        );
      if (((this.AnimComp = this.Entity.GetComponent(175)), !this.AnimComp))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              29,
              "[AnimalPerformComponent] 初始化失败 Animation Component Undefined",
              ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
              ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
            ),
          !1
        );
      this.AnimComp.EnableSightDirect = this.KBr;
      var t = this.AnimComp.MainAnimInstance;
      if (t) {
        var e = t.材质配置,
          i = e.Num();
        for (let t = 0; t < i; ++t) {
          var s,
            r = e.GetKey(t);
          r.TagName.includes("动物.")
            ? ((s = e.Get(r)), this.tBr.set(r.TagId, s.ToAssetPathName()))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Animal",
                29,
                "[AnimalPerformComponent] 材质GameplayTag不符合规范",
                ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
                ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
                ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
              );
        }
      }
      if (((this.jBr = this.Entity.GetComponent(117)), !this.jBr))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              29,
              "[AnimalPerformComponent] 初始化失败 Perception Component Undefined",
              ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
              ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
            ),
          !1
        );
      if (
        (this.jBr.SetSightRange(DEFAULT_SIGHT_RANGE),
        (this.WBr = this.Entity.GetComponent(203)),
        !this.WBr)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Animal",
              29,
              "[AnimalPerformComponent] 初始化失败 GameplayTag Component Undefined",
              ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
              ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
            ),
          !1
        );
      for (const o of this.tBr)
        this.WBr.AddTagAddOrRemoveListener(o[0], this.ZBr);
      return (
        this.WBr.AddTagAddOrRemoveListener(-1000614969, this.zBr),
        this.WBr.AddTagAddOrRemoveListener(1008164187, this.JBr),
        this.Ore(),
        !0
      );
    }
    OnActivate() {
      this.Entity.GetComponent(0).GetEntityType() !==
        Protocol_1.Aki.Protocol.kks.Proto_Monster &&
        (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (this.Hte.SetAutonomous(!0), this.ibr()),
        this.jTl());
    }
    OnTick(t) {
      this.KBr &&
        (this.jBr.IsInSightRange && this.lbr()
          ? this._br(Global_1.Global.BaseCharacter.CharacterActorComponent)
          : this._br(void 0));
    }
    lbr() {
      var t = Global_1.Global.BaseCharacter.CharacterActorComponent,
        t =
          (this.QBr.FromUeVector(t.ActorLocationProxy),
          this.QBr.SubtractionEqual(this.Hte.ActorLocationProxy),
          (this.QBr.Z = 0),
          this.QBr.Normalize(),
          MathUtils_1.MathUtils.GetAngleByVectorDot(
            this.QBr,
            this.Hte.ActorForwardProxy,
          ));
      return t <= SIGHT_OPEN_DEGREE;
    }
    _br(t) {
      this.KBr && this.AnimComp.SetSightTargetItem(t);
    }
    OnEnd() {
      this.obr(), this.kre();
      for (const t of this.tBr)
        this.WBr.RemoveTagAddOrRemoveListener(t[0], this.ZBr);
      return this.WBr.RemoveTagAddOrRemoveListener(1008164187, this.JBr), !0;
    }
    ebr(t) {
      -1 < this.XBr && this.tbr(),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.PD_CharacterControllerData_C,
          (t) => {
            t?.IsValid() &&
              this &&
              this.Hte &&
              this.Hte.Actor?.IsValid() &&
              (this.XBr =
                this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                  t,
                ));
          },
        );
    }
    tbr() {
      -1 < this.XBr &&
        this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.XBr,
        ),
        (this.XBr = -1);
    }
    ibr() {
      var t;
      this.YBr ||
        (this.Hte?.Valid &&
          this.Hte.Actor?.IsValid() &&
          UE.KuroStaticLibrary.IsObjectClassByName(
            this.Hte.Actor,
            CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET,
          ) &&
          ((t = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Add(
            this.sbr,
          ),
          t.OnComponentEndOverlap.Add(this.hbr),
          (this.YBr = !0)));
    }
    obr() {
      var t;
      this.YBr &&
        this.Hte?.Valid &&
        this.Hte.Actor?.IsValid() &&
        UE.KuroStaticLibrary.IsObjectClassByName(
          this.Hte.Actor,
          CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET,
        ) &&
        ((t = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Remove(
          this.sbr,
        ),
        t.OnComponentEndOverlap.Remove(this.hbr),
        (this.YBr = !1));
    }
    SetUiOpenPerformance(t, e) {
      var i = this.Entity.GetComponent(14);
      6 === i.CurrentState()
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Animal",
            29,
            "开启系统UI失败，系统UI已开启",
            ["ConfigID", this.Hte.CreatureData.GetPbDataId()],
            ["已开启系统UI", t],
          )
        : ((i.GetState(7).SystemUiViewName = t), i.SwitchState(7));
    }
    InitFeedingAnimalConfig(t, e) {
      this.Entity.GetComponent(14).GetState(7).InitFeedingAnimalConfig(t, e);
    }
    abr(t) {
      var t = ActorUtils_1.ActorUtils.GetEntityByActor(t, !1);
      return !(
        !t?.Valid ||
        !t.Entity.GetComponent(0).IsRole() ||
        !(t = t.Entity.GetComponent(3))?.Valid ||
        t.IsAutonomousProxy
      );
    }
    Ore() {
      this.$Br ||
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletHitSpecialCharacter,
          this.rbr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.zYe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnAnimalDying,
          this.nbr,
        ),
        (this.$Br = !0));
    }
    kre() {
      this.$Br &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletHitSpecialCharacter,
          this.rbr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.zYe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnAnimalDying,
          this.nbr,
        ),
        (this.$Br = !1));
    }
    GetIsPartShow(t) {
      return this.HTl?.get(t) ?? !1;
    }
    jTl() {
      if (this.HTl && this.VTl)
        for (var [t, e] of this.HTl) {
          t = FNameUtil_1.FNameUtil.GetDynamicFName(this.VTl.get(t));
          t && this.WTl(t, !e);
        }
    }
    ShowPart(t) {
      var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.VTl?.get(t));
      e && (this.WTl(e, !1), this.HTl?.set(t, !0));
    }
    HidePart(t) {
      var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.VTl?.get(t));
      e && (this.WTl(e, !0), this.HTl?.set(t, !1));
    }
    WTl(t, e) {
      this.Hte?.Actor?.Mesh?.IsValid() &&
        t &&
        this.Hte.Actor.Mesh.IsBoneHiddenByName(t) !== e &&
        (e
          ? this.Hte.Actor.Mesh.HideBoneByName(t, 0)
          : this.Hte.Actor.Mesh.UnHideBoneByName(t));
    }
  });
(AnimalPerformComponent = AnimalPerformComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(169)],
    AnimalPerformComponent,
  )),
  (exports.AnimalPerformComponent = AnimalPerformComponent);
//# sourceMappingURL=AnimalPerformComponent.js.map
