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
  Constructor() {
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
    (this.PlayState = e ? 1 : 2), 2 === this.PlayState && this.TryRefresh();
  }
  OnDestroyBP() {
    this.LevelSequencePlayer?.Clear(), (this.LevelSequencePlayer = void 0);
  }
  UpdateBP(e) {
    this.TryRefresh();
  }
  TryRefresh() {
    0 !== this.PlayState &&
      (1 === this.PlayState
        ? (this.TryPlay(), (this.PlayState = 0))
        : 2 === this.PlayState && (this.TryStop(), (this.PlayState = 0)));
  }
  TryPlay() {
    var e = this.GetOwner();
    if (e) {
      var t = e.GetUIItem().LevelSequences,
        i = ((this.AutoPlayList = new Array()), t.Num());
      for (let e = 0; e < i; ++e) {
        var s = t.GetKey(e);
        t.Get(s).PlaySetting.bAutoPlay &&
          (this.LevelSequencePlayer.PlaySequencePurely(s),
          this.AutoPlayList.push(s));
      }
    }
  }
  TryStop() {
    if (this.AutoPlayList) {
      var e = this.GetOwner();
      if (e) {
        for (const t of this.AutoPlayList) e.StopSequenceByKey(t);
        this.AutoPlayList = void 0;
      }
    }
  }
}
exports.default = TsUiAutoPlayLevelSequenceComponent;
//# sourceMappingURL=TsUiAutoPlayLevelSequenceComponent.js.map
