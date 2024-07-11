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
      (this.Tpo = void 0),
      (this.Lpo = void 0),
      (this.Dpo = void 0),
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
      Net_1.Net.Register(18697, SceneTeamController.Apo),
      Net_1.Net.Register(2446, SceneTeamController.Ppo),
      Net_1.Net.Register(8712, SceneTeamController.xpo),
      Net_1.Net.Register(28631, SceneTeamController.E7s),
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
      Net_1.Net.UnRegister(18697),
      Net_1.Net.UnRegister(2446),
      Net_1.Net.UnRegister(8712),
      Net_1.Net.UnRegister(28631),
      this.wpo &&
        (TimerSystem_1.TimerSystem.Remove(this.wpo), (this.wpo = void 0)),
      !0
    );
  }
  static ShowControlledRole(e) {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
      e,
    )) {
      var o,
        r = t.EntityHandle;
      r &&
        ((o = r.Entity.GetComponent(91)), t.IsControl()) &&
        !o?.IsInGame &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SceneTeam", 49, "复活显示角色", ["EntityId", r.Id]),
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          t.EntityHandle.Entity,
          !0,
          "SceneTeamControl.ShowControlledRole",
        ));
    }
  }
  static RequestChangeRole(r, e = void 0) {
    var o = e?.FilterSameRole ?? !0;
    const t = e?.GoDownWaitSkillEnd ?? !1,
      a = e?.ForceInheritTransform ?? !0,
      n = ModelManager_1.ModelManager.SceneTeamModel;
    var l,
      e = n.GetCurrentTeamItem,
      _ = n.GetTeamItem(r, { ParamType: 3 });
    !_ ||
      (o && e?.GetCreatureDataId() === r) ||
      ((o = SceneTeamController.Bpo()) !==
        Protocol_1.Aki.Protocol._5s.Proto_SignleWorld ||
      GlobalData_1.GlobalData.Networking()
        ? _.IsDead()
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "角色已经死亡", [
              "CreatureDataId",
              r,
            ])
          : (ModelManager_1.ModelManager.GameModeModel.IsMulti ||
              this.ResponseChangeRole(r, t, a),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "请求切换当前角色", [
                "CreatureDataId",
                r,
              ]),
            (n.ChangingRole = !0),
            ((l = new Protocol_1.Aki.Protocol.Ais()).O6n = _.GetConfigId),
            (l.kHn = o),
            CombatMessage_1.CombatNet.Call(27195, void 0, l, (e) => {
              var o;
              e &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("SceneTeam", 49, "切换当前角色响应"),
                (n.ChangingRole = !1),
                e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
                  ? ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                    this.ResponseChangeRole(r, t, a)
                  : (e = e.O6n) && 0 !== e
                    ? (o = n
                        .GetTeamItem(e, { ParamType: 0, OnlyMyRole: !0 })
                        ?.GetCreatureDataId())
                      ? (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneTeam",
                            49,
                            "请求换人失败，已更换正确角色",
                            ["角色Id", e],
                          ),
                        this.ResponseChangeRole(o, t, a))
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
            }))
        : ((o = !_.EntityHandle?.Entity?.Active),
          (l = e?.EntityHandle?.Entity?.GetComponent(88)?.IsInQte ?? !1),
          (_ = ModelManager_1.ModelManager.SceneTeamModel.ChangeRoleCooldown),
          n.ChangeRole(r, {
            UseGoBattleSkill: !l,
            CoolDown: _,
            GoDownWaitSkillEnd: t,
            AllowRefreshTransform: o,
            ForceInheritTransform: a,
          })));
  }
  static Bpo() {
    return ModelManager_1.ModelManager.EditBattleTeamModel.IsInInstanceDungeon
      ? Protocol_1.Aki.Protocol._5s.Proto_FbInstance
      : ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? Protocol_1.Aki.Protocol._5s.Proto_MultiWorld
        : Protocol_1.Aki.Protocol._5s.Proto_SignleWorld;
  }
  static ResponseChangeRole(e, o = !1, r = !0) {
    var t, a, n;
    ModelManager_1.ModelManager.GameModeModel.IsTeleport
      ? (ModelManager_1.ModelManager.SceneTeamModel.ChangeCreatureDataIdCache =
          e)
      : ((t =
          ModelManager_1.ModelManager.SceneTeamModel).RefreshLastTransform(),
        (a = (n = t.GetTeamItem(e, { ParamType: 3 }))?.EntityHandle.Entity) &&
        n.IsMyRole()
          ? ((n = a.GetComponent(88)),
            t.ChangeRole(e, {
              UseGoBattleSkill: !n.IsInQte,
              CoolDown: t.ChangeRoleCooldown,
              GoDownWaitSkillEnd: o,
              AllowRefreshTransform: !a.Active,
              ForceInheritTransform: r,
            }) ||
              (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "队伍实体无法获取或非本机", [
                "CreatureDataId",
                e,
              ]),
            (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1)));
  }
  static GetLivingSate(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.HEs.Proto_Alive:
        return 1;
      case Protocol_1.Aki.Protocol.HEs.Proto_Dead:
        return 2;
      default:
        Protocol_1.Aki.Protocol.HEs.Proto_Init;
        return 0;
    }
  }
  static TryChangeRoleOrQte(e) {
    if (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "在换人请求返回前尝试换人");
    else {
      var o = ModelManager_1.ModelManager.SceneTeamModel,
        r = o.GetTeamItem(e, { ParamType: 3 }),
        t = r?.EntityHandle,
        a = o.GetCurrentTeamItem,
        n = a?.EntityHandle;
      if (n && a.GetCreatureDataId() !== e)
        if (t)
          if (r.IsMyRole()) {
            var l = n.Entity.CheckGetComponent(188);
            if (!l.HasTag(1008164187) && !l.HasTag(191377386)) {
              var _ = ModelManager_1.ModelManager.TowerModel.CheckInTower();
              if (l.HasTag(-1697149502))
                _ &&
                  !FormationDataController_1.FormationDataController
                    .GlobalIsInFight &&
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "CannotChangeRoleBeforeStartBattle",
                  );
              else if (-1 === o.CurrentGroupType)
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneTeam",
                    29,
                    "当前正在操控幻象，不能切角色",
                  );
              else {
                var o = l.HasTag(504239013) || l.HasTag(855966206),
                  l = n.Entity.GetComponent(88),
                  i = t.Entity.GetComponent(88),
                  o = !o && i.IsQteReady(n);
                if (r.IsDead())
                  return ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
                    _
                    ? void (
                        _ &&
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                          "InstanceDungeonShieldViewCantOpen",
                        )
                      )
                    : void BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(
                        r.GetConfigId,
                      );
                _ = t.Entity.CheckGetComponent(83).IsChangeRoleCoolDown();
                if (!o && _)
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "EditBattleTeamInCD",
                  );
                else {
                  _ = a.CanGoDown(o);
                  if (0 !== _)
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "SceneTeam",
                        49,
                        "下场角色无法换人",
                        ["Result", _],
                        ["roleId", a.GetConfigId],
                      );
                  else {
                    _ = r.CanGoBattle();
                    if (0 !== _)
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "SceneTeam",
                          49,
                          "上场角色无法换人",
                          ["Result", _],
                          ["roleId", r.GetConfigId],
                        );
                    else {
                      a = i.GetQteTagData();
                      if (a) {
                        let e = !1;
                        o && (l.UseExitSkill(t), (e = i.ExecuteQte(n))),
                          (e ? a.ChangeRoleOnQte : a.ChangeRole) &&
                            SceneTeamController.RequestChangeRole(
                              r.GetCreatureDataId(),
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
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "上场角色为其他玩家的角色", [
                "CreatureDataId",
                e,
              ]),
              SceneTeamController.TryUseMultiQte(t);
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
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem,
      r = o.EntityHandle.Entity.GetComponent(88);
    return r.IsQteReady(e)
      ? (e.Entity.GetComponent(88).UseExitSkill(o.EntityHandle),
        r.ExecuteMultiQte(e),
        !0)
      : (e.Entity.GetComponent(188).HasTag(166024319) ||
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "TeammateQteDisable",
          ),
        !1);
  }
  static IsMatchRoleOption(e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel,
      r = o.IsPhantomTeam,
      t = o.GetTeamItems();
    for (const a of e)
      switch (a.Type) {
        case IMatch_1.EMatchRoleType.Player:
          if (r) break;
          return !0;
        case IMatch_1.EMatchRoleType.Phantom:
          if (r) for (const n of t) if (n.GetConfigId === a.Id) return !0;
      }
    return !1;
  }
  static EmitEvent(e, o, ...r) {
    e &&
      (EventSystem_1.EventSystem.EmitWithTarget(e, o, ...r),
      (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Id, {
        ParamType: 1,
      }))) &&
      (e.IsMyRole() &&
        EventSystem_1.EventSystem.EmitWithTarget(
          SceneTeamEvent_1.SceneTeam.Local,
          o,
          ...r,
        ),
      EventSystem_1.EventSystem.EmitWithTarget(
        SceneTeamEvent_1.SceneTeam.All,
        o,
        ...r,
      ));
  }
}
(exports.SceneTeamController = SceneTeamController),
  ((_a = SceneTeamController).Tpo = void 0),
  (SceneTeamController.Lpo = void 0),
  (SceneTeamController.Dpo = void 0),
  (SceneTeamController.wpo = void 0),
  (SceneTeamController.RQe = (e, o) => {
    10036 === e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        o,
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
      o = ModelManager_1.ModelManager.SceneTeamModel;
    o.RefreshLastTransform(),
      0 < o.ChangeCreatureDataIdCache &&
        ((e = o.ChangeCreatureDataIdCache),
        (o.ChangeCreatureDataIdCache = 0),
        (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1),
        o.ChangeRole(e));
  }),
  (SceneTeamController.GUe = (e, o, r) => {
    ModelManager_1.ModelManager.SceneTeamModel.AddEntity(o);
  }),
  (SceneTeamController.zpe = (e, o) => {
    var r = ModelManager_1.ModelManager.SceneTeamModel;
    o.Id === r.GetCurrentEntity?.Id &&
      ((r.LastEntityIsOnGround =
        o.Entity.GetComponent(91).PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        r.RefreshLastTransform());
  }),
  (SceneTeamController.xpo = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 5, "9603 换人同步", ["massage", e]);
    var o = MathUtils_1.MathUtils.LongToNumber(e.aUs),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o),
      t = r.Entity.GetComponent(0);
    if (r?.Valid) {
      var a = t.GetRoleId();
      if (e.q5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId())
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 5, "通过换人同步切换角色", [
            "massage",
            e,
          ]),
          SceneTeamController.ResponseChangeRole(o);
      else {
        var n = MathUtils_1.MathUtils.LongToNumber(e.hUs),
          l = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (l?.Valid) {
          r.IsInit &&
            r.Entity.GetComponent(3).SetActorTransform(
              l.Entity.GetComponent(3).ActorTransform,
              "SwitchRoleNotify",
              !1,
            ),
            t.SetVisible(!0),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              r.Entity,
              !0,
              "SceneTeamControl.SwitchRoleNotify",
            );
          var t = r.Entity.GetComponent(162).MainAnimInstance,
            _ = l.Entity.GetComponent(162).MainAnimInstance,
            t =
              (UE.KuroStaticLibrary.IsObjectClassByName(
                t,
                CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
              ) &&
                UE.KuroStaticLibrary.IsObjectClassByName(
                  _,
                  CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
                ) &&
                t.替换角色时同步动作数据(_),
              r.Entity.GetComponent(59)),
            _ = l.Entity.GetComponent(59),
            i = (t.CloneMoveSampleInfos(_), l.Entity.GetComponent(0));
          i.SetVisible(!1),
            ModelManager_1.ModelManager.SceneTeamModel.OtherPlayerChangeRole(
              e.q5n,
              o,
            );
          for (const m of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
            e.q5n,
          ))
            m.GetConfigId === i.GetRoleId()
              ? m.SetRemoteIsControl(!1)
              : m.GetConfigId === a && m.SetRemoteIsControl(!0);
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            l.Entity,
            !1,
            "SceneTeamControl.SwitchRoleNotify",
          ),
            ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
              e.q5n,
            )?.ControlRole(o),
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
          ["UpCreatureId", o],
        );
  }),
  (SceneTeamController.Ppo = (e) => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 49, "切换编队组推送"),
      ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(e.q5n, e.ISs);
  }),
  (SceneTeamController.Apo = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "更新编队组推送", ["Data", e]);
    var o = new Array();
    for (const n of e.gRs) {
      var r = new Array();
      for (const l of n.CRs) {
        var t = [];
        for (const _ of l.lRs) {
          var a = new SceneTeamData_1.SceneTeamRole();
          (a.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(_.P4n)),
            (a.RoleId = _.O6n),
            t.push(a);
        }
        r.push({
          GroupType: l.ISs,
          GroupRoleList: t,
          CurrentRoleId: l.RVn,
          LivingState: SceneTeamController.GetLivingSate(l.HEs),
          IsFixedLocation: l.Nda,
          IsRetain: l.dRs,
        });
      }
      o.push({ PlayerId: n.q5n, CurrentGroupType: n.qLa, Groups: r });
    }
    ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerData(o);
  }),
  (SceneTeamController.E7s = (e) => {
    var o = e.q5n,
      e = e._Ys,
      r =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            49,
            "更新编队组死亡状态",
            ["PlayerId", o],
            ["States", e],
          ),
        new Map());
    for (const a of e) {
      var t = SceneTeamController.GetLivingSate(a.HEs);
      r.set(a.ISs, t);
    }
    ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupLivingStates(o, r);
  }),
  (SceneTeamController.qpo = () => {
    var e, o, r;
    Net_1.Net.IsServerConnected() &&
      ((e = (o = ModelManager_1.ModelManager.SceneTeamModel).GetCurrentTeamItem)
        ? (o = o.CurrentGroupType) && -1 !== o
          ? (((r = new Protocol_1.Aki.Protocol.vrs()).q5n = e.GetPlayerId()),
            (r.FHn = e.GetConfigId),
            (r.VHn = e.GetCreatureDataId()),
            Net_1.Net.Call(5105, r, () => {}))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "检查当前角色，控制特殊角色中", [
              "groupType",
              o,
            ])
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "检查当前角色，无法获取队伍实例"));
  });
//# sourceMappingURL=SceneTeamController.js.map
