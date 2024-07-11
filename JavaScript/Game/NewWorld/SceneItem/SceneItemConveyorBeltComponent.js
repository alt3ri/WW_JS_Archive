"use strict";
var SceneItemConveyorBeltComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var s,
        n = arguments.length,
        h =
          n < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, o);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (h = (n < 3 ? s(h) : 3 < n ? s(e, i, h) : s(e, i)) || h);
      return 3 < n && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemConveyorBeltComponent = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  CharacterUnifiedStateTypes_1 = require("../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  NORMALIZE = 0.01,
  DELTATIMECHANGEVALUE = 10;
let SceneItemConveyorBeltComponent =
  (SceneItemConveyorBeltComponent_1 = class SceneItemConveyorBeltComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Bdn = void 0),
        (this.bdn = void 0),
        (this.vtn = void 0),
        (this.qdn = void 0),
        (this.Gdn = void 0),
        (this.Ndn = []),
        (this.Odn = new Map()),
        (this.kdn = !1),
        (this.Fdn = !1),
        (this.iun = Vector_1.Vector.Create(0, 0, 0)),
        (this.jnr = 0),
        (this.yVr = 0),
        (this.lun = 0),
        (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.kRe = Vector_1.Vector.Create(0, 0, 0)),
        (this.KHr = (t) => {
          if (this.Fdn && this.Bdn) {
            (!this.lun || Math.abs(t - this.lun) > DELTATIMECHANGEVALUE) &&
              (this.lun = t);
            var e,
              i,
              o,
              s =
                this.Bdn.FieldType.Type ===
                IComponent_1.EConveyorBeltFieldType.PointField,
              n = s ? this.Entity.GetComponent(1).ActorLocationProxy : void 0,
              h = this.lun * MathUtils_1.MathUtils.MillisecondToSecond;
            for (const r of this.Ndn)
              s &&
                (r.ActorLocationProxy.Subtraction(n, this.iun),
                this.iun.Normalize(NORMALIZE),
                this.iun.MultiplyEqual(this.jnr)),
                this.cz.DeepCopy(this.iun),
                this.cz.MultiplyEqual(h),
                this.kRe.DeepCopy(r.ActorLocationProxy),
                this.kRe.AdditionEqual(this.cz),
                r.SetActorLocation(this.kRe.ToUeVector()) ||
                  (Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn("SceneItem", 36, "传送带设置位置失败", [
                      "loc",
                      r.ActorLocationProxy,
                    ]));
            for ([e, i] of this.Odn)
              e.Valid &&
                (s &&
                  (e.Entity.GetComponent(1).ActorLocationProxy.Subtraction(
                    n,
                    this.iun,
                  ),
                  this.iun.Normalize(NORMALIZE),
                  this.iun.MultiplyEqual(this.jnr),
                  (e.DeltaConveyBeltSpeed = this.iun.ToUeVector())),
                (o = e.SetAddMoveWorld(
                  this.iun.ToUeVector(),
                  h,
                  void 0,
                  i,
                  void 0,
                  void 0,
                  void 0,
                )),
                this.Odn.set(e, o));
            this.kdn &&
              this.qdn &&
              this.qdn.Valid &&
              this.Gdn.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
              (s &&
                (this.qdn.Entity.GetComponent(1).ActorLocationProxy.Subtraction(
                  n,
                  this.iun,
                ),
                this.iun.Normalize(NORMALIZE),
                this.iun.MultiplyEqual(this.jnr),
                (this.qdn.DeltaConveyBeltSpeed = this.iun.ToUeVector())),
              (this.yVr = this.qdn.SetAddMoveWorld(
                this.iun.ToUeVector(),
                h,
                void 0,
                this.yVr,
                void 0,
                void 0,
                void 0,
              )));
          }
        }),
        (this.Vdn = (t, e) => {
          e = e.Entity;
          const i = e.GetComponent(1);
          var o = i?.CreatureData.GetEntityType();
          if (o === Protocol_1.Aki.Protocol.wks.Proto_Player)
            (this.kdn = t)
              ? ((this.qdn = e.GetComponent(163)),
                (this.Gdn = e.GetComponent(91)),
                (this.qdn.DeltaConveyBeltSpeed = this.iun.ToUeVector()))
              : ((this.qdn.DeltaConveyBeltSpeed = void 0),
                (this.qdn = void 0),
                (this.Gdn = void 0));
          else if (
            o === Protocol_1.Aki.Protocol.wks.Proto_Npc ||
            o === Protocol_1.Aki.Protocol.wks.Proto_Monster ||
            o === Protocol_1.Aki.Protocol.wks.Proto_Animal ||
            o === Protocol_1.Aki.Protocol.wks.Proto_Vision
          ) {
            var s = e.GetComponent(37);
            s &&
              ((n = this.Odn.get(s)),
              t ? n || this.Odn.set(s, -1) : n && this.Odn.delete(s));
          } else if (o === Protocol_1.Aki.Protocol.wks.Proto_SceneItem)
            if (e.GetComponent(142)) {
              const i = e.GetComponent(1);
              var n = this.Ndn.indexOf(i);
              t
                ? -1 === n && this.Ndn.push(i)
                : -1 !== n && this.Ndn.splice(n, 1);
            }
          this.Hdn();
        }),
        (this.jdn = (t, e) => {
          (-1152559349 !== t && -3775711 !== t) || this.Wdn();
        });
    }
    OnInitData(t) {
      var e = t.GetParam(SceneItemConveyorBeltComponent_1)[0],
        i = e.StateGroups.length;
      if (2 < i || i < 1)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 36, "状态组配置数量不对", ["num", i]),
          !1
        );
      this.bdn = e.StateGroups;
      for (let t = 0; t < i; t++) {
        var o = e.StateGroups[t];
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "s", [
            "configGroup.EntityState",
            o.EntityState,
          ]);
      }
      return !0;
    }
    OnStart() {
      return (
        (this.vtn = this.Entity.GetComponent(76)),
        this.vtn && this.vtn.AddOnEntityOverlapCallback(this.Vdn),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.jdn,
        ),
        this.Wdn(),
        !0
      );
    }
    OnClear() {
      return (
        this.vtn && this.vtn.RemoveOnEntityOverlapCallback(this.Vdn),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.jdn,
        ),
        !0
      );
    }
    OnForceTick(t) {
      this.KHr(t);
    }
    OnActivate() {
      !Info_1.Info.EnableForceTick &&
        this.Active &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.KHr,
        );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.KHr,
        );
    }
    OnEnd() {
      return (
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        !0
      );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        );
    }
    Hdn() {
      (this.Fdn = 0 < this.Ndn.length || this.kdn || 0 < this.Odn.size),
        this.Fdn || (this.lun = 0);
    }
    Kdn() {
      this.Bdn = void 0;
      var t = this.Entity.GetComponent(119).State;
      let e = "";
      1 === t ? (e = "常态") : 2 === t && (e = "激活");
      for (const i of this.bdn) i.EntityState.includes(e) && (this.Bdn = i);
      this.Bdn ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneItem", 36, "传送带静止"));
    }
    Wdn() {
      var t, e;
      this.Kdn(),
        this.Bdn &&
          ((t = this.Bdn.FieldType.Type) ===
          IComponent_1.EConveyorBeltFieldType.DirectionalField
            ? ((this.jnr = this.Bdn.MoveType.Speed),
              (e = this.Bdn.FieldType.Direction),
              (this.iun.X = e.X ?? 0),
              (this.iun.Y = e.Y ?? 0),
              (this.iun.Z = e.Z ?? 0),
              (e = this.Entity.GetComponent(1).ActorRotation.RotateVector(
                this.iun.ToUeVector(),
              )),
              this.iun.FromUeVector(e),
              this.iun.Normalize(NORMALIZE),
              this.iun.MultiplyEqual(this.jnr))
            : t === IComponent_1.EConveyorBeltFieldType.PointField &&
              (this.jnr = this.Bdn.MoveType.Speed));
    }
  });
(SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(133)],
    SceneItemConveyorBeltComponent,
  )),
  (exports.SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent);
//# sourceMappingURL=SceneItemConveyorBeltComponent.js.map
