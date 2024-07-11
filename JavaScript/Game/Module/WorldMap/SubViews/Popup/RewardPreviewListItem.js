"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardPreviewListItem = void 0);
const UE = require("ue"),
  DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
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
      var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.ConfigId,
      );
      const a = {
        Data: e,
        Type: 2,
        ItemConfigId: this.ConfigId,
        BottomText: i && 0 < i ? "" + i : "",
        QualityId: o.QualityId,
      };
      void this.Apply(a);
    } else {
      const a = {
        Data: e,
        Type: 4,
        ItemConfigId: this.ConfigId,
        BottomText: i && 0 < i ? "" + i : "",
      };
      this.Apply(a);
    }
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
      (this.Jko = void 0),
      (this.zko = void 0),
      (this.Zko = () => new RewardItem());
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
    this.zko = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(2),
      this.Zko,
    );
  }
  Refresh(e, t, r) {
    this.Jko = e;
    var e = this.Jko[0],
      i = this.Jko[1],
      i = DropPackageById_1.configDropPackageById.GetConfig(i),
      o = e === ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      a =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "World_Level_Text",
          e,
        ),
        this.GetItem(1).SetUIActive(o),
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
        a.push(d);
    }
    a.sort((e, t) => e[0] - t[0]), this.zko?.RefreshByData(a);
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
