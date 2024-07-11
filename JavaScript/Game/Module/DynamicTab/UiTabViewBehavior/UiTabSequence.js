"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTabSequence = void 0);
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  UiTabViewBehavior_1 = require("./UiTabViewBehavior");
class UiTabSequence extends UiTabViewBehavior_1.UiTabViewBehavior {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.JTt = void 0),
      (this.W3t = void 0),
      (this.K3t = (e) => {
        e = this.JTt?.get(e);
        if (e) for (const i of e) i?.();
      });
  }
  SetRootItem(e) {
    this.W3t = e;
  }
  Init() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.W3t.GetRootItem(),
    )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.K3t);
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
      this.JTt?.clear();
  }
  AddSequenceFinishEvent(e, i, t = !1) {
    this.JTt || (this.JTt = new Map());
    let s = this.JTt.get(e);
    s ? t && s.clear() : ((s = new Set()), this.JTt.set(e, s)), s.add(i);
  }
  GetLevelSequencePlayer() {
    return this.LevelSequencePlayer;
  }
}
exports.UiTabSequence = UiTabSequence;
//# sourceMappingURL=UiTabSequence.js.map
