"use strict";
var SceneItemTimeStopMachineComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var s,
        o = arguments.length,
        h =
          o < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, n);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (h = (o < 3 ? s(h) : 3 < o ? s(e, i, h) : s(e, i)) || h);
      return 3 < o && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTimeStopMachineComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TOLERANCE_TIME = 3,
  timeStopBuffId = BigInt("600000009");
class TimeStopData {
  constructor(t, e, i) {
    (this.TimeScaleComponent = void 0),
      (this.TimeScaleId = void 0),
      (this.IsSceneItem = !1),
      (this.TimeScaleComponent = t),
      (this.TimeScaleId = e),
      (this.IsSceneItem = i);
  }
}
let SceneItemTimeStopMachineComponent =
  (SceneItemTimeStopMachineComponent_1 = class SceneItemTimeStopMachineComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.A1r = void 0),
        (this.u1t = void 0),
        (this.$Mn = new Map()),
        (this.YMn = new Set()),
        (this.O$a = !1),
        (this.g_n = (t, e) => {
          t !== this.A1r && this.O$a
            ? ((this.O$a = !1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Temp", 32, "[结束时停]"),
              this.JMn())
            : t !== this.A1r ||
              this.O$a ||
              ((this.O$a = !0),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Temp", 32, "[开始时停]"),
              this.zMn());
        }),
        (this.Fm = (t, e) => {
          this.$Mn.has(e) &&
            (this.ZMn(e),
            this.$Mn.delete(e),
            EventSystem_1.EventSystem.RemoveWithTargetUseKey(
              this,
              e,
              EventDefine_1.EEventName.RemoveEntity,
              this.Fm,
            ));
        }),
        (this.eEn = (t, e, i) => {
          var n = e.Entity.GetComponent(0).GetPbDataId();
          this.YMn.has(n) &&
            (this.YMn.delete(n), this.tEn(e), 0 === this.YMn.size) &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.eEn,
            );
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemTimeStopMachineComponent_1)[0];
      return (
        (this.Lo = t),
        (this.A1r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          this.Lo.ActiveState,
        )),
        !0
      );
    }
    OnStart() {
      return (
        (this.u1t = this.Entity.CheckGetComponent(0)),
        this.dde(),
        this.$Mn.clear(),
        this.YMn.clear(),
        !0
      );
    }
    OnEnd() {
      return this.Cde(), this.$Mn.clear(), this.YMn.clear(), !0;
    }
    dde() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.g_n,
      );
    }
    Cde() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.g_n,
      ),
        EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.eEn,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.eEn,
          );
    }
    zMn() {
      var t = this.Lo?.Target.EntityIds;
      if (t)
        for (const i of t) {
          var e =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
          e?.Valid ? this.tEn(e) : (this.YMn.add(i), this.iEn());
        }
    }
    tEn(t) {
      var e,
        i,
        n = t.Entity?.GetComponent(110);
      n &&
        ((e = n.SetTimeScale(
          1,
          0,
          void 0,
          this.Lo.StopTime + TOLERANCE_TIME,
          8,
        )),
        (i = t.Entity.GetComponent(0).GetEntityType()) ===
        Protocol_1.Aki.Protocol.kks.Proto_SceneItem
          ? t.Entity.GetComponent(181)?.AddTag(-1201477412)
          : t.Entity.GetComponent(194)?.AddBuff(timeStopBuffId, {
              InstigatorId: this.u1t.GetCreatureDataId(),
              Level: 1,
              Reason: "TimeStopMachine",
            }),
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
          this,
          t,
          EventDefine_1.EEventName.RemoveEntity,
          this.Fm,
        ),
        this.$Mn.set(
          t,
          new TimeStopData(
            n,
            e,
            i === Protocol_1.Aki.Protocol.kks.Proto_SceneItem,
          ),
        ));
    }
    JMn() {
      for (var [t] of this.$Mn) this.ZMn(t);
      this.$Mn.clear(),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.eEn,
        ) &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.eEn,
          ),
          this.YMn.clear());
    }
    ZMn(t) {
      var e = this.$Mn.get(t);
      e &&
        (e.TimeScaleComponent.RemoveTimeScale(e.TimeScaleId),
        e.IsSceneItem
          ? t.Entity.GetComponent(181)?.RemoveTag(-1201477412)
          : t.Entity.GetComponent(194)?.RemoveBuff(
              timeStopBuffId,
              -1,
              "TimeStopMachine",
            ));
    }
    iEn() {
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AddEntity,
        this.eEn,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.eEn,
        );
    }
  });
(SceneItemTimeStopMachineComponent = SceneItemTimeStopMachineComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(198)],
    SceneItemTimeStopMachineComponent,
  )),
  (exports.SceneItemTimeStopMachineComponent =
    SceneItemTimeStopMachineComponent);
//# sourceMappingURL=SceneItemTimeStopMachineComponent.js.map
