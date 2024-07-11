"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamController = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IMatch_1 = require("../../../UniverseEditor/Interface/IMatch");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const StatDefine_1 = require("../../Common/StatDefine");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const FormationDataController_1 = require("../Abilities/FormationDataController");
const BuffItemControl_1 = require("../BuffItem/BuffItemControl");
const CombatMessage_1 = require("../CombatMessage/CombatMessage");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const SceneTeamData_1 = require("./SceneTeamData");
const SceneTeamDefine_1 = require("./SceneTeamDefine");
const SceneTeamEvent_1 = require("./SceneTeamEvent");
class SceneTeamController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.Rfo = void 0),
      (this.Ufo = void 0),
      (this.Afo = void 0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        SceneTeamController.uht,
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
        SceneTeamController.xfo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      Net_1.Net.Register(15312, SceneTeamController.wfo),
      Net_1.Net.Register(18054, SceneTeamController.Bfo),
      Net_1.Net.Register(25495, SceneTeamController.bfo),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        SceneTeamController.uht,
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
        SceneTeamController.xfo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      Net_1.Net.UnRegister(15312),
      Net_1.Net.UnRegister(18054),
      Net_1.Net.UnRegister(25495),
      this.qfo &&
        (TimerSystem_1.TimerSystem.Remove(this.qfo), (this.qfo = void 0)),
      !0
    );
  }
  static ShowControlledRole(e) {
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
      e,
    )) {
      var o;
      const r = a.EntityHandle;
      r &&
        ((o = r.Entity.GetComponent(89)), a.IsControl()) &&
        !o?.IsInGame &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SceneTeam", 49, "复活显示角色", ["EntityId", r.Id]),
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          a.EntityHandle.Entity,
          !0,
          "SceneTeamControl.ShowControlledRole",
        ));
    }
  }
  static RoleDeathEnded(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "开始执行队伍角色死亡逻辑", [
        "EntityId",
        e,
      ]);
    const o = ModelManager_1.ModelManager.SceneTeamModel;
    var e = o.GetTeamItem(e, { ParamType: 1 });
    const r = e?.EntityHandle?.Entity;
    if (r)
      if (
        ModelManager_1.ModelManager.DeadReviveModel.IsPlayerDead(
          e.GetPlayerId(),
        )
      )
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "隐藏死亡角色"),
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            r,
            !1,
            "SceneTeamControl.RoleDeathEnded",
          );
      else if (r.GetComponent(3)?.IsAutonomousProxy) {
        e = o.GetCurrentTeamItem;
        if (e)
          if (e.IsDead()) {
            for (const t of o.GetTeamItems(!0))
              if (!t.IsDead()) {
                const a = t.GetCreatureDataId();
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("SceneTeam", 49, "前台角色死亡进行切人", [
                    "CreatureDataId",
                    a,
                  ]),
                  (o.GoBattleInvincible = !0),
                  SceneTeamController.RequestChangeRole(a);
                break;
              }
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "当前角色未死亡");
        else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "死亡时编队无当前角色");
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "非逻辑主控死亡不进行切人");
    else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "无法获取死亡角色Entity");
  }
  static RequestChangeRole(r, e = !0, a = !1) {
    const t = ModelManager_1.ModelManager.SceneTeamModel;
    let o;
    const n = t.GetCurrentTeamItem;
    let l = t.GetTeamItem(r, { ParamType: 3 });
    !l ||
      (e && n?.GetCreatureDataId() === r) ||
      ((e = SceneTeamController.Gfo()) !==
        Protocol_1.Aki.Protocol.Sks.Proto_SignleWorld ||
      GlobalData_1.GlobalData.Networking()
        ? l.IsDead()
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "角色已经死亡", [
              "CreatureDataId",
              r,
            ])
          : (ModelManager_1.ModelManager.GameModeModel.IsMulti ||
              this.ResponseChangeRole(r, a),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "请求切换当前角色", [
                "CreatureDataId",
                r,
              ]),
            (t.ChangingRole = !0),
            ((o = new Protocol_1.Aki.Protocol.Bzn()).l3n = l.GetConfigId),
            (o.aVn = e),
            Net_1.Net.Call(12642, o, (e) => {
              let o;
              e &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("SceneTeam", 49, "切换当前角色响应"),
                (t.ChangingRole = !1),
                e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
                  ? ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                    this.ResponseChangeRole(r, a)
                  : (e = e.l3n) && e !== 0
                    ? (o = t
                        .GetTeamItem(e, { ParamType: 0, OnlyMyRole: !0 })
                        ?.GetCreatureDataId())
                      ? (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneTeam",
                            49,
                            "请求换人失败，已更换正确角色",
                            ["角色Id", e],
                          ),
                        this.ResponseChangeRole(o, a))
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
        : ((l = n?.EntityHandle?.Entity?.GetComponent(86)?.IsInQte ?? !1),
          (e = ModelManager_1.ModelManager.SceneTeamModel.ChangeRoleCooldown),
          t.ChangeRole(r, !l, e, a)));
  }
  static Gfo() {
    return ModelManager_1.ModelManager.EditBattleTeamModel.IsInInstanceDungeon
      ? Protocol_1.Aki.Protocol.Sks.Proto_FbInstance
      : ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? Protocol_1.Aki.Protocol.Sks.Proto_MultiWorld
        : Protocol_1.Aki.Protocol.Sks.Proto_SignleWorld;
  }
  static ResponseChangeRole(e, o = !1) {
    let r, a, t;
    ModelManager_1.ModelManager.GameModeModel.IsTeleport
      ? (ModelManager_1.ModelManager.SceneTeamModel.ChangeCreatureDataIdCache =
          e)
      : ((r =
          ModelManager_1.ModelManager.SceneTeamModel).RefreshLastTransform(),
        (a = (t = r.GetTeamItem(e, { ParamType: 3 }))?.EntityHandle.Entity) &&
        t.IsMyRole()
          ? ((t = a.GetComponent(86)),
            r.ChangeRole(e, !t.IsInQte, r.ChangeRoleCooldown, o) ||
              (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "队伍实体无法获取或非本机", [
                "CreatureDataId",
                e,
              ]),
            (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1)));
  }
  static TryChangeRoleOrQte(e) {
    if (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "在换人请求返回前尝试换人");
    else {
      var o = ModelManager_1.ModelManager.SceneTeamModel;
      const r = o.GetTeamItem(e, { ParamType: 3 });
      const a = r?.EntityHandle;
      const t = o.GetCurrentTeamItem;
      const n = t?.EntityHandle;
      if (n && t.GetCreatureDataId() !== e)
        if (a)
          if (r.IsMyRole()) {
            var l = n.Entity.CheckGetComponent(185);
            if (!l.HasTag(1008164187) && !l.HasTag(191377386)) {
              let _ = ModelManager_1.ModelManager.TowerModel.CheckInTower();
              if (l.HasTag(-1697149502))
                _ &&
                  !FormationDataController_1.FormationDataController
                    .GlobalIsInFight &&
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "CannotChangeRoleBeforeStartBattle",
                  );
              else if (o.CurrentGroupType === -1)
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneTeam",
                    29,
                    "当前正在操控幻象，不能切角色",
                  );
              else {
                var o = l.HasTag(504239013) || l.HasTag(855966206);
                var l = a.Entity.CheckGetComponent(185);
                const i = n.Entity.GetComponent(86);
                const m = a.Entity.GetComponent(86);
                var o = !o && m.IsQteReady(n);
                let c = l.HasTag(-2107968822);
                if (o) {
                  if (c)
                    return void (
                      l.HasTag(1414093614) || m.TryExecuteQte(n, !0)
                    );
                  if (
                    ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                      r.GetConfigId,
                    ).Intervene
                  )
                    return void m.TryExecuteQte(n);
                }
                if (!c) {
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
                  l = a.Entity.CheckGetComponent(81).IsChangeRoleCoolDown();
                  !o && l
                    ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "EditBattleTeamInCD",
                      )
                    : (c = t.CanGoDown(o)) !== 0
                      ? Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "SceneTeam",
                          49,
                          "下场角色无法换人",
                          ["Result", c],
                          ["roleId", t.GetConfigId],
                        )
                      : (_ = r.CanGoBattle()) !== 0
                        ? Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneTeam",
                            49,
                            "上场角色无法换人",
                            ["Result", _],
                            ["roleId", r.GetConfigId],
                          )
                        : (o &&
                            (SceneTeamController.Nfo(a.Id, n.Id),
                            i.UseExitSkill(a),
                            m.TryExecuteQte(n)),
                          SceneTeamController.RequestChangeRole(
                            r.GetCreatureDataId(),
                            !0,
                            !0,
                          ));
                }
              }
            }
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "上场角色为其他玩家的角色", [
                "CreatureDataId",
                e,
              ]),
              SceneTeamController.TryUseMultiQte(a);
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
    const o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    const r = o.EntityHandle.Entity.GetComponent(86);
    return r.IsQteReady(e)
      ? (e.Entity.GetComponent(86).UseExitSkill(o.EntityHandle),
        r.TryExecuteQte(e),
        !0)
      : (e.Entity.GetComponent(185).HasTag(166024319) ||
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "TeammateQteDisable",
          ),
        !1);
  }
  static IsMatchRoleOption(e) {
    const o = ModelManager_1.ModelManager.SceneTeamModel;
    const r = o.IsPhantomTeam;
    const a = o.GetTeamItems();
    for (const t of e)
      switch (t.Type) {
        case IMatch_1.EMatchRoleType.Player:
          if (r) break;
          return !0;
        case IMatch_1.EMatchRoleType.Phantom:
          if (r) for (const n of a) if (n.GetConfigId === t.Id) return !0;
      }
    return !1;
  }
  static Nfo(e, o) {
    const r = new Protocol_1.Aki.Protocol.wNn();
    var e = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
    );
    const a = MathUtils_1.MathUtils.NumberToLong(
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(o),
    );
    (r.hVn = e),
      (r.lVn = a),
      CombatMessage_1.CombatNet.Call(28906, o, r, (e) => {});
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
  ((_a = SceneTeamController).Rfo = void 0),
  (SceneTeamController.Ufo = void 0),
  (SceneTeamController.Afo = void 0),
  (SceneTeamController.qfo = void 0),
  (SceneTeamController.gKe = (e, o) => {
    e === 10036 &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnConcertoResponseOpen,
        o,
      );
  }),
  (SceneTeamController.Zpe = (e) => {
    GlobalData_1.GlobalData.BpEventManager.小队战斗状态改变时.Broadcast(e);
  }),
  (SceneTeamController.xfo = () => {
    _a.qfo ||
      (_a.qfo = TimerSystem_1.TimerSystem.Forever(
        _a.Ofo,
        SceneTeamDefine_1.CHECK_ROLE_INTERVAL,
      ));
  }),
  (SceneTeamController.uht = () => {
    let e;
    const o = ModelManager_1.ModelManager.SceneTeamModel;
    o.RefreshLastTransform(),
      o.ChangeCreatureDataIdCache > 0 &&
        ((e = o.ChangeCreatureDataIdCache),
        (o.ChangeCreatureDataIdCache = 0),
        (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1),
        o.ChangeRole(e, !1));
  }),
  (SceneTeamController.GUe = (e, o, r) => {
    ModelManager_1.ModelManager.SceneTeamModel.AddEntity(o);
  }),
  (SceneTeamController.zpe = (e, o) => {
    const r = ModelManager_1.ModelManager.SceneTeamModel;
    o.Id === r.GetCurrentEntity?.Id &&
      ((r.LastEntityIsOnGround =
        o.Entity.GetComponent(89).PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        r.RefreshLastTransform());
  }),
  (SceneTeamController.bfo = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 5, "9603 换人同步", ["massage", e]);
    const o = MathUtils_1.MathUtils.LongToNumber(e.VLs);
    const r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    var a = r.Entity.GetComponent(0);
    if (r?.Valid) {
      const t = a.GetRoleId();
      if (e.aFn === ModelManager_1.ModelManager.PlayerInfoModel.GetId())
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 5, "通过换人同步切换角色", [
            "massage",
            e,
          ]),
          SceneTeamController.ResponseChangeRole(o);
      else {
        const n = MathUtils_1.MathUtils.LongToNumber(e.$Ls);
        const l = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (l?.Valid) {
          r.IsInit &&
            r.Entity.GetComponent(3).SetActorTransform(
              l.Entity.GetComponent(3).ActorTransform,
              "SwitchRoleNotify",
              !1,
            ),
            a.SetVisible(!0),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              r.Entity,
              !0,
              "SceneTeamControl.SwitchRoleNotify",
            );
          var a = r.Entity.GetComponent(160).MainAnimInstance;
          var _ = l.Entity.GetComponent(160).MainAnimInstance;
          var a =
            (UE.KuroStaticLibrary.IsObjectClassByName(
              a,
              CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
            ) &&
              UE.KuroStaticLibrary.IsObjectClassByName(
                _,
                CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
              ) &&
              a.替换角色时同步动作数据(_),
            r.Entity.GetComponent(57));
          var _ = l.Entity.GetComponent(57);
          const i = (a.CloneMoveSampleInfos(_), l.Entity.GetComponent(0));
          i.SetVisible(!1),
            ModelManager_1.ModelManager.SceneTeamModel.OtherPlayerChangeRole(
              e.aFn,
              o,
            );
          for (const m of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
            e.aFn,
          ))
            m.GetConfigId === i.GetRoleId()
              ? m.SetRemoteIsControl(!1)
              : m.GetConfigId === t && m.SetRemoteIsControl(!0);
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            l.Entity,
            !1,
            "SceneTeamControl.SwitchRoleNotify",
          ),
            ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
              e.aFn,
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
  (SceneTeamController.Bfo = (e) => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 49, "切换编队组推送"),
      ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(e.aFn, e.afs);
  }),
  (SceneTeamController.wfo = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "更新编队组推送", ["Data", e]);
    const o = new Array();
    for (const n of e.JEs) {
      const r = n.aFn;
      for (const l of n.YEs) {
        const a = [];
        for (const _ of l.HEs) {
          const t = new SceneTeamData_1.SceneTeamRole();
          (t.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(_.rkn)),
            (t.RoleId = _.l3n),
            a.push(t);
        }
        o.push({
          PlayerId: r,
          GroupType: l.afs,
          GroupRoleList: a,
          CurrentRoleId: l.Y4n,
          IsRetain: l.QEs,
        });
      }
    }
    ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerGroup(o);
  }),
  (SceneTeamController.Ofo = () => {
    let e, o, r, a;
    Net_1.Net.IsServerConnected() &&
      ((e = (o = ModelManager_1.ModelManager.SceneTeamModel).GetCurrentTeamItem)
        ? (o = o.CurrentGroupType) && o !== -1
          ? ((r = e.GetCreatureDataId()),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "检查当前角色", ["currentId", r]),
            ((a = new Protocol_1.Aki.Protocol.IZn()).aFn = e.GetPlayerId()),
            (a._Vn = e.GetConfigId),
            (a.uVn = r),
            Net_1.Net.Call(3989, a, (e) => {
              e &&
                ((e = MathUtils_1.MathUtils.LongToNumber(e.uVn)),
                Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info("SceneTeam", 49, "检查当前角色结果", [
                  "currentId",
                  e,
                ]);
            }))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "检查当前角色，控制特殊角色中", [
              "groupType",
              o,
            ])
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "检查当前角色，无法获取队伍实例"));
  });
// # sourceMappingURL=SceneTeamController.js.map
