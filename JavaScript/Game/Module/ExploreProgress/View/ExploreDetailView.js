"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreDetailView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
  DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  ExploreProgressDefine_1 = require("../ExploreProgressDefine"),
  ExploreAreaDynamicItem_1 = require("./ExploreAreaDynamicItem"),
  ExploreAreaParentItem_1 = require("./ExploreAreaParentItem"),
  ExploreAreaViewData_1 = require("./ExploreAreaViewData"),
  ExploreProgressItem_1 = require("./ExploreProgressItem");
class ExploreDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.n6t = void 0),
      (this.s6t = void 0),
      (this.a6t = void 0),
      (this.kGe = void 0),
      (this.h6t = -1),
      (this.l6t = (e, r, i) => {
        const t = new ExploreProgressItem_1.ExploreProgressItem();
        return (
          t.CreateByActorAsync(r.GetOwner()).then(
            () => {
              t.Refresh(e), t.SetUiActive(!0);
            },
            () => {},
          ),
          { Key: i, Value: t }
        );
      }),
      (this.x4t = () => {
        UiManager_1.UiManager.CloseView("ExploreDetailView");
      }),
      (this._6t = () => {
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10057)
          ? (UiManager_1.UiManager.CloseView("ExploreDetailView"),
            SkipTaskManager_1.SkipTaskManager.Run(
              0,
              ExploreProgressDefine_1.MAP_MARK_TYPE,
              ExploreProgressDefine_1.MAP_MARK_ID,
            ))
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ExploreProgressRewardNotOpen",
            );
      }),
      (this.u6t = (e, r, i) => {
        var t = new ExploreAreaParentItem_1.ExploreAreaParentItem();
        return (
          t.BindOnCountrySelected(this.t6t),
          t.BindOnAreaSelected(this.i6t),
          i === this.h6t && ((this.s6t = t.ExploreAreaItem), (this.h6t = -1)),
          t
        );
      }),
      (this.t6t = (e, r, i) => {
        r = r.CountryId;
        1 === i
          ? this.c6t(r)
          : (((i =
              ModelManager_1.ModelManager
                .ExploreProgressModel).SelectedCountryId = 0),
            (i.SelectedAreaId = 0)),
          this.m6t();
      }),
      (this.i6t = (e, r, i) => {
        i && (this.d6t(r.AreaId, e), this.C6t(), this.PlaySequence("Switch"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIDynScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[6, this._6t]]);
  }
  async OnBeforeStartAsync() {
    (this.a6t = new DynScrollView_1.DynamicScrollView(
      this.GetUIDynScrollViewComponent(1),
      this.GetItem(2),
      new ExploreAreaDynamicItem_1.ExploreAreaDynamicItem(),
      this.u6t,
    )),
      await this.a6t.Init();
  }
  OnStart() {
    (this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.n6t.SetCloseCallBack(this.x4t),
      (this.kGe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(4),
        this.l6t,
      )),
      this.c6t(ModelManager_1.ModelManager.AreaModel.GetAreaCountryId()),
      this.m6t(),
      this.s6t || this.C6t();
  }
  OnBeforeDestroy() {
    this.n6t?.Destroy(),
      (this.n6t = void 0),
      this.a6t?.ClearChildren(),
      (this.a6t = void 0),
      this.kGe?.ClearChildren(),
      (this.kGe = void 0);
  }
  d6t(e, r) {
    r &&
      (this.s6t?.SetSelected(!1),
      (this.s6t = r).SetSelected(!0),
      (ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId = e));
  }
  c6t(e) {
    var r,
      i = ModelManager_1.ModelManager.ExploreProgressModel;
    e <= 0 &&
      ((i.SelectedCountryId = ExploreProgressDefine_1.DEFAULT_COUNTRY_ID),
      (r = i.GetExploreCountryData(e).GetExploreAreaDataList()[0]),
      (i.SelectedAreaId = r.AreaId)),
      (i.SelectedCountryId = e),
      (i.SelectedAreaId =
        ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        ));
  }
  m6t() {
    var e = [],
      r = this.g6t(e);
    e[r] ? (this.a6t.RefreshByData(e), (this.h6t = r)) : (this.s6t = void 0);
  }
  g6t(e) {
    var r = ModelManager_1.ModelManager.ExploreProgressModel;
    let i = 0;
    for (const l of ModelManager_1.ModelManager.ExploreProgressModel.GetExploreCountryDataMap().values())
      if (!(l.GetAreaSize() <= 0)) {
        var t = l.CountryId,
          a = new ExploreAreaViewData_1.ExploreAreaViewData();
        if (
          (a.RefreshCountry(t, l.GetNameId(), !1),
          e.push(a),
          t === r.SelectedCountryId)
        ) {
          var o,
            s,
            a = l.GetExploreAreaDataList();
          a.sort((e, r) => {
            var i = e.GetSortIndex(),
              t = r.GetSortIndex();
            return 0 !== i && 0 !== t && i !== t ? i - t : e.AreaId - r.AreaId;
          });
          for (const n of a)
            n.GetAllExploreAreaItemData().length <= 0 ||
              ((o = n.AreaId),
              (s = new ExploreAreaViewData_1.ExploreAreaViewData()).RefreshArea(
                o,
                n.GetNameId(),
                n.GetProgress(),
              ),
              e.push(s),
              r.SelectedAreaId === o && (i = e.length - 1));
        }
      }
    return i;
  }
  C6t() {
    var e = ModelManager_1.ModelManager.ExploreProgressModel,
      r = e.SelectedAreaId,
      e = e.GetExploreAreaData(r);
    e && this.kGe.RefreshByData(e.GetAllExploreAreaItemData());
  }
}
exports.ExploreDetailView = ExploreDetailView;
//# sourceMappingURL=ExploreDetailView.js.map
