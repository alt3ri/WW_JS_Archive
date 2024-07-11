"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkSelectComponent = void 0);
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class MarkSelectComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.SPe = void 0), (this.mRi = !1);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetActive(e) {
    this.laa(e);
  }
  async laa(e) {
    return (
      this.mRi !== e &&
        ((this.mRi = e),
        this.mRi
          ? (this.RootItem.SetUIActive(e),
            await this.SPe.PlaySequenceAsync(
              "xuanzhong",
              new CustomPromise_1.CustomPromise(),
            ))
          : (await this.SPe.PlaySequenceAsync(
              "Close",
              new CustomPromise_1.CustomPromise(),
            ),
            this.RootItem.SetUIActive(e))),
      !0
    );
  }
}
exports.MarkSelectComponent = MarkSelectComponent;
//# sourceMappingURL=MarkSelectComponent.js.map
