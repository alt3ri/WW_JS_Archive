"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedDollChallengeFailItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BigStuffedDollChallengeFailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.yct = (e) => {
        switch (e) {
          case "Start":
            this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
            break;
          case "Close":
            this.HideAsync(),
              ModelManager_1.ModelManager.BigStuffedDollModel.SetGameStage(5);
        }
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    super.OnStart(),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear(), (this.LevelSequencePlayer = void 0);
  }
  ShowTip(e) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e),
      this.ShowAsync(),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
}
exports.BigStuffedDollChallengeFailItem = BigStuffedDollChallengeFailItem;
//# sourceMappingURL=BigStuffedDollChallengeFailItem.js.map
