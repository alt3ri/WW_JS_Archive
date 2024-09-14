"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialItemController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  RouletteController_1 = require("../../Roulette/RouletteController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  ItemDefines_1 = require("../Data/ItemDefines");
class SpecialItemController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.e9e),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemUse,
        this.YCi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddCommonItemNotify,
        this.JCi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$di,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
        this.zCi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnEquipSpecialItem,
        this.ZCi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.zYe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemUse,
      this.e9e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemUse,
        this.YCi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddCommonItemNotify,
        this.JCi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$di,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
        this.zCi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnEquipSpecialItem,
        this.ZCi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.zYe,
      );
  }
  static IsSpecialItem(e) {
    return !!ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e)
      ?.SpecialItem;
  }
  static AllowReqUseSpecialItem(e) {
    e = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
    if (!e) return !1;
    if (
      !e.UseInstance &&
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
    )
      return !1;
    if (!e.UseInMultiMode && ModelManager_1.ModelManager.GameModeModel.IsMulti)
      return !1;
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(
        190,
      );
    if (!t) return 0 === e.AllowTags.length;
    for (const n of e.AllowTags) {
      var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n);
      if (!r || !t.HasTag(r)) return !1;
    }
    for (const o of e.BanTags) {
      var l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o);
      if (l && t.HasTag(l)) return !1;
    }
    return !0;
  }
  static ListenSpecialItemRelatedTags(e, t) {
    if (SpecialItemController.IsSpecialItem(e)) {
      var r = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
      if (r) {
        var l = t?.Entity?.GetComponent(190);
        SpecialItemController.StopListenSpecialItemRelatedTags();
        for (const a of r.AllowTags) {
          var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
          n &&
            (l?.AddTagAddOrRemoveListener(n, SpecialItemController.egi),
            ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.add(
              n,
            ));
        }
        for (const i of r.BanTags) {
          var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
          o &&
            (l?.AddTagAddOrRemoveListener(o, SpecialItemController.egi),
            ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.add(
              o,
            ));
        }
        (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = e),
          (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle =
            t);
      }
    }
  }
  static StopListenSpecialItemRelatedTags() {
    var e =
      ModelManager_1.ModelManager.SpecialItemModel?.TagWatchedEntityHandle?.Entity?.GetComponent(
        190,
      );
    if (e)
      for (const t of ModelManager_1.ModelManager.SpecialItemModel
        .WatchedAllowTagIds)
        e.RemoveTagAddOrRemoveListener(t, SpecialItemController.egi);
    if (
      (ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.clear(),
      e)
    )
      for (const r of ModelManager_1.ModelManager.SpecialItemModel
        .WatchedBanTagIds)
        e.RemoveTagAddOrRemoveListener(r, SpecialItemController.egi);
    ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.clear(),
      (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = 0),
      (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle =
        void 0);
  }
  static EquipSpecialItem(t, r = !0, l = !0) {
    var e;
    ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() &&
      ((e = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(t))
        ? 0 !== e.SpecialItemType
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Item",
              38,
              "特殊道具配置类型无法装备",
              ["Id", t],
              ["SpecialItemType", e.SpecialItemType],
            )
          : ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                t,
              ) <= 0
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Item", 38, "背包中没有对应特殊道具,无法切换", [
                "Id",
                t,
              ])
            : ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() !==
                t
              ? ModelManager_1.ModelManager.RouletteModel.SaveCurrentRouletteData(
                  void 0,
                  void 0,
                  t,
                  !1,
                  (e) => {
                    e &&
                      (r &&
                        RouletteController_1.RouletteController.EquipItemSetRequest(
                          t,
                        ),
                      l) &&
                      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "ItemEquiped",
                      );
                  },
                )
              : r &&
                RouletteController_1.RouletteController.EquipItemSetRequest(t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Item",
            38,
            "特殊道具不存在,请检查是否配置t.特殊道具",
            ["Id", t],
          ));
  }
  static UnEquipSpecialItem(e) {
    ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() ===
      e &&
      ModelManager_1.ModelManager.RouletteModel.SaveCurrentRouletteData(
        void 0,
        void 0,
        0,
      );
  }
  static AutoEquipOrUnEquipSpecialItem(e) {
    var t =
      e ===
      ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
    return (
      t
        ? SpecialItemController.UnEquipSpecialItem(e)
        : SpecialItemController.EquipSpecialItem(e),
      !t
    );
  }
  static tgi(e, t, r) {
    var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    l?.Valid &&
      (l = l.GetComponent(34)).Valid &&
      l.BeginSkill(r, { Context: "Explore skill item: UseSkill" });
  }
}
(exports.SpecialItemController = SpecialItemController),
  ((_a = SpecialItemController).$di = (e) => {
    var t;
    void 0 === e
      ? SpecialItemController.StopListenSpecialItemRelatedTags()
      : ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
        SpecialItemController.ListenSpecialItemRelatedTags(e, t));
  }),
  (SpecialItemController.xie = (e, t) => {
    var r = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId;
    r &&
      (SpecialItemController.StopListenSpecialItemRelatedTags(),
      SpecialItemController.ListenSpecialItemRelatedTags(r, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        r,
        e,
      ));
  }),
  (SpecialItemController.zYe = () => {
    var e = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId,
      t = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle;
    e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        e,
        t,
      );
  }),
  (SpecialItemController.egi = (e, t) => {
    var r = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId,
      l = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle;
    r &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        r,
        l,
      );
  }),
  (SpecialItemController.JCi = (e) => {
    for (const t of e)
      SpecialItemController.IsSpecialItem(t.s5n) &&
        SpecialItemController.EquipSpecialItem(t.s5n);
  }),
  (SpecialItemController.YCi = (e, t) => {
    var r;
    SpecialItemController.IsSpecialItem(e)
      ? ((r = e),
        (r =
          ModelManager_1.ModelManager.SpecialItemModel.GetSpecialItemLogic(
            r,
          )).CheckUseCondition() && r.OnUse())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Item", 38, "特殊道具不存在,请检查是否配置t.特殊道具", [
          "Id",
          e,
        ]);
  }),
  (SpecialItemController.zCi = (e, t = !0) => {
    SpecialItemController.EquipSpecialItem(e, t);
  }),
  (SpecialItemController.ZCi = (e) => {
    SpecialItemController.UnEquipSpecialItem(e);
  }),
  (SpecialItemController.e9e = (e, t) => {
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    r.Parameters.size &&
      SpecialItemController.IsSpecialItem(e) &&
      (r = r.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill)) &&
      _a.tgi(e, t, r);
  });
//# sourceMappingURL=SpecialItemController.js.map
