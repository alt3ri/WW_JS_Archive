"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostContentItemContext =
    exports.RoleBreakPreviewContext =
    exports.RoleBreakPreviewViewModel =
      void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid");
const RoleBreakPreviewView_1 = require("./RoleBreakPreviewView");
class RoleBreakPreviewViewModel {
  constructor() {
    (this.eLn = void 0),
      (this.tLn = void 0),
      (this.iLn = void 0),
      (this.oLn = -1),
      (this.CreateLevelLayoutGrid = () =>
        new RoleBreakPreviewView_1.LevelLayoutGrid(this)),
      (this.xRn = (t) => {
        const e = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e.ItemId,
        ),
          t.MediumItemGrid.SetSelected(!0, !0);
      }),
      (this.CreateItemLayoutGrid = () => {
        const t = new CostMediumItemGrid_1.CostMediumItemGrid();
        return t.BindOnExtendToggleClicked(this.xRn), t;
      });
  }
  Dispose() {
    (this.oLn = -1), this.UnbindView(), this.UnbindCostContentItem();
  }
  get CachedRoleInstance() {
    return this.iLn;
  }
  set CachedRoleInstance(t) {
    (this.iLn && t) || (this.iLn = t);
  }
  get ChosenLevel() {
    return this.oLn;
  }
  set ChosenLevel(t) {
    const e = this.CachedRoleInstance.GetLevelData().GetMaxBreachLevel();
    let s = t;
    s < 1 ? (s = 1) : s > e && (s = e),
      (this.oLn = s),
      (this.eLn.ChosenLevel = s),
      (this.tLn.ChosenLevel = s);
  }
  BindView(t) {
    this.eLn = new RoleBreakPreviewContext(this, t);
  }
  UnbindView() {
    this.eLn?.Dispose(), (this.eLn = void 0);
  }
  BindCostContentItem(t) {
    this.tLn = new CostContentItemContext(this, t);
  }
  UnbindCostContentItem() {
    this.tLn?.Dispose(), (this.tLn = void 0);
  }
  HandleViewOnStart() {
    const t = this.CachedRoleInstance.GetLevelData().GetBreachLevel();
    this.ChosenLevel = t + 1;
  }
  HandleCostContentItemOnStart() {
    const t = this.CachedRoleInstance.GetLevelData();
    this.tLn.ChosenLevel = t.GetBreachLevel();
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
    const s = [];
    const i = this.CachedRoleInstance.GetLevelData();
    const o = i.GetBreachLevel();
    for (let t = 0; t < i.GetMaxBreachLevel(); t++) {
      const h = t + 1;
      s.push({ IsChosen: h === e, IsAvailable: t < o, LevelContent: h });
    }
    return s;
  }
  BuildItemLayoutData(t) {
    let e;
    let s;
    const i = this.CachedRoleInstance.GetLevelData();
    const o = i.GetBreachLevel() >= t;
    const h = [];
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
    let e, s;
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
    (this.rLn = void 0),
      (this.nLn = void 0),
      (this.sLn = -1),
      (this.aLn = []),
      (this.hLn = void 0),
      (this.oLn = -1),
      (this.rLn = t),
      (this.nLn = e);
  }
  Dispose() {}
  get LevelContent() {
    return this.sLn;
  }
  set LevelContent(t) {
    (this.sLn = t), this.nLn.RefreshLevelContent(t);
  }
  get LevelLayout() {
    return this.aLn;
  }
  set LevelLayout(t) {
    (this.aLn = t), this.nLn.RefreshLevelLayout(t);
  }
  get ItemLayout() {
    return this.hLn;
  }
  set ItemLayout(t) {
    (this.hLn = t) && this.nLn.RefreshItemLayout(t);
  }
  get ChosenLevel() {
    return this.oLn;
  }
  set ChosenLevel(t) {
    this.oLn = t;
    var e = this.rLn.CachedRoleInstance.GetLevelData();
    const s = e.GetBreachLevel();
    const i = e.GetMaxBreachLevel();
    var e = e.GetBreachConfig(t).MaxLevel;
    t <= s
      ? (this.nLn.RefreshLevelContentItem(!1), this.nLn.RefreshHasBrokenTip(!0))
      : (this.nLn.RefreshLevelContentItem(!0),
        this.nLn.RefreshHasBrokenTip(!1),
        (this.LevelContent = e)),
      this.nLn.RefreshLeftButton(t !== 1),
      this.nLn.RefreshRightButton(t !== i),
      (this.LevelLayout = this.rLn.BuildLevelLayoutData(t)),
      (this.ItemLayout = this.rLn.BuildItemLayoutData(t));
  }
}
exports.RoleBreakPreviewContext = RoleBreakPreviewContext;
class CostContentItemContext {
  constructor(t, e) {
    (this.rLn = void 0),
      (this.lLn = void 0),
      (this._Ln = 0),
      (this.uLn = ItemDefines_1.EItemId.Gold),
      (this.oLn = -1),
      (this.rLn = t),
      (this.lLn = e);
  }
  Dispose() {}
  get CostNumber() {
    return this._Ln;
  }
  set CostNumber(t) {
    (this._Ln = t), this.lLn.RefreshCostNumber(t.toString());
  }
  get MoneyIcon() {
    return this.uLn;
  }
  set MoneyIcon(t) {
    (this.uLn = t), this.lLn.RefreshMoneyIcon(t);
  }
  get ChosenLevel() {
    return this.oLn;
  }
  set ChosenLevel(t) {
    this.oLn = t;
    t = this.rLn.BuildCostContentItemData(t);
    t
      ? ((this.CostNumber = t.CostNum),
        (this.MoneyIcon = t.CostType),
        this.lLn.Show())
      : this.lLn.Hide();
  }
}
exports.CostContentItemContext = CostContentItemContext;
// # sourceMappingURL=RoleBreakPreviewViewModel.js.map
