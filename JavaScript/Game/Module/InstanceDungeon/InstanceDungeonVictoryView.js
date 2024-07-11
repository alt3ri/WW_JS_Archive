"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonVictoryView = void 0);
const ue_1 = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const CommonResultButtonData_1 = require("../Common/ResultView/CommonResultButtonData");
const CommonResultView_1 = require("../Common/ResultView/CommonResultView");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const OnlineController_1 = require("../Online/OnlineController");
const OnlineModel_1 = require("../Online/OnlineModel");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonVictoryView extends CommonResultView_1.CommonResultView {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.Xli = new Map()),
      (this.sOe = void 0),
      (this.q2e = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
          () => {
            UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
          },
        );
      }),
      (this.nli = () => {
        let e, n;
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ModelManager_1.ModelManager.OnlineModel.AllowInitiate
            ? ((e = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()),
              (n =
                ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime) >
              0
                ? e
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "NextInviteTime",
                      TimeUtil_1.TimeUtil.GetCoolDown(n),
                    )
                  : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "NextSuggestTime",
                      TimeUtil_1.TimeUtil.GetCoolDown(n),
                    )
                : ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
                      ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
                    ) !== 2 && e
                  ? OnlineController_1.OnlineController.InviteRechallengeRequest()
                  : OnlineController_1.OnlineController.ApplyRechallengeRequest(
                      Protocol_1.Aki.Protocol.h3s.Proto_Settle,
                    ))
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "CannotInvite",
              )
          : InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
              () => {
                UiManager_1.UiManager.IsViewShow(this.Info.Name) &&
                  this.CloseMe();
              },
            );
      }),
      (this.$li = (e, n) => {
        e = this.Xli.get(e);
        e && this.Yli(n, e);
      });
  }
  get Khi() {
    return this.NUe
      ? ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe)
      : void 0;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    (this.NUe =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
      super.OnStart(),
      UiManager_1.UiManager.IsViewShow("ReviveView") &&
        UiManager_1.UiManager.CloseView("ReviveView"),
      ModelManager_1.ModelManager.GameModeModel.IsMulti && this.Jli();
  }
  zli() {
    const e = new Array();
    return e.push(this.Zli()), e.push(this.e1i()), e;
  }
  Zli() {
    const e = new CommonResultButtonData_1.CommonResultButtonData();
    return (
      e.SetRefreshCallBack((e) => {
        e.SetBtnText("ButtonTextExit");
        const n = this.Khi.AutoLeaveTime;
        e.SetFloatTextWithTimer(n, !0, "InstanceDungeonLeftTimeToAutoLeave");
      }),
      e.SetClickCallBack(this.q2e),
      e
    );
  }
  e1i() {
    const e = new CommonResultButtonData_1.CommonResultButtonData();
    return (
      e.SetRefreshCallBack((e) => {
        e.SetBtnText("ButtonTextRetry"),
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
              ? e.SetBtnText("ContinueChallenge")
              : e.SetBtnText("SuggestContinueChallenge")),
          this.t1i(e);
      }),
      e.SetClickCallBack(this.nli),
      e
    );
  }
  t1i(e) {
    let n;
    const t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
        this.NUe,
      );
    !t ||
      t <= 0 ||
      ((n = ModelManager_1.ModelManager.PowerModel.PowerCount),
      e.SetTipsItem(ItemDefines_1.EItemId.Power, n.toString()),
      t <= n
        ? e.SetTipsItemTextColor(InstanceDungeonVictoryView.i1i)
        : e.SetTipsItemTextColor(InstanceDungeonVictoryView.o1i));
  }
  OnAfterShow() {
    this.qIt();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemHintModel.CleanItemRewardList(),
      this.Xli && this.Xli.clear();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlayerChallengeStateChange,
      this.$li,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlayerChallengeStateChange,
      this.$li,
    );
  }
  qIt() {
    this.Yhi();
  }
  Yhi() {
    (this.sOe =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SettleRewardItemList),
      this.RewardLayout.RebuildLayoutByDataNew(this.sOe);
  }
  SetupButtonFormat() {
    const e = this.zli();
    this.RefreshButtonList(e);
  }
  Jli() {
    const e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    if (e.length <= 1) this.GetItem(5).SetUIActive(!1);
    else {
      this.GetItem(5).SetUIActive(!0);
      const n = this.GetSprite(6);
      const t = this.GetSprite(7);
      const r =
        (n.SetUIActive(!1),
        t.SetUIActive(!1),
        ModelManager_1.ModelManager.PlayerInfoModel.GetId());
      for (const a of e) {
        var i;
        const o = a.GetPlayerId();
        o !== r &&
          ((i =
            ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
              o,
            )),
          n.bIsUIActive
            ? t.bIsUIActive ||
              (t.SetUIActive(!0), this.Yli(i, t), this.Xli.set(o, t))
            : (n.SetUIActive(!0), this.Yli(i, n), this.Xli.set(o, n)));
      }
    }
  }
  Yli(e, n) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      OnlineModel_1.onlineContinuingChallengeIcon[e],
    );
    StringUtils_1.StringUtils.IsEmpty(e) || this.SetSpriteByPath(e, n, !1);
  }
}
((exports.InstanceDungeonVictoryView = InstanceDungeonVictoryView).o1i =
  new ue_1.Color(246, 93, 88, 255)),
  (InstanceDungeonVictoryView.i1i = new ue_1.Color(255, 255, 255, 255));
// # sourceMappingURL=InstanceDungeonVictoryView.js.map
