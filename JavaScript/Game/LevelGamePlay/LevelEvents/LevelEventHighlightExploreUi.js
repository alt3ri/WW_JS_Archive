"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventHighlightExploreUi = void 0);
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHighlightExploreUi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    e || this.FinishExecute(!1);
    let r;
    const s =
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
        45,
      );
    s &&
      ((e = e).Type === "Show" &&
        ((r = e),
        s
          .GetHighlightExploreSkill()
          .ShowHighlightExploreSkill(r.SkillType, r.Duration, r.IsSwitchBack)),
      e.Type === "Hide") &&
      s.GetHighlightExploreSkill().HideHighlightExploreSkill();
  }
}
exports.LevelEventHighlightExploreUi = LevelEventHighlightExploreUi;
// # sourceMappingURL=LevelEventHighlightExploreUi.js.map
