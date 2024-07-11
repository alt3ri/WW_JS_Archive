"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionFilterView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  GenericScrollView_1 = require("../../../../Util/ScrollView/GenericScrollView"),
  CommonSearchComponent_1 = require("../../../InputView/CommonSearchComponent"),
  FilterGroup_1 = require("./FilterGroup");
class VisionFilterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Scroll = void 0),
      (this.SearchScroll = void 0),
      (this.ogt = void 0),
      (this.gGe = ""),
      (this.gLt = void 0),
      (this.ALt = void 0),
      (this.dqe = void 0),
      (this.PLt = !1),
      (this.xLt = () => {
        (this.gGe = ""), this.wLt(!1);
        for (const i of this.Scroll.GetScrollItemList())
          i.SetSelectedDataMap(this.gLt),
            i.InitFilterSetData(),
            i.RefreshGroupItem(),
            i.RefreshSelectAllToggleState();
      }),
      (this.BLt = (i) => {
        (this.gGe = i), this.gLt.clear(), this.Og();
      }),
      (this.Mbe = (i) => {
        this.BLt(i);
      }),
      (this.Tqe = () => {
        this.xLt();
      }),
      (this.MLt = (i, t, e) => {
        var t = new FilterGroup_1.FilterItem(t),
          s = (t.SetToggleFunction(this.SLt), this.gLt.has(i.FilterId));
        return t.ShowTemp(i, s), { Key: i, Value: t };
      }),
      (this.SLt = (i, t, e) => {
        1 === i ? this.gLt.set(t, e) : this.gLt.delete(t);
      }),
      (this.ULt = (i, t, e) => {
        (t = new FilterGroup_1.FilterGroup(t)),
          t.SetSelectedDataMap(this.gLt),
          t.SetToggleFunction(this.SLt),
          t.SetOnSelectAllFunction(this.SLt),
          t.ShowTemp(i, this.ogt.ConfigId),
          (i = t.GetFilterType());
        return { Key: i, Value: t };
      }),
      (this.O8e = () => {
        if (this.PLt) {
          this.gLt.clear();
          for (const i of this.SearchScroll.GetScrollItemList())
            i.SetToggleState(!1);
        } else
          for (const t of this.Scroll.GetScrollItemList())
            t.ResetTempFilterDataMap(),
              t.RefreshGroupItem(),
              t.RefreshSelectAllToggleState();
      }),
      (this.RLt = () => {
        const s = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
          this.ogt.ConfigId,
        );
        s.ClearSelectRuleData(),
          this.gLt.forEach((i, t) => {
            var e = this.ALt.get(t);
            s.AddSingleRuleData(e, t, i);
          }),
          this.ogt.ConfirmFunction?.(),
          UiManager_1.UiManager.CloseView(this.Info.Name);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.O8e],
        [2, this.RLt],
      ]);
  }
  OnStart() {
    (this.ogt = this.OpenParam),
      this.bLt(),
      (this.dqe = new CommonSearchComponent_1.CommonSearchComponent(
        this.GetItem(4),
        this.Mbe,
        this.Tqe,
      ));
  }
  bLt() {
    (this.Scroll = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.ULt,
    )),
      (this.SearchScroll = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(3),
        this.MLt,
      ));
  }
  qLt() {
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
      this.ogt.ConfigId,
    );
    this.Scroll.RefreshByData(i.RuleList), this.wLt(!1);
  }
  GLt() {
    var i,
      t,
      e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
        this.ogt.ConfigId,
      );
    const s = new Array();
    e.RuleList.forEach((i) => {
      ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(
        i,
        this.ogt.ConfigId,
      ).forEach((i) => {
        i.Content.includes(this.gGe) && s.push(i);
      });
    });
    for (const r of this.Scroll.GetScrollItemList())
      for ([i, t] of r.GetTempFilterDataMap()) this.gLt.set(i, t);
    this.SearchScroll.RefreshByData(s), this.wLt(!0);
  }
  wLt(i) {
    this.GetScrollViewWithScrollbar(0).RootUIComp.SetUIActive(!i),
      this.GetScrollViewWithScrollbar(3).RootUIComp.SetUIActive(i),
      (this.PLt = i);
  }
  Og() {
    StringUtils_1.StringUtils.IsEmpty(this.gGe) ? this.qLt() : this.GLt();
  }
  OnBeforeShow() {
    (this.ALt = new Map()),
      ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
        this.ogt.ConfigId,
      ).RuleList.forEach((i) => {
        const t =
          ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
            i,
          ).FilterType;
        ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(
          i,
          this.ogt.ConfigId,
        ).forEach((i) => {
          this.ALt.set(i.FilterId, t);
        });
      }),
      (this.gLt = new Map());
    var i = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
      this.ogt.ConfigId,
    )?.GetSelectRuleData();
    i &&
      i.forEach((i) => {
        i.forEach((i, t) => {
          this.gLt?.set(t, i);
        });
      }),
      this.Og();
  }
  OnBeforeDestroy() {
    this.dqe.Destroy();
  }
}
exports.VisionFilterView = VisionFilterView;
//# sourceMappingURL=VisionFilterView.js.map
