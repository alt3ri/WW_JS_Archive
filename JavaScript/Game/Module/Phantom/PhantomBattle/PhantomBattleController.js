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
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AdventureDefine_1 = require("../../AdventureGuide/AdventureDefine"),
  HandBookController_1 = require("../../HandBook/HandBookController"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  PhantomUtil_1 = require("../PhantomUtil");
class PhantomBattleController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddPhantomItem,
      PhantomBattleController.K5i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnResponsePhantomItem,
        PhantomBattleController.Q5i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        PhantomBattleController.Nmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEquipPhantomItem,
        PhantomBattleController.X5i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        PhantomBattleController.JDe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddPhantomItem,
      PhantomBattleController.K5i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnResponsePhantomItem,
        PhantomBattleController.Q5i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        PhantomBattleController.Nmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEquipPhantomItem,
        PhantomBattleController.X5i,
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
    Net_1.Net.Register(17245, this.$5i),
      Net_1.Net.Register(17514, this.Y5i),
      Net_1.Net.Register(24491, this.J5i),
      Net_1.Net.Register(6200, this.z5i),
      Net_1.Net.Register(1381, this.Z5i),
      Net_1.Net.Register(22263, this.eVi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17245),
      Net_1.Net.UnRegister(17514),
      Net_1.Net.UnRegister(24491),
      Net_1.Net.UnRegister(6200),
      Net_1.Net.UnRegister(1381),
      Net_1.Net.UnRegister(22263);
  }
  static SendPhantomLevelUpRequest(n, e) {
    var t = new Protocol_1.Aki.Protocol.cns();
    (t.Ykn = n), (t.m8n = e);
    const r =
      ModelManager_1.ModelManager.PhantomBattleModel.CreatePhantomLevelCacheData(
        n,
      );
    Net_1.Net.Call(16951, Protocol_1.Aki.Protocol.cns.create(t), (e) => {
      var t,
        o = ModelManager_1.ModelManager.PhantomBattleModel;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Phantom", 28, "9903_返回请求幻象升级!!!!"),
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              19137,
            )
          : (o.ResetLevelUpItemData(),
            (t = PhantomBattleController.GetPhantomItemDataByUniqueId(
              e.aLs.Q5n,
            ))
              ? (t.SetData(e.aLs),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Phantom",
                    28,
                    "幻象升级返回",
                    ["升级幻象", e.aLs.Q5n],
                    ["升级等级", e.aLs.fDs],
                  ),
                o.PhantomLevelUpReceiveItem(e.Vms),
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
                  28,
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
        185,
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
              Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantVision,
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
            Log_1.Log.Debug("Phantom", 28, "9907_主动角色幻象装备信息"),
          ((s = new Protocol_1.Aki.Protocol.Cns()).Ykn = e),
          (s.l3n = t),
          (s.M3n = n),
          Net_1.Net.Call(11256, Protocol_1.Aki.Protocol.Cns.create(s), (e) => {
            if (
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Phantom", 28, "9908_返回角色幻象装备信息!!!!"),
              e.lkn === Protocol_1.Aki.Protocol.lkn.Sys)
            ) {
              var t = e.nUs;
              if (t) {
                for (const o of t)
                  ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(
                    o,
                  ),
                    ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(
                      o.l3n,
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
                  Log_1.Log.Error("Phantom", 28, "角色幻象装备数据异常");
            } else
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                29831,
              ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PhantomEquipError,
                );
          }));
    }
  }
  static SendPhantomRecommendRequest(e, t = void 0) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Phantom", 28, "10012_请求推荐角色幻象");
    var o = new Protocol_1.Aki.Protocol.Sns();
    (o.l3n = e),
      Net_1.Net.Call(5401, Protocol_1.Aki.Protocol.Sns.create(o), (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Phantom", 28, "10012_推荐角色幻象请求返回"),
          e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? (ModelManager_1.ModelManager.PhantomBattleModel.SetPhantomRecommendData(
                e,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.PhantomRecommendResponse,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                18868,
              ),
          t?.();
      });
  }
  static SendPhantomAutoPutRequest(t, o) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Phantom", 28, "10014_角色幻象一键装配请求!!!!"),
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        185,
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
            Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantVision,
          ),
        );
      (e = n && n.Entity.Active ? !0 : e)
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "VisionSkilling",
          )
        : RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
          (((n = new Protocol_1.Aki.Protocol.yns()).l3n = t),
          (n.c8n = o),
          Net_1.Net.Call(27277, Protocol_1.Aki.Protocol.yns.create(n), (e) => {
            if (
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Phantom",
                  28,
                  "10014_角色幻象一键装配返回!!!!",
                ),
              e.lkn === Protocol_1.Aki.Protocol.lkn.Sys)
            ) {
              var t = e.nUs;
              if (t) {
                for (const o of t)
                  ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(
                    o,
                  ),
                    ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(
                      o.l3n,
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
                  Log_1.Log.Error("Phantom", 28, "角色幻象装备数据异常!!!!");
            } else
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                3122,
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
      : (((o = new Protocol_1.Aki.Protocol.Rns()).Q5n = e),
        (o.I5n = t),
        (t = this.GetPhantomItemDataByUniqueId(e).GetPhantomSubProp()),
        (o = await Net_1.Net.CallAsync(22784, o)).lkn !==
        Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              o.lkn,
              7060,
            )
          : (PhantomBattleController.GetPhantomItemDataByUniqueId(
              o.aLs.Q5n,
            ).SetData(o.aLs),
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
        185,
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
            Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantVision,
          ),
        );
      (e = r && r.Entity.Active ? !0 : e)
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "VisionSkilling",
          )
        : RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
          (((r = new Protocol_1.Aki.Protocol.Uns()).Q5n = t),
          (r.u8n = o),
          (r.d8n = n),
          Net_1.Net.Call(21024, r, (e) => {
            e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  18569,
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
    if (
      ModelManager_1.ModelManager.CreatureModel.GetInstanceId() !==
      AdventureDefine_1.BigWorldID
    )
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
        Log_1.Log.Debug("AdventureGuide", 28, "手动探测怪物", ["探测Id", t]),
        ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(!0),
        ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
          Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster,
          e,
          t,
        );
    }
  }
  static async OpenPhantomBattleFetterView(e = 0) {
    await HandBookController_1.HandBookController.SendIllustratedInfoRequestAsync(
      [1],
    ),
      UiManager_1.UiManager.OpenView("PhantomBattleFettersView", e);
  }
  static tVi() {
    UiManager_1.UiManager.IsViewShow("VisionNewQualityView") ||
      !UiManager_1.UiManager.IsViewShow("BattleView") ||
      ModelManager_1.ModelManager.SundryModel.IsBlockTips ||
      UiManager_1.UiManager.OpenView(
        "VisionNewQualityView",
        ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.shift(),
      );
  }
  static iVi() {
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
    const a = r.CheckGetComponent(1),
      l = r.CheckGetComponent(10),
      _ =
        (l.StopAnimation(),
        t && this.SetMeshTransform(e),
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          o,
        ));
    if (
      ConfigManager_1.ConfigManager.SkeletalObserverConfig.GetMeshConfig(
        _.PhantomItem.MeshId,
      )
    ) {
      const i = r.CheckGetComponent(2);
      l.SetAnimationMode(1);
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetStandAnim(o);
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimationAsset, (t) => {
        t &&
          i.LoadModelByModelId(_.PhantomItem.MeshId, !0, () => {
            var e = t;
            l.PlayAnimation(e, !0),
              (e =
                ModelManager_1.ModelManager.PhantomBattleModel.GetMeshTransform(
                  o,
                )) &&
                a.MainMeshComponent?.K2_SetRelativeTransform(e, !1, void 0, !1),
              n?.();
          });
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
  static GetRecommendEquipUniqueIdList(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetRecommendEquipUniqueIdList(
      e,
    );
  }
  static async GetProgressCurveValue(e, t, o) {
    e = (
      await ModelManager_1.ModelManager.PhantomBattleModel.GetDragCurve()
    ).GetFloatValue(e);
    return t * (1 - e) + o * e;
  }
}
(exports.PhantomBattleController = PhantomBattleController),
  ((_a = PhantomBattleController).InitData = () => {}),
  (PhantomBattleController.Q5i = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 8, "新增幻象物品", ["phantomItem", e]),
      ModelManager_1.ModelManager.PhantomBattleModel.NewPhantomBattleData(e);
  }),
  (PhantomBattleController.K5i = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 8, "新增幻象物品", ["phantomItem", e]),
      ModelManager_1.ModelManager.PhantomBattleModel.NewPhantomBattleData(e);
  }),
  (PhantomBattleController.Nmi = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 8, "删除幻象物品", ["uniqueIdList", e]);
    for (const t of e)
      ModelManager_1.ModelManager.PhantomBattleModel.RemovePhantomBattleData(t);
  }),
  (PhantomBattleController.X5i = (e) => {
    for (const t of e.uDs)
      ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(t);
    for (const o of e.cDs)
      ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(
        o,
      );
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
  }),
  (PhantomBattleController.ChangeRoleEvent = (e) => {
    ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(e);
  }),
  (PhantomBattleController.J5i = (e) => {
    e.cDs.forEach((e) => {
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        e.l3n,
      ).Phrase(e);
    }),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRolePropUpdate);
  }),
  (PhantomBattleController.z5i = (e) => {
    ModelManager_1.ModelManager.PhantomBattleModel.SetMaxCost(e.dDs);
  }),
  (PhantomBattleController.eVi = (e) => {
    0 < e.lUs.length
      ? (ModelManager_1.ModelManager.PhantomBattleModel.CacheNewQualityData(e),
        TimerSystem_1.TimerSystem.Delay(() => {
          _a.tVi();
        }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime))
      : (e._Us.forEach((e) => {
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
        _a.iVi());
  }),
  (PhantomBattleController.Z5i = (e) => {
    e = e.hUs;
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
      _a.tVi();
    }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime);
  }),
  (PhantomBattleController.$5i = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Phantom",
        28,
        "9906_服务端主动推送所有角色装备的幻象信息!!!!",
      );
    e = e.uDs;
    if (e) {
      for (const t of e)
        ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(
          t,
        );
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Phantom", 28, "没有角色装备过幻象!!!!");
  }),
  (PhantomBattleController.Y5i = (e) => {
    e.aLs.forEach((e) => {
      PhantomBattleController.GetPhantomItemDataByUniqueId(e.Q5n).UpdateData(e);
    }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPhantomItemUpdate,
      );
  }),
  (PhantomBattleController.JDe = () => {
    0 <
      ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList
        .length && _a.tVi(),
      0 <
        ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList
          .length && _a.iVi();
  });
//# sourceMappingURL=PhantomBattleController.js.map
