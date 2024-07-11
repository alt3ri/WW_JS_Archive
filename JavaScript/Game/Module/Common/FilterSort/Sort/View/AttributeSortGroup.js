"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeSortGroup = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class SortItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.dLt = 0),
      (this.he = ""),
      (this.CRt = 1),
      (this.U4e = void 0),
      (this.gRt = void 0),
      (this.cLt = (t) => {
        this.U4e?.(t, this.dLt, this.he);
      }),
      (this.T7e = () => {
        return (
          this.GetExtendToggle(1).ToggleState === 1 || !this.gRt || this.gRt()
        );
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UITexture],
      [3, UE.UIText],
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
  fRt(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0);
  }
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetCanExecuteChange(t) {
    this.gRt = t;
  }
  ShowSortItem(t, i, e) {
    (this.dLt = t),
      (this.CRt = i),
      this.Ije(),
      this.IIt(),
      this.fRt(e > 0),
      this.RefreshIndex(e);
  }
  RefreshIndex(t) {
    const i = this.GetText(3);
    t === 0 ? i.SetUIActive(!1) : (i.SetUIActive(!0), i.SetText(t.toString()));
  }
}
class AttributeSortGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.eGe = void 0),
      (this.pRt = new Map()),
      (this.Mne = 0),
      (this.CRt = 1),
      (this.vRt = 0),
      (this.MRt = (t, i, e) => {
        var i = new SortItem(i);
        const s =
          (i.SetToggleFunction(this.SRt),
          i.SetCanExecuteChange(this.T7e),
          this.ERt(t));
        return i.ShowSortItem(t, this.CRt, s + 1), { Key: t, Value: i };
      }),
      (this.SRt = (t, i, e) => {
        t === 1 ? this.pRt.set(i, e) : (this.pRt.delete(i), this.yRt(i)),
          this.IRt(),
          this.ILt();
      }),
      (this.T7e = () => this.vRt === 0 || this.pRt.size < this.vRt),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UILayoutBase],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetLayoutBase(1),
      this.MRt,
      this.GetItem(2),
    );
  }
  OnBeforeDestroy() {
    this.eGe.ClearChildren();
  }
  ERt(t) {
    let i = 0;
    for (const e of this.pRt.keys()) {
      if (e === t) return i;
      i++;
    }
    return -1;
  }
  yRt(t) {
    this.eGe.GetLayoutItemByKey(t).RefreshIndex(0);
  }
  IRt() {
    let t = 0;
    for (const i of this.pRt.keys())
      this.eGe.GetLayoutItemByKey(i).RefreshIndex(t + 1), t++;
  }
  TRt() {
    const t = ModelManager_1.ModelManager.SortModel.GetSortResultData(
      this.Mne,
    ).GetSelectAttributeSort();
    if (t) for (const [i, e] of t) this.pRt.set(i, e);
  }
  LRt() {
    const t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    (this.vRt = t.LimitNum),
      (this.CRt = t.DataId),
      this.eGe.RebuildLayoutByDataNew(t.AttributeSortList);
  }
  ILt() {
    const t = this.GetText(0);
    this.vRt === 0
      ? LguiUtil_1.LguiUtil.SetLocalText(t, "AttributeSortName")
      : LguiUtil_1.LguiUtil.SetLocalText(
          t,
          "AttributeSortLimitName",
          this.pRt.size,
          this.vRt,
        );
  }
  Init(t) {
    (this.Mne = t), this.TRt(), this.LRt(), this.ILt();
  }
  Reset() {
    let t, i;
    this.pRt.clear();
    for ([t, i] of this.eGe.GetLayoutItemMap()) {
      const e = t;
      i.ShowSortItem(e, this.CRt, 0);
    }
    this.ILt();
  }
  GetTempSelectMap() {
    return this.pRt;
  }
}
exports.AttributeSortGroup = AttributeSortGroup;
// # sourceMappingURL=AttributeSortGroup.js.map
