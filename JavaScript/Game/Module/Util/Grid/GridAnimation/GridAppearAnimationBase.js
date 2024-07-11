"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridAppearAnimationBase = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  PerformanceController_1 = require("../../../../../Core/Performance/PerformanceController"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class GridAppearAnimationBase {
  constructor(t) {
    (this.GridPreserver = void 0),
      (this.tqo = void 0),
      (this.DisplayGridNum = 0),
      (this.Xje = TickSystem_1.TickSystem.InvalidId),
      (this.IsInGridAppearAnimation = !1),
      (this.HasShowFirstGrid = !1),
      (this.iqo = new Map()),
      (this.Zmt = () => {
        this.GridPreserver.NotifyAnimationEnd();
      }),
      (this.Tick = (t) => {
        var e = PerformanceController_1.PerformanceController.StartMonitor(
          "GridAppearAnimationBase.Tick",
        );
        this.OnUpdate(t),
          PerformanceController_1.PerformanceController.EndMonitor(e);
      }),
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ScrollViewGrid",
            25,
            "设置错误，gridPreserver为空!",
          )),
      (this.GridPreserver = t);
  }
  IsGridControlValid() {
    return !this.IsInGridAppearAnimation;
  }
  PlayGridAnim(t, e = !1) {
    this.tqo
      ? (this.GridPreserver.NotifyAnimationStart(), this.tqo.Play("", t, e))
      : this.GridPreserver.GetGridAnimationInterval() <= 0 &&
          this.GridPreserver.GetGridAnimationStartTime() <= 0
        ? this.GridPreserver.NotifyAnimationEnd()
        : (this.oqo(), this.il());
  }
  Clear() {
    this.tqo
      ? (this.tqo.OnFinish.Unbind(), this.GridPreserver.NotifyAnimationEnd())
      : (this.GridPreserver.GetGridAnimationInterval() <= 0 &&
          this.GridPreserver.GetGridAnimationStartTime() <= 0) ||
        this.oqo();
  }
  RegisterAnimController() {
    (this.tqo = this.GridPreserver.GetUiAnimController()),
      this.tqo &&
        (this.tqo.SetTickableWhenPaused(!0), this.tqo.OnFinish.Bind(this.Zmt));
  }
  oqo() {
    this.GridPreserver.NotifyAnimationEnd(),
      this.RemoveTimer(),
      this.OnInterrupt();
  }
  il() {
    (this.DisplayGridNum = this.GridPreserver.GetDisplayGridNum()),
      this.rqo(),
      this.OnStart();
  }
  OnStart() {}
  OnUpdate(t) {}
  GridsForEach(e) {
    var i = this.GridPreserver.GetPreservedGridNum() - 1;
    for (let t = 0; t <= i; t++) {
      var r = this.GridPreserver.GetGridByDisplayIndex(t);
      e(t, r);
    }
  }
  End() {
    this.RemoveTimer(), this.OnEnd();
  }
  OnEnd() {}
  OnInterrupt() {
    for (const t of this.iqo.values()) t.StopSequenceByKey("Start"), t.Clear();
    this.iqo.clear();
  }
  ShowGrid(t, e) {
    t.SetUIActive(!0);
    let i = this.iqo.get(t);
    i ||
      ((i = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      this.iqo.set(t, i)),
      i.StopSequenceByKey("Start"),
      i.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnShowGridAnimation,
        e,
        t,
      );
  }
  rqo() {
    this.Xje === TickSystem_1.TickSystem.InvalidId &&
      (this.Xje = TickSystem_1.TickSystem.Add(
        this.Tick,
        "GridAppearAnimation",
        0,
        !0,
      ).Id);
  }
  RemoveTimer() {
    this.Xje !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.Xje),
      (this.Xje = TickSystem_1.TickSystem.InvalidId));
  }
}
exports.GridAppearAnimationBase = GridAppearAnimationBase;
//# sourceMappingURL=GridAppearAnimationBase.js.map
