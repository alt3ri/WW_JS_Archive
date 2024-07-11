"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryMediumItemGrid = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  RED_TICK_HEX = "bf5c5c",
  TICK_COLOR_HEX = "663738",
  RED_TICK_ALPHA = 0.9;
class InventoryMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.rmi = void 0), (this.nmi = void 0);
  }
  OnRefresh(e, t, i) {
    var r = (this.rmi = e).GetItemViewInfo(),
      o = r.ItemDataType,
      s = r.QualityId,
      l = 1 === e.GetItemOperationType(),
      a = {
        Type: 4,
        Data: e,
        ItemConfigId: e.GetConfigId(),
        StarLevel: s,
        IsNewVisible: r.IsNewItem,
        IsLockVisible: r.IsLock,
        CoolDown: this.GetRemainingCoolDownTime(),
        TotalCoolDown: this.GetTotalCoolDownTime(),
        IsRedDotVisible: r.HasRedDot,
        IsDisable: l && !e.IsItemCanDestroy(),
        IsCheckTick: r.IsSelectOn,
      };
    switch (o) {
      case 0:
        var n = this.rmi.GetItemDataBase();
        r.SelectOnNum
          ? ((d = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ItemRecycleChosen_text",
            )),
            (d = StringUtils_1.StringUtils.Format(
              d,
              r.SelectOnNum.toString(),
              e.GetCount().toString(),
            )),
            (a.BottomText = d))
          : (a.BottomText = e.GetCount().toString()),
          (a.IsTimeFlagVisible = n.IsLimitTimeItem()),
          (a.BuffIconType = n.GetConfig().ItemBuffType),
          (a.IsOmitBottomText = !1);
        break;
      case 2:
        var d = this.rmi.GetItemDataBase().GetUniqueId(),
          n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(d);
        (a.BottomTextId = "Text_LevelShow_Text"),
          (a.BottomTextParameter = [n.GetLevel()]),
          (a.Level = n.GetResonanceLevel()),
          (a.RoleHeadInfo = { RoleConfigId: n.GetRoleId() });
        break;
      case 3:
        var _,
          d = this.rmi.GetItemDataBase().GetUniqueId(),
          n =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              d,
            ),
          h = n.GetCurrentSlotData();
        if (
          ((a.Level = n.GetCost()),
          (a.IsLevelTextUseChangeColor = !0),
          (a.BottomText = "+" + n.GetPhantomLevel().toString()),
          (a.IsOmitBottomText = !0),
          0 < h.length)
        ) {
          var C = h[0]?.SlotState ?? 0,
            c = h[1]?.SlotState ?? 0,
            I = h[2]?.SlotState ?? 0;
          switch (s) {
            case 3:
              a.VisionSlotStateList = [C];
              break;
            case 4:
              a.VisionSlotStateList = [C, c];
              break;
            case 5:
              a.VisionSlotStateList = [C, c, I];
          }
        }
        ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
          d,
        ) &&
          ((h = n.GetUniqueId()),
          (d =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
              h,
            )),
          (_ =
            ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(
              h,
            )),
          (a.VisionRoleHeadInfo = { RoleConfigId: d, VisionUniqueId: h }),
          (a.IsMainVisionVisible = _)),
          (a.VisionFetterGroupId = n.GetFetterGroupId());
        break;
      default:
        a.BottomText = e.GetCount().toString();
    }
    this.Apply(a),
      this.SetCheckTickPerformance(
        r.IsSelectOn,
        RED_TICK_HEX,
        RED_TICK_ALPHA,
        TICK_COLOR_HEX,
      ),
      this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  GetRemainingCoolDownTime() {
    var e = this.rmi.GetConfigId();
    return ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e);
  }
  GetTotalCoolDownTime() {
    var e = this.rmi.GetConfigId();
    return ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(e);
  }
  RefreshCoolDown() {
    var e = this.GetRemainingCoolDownTime(),
      t = this.GetTotalCoolDownTime();
    this.SetCoolDown(e, t);
  }
  BindOnItemButtonClickedCallback(e) {
    this.nmi = e;
  }
  OnExtendToggleStateChanged(e) {
    this.nmi && this.nmi(this.rmi);
  }
}
exports.InventoryMediumItemGrid = InventoryMediumItemGrid;
//# sourceMappingURL=InventoryMediumItemGrid.js.map
