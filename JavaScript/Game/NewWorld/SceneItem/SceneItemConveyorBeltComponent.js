"use strict";
let SceneItemConveyorBeltComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    let s;
    const n = arguments.length;
    let h =
      n < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, e, i, o);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (s = t[r]) && (h = (n < 3 ? s(h) : n > 3 ? s(e, i, h) : s(e, i)) || h);
    return n > 3 && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemConveyorBeltComponent = void 0);
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const CharacterUnifiedStateTypes_1 = require("../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const NORMALIZE = 0.01;
const DELTATIMECHANGEVALUE = 10;
let SceneItemConveyorBeltComponent =
  (SceneItemConveyorBeltComponent_1 = class SceneItemConveyorBeltComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.tCn = void 0),
        (this.iCn = void 0),
        (this.ktn = void 0),
        (this.oCn = void 0),
        (this.rCn = void 0),
        (this.nCn = []),
        (this.sCn = new Map()),
        (this.aCn = !1),
        (this.hCn = !1),
        (this.yun = Vector_1.Vector.Create(0, 0, 0)),
        (this.Qrr = 0),
        (this.jVr = 0),
        (this.Pun = 0),
        (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.kRe = Vector_1.Vector.Create(0, 0, 0)),
        (this.cjr = (t) => {
          if (this.hCn && this.tCn) {
            (!this.Pun || Math.abs(t - this.Pun) > DELTATIMECHANGEVALUE) &&
              (this.Pun = t);
            let e;
            let i;
            let o;
            const s =
              this.tCn.FieldType.Type ===
              IComponent_1.EConveyorBeltFieldType.PointField;
            const n = s
              ? this.Entity.GetComponent(1).ActorLocationProxy
              : void 0;
            const h = this.Pun * MathUtils_1.MathUtils.MillisecondToSecond;
            for (const r of this.nCn)
              s &&
                (r.ActorLocationProxy.Subtraction(n, this.yun),
                this.yun.Normalize(NORMALIZE),
                this.yun.MultiplyEqual(this.Qrr)),
                this.cz.DeepCopy(this.yun),
                this.cz.MultiplyEqual(h),
                this.kRe.DeepCopy(r.ActorLocationProxy),
                this.kRe.AdditionEqual(this.cz),
                r.SetActorLocation(this.kRe.ToUeVector()) ||
                  (Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn("SceneItem", 36, "传送带设置位置失败", [
                      "loc",
                      r.ActorLocationProxy,
                    ]));
            for ([e, i] of this.sCn)
              e.Valid &&
                (s &&
                  (e.Entity.GetComponent(1).ActorLocationProxy.Subtraction(
                    n,
                    this.yun,
                  ),
                  this.yun.Normalize(NORMALIZE),
                  this.yun.MultiplyEqual(this.Qrr),
                  (e.DeltaConveyBeltSpeed = this.yun.ToUeVector())),
                (o = e.SetAddMoveWorld(
                  this.yun.ToUeVector(),
                  h,
                  void 0,
                  i,
                  void 0,
                  void 0,
                  void 0,
                )),
                this.sCn.set(e, o));
            this.aCn &&
              this.oCn &&
              this.oCn.Valid &&
              this.rCn.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
              (s &&
                (this.oCn.Entity.GetComponent(1).ActorLocationProxy.Subtraction(
                  n,
                  this.yun,
                ),
                this.yun.Normalize(NORMALIZE),
                this.yun.MultiplyEqual(this.Qrr),
                (this.oCn.DeltaConveyBeltSpeed = this.yun.ToUeVector())),
              (this.jVr = this.oCn.SetAddMoveWorld(
                this.yun.ToUeVector(),
                h,
                void 0,
                this.jVr,
                void 0,
                void 0,
                void 0,
              )));
          }
        }),
        (this.lCn = (t, e) => {
          e = e.Entity;
          const i = e.GetComponent(1);
          const o = i?.CreatureData.GetEntityType();
          if (o === Protocol_1.Aki.Protocol.HBs.Proto_Player)
            (this.aCn = t)
              ? ((this.oCn = e.GetComponent(161)),
                (this.rCn = e.GetComponent(89)),
                (this.oCn.DeltaConveyBeltSpeed = this.yun.ToUeVector()))
              : ((this.oCn.DeltaConveyBeltSpeed = void 0),
                (this.oCn = void 0),
                (this.rCn = void 0));
          else if (
            o === Protocol_1.Aki.Protocol.HBs.Proto_Npc ||
            o === Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
            o === Protocol_1.Aki.Protocol.HBs.Proto_Animal ||
            o === Protocol_1.Aki.Protocol.HBs.Proto_Vision
          ) {
            const s = e.GetComponent(36);
            s &&
              ((n = this.sCn.get(s)),
              t ? n || this.sCn.set(s, -1) : n && this.sCn.delete(s));
          } else if (o === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem)
            if (e.GetComponent(140)) {
              const i = e.GetComponent(1);
              var n = this.nCn.indexOf(i);
              t
                ? n === -1 && this.nCn.push(i)
                : n !== -1 && this.nCn.splice(n, 1);
            }
          this._Cn();
        }),
        (this.uCn = (t, e) => {
          (t !== -1152559349 && t !== -3775711) || this.cCn();
        });
    }
    OnInitData(t) {
      const e = t.GetParam(SceneItemConveyorBeltComponent_1)[0];
      const i = e.StateGroups.length;
      if (i > 2 || i < 1)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 36, "状态组配置数量不对", ["num", i]),
          !1
        );
      this.iCn = e.StateGroups;
      for (let t = 0; t < i; t++) {
        const o = e.StateGroups[t];
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
        (this.ktn = this.Entity.GetComponent(74)),
        this.ktn && this.ktn.AddOnEntityOverlapCallback(this.lCn),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.uCn,
        ),
        this.cCn(),
        !0
      );
    }
    OnClear() {
      return (
        this.ktn && this.ktn.RemoveOnEntityOverlapCallback(this.lCn),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.uCn,
        ),
        !0
      );
    }
    OnForceTick(t) {
      this.cjr(t);
    }
    OnActivate() {
      !Info_1.Info.EnableForceTick &&
        this.Active &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
        );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
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
    _Cn() {
      (this.hCn = this.nCn.length > 0 || this.aCn || this.sCn.size > 0),
        this.hCn || (this.Pun = 0);
    }
    mCn() {
      this.tCn = void 0;
      const t = this.Entity.GetComponent(117).State;
      let e = "";
      t === 1 ? (e = "常态") : t === 2 && (e = "激活");
      for (const i of this.iCn) i.EntityState.includes(e) && (this.tCn = i);
      this.tCn ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneItem", 36, "传送带静止"));
    }
    cCn() {
      let t, e;
      this.mCn(),
        this.tCn &&
          ((t = this.tCn.FieldType.Type) ===
          IComponent_1.EConveyorBeltFieldType.DirectionalField
            ? ((this.Qrr = this.tCn.MoveType.Speed),
              (e = this.tCn.FieldType.Direction),
              (this.yun.X = e.X ?? 0),
              (this.yun.Y = e.Y ?? 0),
              (this.yun.Z = e.Z ?? 0),
              (e = this.Entity.GetComponent(1).ActorRotation.RotateVector(
                this.yun.ToUeVector(),
              )),
              this.yun.FromUeVector(e),
              this.yun.Normalize(NORMALIZE),
              this.yun.MultiplyEqual(this.Qrr))
            : t === IComponent_1.EConveyorBeltFieldType.PointField &&
              (this.Qrr = this.tCn.MoveType.Speed));
    }
  });
(SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(131)],
    SceneItemConveyorBeltComponent,
  )),
  (exports.SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent);
// # sourceMappingURL=SceneItemConveyorBeltComponent.js.map
