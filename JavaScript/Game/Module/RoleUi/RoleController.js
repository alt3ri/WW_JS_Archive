"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleController = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputManager_1 = require("../../Ui/Input/InputManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  UiRoleUtils_1 = require("../UiComponent/UiRoleUtils"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../UiModel/UiModelUtil"),
  RoleLevelUpSuccessController_1 = require("./RoleLevel/RoleLevelUpSuccessController");
class RoleController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "RoleRootView",
        RoleController.F1o,
      ),
      !0
    );
  }
  static GO_() {
    return (
      !!ModelManager_1.ModelManager.TowerModel.CheckInTower() ||
      !!ModelManager_1.ModelManager.BossRushModel?.CheckInBossRush() ||
      !!ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower()
    );
  }
  static OpenRoleMainView(e, o = 0, r = [], t = void 0, l) {
    this.OpenRoleMainViewByParam({
      AgentType: e,
      SelectRoleId: o,
      RoleIdList: r,
      OpenTabView: t,
      FinishCallback: l,
      TeamPositionType: 0,
    });
  }
  static OpenRoleMainViewByParam(e) {
    var o = e.SelectRoleId ?? 0,
      r = e.RoleIdList ?? [],
      t = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(e.AgentType),
      l = e.TeamPositionType ?? 0;
    t.Init(r, o, e.OpenTabView),
      (t.TeamPositionType = l),
      UiManager_1.UiManager.OpenView("RoleRootView", t, e.FinishCallback);
  }
  static CloseAndOpenRoleMainView(e, o, r = 0, t = [], l = void 0, a) {
    o = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(o);
    o.Init(t, r, l),
      UiManager_1.UiManager.CloseAndOpenView(e, "RoleRootView", o, a);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "RoleRootView",
      RoleController.CanOpenView,
      "RoleController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "RoleRootView",
      RoleController.CanOpenView,
    );
  }
  static CheckCharacterInBattleTag() {
    var e = Global_1.Global.BaseCharacter;
    return (
      !!e &&
      e.CharacterActorComponent.Entity.CheckGetComponent(203).HasTag(1996802261)
    );
  }
  static CheckCharacterInBattleTagAndShowTips() {
    return (
      !!RoleController.CheckCharacterInBattleTag() &&
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "ForbiddenActionInFight",
      ),
      !0)
    );
  }
  static OnSelectedRoleChange(e, o) {
    var r = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    this.RefreshUiSceneRoleActor(r, e, o),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectedRoleChanged,
      );
  }
  static RefreshUiSceneRoleActor(e, o, r, t = void 0) {
    var l = e.Model?.CheckGetComponent(12);
    (l?.RoleDataId === o && l?.RoleSkinId === r) ||
      (e.Model?.CheckGetComponent(13)?.LoadModelByRoleDataId(o, r, !0, () => {
        t?.(), UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(e);
      }),
      UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BP_UIShowRoom"),
        1,
      ) && UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(e, !0));
  }
  static OnSelectedRoleChangeByConfig(e, o, r = void 0) {
    this.RefreshUiSceneRoleActorByConfigId(e, o, r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectedRoleChanged,
      );
  }
  static RefreshUiSceneRoleActorByConfigId(e, o, r = void 0) {
    const t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    t.Model?.CheckGetComponent(12)?.RoleConfigId !== e &&
      (t.Model?.CheckGetComponent(13)?.LoadModelByRoleConfigId(e, o, !0, () => {
        r?.(), UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(t);
      }),
      UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(t, !0));
  }
  static async LoadUiSceneRoleActorByConfigIdAsync(e, o, r) {
    const t = new CustomPromise_1.CustomPromise();
    e = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(e);
    return (
      e.Model?.CheckGetComponent(13)?.LoadModelByRoleConfigId(o, r, !0, () => {
        t.SetResult(void 0);
      }),
      await t.Promise,
      e
    );
  }
  static ShowUiSceneActorAndShadow(e) {
    var o = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.Model,
      o =
        (o && UiModelUtil_1.UiModelUtil.SetVisible(o, !0),
        UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName("BP_UIShowRoom"),
          1,
        ));
    o && o.SetActorHiddenInGame(!e);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RedDotStart,
      RoleController.V1o,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        RoleController.xkt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        RoleController.H1o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        RoleController.iZe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RedDotStart,
      RoleController.V1o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        RoleController.xkt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        RoleController.H1o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        RoleController.iZe,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28447, (e) => {
      ModelManager_1.ModelManager.RoleModel.UpdateRoleInfoByServerData(e.Y7n);
    }),
      Net_1.Net.Register(17282, (e) => {
        ModelManager_1.ModelManager.RoleModel.RoleAttrUpdate(
          e.Q6n,
          e.bws,
          e.Bws,
        );
      }),
      Net_1.Net.Register(29631, (e) => {
        var o = e.RUs.Q6n;
        ModelManager_1.ModelManager.RoleModel.UpdateRoleInfo(e.RUs),
          ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
            o,
          ),
          ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem,
            o,
          ),
          ModelManager_1.ModelManager.PersonalModel.SetPersonalTipState(!0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoleSelectionListUpdate,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActiveRole,
            o,
          );
      }),
      Net_1.Net.Register(19779, (e) => {
        ModelManager_1.ModelManager.RoleModel.RoleLevelUp(e.Q6n, e.U8n, e.F6n);
      }),
      Net_1.Net.Register(16427, (e) => {
        void 0 !== e &&
          ModelManager_1.ModelManager.RoleModel.RoleResonanceLockFinish(e);
      }),
      Net_1.Net.Register(21014, (e) => {
        void 0 !== e &&
          ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(e.Q6n, e.ixs);
      }),
      Net_1.Net.Register(22041, (e) => {
        e && ModelManager_1.ModelManager.RoleModel.RoleNameUpdate(e.Q6n, e.H8n);
      }),
      Net_1.Net.Register(28294, (e) => {
        ModelManager_1.ModelManager.RoleModel.IsInRoleTrial ||
          ModelManager_1.ModelManager.PlotModel.InSeamlessFormation ||
          ModelManager_1.ModelManager.PlotModel.InDigitalScreen ||
          !ModelManager_1.ModelManager.GameModeModel.WorldDone ||
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "TrialRoleAdd",
          ),
          ControllerHolder_1.ControllerHolder.TeleportController.SetAllowTeleport(
            e.xb_,
            0,
          ),
          ControllerHolder_1.ControllerHolder.InstanceDungeonController.UpdateTrialRoleDungeonWhiteList(
            e.Ub_,
          );
        for (const o of e.C5n)
          ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.add(o);
        !ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
          0 < ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size &&
          ((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !0),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Role", 10, "进入角色试用状态");
      }),
      Net_1.Net.Register(18014, (e) => {
        ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
          !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation &&
          !ModelManager_1.ModelManager.PlotModel.InDigitalScreen &&
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "TrialRoleDetach",
          ),
          ControllerHolder_1.ControllerHolder.TeleportController.SetAllowTeleport(
            e.xb_,
            0,
          ),
          ControllerHolder_1.ControllerHolder.InstanceDungeonController.UpdateTrialRoleDungeonWhiteList(
            e.Ub_,
          );
        for (const o of e.C5n)
          ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.delete(o);
        ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
          ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size <= 0 &&
          ((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !1),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Role", 10, "角色试用状态结束");
      }),
      Net_1.Net.Register(20776, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillNodeData(
            e.Q6n,
            e.dxs,
          );
      }),
      Net_1.Net.Register(20581, (e) => {
        if (e) {
          var o = new Map(),
            r = e.zPs;
          for (const l of Object.keys(r)) {
            var t = Number(l);
            o.set(t, r[t]);
          }
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o),
            ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.JPs);
        }
      }),
      Net_1.Net.Register(26920, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorDataSingle(
            e.ZPs,
          );
      }),
      Net_1.Net.Register(29993, (e) => {
        e &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddFavorItem,
            [{ IncId: 0, ItemId: e.L8n }, e.m9n],
          );
      }),
      Net_1.Net.Register(19561, (e) => {
        if (e) {
          var o = new Map(),
            r = e.zPs;
          for (const l of Object.keys(r)) {
            var t = Number(l);
            o.set(t, r[t]);
          }
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o);
        }
      }),
      Net_1.Net.Register(22218, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorNewCanUnLockId(
            e,
          );
      }),
      Net_1.Net.Register(16855, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorLevelAndExp(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28447),
      Net_1.Net.UnRegister(17282),
      Net_1.Net.UnRegister(29631),
      Net_1.Net.UnRegister(19779),
      Net_1.Net.UnRegister(16427),
      Net_1.Net.UnRegister(21014),
      Net_1.Net.UnRegister(22041),
      Net_1.Net.UnRegister(28294),
      Net_1.Net.UnRegister(18014),
      Net_1.Net.UnRegister(20776),
      Net_1.Net.UnRegister(20581),
      Net_1.Net.UnRegister(26920),
      Net_1.Net.UnRegister(29993),
      Net_1.Net.UnRegister(22218),
      Net_1.Net.UnRegister(16855);
  }
  static IsInRoleTrial() {
    return ModelManager_1.ModelManager.RoleModel.IsInRoleTrial;
  }
  static SendPbUpLevelRoleRequest(e, o, r) {
    var t;
    !o ||
      o.length <= 0 ||
      (((t = Protocol_1.Aki.Protocol.K_s.create()).Q6n = e),
      (t.O9n = o),
      Net_1.Net.Call(26475, t, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.RoleModel.RoleLevelUpReceiveItem(
                e._vs,
              ),
              ModelManager_1.ModelManager.RoleModel.RoleLevelUp(
                e.Q6n,
                e.U8n,
                e.F6n,
              ),
              ModelManager_1.ModelManager.RoleModel.RoleLevelResponseData.ClearItemList(),
              r())
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                24801,
              ));
      }));
  }
  static SendPbOverRoleRequest(e) {
    var o = Protocol_1.Aki.Protocol.X_s.create();
    (o.Q6n = e),
      Net_1.Net.Call(25883, o, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.RoleModel.RoleBreakUp(e.Q6n, e.txs)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                15498,
              ));
      });
  }
  static SendPbUpLevelSkillRequest(o, r) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o);
      if (!e.IsTrialRole()) {
        var e = Protocol_1.Aki.Protocol.J_s.create(),
          t =
            ((e.Q6n = o),
            ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(r));
        e.r5n = t.SkillId;
        const l =
          ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(o, r);
        Net_1.Net.Call(17086, e, (e) => {
          e &&
            (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
              ? (this.ShowSkillTreeLevelUpSuccessView(r, l, o),
                ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(
                  e.Q6n,
                  e.ixs,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SkillTreeNodeLevelUp,
                  r,
                ))
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Cvs,
                  28476,
                ));
        });
      }
    }
  }
  static SendRoleLevelUpViewRequest(e, o, r = void 0) {
    var t = Protocol_1.Aki.Protocol._us.create();
    (t.Q6n = e),
      (t.O9n = o),
      (t.bHn = r),
      Net_1.Net.Call(16575, t, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(
                e,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                15175,
              ));
      });
  }
  static SendRoleLevelUpViewRequestWithOpenView(o, r = void 0) {
    var e = Protocol_1.Aki.Protocol._us.create();
    (e.Q6n = o),
      Net_1.Net.Call(16575, e, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(
                e,
              ),
              r
                ? (UiManager_1.UiManager.CloseView("RoleLevelUpView"),
                  UiManager_1.UiManager.CloseView("RoleBreachView"),
                  UiManager_1.UiManager.CloseView(r))
                : UiManager_1.UiManager.OpenView("RoleLevelUpView", o))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                15175,
              ));
      });
  }
  static SendRoleBreakThroughViewRequest(o, e = 0) {
    var r = Protocol_1.Aki.Protocol.cus.create();
    (r.Q6n = o),
      Net_1.Net.Call(16213, r, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.RoleModel.UpdateRoleBreachViewResponseData(
                e,
              ),
              UiManager_1.UiManager.OpenView("RoleBreachView", o))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                19981,
              ));
      });
  }
  static SendRoleSkillLevelUpViewRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.mus.create(),
      e =
        ((r.Q6n = e),
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o));
    (r.r5n = e.SkillId),
      Net_1.Net.Call(22675, r, (e) => {
        e &&
          e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            20259,
          );
      });
  }
  static SendResonanceUnlockRequest(e) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      const t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
      var o;
      t.IsTrialRole() ||
        (((o = Protocol_1.Aki.Protocol.Ius.create()).Q6n = e),
        Net_1.Net.Call(17341, o, (e) => {
          var o, r;
          e &&
            (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
              ? (t.GetResonanceData().SetResonantChainGroupIndex(e.mxs),
                (o = e.mxs - 1),
                (r = {
                  Title: "Text_ResonanceUnlockSuccess_Text",
                  TextList: [
                    {
                      TextId: (r =
                        ModelManager_1.ModelManager.RoleModel.GetRoleResonanceConfigList(
                          t,
                        ))[o].AttributesDescription,
                      Params: r[o].AttributesDescriptionParams,
                    },
                  ],
                }),
                RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
                  r,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
                ))
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.G9n,
                  23935,
                ));
        }));
    }
  }
  static SendRoleSkillViewRequest(e, o, r) {
    ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) ||
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    var t = ModelManager_1.ModelManager.RoleModel.GetCurRoleSkillViewDataLocal(
        e,
        o,
      ),
      e = ModelManager_1.ModelManager.RoleModel.GetNextRoleSkillViewDataLocal(
        e,
        o,
      );
    ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillViewData(t, e, o),
      r?.();
  }
  static OpenTeamRoleSelectView(e) {
    UiManager_1.UiManager.OpenView("TeamRoleSelectView", e);
  }
  static PlayRoleMontage(e, o = !1, r = !1, t = !1) {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
      ?.Model?.CheckGetComponent(14)
      ?.SetState(e, o, r, t);
  }
  static SendRoleActivateSkillRequest(o, r) {
    var e;
    RoleController.CheckCharacterInBattleTagAndShowTips() ||
      ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        o,
      ).IsTrialRole() ||
      (((e = Protocol_1.Aki.Protocol.Sus.create()).Q6n = o),
      (e.qHn = r),
      Net_1.Net.Call(20449, e, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (this.ShowSkillTreeLevelUpSuccessView(r, 0, o),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SkillTreeNodeActive,
                r,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                17778,
              ));
      }));
  }
  static SendRoleFavorListRequest() {
    var e = Protocol_1.Aki.Protocol.Uts.create();
    Net_1.Net.Call(27674, e, (e) => {
      e &&
        (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.JPs)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.G9n,
              27596,
            ));
    });
  }
  static SendRoleFavorUnLockRequest(e, r, o) {
    var t = Protocol_1.Aki.Protocol.kts.create();
    (t.H9n = e),
      (t.Q6n = r),
      (t.F7n = o),
      Net_1.Net.Call(23132, t, (e) => {
        var o;
        e &&
          ((o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            e.Q6n,
          ).GetFavorData()),
          e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? o.UpdateUnlockId(e.H9n, r, e.F7n)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                15542,
              ));
      });
  }
  static SendRoleActiveRequest(o) {
    var e = Protocol_1.Aki.Protocol.H_s.create();
    (e.Q6n = o),
      Net_1.Net.Call(24161, e, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RoleHandBookActive,
                o,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                16315,
              ));
      });
  }
  static CheckRoleTargetLevel(o) {
    var r = ModelManager_1.ModelManager.RoleModel.GetAllRoleList();
    if (r) {
      var t = r.length;
      for (let e = 0; e < t; e++) {
        var l = r[e].GetLevelData();
        if (l && l.GetLevel() > o) return !0;
      }
    }
    return !1;
  }
  static CheckRoleSkillTargetLevel(o) {
    var r = ModelManager_1.ModelManager.RoleModel.GetAllRoleList();
    if (r) {
      var t = r.length;
      for (let e = 0; e < t; e++) {
        var l = r[e].GetSkillData();
        if (l) {
          var a = l.GetAllSkillLevel(),
            n = a.length;
          for (let e = 0; e < n; e++) if (o <= a[e]) return !0;
        }
      }
    }
    return !1;
  }
  static ShowSkillTreeLevelUpSuccessView(e, o, r) {
    switch (
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).NodeType
    ) {
      case 4:
        this.ShowAttributeNodeLevelUpSuccessView(e);
        break;
      case 3:
        this.ShowOuterSkillNodeLevelUpSuccessView(e, r);
        break;
      case 1:
      case 2:
        this.ShowInnerSkillNodeLevelUpSuccessView(e, o);
    }
  }
  static ShowAttributeNodeLevelUpSuccessView(e) {
    (e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e)),
      (e = {
        Title: "Text_ResonanceUnlockSuccess_Text",
        TextList: [
          { TextId: e.PropertyNodeDescribe, Params: e.PropertyNodeParam },
        ],
      });
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
      e,
    );
  }
  static ShowOuterSkillNodeLevelUpSuccessView(e, o) {
    (e =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
        e,
      ).SkillId),
      (o = ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(
        e,
        o,
      )),
      (o = 0 < o ? o : e),
      (e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(o)),
      (o = {
        Title: "Text_ResonanceUnlockSuccess_Text",
        TextList: [{ TextId: e.SkillDescribe, Params: e.SkillDetailNum }],
      });
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
      o,
    );
  }
  static ShowInnerSkillNodeLevelUpSuccessView(e, o) {
    var r = [],
      t =
        ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetSkillEffect()
          ?.EffectDescList,
      l =
        ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetNextLevelSkillEffect()
          ?.EffectDescList;
    for (let e = 0; e < t.length; e++) {
      var a = t[e],
        n = l[e],
        _ =
          ModelManager_1.ModelManager.RoleModel.GetSkillAttributeNameByOneSkillEffect(
            a,
          ),
        a =
          ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
            a,
          ),
        n =
          ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
            n,
          );
      a !== n && r.push({ Name: _, ShowArrow: !0, PreText: a, CurText: n });
    }
    var e =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
          e,
        ).SkillId,
      i = o + 1,
      o = {
        LevelInfo: {
          PreUpgradeLv: o,
          UpgradeLv: i,
          FormatStringId: "Text_LevelShow_Text",
          IsMaxLevel:
            i ===
            ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e)
              .MaxSkillLevel,
        },
        WiderScrollView: !0,
        AttributeInfo: r,
      };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
      o,
    );
  }
  static async RobotRolePropRequest(e) {
    var o = Protocol_1.Aki.Protocol.zfs.create(),
      e = ((o.C5n = e), await Net_1.Net.CallAsync(28612, o));
    if (e)
      if (e.fMs === Protocol_1.Aki.Protocol.Q4n.KRs)
        for (const t of e.exs) {
          var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            t.Q6n,
          ).GetAttributeData();
          for (const l of t.bws) r.SetRoleBaseAttr(l.Z4n, l.e5n);
          for (const a of t.Bws) r.SetRoleAddAttr(a.Z4n, a.e5n);
          t.Qws &&
            ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(
              t.Qws,
            );
        }
      else
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.fMs,
          29411,
        );
  }
  static RoleSkinChangeRequest(o, r, t, l) {
    var e = Protocol_1.Aki.Protocol.Jg_.create();
    (e.Q6n = o),
      (e.Z7n = r),
      (e.wIl = t),
      Net_1.Net.Call(23029, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                25652,
              )
            : (t &&
                ((e =
                  ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(r)),
                ModelManager_1.ModelManager.WeaponSkinModel.UpdateWeaponSkinData(
                  o,
                  e.GetSuitWeaponSkinId(),
                )),
              ModelManager_1.ModelManager.RoleModel.UpdateRoleSkinInfo(o, r),
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "RoleSkinReplaceTip",
              ),
              l(r, t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleSkinChange,
                o,
              )));
      });
  }
}
(exports.RoleController = RoleController),
  ((_a = RoleController).F1o = () => {
    RoleController.OpenRoleMainView(0);
  }),
  (RoleController.CanOpenView = (e) => {
    if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10001)) return !1;
    if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterRoleTip",
        ),
        !1
      );
    var o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (
      2 ===
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentGroupLivingState(
          o,
        ) &&
      !_a.GO_()
    )
      return !1;
    return !0;
  }),
  (RoleController.xkt = () => {
    RoleController.SendRoleFavorListRequest();
  }),
  (RoleController.V1o = () => {
    for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotCreateRole,
        e,
      );
  }),
  (RoleController.H1o = () => {
    ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Role", 10, "切换地图,重置进入试用角色状态"),
      ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.clear(),
      (ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !1));
  }),
  (RoleController.iZe = () => {
    var e,
      o,
      r,
      t = ModelManager_1.ModelManager.RoleModel.GetRoleMap(),
      l = ModelManager_1.ModelManager.RoleModel.GetRoleRobotMap();
    for ([, e] of t)
      ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(e.GetRoleId()) ||
        ((o = e.GetRoleConfig()),
        (o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name)),
        e.SetRoleName(o));
    for ([, r] of l) {
      var a = r.GetRoleConfig(),
        a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(a.Name);
      r.SetName(a);
    }
  });
//# sourceMappingURL=RoleController.js.map
