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
  TowerController_1 = require("../../TowerDetailUi/TowerController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  EditBattleTeamController_1 = require("../EditBattleTeamController"),
  MAX_FORMATION_ID = 6;
class EditBattleTeamView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.h3t = []),
      (this.l3t = []),
      (this._3t = [25, 26, 27]),
      (this.u3t = 0),
      (this.cpt = void 0),
      (this.EPe = void 0),
      (this.c3t = !1),
      (this.m3t = !1),
      (this.d3t = () => {
        this.C3t(), this.RefreshEnterButton(), this.g3t(), this.f3t();
      }),
      (this.p3t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        return !t.IsInEditBattleTeam(e) && t.CanAddRoleToEditTeam(e);
      }),
      (this.v3t = (e) => this.M3t(e)),
      (this.S3t = (e) => {
        var t, i, o;
        return this.M3t(e)
          ? (BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e), !1)
          : ((i = (t = ModelManager_1.ModelManager.EditBattleTeamModel)
              .GetCurrentEditRoleSlotData),
            -1 !== (o = t.GetParentRolePositionInEditBattleTeam((e = e))) &&
            o !== i.GetPosition
              ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "SameRole",
                ),
                !1)
              : !(
                  t.IsMultiInstanceDungeon &&
                  i?.GetRoleConfigId === e &&
                  t.GetPlayerRoleNumber(i?.GetRoleData?.PlayerId) < 2 &&
                  (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "BattleTeamCanNotDownAllRole",
                  ),
                  1)
                ));
      }),
      (this.E3t = (e) => {
        this.RefreshEnterButton();
      }),
      (this.y3t = (e) => {
        this.RefreshEnterButton(), this.g3t(), this.I3t(e);
      }),
      (this.JYe = (o) => {
        var r = o.TargetPlayerId;
        if (
          !ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(r) &&
          o.IsVisible
        ) {
          var n = 1 === o.ContentChatRoomType;
          let e = o.SenderPlayerName;
          n &&
            (r = ModelManager_1.ModelManager.FriendModel.GetFriendById(r)) &&
            (e = r.PlayerName),
            this.c3t ||
              (this.GetItem(9).SetUIActive(!0),
              this.EPe.PlayLevelSequenceByName("NoticeIn"),
              (this.c3t = !0)),
            this.EPe.PlayLevelSequenceByName("NewMassageIn");
          var r = this.GetText(10),
            a =
              ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
              o.SenderPlayerId;
          let t = void 0,
            i = o.Content;
          if (o.ContentType === Protocol_1.Aki.Protocol.U3n.nMs)
            t = n
              ? a
                ? "Text_TalkToFriend_Text"
                : "Text_FriendTalkToMe_Text"
              : "Text_TeamTalk_Text";
          else if (o.ContentType === Protocol_1.Aki.Protocol.U3n.Proto_Emoji) {
            var o = Number(o.Content),
              l =
                ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(o);
            if (!l)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Formation", 49, "表情缺少配置", ["表情Id", o])
              );
            LguiUtil_1.LguiUtil.SetLocalTextNew(r, l.Name),
              (i = r.GetText()),
              (t = n
                ? a
                  ? "Text_TalkToFriend_Text_Match"
                  : "Text_FriendTalkToMe_Text_Match"
                : "Text_TeamTalk_Text_Match");
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(r, t, e, i);
        }
      }),
      (this.T3t = () => {
        var e =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime;
        for (const t of this.h3t) t.SetMatchTime(e);
      }),
      (this.L3t = (e, t) => {
        this.RefreshEnterButton(), this.g3t();
      }),
      (this.D3t = (e) => {
        for (const t of this.h3t)
          ((t.GetPlayer() ?? -1) === e ||
            e ===
              ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
                .Q4n) &&
            t.RefreshPrepareState();
      }),
      (this.R3t = () => {
        var e = ModelManager_1.ModelManager.EditBattleTeamModel,
          t = e.GetLeaderIsSelf,
          i = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
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
                    ? e.HasSameRole
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
                            ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                                102,
                              )).FunctionMap.set(2, () => {
                                this.U3t();
                              }),
                              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                                o,
                              ))
                            : this.U3t()
                        : ((t = e.GetCurrentFightFormation.Content),
                          (o =
                            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                              t,
                            )),
                          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                            o,
                          ))
                    : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "NoReady",
                      )
                : !(t = e.GetSelfIsReady) && e.HasSameRole
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "SameRole",
                    )
                  : (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Formation",
                        8,
                        "[EditBattleTeam]玩家{PlayerId} 请求准备游戏,是否准备:{SelfIsReady}",
                        ["{PlayerId}", i],
                        ["{SelfIsReady}", !t],
                      ),
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeReadyRequest(
                      !t,
                    ))
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
                            InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                              ModelManager_1.ModelManager
                                .InstanceDungeonEntranceModel.InstanceId,
                              ModelManager_1.ModelManager.EditBattleTeamModel
                                .GetOwnRoleConfigIdList[0],
                              0,
                              0,
                              ModelManager_1.ModelManager
                                .InstanceDungeonEntranceModel.TransitionOption,
                            ))
                      : ((o = e.GetCurrentFightFormation.Content),
                        (i =
                          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                            o,
                          )),
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                          i,
                        ))
                : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "NoReady",
                  )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LimitCount",
              );
      }),
      (this.A3t = () => {
        this.C3t(),
          ModelManager_1.ModelManager.EditBattleTeamModel
            .IsMultiInstanceDungeon &&
            ModelManager_1.ModelManager.EditBattleTeamModel.GetLeaderPlayerId &&
            OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .EditBattleTeamMatching
                ? Protocol_1.Aki.Protocol.FNs.Proto_Matching
                : Protocol_1.Aki.Protocol.FNs.Proto_Wait,
            );
      }),
      (this.P3t = () => {
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
      (this.x3t = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
          !0,
        ),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SetMatchTeamMatchFlagRequest(
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel
              .EditBattleTeamMatching,
          );
      }),
      (this.w3t = () => {
        var e = TimeUtil_1.TimeUtil.GetServerTime();
        e - this.u3t > ModelManager_1.ModelManager.OnlineModel.ApplyCd
          ? (InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchInviteRequest(),
            (this.u3t = e),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "HaveMatched",
            ))
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "MatchingInviteCd",
            );
      }),
      (this.B3t = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon()
          ? UiManager_1.UiManager.OpenView(
              "InstanceDungeonMonsterPreView",
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .SelectInstanceId,
            )
          : UiManager_1.UiManager.OpenView("TowerFloorDetailView");
      }),
      (this.b3t = () => {
        TowerController_1.TowerController.TowerFormationRecommendRequest(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        ).finally(() => {
          UiManager_1.UiManager.OpenView("TowerRecommendView");
        });
      }),
      (this.q3t = () => {
        if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
          var e = ModelManager_1.ModelManager.EditBattleTeamModel,
            t = new Array(),
            i = e.GetAllRoleSlotData;
          if (i)
            for (const r of i) {
              var o = r.GetRoleData;
              o && t.push(o.ConfigId);
            }
          (i = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()
            ? 29
            : 4),
            (e = e.GetRoleList()),
            (i = new QuickRoleSelectView_1.QuickRoleSelectViewData(i, t, e));
          (i.OnConfirm = this.G3t),
            (i.OnBack = this.N3t),
            (i.OnHideFinish = this.A3t),
            UiManager_1.UiManager.OpenView("QuickRoleSelectView", i),
            this.O3t(!1);
        }
      }),
      (this.G3t = (t) => {
        this.O3t(!0);
        var i = ModelManager_1.ModelManager.EditBattleTeamModel;
        for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var o,
            r = i.GetRoleSlotData(e);
          r.IsProhibit
            ? r.ResetRoleData()
            : e > t.length
              ? r.ResetRoleData()
              : ((o = t[e - 1]),
                (o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)),
                (o = i.CreateRoleDataFromRoleInstance(o)),
                r.SetRoleData(o));
        }
        this.g3t();
      }),
      (this.k3t = () => {
        if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
          var e = new ExitSkillView_1.ExitSkillViewData();
          for (const r of this.h3t) {
            var t = r.GetConfigId(),
              i = r.GetOnlineIndex(),
              o = r.GetPlayer();
            e.AddData(t, i, o);
          }
          UiManager_1.UiManager.OpenView("ExitSkillView", e);
        }
      }),
      (this.F3t = () => {
        UiManager_1.UiManager.IsViewShow("ChatView") ||
          UiManager_1.UiManager.OpenView("ChatView");
      }),
      (this.V3t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        if (t.GetCurrentFightFormation.ChooseRole) {
          t.SetCurrentEditPosition(e);
          var i,
            o = t.GetRoleSlotData(e);
          if (o) {
            const r = o?.GetRoleData;
            if (r) {
              if (
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .IsMultiInstanceDungeon &&
                ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() &&
                !r.IsSelf
              )
                return (
                  (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    101,
                  )).FunctionMap.set(2, () => {
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.KickMatchTeamPlayerRequest(
                      r.PlayerId,
                    );
                  }),
                  void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    i,
                  )
                );
              if (!o.CanEditRoleSlot)
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "BattleTeamNotMyRole",
                );
              if (!t.GetLeaderIsSelf && r?.IsReady)
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
            this.H3t(e), this.O3t(!1);
          }
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "NoChangeRole",
          );
      }),
      (this.j3t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel,
          i = t.GetCurrentEditRoleSlotData.GetRoleData;
        if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
          return !1;
        switch (this.W3t(e)) {
          case 2:
          case 1:
            return !0;
          case 3:
            return !!i;
          default:
            return !0;
        }
      }),
      (this.K3t = (e) => {
        if (e) {
          if (this.M3t(e)) return "EditBattleTeamRevive";
          var t = ModelManager_1.ModelManager.EditBattleTeamModel,
            i = t.GetCurrentEditRoleSlotData;
          if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID)
            return "JoinText";
          switch (this.W3t(e)) {
            case 2:
              return "GoDownText";
            case 1:
              return i.HasRole ? "ChangeText" : "JoinText";
            case 3:
              return "ChangeText";
            default:
              return "JoinText";
          }
        }
      }),
      (this.Q3t = (e) => {
        var t = ModelManager_1.ModelManager.EditBattleTeamModel,
          i = t.GetCurrentEditRoleSlotData,
          o = i.GetRoleData;
        if (o && !o.IsSelf)
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
          this.O3t(!0);
          var r = e;
          const s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
          if (s && (s.IsTrialRole() || t.CanAddRoleToEditTeam(r))) {
            switch (this.W3t(r)) {
              case 2:
                i.ResetRoleData();
                break;
              case 3:
                if (i) {
                  var n = t.GetSlotDataByConfigId(r);
                  if (!n) return;
                  var a = n.GetRoleData;
                  if (!a) return;
                  var l = i.GetRoleData;
                  if (!l) return void n.ResetRoleData();
                  n.SetRoleData(l), i.SetRoleData(a);
                  break;
                }
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "IsInTeam",
                );
              case 4:
                return;
              default: {
                const s =
                  ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
                n = s.GetLevelData();
                let e = i.GetRoleData;
                ((e = e || t.CreateRoleDataFromRoleInstance(s)).ConfigId = r),
                  (e.Level = n.GetLevel()),
                  i.SetRoleData(e);
                break;
              }
            }
            t.IsMultiInstanceDungeon
              ? ((o = t.GetOwnRoleConfigIdList),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Formation",
                    8,
                    "[EditBattleTeam]请求改变战前编队角色:RoleConfigList",
                    ["RoleConfigList", o],
                  ),
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(
                  t.GetOwnRoleConfigIdList[0],
                ))
              : this.g3t();
          }
        }
      }),
      (this.N3t = () => {
        this.O3t(!0);
      }),
      (this.dVe = (e, t) => {
        return new EditFormationTabItem_1.EditFormationTabItem();
      }),
      (this.yqe = (e) => {
        var t = EditFormationDefine_1.FORMATION_SPRITES[e],
          t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t),
          e = e + 1,
          i =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "TeamText",
            ),
          t = new CommonTabData_1.CommonTabData(
            t,
            new CommonTabTitleData_1.CommonTabTitleData(i, e),
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
      (this.X3t = (e) => {
        if (this.m3t) this.m3t = !1;
        else {
          var e = e + 1,
            t =
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Formation", 5, "当点击编队按钮时", [
                  "formationId",
                  e,
                ]),
              ModelManager_1.ModelManager.EditBattleTeamModel),
            i = ModelManager_1.ModelManager.RoleModel,
            o =
              ModelManager_1.ModelManager.EditFormationModel.GetFormationData(
                e,
              )?.GetRoleIdList;
          for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
            var r,
              n = t.GetRoleSlotData(e);
            o
              ? !n.IsProhibit && (r = o[e - 1])
                ? ((r = i.GetRoleDataById(r)),
                  (r = t.CreateRoleDataFromRoleInstance(r)),
                  n.SetRoleData(r))
                : n.ResetRoleData()
              : n.ResetRoleData();
          }
          this.C3t(), this.g3t();
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
        [4, this.R3t],
        [3, this.P3t],
        [6, this.x3t],
        [7, this.w3t],
        [14, this.B3t],
        [15, this.b3t],
        [18, this.k3t],
        [8, this.F3t],
        [20, this.q3t],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel,
      e = (e.InitAllRoleSlotData(), e.IsMultiInstanceDungeon),
      t = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
      i =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon();
    this.GetButton(20).RootUIComp.SetUIActive(!e),
      this.GetButton(8).RootUIComp.SetUIActive(e),
      this.GetItem(12).SetUIActive(!e && !t && !i),
      this.GetButton(14).RootUIComp.SetUIActive(t || i),
      this.GetButton(15).RootUIComp.SetUIActive(t),
      this.GetItem(13).SetUIActive(t || i),
      e
        ? (this.GetItem(12).SetUIActive(!1), this.GetItem(9).SetUIActive(!1))
        : t
          ? (this.GetItem(12).SetUIActive(!1),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(19),
              "EditBattleTeamTitle",
            ))
          : ((this.m3t = !0), await this.$3t()),
      this.O3t(!0),
      this.Y3t(),
      this.C3t(),
      this.g3t(),
      this.RefreshEnterButton(),
      this.mGe(t),
      this.Ore(),
      this.f3t(),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    for (const t of this.h3t) t.Destroy();
    this.h3t.length = 0;
    for (const i of this.l3t) i.Destroy();
    this.l3t.splice(0, this.l3t.length),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
        !1,
      );
    var e = ModelManager_1.ModelManager.TowerModel.CheckInTower();
    ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon ||
      e ||
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
      this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
      this.kre(),
      this.EPe?.Clear(),
      (this.EPe = void 0),
      (this.m3t = !1);
  }
  OnBeforeShow() {
    var e;
    this.cpt &&
      ((e =
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId),
      this.cpt.SelectToggleByIndex(e - 1),
      this.cpt.GetTabItemByIndex(e - 1).ShowTeamBattleTips());
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.d3t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
        this.L3t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshPlayerUiState,
        this.D3t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        this.E3t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MatchTeamFlagChange,
        this.y3t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPushChatRowData,
        this.JYe,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      this.d3t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
        this.L3t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshPlayerUiState,
        this.D3t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        this.E3t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MatchTeamFlagChange,
        this.y3t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPushChatRowData,
        this.JYe,
      );
  }
  H3t(e) {
    e = this.J3t(e);
    e &&
      !UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") &&
      (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon &&
        OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(
          Protocol_1.Aki.Protocol.FNs.Proto_Selecting,
        ),
      UiManager_1.UiManager.OpenView("TeamRoleSelectView", e));
  }
  J3t(e) {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel,
      i = t.GetRoleList(),
      o = t.GetRoleSlotData(e)?.GetRoleData?.ConfigId,
      o = new TeamRoleSelectView_1.TeamRoleSelectViewData(
        ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() ? 29 : 4,
        o,
        i,
        this.Q3t,
        this.N3t,
        e,
      ),
      r =
        (o.SetGetConfirmButtonEnableFunction(this.j3t),
        o.SetGetConfirmButtonTextFunction(this.K3t),
        o.SetHideFinishCallBack(this.A3t),
        ModelManager_1.ModelManager.EditBattleTeamModel
          .IsMultiInstanceDungeon &&
          o.SetOtherTeamSlotData(
            ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData,
          ),
        o.SetConfirmCheckFunction(this.S3t),
        (o.IsNeedRevive = this.v3t),
        (o.CanJoinTeam = this.p3t),
        new Array());
    for (const a of t.GetAllRoleSlotData) {
      var n = a.GetRoleData;
      !n ||
        (t.IsMultiInstanceDungeon &&
          n.PlayerId !==
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) ||
        r.push(n.ConfigId);
    }
    return (o.FormationRoleList = r), o;
  }
  I3t(e) {
    if (e) {
      var e = ModelManager_1.ModelManager.EditBattleTeamModel,
        i = e.GetAllRoleSlotData,
        o = new Array(),
        r = e.GetLeaderPlayerId;
      let t = !1;
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var n = i[e - 1],
          a = this.z3t(e);
        n &&
          a &&
          ((n = n.GetRoleData)
            ? n.PlayerId === r && (t ? o.push(a) : (t = !0))
            : o.push(a));
      }
      var l =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetNeedMatchSize();
      const M = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
      var s = M.MatchingTime;
      for (let e = 0; e < l; e++) {
        var _ = o.pop();
        _?.SetMatchState(!0), _?.SetMatchTime(s);
      }
      (M.MatchingTime = 0),
        (M.OnStopTimer = () => !M.EditBattleTeamMatching),
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(
          this.T3t,
        );
    } else for (const t of this.h3t) t.SetMatchState(!1);
  }
  U3t() {
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
      i = this.GetButton(7).RootUIComp,
      o = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (o.IsMultiInstanceDungeon) {
      var r = ModelManager_1.ModelManager.InstanceDungeonModel;
      if (r.IsMatchTeamHost()) {
        var n =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .EditBattleTeamMatching;
        const a = n ? "EditBattleTeamCancelMatch" : "MatchingButtonLeader";
        LguiUtil_1.LguiUtil.SetLocalText(e, a);
        (n = r.IsTeamNotFull() && !n),
          (n = (t.SetUIActive(n), !r.IsAllPlayerInMatchTeam()));
        i.SetUIActive(n);
      } else {
        const a = o.GetSelfIsReady
          ? "MatchingButtonMemberCancel"
          : "MatchingButtonMember";
        LguiUtil_1.LguiUtil.SetLocalText(e, a),
          t.SetUIActive(!1),
          void i.SetUIActive(!1);
      }
    } else
      LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingButtonLeader"),
        t.SetUIActive(!1),
        i.SetUIActive(!1);
  }
  Y3t() {
    var e = this.GetItem(0),
      t = this.GetItem(1),
      i = this.GetItem(2);
    this.Z3t(e, 1),
      this.Z3t(t, 2),
      this.Z3t(i, 3),
      this.GetButton(18).RootUIComp.SetUIActive(!1);
  }
  Z3t(e, t) {
    e = new FormationRoleView_1.FormationRoleView(e, t);
    e.BindOnSelectRole(this.V3t),
      this.h3t.push(e),
      this.e4t(t),
      e.SetCanAddRole(!0);
  }
  C3t() {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel,
      i = (t.RefreshAllEmptySlotData(), this.GetButton(18).RootUIComp),
      o = t.GetAllRoleSlotData;
    if (o) {
      let e = !1;
      for (const M of o)
        if (M.GetRoleData) {
          e = !0;
          break;
        }
      i.SetUIActive(e);
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var r,
          n,
          a,
          l,
          s,
          _ = o[e - 1];
        _ &&
          (r = this.z3t(e)) &&
          (_.IsProhibit
            ? (this.e4t(e), r.SetCanAddRole(!1))
            : (r.SetCanAddRole(!0),
              (n =
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .IsMultiInstanceDungeon),
              (_ = _.GetRoleData)
                ? ((a = _.ConfigId),
                  (l = _.Level),
                  (s = ModelManager_1.ModelManager.RoleModel.GetRoleName(a)),
                  n
                    ? (this.e4t(
                        e,
                        a,
                        l,
                        _.PlayerName,
                        _.OnlineIndex ?? 1,
                        _.PlayerId,
                      ),
                      r.RefreshPrepareState())
                    : this.e4t(e, a, l, s, 0, 0))
                : (this.e4t(e), n && r.RefreshPrepareState())));
      }
      t =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .EditBattleTeamMatching;
      this.I3t(t), this.f3t();
    } else i.SetUIActive(!1);
  }
  e4t(t, i = 0, o = 0, r = "", n = 0, a = 0) {
    var l = t - 1,
      t = this.z3t(t);
    if (t) {
      const s = this.GetUiSpriteTransition(this._3t[l]);
      let e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_TeamRoleSkillNone",
      );
      if (i) {
        t.Refresh(i, o, r, n, a);
        l = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)?.SkillId;
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
  g3t() {
    var e,
      t = this.GetButton(4),
      i = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (
      i.IsMultiInstanceDungeon &&
      ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()
    )
      return ModelManager_1.ModelManager.InstanceDungeonEntranceModel
        .EditBattleTeamMatching
        ? void t.SetSelfInteractive(!0)
        : void (i.GetIsAllReady
            ? t.SetSelfInteractive(!0)
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Formation",
                  49,
                  "[EditBattleTeam] 有玩家未准备",
                ),
              t.SetSelfInteractive(!1)));
    !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() &&
    i.IsAllRoleDie
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 49, "[EditBattleTeam] 全角色已死亡"),
        t.SetSelfInteractive(!1))
      : i.GetAllRoleCanAddToTeam()
        ? ((e = i.GetRoleCountInRoleSlot()),
          i.IsMultiInstanceDungeon && !i.IsInLimitRoleCount(e)
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Formation",
                  49,
                  "[EditBattleTeam] 角色人数不符合要求",
                ),
              t.SetSelfInteractive(!1))
            : t.SetSelfInteractive(!0))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              49,
              "[EditBattleTeam] 未通过副本条件检测",
            ),
          t.SetSelfInteractive(!1));
  }
  O3t(e) {
    var t = this.GetButton(3)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
    t && t.SetUIActive(e);
  }
  z3t(e) {
    if (!(e > this.h3t.length)) return this.h3t[e - 1];
  }
  W3t(e) {
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
  async $3t() {
    var e = this.GetItem(11),
      t =
        ModelManager_1.ModelManager.EditBattleTeamModel
          .GetCurrentFightFormation;
    ModelManager_1.ModelManager.GameModeModel.IsMulti || !t.ChooseRole
      ? this.GetItem(12).SetUIActive(!1)
      : ((t = new CommonTabComponentData_1.CommonTabComponentData(
          this.dVe,
          this.X3t,
          this.yqe,
        )),
        (this.cpt = new TabComponentWithTitle_1.TabComponentWithTitle(e, t)),
        await this.cpt.RefreshTabItemAsync(MAX_FORMATION_ID - 1));
  }
  M3t(e) {
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
      i = this.GetText(16);
    let o = void 0;
    o = (
      e
        ? ((e = ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor),
          (r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)),
          (e =
            ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(e)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(16),
            "Text_TowerAreaFloor_Text",
            e,
            r.Floor,
          ),
          r)
        : ((e = t.GetCurrentDungeonConfig),
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.MapName),
          e)
    ).RecommendElement;
    var r = this.GetItem(23);
    if (!o || o.length <= 0) r.SetUIActive(!1);
    else {
      r.SetUIActive(!0);
      var n = this.GetItem(21),
        a = this.GetItem(22);
      for (const s of o) {
        var l = LguiUtil_1.LguiUtil.CopyItem(a, n),
          l = new MiniElementItem_1.MiniElementItem(s, l, l.GetOwner());
        this.l3t.push(l);
      }
      a.SetUIActive(!1);
    }
  }
  f3t() {
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
