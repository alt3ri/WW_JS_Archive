"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixSequencePlayer = void 0);
const LauncherLog_1 = require("../../Util/LauncherLog");
class HotFixSequencePlayer {
  constructor(e) {
    (this.HPt = void 0),
      (this.jPt = void 0),
      (this.VPt = new Map()),
      (this.jPt = e),
      (this.HPt = e.GetOwner());
  }
  JPt(e) {
    let t = this.VPt.get(e);
    if (!t) {
      if (!(t = this.HPt.GetSequencePlayContextOfKey(e))) return;
      (t.bIsAsync = !1), this.VPt.set(e, t);
    }
    return t;
  }
  PlaySequence(e, t = void 0) {
    const i = this.JPt(e);
    return i
      ? (i.OnFinish.Bind(() => {
          i.OnFinish.Unbind(), t?.();
        }),
        i.ExecutePlay(),
        LauncherLog_1.LauncherLog.Info("播放关卡序列", ["SequenceName", e]),
        !0)
      : (LauncherLog_1.LauncherLog.Warn("关卡序列不存在"), t?.(), !1);
  }
  StopSequence(e, t = !1, i = void 0) {
    let s, r;
    return !(
      !this.jPt.LevelSequences.Get(e) ||
      !(s = this.HPt.GetSequencePlayerByKey(e)) ||
      !(r = this.VPt.get(e)) ||
      (t &&
        this.HPt.SequenceJumpToSecondByKey(
          e,
          s.SequencePlayer.GetDuration().Time,
        ),
      r.TryStop(),
      i?.(),
      0)
    );
  }
  ClearSequence() {
    this.VPt.clear(),
      this.HPt.ClearAllSequence(),
      (this.HPt = void 0),
      (this.jPt = void 0);
  }
}
exports.HotFixSequencePlayer = HotFixSequencePlayer;
// # sourceMappingURL=HotFixSequencePlayer.js.map
