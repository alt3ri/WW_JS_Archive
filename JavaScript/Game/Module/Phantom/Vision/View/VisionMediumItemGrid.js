"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionMediumItemGrid = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class VisionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.Y6i = void 0),
      (this.NOe = 0),
      (this.kHi = void 0),
      (this.FHi = void 0),
      (this.VHi = void 0),
      (this.HHi = void 0),
      (this.jHi = () => {
        this.VHi?.(this, this.Y6i);
      }),
      (this.WHi = () => {
        this.HHi?.(this, this.Y6i);
      }),
      (this.c2e = () => {
        this.kHi?.(this.Y6i, this.NOe);
      });
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.c2e),
      this.BindOnExtendTogglePress(this.jHi),
      this.BindOnExtendToggleRelease(this.WHi);
  }
  SetOnPointDownCallBack(e) {
    this.VHi = e;
  }
  SetOnPointUpCallBack(e) {
    this.HHi = e;
  }
  SetClickToggleEvent(e) {
    this.kHi = e;
  }
  OnSelected(e) {
    this.GetItemGridExtendToggle().ToggleState !== 1 &&
      this.SetSelected(!0, !1),
      this.SetNewVisible(!1),
      this.SetRedDotVisible(
        ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
          this.Y6i.GetConfigId(),
        ),
      ),
      ModelManager_1.ModelManager.InventoryModel.RemoveNewAttributeItem(
        this.Y6i.GetUniqueId(),
      ),
      ModelManager_1.ModelManager.InventoryModel.SaveNewAttributeItemUniqueIdList();
  }
  OnDeselected(e) {
    this.GetItemGridExtendToggle().ToggleState !== 0 &&
      this.SetSelected(!1, !0);
  }
  SetOnRefreshEvent(e) {
    this.FHi = e;
  }
  CheckSelectedState(e) {
    return e === this.Y6i;
  }
  OnRefresh(e, t, i) {
    (this.Y6i = e), (this.NOe = i);
    var i = ModelManager_1.ModelManager.InventoryModel;
    const s = e.GetUniqueId();
    const o = i.IsNewAttributeItem(s);
    var i = i.GetPhantomItemData(s);
    const r = e.GetCurrentSlotData();
    const h = e.GetQuality();
    let l =
      !o &&
      ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
        e.GetConfigId(),
      );
    const d = {
      Type: 3,
      Data: e,
      ItemConfigId: e.GetConfigId(!0),
      BottomText: "+" + e.GetPhantomLevel().toString(),
      StarLevel: h,
      QualityId: h,
      IsLockVisible: i.GetIsLock(),
      IsRedDotVisible: l,
      IsNewVisible: o,
      Level: e.GetCost(),
      IsLevelTextUseChangeColor: !0,
      FetterGroupId: e.GetFetterGroupId(),
    };
    if (r.length > 0) {
      const a = r[0]?.SlotState ?? 1;
      const n = r[1]?.SlotState ?? 1;
      const M = r[2]?.SlotState ?? 1;
      switch (h) {
        case 3:
          d.VisionSlotStateList = [a];
          break;
        case 4:
          d.VisionSlotStateList = [a, n];
          break;
        case 5:
          d.VisionSlotStateList = [a, n, M];
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
      (d.VisionRoleHeadInfo = { RoleConfigId: i, VisionUniqueId: s }),
      (d.IsMainVisionVisible = l)),
      this.Apply(d),
      this.GetItemGridExtendToggle().ToggleState !== 0 &&
        this.SetSelected(!1, !0),
      this.FHi?.(this);
  }
}
exports.VisionMediumItemGrid = VisionMediumItemGrid;
// # sourceMappingURL=VisionMediumItemGrid.js.map
