"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineChallengeApplyView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
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
      (this.gIa = !1),
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
      (this.EWs = () => {
        var e;
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? ((this.SNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
            this.INi())
          : ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
              "match_confirm_time_out_seconds",
            )),
            (this.SNi = e),
            this.TNi());
      }),
      (this.M2r = () => {
        this.CloseMe();
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
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIText],
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
      this.EWs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.M2r,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshSuggestChallengePlayerInfo,
      this.EWs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.M2r,
      );
  }
  OnTick(e) {
    this.gIa ||
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
          (this.gIa = !0))
        : (this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
          this.pNi.SetFillAmount(this.SNi / this.yNi)));
  }
  INi() {
    var e = this.GetItem(3),
      t = this.GetItem(4),
      i = this.GetText(7),
      e =
        (e.SetUIActive(!0),
        t.SetUIActive(!1),
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
            ? LguiUtil_1.LguiUtil.SetLocalText(i, "SuggestChallengeAgain")
            : LguiUtil_1.LguiUtil.SetLocalText(i, "InviteChallengeAgain")
          : ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
            ? LguiUtil_1.LguiUtil.SetLocalText(i, "SuggestContinueChallenge")
            : LguiUtil_1.LguiUtil.SetLocalText(i, "InviteContinueChallenge"),
        ModelManager_1.ModelManager.OnlineModel.ChallengeApplyPlayerId),
      t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e);
    t
      ? (this.GetText(1).SetText(t.Name),
        this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
        this.pNi.SetFillAmount(this.SNi / this.yNi),
        (i = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(
          t.HeadId,
          !1,
        )) &&
          this.SetTextureByPath(i.GetRoleHeadIconCircle(), this.GetTexture(0)),
        this.Nxa(t.PlayerDetails.Qxa, t.PlayerDetails.Jxa),
        this.sPa(t.PlayerDetails.Qxa))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", [
          "playerId：",
          e,
        ]);
  }
  Nxa(e, t) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((t = void 0 !== t && "" !== t),
        this.GetItem(16)?.SetUIActive(t),
        t && ((t = e ?? ""), this.GetText(17)?.SetText(t)))
      : this.GetItem(16)?.SetUIActive(!1);
  }
  sPa(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((e = void 0 !== e && "" !== e), this.GetItem(15)?.SetUIActive(!e))
      : this.GetItem(15)?.SetUIActive(!1);
  }
  TNi() {
    var e = this.GetItem(3),
      t = this.GetItem(4),
      e = (e.SetUIActive(!0), t.SetUIActive(!1), this.GetText(1)),
      t =
        (LguiUtil_1.LguiUtil.SetLocalText(e, "TeamLeaderInviteToInstance"),
        this.GetText(7)),
      e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId(),
      e =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
            .MapName,
        ) ?? "",
      t = (t.SetText(e), ModelManager_1.ModelManager.OnlineModel.OwnerId),
      e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t);
    e
      ? (this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
        this.pNi.SetFillAmount(this.SNi / this.yNi),
        (e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(
          e.HeadId,
          !1,
        )) &&
          this.SetTextureByPath(e.GetRoleHeadIconCircle(), this.GetTexture(0)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", [
          "playerId：",
          t,
        ]),
      this.GetItem(16)?.SetUIActive(!1),
      this.GetItem(15)?.SetUIActive(!1);
  }
}
exports.OnlineChallengeApplyView = OnlineChallengeApplyView;
//# sourceMappingURL=OnlineChallengeApplyView.js.map
