"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillLongPressItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillLongPressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.TargetActive = !1),
      (this.hvl = void 0),
      (this._vl = !1),
      (this.IO = void 0),
      (this.r1t = 0),
      (this.j3 = void 0),
      (this.ae = 0),
      (this.UOt = !0),
      (this.uvl = (t) => {
        this.IO === t &&
          (this.r1t <= 0
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "技能按钮长按提示播放失败, 长按时间不合法",
                ["duration", this.r1t],
              )
            : this.StartProgress());
      }),
      (this.mvl = (t) => {
        this.IO === t && (this.dvl(), this.hvl?.SetFillAmount(0));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    (this.hvl = this.GetTexture(0)),
      this.hvl?.SetFillAmount(0),
      this.SetComponentActive(this.TargetActive);
  }
  OnBeforeShow() {
    this.yWe();
  }
  OnAfterHide() {
    this.Nmt(), this.jm();
  }
  OnBeforeDestroy() {
    this.Nmt(), this.jm();
  }
  yWe() {
    this._vl ||
      ((this._vl = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SkillLongPressStart,
        this.uvl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SkillLongPressEnd,
        this.mvl,
      ));
  }
  Nmt() {
    this._vl &&
      ((this._vl = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SkillLongPressStart,
        this.uvl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SkillLongPressEnd,
        this.mvl,
      ));
  }
  jm() {
    this.j3 && (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
  }
  SetComponentActive(t) {
    (this.TargetActive === t && !this.UOt) ||
      ((this.TargetActive = t), this.InAsyncLoading()) ||
      ((this.UOt = !1), this.SetActive(t), this.hvl?.SetFillAmount(0));
  }
  SetAction(t) {
    this.IO = t;
  }
  SetDuration(t) {
    this.r1t = t * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  StartProgress() {
    this.jm(), (this.ae = Time_1.Time.WorldTime);
    var t = TimerSystem_1.MIN_TIME;
    this.j3 = TimerSystem_1.TimerSystem.Forever(() => {
      var t = Time_1.Time.WorldTime - this.ae,
        t = Math.min(1, t / this.r1t);
      this.hvl?.SetFillAmount(t), 1 === t && this.dvl();
    }, t);
  }
  dvl() {
    this.jm();
  }
}
exports.BattleSkillLongPressItem = BattleSkillLongPressItem;
//# sourceMappingURL=BattleSkillLongPressItem.js.map
