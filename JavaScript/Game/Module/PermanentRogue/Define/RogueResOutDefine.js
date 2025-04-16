"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueTaskRewardTabData =
    exports.RogueDungeonParam =
    exports.RogueIllustratedTabData =
      void 0);
class RogueIllustratedTabData {
  constructor() {
    (this.TabType = 0),
      (this.Icon = ""),
      (this.TabName = ""),
      (this.Index = 1),
      (this.Config = void 0);
  }
}
exports.RogueIllustratedTabData = RogueIllustratedTabData;
class RogueDungeonParam {
  constructor() {
    (this.SeasonId = 0), (this.DungeonList = []);
  }
}
exports.RogueDungeonParam = RogueDungeonParam;
class RogueTaskRewardTabData {
  constructor() {
    (this.NameTextId = void 0),
      (this.Index = -1),
      (this.ClickedCallback = void 0),
      (this.RefreshRedDot = void 0);
  }
}
exports.RogueTaskRewardTabData = RogueTaskRewardTabData;
//# sourceMappingURL=RogueResOutDefine.js.map
