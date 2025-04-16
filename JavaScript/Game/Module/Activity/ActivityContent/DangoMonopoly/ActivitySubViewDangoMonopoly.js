"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewDangoMonopoly = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
class ActivitySubViewDangoMonopoly extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.CommonInfoPanel = void 0),
      (this.OnBtnDice = () => {
        this.ActivityBaseData.OpenViewDiceTask();
      }),
      (this.Jk_ = () => {
        this.ActivityBaseData.RequestEnterDangoMonopoly();
      }),
      (this.oS1 = () => {
        var e = this.ActivityBaseData.GetExDataRedPointShowState();
        this.CommonInfoPanel?.SetFunctionRedDotVisible(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.OnBtnDice]]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.CommonInfoPanel =
        new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
      this.CommonInfoPanel.SetData(this.ActivityBaseData),
      this.CommonInfoPanel.SetClickFunc(this.Jk_);
    var e = this.GetItem(0).GetOwner();
    await this.CommonInfoPanel.CreateThenShowByActorAsync(e),
      this.CommonInfoPanel.SetBtnText(
        DangoMonopolyDefine_1.dangoMonopolyTextKey.ActivityGoTo,
      );
  }
  OnStart() {}
  OnAddEventListener() {
    RedDotController_1.RedDotController.BindRedDot(
      "DangoMonopolyTask",
      this.GetItem(2),
      this.oS1,
    );
  }
  OnRemoveEventListener() {
    RedDotController_1.RedDotController.UnBindRedDot("DangoMonopolyTask");
  }
  OnRefreshView() {
    var e = this.ActivityBaseData.IsUnLock(),
      t = this.GetDiceShowState(),
      i = t ? [this.ActivityBaseData.DiceItemId] : [];
    this.GetItem(5).SetUIActive(e),
      this.GetItem(6).SetUIActive(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetActivityViewCurrency,
        i,
      ),
      e &&
        ((t = this.ActivityBaseData.GetCurrentBoardPosition()),
        (i = this.ActivityBaseData.GetTotalRoundNum()),
        this.GetText(3).SetText(t.toString()),
        this.GetText(4).SetText("/" + i)),
      this.oS1(),
      this.UpdateRoundRewardInfo(),
      this.UpdateBoardLockRemainTime();
  }
  GetDiceShowState() {
    return (
      !!this.ActivityBaseData.IsUnLock() &&
      !this.ActivityBaseData.IsFinishAllRound()
    );
  }
  UpdateRoundRewardInfo() {
    var e;
    this.ActivityBaseData.IsAllGetRoundReward() &&
      ((e =
        this.CommonInfoPanel?.GetFunctional())?.SetActivatePanelConditionVisible(
        !0,
      ),
      e?.SetActivateTextByTextId(
        DangoMonopolyDefine_1.dangoMonopolyTextKey.AllGetRoundReward,
      ));
  }
  UpdateBoardLockRemainTime() {
    var e;
    this.ActivityBaseData.IsRunningBoardLock() &&
      ((e = this.CommonInfoPanel?.GetFunctional())?.SetPanelConditionVisible(
        !0,
      ),
      e?.SetLockTextByText(this.ActivityBaseData.GetBoardRemainTimeStr()));
  }
  OnTimer() {
    this.UpdateBoardLockRemainTime();
  }
}
exports.ActivitySubViewDangoMonopoly = ActivitySubViewDangoMonopoly;
//# sourceMappingURL=ActivitySubViewDangoMonopoly.js.map
