"use strict";
var SceneItemTimeStopMachineComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, n) {
      var s,
        o = arguments.length,
        h =
          o < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(e, t, i, n);
      else
        for (var r = e.length - 1; 0 <= r; r--)
          (s = e[r]) &&
            (h = (o < 3 ? s(h) : 3 < o ? s(t, i, h) : s(t, i)) || h);
      return 3 < o && h && Object.defineProperty(t, i, h), h;
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
  TIME_STOP_BUFF_ID = 600000009;
class TimeStopData {
  constructor(e, t, i) {
    (this.TimeScaleComponent = void 0),
      (this.TimeScaleId = void 0),
      (this.IsSceneItem = !1),
      (this.TimeScaleComponent = e),
      (this.TimeScaleId = t),
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
        (this.bJa = !1),
        (this.g_n = (e, t) => {
          e !== this.A1r && this.bJa
            ? ((this.bJa = !1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Temp", 31, "[结束时停]"),
              this.JMn())
            : e !== this.A1r ||
              this.bJa ||
              ((this.bJa = !0),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Temp", 31, "[开始时停]"),
              this.zMn());
        }),
        (this.Fm = (e, t) => {
          this.$Mn.has(t) &&
            (this.ZMn(t),
            this.$Mn.delete(t),
            EventSystem_1.EventSystem.RemoveWithTargetUseKey(
              this,
              t,
              EventDefine_1.EEventName.RemoveEntity,
              this.Fm,
            ));
        }),
        (this.eEn = (e, t, i) => {
          var n = t.Entity.GetComponent(0).GetPbDataId();
          this.YMn.has(n) &&
            (this.YMn.delete(n), this.tEn(t), 0 === this.YMn.size) &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.eEn,
            );
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemTimeStopMachineComponent_1)[0];
      return (
        (this.Lo = e),
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
      var e = this.Lo?.Target.EntityIds;
      if (e)
        for (const i of e) {
          var t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
          t?.Valid ? this.tEn(t) : (this.YMn.add(i), this.iEn());
        }
    }
    tEn(e) {
      var t,
        i,
        n = e.Entity?.GetComponent(120);
      n &&
        ((t = n.SetTimeScale(
          1,
          0,
          void 0,
          this.Lo.StopTime + TOLERANCE_TIME,
          8,
        )),
        (i = e.Entity.GetComponent(0).GetEntityType()) ===
        Protocol_1.Aki.Protocol.kks.Proto_SceneItem
          ? e.Entity.GetComponent(194)?.AddTag(-1201477412)
          : e.Entity.GetComponent(207)?.AddBuff(TIME_STOP_BUFF_ID, {
              InstigatorId: this.u1t.GetCreatureDataId(),
              Level: 1,
              Reason: "TimeStopMachine",
            }),
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
          this,
          e,
          EventDefine_1.EEventName.RemoveEntity,
          this.Fm,
        ),
        this.$Mn.set(
          e,
          new TimeStopData(
            n,
            t,
            i === Protocol_1.Aki.Protocol.kks.Proto_SceneItem,
          ),
        ));
    }
    JMn() {
      for (var [e] of this.$Mn) this.ZMn(e);
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
    ZMn(e) {
      var t = this.$Mn.get(e);
      t &&
        (t.TimeScaleComponent.RemoveTimeScale(t.TimeScaleId),
        t.IsSceneItem
          ? e.Entity.GetComponent(194)?.RemoveTag(-1201477412)
          : e.Entity.GetComponent(207)?.RemoveBuff(
              TIME_STOP_BUFF_ID,
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
    [(0, RegisterComponent_1.RegisterComponent)(211)],
    SceneItemTimeStopMachineComponent,
  )),
  (exports.SceneItemTimeStopMachineComponent =
    SceneItemTimeStopMachineComponent);
//# sourceMappingURL=SceneItemTimeStopMachineComponent.js.map
