"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleDungeonGuideButton = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BattleEntranceButton_1 = require("./BattleEntranceButton");
class BattleDungeonGuideButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.eka = () => {
        this.SPe.PlayLevelSequenceByName("Shouqi");
      });
  }
  Initialize(e) {
    super.Initialize(e),
      e &&
        (this.AddEvents(),
        (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem,
        )));
  }
  Reset() {
    this.SPe?.Clear(), (this.SPe = void 0), this.RemoveEvents(), super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleIntroductionViewHide,
      this.eka,
    );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleIntroductionViewHide,
      this.eka,
    );
  }
}
exports.BattleDungeonGuideButton = BattleDungeonGuideButton;
//# sourceMappingURL=BattleDungeonGuideButton.js.map
