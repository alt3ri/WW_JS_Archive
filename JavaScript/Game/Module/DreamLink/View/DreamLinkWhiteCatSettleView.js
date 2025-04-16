"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkWhiteCatSettleRecordItem =
    exports.DreamLinkWhiteCatSettleItem =
    exports.DreamLinkWhiteCatSettlePanel =
    exports.DreamLinkWhiteCatSettleView =
      void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ActivityCorniceMeetingSettleView_1 = require("../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingSettleView"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  LEAVETIME = 30;
class DreamLinkWhiteCatSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ButtonMap = void 0),
      (this.$Fe = void 0),
      (this.Data = void 0),
      (this.RewardExploreTargetReachedList = void 0),
      (this.JFe = () => {
        this.CloseMe((e) => {
          e &&
            ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
        });
      }),
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
      await this.ZFe();
    var e = this.GetItem(20);
    (this.RewardExploreTargetReachedList = new DreamLinkWhiteCatSettlePanel()),
      (this.RewardExploreTargetReachedList.Data = this.Data),
      await this.RewardExploreTargetReachedList.CreateThenShowByResourceIdAsync(
        "UiItem_ResultScore",
        e,
      );
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
    this.GetItem(5)?.SetUIActive(!1);
    var e = this.i3e(this.GetItem(5), 0, this.zFe),
      t = this.i3e(this.GetItem(5), 1, this.JFe),
      e = (await Promise.all([e, t]), this.ButtonMap.get(0)),
      t = this.ButtonMap.get(1);
    e.SetBtnText("Leave"),
      e.SetFloatText(
        "InstanceDungeonLeftTimeToAutoLeave",
        LEAVETIME.toString(),
      ),
      t.SetBtnText("ChallengeAgain");
  }
  async i3e(e, t, i) {
    var s = this.GetItem(5),
      r = this.GetItem(4),
      s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r),
      r = new ActivityCorniceMeetingSettleView_1.ActivityCorniceMeetingButton();
    this.ButtonMap.set(t, r), await r.InitializeAsync(s, i), r.SetActive(!0);
  }
}
exports.DreamLinkWhiteCatSettleView = DreamLinkWhiteCatSettleView;
class DreamLinkWhiteCatSettlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Layout = void 0),
      (this.RecordPanel = void 0),
      (this.Data = void 0),
      (this.OnCreateItem = () => {
        return new DreamLinkWhiteCatSettleItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [];
    0 <= this.Data.vM_ &&
      e.push({
        Title: "DreamLinkWhiteCatSettleView_LifeScore",
        Score: this.Data.vM_.toString(),
        IsReached: !1,
      }),
      0 <= this.Data.pM_ &&
        e.push({
          Title: "DreamLinkWhiteCatSettleView_TimeScore",
          Score: this.Data.pM_.toString(),
          IsReached: !1,
        }),
      0 <= this.Data.yM_ &&
        e.push({
          Title: "DreamLinkWhiteCatSettleView_StepScore",
          Score: this.Data.yM_.toString(),
          IsReached: !1,
        }),
      e.push({
        Title: "DreamLinkWhiteCatSettleView_PassTime",
        Score: TimeUtil_1.TimeUtil.GetTimeString(this.Data.fAs),
        IsReached: !1,
      }),
      (this.Layout = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.OnCreateItem,
      )),
      await this.Layout.RefreshByDataAsync(e),
      (this.RecordPanel = new DreamLinkWhiteCatSettleRecordItem()),
      (this.RecordPanel.Data = {
        Title: "DreamLinkWhiteCatSettlePanel_RecordTitle",
        Score: this.Data.Yma.toString(),
        IsNew: this.Data.Yxs,
      }),
      await this.RecordPanel.CreateThenShowByActorAsync(
        this.GetItem(1).GetOwner(),
      );
  }
}
exports.DreamLinkWhiteCatSettlePanel = DreamLinkWhiteCatSettlePanel;
class DreamLinkWhiteCatSettleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
      this.GetText(2).SetText(e.Score);
  }
}
exports.DreamLinkWhiteCatSettleItem = DreamLinkWhiteCatSettleItem;
class DreamLinkWhiteCatSettleRecordItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  OnBeforeShow() {
    void 0 !== this.Data &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Data.Title),
      this.GetText(1).SetText(this.Data.Score),
      this.GetItem(2).SetUIActive(this.Data.IsNew));
  }
}
exports.DreamLinkWhiteCatSettleRecordItem = DreamLinkWhiteCatSettleRecordItem;
//# sourceMappingURL=DreamLinkWhiteCatSettleView.js.map
