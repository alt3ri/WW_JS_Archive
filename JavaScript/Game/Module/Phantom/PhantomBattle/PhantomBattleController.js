"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomBattleController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  HandBookController_1 = require("../../HandBook/HandBookController"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  PhantomUtil_1 = require("../PhantomUtil");
class PhantomBattleController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddPhantomItem,
      PhantomBattleController.WVi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnResponsePhantomItem,
        PhantomBattleController.KVi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        PhantomBattleController.Ndi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEquipPhantomItem,
        PhantomBattleController.QVi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        PhantomBattleController.JDe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddPhantomItem,
      PhantomBattleController.WVi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnResponsePhantomItem,
        PhantomBattleController.KVi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        PhantomBattleController.Ndi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEquipPhantomItem,
        PhantomBattleController.QVi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        PhantomBattleController.JDe,
      );
  }
  static GetPhantomItemDataByUniqueId(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
      e,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19844, this.XVi),
      Net_1.Net.Register(21454, this.$Vi),
      Net_1.Net.Register(18518, this.YVi),
      Net_1.Net.Register(15062, this.JVi),
      Net_1.Net.Register(29825, this.zVi),
      Net_1.Net.Register(29722, this.ZVi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19844),
      Net_1.Net.UnRegister(21454),
      Net_1.Net.UnRegister(18518),
      Net_1.Net.UnRegister(15062),
      Net_1.Net.UnRegister(29825),
      Net_1.Net.UnRegister(29722);
  }
  static SendPhantomLevelUpRequest(n, e) {
    var t = new Protocol_1.Aki.Protocol.Cls();
    (t.w5n = n), (t.tHn = e);
    const r =
      ModelManager_1.ModelManager.PhantomBattleModel.CreatePhantomLevelCacheData(
        n,
      );
    Net_1.Net.Call(22735, Protocol_1.Aki.Protocol.Cls.create(t), (e) => {
      var t,
        o = ModelManager_1.ModelManager.PhantomBattleModel;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Phantom", 27, "9903_返回请求幻象升级!!!!"),
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              25229,
            )
          : (o.ResetLevelUpItemData(),
            (t = PhantomBattleController.GetPhantomItemDataByUniqueId(
              e.xPs.b9n,
            ))
              ? (t.SetData(e.xPs),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Phantom",
                    27,
                    "幻象升级返回",
                    ["升级幻象", e.xPs.b9n],
                    ["升级等级", e.xPs.$ws],
                  ),
                o.PhantomLevelUpReceiveItem(e._vs),
                o.CachePhantomLevelUpData(r),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PhantomLevelUp,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PhantomLevelUpWithId,
                  n,
                ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Phantom",
                  27,
                  "幻象升级返回，获取phantomBattleData异常",
                ));
    });
  }
  static TryShowReceiveItem() {
    var e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetTempSaveItemList();
    if (0 < e.length) {
      var t = [];
      for (const r of e) {
        var o = r[0],
          n = r[1],
          n = new RewardItemData_1.RewardItemData(o.ItemId, n, o.IncId);
        t.push(n);
      }
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1008, t),
        ModelManager_1.ModelManager.PhantomBattleModel.ClearTempSaveItemList();
    }
  }
  static SendPhantomPutOnRequest(e, t, n, r = -1, a = !1) {
    if (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        203,
      ).HasTag(-1720844833)
    )
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "VisionSkilling",
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PhantomEquipError,
        );
    else {
      var o =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem
            .GetConfigId,
        l =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
            e,
          ),
        _ =
          ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e),
        i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
            t,
            n,
          ),
        s =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
            i,
          ),
        i =
          ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
      if ((o === l && 0 < l && _) || (o === s && 0 < s && i)) {
        let e = !1;
        (l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id),
          (_ = EntitySystem_1.EntitySystem.Get(l)),
          (o = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
            _,
            Number(
              Protocol_1.Aki.Protocol.Summon.x3s
                .Proto_ESummonTypeConcomitantVision,
            ),
          ));
        if ((e = o && o.Entity.Active ? !0 : e))
          return (
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "VisionSkilling",
            ),
            void EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PhantomEquipError,
            )
          );
      }
      RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PhantomEquipError,
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Phantom", 27, "9907_主动角色幻象装备信息"),
          ((s = new Protocol_1.Aki.Protocol.vls()).w5n = e),
          (s.Q6n = t),
          (s.l8n = n),
          Net_1.Net.Call(28002, Protocol_1.Aki.Protocol.vls.create(s), (e) => {
            if (
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Phantom", 27, "9908_返回角色幻象装备信息!!!!"),
              e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)
            ) {
              var t = e.UBs;
              if (t) {
                for (const o of t)
                  ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(
                    o,
                  ),
                    ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(
                      o.Q6n,
                    );
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PhantomEquip,
                ),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
                    r,
                    n,
                    a,
                  );
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Phantom", 27, "角色幻象装备数据异常");
            } else
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                21068,
              ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PhantomEquipError,
                );
          }));
    }
  }
  static SendPhantomAutoPutRequest(t, o) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Phantom", 27, "10014_角色幻象一键装配请求!!!!"),
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        203,
      ).HasTag(-1720844833))
    )
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "VisionSkilling",
      );
    else {
      let e = !1;
      var n = EntitySystem_1.EntitySystem.Get(
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id,
        ),
        n = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          n,
          Number(
            Protocol_1.Aki.Protocol.Summon.x3s
              .Proto_ESummonTypeConcomitantVision,
          ),
        );
      (e = n && n.Entity.Active ? !0 : e)
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "VisionSkilling",
          )
        : RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
          (((n = new Protocol_1.Aki.Protocol.Lls()).Q6n = t),
          (n.eHn = o),
          Net_1.Net.Call(20791, Protocol_1.Aki.Protocol.Lls.create(n), (e) => {
            if (
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Phantom",
                  27,
                  "10014_角色幻象一键装配返回!!!!",
                ),
              e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)
            ) {
              var t = e.UBs;
              if (t) {
                for (const o of t)
                  ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(
                    o,
                  ),
                    ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(
                      o.Q6n,
                    );
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PhantomEquip,
                ),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
                    0,
                    0,
                    !1,
                  );
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Phantom", 27, "角色幻象装备数据异常!!!!");
            } else
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24967,
              );
          }));
    }
  }
  static async RequestPhantomIdentify(e, t) {
    var o;
    RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PhantomEquipError,
        )
      : (((o = new Protocol_1.Aki.Protocol.Pls()).b9n = e),
        (o.m9n = t),
        (t = this.GetPhantomItemDataByUniqueId(e).GetPhantomSubProp()),
        (o = await Net_1.Net.CallAsync(19888, o)).Q4n !==
        Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              o.Q4n,
              18869,
            )
          : (PhantomBattleController.GetPhantomItemDataByUniqueId(
              o.xPs.b9n,
            ).SetData(o.xPs),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnVisionIdentify,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnVisionIdentifyWithId,
              e,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnVisionIdentifyDoAnimation,
              e,
              t,
            )));
  }
  static PhantomSkinChangeRequest(t, o, n) {
    if (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        203,
      ).HasTag(-1720844833)
    )
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "VisionSkilling",
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PhantomEquipError,
        );
    else {
      let e = !1;
      var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id,
        r = EntitySystem_1.EntitySystem.Get(r),
        r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          r,
          Number(
            Protocol_1.Aki.Protocol.Summon.x3s
              .Proto_ESummonTypeConcomitantVision,
          ),
        );
      (e = r && r.Entity.Active ? !0 : e)
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "VisionSkilling",
          )
        : RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
          (((r = new Protocol_1.Aki.Protocol.bls()).b9n = t),
          (r.Z7n = o),
          (r.iHn = n),
          Net_1.Net.Call(19392, r, (e) => {
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  29953,
                )
              : ((e =
                  PhantomBattleController.GetPhantomItemDataByUniqueId(
                    t,
                  )).SetSkinId(o),
                n &&
                  ModelManager_1.ModelManager.PhantomBattleModel.SetDefaultSkin(
                    e.GetConfig().MonsterId,
                    o,
                  ),
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
                  "PhantomSkinUse",
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnVisionSkinEquip,
                ));
          }));
    }
  }
  static RequestForTraceMonster(t) {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "DungeonDetection",
      );
    else {
      var o =
        ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().get(
          t,
        );
      let e =
        ControllerHolder_1.ControllerHolder.AdventureGuideController.GetValidMonsterEntityIdsOfDetectConf(
          o.Conf,
        );
      if (!e.length) {
        o = o.Conf.EntityConfigId;
        if (!o)
          return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "NoMonster",
          );
        e = [o];
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AdventureGuide", 27, "手动探测怪物", ["探测Id", t]),
        ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(!0),
        ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
          Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster,
          e,
          t,
        );
    }
  }
  static async OpenPhantomBattleFetterView(e, t) {
    await HandBookController_1.HandBookController.SendIllustratedInfoRequestAsync(
      [1],
    ),
      UiManager_1.UiManager.OpenView("PhantomBattleFettersView", [e, t]);
  }
  static e6i() {
    var e;
    UiManager_1.UiManager.IsViewShow("VisionNewQualityView") ||
      !UiManager_1.UiManager.IsViewShow("BattleView") ||
      ModelManager_1.ModelManager.SundryModel.IsBlockTips ||
      ((e =
        ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.shift()) &&
        UiManager_1.UiManager.OpenView("VisionNewQualityView", e));
  }
  static t6i() {
    UiManager_1.UiManager.IsViewShow("CalabashUnlockItemView") ||
      !UiManager_1.UiManager.IsViewShow("BattleView") ||
      ModelManager_1.ModelManager.SundryModel.IsBlockTips ||
      UiManager_1.UiManager.OpenView(
        "CalabashUnlockItemView",
        ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift(),
      );
  }
  static CheckIsEquip(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(
      e,
    );
  }
  static CheckIsEquipByMonsterId(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckMonsterIsEquipOnRole(
      t,
      e,
    );
  }
  static CheckIsMain(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e);
  }
  static CheckIsSub(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsSub(e);
  }
  static CheckFetterActivate(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckFetterActiveState(
      t,
      e,
    );
  }
  static CheckPhantomIsUnlock(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(e);
  }
  static GetEquipRole(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
      e,
    );
  }
  static SetMeshShow(o, n, e, t = !0) {
    var r = e.Model;
    const a =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
        o,
      );
    var l = a.PhantomItem.MeshId,
      _ = r.CheckGetComponent(0);
    if (_?.ModelConfigId === l) 2 === _.GetModelLoadState() && n?.();
    else if (
      ConfigManager_1.ConfigManager.SkeletalObserverConfig.GetMeshConfig(l)
    ) {
      const i = r.CheckGetComponent(1),
        s = r.CheckGetComponent(10),
        M =
          (s.StopAnimation(),
          t && this.SetMeshTransform(e),
          r.CheckGetComponent(2));
      s.SetAnimationMode(1);
      _ = ModelManager_1.ModelManager.PhantomBattleModel.GetStandAnim(o);
      ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.AnimationAsset, (t) => {
        t &&
          M.LoadModelByModelId(
            a.PhantomItem.MeshId,
            !0,
            () => {
              var e = t;
              s.PlayAnimation(e, !0),
                (e =
                  ModelManager_1.ModelManager.PhantomBattleModel.GetMeshTransform(
                    o,
                  )) &&
                  i.SetAllMeshComponentRelativeTransform(e, !1, void 0, !1),
                n?.();
            },
            void 0,
          );
      });
    }
  }
  static SetMeshTransform(e) {
    e.Model.CheckGetComponent(1).SetTransformByTag("MonsterCase");
  }
  static GetEquipState(e, t, o) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetRolePhantomEquipState(
      e,
      t,
      o,
    );
  }
  static GetEquipByIndex(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
      e,
      t,
    );
  }
  static GetLevelUpItemList(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomLevelUpItemSortList(
      e,
    );
  }
  static GetLevelUpNeedCost(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetLevelUpNeedCost(e);
  }
  static GetMaxLevel(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomMaxLevel(e);
  }
  static CheckPhantomLevelSatisfied(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckIfHasPhantomSatisfiedLevelCondition(
      e,
      t,
    );
  }
  static CheckHasPhantomMaxLevel() {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckIfHasPhantomLevelMax();
  }
  static async GetProgressCurveValue(e, t, o) {
    e = (
      await ModelManager_1.ModelManager.PhantomBattleModel.GetDragCurve()
    ).GetFloatValue(e);
    return t * (1 - e) + o * e;
  }
  static RecordVisionLevelUpSettingRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpSettingRedDot,
      !0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshVisionLevelUpSettingRedPoint,
      );
  }
}
(exports.PhantomBattleController = PhantomBattleController),
  ((_a = PhantomBattleController).InitData = () => {}),
  (PhantomBattleController.KVi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Phantom", 37, "新增幻象物品", ["phantomItem", e]),
      ModelManager_1.ModelManager.PhantomBattleModel.NewPhantomBattleData(e);
  }),
  (PhantomBattleController.WVi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Phantom", 37, "新增幻象物品", ["phantomItem", e]),
      ModelManager_1.ModelManager.PhantomBattleModel.NewPhantomBattleData(e);
  }),
  (PhantomBattleController.Ndi = (e) => {
    for (const t of e)
      ModelManager_1.ModelManager.PhantomBattleModel.RemovePhantomBattleData(t);
  }),
  (PhantomBattleController.QVi = (e) => {
    for (const t of e.Gws)
      ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(t);
    for (const o of e.Ows)
      ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(
        o,
      );
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
  }),
  (PhantomBattleController.ChangeRoleEvent = (e) => {
    ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(e);
  }),
  (PhantomBattleController.YVi = (e) => {
    e.Ows.forEach((e) => {
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        e.Q6n,
      ).Phrase(e);
    }),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRolePropUpdate);
  }),
  (PhantomBattleController.JVi = (e) => {
    ModelManager_1.ModelManager.PhantomBattleModel.SetMaxCost(e.kws);
  }),
  (PhantomBattleController.ZVi = (e) => {
    0 < e.BBs.length
      ? (ModelManager_1.ModelManager.PhantomBattleModel.CacheNewQualityData(e),
        TimerSystem_1.TimerSystem.Delay(() => {
          _a.e6i();
        }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime))
      : (e.qBs.forEach((e) => {
          var t =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
                e,
              ).QualityId,
            o =
              ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
          ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.push(
            [e, o, t],
          );
        }),
        _a.t6i());
  }),
  (PhantomBattleController.zVi = (e) => {
    e = e.bBs;
    ModelManager_1.ModelManager.PhantomBattleModel.ConcatUnlockSkinList(e);
    for (const t of e)
      ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
        t,
      ),
        ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
          LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
        ),
        ModelManager_1.ModelManager.PhantomBattleModel.CacheNewSkinData(t);
    TimerSystem_1.TimerSystem.Delay(() => {
      _a.e6i();
    }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime);
  }),
  (PhantomBattleController.XVi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Phantom",
        27,
        "9906_服务端主动推送所有角色装备的幻象信息!!!!",
      );
    e = e.Gws;
    if (e) {
      for (const t of e)
        ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(
          t,
        );
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Phantom", 27, "没有角色装备过幻象!!!!");
  }),
  (PhantomBattleController.$Vi = (e) => {
    e.xPs.forEach((e) => {
      PhantomBattleController.GetPhantomItemDataByUniqueId(e.b9n).UpdateData(e);
    }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPhantomItemUpdate,
      );
  }),
  (PhantomBattleController.JDe = () => {
    0 <
      ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList
        .length && _a.e6i(),
      0 <
        ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList
          .length && _a.t6i();
  });
//# sourceMappingURL=PhantomBattleController.js.map
