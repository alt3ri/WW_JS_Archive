"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixSequencePlayer = void 0);
const LauncherLog_1 = require("../../Util/LauncherLog");
class HotFixSequencePlayer {
  constructor(e) {
    (this.Qxt = void 0),
      (this.Xxt = void 0),
      (this.Kxt = new Map()),
      (this.Xxt = e),
      (this.Qxt = e.GetOwner());
  }
  twt(e) {
    let t = this.Kxt.get(e);
    if (!t) {
      if (!(t = this.Qxt.GetSequencePlayContextOfKey(e))) return;
      (t.bIsAsync = !1), this.Kxt.set(e, t);
    }
    return t;
  }
  PlaySequence(e, t = void 0) {
    const i = this.twt(e);
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
    var s, r;
    return !(
      !this.Xxt.LevelSequences.Get(e) ||
      !(s = this.Qxt.GetSequencePlayerByKey(e)) ||
      !(r = this.Kxt.get(e)) ||
      (t &&
        this.Qxt.SequenceJumpToSecondByKey(
          e,
          s.SequencePlayer.GetDuration().Time,
        ),
      r.TryStop(),
      i?.(),
      0)
    );
  }
  ClearSequence() {
    this.Kxt.clear(),
      this.Qxt.ClearAllSequence(),
      (this.Qxt = void 0),
      (this.Xxt = void 0);
  }
}
exports.HotFixSequencePlayer = HotFixSequencePlayer;
//# sourceMappingURL=HotFixSequencePlayer.js.map
