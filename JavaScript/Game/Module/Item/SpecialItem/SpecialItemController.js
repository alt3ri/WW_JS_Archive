"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialItemController = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const RouletteController_1 = require("../../Roulette/RouletteController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const ItemDefines_1 = require("../Data/ItemDefines");
class SpecialItemController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.k6e),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemUse,
        this.Ydi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddCommonItemNotify,
        this.Jdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$mi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
        this.zdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnEquipSpecialItem,
        this.Zdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemUse,
      this.k6e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemUse,
        this.Ydi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddCommonItemNotify,
        this.Jdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$mi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
        this.zdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnEquipSpecialItem,
        this.Zdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
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
    const t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(
        185,
      );
    if (!t) return e.AllowTags.length === 0;
    for (const o of e.AllowTags) {
      const r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o);
      if (!r || !t.HasTag(r)) return !1;
    }
    for (const n of e.BanTags) {
      const l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n);
      if (l && t.HasTag(l)) return !1;
    }
    return !0;
  }
  static ListenSpecialItemRelatedTags(e, t) {
    if (SpecialItemController.IsSpecialItem(e)) {
      const r = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
      if (r) {
        const l = t?.Entity?.GetComponent(185);
        SpecialItemController.StopListenSpecialItemRelatedTags();
        for (const a of r.AllowTags) {
          const o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
          o &&
            (l?.AddTagAddOrRemoveListener(o, SpecialItemController.eCi),
            ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.add(
              o,
            ));
        }
        for (const i of r.BanTags) {
          const n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
          n &&
            (l?.AddTagAddOrRemoveListener(n, SpecialItemController.eCi),
            ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.add(
              n,
            ));
        }
        (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = e),
          (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle =
            t);
      }
    }
  }
  static StopListenSpecialItemRelatedTags() {
    const e =
      ModelManager_1.ModelManager.SpecialItemModel?.TagWatchedEntityHandle?.Entity?.GetComponent(
        185,
      );
    if (e)
      for (const t of ModelManager_1.ModelManager.SpecialItemModel
        .WatchedAllowTagIds)
        e.RemoveTagAddOrRemoveListener(t, SpecialItemController.eCi);
    if (
      (ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.clear(),
      e)
    )
      for (const r of ModelManager_1.ModelManager.SpecialItemModel
        .WatchedBanTagIds)
        e.RemoveTagAddOrRemoveListener(r, SpecialItemController.eCi);
    ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.clear(),
      (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = 0),
      (ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle =
        void 0);
  }
  static EquipSpecialItem(t, r = !0, l = !0) {
    let e;
    ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() &&
      ((e = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(t))
        ? e.SpecialItemType !== 0
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
    const t =
      e ===
      ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
    return (
      t
        ? SpecialItemController.UnEquipSpecialItem(e)
        : SpecialItemController.EquipSpecialItem(e),
      !t
    );
  }
  static tCi(e, t, r) {
    let l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    l?.Valid &&
      (l = l.GetComponent(33)).Valid &&
      l.BeginSkill(r, { Context: "Explore skill item: UseSkill" });
  }
}
(exports.SpecialItemController = SpecialItemController),
  ((_a = SpecialItemController).$mi = (e) => {
    let t;
    void 0 === e
      ? SpecialItemController.StopListenSpecialItemRelatedTags()
      : ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
        SpecialItemController.ListenSpecialItemRelatedTags(e, t));
  }),
  (SpecialItemController.xie = (e, t) => {
    const r = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId;
    r &&
      (SpecialItemController.StopListenSpecialItemRelatedTags(),
      SpecialItemController.ListenSpecialItemRelatedTags(r, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        r,
        e,
      ));
  }),
  (SpecialItemController.eCi = (e, t) => {
    const r = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId;
    const l =
      ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle;
    r &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
        r,
        l,
      );
  }),
  (SpecialItemController.Jdi = (e) => {
    for (const t of e)
      SpecialItemController.IsSpecialItem(t.Ekn) &&
        SpecialItemController.EquipSpecialItem(t.Ekn);
  }),
  (SpecialItemController.Ydi = (e, t) => {
    let r;
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
  (SpecialItemController.zdi = (e, t = !0) => {
    SpecialItemController.EquipSpecialItem(e, t);
  }),
  (SpecialItemController.Zdi = (e) => {
    SpecialItemController.UnEquipSpecialItem(e);
  }),
  (SpecialItemController.k6e = (e, t) => {
    let r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    r.Parameters.size &&
      SpecialItemController.IsSpecialItem(e) &&
      (r = r.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill)) &&
      _a.tCi(e, t, r);
  });
// # sourceMappingURL=SpecialItemController.js.map
