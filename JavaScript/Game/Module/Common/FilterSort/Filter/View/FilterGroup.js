"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterGroup = exports.FilterItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class FilterItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Pe = void 0),
      (this.U4e = void 0),
      (this.cLt = (t) => {
        this.U4e?.(t, this.Pe.FilterId, this.Pe.Content);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UISprite],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.cLt]]);
  }
  mLt() {
    const t = this.Pe.Content;
    this.GetText(4).SetText(t);
  }
  Dnt() {
    let t;
    let i;
    const e = this.Pe.GetIconPath();
    let s = this.GetItem(1);
    StringUtils_1.StringUtils.IsBlank(e)
      ? s.SetUIActive(!1)
      : (s.SetUIActive(!0),
        (s = e.includes("Atlas")),
        (t = this.GetTexture(2)).SetUIActive(!s),
        (i = this.GetSprite(3)).SetUIActive(s),
        s
          ? (this.SetSpriteByPath(e, i, !1),
            i.SetChangeColor(this.Pe.NeedChangeColor, i.changeColor))
          : (this.SetTextureByPath(e, t),
            t.SetChangeColor(this.Pe.NeedChangeColor, t.changeColor)));
  }
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, !1);
  }
  ShowTemp(t, i) {
    (this.Pe = t), this.mLt(), this.Dnt(), this.SetToggleState(i);
  }
}
exports.FilterItem = FilterItem;
class FilterGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.dLt = 0),
      (this.CLt = 2),
      (this.gLt = void 0),
      (this.U4e = void 0),
      (this.fLt = void 0),
      (this.Mne = 0),
      (this.Layout = void 0),
      (this.CurrentSelectedDataMap = void 0),
      (this.pLt = void 0),
      (this.vLt = (e) => {
        if (e === 1)
          for (const i of this.Layout.GetLayoutItemMap().keys()) {
            const t = i;
            this.gLt.set(t.FilterId, t.Content),
              this.fLt?.(e, t.FilterId, t.Content);
          }
        else
          e === 0 &&
            (this.gLt.forEach((t, i) => {
              this.fLt?.(e, i, t);
            }),
            this.ResetTempFilterDataMap());
        this.RefreshGroupItem();
      }),
      (this.MLt = (t, i, e) => {
        var i = new FilterItem(i);
        const s = (i.SetToggleFunction(this.SLt), this.gLt.has(t.FilterId));
        return i.ShowTemp(t, s), { Key: t, Value: i };
      }),
      (this.SLt = (t, i, e) => {
        t === 1 ? this.gLt.set(i, e) : this.gLt.delete(i),
          this.RefreshSelectAllToggleState(),
          this.U4e?.(t, i, e);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UILayoutBase],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.vLt]]);
  }
  OnStart() {
    this.Layout = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetLayoutBase(3),
      this.MLt,
      this.GetItem(4),
    );
  }
  OnBeforeDestroy() {}
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetOnSelectAllFunction(t) {
    this.fLt = t;
  }
  ELt() {
    const t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
      this.dLt,
    );
    this.CLt = t.FilterType;
  }
  yLt() {
    this.gLt = new Map();
    const t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
      this.Mne,
    ).GetSelectRuleDataById(this.CLt);
    if (t) for (const [i, e] of t) this.gLt.set(i, e);
  }
  AddCurrentSelectedFilterData() {
    this.pLt.forEach((t) => {
      var t = t.FilterId;
      const i = this.CurrentSelectedDataMap?.get(t);
      i && this.gLt.set(t, i);
    });
  }
  ILt() {
    const t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
      this.dLt,
    );
    this.GetText(0).ShowTextNew(t.Title);
  }
  TLt() {
    this.Layout.RebuildLayoutByDataNew(this.pLt);
  }
  LLt() {
    const t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
      this.Mne,
    );
    this.GetItem(1).SetUIActive(t.IsSupportSelectAll);
  }
  RefreshSelectAllToggleState() {
    let t;
    ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.Mne)
      .IsSupportSelectAll &&
      ((t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
        this.dLt,
      )),
      (t = this.gLt.size === t.IdList.length ? 1 : 0),
      this.GetExtendToggle(2).SetToggleState(t, !1));
  }
  SetSelectedDataMap(t) {
    this.CurrentSelectedDataMap = t;
  }
  InitFilterSetData() {
    this.yLt(), this.AddCurrentSelectedFilterData();
  }
  ShowTemp(t, i) {
    (this.dLt = t),
      (this.Mne = i),
      (this.pLt = ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(
        this.dLt,
        this.Mne,
      )),
      this.ELt(),
      this.InitFilterSetData(),
      this.ILt(),
      this.LLt(),
      this.RefreshSelectAllToggleState(),
      this.TLt();
  }
  RefreshGroupItem() {
    let t, i;
    for ([t, i] of this.Layout.GetLayoutItemMap()) {
      const e = t;
      i.SetToggleState(this.gLt.has(e.FilterId));
    }
  }
  GetTempFilterDataMap() {
    return this.gLt;
  }
  ResetTempFilterDataMap() {
    this.gLt.clear();
  }
  GetFilterType() {
    return this.CLt;
  }
}
exports.FilterGroup = FilterGroup;
// # sourceMappingURL=FilterGroup.js.map
