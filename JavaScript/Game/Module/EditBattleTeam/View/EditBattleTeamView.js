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
        var t, o, r;
        return this.E4t(e)
          ? (BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e), !1)
          : ((o = (t = ModelManager_1.ModelManager.EditBattleTeamModel)
              .GetCurrentEditRoleSlotData),
            -1 !== (r = t.GetParentRolePositionInEditBattleTeam((e = e))) &&
            r !== o.GetPosition
              ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "SameRole",
                ),
                !1)
              : !(
                  t.IsMultiInstanceDungeon &&
                  o?.GetRoleConfigId === e &&
                  t.GetPlayerRoleNumber(o?.GetRoleData?.PlayerId) < 2 &&
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
      (this.lze = (r) => {
        var i = r.TargetPlayerId;
        if (
          !ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(i) &&
          r.IsVisible
        ) {
          var n = 1 === r.ContentChatRoomType;
          let e = r.SenderPlayerName;
          n &&
            (i = ModelManager_1.ModelManager.FriendModel.GetFriendById(i)) &&
            (e = i.PlayerName),
            this.m4t ||
              (this.GetItem(9).SetUIActive(!0),
              this.SPe.PlayLevelSequenceByName("NoticeIn"),
              (this.m4t = !0)),
            this.SPe.PlayLevelSequenceByName("NewMassageIn");
          var i = this.GetText(10),
            a =
              ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
              r.SenderPlayerId;
          let t = void 0,
            o = r.Content;
          if (r.ContentType === Protocol_1.Aki.Protocol.l8n.SIs)
            t = n
              ? a
                ? "Text_TalkToFriend_Text"
                : "Text_FriendTalkToMe_Text"
              : "Text_TeamTalk_Text";
          else if (r.ContentType === Protocol_1.Aki.Protocol.l8n.Proto_Emoji) {
            var r = Number(r.Content),
              l =
                ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(r);
            if (!l)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Formation", 49, "表情缺少配置", ["表情Id", r])
              );
            LguiUtil_1.LguiUtil.SetLocalTextNew(i, l.Name),
              (o = i.GetText()),
              (t = n
                ? a
                  ? "Text_TalkToFriend_Text_Match"
                  : "Text_FriendTalkToMe_Text_Match"
                : "Text_TeamTalk_Text_Match");
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, t, e, o);
        }
      }),
      (this.VYs = () => {
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
                .DVn) &&
            t.RefreshPrepareState();
      }),
      (this.U4t = () => {
        var e = ModelManager_1.ModelManager.EditBattleTeamModel,
          t = e.GetLeaderIsSelf,
          o = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
          r = e.GetOwnRoleCountInRoleSlot;
        0 === r
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NoRole",
            )
          : e.IsInLimitRoleCount(r)
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
                    ? e.HasSameRole &&
                      !TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()
                      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                          "SameRole",
                        )
                      : e.GetAllRoleCanAddToTeam().CanAdd
                        ? e.IsAllRoleDie
                          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                              "AllRoleDie",
                            )
                          : ModelManager_1.ModelManager.InstanceDungeonModel.MatchingPlayerCount() <=
                              2
                            ? ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                                102,
                              )).FunctionMap.set(2, () => {
                                this.A4t();
                              }),
                              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                                r,
                              ))
                            : this.A4t()
                        : ((t = e.GetCurrentFightFormation.Content),
                          (r =
                            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                              t,
                            )),
                          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                            r,
                          ))
                    : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "NoReady",
                      )
                : (t = e.GetSelfIsReady) ||
                    !e.HasSameRole ||
                    TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Formation",
                        8,
                        "[EditBattleTeam]玩家{PlayerId} 请求准备游戏,是否准备:{SelfIsReady}",
                        ["{PlayerId}", o],
                        ["{SelfIsReady}", !t],
                      ),
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeReadyRequest(
                      !t,
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
                        : ModelManager_1.ModelManager.EditBattleTeamModel
                              .NeedEntrance
                          ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow()
                          : ((ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance =
                              !0),
                            (r =
                              ModelManager_1.ModelManager.EditBattleTeamModel
                                .GetOwnRoleConfigIdList[0]),
                            InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                              ModelManager_1.ModelManager
                                .InstanceDungeonEntranceModel.InstanceId,
                              r,
                              0,
                              0,
                              ModelManager_1.ModelManager
                                .InstanceDungeonEntranceModel.TransitionOption,
                              ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
                                r,
                              ),
                            ))
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
                ? Protocol_1.Aki.Protocol.P6s.Proto_Matching
                : Protocol_1.Aki.Protocol.P6s.Proto_Wait,
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
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon()
          ? UiManager_1.UiManager.OpenView(
              "InstanceDungeonMonsterPreView",
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .SelectInstanceId,
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
            o = e.GetAllRoleSlotData;
          if (o)
            for (const i of o) {
              var r = i.GetRoleData;
              r && t.push(r.ConfigId);
            }
          (o = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()
            ? 29
            : 4),
            (e = e.GetRoleList()),
            (o = new QuickRoleSelectView_1.QuickRoleSelectViewData(o, t, e));
          (o.OnConfirm = this.N4t),
            (o.CanConfirm = this.vaa),
            (o.OnBack = this.O4t),
            (o.OnHideFinish = this.P4t),
            UiManager_1.UiManager.OpenView("QuickRoleSelectView", o),
            this.k4t(!1);
        }
      }),
      (this.N4t = (t) => {
        this.k4t(!0);
        var o = ModelManager_1.ModelManager.EditBattleTeamModel;
        for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var r,
            i = o.GetRoleSlotData(e);
          i.IsProhibit
            ? i.ResetRoleData()
            : e > t.length
              ? i.ResetRoleData()
              : ((r = t[e - 1]),
                (r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r)),
                (r = o.CreateRoleDataFromRoleInstance(r)),
                i.SetRoleData(r));
        }
        this.f4t();
      }),
      (this.vaa = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        for (const r of e)
          if (t.IsTrialRole(r)) {
            var o =
              ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
                r,
              ).ParentId;
            for (const i of e)
              if (o === i)
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
          for (const i of this.l4t) {
            var t = i.GetConfigId(),
              o = i.GetOnlineIndex(),
              r = i.GetPlayer();
            e.AddData(t, o, r);
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
          var o,
            r = t.GetRoleSlotData(e);
          if (r) {
            const i = r?.GetRoleData;
            if (i) {
              if (
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .IsMultiInstanceDungeon &&
                ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() &&
                !i.IsSelf
              )
                return (
                  (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    101,
                  )).FunctionMap.set(2, () => {
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.KickMatchTeamPlayerRequest(
                      i.PlayerId,
                    );
                  }),
                  void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    o,
                  )
                );
              if (!r.CanEditRoleSlot)
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "BattleTeamNotMyRole",
                );
              if (!t.GetLeaderIsSelf && i?.IsReady)
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
              if (r.IsProhibit)
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
          o = t.GetCurrentEditRoleSlotData.GetRoleData;
        if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
          return !1;
        switch (this.K4t(e)) {
          case 2:
          case 1:
            return !0;
          case 3:
            return !!o;
          default:
            return !0;
        }
      }),
      (this.Q4t = (e) => {
        if (e) {
          if (this.E4t(e)) return "EditBattleTeamRevive";
          var t = ModelManager_1.ModelManager.EditBattleTeamModel,
            o = t.GetCurrentEditRoleSlotData;
          if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
            return "JoinText";
          switch (this.K4t(e)) {
            case 2:
              return "GoDownText";
            case 1:
              return o.HasRole ? "ChangeText" : "JoinText";
            case 3:
              return "ChangeText";
            default:
              return "JoinText";
          }
        }
      }),
      (this.X4t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel,
          o = t.GetCurrentEditRoleSlotData,
          r = o.GetRoleData;
        if (r && !r.IsSelf)
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              8,
              "[EditBattleTeam]无法改变别的玩家的角色",
            ),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "EditBattleTeamLastRole",
            );
        else {
          this.k4t(!0);
          var i = e;
          const s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
          if (s && (s.IsTrialRole() || t.CanAddRoleToEditTeam(i))) {
            switch (this.K4t(i)) {
              case 2:
                o.ResetRoleData();
                break;
              case 3:
                if (o) {
                  var n = t.GetSlotDataByConfigId(i);
                  if (!n) return;
                  var a = n.GetRoleData;
                  if (!a) return;
                  var l = o.GetRoleData;
                  if (!l) return void n.ResetRoleData();
                  n.SetRoleData(l), o.SetRoleData(a);
                  break;
                }
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "IsInTeam",
                );
              case 4:
                return;
              default: {
                const s =
                  ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
                n = s.GetLevelData();
                let e = o.GetRoleData;
                ((e = e || t.CreateRoleDataFromRoleInstance(s)).ConfigId = i),
                  (e.Level = n.GetLevel()),
                  o.SetRoleData(e);
                break;
              }
            }
            t.IsMultiInstanceDungeon
              ? ((r = t.GetOwnRoleConfigIdList),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Formation",
                    8,
                    "[EditBattleTeam]请求改变战前编队角色:RoleConfigList",
                    ["RoleConfigList", r],
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
          o =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "TeamText",
            ),
          t = new CommonTabData_1.CommonTabData(
            t,
            new CommonTabTitleData_1.CommonTabTitleData(o, e),
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
            o = ModelManager_1.ModelManager.RoleModel,
            r =
              ModelManager_1.ModelManager.EditFormationModel.GetFormationData(
                e,
              )?.GetRoleIdList;
          for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
            var i,
              n = t.GetRoleSlotData(e);
            r
              ? !n.IsProhibit && (i = r[e - 1])
                ? ((i = o.GetRoleDataById(i)),
                  (i = t.CreateRoleDataFromRoleInstance(i)),
                  n.SetRoleData(i))
                : n.ResetRoleData()
              : n.ResetRoleData();
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
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel,
      e = (e.InitAllRoleSlotData(), e.IsMultiInstanceDungeon),
      t = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
      o =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon();
    this.GetButton(20).RootUIComp.SetUIActive(!e),
      this.GetButton(8).RootUIComp.SetUIActive(e),
      this.GetItem(12).SetUIActive(!e && !t && !o),
      this.GetButton(14).RootUIComp.SetUIActive(t || o),
      this.GetButton(15).RootUIComp.SetUIActive(t),
      this.GetItem(13).SetUIActive(t || o),
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
      await this.Rla(),
      this.g4t(),
      this.f4t(),
      this.RefreshEnterButton(),
      this.mGe(t),
      this.Ore(),
      this.p4t(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    for (const t of this.l4t) t.Destroy();
    this.l4t.length = 0;
    for (const o of this._4t) o.Destroy();
    this._4t.splice(0, this._4t.length),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
        !1,
      );
    var e =
        ModelManager_1.ModelManager.InstanceDungeonModel?.GetMatchTeamInfo(),
      e =
        (e &&
          e.y9n !== Protocol_1.Aki.Protocol.D6s.Proto_EnterInstStart &&
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveMatchTeamRequest(),
        ModelManager_1.ModelManager.TowerModel.CheckInTower());
    ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon ||
      e ||
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
      this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      this.kre(),
      this.SPe?.Clear(),
      (this.SPe = void 0),
      (this.d4t = !1);
  }
  OnBeforeShow() {
    var e;
    this.Ivt &&
      ((e =
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId),
      this.Ivt.SelectToggleByIndex(e - 1),
      this.Ivt.GetTabItemByIndex(e - 1).ShowTeamBattleTips());
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1) && "FirstSelf" === t[0]) {
      var o = ModelManager_1.ModelManager.EditBattleTeamModel;
      for (let e = 0; e < 3; e++)
        if (o.GetRoleSlotData(e + 1)?.GetRoleData?.IsSelf)
          return this.l4t[e].GetGuideUiItemAndUiItemForShowEx(t);
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
        this.VYs,
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
        this.VYs,
      );
  }
  j4t(e) {
    e = this.z4t(e);
    e &&
      !UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") &&
      (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon &&
        OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(
          Protocol_1.Aki.Protocol.P6s.Proto_Selecting,
        ),
      UiManager_1.UiManager.OpenView("TeamRoleSelectView", e));
  }
  z4t(e) {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel,
      o = t.GetRoleList(),
      r = t.GetRoleSlotData(e)?.GetRoleData?.ConfigId,
      r = new TeamRoleSelectView_1.TeamRoleSelectViewData(
        ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ? 29 : 4,
        r,
        o,
        this.X4t,
        this.O4t,
        e,
      ),
      i =
        (r.SetGetConfirmButtonEnableFunction(this.W4t),
        r.SetGetConfirmButtonTextFunction(this.Q4t),
        r.SetHideFinishCallBack(this.P4t),
        ModelManager_1.ModelManager.EditBattleTeamModel
          .IsMultiInstanceDungeon &&
          r.SetOtherTeamSlotData(
            ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData,
          ),
        r.SetConfirmCheckFunction(this.S4t),
        (r.IsNeedRevive = this.M4t),
        (r.CanJoinTeam = this.v4t),
        new Array());
    for (const a of t.GetAllRoleSlotData) {
      var n = a.GetRoleData;
      !n ||
        (t.IsMultiInstanceDungeon &&
          n.PlayerId !==
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) ||
        i.push(n.ConfigId);
    }
    return (r.FormationRoleList = i), r;
  }
  T4t(e) {
    if (e) {
      var e = ModelManager_1.ModelManager.EditBattleTeamModel,
        o = e.GetAllRoleSlotData,
        r = new Array(),
        i = e.GetLeaderPlayerId;
      let t = !1;
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var n = o[e - 1],
          a = this.Z4t(e);
        n &&
          a &&
          ((n = n.GetRoleData)
            ? n.PlayerId === i && (t ? r.push(a) : (t = !0))
            : r.push(a));
      }
      var l =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetNeedMatchSize();
      const M = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
      var s = M.MatchingTime;
      for (let e = 0; e < l; e++) {
        var _ = r.pop();
        _?.SetMatchState(!0), _?.SetMatchTime(s);
      }
      (M.MatchingTime = 0),
        (M.OnStopTimer = () => !M.EditBattleTeamMatching),
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(
          this.L4t,
        );
    } else for (const t of this.l4t) t.SetMatchState(!1);
  }
  A4t() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Formation",
        8,
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
      o = this.GetButton(7).RootUIComp,
      r = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (r.IsMultiInstanceDungeon) {
      var i = ModelManager_1.ModelManager.InstanceDungeonModel;
      if (i.IsMatchTeamHost()) {
        var n =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .EditBattleTeamMatching;
        const a = n ? "EditBattleTeamCancelMatch" : "MatchingButtonLeader";
        LguiUtil_1.LguiUtil.SetLocalText(e, a);
        (n = i.IsTeamNotFull() && !n),
          (n = (t.SetUIActive(n), !i.IsAllPlayerInMatchTeam()));
        o.SetUIActive(n);
      } else {
        const a = r.GetSelfIsReady
          ? "MatchingButtonMemberCancel"
          : "MatchingButtonMember";
        LguiUtil_1.LguiUtil.SetLocalText(e, a),
          t.SetUIActive(!1),
          void o.SetUIActive(!1);
      }
    } else
      LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingButtonLeader"),
        t.SetUIActive(!1),
        o.SetUIActive(!1);
  }
  async Rla() {
    var e = this.GetItem(0),
      t = this.GetItem(1),
      o = this.GetItem(2);
    await this.e5t(e, 1),
      await this.e5t(t, 2),
      await this.e5t(o, 3),
      this.GetButton(18).RootUIComp.SetUIActive(!1);
  }
  async e5t(e, t) {
    var o = new FormationRoleView_1.FormationRoleView(t);
    o.BindOnSelectRole(this.H4t),
      await o.CreateThenShowByActorAsync(e.GetOwner()),
      this.l4t.push(o),
      this.t5t(t),
      o.SetCanAddRole(!0);
  }
  g4t() {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel,
      o = (t.RefreshAllEmptySlotData(), this.GetButton(18).RootUIComp),
      r = t.GetAllRoleSlotData;
    if (r) {
      let e = !1;
      for (const M of r)
        if (M.GetRoleData) {
          e = !0;
          break;
        }
      o.SetUIActive(e);
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var i,
          n,
          a,
          l,
          s,
          _ = r[e - 1];
        _ &&
          (i = this.Z4t(e)) &&
          (_.IsProhibit
            ? (this.t5t(e), i.SetCanAddRole(!1))
            : (i.SetCanAddRole(!0),
              (n =
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .IsMultiInstanceDungeon),
              (_ = _.GetRoleData)
                ? ((a = _.ConfigId),
                  (l = _.Level),
                  (s = ModelManager_1.ModelManager.RoleModel.GetRoleName(a)),
                  n
                    ? (this.t5t(
                        e,
                        a,
                        l,
                        _.PlayerName,
                        _.OnlineIndex ?? 1,
                        _.PlayerId,
                      ),
                      i.RefreshPrepareState())
                    : this.t5t(e, a, l, s, 0, 0))
                : (this.t5t(e), n && i.RefreshPrepareState())));
      }
      t =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .EditBattleTeamMatching;
      this.T4t(t), this.p4t();
    } else o.SetUIActive(!1);
  }
  t5t(t, o = 0, r = 0, i = "", n = 0, a = 0) {
    var l = t - 1,
      t = this.Z4t(t);
    if (t) {
      const s = this.GetUiSpriteTransition(this.u4t[l]);
      let e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_TeamRoleSkillNone",
      );
      if (o) {
        t.Refresh(o, r, i, n, a);
        l = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o)?.SkillId;
        if (l)
          for (const _ of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
            l,
          ))
            if (_.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
              e = _.Icon;
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
      o = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (
      o.IsMultiInstanceDungeon &&
      ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()
    )
      if (
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .EditBattleTeamMatching
      )
        t.SetSelfInteractive(!0);
      else if (o.GetIsAllReady) {
        if (
          TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() &&
          !TowerDefenceController_1.TowerDefenseController.CheckAllPhantomsReady()
        )
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                65,
                "[EditBattleTeam] 塔防队伍声骸数不足",
              ),
            void t.SetSelfInteractive(!1)
          );
        t.SetSelfInteractive(!0);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 49, "[EditBattleTeam] 有玩家未准备"),
          t.SetSelfInteractive(!1);
    else
      !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
      o.IsAllRoleDie
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Formation", 49, "[EditBattleTeam] 全角色已死亡"),
          t.SetSelfInteractive(!1))
        : o.GetAllRoleCanAddToTeam()
          ? ((e = o.GetRoleCountInRoleSlot()),
            (!o.IsMultiInstanceDungeon &&
              !TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()) ||
            o.IsInLimitRoleCount(e)
              ? TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() &&
                !TowerDefenceController_1.TowerDefenseController.CheckAllPhantomsReady()
                ? (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Formation",
                      65,
                      "[EditBattleTeam] 塔防队伍声骸数不足",
                    ),
                  t.SetSelfInteractive(!1))
                : t.SetSelfInteractive(!0)
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Formation",
                    49,
                    "[EditBattleTeam] 角色人数不符合要求",
                  ),
                t.SetSelfInteractive(!1)))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                49,
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
  async Y4t() {
    var e = this.GetItem(11),
      t =
        ModelManager_1.ModelManager.EditBattleTeamModel
          .GetCurrentFightFormation;
    ModelManager_1.ModelManager.GameModeModel.IsMulti || !t.ChooseRole
      ? this.GetItem(12).SetUIActive(!1)
      : ((t = new CommonTabComponentData_1.CommonTabComponentData(
          this.R6e,
          this.$4t,
          this.yqe,
        )),
        (this.Ivt = new TabComponentWithTitle_1.TabComponentWithTitle(e, t)),
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
      o = this.GetText(16);
    let r = void 0;
    e
      ? ((e = ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor),
        (i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)),
        (e =
          ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(e)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(16),
          "Text_TowerAreaFloor_Text",
          e,
          i.Floor,
        ),
        (r = i.RecommendElement))
      : (e = t.GetCurrentDungeonConfig) &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(o, e.MapName),
        (r = e.RecommendElement));
    var i = this.GetItem(23);
    if (!r || r.length <= 0) i.SetUIActive(!1);
    else {
      i.SetUIActive(!0);
      var n = this.GetItem(21),
        a = this.GetItem(22);
      for (const s of r) {
        var l = LguiUtil_1.LguiUtil.CopyItem(a, n),
          l = new MiniElementItem_1.MiniElementItem(s, l, l.GetOwner());
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
