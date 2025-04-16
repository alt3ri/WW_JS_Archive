"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerDeTermSelectDesItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerDeTermSelectDesItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.DeTermId = 0),
      (this.LevelSequencePlayer = void 0),
      (this.OnClickCallBack = void 0),
      (this.YP = () => {
        this.OnClickCallBack?.(this.DeTermId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.YP]]);
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  Refresh(e, t, i) {
    this.DeTermId = e;
    e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.DesText),
      this.GetText(1).SetText(e.Star + ""),
      this.LevelSequencePlayer?.StopCurrentSequence(!1, !0);
  }
  PlayChoseSequence() {
    this.LevelSequencePlayer?.StopCurrentSequence(!1, !0),
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop_Center_Once");
  }
}
exports.BabelTowerDeTermSelectDesItem = BabelTowerDeTermSelectDesItem;
//# sourceMappingURL=BabelTowerDeTermSelectDesItem.js.map
