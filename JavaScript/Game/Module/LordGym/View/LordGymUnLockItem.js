"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymUnLockItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LordGymUnLockItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.bPe = void 0),
      (this.KIt = (e) => {
        e === "Start" && this.bPe.PlayLevelSequenceByName("Close"),
          e === "Close" && this.SetActive(!1);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    (this.bPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.bPe.BindSequenceCloseEvent(this.KIt);
  }
  RefreshLord(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "LordGymUnLock",
      e.GymTitle,
    ),
      this.bPe.PlayLevelSequenceByName("Start");
  }
}
exports.LordGymUnLockItem = LordGymUnLockItem;
// # sourceMappingURL=LordGymUnLockItem.js.map
