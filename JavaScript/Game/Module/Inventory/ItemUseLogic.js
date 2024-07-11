"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemUseLogic = void 0);
const Log_1 = require("../../../Core/Common/Log");
const GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const UiPlayItemById_1 = require("../../../Core/Define/ConfigQuery/UiPlayItemById");
const CipherController_1 = require("../../LevelGamePlay/Cipher/CipherController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiManager_1 = require("../../Ui/UiManager");
const AcquireData_1 = require("../Acquire/AcquireData");
const BuffItemControl_1 = require("../BuffItem/BuffItemControl");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const PowerController_1 = require("../Power/PowerController");
const PowerDefines_1 = require("../Power/PowerDefines");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const InventoryGiftController_1 = require("./InventoryGiftController");
const InventoryGiftData_1 = require("./InventoryGiftData");
class ItemUseLogic {
  static Ici(e, r = 1, o = 0) {
    let n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(o, {
      ParamType: 0,
    });
    if (!n) return !1;
    if (n.GetConfigId > RoleDefine_1.ROBOT_DATA_MIN_ID)
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "NoneRole",
      );
    else {
      n = n?.EntityHandle?.Entity?.GetComponent(156);
      if (!n) return !1;
      const t = Math.ceil(
        n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life),
      );
      Math.ceil(
        n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn),
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
    const o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    return (
      !!o &&
      (o.Parameters.size === 0
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
    const o = UiPlayItemById_1.configUiPlayItemById.GetConfig(e);
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
    let o;
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
        var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        var t =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
        if (t && t.CanUseItem === 0)
          return (
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "Dungeon_BanItem",
              ),
            ),
            !0
          );
      }
      return ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
        e,
      ) > 0
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
                ? _a.Ici(e, r, n)
                : (UiManager_1.UiManager.OpenView("UseBuffItemView", e), !0));
    }
    return !1;
  }),
  (ItemUseLogic.TryUsePowerItem = (e, r = 0) =>
    e === PowerDefines_1.PowerConst.SingCube &&
    (PowerController_1.PowerController.RequestPowerViewData(), !0)),
  (ItemUseLogic.TryUseMonthCardItem = (e, r = 0) => {
    let o;
    let n;
    let t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
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
    if (o.GetType() !== 11) return !1;
    let n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    let t = n.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift);
    let i = !1;
    t ||
      ((t = n.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift)),
      (i = !0));
    const l =
      ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(t);
    if (!i)
      if (
        l.Type === GiftType_1.GiftType.Fixed ||
        l.Type === GiftType_1.GiftType.Random ||
        l.Type === GiftType_1.GiftType.RandomPhantom ||
        l.Type === GiftType_1.GiftType.CaptureMonster
      ) {
        const a =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
        const _ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
        const f = [];
        const o = [{ IncId: 0, ItemId: n.Id }, a];
        if ((f.push(o), a > 1)) {
          const s = new AcquireData_1.AcquireData();
          s.SetAcquireViewType(0),
            s.SetAmount(1),
            s.SetMaxAmount(a),
            s.SetRemainItemCount(a),
            s.SetItemData(f),
            s.SetNameText(_),
            s.SetRightButtonFunction(() => {
              ItemUseLogic.Tci(e, s.GetAmount());
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
        let g;
        let C;
        const u = [];
        for ([g, C] of l.Content) {
          const I = [{ IncId: 0, ItemId: g }, C];
          u.push(I);
        }
        n = new InventoryGiftData_1.InventoryGiftData(e, u, l);
        UiManager_1.UiManager.OpenView("InventoryGiftView", n);
      }
    return !0;
  }),
  (ItemUseLogic.Tci = (e, r) => {
    r > 0
      ? InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(
          e,
          r,
          void 0,
        )
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "NotEnoughItem",
        );
  });
// # sourceMappingURL=ItemUseLogic.js.map
