"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleController = void 0);
const UE = require("ue"),
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
  static OpenRoleMainView(e, o = 0, r = [], t = void 0, l) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(e);
    e.Init(r, o, t), UiManager_1.UiManager.OpenView("RoleRootView", e, l);
  }
  static CloseAndOpenRoleMainView(e, o, r = 0, t = [], l = void 0, n) {
    o = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(o);
    o.Init(t, r, l),
      UiManager_1.UiManager.CloseAndOpenView(e, "RoleRootView", o, n);
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
      e.CharacterActorComponent.Entity.CheckGetComponent(190).HasTag(1996802261)
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
  static OnSelectedRoleChange(e) {
    this.RefreshUiSceneRoleActor(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectedRoleChanged,
      );
  }
  static RefreshUiSceneRoleActor(e, o = void 0) {
    const r = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    r.Model?.CheckGetComponent(11)?.RoleDataId !== e &&
      (r.Model?.CheckGetComponent(12)?.LoadModelByRoleDataId(e, !0, () => {
        o?.(), UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(r);
      }),
      UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(r, !0));
  }
  static OnSelectedRoleChangeByConfig(e) {
    this.RefreshUiSceneRoleActorByConfigId(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectedRoleChanged,
      );
  }
  static RefreshUiSceneRoleActorByConfigId(e, o = void 0) {
    const r = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    r.Model?.CheckGetComponent(11)?.RoleDataId !== e &&
      (r.Model?.CheckGetComponent(12)?.LoadModelByRoleConfigId(e, !0, () => {
        o?.(), UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(r);
      }),
      UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(r, !0));
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
    Net_1.Net.Register(28965, (e) => {
      ModelManager_1.ModelManager.RoleModel.UpdateRoleInfoByServerData(e.Y7n);
    }),
      Net_1.Net.Register(19273, (e) => {
        ModelManager_1.ModelManager.RoleModel.RoleAttrUpdate(
          e.Q6n,
          e.bws,
          e.Bws,
        );
      }),
      Net_1.Net.Register(20701, (e) => {
        var o = e.RUs.Q6n;
        ModelManager_1.ModelManager.RoleModel.UpdateRoleInfo(e.RUs),
          ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
            o,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoleSelectionListUpdate,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActiveRole,
            o,
          );
      }),
      Net_1.Net.Register(28326, (e) => {
        ModelManager_1.ModelManager.RoleModel.RoleLevelUp(e.Q6n, e.U8n, e.F6n);
      }),
      Net_1.Net.Register(21573, (e) => {
        void 0 !== e &&
          ModelManager_1.ModelManager.RoleModel.RoleResonanceLockFinish(e);
      }),
      Net_1.Net.Register(25484, (e) => {
        void 0 !== e &&
          ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(e.Q6n, e.ixs);
      }),
      Net_1.Net.Register(20591, (e) => {
        e && ModelManager_1.ModelManager.RoleModel.RoleNameUpdate(e.Q6n, e.H8n);
      }),
      Net_1.Net.Register(18159, (e) => {
        if (
          !(
            ModelManager_1.ModelManager.RoleModel.IsInRoleTrial ||
            ModelManager_1.ModelManager.PlotModel.InSeamlessFormation ||
            ModelManager_1.ModelManager.PlotModel.InDigitalScreen
          )
        ) {
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "TrialRoleAdd",
            );
          for (const o of e.C5n)
            ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.add(o);
          0 < ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size &&
            ((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !0),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Role", 11, "进入角色试用状态");
        }
      }),
      Net_1.Net.Register(28860, (e) => {
        if (
          ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
          !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation &&
          !ModelManager_1.ModelManager.PlotModel.InDigitalScreen
        ) {
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "TrialRoleDetach",
            );
          for (const o of e.C5n)
            ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.delete(o);
          ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size <= 0 &&
            ((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !1),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Role", 11, "角色试用状态结束");
        }
      }),
      Net_1.Net.Register(16910, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillNodeData(
            e.Q6n,
            e.dxs,
          );
      }),
      Net_1.Net.Register(24651, (e) => {
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
      Net_1.Net.Register(20449, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorDataSingle(
            e.ZPs,
          );
      }),
      Net_1.Net.Register(25157, (e) => {
        e &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddFavorItem,
            [{ IncId: 0, ItemId: e.L8n }, e.m9n],
          );
      }),
      Net_1.Net.Register(22928, (e) => {
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
      Net_1.Net.Register(27823, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorNewCanUnLockId(
            e,
          );
      }),
      Net_1.Net.Register(20383, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorLevelAndExp(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28965),
      Net_1.Net.UnRegister(19273),
      Net_1.Net.UnRegister(20701),
      Net_1.Net.UnRegister(28326),
      Net_1.Net.UnRegister(21573),
      Net_1.Net.UnRegister(25484),
      Net_1.Net.UnRegister(20591),
      Net_1.Net.UnRegister(18159),
      Net_1.Net.UnRegister(28860),
      Net_1.Net.UnRegister(16910),
      Net_1.Net.UnRegister(24651),
      Net_1.Net.UnRegister(20449),
      Net_1.Net.UnRegister(25157),
      Net_1.Net.UnRegister(27823),
      Net_1.Net.UnRegister(20383);
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
      Net_1.Net.Call(18996, t, (e) => {
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
                28087,
              ));
      }));
  }
  static SendPbOverRoleRequest(e) {
    var o = Protocol_1.Aki.Protocol.X_s.create();
    (o.Q6n = e),
      Net_1.Net.Call(23217, o, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.RoleModel.RoleBreakUp(e.Q6n, e.txs)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                27433,
              ));
      });
  }
  static SendPbUpLevelSkillRequest(e, o) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
      if (!r.IsTrialRole()) {
        var r = Protocol_1.Aki.Protocol.J_s.create(),
          t =
            ((r.Q6n = e),
            ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o));
        r.r5n = t.SkillId;
        const l =
          ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(e, o);
        Net_1.Net.Call(21711, r, (e) => {
          e &&
            (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
              ? (this.ShowSkillTreeLevelUpSuccessView(o, l),
                ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(
                  e.Q6n,
                  e.ixs,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SkillTreeNodeLevelUp,
                  o,
                ))
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Cvs,
                  20315,
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
      Net_1.Net.Call(19848, t, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(
                e,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                20610,
              ));
      });
  }
  static SendRoleLevelUpViewRequestWithOpenView(o, r = void 0) {
    var e = Protocol_1.Aki.Protocol._us.create();
    (e.Q6n = o),
      Net_1.Net.Call(19848, e, (e) => {
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
                20610,
              ));
      });
  }
  static SendRoleBreakThroughViewRequest(o, e = 0) {
    var r = Protocol_1.Aki.Protocol.cus.create();
    (r.Q6n = o),
      Net_1.Net.Call(15774, r, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.RoleModel.UpdateRoleBreachViewResponseData(
                e,
              ),
              UiManager_1.UiManager.OpenView("RoleBreachView", o))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                29489,
              ));
      });
  }
  static SendRoleSkillLevelUpViewRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.mus.create(),
      e =
        ((r.Q6n = e),
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o));
    (r.r5n = e.SkillId),
      Net_1.Net.Call(24683, r, (e) => {
        e &&
          e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            22659,
          );
      });
  }
  static SendResonanceUnlockRequest(e) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      const t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
      var o;
      t.IsTrialRole() ||
        (((o = Protocol_1.Aki.Protocol.Ius.create()).Q6n = e),
        Net_1.Net.Call(21156, o, (e) => {
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
                  29418,
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
      ?.Model?.CheckGetComponent(13)
      ?.SetState(e, o, r, t);
  }
  static SendRoleActivateSkillRequest(e, o) {
    var r;
    RoleController.CheckCharacterInBattleTagAndShowTips() ||
      ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        e,
      ).IsTrialRole() ||
      (((r = Protocol_1.Aki.Protocol.Sus.create()).Q6n = e),
      (r.qHn = o),
      Net_1.Net.Call(23164, r, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (this.ShowSkillTreeLevelUpSuccessView(o, 0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SkillTreeNodeActive,
                o,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                24059,
              ));
      }));
  }
  static SendRoleFavorListRequest() {
    var e = Protocol_1.Aki.Protocol.Uts.create();
    Net_1.Net.Call(17566, e, (e) => {
      e &&
        (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.JPs)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.G9n,
              29109,
            ));
    });
  }
  static SendRoleFavorUnLockRequest(e, r, o) {
    var t = Protocol_1.Aki.Protocol.kts.create();
    (t.H9n = e),
      (t.Q6n = r),
      (t.F7n = o),
      Net_1.Net.Call(16633, t, (e) => {
        var o;
        e &&
          ((o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            e.Q6n,
          ).GetFavorData()),
          e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? o.UpdateUnlockId(e.H9n, r, e.F7n)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                17640,
              ));
      });
  }
  static SendRoleActiveRequest(o) {
    var e = Protocol_1.Aki.Protocol.H_s.create();
    (e.Q6n = o),
      Net_1.Net.Call(26310, e, (e) => {
        e &&
          (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RoleHandBookActive,
                o,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                27549,
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
          var n = l.GetAllSkillLevel(),
            a = n.length;
          for (let e = 0; e < a; e++) if (o <= n[e]) return !0;
        }
      }
    }
    return !1;
  }
  static ShowSkillTreeLevelUpSuccessView(e, o) {
    switch (
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).NodeType
    ) {
      case 4:
        this.ShowAttributeNodeLevelUpSuccessView(e);
        break;
      case 3:
        this.ShowOuterSkillNodeLevelUpSuccessView(e);
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
  static ShowOuterSkillNodeLevelUpSuccessView(e) {
    (e =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
        e,
      ).SkillId),
      (e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e)),
      (e = {
        Title: "Text_ResonanceUnlockSuccess_Text",
        TextList: [{ TextId: e.SkillDescribe, Params: e.SkillDetailNum }],
      });
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
      e,
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
      var n = t[e],
        a = l[e],
        _ =
          ModelManager_1.ModelManager.RoleModel.GetSkillAttributeNameByOneSkillEffect(
            n,
          ),
        n =
          ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
            n,
          ),
        a =
          ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
            a,
          );
      n !== a && r.push({ Name: _, ShowArrow: !0, PreText: n, CurText: a });
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
      e = ((o.C5n = e), await Net_1.Net.CallAsync(27414, o));
    if (e)
      if (e.fMs === Protocol_1.Aki.Protocol.Q4n.KRs)
        for (const t of e.exs) {
          var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            t.Q6n,
          ).GetAttributeData();
          for (const l of t.bws) r.SetRoleBaseAttr(l.Z4n, l.e5n);
          for (const n of t.Bws) r.SetRoleAddAttr(n.Z4n, n.e5n);
          t.Qws &&
            ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(
              t.Qws,
            );
        }
      else
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.fMs,
          19349,
        );
  }
}
((exports.RoleController = RoleController).F1o = () => {
  RoleController.OpenRoleMainView(0);
}),
  (RoleController.CanOpenView = (e) => {
    var o;
    return (
      !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10001) &&
      (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
        ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "PhantomFormationEnterRoleTip",
          ),
          !1)
        : ((o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
          2 !==
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentGroupLivingState(
              o,
            )))
    );
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
        Log_1.Log.Info("Role", 11, "切换地图,重置进入试用角色状态"),
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
      var n = r.GetRoleConfig(),
        n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(n.Name);
      r.SetName(n);
    }
  });
//# sourceMappingURL=RoleController.js.map
