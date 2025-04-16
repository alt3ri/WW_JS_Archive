"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridAppearAnimationBase = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class GridAppearAnimationBase {
  constructor(t) {
    (this.GridPreserver = void 0),
      (this.zqo = void 0),
      (this.DisplayGridNum = 0),
      (this.sKe = TickSystem_1.TickSystem.InvalidId),
      (this.IsInGridAppearAnimation = !1),
      (this.HasShowFirstGrid = !1),
      (this.Zqo = new Map()),
      (this.uCt = () => {
        this.GridPreserver.NotifyAnimationEnd();
      }),
      (this.Tick = (t) => {
        this.OnUpdate(t);
      }),
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ScrollViewGrid",
            24,
            "设置错误，gridPreserver为空!",
          )),
      (this.GridPreserver = t);
  }
  IsGridControlValid() {
    return !this.IsInGridAppearAnimation;
  }
  PlayGridAnim(t, i = !1) {
    this.zqo
      ? (this.GridPreserver.NotifyAnimationStart(), this.zqo.Play("", t, i))
      : this.GridPreserver.GetGridAnimationInterval() <= 0 &&
          this.GridPreserver.GetGridAnimationStartTime() <= 0
        ? this.GridPreserver.NotifyAnimationEnd()
        : (this.eGo(), this.il());
  }
  Clear() {
    this.zqo
      ? (this.zqo.OnFinish.Unbind(), this.GridPreserver.NotifyAnimationEnd())
      : (this.GridPreserver.GetGridAnimationInterval() <= 0 &&
          this.GridPreserver.GetGridAnimationStartTime() <= 0) ||
        this.eGo();
  }
  RegisterAnimController() {
    (this.zqo = this.GridPreserver.GetUiAnimController()),
      this.zqo &&
        (this.zqo.SetTickableWhenPaused(!0), this.zqo.OnFinish.Bind(this.uCt));
  }
  eGo() {
    this.GridPreserver.NotifyAnimationEnd(),
      this.RemoveTimer(),
      this.OnInterrupt();
  }
  il() {
    (this.DisplayGridNum = this.GridPreserver.GetDisplayGridNum()),
      this.tGo(),
      this.OnStart();
  }
  OnStart() {}
  OnUpdate(t) {}
  GridsForEach(i) {
    var e = this.GridPreserver.GetPreservedGridNum() - 1;
    for (let t = 0; t <= e; t++) {
      var s = this.GridPreserver.GetGridByDisplayIndex(t);
      i(t, s);
    }
  }
  End() {
    this.RemoveTimer(), this.OnEnd();
  }
  OnEnd() {}
  OnInterrupt() {
    for (const t of this.Zqo.values()) t.StopSequenceByKey("Start"), t.Clear();
    this.Zqo.clear();
  }
  ShowGrid(t, i) {
    t.SetUIActive(!0);
    let e = this.Zqo.get(t);
    e ||
      ((e = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      this.Zqo.set(t, e)),
      e.StopSequenceByKey("Start"),
      e.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnShowGridAnimation,
        i,
        t,
      );
  }
  tGo() {
    this.sKe === TickSystem_1.TickSystem.InvalidId &&
      (this.sKe = TickSystem_1.TickSystem.Add(
        this.Tick,
        "GridAppearAnimation",
        0,
        !0,
      ).Id);
  }
  RemoveTimer() {
    this.sKe !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.sKe),
      (this.sKe = TickSystem_1.TickSystem.InvalidId));
  }
}
exports.GridAppearAnimationBase = GridAppearAnimationBase;
//# sourceMappingURL=GridAppearAnimationBase.js.map
