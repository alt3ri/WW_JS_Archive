"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillConfigLongPressItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  BattleSkillInputHandler_1 = require("./BattleSkillInputHandler");
class BattleSkillConfigLongPressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.HIt = void 0),
      (this.TargetActive = !1),
      (this.hvl = void 0),
      (this.IO = void 0),
      (this.r1t = 0),
      (this.ae = 0),
      (this.UOt = !0),
      (this.uvl = (t) => {
        this.IO === t &&
          (this.r1t <= 0
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                17,
                "技能按钮长按提示播放失败, 长按时间不合法",
                ["duration", this.r1t],
              )
            : this.cvl());
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
      this.SetComponentActive(this.TargetActive),
      (this.HIt = new BattleSkillInputHandler_1.BattleSkillInputHandler()),
      this.HIt.InitCallback(this.uvl, this.mvl),
      this.IO && this.HIt.SetActionType(this.IO);
  }
  OnBeforeShow() {
    this.HIt &&
      ControllerHolder_1.ControllerHolder.InputController.AddInputHandler(
        this.HIt,
      );
  }
  OnAfterHide() {
    this.HIt &&
      ControllerHolder_1.ControllerHolder.InputController.RemoveInputHandler(
        this.HIt,
      );
  }
  SetComponentActive(t) {
    (this.TargetActive === t && !this.UOt) ||
      ((this.TargetActive = t), this.InAsyncLoading()) ||
      ((this.UOt = !1), this.SetActive(t), this.hvl?.SetFillAmount(0));
  }
  SetAction(t) {
    this.IO !== t &&
      ((this.IO = t),
      this.HIt?.SetActionType(t),
      this.dvl(),
      this.hvl?.SetFillAmount(0));
  }
  SetDuration(t) {
    this.r1t = t * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  cvl() {
    this.ae = Time_1.Time.WorldTime;
  }
  dvl() {
    this.ae = 0;
  }
  Tick(t) {
    var i;
    this.ae <= 0 ||
      this.r1t <= 0 ||
      ((i = Time_1.Time.WorldTime - this.ae),
      (i = Math.min(1, i / this.r1t)),
      this.hvl?.SetFillAmount(i),
      1 === i && this.dvl());
  }
}
exports.BattleSkillConfigLongPressItem = BattleSkillConfigLongPressItem;
//# sourceMappingURL=BattleSkillConfigLongPressItem.js.map
