"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSportsState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Global_1 = require("../../Global"),
  CharacterSlideComponent_1 = require("../../NewWorld/Character/Common/Component/Move/CharacterSlideComponent"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventSportsState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e) {
      var r = e.Config;
      switch (r.Type) {
        case "Slide":
          CharacterSlideComponent_1.CharacterSlideComponent.SetSlideConfig(
            r.SlideId,
          );
          break;
        case "Ski":
          switch (r.Config.Type) {
            case "Open":
              this.VRe(r.Config, t);
              break;
            case "Close":
              this.HRe(r.Config, t);
              break;
            case "Accelerate":
              this.jRe(r.Config, t);
          }
      }
    } else this.FinishExecute(!1);
  }
  VRe(e, t) {
    switch (t.Type) {
      case 1:
      case 6:
      case 5:
        break;
      default:
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            6,
            "LevelEventSportsState Ski: 类型必须对应GeneralLogicTreeContext | Entity | Trigger",
            ["ContextType", t.Type],
          )
        );
    }
    let r = void 0;
    var o = this.PZa(t);
    (r =
      "Player" === e.Target.Type
        ? Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()
        : r)
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            51,
            "进入滑雪模式",
            ["Type", t.Type],
            ["ContextSource", o],
          ),
        r.GetComponent(32)?.EnterSkiMode(e))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          51,
          "目前仅Role支持触发滑雪模式",
          ["ContextType", t.Type],
          ["ContextSource", o],
        );
  }
  HRe(e, t) {
    switch (t.Type) {
      case 1:
      case 6:
      case 5:
        break;
      default:
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            6,
            "LevelEventSportsState Ski: 类型必须对应GeneralLogicTreeContext | Entity | Trigger",
            ["ContextType", t.Type],
          )
        );
    }
    let r = void 0;
    var o = this.PZa(t);
    (r =
      "Player" === e.Target.Type
        ? Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()
        : r)
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            51,
            "退出滑雪模式",
            ["Type", t.Type],
            ["ContextSource", o],
          ),
        r.GetComponent(32)?.ExitSkiMode())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          51,
          "目前仅Role支持关闭滑雪模式",
          ["ContextType", t.Type],
          ["ContextSource", o],
        );
  }
  jRe(e, t) {
    t instanceof LevelGeneralContextDefine_1.TriggerContext
      ? EntitySystem_1.EntitySystem.GetComponent(
          t.OtherEntityId,
          32,
        )?.SetSkiAccel(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          6,
          "LevelEventSportsState Ski: Triggered类型必须对应TriggerContext",
          ["ContextType", t.Type],
        );
  }
  PZa(e) {
    let t = "";
    switch (e.Type) {
      case 1:
        var r = EntitySystem_1.EntitySystem.GetComponent(e.EntityId, 0);
        t = r?.GetPbDataId().toString() ?? "";
        break;
      case 6:
        t = e.TreeConfigId + "/" + e.NodeId;
        break;
      case 5:
        r = EntitySystem_1.EntitySystem.GetComponent(e.TriggerEntityId, 0);
        t = r?.GetPbDataId().toString() ?? "";
    }
    return t;
  }
}
exports.LevelEventSportsState = LevelEventSportsState;
//# sourceMappingURL=LevelEventSportsState.js.map
