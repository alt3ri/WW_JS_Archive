"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
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
    0 !== this.PlayState &&
      (1 === this.PlayState
        ? (this.TryPlay(), (this.PlayState = 0))
        : 2 === this.PlayState && (this.TryStop(), (this.PlayState = 0)));
  }
  TryPlay() {
    var e = this.GetOwner();
    if (e) {
      var t = e.GetUIItem().LevelSequences,
        s = ((this.AutoPlayList = new Array()), t.Num());
      for (let e = 0; e < s; ++e) {
        var i = t.GetKey(e);
        t.Get(i).PlaySetting.bAutoPlay &&
          (this.LevelSequencePlayer.PlaySequencePurely(i),
          this.AutoPlayList.push(i));
      }
    }
  }
  TryStop() {
    var e = this.GetOwner();
    if (e) {
      for (const t of this.AutoPlayList) e.StopSequenceByKey(t);
      this.AutoPlayList = void 0;
    }
  }
}
exports.default = TsUiAutoPlayLevelSequenceComponent;
//# sourceMappingURL=TsUiAutoPlayLevelSequenceComponent.js.map
