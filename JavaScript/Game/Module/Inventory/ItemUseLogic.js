"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemUseLogic = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  UiPlayItemById_1 = require("../../../Core/Define/ConfigQuery/UiPlayItemById"),
  CipherController_1 = require("../../LevelGamePlay/Cipher/CipherController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiManager_1 = require("../../Ui/UiManager"),
  AcquireData_1 = require("../Acquire/AcquireData"),
  BuffItemControl_1 = require("../BuffItem/BuffItemControl"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  PowerController_1 = require("../Power/PowerController"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  InventoryGiftController_1 = require("./InventoryGiftController"),
  InventoryGiftData_1 = require("./InventoryGiftData");
class ItemUseLogic {
  static Imi(e, r = 1, o = 0) {
    var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(o, {
      ParamType: 0,
    });
    if (!n) return !1;
    if (n.GetConfigId > RoleDefine_1.ROBOT_DATA_MIN_ID)
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "NoneRole",
      );
    else {
      n = n?.EntityHandle?.Entity?.GetComponent(158);
      if (!n) return !1;
      var t = Math.ceil(
        n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life),
      );
      Math.ceil(
        n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.e5n),
      ) <= t
        ? ((n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("HpFull")),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(n))
        : BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, r, o);
    }
    return !0;
  }
}
(exports.ItemUseLogic = ItemUseLogic),
  ((_a = ItemUseLogic).TryUseParameterItem = (e, r = 1) => {
    var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    return (
      !!o &&
      (0 === o.Parameters.size
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Inventory", 38, "使用道具失败,使用参数为空", [
              "ItemId",
              e,
            ]),
          !1)
        : (ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(
            e,
            r,
          ),
          !0))
    );
  }),
  (ItemUseLogic.TryUseUiPlayItem = (e, r = 0) => {
    if (!ItemInfoById_1.configItemInfoById.GetConfig(e).UiPlayItem) return !1;
    var o = UiPlayItemById_1.configUiPlayItemById.GetConfig(e);
    if (!o) return !1;
    switch (o.Type) {
      case "Cipher":
        CipherController_1.CipherController.OpenCipherView(o.UiPlayKey);
        break;
      case "SignalBreak":
        UiManager_1.UiManager.OpenView("SignalDecodeView", o.UiPlayKey);
    }
    return !0;
  }),
  (ItemUseLogic.TryUseBattlePassItem = (e, r = 0) => {
    var o;
    return (
      (e === ModelManager_1.ModelManager.BattlePassModel.PrimaryItemId ||
        e === ModelManager_1.ModelManager.BattlePassModel.AdvanceItemId) &&
      ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
        ModelManager_1.ModelManager.BattlePassModel.GetBattlePassItemConfirmId(
          e,
        ),
      )).FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(
          e,
          1,
        );
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      ),
      !0)
    );
  }),
  (ItemUseLogic.TryUseBuffItem = (e, r = 1, o = !1, n = 0) => {
    if (ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(e)) {
      if (
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
      ) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
        if (t && 0 === t.CanUseItem)
          return (
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "Dungeon_BanItem",
              ),
            ),
            !0
          );
      }
      return 0 <
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e)
        ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "UseBuffCdText",
          ),
          !0)
        : ConfigManager_1.ConfigManager.BuffItemConfig.IsTeamBuffItem(e)
          ? (BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, 1, -1), !0)
          : (BuffItemControl_1.BuffItemControl.InitializeAllUseBuffItemRoleFromPlayerFormationInstance(
              e,
            ),
            ModelManager_1.ModelManager.BuffItemModel.GetAllUseBuffItemRole()
              .size <= 0
              ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "NoneRole",
                ),
                !0)
              : o
                ? _a.Imi(e, r, n)
                : (UiManager_1.UiManager.OpenView("UseBuffItemView", e), !0));
    }
    return !1;
  }),
  (ItemUseLogic.TryUsePowerItem = (e, r = 0) =>
    10800 === e &&
    (PowerController_1.PowerController.RequestPowerViewData(), !0)),
  (ItemUseLogic.TryUseMonthCardItem = (e, r = 0) => {
    var o,
      n,
      t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    let i = t.Parameters.get(
      ItemDefines_1.EItemFunctionType.ManualOpenMonthCard,
    );
    return (
      !!(i =
        i ||
        t.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard)) &&
      ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(132)),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name)),
      (n = ConfigManager_1.ConfigManager.MonthCardConfig.GetConfig(i).Days),
      o.SetTextArgs(t, n.toString()),
      o.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(
          e,
          1,
        );
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      ),
      !0)
    );
  }),
  (ItemUseLogic.TryUseGiftItem = (e, r = 0) => {
    const o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
    if (!o) return !1;
    if (11 !== o.GetType()) return !1;
    var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    let t = n.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift),
      i = !1;
    t ||
      ((t = n.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift)),
      (i = !0));
    var l =
      ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(t);
    if (!i)
      if (
        l.Type === GiftType_1.GiftType.Fixed ||
        l.Type === GiftType_1.GiftType.Random ||
        l.Type === GiftType_1.GiftType.RandomPhantom ||
        l.Type === GiftType_1.GiftType.CaptureMonster
      ) {
        var a =
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              e,
            ),
          _ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name),
          f = [];
        const o = [{ IncId: 0, ItemId: n.Id }, a];
        if ((f.push(o), 1 < a)) {
          const s = new AcquireData_1.AcquireData();
          s.SetAcquireViewType(0),
            s.SetAmount(1),
            s.SetMaxAmount(a),
            s.SetRemainItemCount(a),
            s.SetItemData(f),
            s.SetNameText(_),
            s.SetRightButtonFunction(() => {
              ItemUseLogic.Tmi(e, s.GetAmount());
            }),
            InventoryGiftController_1.InventoryGiftController.ShowAcquireView(
              s,
            );
        } else
          InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(
            e,
            1,
            void 0,
          );
      } else {
        var g,
          C,
          u = [];
        for ([g, C] of l.Content) {
          var I = [{ IncId: 0, ItemId: g }, C];
          u.push(I);
        }
        n = new InventoryGiftData_1.InventoryGiftData(e, u, l);
        UiManager_1.UiManager.OpenView("InventoryGiftView", n);
      }
    return !0;
  }),
  (ItemUseLogic.Tmi = (e, r) => {
    0 < r
      ? InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(
          e,
          r,
          void 0,
        )
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "NotEnoughItem",
        );
  });
//# sourceMappingURL=ItemUseLogic.js.map
