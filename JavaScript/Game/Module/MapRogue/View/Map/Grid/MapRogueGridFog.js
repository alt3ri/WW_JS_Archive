"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGridFog = void 0);
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class MapRogueGridFog extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.LevelSequencePlayer = void 0), (this.BNc = !1);
  }
  OnRegisterComponent() {}
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  SetVision(e, s) {
    var i, t;
    this.BNc !== e &&
      ((this.BNc = e)
        ? ((e = ["Disappear", "Disappear1", "Disappear2"]),
          (i = Math.floor(Math.random() * e.length)),
          (t = new CustomPromise_1.CustomPromise()),
          this.LevelSequencePlayer.PlaySequenceAsync(e[i], t).finally(() => {
            this.SetActive(!1);
          }))
        : this.SetActive(!0));
  }
}
exports.MapRogueGridFog = MapRogueGridFog;
//# sourceMappingURL=MapRogueGridFog.js.map
