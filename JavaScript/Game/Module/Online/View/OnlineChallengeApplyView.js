"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineChallengeApplyView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  OnlineController_1 = require("../OnlineController");
class OnlineChallengeApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.SNi = -1),
      (this.yNi = -1),
      (this.XFt = void 0),
      (this.pNi = void 0),
      (this.YMa = !1),
      (this.MNi = () => {
        if (
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ) {
          if (
            0 ===
              ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
                ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
              ) &&
            ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
          )
            return void OnlineController_1.OnlineController.InviteRechallengeRequest();
          OnlineController_1.OnlineController.ReceiveRechallengeRequest(!0, !1);
        } else
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(
            !0,
            !1,
          );
        this.CloseMe();
      }),
      (this.uHe = () => {
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? OnlineController_1.OnlineController.ReceiveRechallengeRequest(
              !1,
              !0,
            )
          : InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(
              !1,
              !0,
            ),
          this.CloseMe();
      }),
      (this.eWs = () => {
        var e;
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? ((this.SNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
            this.INi())
          : ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
              "match_confirm_time_out_seconds",
            )),
            (this.SNi = e),
            this.TNi());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.MNi],
        [8, this.uHe],
      ]);
  }
  OnStart() {
    var e;
    this.GetButton(8).GetRootComponent().SetUIActive(!0),
      (this.XFt = this.GetText(5)),
      (this.pNi = this.GetSprite(6)),
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ? ((this.SNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
          (this.yNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
          this.INi())
        : ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
            "match_confirm_time_out_seconds",
          )),
          (this.SNi = e),
          (this.yNi = e),
          this.TNi());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshSuggestChallengePlayerInfo,
      this.eWs,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshSuggestChallengePlayerInfo,
      this.eWs,
    );
  }
  OnTick(e) {
    this.YMa ||
      ((this.SNi -= e * TimeUtil_1.TimeUtil.Millisecond),
      this.SNi <= 0
        ? (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
            ? OnlineController_1.OnlineController.ReceiveRechallengeRequest(
                !1,
                !1,
              )
            : InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(
                !1,
                !1,
              ),
          this.CloseMe(),
          (this.YMa = !0))
        : (this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
          this.pNi.SetFillAmount(this.SNi / this.yNi)));
  }
  INi() {
    var e = this.GetItem(3),
      i = this.GetItem(4),
      n = this.GetText(7),
      e =
        (e.SetUIActive(!0),
        i.SetUIActive(!1),
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
            ? LguiUtil_1.LguiUtil.SetLocalText(n, "SuggestChallengeAgain")
            : LguiUtil_1.LguiUtil.SetLocalText(n, "InviteChallengeAgain")
          : ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
            ? LguiUtil_1.LguiUtil.SetLocalText(n, "SuggestContinueChallenge")
            : LguiUtil_1.LguiUtil.SetLocalText(n, "InviteContinueChallenge"),
        ModelManager_1.ModelManager.OnlineModel.ChallengeApplyPlayerId),
      i = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e);
    i
      ? (this.GetText(1).SetText(i.Name),
        this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
        this.pNi.SetFillAmount(this.SNi / this.yNi),
        (n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          i.HeadId,
        )?.Card) && this.SetTextureByPath(n, this.GetTexture(0)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", [
          "playerId：",
          e,
        ]);
  }
  TNi() {
    var e = this.GetItem(3),
      i = this.GetItem(4),
      e = (e.SetUIActive(!0), i.SetUIActive(!1), this.GetText(1)),
      i =
        (LguiUtil_1.LguiUtil.SetLocalText(e, "TeamLeaderInviteToInstance"),
        this.GetText(7)),
      e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId(),
      e =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
            .MapName,
        ) ?? "",
      i = (i.SetText(e), ModelManager_1.ModelManager.OnlineModel.OwnerId),
      e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(i);
    e
      ? (this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
        this.pNi.SetFillAmount(this.SNi / this.yNi),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          e.HeadId,
        )?.Card) && this.SetTextureByPath(e, this.GetTexture(0)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", [
          "playerId：",
          i,
        ]);
  }
}
exports.OnlineChallengeApplyView = OnlineChallengeApplyView;
//# sourceMappingURL=OnlineChallengeApplyView.js.map
