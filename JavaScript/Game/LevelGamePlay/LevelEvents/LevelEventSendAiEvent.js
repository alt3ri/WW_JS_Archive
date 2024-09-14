"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSendAiEvent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendAiEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    e || (Log_1.Log.CheckError() && Log_1.Log.Error("Event", 30, "参数不合法"));
    var n = t;
    switch (
      (n ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 30, "上下文不合法")),
      e.EventType)
    ) {
      case IAction_1.EAiEventType.CatAndDogPlayFlow:
      case IAction_1.EAiEventType.AnimalRandomAction:
        this.gRe(n.EntityId);
        break;
      case IAction_1.EAiEventType.AnimalStandUp:
        this.fRe(n.EntityId);
        break;
      case IAction_1.EAiEventType.AnimalSitDown:
        this.pRe(n.EntityId);
    }
  }
  fRe(e) {
    var t,
      n,
      e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    e?.Valid
      ? e.Entity.GetComponent(40)
        ? ((t = (e = e.Entity.GetComponent(190))?.HasTag(393622611)),
          (n = e?.HasTag(276015887)),
          this.vRe(e),
          !t && n ? e?.AddTag(379545977) : e?.AddTag(1900394806),
          e?.AddTag(351576188))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 30, "Entity不合法，缺少CharacterAiComponent")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Event", 30, "对象Entity不合法");
  }
  pRe(e) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    e?.Valid
      ? e.Entity.GetComponent(40)
        ? ((e = e.Entity.GetComponent(190)),
          this.vRe(e),
          Math.random() < 0.5 ? e?.AddTag(393622611) : e?.AddTag(276015887),
          e?.AddTag(351576188))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 30, "Entity不合法，缺少CharacterAiComponent")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Event", 30, "对象Entity不合法");
  }
  gRe(e) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    e?.Valid
      ? e.Entity.GetComponent(40)
        ? ((e = e.Entity.GetComponent(190)),
          this.vRe(e),
          e?.AddTag(502364103),
          e?.AddTag(351576188))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 30, "Entity不合法，缺少CharacterAiComponent")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Event", 30, "对象Entity不合法");
  }
  vRe(e) {
    e?.Valid &&
      (e.RemoveTag(502364103),
      e.RemoveTag(393622611),
      e.RemoveTag(276015887),
      e.RemoveTag(1900394806),
      e.RemoveTag(379545977));
  }
}
exports.LevelEventSendAiEvent = LevelEventSendAiEvent;
//# sourceMappingURL=LevelEventSendAiEvent.js.map
