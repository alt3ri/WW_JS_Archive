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
      e.CharacterActorComponent.Entity.CheckGetComponent(188).HasTag(1996802261)
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
    Net_1.Net.Register(26994, (e) => {
      ModelManager_1.ModelManager.RoleModel.UpdateRoleInfoByServerData(e.F7n);
    }),
      Net_1.Net.Register(29901, (e) => {
        ModelManager_1.ModelManager.RoleModel.RoleAttrUpdate(
          e.O6n,
          e.Rws,
          e.Dws,
        );
      }),
      Net_1.Net.Register(27407, (e) => {
        var o = e.MUs.O6n;
        ModelManager_1.ModelManager.RoleModel.UpdateRoleInfo(e.MUs),
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
      Net_1.Net.Register(15841, (e) => {
        ModelManager_1.ModelManager.RoleModel.RoleLevelUp(e.O6n, e.M8n, e.P6n);
      }),
      Net_1.Net.Register(19299, (e) => {
        void 0 !== e &&
          ModelManager_1.ModelManager.RoleModel.RoleResonanceLockFinish(e);
      }),
      Net_1.Net.Register(27272, (e) => {
        void 0 !== e &&
          ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(e.O6n, e.Xws);
      }),
      Net_1.Net.Register(6769, (e) => {
        e && ModelManager_1.ModelManager.RoleModel.RoleNameUpdate(e.O6n, e.w8n);
      }),
      Net_1.Net.Register(21238, (e) => {
        if (
          !ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
          !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation
        ) {
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "TrialRoleAdd",
            );
          for (const o of e.s5n)
            ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.add(o);
          0 < ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size &&
            ((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !0),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Role", 11, "进入角色试用状态");
        }
      }),
      Net_1.Net.Register(10382, (e) => {
        if (
          ModelManager_1.ModelManager.RoleModel.IsInRoleTrial &&
          !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation
        ) {
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "TrialRoleDetach",
            );
          for (const o of e.s5n)
            ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.delete(o);
          ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size <= 0 &&
            ((ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = !1),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Role", 11, "角色试用状态结束");
        }
      }),
      Net_1.Net.Register(5393, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillNodeData(
            e.O6n,
            e.sxs,
          );
      }),
      Net_1.Net.Register(15487, (e) => {
        if (e) {
          var o = new Map(),
            r = e.jPs;
          for (const l of Object.keys(r)) {
            var t = Number(l);
            o.set(t, r[t]);
          }
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o),
            ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.HPs);
        }
      }),
      Net_1.Net.Register(11807, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorDataSingle(
            e.WPs,
          );
      }),
      Net_1.Net.Register(11743, (e) => {
        e &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddFavorItem,
            [{ IncId: 0, ItemId: e.f8n }, e.o9n],
          );
      }),
      Net_1.Net.Register(22049, (e) => {
        if (e) {
          var o = new Map(),
            r = e.jPs;
          for (const l of Object.keys(r)) {
            var t = Number(l);
            o.set(t, r[t]);
          }
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o);
        }
      }),
      Net_1.Net.Register(7042, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorNewCanUnLockId(
            e,
          );
      }),
      Net_1.Net.Register(7016, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorLevelAndExp(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26994),
      Net_1.Net.UnRegister(29901),
      Net_1.Net.UnRegister(27407),
      Net_1.Net.UnRegister(15841),
      Net_1.Net.UnRegister(19299),
      Net_1.Net.UnRegister(27272),
      Net_1.Net.UnRegister(6769),
      Net_1.Net.UnRegister(21238),
      Net_1.Net.UnRegister(10382),
      Net_1.Net.UnRegister(5393),
      Net_1.Net.UnRegister(15487),
      Net_1.Net.UnRegister(11807),
      Net_1.Net.UnRegister(11743),
      Net_1.Net.UnRegister(7042),
      Net_1.Net.UnRegister(7016);
  }
  static IsInRoleTrial() {
    return ModelManager_1.ModelManager.RoleModel.IsInRoleTrial;
  }
  static SendPbUpLevelRoleRequest(e, o, r) {
    var t;
    !o ||
      o.length <= 0 ||
      (((t = Protocol_1.Aki.Protocol.N_s.create()).O6n = e),
      (t.U9n = o),
      Net_1.Net.Call(16958, t, (e) => {
        e &&
          (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? (ModelManager_1.ModelManager.RoleModel.RoleLevelUpReceiveItem(
                e.rvs,
              ),
              ModelManager_1.ModelManager.RoleModel.RoleLevelUp(
                e.O6n,
                e.M8n,
                e.P6n,
              ),
              ModelManager_1.ModelManager.RoleModel.RoleLevelResponseData.ClearItemList(),
              r())
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                24815,
              ));
      }));
  }
  static SendPbOverRoleRequest(e) {
    var o = Protocol_1.Aki.Protocol.V_s.create();
    (o.O6n = e),
      Net_1.Net.Call(22292, o, (e) => {
        e &&
          (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.RoleModel.RoleBreakUp(e.O6n, e.Qws)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                28089,
              ));
      });
  }
  static SendPbUpLevelSkillRequest(e, o) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
      if (!r.IsTrialRole()) {
        var r = Protocol_1.Aki.Protocol.H_s.create(),
          t =
            ((r.O6n = e),
            ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o));
        r.X4n = t.SkillId;
        const l =
          ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(e, o);
        Net_1.Net.Call(16775, r, (e) => {
          e &&
            (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
              ? (this.ShowSkillTreeLevelUpSuccessView(o, l),
                ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(
                  e.O6n,
                  e.Xws,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SkillTreeNodeLevelUp,
                  o,
                ))
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.hvs,
                  2542,
                ));
        });
      }
    }
  }
  static SendRoleLevelUpViewRequest(e, o, r = void 0) {
    var t = Protocol_1.Aki.Protocol.rus.create();
    (t.O6n = e),
      (t.U9n = o),
      (t.LHn = r),
      Net_1.Net.Call(18431, t, (e) => {
        e &&
          (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(
                e,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                20854,
              ));
      });
  }
  static SendRoleLevelUpViewRequestWithOpenView(o, r = void 0) {
    var e = Protocol_1.Aki.Protocol.rus.create();
    (e.O6n = o),
      Net_1.Net.Call(18431, e, (e) => {
        e &&
          (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? (ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(
                e,
              ),
              r
                ? (UiManager_1.UiManager.CloseView("RoleLevelUpView"),
                  UiManager_1.UiManager.CloseView("RoleBreachView"),
                  UiManager_1.UiManager.CloseView(r))
                : UiManager_1.UiManager.OpenView("RoleLevelUpView", o))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                20854,
              ));
      });
  }
  static SendRoleBreakThroughViewRequest(o, e = 0) {
    var r = Protocol_1.Aki.Protocol.nus.create();
    (r.O6n = o),
      Net_1.Net.Call(10132, r, (e) => {
        e &&
          (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? (ModelManager_1.ModelManager.RoleModel.UpdateRoleBreachViewResponseData(
                e,
              ),
              UiManager_1.UiManager.OpenView("RoleBreachView", o))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                24087,
              ));
      });
  }
  static SendRoleSkillLevelUpViewRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.aus.create(),
      e =
        ((r.O6n = e),
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o));
    (r.X4n = e.SkillId),
      Net_1.Net.Call(6427, r, (e) => {
        e &&
          e.hvs !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.hvs,
            24842,
          );
      });
  }
  static SendResonanceUnlockRequest(e) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      const t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
      var o;
      t.IsTrialRole() ||
        (((o = Protocol_1.Aki.Protocol.fus.create()).O6n = e),
        Net_1.Net.Call(21263, o, (e) => {
          var o, r;
          e &&
            (e.A9n === Protocol_1.Aki.Protocol.O4n.NRs
              ? (t.GetResonanceData().SetResonantChainGroupIndex(e.axs),
                (o = e.axs - 1),
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
                  e.A9n,
                  22764,
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
      (((r = Protocol_1.Aki.Protocol.mus.create()).O6n = e),
      (r.DHn = o),
      Net_1.Net.Call(10628, r, (e) => {
        e &&
          (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? (this.ShowSkillTreeLevelUpSuccessView(o, 0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SkillTreeNodeActive,
                o,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                1306,
              ));
      }));
  }
  static SendRoleFavorListRequest() {
    var e = Protocol_1.Aki.Protocol.Its.create();
    Net_1.Net.Call(3471, e, (e) => {
      e &&
        (e.A9n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.HPs)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.A9n,
              15439,
            ));
    });
  }
  static SendRoleFavorUnLockRequest(e, r, o) {
    var t = Protocol_1.Aki.Protocol.wts.create();
    (t.w9n = e),
      (t.O6n = r),
      (t.P7n = o),
      Net_1.Net.Call(15791, t, (e) => {
        var o;
        e &&
          ((o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            e.O6n,
          ).GetFavorData()),
          e.A9n === Protocol_1.Aki.Protocol.O4n.NRs
            ? o.UpdateUnlockId(e.w9n, r, e.P7n)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.A9n,
                13083,
              ));
      });
  }
  static SendRoleActiveRequest(o) {
    var e = Protocol_1.Aki.Protocol.G_s.create();
    (e.O6n = o),
      Net_1.Net.Call(8730, e, (e) => {
        e &&
          (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RoleHandBookActive,
                o,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.hvs,
                12536,
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
    var o = Protocol_1.Aki.Protocol.jfs.create(),
      e = ((o.s5n = e), await Net_1.Net.CallAsync(10819, o));
    if (e)
      if (e._Ms === Protocol_1.Aki.Protocol.O4n.NRs)
        for (const t of e.Kws) {
          var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            t.O6n,
          ).GetAttributeData();
          for (const l of t.Rws) r.SetRoleBaseAttr(l.j4n, l.W4n);
          for (const n of t.Dws) r.SetRoleAddAttr(n.j4n, n.W4n);
          t.Fws &&
            ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(
              t.Fws,
            );
        }
      else
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e._Ms,
          3838,
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
