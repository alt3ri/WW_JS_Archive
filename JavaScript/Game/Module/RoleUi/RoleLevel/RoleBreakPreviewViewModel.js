"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostContentItemContext =
    exports.RoleBreakPreviewContext =
    exports.RoleBreakPreviewViewModel =
      void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid"),
  RoleBreakPreviewView_1 = require("./RoleBreakPreviewView");
class RoleBreakPreviewViewModel {
  constructor() {
    (this.OLn = void 0),
      (this.kLn = void 0),
      (this.FLn = void 0),
      (this.VLn = -1),
      (this.CreateLevelLayoutGrid = () =>
        new RoleBreakPreviewView_1.LevelLayoutGrid(this)),
      (this.aPn = (t) => {
        var e = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e.ItemId,
        ),
          t.MediumItemGrid.SetSelected(!0, !0);
      }),
      (this.CreateItemLayoutGrid = () => {
        var t = new CostMediumItemGrid_1.CostMediumItemGrid();
        return t.BindOnExtendToggleClicked(this.aPn), t;
      });
  }
  Dispose() {
    (this.VLn = -1), this.UnbindView(), this.UnbindCostContentItem();
  }
  get CachedRoleInstance() {
    return this.FLn;
  }
  set CachedRoleInstance(t) {
    (this.FLn && t) || (this.FLn = t);
  }
  get ChosenLevel() {
    return this.VLn;
  }
  set ChosenLevel(t) {
    var e = this.CachedRoleInstance.GetLevelData().GetMaxBreachLevel();
    let s = t;
    s < 1 ? (s = 1) : s > e && (s = e),
      (this.VLn = s),
      (this.OLn.ChosenLevel = s),
      (this.kLn.ChosenLevel = s);
  }
  BindView(t) {
    this.OLn = new RoleBreakPreviewContext(this, t);
  }
  UnbindView() {
    this.OLn?.Dispose(), (this.OLn = void 0);
  }
  BindCostContentItem(t) {
    this.kLn = new CostContentItemContext(this, t);
  }
  UnbindCostContentItem() {
    this.kLn?.Dispose(), (this.kLn = void 0);
  }
  HandleViewOnStart() {
    var t = this.CachedRoleInstance.GetLevelData().GetBreachLevel();
    this.ChosenLevel = t + 1;
  }
  HandleCostContentItemOnStart() {
    var t = this.CachedRoleInstance.GetLevelData();
    this.kLn.ChosenLevel = t.GetBreachLevel();
  }
  HandleViewClosePromise(t) {
    t.then(() => {
      this.CachedRoleInstance = void 0;
    }).catch(() => {});
  }
  HandleItemOnClickToggle(t) {
    this.ChosenLevel = t + 1;
  }
  HandleClickLeft() {
    this.ChosenLevel = this.ChosenLevel - 1;
  }
  HandleClickRight() {
    this.ChosenLevel = this.ChosenLevel + 1;
  }
  BuildLevelLayoutData(e) {
    var s = [],
      i = this.CachedRoleInstance.GetLevelData(),
      o = i.GetBreachLevel();
    for (let t = 0; t < i.GetMaxBreachLevel(); t++) {
      var h = t + 1;
      s.push({ IsChosen: h === e, IsAvailable: t < o, LevelContent: h });
    }
    return s;
  }
  BuildItemLayoutData(t) {
    var e,
      s,
      i = this.CachedRoleInstance.GetLevelData(),
      o = i.GetBreachLevel() >= t,
      h = [];
    for ([e, s] of i.GetBreachConfig(t).BreachConsume)
      e !== ItemDefines_1.EItemId.Gold &&
        h.push({
          ItemId: e,
          Count: s,
          IncId: 0,
          SelectedCount: o
            ? 0
            : ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                e,
              ),
          OnlyTextFlag: o,
        });
    return h;
  }
  BuildCostContentItemData(t) {
    var e, s;
    let i = 0;
    for ([e, s] of this.CachedRoleInstance.GetLevelData().GetBreachConfig(t)
      .BreachConsume)
      if (e === ItemDefines_1.EItemId.Gold) {
        i = s;
        break;
      }
    return { CostNum: i, CostType: ItemDefines_1.EItemId.Gold };
  }
}
exports.RoleBreakPreviewViewModel = RoleBreakPreviewViewModel;
class RoleBreakPreviewContext {
  constructor(t, e) {
    (this.HLn = void 0),
      (this.jLn = void 0),
      (this.WLn = -1),
      (this.KLn = []),
      (this.QLn = void 0),
      (this.VLn = -1),
      (this.HLn = t),
      (this.jLn = e);
  }
  Dispose() {}
  get LevelContent() {
    return this.WLn;
  }
  set LevelContent(t) {
    (this.WLn = t), this.jLn.RefreshLevelContent(t);
  }
  get LevelLayout() {
    return this.KLn;
  }
  set LevelLayout(t) {
    (this.KLn = t), this.jLn.RefreshLevelLayout(t);
  }
  get ItemLayout() {
    return this.QLn;
  }
  set ItemLayout(t) {
    (this.QLn = t) && this.jLn.RefreshItemLayout(t);
  }
  get ChosenLevel() {
    return this.VLn;
  }
  set ChosenLevel(t) {
    this.VLn = t;
    var e = this.HLn.CachedRoleInstance.GetLevelData(),
      s = e.GetBreachLevel(),
      i = e.GetMaxBreachLevel(),
      e = e.GetBreachConfig(t).MaxLevel;
    t <= s
      ? (this.jLn.RefreshLevelContentItem(!1), this.jLn.RefreshHasBrokenTip(!0))
      : (this.jLn.RefreshLevelContentItem(!0),
        this.jLn.RefreshHasBrokenTip(!1),
        (this.LevelContent = e)),
      this.jLn.RefreshLeftButton(1 !== t),
      this.jLn.RefreshRightButton(t !== i),
      (this.LevelLayout = this.HLn.BuildLevelLayoutData(t)),
      (this.ItemLayout = this.HLn.BuildItemLayoutData(t));
  }
}
exports.RoleBreakPreviewContext = RoleBreakPreviewContext;
class CostContentItemContext {
  constructor(t, e) {
    (this.HLn = void 0),
      (this.XLn = void 0),
      (this.$Ln = 0),
      (this.YLn = ItemDefines_1.EItemId.Gold),
      (this.VLn = -1),
      (this.HLn = t),
      (this.XLn = e);
  }
  Dispose() {}
  get CostNumber() {
    return this.$Ln;
  }
  set CostNumber(t) {
    (this.$Ln = t), this.XLn.RefreshCostNumber(t.toString());
  }
  get MoneyIcon() {
    return this.YLn;
  }
  set MoneyIcon(t) {
    (this.YLn = t), this.XLn.RefreshMoneyIcon(t);
  }
  get ChosenLevel() {
    return this.VLn;
  }
  set ChosenLevel(t) {
    this.VLn = t;
    t = this.HLn.BuildCostContentItemData(t);
    t
      ? ((this.CostNumber = t.CostNum),
        (this.MoneyIcon = t.CostType),
        this.XLn.Show())
      : this.XLn.Hide();
  }
}
exports.CostContentItemContext = CostContentItemContext;
//# sourceMappingURL=RoleBreakPreviewViewModel.js.map
