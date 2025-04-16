"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditBattleTeamView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityManager_1 = require("../../Activity/ActivityManager"),
  BuffItemControl_1 = require("../../BuffItem/BuffItemControl"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  MiniElementItem_1 = require("../../Common/MiniElementItem"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle"),
  EditFormationTabItem_1 = require("../../Common/TabComponent/TabItem/EditFormationTabItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
  ExitSkillView_1 = require("../../EditFormation/View/ExitSkill/ExitSkillView"),
  FormationRoleView_1 = require("../../EditFormation/View/FormationRoleView"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  OnlineController_1 = require("../../Online/OnlineController"),
  QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView"),
  TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  SceneTeamDefine_1 = require("../../SceneTeam/SceneTeamDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  TowerController_1 = require("../../TowerDetailUi/TowerController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  EditBattleTeamController_1 = require("../EditBattleTeamController"),
  MAX_FORMATION_ID = 6;
class EditBattleTeamView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.l4t = []),
      (this._4t = []),
      (this.u4t = [25, 26, 27]),
      (this.c4t = 0),
      (this.Ivt = void 0),
      (this.SPe = void 0),
      (this.m4t = !1),
      (this.d4t = !1),
      (this.C4t = (e) => {
        this.g4t(), this.RefreshEnterButton(), this.f4t(), this.p4t();
      }),
      (this.v4t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        return !t.IsInEditBattleTeam(e) && t.CanAddRoleToEditTeam(e);
      }),
      (this.M4t = (e) => this.E4t(e)),
      (this.S4t = (e) => {
        var t, r, o, n;
        return this.E4t(e)
          ? (BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e), !1)
          : ((r = (t = ModelManager_1.ModelManager.EditBattleTeamModel)
              .GetCurrentEditRoleSlotData),
            (o = this.K4t((e = e))),
            (n = t.GetParentRolePositionInEditBattleTeam(e)),
            2 !== o && -1 !== n && n !== r.GetPosition
              ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "SameRole",
                ),
                !1)
              : !(
                  t.IsMultiInstanceDungeon &&
                  r?.GetRoleConfigId === e &&
                  t.GetPlayerRoleNumber(r?.GetRoleData?.PlayerId) < 2 &&
                  (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "BattleTeamCanNotDownAllRole",
                  ),
                  1)
                ));
      }),
      (this.y4t = (e) => {
        this.RefreshEnterButton();
      }),
      (this.I4t = (e) => {
        this.RefreshEnterButton(), this.f4t(), this.T4t(e);
      }),
      (this.lze = (o) => {
        var n = o.TargetPlayerId;
        if (
          !ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(n) &&
          o.IsVisible
        ) {
          var i = 1 === o.ContentChatRoomType;
          let e = o.SenderPlayerName;
          i &&
            (n = ModelManager_1.ModelManager.FriendModel.GetFriendById(n)) &&
            (e = n.PlayerName),
            this.m4t ||
              (this.GetItem(9).SetUIActive(!0),
              this.SPe.PlayLevelSequenceByName("NoticeIn"),
              (this.m4t = !0)),
            this.SPe.PlayLevelSequenceByName("NewMassageIn");
          var n = this.GetText(10),
            a =
              ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
              o.SenderPlayerId;
          let t = void 0,
            r = o.Content;
          if (o.ContentType === Protocol_1.Aki.Protocol.p8n.DIs)
            t = i
              ? a
                ? "Text_TalkToFriend_Text"
                : "Text_FriendTalkToMe_Text"
              : "Text_TeamTalk_Text";
          else if (o.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
            var o = Number(o.Content),
              l =
                ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(o);
            if (!l)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Formation", 48, "表情缺少配置", ["表情Id", o])
              );
            LguiUtil_1.LguiUtil.SetLocalTextNew(n, l.Name),
              (r = n.GetText()),
              (t = i
                ? a
                  ? "Text_TalkToFriend_Text_Match"
                  : "Text_FriendTalkToMe_Text_Match"
                : "Text_TeamTalk_Text_Match");
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(n, t, e, r);
        }
      }),
      (this.fR1 = () => {
        this.f4t();
      }),
      (this.Ozs = () => {
        this.f4t();
      }),
      (this.L4t = () => {
        var e =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime;
        for (const t of this.l4t) t.SetMatchTime(e);
      }),
      (this.D4t = (e, t) => {
        this.RefreshEnterButton(), this.f4t();
      }),
      (this.R4t = (e) => {
        for (const t of this.l4t)
          ((t.GetPlayer() ?? -1) === e ||
            e ===
              ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
                .qVn) &&
            t.RefreshPrepareState();
      }),
      (this.U4t = () => {
        var e = ModelManager_1.ModelManager.EditBattleTeamModel,
          t = e.GetLeaderIsSelf,
          r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
          o = e.GetOwnRoleCountInRoleSlot;
        0 === o
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NoRole",
            )
          : e.IsInLimitRoleCount(o)
            ? e.IsMultiInstanceDungeon
              ? t
                ? ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                    .EditBattleTeamMatching
                  ? (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
                      !1,
                    ),
                    this.RefreshEnterButton(),
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SetMatchTeamMatchFlagRequest(
                      ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                        .EditBattleTeamMatching,
                    ))
                  : e.GetIsAllReady
                    ? !e.HasSameRole ||
                      TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() ||
                      ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState()
                      ? e.GetAllRoleCanAddToTeam().CanAdd
                        ? e.IsAllRoleDie
                          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                              "AllRoleDie",
                            )
                          : ModelManager_1.ModelManager.InstanceDungeonModel.MatchingPlayerCount() <=
                              2
                            ? ModelManager_1.ModelManager.EditBattleTeamModel
                                .IsMatchingTeamLackConfirmBoxCanEnterInstance
                              ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                                  102,
                                )).FunctionMap.set(2, () => {
                                  this.A4t();
                                }),
                                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                                  o,
                                ))
                              : ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                                  269,
                                )),
                                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                                  t,
                                ))
                            : this.A4t()
                        : ((o = e.GetCurrentFightFormation.Content),
                          (t =
                            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                              o,
                            )),
                          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                            t,
                          ))
                      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                          "SameRole",
                        )
                    : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "NoReady",
                      )
                : (o = e.GetSelfIsReady) ||
                    !e.HasSameRole ||
                    TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() ||
                    ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState()
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Formation",
                        48,
                        "[EditBattleTeam]玩家{PlayerId} 请求准备游戏,是否准备:{SelfIsReady}",
                        ["{PlayerId}", r],
                        ["{SelfIsReady}", !o],
                      ),
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeReadyRequest(
                      !o,
                    ))
                  : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "SameRole",
                    )
              : e.GetIsAllReady
                ? e.HasSameRole
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "SameRole",
                    )
                  : !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
                      e.IsAllRoleDie
                    ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "AllRoleDie",
                      )
                    : e.GetAllRoleCanAddToTeam().CanAdd
                      ? ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()
                        ? TowerController_1.TowerController.TowerStartRequest(
                            ModelManager_1.ModelManager.TowerModel
                              .CurrentSelectFloor,
                            ModelManager_1.ModelManager.EditBattleTeamModel
                              .GetOwnRoleConfigIdList[0],
                          )
                        : ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen()
                          ? ((t =
                              ActivityManager_1.ActivityManager.GetActivityController(
                                Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly,
                              )),
                            (r =
                              ModelManager_1.ModelManager.EditBattleTeamModel
                                .GetOwnRoleConfigIdList[0]),
                            t?.RogueWeeklyStartRequest(r))
                          : this.$oh()
                      : ((o = e.GetCurrentFightFormation.Content),
                        (t =
                          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                            o,
                          )),
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                          t,
                        ))
                : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "NoReady",
                  )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LimitCount",
              );
      }),
      (this.P4t = () => {
        this.g4t(),
          ModelManager_1.ModelManager.EditBattleTeamModel
            .IsMultiInstanceDungeon &&
            ModelManager_1.ModelManager.EditBattleTeamModel.GetLeaderPlayerId &&
            OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .EditBattleTeamMatching
                ? Protocol_1.Aki.Protocol.G5s.Proto_Matching
                : Protocol_1.Aki.Protocol.G5s.Proto_Wait,
            );
      }),
      (this.x4t = () => {
        var e,
          t = ModelManager_1.ModelManager.EditBattleTeamModel;
        if (t.IsMultiInstanceDungeon) {
          let e = 6;
          t.GetLeaderIsSelf && (e = 7);
          var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
          t.FunctionMap.set(2, () => {
            EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam();
          }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              t,
            );
        } else
          (t = ModelManager_1.ModelManager.TowerModel.CheckInTower()),
            (e = UiManager_1.UiManager.GetViewByName("TowerFloorView")),
            t &&
              !e &&
              ((t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
                ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
              )),
              UiManager_1.UiManager.OpenView("TowerFloorView", t.AreaNum)),
            EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam();
      }),
      (this.w4t = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
          !0,
        ),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SetMatchTeamMatchFlagRequest(
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel
              .EditBattleTeamMatching,
          );
      }),
      (this.B4t = () => {
        var e = TimeUtil_1.TimeUtil.GetServerTime();
        e - this.c4t > ModelManager_1.ModelManager.OnlineModel.ApplyCd
          ? (InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchInviteRequest(),
            (this.c4t = e),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "HaveMatched",
            ))
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "MatchingInviteCd",
            );
      }),
      (this.b4t = () => {
        ModelManager_1.ModelManager.EditBattleTeamModel.IsEditBattleTeamForMowingInstance()
          ? UiManager_1.UiManager.OpenView(
              "InstanceDungeonMonsterPreView",
              ModelManager_1.ModelManager.EditBattleTeamModel
                .GetInstanceDungeonId,
            )
          : UiManager_1.UiManager.OpenView("TowerFloorDetailView");
      }),
      (this.q4t = () => {
        TowerController_1.TowerController.TowerFormationRecommendRequest(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        ).finally(() => {
          UiManager_1.UiManager.OpenView("TowerRecommendView");
        });
      }),
      (this.G4t = () => {
        if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
          var e = ModelManager_1.ModelManager.EditBattleTeamModel,
            t = new Array(),
            r = e.GetAllRoleSlotData;
          if (r)
            for (const n of r) {
              var o = n.GetRoleData;
              o && t.push(o.ConfigId);
            }
          (r = e.GetRoleList()),
            (e = new QuickRoleSelectView_1.QuickRoleSelectViewData(
              this.GetUseWay(),
              t,
              r,
            ));
          (e.OnConfirm = this.N4t),
            (e.CanConfirm = this.M1a),
            (e.OnBack = this.O4t),
            (e.OnHideFinish = this.P4t),
            UiManager_1.UiManager.OpenView("QuickRoleSelectView", e),
            this.k4t(!1);
        }
      }),
      (this.N4t = (t) => {
        this.k4t(!0);
        var r = ModelManager_1.ModelManager.EditBattleTeamModel;
        for (const e of r.SelfRoleSlotDataRoleIdList)
          t.includes(e) ||
            ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(
              e,
            );
        for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var o,
            n = r.GetRoleSlotData(e);
          n.IsProhibit
            ? n.ResetRoleData()
            : e > t.length
              ? n.ResetRoleData()
              : ((o = t[e - 1]),
                (o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)),
                (o = r.CreateRoleDataFromRoleInstance(o)),
                n.SetRoleData(o));
        }
        this.f4t();
      }),
      (this.M1a = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        for (const o of e)
          if (t.IsTrialRole(o)) {
            var r =
              ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
                o,
              ).ParentId;
            for (const n of e)
              if (r === n)
                return (
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "SameRole",
                  ),
                  !1
                );
          }
        return !0;
      }),
      (this.F4t = () => {
        if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
          var e = new ExitSkillView_1.ExitSkillViewData();
          for (const n of this.l4t) {
            var t = n.GetConfigId(),
              r = n.GetOnlineIndex(),
              o = n.GetPlayer();
            e.AddData(t, r, o);
          }
          UiManager_1.UiManager.OpenView("ExitSkillView", e);
        }
      }),
      (this.V4t = () => {
        UiManager_1.UiManager.IsViewShow("ChatView") ||
          UiManager_1.UiManager.OpenView("ChatView");
      }),
      (this.H4t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        if (t.GetCurrentFightFormation.ChooseRole) {
          t.SetCurrentEditPosition(e);
          var r,
            o = t.GetRoleSlotData(e);
          if (o) {
            const n = o?.GetRoleData;
            if (n) {
              if (
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .IsMultiInstanceDungeon &&
                ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() &&
                !n.IsSelf
              )
                return (
                  (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    101,
                  )).FunctionMap.set(2, () => {
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.KickMatchTeamPlayerRequest(
                      n.PlayerId,
                    );
                  }),
                  void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    r,
                  )
                );
              if (!o.CanEditRoleSlot)
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "BattleTeamNotMyRole",
                );
              if (!t.GetLeaderIsSelf && n?.IsReady)
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "BattleTeamReadyRole",
                );
            } else {
              if (
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .IsMultiInstanceDungeon &&
                !ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()
              )
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "BattleTeamNotMyRole",
                );
              if (o.IsProhibit)
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "BattleTeamPositionCanNotEdit",
                );
            }
            this.j4t(e), this.k4t(!1);
          }
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "NoChangeRole",
          );
      }),
      (this.W4t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel,
          r = t.GetCurrentEditRoleSlotData.GetRoleData;
        if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
          return !1;
        switch (this.K4t(e)) {
          case 2:
          case 1:
            return !0;
          case 3:
            return !!r;
          default:
            return !0;
        }
      }),
      (this.Q4t = (e) => {
        if (e) {
          if (this.E4t(e)) return "EditBattleTeamRevive";
          var t = ModelManager_1.ModelManager.EditBattleTeamModel,
            r = t.GetCurrentEditRoleSlotData;
          if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
            return "JoinText";
          switch (this.K4t(e)) {
            case 2:
              return "GoDownText";
            case 1:
              return r.HasRole ? "ChangeText" : "JoinText";
            case 3:
              return "ChangeText";
            default:
              return "JoinText";
          }
        }
      }),
      (this.X4t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel,
          r = t.GetCurrentEditRoleSlotData,
          o = r.GetRoleData;
        if (o && !o.IsSelf)
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              48,
              "[EditBattleTeam]无法改变别的玩家的角色",
            ),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "EditBattleTeamLastRole",
            );
        else {
          this.k4t(!0);
          var n = e;
          const _ = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
          if (_ && (_.IsTrialRole() || t.CanAddRoleToEditTeam(n))) {
            switch (this.K4t(n)) {
              case 2:
                o &&
                  ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(
                    o.ConfigId,
                  ),
                  r.ResetRoleData();
                break;
              case 3:
                if (r) {
                  var i = t.GetSlotDataByConfigId(n);
                  if (!i) return;
                  var a = i.GetRoleData;
                  if (!a) return;
                  var l = r.GetRoleData;
                  if (!l) return void i.ResetRoleData();
                  i.SetRoleData(l), r.SetRoleData(a);
                  break;
                }
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "IsInTeam",
                );
              case 4:
                return;
              default: {
                const _ =
                  ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
                i = _.GetLevelData();
                let e = r.GetRoleData;
                e
                  ? ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(
                      e.ConfigId,
                    )
                  : (e = t.CreateRoleDataFromRoleInstance(_)),
                  (e.ConfigId = n),
                  (e.Level = i.GetLevel()),
                  (e.SkinId = _.GetRoleSkinId()),
                  r.SetRoleData(e);
                break;
              }
            }
            t.IsMultiInstanceDungeon
              ? ((e = t.GetOwnRoleConfigIdList),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Formation",
                    48,
                    "[EditBattleTeam]请求改变战前编队角色:RoleConfigList",
                    ["RoleConfigList", e],
                  ),
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(
                  t.GetOwnRoleConfigIdList[0],
                ))
              : (this.f4t(),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
                  "点击确认编队时（选人界面）",
                ));
          }
        }
      }),
      (this.O4t = () => {
        this.k4t(!0);
      }),
      (this.R6e = (e, t) => {
        return new EditFormationTabItem_1.EditFormationTabItem();
      }),
      (this.yqe = (e) => {
        var t = EditFormationDefine_1.FORMATION_SPRITES[e],
          t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t),
          e = e + 1,
          r =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "TeamText",
            ),
          t = new CommonTabData_1.CommonTabData(
            t,
            new CommonTabTitleData_1.CommonTabTitleData(r, e),
          );
        return (
          t.SetSmallIcon(
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_TeamTitle",
            ),
          ),
          t
        );
      }),
      (this.$4t = (e) => {
        if (this.d4t) this.d4t = !1;
        else {
          var e = e + 1,
            t =
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Formation", 5, "当点击编队按钮时", [
                  "formationId",
                  e,
                ]),
              ModelManager_1.ModelManager.EditBattleTeamModel),
            r = ModelManager_1.ModelManager.RoleModel,
            o =
              ModelManager_1.ModelManager.EditFormationModel.GetFormationData(
                e,
              )?.GetRoleIdList;
          for (const a of t.SelfRoleSlotDataRoleIdList)
            ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(
              a,
            );
          for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
            var n,
              i = t.GetRoleSlotData(e);
            o
              ? !i.IsProhibit && (n = o[e - 1])
                ? ((n = r.GetRoleDataById(n)),
                  (n = t.CreateRoleDataFromRoleInstance(n)),
                  i.SetRoleData(n))
                : i.ResetRoleData()
              : i.ResetRoleData();
          }
          this.g4t(),
            this.f4t(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
              "单机切换队伍时",
            );
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [4, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIText],
      [7, UE.UIButtonComponent],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
      [16, UE.UIText],
      [17, UE.UISprite],
      [18, UE.UIButtonComponent],
      [19, UE.UIText],
      [20, UE.UIButtonComponent],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UISpriteTransition],
      [26, UE.UISpriteTransition],
      [27, UE.UISpriteTransition],
    ]),
      (this.BtnBindInfo = [
        [4, this.U4t],
        [3, this.x4t],
        [6, this.w4t],
        [7, this.B4t],
        [14, this.b4t],
        [15, this.q4t],
        [18, this.F4t],
        [8, this.V4t],
        [20, this.G4t],
      ]);
  }
  GetExtraResourceId() {
    var e =
      ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
    if (
      void 0 !== e &&
      33 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.InstSubType
    )
      return "UiView_CelebrationBattleTeam";
    return "UiView_BattleTeam";
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel,
      e = (e.InitAllRoleSlotData(), e.IsMultiInstanceDungeon),
      t = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
      r =
        ModelManager_1.ModelManager.EditBattleTeamModel.IsEditBattleTeamForMowingInstance();
    this._C1(),
      this.GetButton(8).RootUIComp.SetUIActive(e),
      this.GetItem(12).SetUIActive(!e && !t && !r),
      this.GetButton(14).RootUIComp.SetUIActive(t || r),
      this.GetButton(15).RootUIComp.SetUIActive(t),
      this.GetItem(13).SetUIActive(t || r),
      e
        ? (this.GetItem(12).SetUIActive(!1), this.GetItem(9).SetUIActive(!1))
        : t
          ? (this.GetItem(12).SetUIActive(!1),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(19),
              "EditBattleTeamTitle",
            ))
          : ((this.d4t = !0), await this.Y4t()),
      this.k4t(!0),
      await this.Uua(),
      this.g4t(),
      this.f4t(),
      this.RefreshEnterButton(),
      this.mGe(t),
      this.Ore(),
      this.p4t(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  _C1() {
    var e = this.GetButton(20);
    if (e) {
      var t =
        ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
      if (void 0 !== t)
        if (
          33 ===
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)
            ?.InstSubType
        )
          return void e.RootUIComp.SetUIActive(!1);
      e.RootUIComp.SetUIActive(
        !ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon,
      );
    }
  }
  OnBeforeDestroy() {
    for (const t of this.l4t) t.Destroy();
    this.l4t.length = 0;
    for (const r of this._4t) r.Destroy();
    this._4t.splice(0, this._4t.length),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
        !1,
      );
    var e =
        ModelManager_1.ModelManager.InstanceDungeonModel?.GetMatchTeamInfo(),
      e =
        (e &&
          e.P9n !== Protocol_1.Aki.Protocol.B5s.Proto_EnterInstStart &&
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveMatchTeamRequest(),
        ModelManager_1.ModelManager.TowerModel.CheckInTower());
    ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon ||
      e ||
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
      ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter &&
        (ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
          !1),
      this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      this.kre(),
      this.SPe?.Clear(),
      (this.SPe = void 0),
      (this.d4t = !1),
      ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction &&
        ((ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction =
          !1),
        InstanceDungeonController_1.InstanceDungeonController.TeleportDungeonRequest(
          [],
          !1,
        ));
  }
  OnStart() {
    var e;
    this.Ivt &&
      ((e =
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId),
      this.Ivt.SelectToggleByIndex(e - 1),
      this.Ivt.GetTabItemByIndex(e - 1).ShowTeamBattleTips());
  }
  OnBeforeShow() {
    UiManager_1.UiManager.IsViewOpen("OnlineInstanceMatchTips") &&
      UiManager_1.UiManager.CloseView("OnlineInstanceMatchTips");
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1)) {
      var e = t[0];
      if (e.includes("FirstSelf")) {
        var r = ModelManager_1.ModelManager.EditBattleTeamModel;
        for (let e = 0; e < 3; e++)
          if (r.GetRoleSlotData(e + 1)?.GetRoleData?.IsSelf)
            return this.l4t[e]?.GetGuideUiItemAndUiItemForShowEx(t);
      }
      return e.includes("FirstDangoSlot")
        ? this.l4t[0]?.GetGuideUiItemAndUiItemForShowEx(t)
        : void 0;
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.C4t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
        this.D4t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshPlayerUiState,
        this.R4t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        this.y4t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MatchTeamFlagChange,
        this.I4t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPushChatRowData,
        this.lze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefensePhantomChanged,
        this.Ozs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssDangoSelect,
        this.fR1,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.C4t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
        this.D4t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshPlayerUiState,
        this.R4t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        this.y4t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MatchTeamFlagChange,
        this.I4t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPushChatRowData,
        this.lze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefensePhantomChanged,
        this.Ozs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssDangoSelect,
        this.fR1,
      );
  }
  j4t(e) {
    e = this.z4t(e);
    e &&
      !UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") &&
      (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon &&
        OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(
          Protocol_1.Aki.Protocol.G5s.Proto_Selecting,
        ),
      UiManager_1.UiManager.OpenView("TeamRoleSelectView", e));
  }
  GetUseWay() {
    let e = 4;
    return (
      ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()
        ? (e = 29)
        : ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen() &&
          (e = 39),
      e
    );
  }
  z4t(e) {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel,
      r = t.GetRoleList(),
      o = t.GetRoleSlotData(e)?.GetRoleData?.ConfigId,
      o = new TeamRoleSelectView_1.TeamRoleSelectViewData(
        this.GetUseWay(),
        o,
        r,
        this.X4t,
        this.O4t,
        e,
      ),
      n =
        (o.SetGetConfirmButtonEnableFunction(this.W4t),
        o.SetGetConfirmButtonTextFunction(this.Q4t),
        o.SetHideFinishCallBack(this.P4t),
        ModelManager_1.ModelManager.EditBattleTeamModel
          .IsMultiInstanceDungeon &&
          o.SetOtherTeamSlotData(
            ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData,
          ),
        o.SetConfirmCheckFunction(this.S4t),
        (o.IsNeedRevive = this.M4t),
        (o.CanJoinTeam = this.v4t),
        new Array());
    for (const a of t.GetAllRoleSlotData) {
      var i = a.GetRoleData;
      !i ||
        (t.IsMultiInstanceDungeon &&
          i.PlayerId !==
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) ||
        n.push(i.ConfigId);
    }
    return (o.FormationRoleList = n), o;
  }
  T4t(e) {
    if (e) {
      var e = ModelManager_1.ModelManager.EditBattleTeamModel,
        r = e.GetAllRoleSlotData,
        o = new Array(),
        n = e.GetLeaderPlayerId;
      let t = !1;
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var i = r[e - 1],
          a = this.Z4t(e);
        i &&
          a &&
          ((i = i.GetRoleData)
            ? i.PlayerId === n && (t ? o.push(a) : (t = !0))
            : o.push(a));
      }
      var l =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetNeedMatchSize();
      const M = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
      var _ = M.MatchingTime;
      for (let e = 0; e < l; e++) {
        var s = o.pop();
        s?.SetMatchState(!0), s?.SetMatchTime(_);
      }
      (M.MatchingTime = 0),
        (M.OnStopTimer = () => !M.EditBattleTeamMatching),
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(
          this.L4t,
        );
    } else for (const t of this.l4t) t.SetMatchState(!1);
  }
  $oh() {
    var e;
    ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance
      ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow()
      : ((ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance = !0),
        (e =
          ModelManager_1.ModelManager.EditBattleTeamModel
            .GetOwnRoleConfigIdList[0]),
        ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction
          ? ((ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction =
              !1),
            InstanceDungeonController_1.InstanceDungeonController.TeleportDungeonRequest(
              e,
            ))
          : InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .InstanceId,
              e,
              0,
              0,
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .TransitionOption,
              ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
                e,
              ),
            ));
  }
  A4t() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Formation",
        48,
        "[EditBattleTeam]队长{PlayerId} 请求进入副本",
        ["{PlayerId}", ModelManager_1.ModelManager.PlayerInfoModel.GetId()],
      ),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterMatchInstRequest().then(
        (e) => {
          e &&
            EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
        },
        () => {},
      );
  }
  RefreshEnterButton() {
    var e = this.GetText(5),
      t = this.GetButton(6).RootUIComp,
      r = this.GetButton(7).RootUIComp,
      o = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (o.IsMultiInstanceDungeon) {
      var n = ModelManager_1.ModelManager.InstanceDungeonModel;
      if (n.IsMatchTeamHost()) {
        var i =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .EditBattleTeamMatching;
        const a = i ? "EditBattleTeamCancelMatch" : "MatchingButtonLeader";
        LguiUtil_1.LguiUtil.SetLocalText(e, a);
        (i = n.IsTeamNotFull() && !i),
          (i = (t.SetUIActive(i), !n.IsAllPlayerInMatchTeam()));
        r.SetUIActive(i);
      } else {
        const a = o.GetSelfIsReady
          ? "MatchingButtonMemberCancel"
          : "MatchingButtonMember";
        LguiUtil_1.LguiUtil.SetLocalText(e, a),
          t.SetUIActive(!1),
          void r.SetUIActive(!1);
      }
    } else
      LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingButtonLeader"),
        t.SetUIActive(!1),
        r.SetUIActive(!1);
  }
  async Uua() {
    var e = this.GetItem(0),
      t = this.GetItem(1),
      r = this.GetItem(2);
    await this.e5t(e, 1),
      await this.e5t(t, 2),
      await this.e5t(r, 3),
      this.GetButton(18).RootUIComp.SetUIActive(!1);
  }
  async e5t(e, t) {
    var r = new FormationRoleView_1.FormationRoleView(t);
    r.BindOnSelectRole(this.H4t),
      await r.CreateThenShowByActorAsync(e.GetOwner()),
      this.l4t.push(r),
      this.t5t(t),
      r.SetCanAddRole(!0);
  }
  g4t() {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel,
      r = (t.RefreshAllEmptySlotData(), this.GetButton(18).RootUIComp),
      o = t.GetAllRoleSlotData;
    if (o) {
      let e = !1;
      for (const g of o)
        if (g.GetRoleData) {
          e = !0;
          break;
        }
      r.SetUIActive(e);
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var n,
          i,
          a,
          l,
          _,
          s,
          M = o[e - 1];
        M &&
          (n = this.Z4t(e)) &&
          (M.IsProhibit
            ? (this.t5t(e), n.SetCanAddRole(!1))
            : (n.SetCanAddRole(!0),
              (i =
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .IsMultiInstanceDungeon),
              (M = M.GetRoleData)
                ? ((a = M.ConfigId),
                  (l = M.Level),
                  (_ = M.SkinId),
                  (s = ModelManager_1.ModelManager.RoleModel.GetRoleName(a)),
                  i
                    ? (this.t5t(
                        e,
                        a,
                        _,
                        l,
                        M.GetName(),
                        M.OnlineIndex ?? 1,
                        M.PlayerId,
                      ),
                      this.LXa(e, M.ThirdPartyOnlineId),
                      n.RefreshPrepareState())
                    : this.t5t(e, a, _, l, s, 0, 0))
                : (this.t5t(e), i && n.RefreshPrepareState())));
      }
      t =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .EditBattleTeamMatching;
      this.T4t(t), this.p4t();
    } else r.SetUIActive(!1);
  }
  LXa(e, t) {
    e = this.Z4t(e);
    e && e.RefreshPlayStationItem(t);
  }
  t5t(t, r = 0, o = 0, n = 0, i = "", a = 0, l = 0) {
    var _ = t - 1,
      t = this.Z4t(t);
    if (t) {
      const s = this.GetUiSpriteTransition(this.u4t[_]);
      let e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_TeamRoleSkillNone",
      );
      if (r) {
        t.Refresh(r, o, n, i, a, l, "");
        _ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r)?.SkillId;
        if (_)
          for (const M of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
            _,
          ))
            if (M.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
              e = M.Icon;
              break;
            }
      } else t.ResetRole();
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.LGUISpriteData_BaseObject,
        (e, t) => {
          s.SetAllTransitionSprite(e);
        },
        102,
      );
    }
  }
  f4t() {
    var e,
      t = this.GetButton(4),
      r = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (
      r.IsMultiInstanceDungeon &&
      ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()
    )
      if (
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .EditBattleTeamMatching
      )
        t.SetSelfInteractive(!0);
      else if (r.GetIsAllReady) {
        if (
          TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() &&
          !TowerDefenceController_1.TowerDefenseController.CheckAllPhantomsReady()
        )
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                64,
                "[EditBattleTeam] 塔防队伍声骸数不足",
              ),
            void t.SetSelfInteractive(!1)
          );
        if (
          ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState() &&
          !ModelManager_1.ModelManager.DangoAbyssModel.CheckAllDangoReady()
        )
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                27,
                "[EditBattleTeam] 团子深渊队伍团子数不足",
              ),
            void t.SetSelfInteractive(!1)
          );
        t.SetSelfInteractive(!0);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 48, "[EditBattleTeam] 有玩家未准备"),
          t.SetSelfInteractive(!1);
    else
      !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
      r.IsAllRoleDie
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Formation", 48, "[EditBattleTeam] 全角色已死亡"),
          t.SetSelfInteractive(!1))
        : r.GetAllRoleCanAddToTeam()
          ? ((e = r.GetRoleCountInRoleSlot()),
            (!r.IsMultiInstanceDungeon &&
              !TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()) ||
            r.IsInLimitRoleCount(e)
              ? TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() &&
                !TowerDefenceController_1.TowerDefenseController.CheckAllPhantomsReady()
                ? (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Formation",
                      64,
                      "[EditBattleTeam] 塔防队伍声骸数不足",
                    ),
                  t.SetSelfInteractive(!1))
                : ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState() &&
                    !ModelManager_1.ModelManager.DangoAbyssModel.CheckAllDangoReady()
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Formation",
                        27,
                        "[EditBattleTeam] 团子深渊队伍团子数不足",
                      ),
                    t.SetSelfInteractive(!1))
                  : t.SetSelfInteractive(!0)
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Formation",
                    48,
                    "[EditBattleTeam] 角色人数不符合要求",
                  ),
                t.SetSelfInteractive(!1)))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                48,
                "[EditBattleTeam] 未通过副本条件检测",
              ),
            t.SetSelfInteractive(!1));
  }
  k4t(e) {
    var t = this.GetButton(3)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
    t && t.SetUIActive(e);
  }
  Z4t(e) {
    if (!(e > this.l4t.length)) return this.l4t[e - 1];
  }
  K4t(e) {
    var t;
    return e
      ? (t =
          ModelManager_1.ModelManager.EditBattleTeamModel
            .GetCurrentEditRoleSlotData)
        ? t.GetRoleConfigId === e
          ? 2
          : ModelManager_1.ModelManager.EditBattleTeamModel.HasSameConfigIdInAnyOwnRoleSlot(
                e,
              )
            ? 3
            : 1
        : 0
      : 4;
  }
  hu1() {
    var e =
      ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
    if (
      void 0 !== e &&
      33 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.InstSubType
    )
      return !0;
    e =
      ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentFightFormation;
    return ModelManager_1.ModelManager.GameModeModel.IsMulti || !e.ChooseRole;
  }
  async Y4t() {
    var e,
      t = this.GetItem(11);
    this.hu1()
      ? this.GetItem(12).SetUIActive(!1)
      : ((e = new CommonTabComponentData_1.CommonTabComponentData(
          this.R6e,
          this.$4t,
          this.yqe,
        )),
        (this.Ivt = new TabComponentWithTitle_1.TabComponentWithTitle(t, e)),
        await this.Ivt.RefreshTabItemAsync(MAX_FORMATION_ID - 1));
  }
  E4t(e) {
    var t;
    return (
      !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
      !(
        !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        ((t =
          ModelManager_1.ModelManager.EditBattleTeamModel.IsInEditBattleTeam(
            e,
          )),
        ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          e,
        )?.IsTrialRole()) ||
        t ||
        !ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e)
      )
    );
  }
  mGe(e) {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel,
      r = this.GetText(16);
    let o = void 0;
    e
      ? ((e = ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor),
        (n = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)),
        (e =
          ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(e)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(16),
          "Text_TowerAreaFloor_Text",
          e,
          n.Floor,
        ),
        (o = n.RecommendElement))
      : (e = t.GetCurrentDungeonConfig) &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(r, e.MapName),
        (o = e.RecommendElement));
    var n = this.GetItem(23);
    if (!o || o.length <= 0) n.SetUIActive(!1);
    else {
      n.SetUIActive(!0);
      var i = this.GetItem(21),
        a = this.GetItem(22);
      for (const _ of o) {
        var l = LguiUtil_1.LguiUtil.CopyItem(a, i),
          l = new MiniElementItem_1.MiniElementItem(_, l, l.GetOwner());
        this._4t.push(l);
      }
      a.SetUIActive(!1);
    }
  }
  p4t() {
    var e = this.GetItem(24),
      t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    !t ||
    -1 !== ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor ||
    ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon
      ? e.SetUIActive(!1)
      : ((t =
          ModelManager_1.ModelManager.InstanceDungeonModel.CheckPrewarFormationAverageLowLevel(
            t,
          )),
        e.SetUIActive(t));
  }
}
exports.EditBattleTeamView = EditBattleTeamView;
//# sourceMappingURL=EditBattleTeamView.js.map
