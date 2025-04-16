"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueActivityView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  PowerController_1 = require("../../Power/PowerController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeekyRogueScoreItem_1 = require("../Components/WeekyRogueScoreItem"),
  WeeklyRogueController_1 = require("../WeeklyRogueController");
class WeeklyRogueActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.UNe = void 0),
      (this.lqe = void 0),
      (this.eel = void 0),
      (this.j3 = void 0),
      (this.pSc = () => {
        var e = () => {
            this.CloseMe();
          },
          i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(278);
        i.FunctionMap.set(1, e),
          i.FunctionMap.set(0, e),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.Qho = () => {
        var e,
          i =
            ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData
              .LastInstInfo;
        i && 0 !== i.r6n
          ? (((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              135,
            )).IsEscViewTriggerCallBack = !1),
            e.SetTextArgs(i.iqs.toString(), i.rqs.toString()),
            e.FunctionMap.set(1, () => {
              WeeklyRogueController_1.WeeklyRogueController.Instance.InstanceSettleRequest(),
                (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.LastInstInfo =
                  void 0),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
            }),
            e.FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()
                ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "TrialRoleDungeonsLimit",
                  )
                : WeeklyRogueController_1.WeeklyRogueController.Instance.RogueWeeklyStartRequest(
                    [],
                  );
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))
          : ((i =
              ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig()),
            ControllerHolder_1.ControllerHolder.EditBattleTeamController.OpenEditBattleTeamView(
              i.InstId,
            ));
      }),
      (this.oV_ = () => {
        var e =
          ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          e.BlackFlowerHelpId,
        );
      }),
      (this.SY_ = () => {
        var e =
          ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          e.HelpId,
        );
      }),
      (this.fH_ = () => {
        UiManager_1.UiManager.OpenView("WeeklyRogueEnvironmentTips");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [6, this.Qho],
        [10, this.oV_],
        [9, this.fH_],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.UNe = new ActivityRewardList_1.ActivityRewardList()),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      (this.eel = new WeekyRogueScoreItem_1.WeeklyRogueScoreItem()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetHelpCallBack(this.SY_);
    var e =
      ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.CycleName),
      this.GetText(11).SetText(
        ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleBlackFlowerCost().toString(),
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetTitle(),
      ),
      await Promise.all([
        this.UNe.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
        this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        this.eel.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
        this.SetTextureAsync(e.ViewBackground, this.GetTexture(8)),
        WeeklyRogueController_1.WeeklyRogueController.Instance?.RogueWeeklyLastInfoRequest(),
      ]),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
          e.BlackFlowerAward,
          ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.WorldLevel,
        ),
      ),
      await this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Power]),
      this.lqe.SetCurrencyItemBtnFunction(ItemDefines_1.EItemId.Power, () => {
        PowerController_1.PowerController.OpenPowerView();
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeeklyRogueCycleRefresh,
      this.pSc,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeeklyRogueCycleRefresh,
      this.pSc,
    );
  }
  OnBeforeShow() {
    this.u3e(), this.tGo();
  }
  OnBeforeHide() {
    this.cG();
  }
  u3e() {
    var e =
      ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleCountDownData();
    this.GetText(3).SetText(e.CountDownText);
  }
  tGo() {
    this.j3 && (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0)),
      (this.j3 = TimerSystem_1.TimerSystem.Forever(() => {
        this.u3e();
      }, CommonDefine_1.MILLIONSECOND_PER_SECOND));
  }
  cG() {
    this.j3 && (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
  }
}
exports.WeeklyRogueActivityView = WeeklyRogueActivityView;
//# sourceMappingURL=WeeklyRogueActivityView.js.map
