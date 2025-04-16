"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueSettleView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ActivityCorniceMeetingSettleView_1 = require("../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingSettleView"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeeklyRogueSettleInfoPanel_1 = require("../Components/WeeklyRogueSettleInfoPanel"),
  LEAVETIME = 30;
class WeeklyRogueSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ButtonMap = void 0),
      (this.$Fe = void 0),
      (this.Data = void 0),
      (this.InfoPanel = void 0),
      (this.zFe = () => {
        this.CloseMe((e) => {
          e &&
            ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        });
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [20, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Data = this.OpenParam),
      (this.ButtonMap = new Map()),
      (this.InfoPanel =
        new WeeklyRogueSettleInfoPanel_1.WeeklyRogueSettleInfoPanel()),
      await Promise.all([
        this.ZFe(),
        this.InfoPanel.CreateThenShowByResourceIdAsync(
          "UiItem_ResultScoreB",
          this.GetItem(20),
        ),
      ]),
      this.InfoPanel.UpdateData(this.Data);
  }
  OnBeforeShow() {
    this.e3e(), this.RefreshTitle();
  }
  OnBeforeDestroy() {
    this.o3e();
  }
  RefreshTitle() {
    var e;
    void 0 !== this.Data &&
      ((e = this.GetText(1)),
      this.GetTexture(2)?.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_ChallengeFinish_Text"),
      this.PlaySequence("Success"));
  }
  o3e() {
    TimerSystem_1.TimerSystem.Has(this.$Fe) &&
      TimerSystem_1.TimerSystem.Remove(this.$Fe),
      (this.$Fe = void 0);
  }
  e3e() {
    let e = LEAVETIME + 1;
    this.$Fe = TimerSystem_1.TimerSystem.Forever(() => {
      e <= 0
        ? (TimerSystem_1.TimerSystem.Remove(this.$Fe), this.zFe())
        : this.ButtonMap.get(0).SetFloatText(
            "InstanceDungeonLeftTimeToAutoLeave",
            (e--).toString(),
          );
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(!1),
      await this.i3e(this.GetItem(5), 0, this.zFe);
    var e = this.ButtonMap.get(0);
    e.SetBtnText("Leave"),
      e.SetFloatText(
        "InstanceDungeonLeftTimeToAutoLeave",
        LEAVETIME.toString(),
      );
  }
  async i3e(e, t, i) {
    var s = this.GetItem(5),
      r = this.GetItem(4),
      s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r),
      r = new ActivityCorniceMeetingSettleView_1.ActivityCorniceMeetingButton();
    this.ButtonMap.set(t, r), await r.InitializeAsync(s, i), r.SetActive(!0);
  }
}
exports.WeeklyRogueSettleView = WeeklyRogueSettleView;
//# sourceMappingURL=WeeklyRogueSettleView.js.map
