"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
class TsUiAutoPlayLevelSequenceComponent extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.AutoPlayList = void 0),
      (this.PlayState = void 0);
  }
  AwakeBP() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootUIComp,
    )),
      (this.PlayState = 0);
  }
  OnUIActiveInHierarchyBP(e) {
    this.PlayState = e ? 1 : 2;
  }
  OnDestroyBP() {
    this.LevelSequencePlayer?.Clear(), (this.LevelSequencePlayer = void 0);
  }
  UpdateBP(e) {
    this.PlayState !== 0 &&
      (this.PlayState === 1
        ? (this.TryPlay(), (this.PlayState = 0))
        : this.PlayState === 2 && (this.TryStop(), (this.PlayState = 0)));
  }
  TryPlay() {
    const e = this.GetOwner();
    if (e) {
      const t = e.GetUIItem().LevelSequences;
      const s = ((this.AutoPlayList = new Array()), t.Num());
      for (let e = 0; e < s; ++e) {
        const i = t.GetKey(e);
        t.Get(i).PlaySetting.bAutoPlay &&
          (this.LevelSequencePlayer.PlaySequencePurely(i),
          this.AutoPlayList.push(i));
      }
    }
  }
  TryStop() {
    const e = this.GetOwner();
    if (e) {
      for (const t of this.AutoPlayList) e.StopSequenceByKey(t);
      this.AutoPlayList = void 0;
    }
  }
}
exports.default = TsUiAutoPlayLevelSequenceComponent;
// # sourceMappingURL=TsUiAutoPlayLevelSequenceComponent.js.map
