"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseSortGroup = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class SortItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.pDt = 0),
      (this.vUt = 1),
      (this.he = ""),
      (this.j5e = void 0),
      (this.MUt = void 0),
      (this.gDt = (t) => {
        1 === t && this.j5e?.(this.pDt, this.he);
      }),
      (this.Lke = () => !this.MUt || this.MUt(this.pDt)),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[1, this.gDt]]);
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
  qWe() {
    (this.he = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
      this.pDt,
      this.vUt,
    )),
      this.GetText(0).SetText(this.he);
  }
  UTt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(
        this.pDt,
        this.vUt,
      ),
      i = 0 < t,
      t = i
        ? ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(
            t,
          )
        : ConfigManager_1.ConfigManager.SortConfig.GetSortRuleIcon(
            this.pDt,
            this.vUt,
          ),
      e = this.GetTexture(2);
    StringUtils_1.StringUtils.IsBlank(t)
      ? e.SetUIActive(!1)
      : (e.SetUIActive(!0),
        this.SetTextureByPath(t, e),
        e.SetChangeColor(i, e.changeColor));
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteChange(t) {
    this.MUt = t;
  }
  SetToggleStateForce(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0);
  }
  ShowSortItem(t, i, e) {
    (this.pDt = t),
      (this.vUt = i),
      this.qWe(),
      this.UTt(),
      this.SetToggleStateForce(e);
  }
}
class BaseSortGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.eGe = void 0),
      (this.PUt = void 0),
      (this.Mne = 0),
      (this.vUt = 1),
      (this.IUt = (t, i, e) => {
        i = new SortItem(i);
        return (
          i.SetToggleFunction(this.TUt),
          i.SetCanExecuteChange(this.Lke),
          i.ShowSortItem(t, this.vUt, this.PUt[0] === t),
          { Key: t, Value: i }
        );
      }),
      (this.TUt = (t, i) => {
        this.xUt(), (this.PUt = [t, i]);
      }),
      (this.Lke = (t) => this.PUt[0] !== t),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetLayoutBase(0),
      this.IUt,
      this.GetItem(1),
    );
  }
  OnBeforeDestroy() {}
  xUt() {
    this.eGe.GetLayoutItemByKey(this.PUt[0]).SetToggleStateForce(!1);
  }
  wUt() {
    var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.Mne);
    this.PUt = t.GetSelectBaseSort();
  }
  AUt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    (this.vUt = t.DataId), this.eGe.RebuildLayoutByDataNew(t.BaseSortList);
  }
  Init(t) {
    (this.Mne = t), this.wUt(), this.AUt();
  }
  Reset() {
    var t,
      i,
      e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne)
        .BaseSortList[0],
      s = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(e, this.vUt),
      s = ((this.PUt = [e, s]), this.eGe.GetLayoutItemMap());
    for ([t, i] of s) {
      var h = t;
      i.ShowSortItem(h, this.vUt, e === h);
    }
  }
  GetTempSelect() {
    return this.PUt;
  }
}
exports.BaseSortGroup = BaseSortGroup;
//# sourceMappingURL=BaseSortGroup.js.map
