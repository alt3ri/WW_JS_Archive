"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterGroup = exports.FilterItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class FilterItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Pe = void 0),
      (this.j5e = void 0),
      (this.gDt = (t) => {
        this.j5e?.(t, this.Pe.FilterId, this.Pe.Content);
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
      (this.BtnBindInfo = [[0, this.gDt]]);
  }
  fDt() {
    var t = this.Pe.Content;
    this.GetText(4).SetText(t);
  }
  Ost() {
    var t,
      i,
      e = this.Pe.GetIconPath(),
      s = this.GetItem(1);
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
    this.j5e = t;
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, !1);
  }
  ShowTemp(t, i) {
    (this.Pe = t), this.fDt(), this.Ost(), this.SetToggleState(i);
  }
}
exports.FilterItem = FilterItem;
class FilterGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.pDt = 0),
      (this.vDt = 2),
      (this.MDt = void 0),
      (this.j5e = void 0),
      (this.EDt = void 0),
      (this.Mne = 0),
      (this.Layout = void 0),
      (this.CurrentSelectedDataMap = void 0),
      (this.SDt = void 0),
      (this.yDt = (e) => {
        if (1 === e)
          for (const i of this.Layout.GetLayoutItemMap().keys()) {
            var t = i;
            this.MDt.set(t.FilterId, t.Content),
              this.EDt?.(e, t.FilterId, t.Content);
          }
        else
          0 === e &&
            (this.MDt.forEach((t, i) => {
              this.EDt?.(e, i, t);
            }),
            this.ResetTempFilterDataMap());
        this.RefreshGroupItem();
      }),
      (this.IDt = (t, i, e) => {
        var i = new FilterItem(i),
          s = (i.SetToggleFunction(this.TDt), this.MDt.has(t.FilterId));
        return i.ShowTemp(t, s), { Key: t, Value: i };
      }),
      (this.TDt = (t, i, e) => {
        1 === t ? this.MDt.set(i, e) : this.MDt.delete(i),
          this.RefreshSelectAllToggleState(),
          this.j5e?.(t, i, e);
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
      (this.BtnBindInfo = [[2, this.yDt]]);
  }
  OnStart() {
    this.Layout = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetLayoutBase(3),
      this.IDt,
      this.GetItem(4),
    );
  }
  OnBeforeDestroy() {}
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetOnSelectAllFunction(t) {
    this.EDt = t;
  }
  LDt() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
      this.pDt,
    );
    this.vDt = t.FilterType;
  }
  DDt() {
    this.MDt = new Map();
    var t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
      this.Mne,
    ).GetSelectRuleDataById(this.vDt);
    if (t) for (var [i, e] of t) this.MDt.set(i, e);
  }
  AddCurrentSelectedFilterData() {
    this.SDt.forEach((t) => {
      var t = t.FilterId,
        i = this.CurrentSelectedDataMap?.get(t);
      i && this.MDt.set(t, i);
    });
  }
  RDt() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
      this.pDt,
    );
    this.GetText(0).ShowTextNew(t.Title);
  }
  UDt() {
    this.Layout.RebuildLayoutByDataNew(this.SDt);
  }
  ADt() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
      this.Mne,
    );
    this.GetItem(1).SetUIActive(t.IsSupportSelectAll);
  }
  RefreshSelectAllToggleState() {
    var t;
    ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.Mne)
      .IsSupportSelectAll &&
      ((t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
        this.pDt,
      )),
      (t = this.MDt.size === t.IdList.length ? 1 : 0),
      this.GetExtendToggle(2).SetToggleState(t, !1));
  }
  SetSelectedDataMap(t) {
    this.CurrentSelectedDataMap = t;
  }
  InitFilterSetData() {
    this.DDt(), this.AddCurrentSelectedFilterData();
  }
  ShowTemp(t, i) {
    (this.pDt = t),
      (this.Mne = i),
      (this.SDt = ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(
        this.pDt,
        this.Mne,
      )),
      this.LDt(),
      this.InitFilterSetData(),
      this.RDt(),
      this.ADt(),
      this.RefreshSelectAllToggleState(),
      this.UDt();
  }
  RefreshGroupItem() {
    var t, i;
    for ([t, i] of this.Layout.GetLayoutItemMap()) {
      var e = t;
      i.SetToggleState(this.MDt.has(e.FilterId));
    }
  }
  GetTempFilterDataMap() {
    return this.MDt;
  }
  ResetTempFilterDataMap() {
    this.MDt.clear();
  }
  GetFilterType() {
    return this.vDt;
  }
}
exports.FilterGroup = FilterGroup;
//# sourceMappingURL=FilterGroup.js.map
