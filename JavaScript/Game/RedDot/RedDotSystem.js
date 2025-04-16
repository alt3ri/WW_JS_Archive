"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotSystem = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../Core/Common/Log"),
  List_1 = require("../../Core/Container/List"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  ModelManager_1 = require("../Manager/ModelManager");
class RedDotEventData {
  constructor(t, e, s) {
    (this.Event = t), (this.Id = e), (this.RedDotName = s);
  }
  HandleEvent() {
    this.Event(this.Id);
  }
}
const TICK_TOTAL_TIME = 500;
class RedDotSystem {
  static PushToEventQueue(t, e, s) {
    var i = s + e;
    this.Rrl.has(i) ||
      (this.zah?.RedDotName === s && this.zah?.Id === e
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("RedDot", 69, "红点处理存在循环调用, 详情见堆栈", [
            "红点名",
            s,
          ])
        : ((t = this.GetRedDotEventData(t, e, s)),
          this.xrl.AddTail(t),
          this.Rrl.add(i)));
  }
  static Prl() {
    var t = this.xrl.GetHeadNextNode(),
      e = t.Element;
    (this.zah = e),
      this.xrl.RemoveNode(t),
      this.Rrl.delete(e.RedDotName + e.Id),
      e.HandleEvent(),
      (this.zah = void 0),
      this.Jah.push(e);
  }
  static Tick(t) {
    if (1 === ModelManager_1.ModelManager.GameModeModel?.LoadingPhase) {
      var e = this.xrl.Count;
      if (!(e <= 0)) {
        let t = e;
        for (; 0 < this.wrl && 0 < t; ) {
          var s = cpp_1.KuroTime.GetMicroseconds64(),
            s = (this.Prl(), cpp_1.KuroTime.GetMicroseconds64() - s);
          (this.wrl -= s), t--;
        }
        cpp_1.FKuroPerfSightHelper.PostValueFloat1(
          "RedDot",
          "RedDotCostPerFrame",
          (TICK_TOTAL_TIME - this.wrl) / 1e3,
        ),
          (this.wrl = TICK_TOTAL_TIME);
      }
    }
  }
  static GetRedDotEventData(t, e, s) {
    var i;
    return 0 < this.Jah.length
      ? (((i = this.Jah.pop()).Event = t), (i.Id = e), (i.RedDotName = s), i)
      : new RedDotEventData(t, e, s);
  }
}
((exports.RedDotSystem = RedDotSystem).xrl = new List_1.default(
  new RedDotEventData((t) => {}, 0, ""),
)),
  (RedDotSystem.Jah = []),
  (RedDotSystem.Rrl = new Set()),
  (RedDotSystem.zah = void 0),
  (RedDotSystem.wrl = TICK_TOTAL_TIME),
  (RedDotSystem.IsOpenLogCallTime = !1);
//# sourceMappingURL=RedDotSystem.js.map
