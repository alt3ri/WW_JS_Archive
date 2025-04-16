"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyDiceBuffPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class DangoMonopolyDiceBuffPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Sequence = void 0), (this.Promise = void 0);
  }
  async Init(e) {
    await this.CreateByResourceIdAsync("UiItem_DiceNum", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  UpdateShowType(e) {
    this.SetActive(!0);
    var s = this.GetExtendToggle(0);
    0 === e ? s.SetToggleStateForce(0) : s.SetToggleStateForce(1);
  }
  async PlaySequence(e) {
    await this.Promise?.Promise,
      (this.Promise = new CustomPromise_1.CustomPromise()),
      await this.Sequence?.PlaySequenceAsync(e, this.Promise),
      (this.Promise = void 0);
  }
}
exports.DangoMonopolyDiceBuffPanel = DangoMonopolyDiceBuffPanel;
//# sourceMappingURL=DangoMonopolyDiceBuffPanel.js.map
