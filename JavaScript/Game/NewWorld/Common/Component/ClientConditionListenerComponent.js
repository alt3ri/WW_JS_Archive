"use strict";
var ClientConditionListenerComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, o) {
      var i,
        r = arguments.length,
        s =
          r < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, o);
      else
        for (var l = e.length - 1; 0 <= l; l--)
          (i = e[l]) &&
            (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
      return 3 < r && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClientConditionListenerComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LevelConditionCenter_1 = require("../../../LevelGamePlay/LevelConditions/LevelConditionCenter"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class ConditionListenInfo {
  constructor(e, t, n) {
    (this.ListenType = e), (this.ConditionListener = t), (this.CheckResult = n);
  }
}
class EventHandleInfo {
  constructor(e, t, n) {
    (this.EventName = e), (this.EventHandle = t), (this.ConditionEventType = n);
  }
}
let ClientConditionListenerComponent =
  (ClientConditionListenerComponent_1 = class ClientConditionListenerComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.OMc = void 0),
        (this.qMc = void 0),
        (this.GMc = void 0),
        (this.FMc = void 0);
    }
    OnInitData(e) {
      (this.OMc = new Map()),
        (this.qMc = new Map()),
        (this.GMc = new Array()),
        (this.FMc = new Map());
      e = e?.GetParam(ClientConditionListenerComponent_1)?.[0];
      if (!e) return !1;
      for (const t of e.Listeners) this.NMc(t);
      return !0;
    }
    OnClear() {
      return (
        this.OMc?.clear(), this.qMc?.clear(), this.VMc(), this.FMc?.clear(), !0
      );
    }
    VMc() {
      for (const e of this.GMc)
        switch (e.ConditionEventType) {
          case 0:
            EventSystem_1.EventSystem.Remove(e.EventName, e.EventHandle);
            break;
          case 1:
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              e.EventName,
              e.EventHandle,
            );
        }
      this.GMc = void 0;
    }
    NMc(e) {
      var t =
          ModelManager_1.ModelManager.LevelGeneralModel.MakeConditionGroupIncId(),
        n =
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
            e.Condition,
            void 0,
          ),
        n = (n && this.m8(e), new ConditionListenInfo(1, e, n));
      this.OMc?.set(t, n);
      for (const o of e.Condition.Conditions)
        this.qMc?.has(o.Type) || this.qMc?.set(o.Type, new Set()),
          this.qMc?.get(o.Type)?.add(t);
      this.jMc(e.Condition);
    }
    jMc(e) {
      for (const r of e.Conditions) {
        var t =
          LevelConditionCenter_1.LevelConditionCenter.GetConditionListenerEventInfo(
            r.Type,
          );
        if (t && 0 !== t.size)
          for (var [n, o] of t) {
            this.FMc.has(n) || this.FMc.set(n, this.HMc.bind(this, n));
            var i = this.FMc.get(n);
            for (const s of o)
              switch (s) {
                case 0:
                  EventSystem_1.EventSystem.Has(n, i) ||
                    (EventSystem_1.EventSystem.Add(n, i),
                    this.GMc?.push(new EventHandleInfo(n, i, s)));
                  break;
                case 1:
                  EventSystem_1.EventSystem.HasWithTarget(this.Entity, n, i) ||
                    (EventSystem_1.EventSystem.AddWithTarget(this.Entity, n, i),
                    this.GMc?.push(new EventHandleInfo(n, i, s)));
              }
          }
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              72,
              "[ClientConditionListenerComponent] 监听了一个没有注册触发事件的条件，不合法",
              ["condition", r],
            );
      }
    }
    HMc(e, ...t) {
      var n =
        LevelConditionCenter_1.LevelConditionCenter.GetConditionsByEvent(e);
      if (n) {
        var o = new Set(),
          i = new Set();
        for (const C of n) {
          var r = this.qMc?.get(C);
          if (r)
            for (const v of r)
              if (!o.has(v) && !i.has(v)) {
                var s = this.OMc?.get(v);
                if (s) {
                  var l = s.CheckResult,
                    a =
                      ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
                        s.ConditionListener.Condition,
                        void 0,
                        LevelGeneralContextDefine_1.ClientEventContext.Create(
                          e,
                          ...t,
                        ),
                      );
                  switch (
                    (((s.CheckResult = a) ? o : i).add(v), s.ListenType)
                  ) {
                    case 1:
                      a && this.m8(s.ConditionListener);
                      break;
                    case 0:
                      a && l !== a && this.m8(s.ConditionListener);
                  }
                } else
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "LevelCondition",
                      72,
                      "条件监听信息不存在",
                      ["incId", v],
                      ["condition", C],
                      ["eventName", e],
                    );
              }
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            72,
            "[ClientConditionListenerComponent] 监听条件触发事件的时候没有对应条件",
            ["eventName", e],
            ["params", t],
          );
    }
    m8(e) {
      var t;
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
        e.Actions,
        LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
      ),
        e.SendSelfEvent &&
          ((t = this.Entity.GetComponent(0)),
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
            t.GetCreatureDataId(),
            e.SendSelfEvent,
          ));
    }
  });
(ClientConditionListenerComponent = ClientConditionListenerComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(256)],
    ClientConditionListenerComponent,
  )),
  (exports.ClientConditionListenerComponent = ClientConditionListenerComponent);
//# sourceMappingURL=ClientConditionListenerComponent.js.map
