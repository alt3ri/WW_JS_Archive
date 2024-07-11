"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseSortGroup = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class SortItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.dLt = 0),
      (this.CRt = 1),
      (this.he = ""),
      (this.U4e = void 0),
      (this.gRt = void 0),
      (this.cLt = (t) => {
        t === 1 && this.U4e?.(this.dLt, this.he);
      }),
      (this.T7e = () => !this.gRt || this.gRt(this.dLt)),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[1, this.cLt]]);
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.T7e);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
  Ije() {
    (this.he = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
      this.dLt,
      this.CRt,
    )),
      this.GetText(0).SetText(this.he);
  }
  IIt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(
      this.dLt,
      this.CRt,
    );
    const i = t > 0;
    var t = i
      ? ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(
          t,
        )
      : ConfigManager_1.ConfigManager.SortConfig.GetSortRuleIcon(
          this.dLt,
          this.CRt,
        );
    const e = this.GetTexture(2);
    StringUtils_1.StringUtils.IsBlank(t)
      ? e.SetUIActive(!1)
      : (e.SetUIActive(!0),
        this.SetTextureByPath(t, e),
        e.SetChangeColor(i, e.changeColor));
  }
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetCanExecuteChange(t) {
    this.gRt = t;
  }
  SetToggleStateForce(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0);
  }
  ShowSortItem(t, i, e) {
    (this.dLt = t),
      (this.CRt = i),
      this.Ije(),
      this.IIt(),
      this.SetToggleStateForce(e);
  }
}
class BaseSortGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.eGe = void 0),
      (this.DRt = void 0),
      (this.Mne = 0),
      (this.CRt = 1),
      (this.MRt = (t, i, e) => {
        i = new SortItem(i);
        return (
          i.SetToggleFunction(this.SRt),
          i.SetCanExecuteChange(this.T7e),
          i.ShowSortItem(t, this.CRt, this.DRt[0] === t),
          { Key: t, Value: i }
        );
      }),
      (this.SRt = (t, i) => {
        this.RRt(), (this.DRt = [t, i]);
      }),
      (this.T7e = (t) => this.DRt[0] !== t),
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
      this.MRt,
      this.GetItem(1),
    );
  }
  OnBeforeDestroy() {
    this.eGe.ClearChildren();
  }
  RRt() {
    this.eGe.GetLayoutItemByKey(this.DRt[0]).SetToggleStateForce(!1);
  }
  URt() {
    const t = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.Mne);
    this.DRt = t.GetSelectBaseSort();
  }
  LRt() {
    const t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    (this.CRt = t.DataId), this.eGe.RebuildLayoutByDataNew(t.BaseSortList);
  }
  Init(t) {
    (this.Mne = t), this.URt(), this.LRt();
  }
  Reset() {
    let t;
    let i;
    const e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne)
      .BaseSortList[0];
    var s = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
      e,
      this.CRt,
    );
    var s = ((this.DRt = [e, s]), this.eGe.GetLayoutItemMap());
    for ([t, i] of s) {
      const h = t;
      i.ShowSortItem(h, this.CRt, e === h);
    }
  }
  GetTempSelect() {
    return this.DRt;
  }
}
exports.BaseSortGroup = BaseSortGroup;
// # sourceMappingURL=BaseSortGroup.js.map
