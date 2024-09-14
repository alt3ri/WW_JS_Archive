"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventHighlightExploreUi = void 0);
const Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHighlightExploreUi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    e || this.FinishExecute(!1);
    var r,
      s =
        Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
          47,
        );
    s &&
      ("Show" === (e = e).Type &&
        ((r = e),
        s
          .GetHighlightExploreSkill()
          .ShowHighlightExploreSkill(r.SkillType, r.Duration, r.IsSwitchBack)),
      "Hide" === e.Type) &&
      s.GetHighlightExploreSkill().HideHighlightExploreSkill();
  }
}
exports.LevelEventHighlightExploreUi = LevelEventHighlightExploreUi;
//# sourceMappingURL=LevelEventHighlightExploreUi.js.map
