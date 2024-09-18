"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IMatch_1 = require("../../../UniverseEditor/Interface/IMatch"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  FormationDataController_1 = require("../Abilities/FormationDataController"),
  BuffItemControl_1 = require("../BuffItem/BuffItemControl"),
  CombatMessage_1 = require("../CombatMessage/CombatMessage"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  SceneTeamData_1 = require("./SceneTeamData"),
  SceneTeamDefine_1 = require("./SceneTeamDefine"),
  SceneTeamEvent_1 = require("./SceneTeamEvent");
class SceneTeamController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.Tpo = Stats_1.Stat.Create(
        "SceneTeamController.SwitchRoleRequestStat",
        "",
        StatDefine_1.BATTLESTAT_GROUP,
      )),
      (this.Lpo = Stats_1.Stat.Create(
        "SceneTeamController.SwitchRoleRefreshPosStat",
        "",
        StatDefine_1.BATTLESTAT_GROUP,
      )),
      (this.Dpo = Stats_1.Stat.Create(
        "SceneTeamController.SwitchRoleChangeRoleQTEStat",
        "",
        StatDefine_1.BATTLESTAT_GROUP,
      )),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        SceneTeamController.Ilt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        SceneTeamController.GUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        SceneTeamController.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        SceneTeamController.Upo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      Net_1.Net.Register(29192, SceneTeamController.Apo),
      Net_1.Net.Register(24082, SceneTeamController.Ppo),
      Net_1.Net.Register(22246, SceneTeamController.xpo),
      Net_1.Net.Register(20134, SceneTeamController.r$s),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        SceneTeamController.Ilt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        SceneTeamController.GUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        SceneTeamController.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        SceneTeamController.Upo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      Net_1.Net.UnRegister(29192),
      Net_1.Net.UnRegister(24082),
      Net_1.Net.UnRegister(22246),
      Net_1.Net.UnRegister(20134),
      this.wpo &&
        (TimerSystem_1.TimerSystem.Remove(this.wpo), (this.wpo = void 0)),
      !0
    );
  }
  static ShowControlledRole(e) {
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
      e,
    )) {
      var t,
        o = r.EntityHandle;
      o &&
        ((t = o.Entity.GetComponent(92)), r.IsControl()) &&
        !t?.IsInGame &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SceneTeam", 49, "复活显示角色", ["EntityId", o.Id]),
        r.EntityHandle.Entity?.EnableByKey(1, !0));
    }
  }
  static RequestChangeRole(o, e = void 0) {
    var t = e?.FilterSameRole ?? !0;
    const r = e?.GoDownWaitSkillEnd ?? !1,
      a = e?.ForceInheritTransform ?? !0,
      n = ModelManager_1.ModelManager.SceneTeamModel;
    var e = n.GetCurrentTeamItem,
      l = n.GetTeamItem(o, { ParamType: 3 });
    if (l && (!t || e?.GetCreatureDataId() !== o)) {
      t = l.EntityHandle?.Entity;
      if (t) {
        var i = SceneTeamController.Bpo();
        if (
          i !== Protocol_1.Aki.Protocol.f6s.Proto_SignleWorld ||
          GlobalData_1.GlobalData.Networking()
        )
          if (l.IsDead())
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "角色已经死亡", [
                "CreatureDataId",
                o,
              ]);
          else {
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "请求切换当前角色", [
                "CreatureDataId",
                o,
              ]),
              (n.ChangingRole = !0);
            const s =
              ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
            var _ = new Protocol_1.Aki.Protocol.qis();
            (_.Q6n = l.GetConfigId),
              (_.$Hn = i),
              CombatMessage_1.CombatNet.Call(
                28609,
                t,
                _,
                (e) => {
                  var t;
                  e &&
                    (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info("SceneTeam", 49, "切换当前角色响应"),
                    (n.ChangingRole = !1),
                    e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
                      ? ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                        (this.Tpo.Start(),
                        this.ResponseChangeRole(o, r, a, s),
                        this.Tpo.Stop())
                      : (e = e.Q6n) && 0 !== e
                        ? (t = n
                            .GetTeamItem(e, { ParamType: 0, OnlyMyRole: !0 })
                            ?.GetCreatureDataId())
                          ? (Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "SceneTeam",
                                49,
                                "请求换人失败，已更换正确角色",
                                ["角色Id", e],
                              ),
                            this.Tpo.Start(),
                            this.ResponseChangeRole(t, r, a, s),
                            this.Tpo.Stop())
                          : Log_1.Log.CheckError() &&
                            Log_1.Log.Error(
                              "SceneTeam",
                              49,
                              "请求换人失败，在队伍中未找到角色",
                              ["角色Id", e],
                            )
                        : Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneTeam",
                            49,
                            "请求换人失败，全角色已死亡",
                            ["角色Id", e],
                          ));
                },
                void 0,
                s,
              ),
              ModelManager_1.ModelManager.GameModeModel.IsMulti ||
                (this.Tpo.Start(),
                this.ResponseChangeRole(o, r, a, s),
                this.Tpo.Stop());
          }
        else
          (i = !l.EntityHandle?.Entity?.Active),
            (t = e?.EntityHandle?.Entity?.GetComponent(89)?.IsInQte ?? !1),
            (_ = ModelManager_1.ModelManager.SceneTeamModel.ChangeRoleCooldown),
            n.ChangeRole(o, {
              UseGoBattleSkill: !t,
              CoolDown: _,
              GoDownWaitSkillEnd: r,
              AllowRefreshTransform: i,
              ForceInheritTransform: a,
            });
      }
    }
  }
  static Bpo() {
    return ModelManager_1.ModelManager.EditBattleTeamModel.IsInInstanceDungeon
      ? Protocol_1.Aki.Protocol.f6s.Proto_FbInstance
      : ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? Protocol_1.Aki.Protocol.f6s.Proto_MultiWorld
        : Protocol_1.Aki.Protocol.f6s.Proto_SignleWorld;
  }
  static ResponseChangeRole(e, t = !1, o = !0, r = void 0) {
    var a, n, l;
    ModelManager_1.ModelManager.GameModeModel.IsTeleport
      ? (ModelManager_1.ModelManager.SceneTeamModel.ChangeCreatureDataIdCache =
          e)
      : ((a = ModelManager_1.ModelManager.SceneTeamModel),
        this.Lpo.Start(),
        a.RefreshLastTransform(),
        this.Lpo.Stop(),
        (n = (l = a.GetTeamItem(e, { ParamType: 3 }))?.EntityHandle.Entity) &&
        l.IsMyRole()
          ? ((l = n.GetComponent(89)),
            this.Dpo.Start(),
            (l = a.ChangeRole(e, {
              UseGoBattleSkill: !l.IsInQte,
              CoolDown: a.ChangeRoleCooldown,
              GoDownWaitSkillEnd: t,
              AllowRefreshTransform: !n.Active,
              ForceInheritTransform: o,
              MessageId: r,
            })),
            this.Dpo.Stop(),
            l || (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "队伍实体无法获取或非本机", [
                "CreatureDataId",
                e,
              ]),
            (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1)));
  }
  static GetLivingSate(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.JEs.Proto_Alive:
        return 1;
      case Protocol_1.Aki.Protocol.JEs.Proto_Dead:
        return 2;
      default:
        Protocol_1.Aki.Protocol.JEs.Proto_Init;
        return 0;
    }
  }
  static TryChangeRoleOrQte(e) {
    if (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "在换人请求返回前尝试换人");
    else {
      var t = ModelManager_1.ModelManager.SceneTeamModel,
        o = t.GetTeamItem(e, { ParamType: 3 }),
        r = o?.EntityHandle,
        a = t.GetCurrentTeamItem,
        n = a?.EntityHandle;
      if (n && a.GetCreatureDataId() !== e)
        if (r)
          if (o.IsMyRole()) {
            var l = n.Entity.CheckGetComponent(190);
            if (!l.HasTag(1008164187) && !l.HasTag(191377386)) {
              var i = ModelManager_1.ModelManager.TowerModel.CheckInTower();
              if (l.HasTag(-1697149502))
                i &&
                  !FormationDataController_1.FormationDataController
                    .GlobalIsInFight &&
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "CannotChangeRoleBeforeStartBattle",
                  );
              else {
                t = t.CurrentGroupType;
                if (-1 === t || 3 === t)
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "SceneTeam",
                      49,
                      "当前正在幻象组或剧情组，不能切角色",
                    );
                else {
                  var t = l.HasTag(504239013) || l.HasTag(855966206),
                    l = n.Entity.GetComponent(89),
                    _ = r.Entity.GetComponent(89),
                    t = !t && _.IsQteReady(n);
                  if (o.IsDead())
                    return ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
                      i
                      ? void (
                          i &&
                          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                            "InstanceDungeonShieldViewCantOpen",
                          )
                        )
                      : void BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(
                          o.GetConfigId,
                        );
                  i = r.Entity.CheckGetComponent(84).IsChangeRoleCoolDown();
                  if (!t && i)
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "EditBattleTeamInCD",
                    );
                  else {
                    i = a.CanGoDown(t);
                    if (0 !== i)
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "SceneTeam",
                          49,
                          "下场角色无法换人",
                          ["Result", i],
                          ["roleId", a.GetConfigId],
                        );
                    else {
                      i = o.CanGoBattle();
                      if (0 !== i)
                        Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneTeam",
                            49,
                            "上场角色无法换人",
                            ["Result", i],
                            ["roleId", o.GetConfigId],
                          );
                      else {
                        a = _.GetQteTagData();
                        if (a) {
                          let e = !1;
                          t && (l.UseExitSkill(r), (e = _.ExecuteQte(n))),
                            (e ? a.ChangeRoleOnQte : a.ChangeRole) &&
                              SceneTeamController.RequestChangeRole(
                                o.GetCreatureDataId(),
                                {
                                  FilterSameRole: !0,
                                  GoDownWaitSkillEnd: !0,
                                  ForceInheritTransform: !1,
                                },
                              );
                        }
                      }
                    }
                  }
                }
              }
            }
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "上场角色为其他玩家的角色", [
                "CreatureDataId",
                e,
              ]),
              SceneTeamController.TryUseMultiQte(r);
        else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "上场角色实体不存在", [
              "CreatureDataId",
              e,
            ]);
      else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "下场角色实体不存在或相同", [
            "CreatureDataId",
            e,
          ]);
    }
  }
  static TryUseMultiQte(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem,
      o = t.EntityHandle.Entity.GetComponent(89);
    return o.IsQteReady(e)
      ? (e.Entity.GetComponent(89).UseExitSkill(t.EntityHandle),
        o.ExecuteMultiQte(e),
        !0)
      : (e.Entity.GetComponent(190).HasTag(166024319) ||
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "TeammateQteDisable",
          ),
        !1);
  }
  static IsMatchRoleOption(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel,
      o = t.IsPhantomTeam,
      r = t.GetTeamItems();
    for (const a of e)
      switch (a.Type) {
        case IMatch_1.EMatchRoleType.Player:
          if (o) break;
          return !0;
        case IMatch_1.EMatchRoleType.Phantom:
          if (o) for (const n of r) if (n.GetConfigId === a.Id) return !0;
      }
    return !1;
  }
  static EmitEvent(e, t, ...o) {
    e &&
      (EventSystem_1.EventSystem.EmitWithTarget(e, t, ...o),
      (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Id, {
        ParamType: 1,
      }))) &&
      (e.IsMyRole() &&
        EventSystem_1.EventSystem.EmitWithTarget(
          SceneTeamEvent_1.SceneTeam.Local,
          t,
          ...o,
        ),
      EventSystem_1.EventSystem.EmitWithTarget(
        SceneTeamEvent_1.SceneTeam.All,
        t,
        ...o,
      ));
  }
}
(exports.SceneTeamController = SceneTeamController),
  ((_a = SceneTeamController).Tpo = void 0),
  (SceneTeamController.Lpo = void 0),
  (SceneTeamController.Dpo = void 0),
  (SceneTeamController.wpo = void 0),
  (SceneTeamController.RQe = (e, t) => {
    10036 === e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        t,
      );
  }),
  (SceneTeamController.Zpe = (e) => {
    GlobalData_1.GlobalData.BpEventManager.小队战斗状态改变时.Broadcast(e);
  }),
  (SceneTeamController.Upo = () => {
    _a.wpo ||
      (_a.wpo = TimerSystem_1.TimerSystem.Forever(
        _a.qpo,
        SceneTeamDefine_1.CHECK_ROLE_INTERVAL,
      ));
  }),
  (SceneTeamController.Ilt = () => {
    var e,
      t = ModelManager_1.ModelManager.SceneTeamModel;
    t.RefreshLastTransform(),
      0 < t.ChangeCreatureDataIdCache &&
        ((e = t.ChangeCreatureDataIdCache),
        (t.ChangeCreatureDataIdCache = 0),
        (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1),
        t.ChangeRole(e));
  }),
  (SceneTeamController.GUe = (e, t, o) => {
    ModelManager_1.ModelManager.SceneTeamModel.AddEntity(t);
  }),
  (SceneTeamController.zpe = (e, t) => {
    var o = ModelManager_1.ModelManager.SceneTeamModel;
    t.Id === o.GetCurrentEntity?.Id &&
      ((o.LastEntityIsOnGround =
        t.Entity.GetComponent(92).PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        o.RefreshLastTransform());
  }),
  (SceneTeamController.xpo = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 5, "9603 换人同步", ["massage", e]);
    var t = MathUtils_1.MathUtils.LongToNumber(e.mUs),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      r = o.Entity.GetComponent(0);
    if (o?.Valid) {
      var a = r.GetRoleId();
      if (e.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId())
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 5, "通过换人同步切换角色", [
            "massage",
            e,
          ]),
          SceneTeamController.ResponseChangeRole(t);
      else {
        var n = MathUtils_1.MathUtils.LongToNumber(e.CUs),
          l = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (l?.Valid) {
          o.IsInit &&
            o.Entity.GetComponent(3).SetActorTransform(
              l.Entity.GetComponent(3).ActorTransform,
              "SwitchRoleNotify",
              !1,
            ),
            r.SetVisible(!0),
            o.Entity?.EnableByKey(1, !0);
          var r = o.Entity.GetComponent(163).MainAnimInstance,
            i = l.Entity.GetComponent(163).MainAnimInstance,
            r =
              (UE.KuroStaticLibrary.IsObjectClassByName(
                r,
                CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
              ) &&
                UE.KuroStaticLibrary.IsObjectClassByName(
                  i,
                  CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
                ) &&
                r.替换角色时同步动作数据(i),
              o.Entity.GetComponent(60)),
            i = l.Entity.GetComponent(60),
            _ = (r.CloneMoveSampleInfos(i), l.Entity.GetComponent(0));
          _.SetVisible(!1),
            ModelManager_1.ModelManager.SceneTeamModel.OtherPlayerChangeRole(
              e.W5n,
              t,
            );
          for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
            e.W5n,
          ))
            s.GetConfigId === _.GetRoleId()
              ? s.SetRemoteIsControl(!1)
              : s.GetConfigId === a && s.SetRemoteIsControl(!0);
          l.Entity?.DisableByKey(1, !0),
            GlobalData_1.GlobalData.GameInstance &&
              GlobalData_1.GlobalData.BpEventManager.当换人完成时.Broadcast(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnOtherChangeRole,
            );
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneTeam",
              5,
              "[SceneTeam.SwitchRoleNotify] 不存在下阵的Entity。",
              ["DownCreatureDataId", n],
            );
      }
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneTeam",
          5,
          "[SceneTeam.SwitchRoleNotify] 不存在上阵的Entity。",
          ["UpCreatureId", t],
        );
  }),
  (SceneTeamController.Ppo = (e) => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 49, "切换编队组推送"),
      ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(e.W5n, e.USs);
  }),
  (SceneTeamController.Apo = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "更新编队组推送", ["Data", e]);
    var t = new Array();
    for (const n of e.yRs) {
      var o = new Array();
      for (const l of n.ERs) {
        var r = [];
        for (const i of l.gRs) {
          var a = new SceneTeamData_1.SceneTeamRole();
          (a.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(i.F4n)),
            (a.RoleId = i.Q6n),
            r.push(a);
        }
        o.push({
          GroupType: l.USs,
          GroupRoleList: r,
          CurrentRoleId: l.NVn,
          LivingState: SceneTeamController.GetLivingSate(l.JEs),
          IsFixedLocation: l.M0a,
          IsRetain: l.MRs,
        });
      }
      t.push({ PlayerId: n.W5n, CurrentGroupType: n.erh, Groups: o });
    }
    ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerData(t);
  }),
  (SceneTeamController.r$s = (e) => {
    var t = e.W5n,
      e = e.azs,
      o =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            49,
            "更新编队组死亡状态",
            ["PlayerId", t],
            ["States", e],
          ),
        new Map());
    for (const a of e) {
      var r = SceneTeamController.GetLivingSate(a.JEs);
      o.set(a.USs, r);
    }
    ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupLivingStates(t, o);
  }),
  (SceneTeamController.qpo = () => {
    var e, t, o;
    Net_1.Net.IsServerConnected() &&
      ((e = (t = ModelManager_1.ModelManager.SceneTeamModel).GetCurrentTeamItem)
        ? (t = t.CurrentGroupType) && -1 !== t
          ? (((o = new Protocol_1.Aki.Protocol.Trs()).W5n = e.GetPlayerId()),
            (o.YHn = e.GetConfigId),
            (o.JHn = e.GetCreatureDataId()),
            Net_1.Net.Call(19855, o, () => {}))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "检查当前角色，控制特殊角色中", [
              "groupType",
              t,
            ])
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "检查当前角色，无法获取队伍实例"));
  });
//# sourceMappingURL=SceneTeamController.js.map
