"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTabSequence = void 0);
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  UiTabViewBehavior_1 = require("./UiTabViewBehavior");
class UiTabSequence extends UiTabViewBehavior_1.UiTabViewBehavior {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.KIt = void 0),
      (this.jFt = void 0),
      (this.WFt = (e) => {
        e = this.KIt?.get(e);
        if (e) for (const i of e) i?.();
      });
  }
  SetRootItem(e) {
    this.jFt = e;
  }
  Init() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.jFt.GetRootItem(),
    )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.WFt);
  }
  Begin() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  ShowFromToggle() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Sle");
  }
  ShowFromView() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("ShowView");
  }
  PlaySequence(e) {
    this.LevelSequencePlayer?.PlayLevelSequenceByName(e);
  }
  Hide() {
    this.LevelSequencePlayer?.StopCurrentSequence();
  }
  Destroy() {
    this.LevelSequencePlayer?.Clear(),
      (this.LevelSequencePlayer = void 0),
      this.KIt?.clear();
  }
  AddSequenceFinishEvent(e, i, t = !1) {
    this.KIt || (this.KIt = new Map());
    let s = this.KIt.get(e);
    s ? t && s.clear() : ((s = new Set()), this.KIt.set(e, s)), s.add(i);
  }
  GetLevelSequencePlayer() {
    return this.LevelSequencePlayer;
  }
}
exports.UiTabSequence = UiTabSequence;
//# sourceMappingURL=UiTabSequence.js.map
