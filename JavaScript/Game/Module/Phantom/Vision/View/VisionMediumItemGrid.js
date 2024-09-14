"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionMediumItemGrid = void 0);
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class VisionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.NOe = 0),
      (this.Nji = void 0),
      (this.Oji = void 0),
      (this.kji = void 0),
      (this.Fji = void 0),
      (this.Vji = () => {
        this.kji?.(this, this.$8i);
      }),
      (this.Hji = () => {
        this.Fji?.(this, this.$8i);
      }),
      (this.RFe = () => {
        this.Nji?.(this.$8i, this.NOe);
      });
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.RFe),
      this.BindOnExtendTogglePress(this.Vji),
      this.BindOnExtendToggleRelease(this.Hji);
  }
  SetOnPointDownCallBack(e) {
    this.kji = e;
  }
  SetOnPointUpCallBack(e) {
    this.Fji = e;
  }
  SetClickToggleEvent(e) {
    this.Nji = e;
  }
  OnSelected(e) {
    1 !== this.GetItemGridExtendToggle().ToggleState &&
      this.SetSelected(!0, !1),
      this.SetNewVisible(!1),
      this.SetRedDotVisible(
        ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
          this.$8i.GetConfigId(),
        ),
      ),
      ModelManager_1.ModelManager.InventoryModel.RemoveNewAttributeItem(
        this.$8i.GetUniqueId(),
      ),
      ModelManager_1.ModelManager.InventoryModel.SaveNewAttributeItemUniqueIdList();
  }
  OnDeselected(e) {
    0 !== this.GetItemGridExtendToggle().ToggleState &&
      this.SetSelected(!1, !0);
  }
  SetOnRefreshEvent(e) {
    this.Oji = e;
  }
  CheckSelectedState(e) {
    return e === this.$8i;
  }
  OnRefresh(e, t, i) {
    (this.$8i = e), (this.NOe = i);
    var i = ModelManager_1.ModelManager.InventoryModel,
      s = e.GetUniqueId(),
      o = i.IsNewAttributeItem(s),
      i = i.GetPhantomItemData(s),
      r = e.GetCurrentSlotData(),
      h = e.GetQuality(),
      l =
        !o &&
        ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
          e.GetConfigId(),
        ),
      a = {
        Type: 3,
        Data: e,
        ItemConfigId: e.GetConfigId(!0),
        BottomText: "+" + e.GetPhantomLevel().toString(),
        StarLevel: h,
        QualityId: h,
        IsLockVisible: i.GetIsLock(),
        IsDeprecate: i.GetIsDeprecated(),
        IsRedDotVisible: l,
        IsNewVisible: o,
        Level: e.GetCost(),
        IsLevelTextUseChangeColor: !0,
        FetterGroupId: e.GetFetterGroupId(),
      };
    if (0 < r.length) {
      var d = r[0]?.SlotState ?? 1,
        n = r[1]?.SlotState ?? 1,
        M = r[2]?.SlotState ?? 1;
      switch (h) {
        case 3:
          a.VisionSlotStateList = [d];
          break;
        case 4:
          a.VisionSlotStateList = [d, n];
          break;
        case 5:
          a.VisionSlotStateList = [d, n, M];
      }
    }
    ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
      s,
    ) &&
      ((i =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
          s,
        )),
      (l =
        ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(s)),
      (a.VisionRoleHeadInfo = { RoleConfigId: i, VisionUniqueId: s }),
      (a.IsMainVisionVisible = l)),
      this.Apply(a),
      0 !== this.GetItemGridExtendToggle().ToggleState &&
        this.SetSelected(!1, !0),
      this.Oji?.(this);
  }
}
exports.VisionMediumItemGrid = VisionMediumItemGrid;
//# sourceMappingURL=VisionMediumItemGrid.js.map
