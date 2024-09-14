"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventLeisureInteract = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventLeisureInteract extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.QYs = void 0),
      (this.IXi = void 0),
      (this.KYs = 0);
  }
  ExecuteNew(e, t, i) {
    var s = e;
    if (s)
      if (Global_1.Global.BaseCharacter) {
        var r =
          Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
            26,
          );
        switch (s.Option.Type) {
          case IAction_1.ELeisureInteract.SitDown:
            var o = t,
              o = EntitySystem_1.EntitySystem.Get(o.EntityId);
            if (!o)
              return (
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    37,
                    " LevelEventLeisureInteract, 尝试坐下椅子实体不存在",
                  ),
                void this.FinishExecute(!1)
              );
            r.EnterSitDownAction(o), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.Manipulate:
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                32,
                "[LevelEventLeisureInteract]控物动作已废弃",
              );
            break;
          case IAction_1.ELeisureInteract.Catapult:
          case IAction_1.ELeisureInteract.SuperCatapult:
            {
              let e = 0;
              switch (t.Type) {
                case 5:
                  e = t.TriggerEntityId;
                  break;
                case 1:
                  e = t.EntityId;
              }
              o = EntitySystem_1.EntitySystem.Get(e);
              r.StartCatapult(o, s.Option), this.FinishExecute(!0);
            }
            break;
          case IAction_1.ELeisureInteract.Bounce:
            r.StartBounce(s.Option), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.StandControl:
            r.PlayCustomCommonSkill(400202), this.FinishExecute(!0);
        }
        (this.QYs = void 0), (this.IXi = void 0), (this.KYs = 0);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelEvent",
            37,
            " LevelEventLeisureInteract, 尝试执行时主角未创建",
          ),
          (this.QYs = e),
          (this.IXi = t),
          (this.KYs = i);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          58,
          " LevelEventLeisureInteract, 坐下参数为空",
        );
  }
  OnTick(e) {
    Global_1.Global.BaseCharacter &&
      this.QYs &&
      this.IXi &&
      this.ExecuteNew(this.QYs, this.IXi, this.KYs);
  }
}
exports.LevelEventLeisureInteract = LevelEventLeisureInteract;
//# sourceMappingURL=LevelEventLeisureInteract.js.map
