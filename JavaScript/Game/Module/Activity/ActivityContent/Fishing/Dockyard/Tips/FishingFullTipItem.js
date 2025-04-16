"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingFullTipItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class FishingFullTipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  SetTxtInfo(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, i);
  }
  PlayTipSequence(e, i = "Start", t = !0) {
    this.SetActive(!0),
      this.LevelSequencePlayer.PlaySequenceAsync(
        i,
        new CustomPromise_1.CustomPromise(),
        t,
      ).finally(() => {
        this.SetActive(!1), e?.();
      });
  }
}
exports.FishingFullTipItem = FishingFullTipItem;
//# sourceMappingURL=FishingFullTipItem.js.map
