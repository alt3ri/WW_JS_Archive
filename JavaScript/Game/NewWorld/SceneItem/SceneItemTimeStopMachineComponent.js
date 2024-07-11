"use strict";
var SceneItemTimeStopMachineComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, n) {
      var o,
        s = arguments.length,
        r =
          s < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(e, t, i, n);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (o = e[h]) &&
            (r = (s < 3 ? o(r) : 3 < s ? o(t, i, r) : o(t, i)) || r);
      return 3 < s && r && Object.defineProperty(t, i, r), r;
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
        (this.wlr = void 0),
        (this.zht = void 0),
        (this.fSn = new Map()),
        (this.pSn = new Set()),
        (this.gIe = (e, t) => {
          t?.includes(this.wlr) &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Temp", 32, "[结束时停]"),
            this.vSn()),
            e?.includes(this.wlr) &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Temp", 32, "[开始时停]"),
              this.MSn());
        }),
        (this.Fm = (e, t) => {
          this.fSn.has(t) && (this.SSn(t), this.fSn.delete(t));
        }),
        (this.ESn = (e, t, i) => {
          var n = t.Entity.GetComponent(0).GetPbDataId();
          this.pSn.has(n) &&
            (this.pSn.delete(n), this.ySn(t), 0 === this.pSn.size) &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.ESn,
            );
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemTimeStopMachineComponent_1)[0];
      return (
        (this.Lo = e),
        (this.wlr = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          this.Lo.ActiveState,
        )),
        !0
      );
    }
    OnStart() {
      return (
        (this.zht = this.Entity.CheckGetComponent(0)),
        this.dde(),
        this.fSn.clear(),
        this.pSn.clear(),
        !0
      );
    }
    OnEnd() {
      return this.Cde(), this.fSn.clear(), this.pSn.clear(), !0;
    }
    dde() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnLevelTagChanged,
        this.gIe,
      ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.Fm,
        );
    }
    Cde() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnLevelTagChanged,
        this.gIe,
      ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.Fm,
        ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.ESn,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.ESn,
          );
    }
    MSn() {
      var e = this.Lo?.Target.EntityIds;
      if (e)
        for (const i of e) {
          var t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
          t?.Valid ? this.ySn(t) : (this.pSn.add(i), this.ISn());
        }
    }
    ySn(e) {
      var t,
        i,
        n = e.Entity?.GetComponent(107);
      n &&
        ((t = n.SetTimeScale(
          1,
          0,
          void 0,
          this.Lo.StopTime + TOLERANCE_TIME,
          7,
        )),
        (i = e.Entity.GetComponent(0).GetEntityType()) ===
        Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
          ? e.Entity.GetComponent(177)?.AddTag(-1201477412)
          : e.Entity.GetComponent(187)?.AddBuff(timeStopBuffId, {
              InstigatorId: this.zht.GetCreatureDataId(),
              Level: 1,
              Reason: "TimeStopMachine",
            }),
        this.fSn.set(
          e,
          new TimeStopData(
            n,
            t,
            i === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem,
          ),
        ));
    }
    vSn() {
      for (var [e] of this.fSn) this.SSn(e);
      this.fSn.clear(),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.ESn,
        ) &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.ESn,
          ),
          this.pSn.clear());
    }
    SSn(e) {
      var t = this.fSn.get(e);
      t &&
        (t.TimeScaleComponent.RemoveTimeScale(t.TimeScaleId),
        t.IsSceneItem
          ? e.Entity.GetComponent(177)?.RemoveTag(-1201477412)
          : e.Entity.GetComponent(187)?.RemoveBuff(
              timeStopBuffId,
              -1,
              "TimeStopMachine",
            ));
    }
    ISn() {
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AddEntity,
        this.ESn,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.ESn,
        );
    }
  });
(SceneItemTimeStopMachineComponent = SceneItemTimeStopMachineComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(191)],
    SceneItemTimeStopMachineComponent,
  )),
  (exports.SceneItemTimeStopMachineComponent =
    SceneItemTimeStopMachineComponent);
//# sourceMappingURL=SceneItemTimeStopMachineComponent.js.map
