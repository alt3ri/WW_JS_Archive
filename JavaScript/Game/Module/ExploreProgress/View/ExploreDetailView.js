"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreDetailView = void 0);
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const ExploreProgressDefine_1 = require("../ExploreProgressDefine");
const ExploreAreaDynamicItem_1 = require("./ExploreAreaDynamicItem");
const ExploreAreaParentItem_1 = require("./ExploreAreaParentItem");
const ExploreAreaViewData_1 = require("./ExploreAreaViewData");
const ExploreProgressItem_1 = require("./ExploreProgressItem");
class ExploreDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.nVt = void 0),
      (this.sVt = void 0),
      (this.aVt = void 0),
      (this.kGe = void 0),
      (this.hVt = -1),
      (this.lVt = (e, r, i) => {
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
      (this.P3t = () => {
        UiManager_1.UiManager.CloseView("ExploreDetailView");
      }),
      (this._Vt = () => {
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
      (this.uVt = (e, r, i) => {
        const t = new ExploreAreaParentItem_1.ExploreAreaParentItem();
        return (
          t.BindOnCountrySelected(this.tVt),
          t.BindOnAreaSelected(this.iVt),
          i === this.hVt && ((this.sVt = t.ExploreAreaItem), (this.hVt = -1)),
          t
        );
      }),
      (this.tVt = (e, r, i) => {
        r = r.CountryId;
        i === 1
          ? this.cVt(r)
          : (((i =
              ModelManager_1.ModelManager
                .ExploreProgressModel).SelectedCountryId = 0),
            (i.SelectedAreaId = 0)),
          this.mVt();
      }),
      (this.iVt = (e, r, i) => {
        i && (this.dVt(r.AreaId, e), this.CVt(), this.PlaySequence("Switch"));
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
      (this.BtnBindInfo = [[6, this._Vt]]);
  }
  async OnBeforeStartAsync() {
    (this.aVt = new DynScrollView_1.DynamicScrollView(
      this.GetUIDynScrollViewComponent(1),
      this.GetItem(2),
      new ExploreAreaDynamicItem_1.ExploreAreaDynamicItem(),
      this.uVt,
    )),
      await this.aVt.Init();
  }
  OnStart() {
    (this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.nVt.SetCloseCallBack(this.P3t),
      (this.kGe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(4),
        this.lVt,
      )),
      this.cVt(ModelManager_1.ModelManager.AreaModel.GetAreaCountryId()),
      this.mVt(),
      this.sVt || this.CVt();
  }
  OnBeforeDestroy() {
    this.nVt?.Destroy(),
      (this.nVt = void 0),
      this.aVt?.ClearChildren(),
      (this.aVt = void 0),
      this.kGe?.ClearChildren(),
      (this.kGe = void 0);
  }
  dVt(e, r) {
    r &&
      (this.sVt?.SetSelected(!1),
      (this.sVt = r).SetSelected(!0),
      (ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId = e));
  }
  cVt(e) {
    let r;
    const i = ModelManager_1.ModelManager.ExploreProgressModel;
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
  mVt() {
    const e = [];
    const r = this.gVt(e);
    e[r] ? (this.aVt.RefreshByData(e), (this.hVt = r)) : (this.sVt = void 0);
  }
  gVt(e) {
    const r = ModelManager_1.ModelManager.ExploreProgressModel;
    let i = 0;
    for (const l of ModelManager_1.ModelManager.ExploreProgressModel.GetExploreCountryDataMap().values())
      if (!(l.GetAreaSize() <= 0)) {
        const t = l.CountryId;
        var a = new ExploreAreaViewData_1.ExploreAreaViewData();
        if (
          (a.RefreshCountry(t, l.GetNameId(), !1),
          e.push(a),
          t === r.SelectedCountryId)
        ) {
          var o;
          var s;
          var a = l.GetExploreAreaDataList();
          a.sort((e, r) => {
            const i = e.GetSortIndex();
            const t = r.GetSortIndex();
            return i !== 0 && t !== 0 && i !== t ? i - t : e.AreaId - r.AreaId;
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
  CVt() {
    var e = ModelManager_1.ModelManager.ExploreProgressModel;
    const r = e.SelectedAreaId;
    var e = e.GetExploreAreaData(r);
    e && this.kGe.RefreshByData(e.GetAllExploreAreaItemData());
  }
}
exports.ExploreDetailView = ExploreDetailView;
// # sourceMappingURL=ExploreDetailView.js.map
