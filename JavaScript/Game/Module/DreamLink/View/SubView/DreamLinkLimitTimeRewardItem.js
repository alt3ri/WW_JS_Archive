"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkLimitTimeRewardItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CHECKGAP = 1e3;
class DreamLinkLimitTimeRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.Data = i),
      (this.Ntl = !1),
      (this.Ftl = "{0}"),
      (this.TTn = void 0),
      (this.Vtl = () => {
        var i = this.Data.GetLimitTimeEndTime();
        i - TimeUtil_1.TimeUtil.GetServerTime() <= 0
          ? this.RefreshActive()
          : ((i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
              i,
              this.Ftl,
            )),
            this.GetText(1).SetText(i));
      }),
      (this.UFe = () => {
        this.Ntl &&
          (this.Data.SaveFirstCheckRedDotState(4),
          UiManager_1.UiManager.OpenView("DreamLinkRewardViewLimit"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.UFe]]);
  }
  OnBeforeHide() {
    this.jm();
  }
  RefreshActive() {
    (this.Ntl = this.Data.IsLimitTimeRewardOn()),
      this.SetActive(this.Ntl),
      this.Ntl ? (this.Vtl(), this.BNe(), this.P3e()) : this.jm();
  }
  BNe() {
    this.GetItem(2).SetUIActive(this.Data.CheckHasLimitTimeReward());
  }
  P3e() {
    this.jm(),
      (this.TTn = TimerSystem_1.TimerSystem.Forever(
        this.Vtl,
        CHECKGAP,
        void 0,
        void 0,
        void 0,
        !1,
      ));
  }
  jm() {
    void 0 !== this.TTn &&
      (TimerSystem_1.TimerSystem.Remove(this.TTn), (this.TTn = void 0));
  }
}
exports.DreamLinkLimitTimeRewardItem = DreamLinkLimitTimeRewardItem;
//# sourceMappingURL=DreamLinkLimitTimeRewardItem.js.map
