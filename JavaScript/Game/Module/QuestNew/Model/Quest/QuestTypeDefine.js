"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PoiQuest =
    exports.GuideQuest =
    exports.RoleQuest =
    exports.TestQuest =
    exports.BranchQuest =
    exports.MainQuest =
    exports.createQuestObj =
      void 0);
const DailyQuest_1 = require("./DailyQuest"),
  Quest_1 = require("./Quest");
function createQuestObj(s) {
  if (s) {
    let e = void 0;
    switch (s.Type) {
      case 100:
        e = new TestQuest(100, s);
        break;
      case 1:
        e = new MainQuest(1, s);
        break;
      case 2:
        e = new BranchQuest(2, s);
        break;
      case 3:
        e = new RoleQuest(3, s);
        break;
      case 7:
        e = new GuideQuest(7, s);
        break;
      case 4:
        e = new DailyQuest_1.DailyQuest(4, s);
        break;
      case 9:
        e = new PoiQuest(9, s);
        break;
      default:
        e = new Quest_1.Quest(s.Type, s);
    }
    return e;
  }
}
exports.createQuestObj = createQuestObj;
class MainQuest extends Quest_1.Quest {
  SetUpBehaviorTree(e) {
    super.SetUpBehaviorTree(e), e.SetMapMarkResident(!0);
  }
}
exports.MainQuest = MainQuest;
class BranchQuest extends Quest_1.Quest {}
exports.BranchQuest = BranchQuest;
class TestQuest extends Quest_1.Quest {}
exports.TestQuest = TestQuest;
class RoleQuest extends Quest_1.Quest {}
exports.RoleQuest = RoleQuest;
class GuideQuest extends Quest_1.Quest {}
exports.GuideQuest = GuideQuest;
class PoiQuest extends Quest_1.Quest {}
exports.PoiQuest = PoiQuest;
//# sourceMappingURL=QuestTypeDefine.js.map
