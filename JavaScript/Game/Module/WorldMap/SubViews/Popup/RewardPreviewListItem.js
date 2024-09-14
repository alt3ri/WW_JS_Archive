"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardPreviewListItem = void 0);
const UE = require("ue"),
  DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class RewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.ConfigId = 0);
  }
  OnRefresh(e, t, r) {
    this.ConfigId = e[0];
    var i = e[1];
    if (
      1 ===
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        this.ConfigId,
      )
    ) {
      var a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.ConfigId,
      );
      const o = {
        Data: e,
        Type: 2,
        ItemConfigId: this.ConfigId,
        BottomText: i && 0 < i ? "" + i : "",
        QualityId: a.QualityId,
      };
      void this.Apply(o);
    } else {
      const o = {
        Data: e,
        Type: 4,
        ItemConfigId: this.ConfigId,
        BottomText: i && 0 < i ? "" + i : "",
      };
      this.Apply(o);
    }
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      this.ConfigId,
    );
  }
}
class RewardPreviewListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.X2o = void 0),
      (this.$2o = void 0),
      (this.Y2o = () => new RewardItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIGridLayout],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    this.$2o = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(2),
      this.Y2o,
    );
  }
  Refresh(e, t, r) {
    this.X2o = e;
    var e = this.X2o[0],
      i = this.X2o[1],
      i = DropPackageById_1.configDropPackageById.GetConfig(i),
      a = e === ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      o =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "World_Level_Text",
          e,
        ),
        this.GetItem(1).SetUIActive(a),
        []),
      e = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      s =
        ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(
          e,
        );
    for (const d of i.DropPreview) {
      var n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          d[0],
        ),
        l = s.QualityDropWeight.get(n.QualityId) ?? 0;
      (n &&
        n.ShowTypes.includes(ItemDefines_1.CALABASH_ITEM_SHOW_TYPE) &&
        l <= 0) ||
        o.push(d);
    }
    o.sort((e, t) => e[0] - t[0]), this.$2o?.RefreshByData(o);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.RewardPreviewListItem = RewardPreviewListItem;
//# sourceMappingURL=RewardPreviewListItem.js.map
