"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class ExploreProgressView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.D2o = void 0),
      (this.R2o = (e, i, r) => {
        i = new ExploreProgressItem(i);
        return i.Update(e), { Key: r, Value: i };
      }),
      (this.m2e = () => {
        UiManager_1.UiManager.CloseView("ExploreProgressView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [[0, this.m2e]]);
  }
  OnStart() {
    this.D2o = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(3),
      this.R2o,
    );
  }
  OnBeforeDestroy() {
    this.D2o && (this.D2o.ClearChildren(), (this.D2o = void 0));
  }
  OnAfterShow() {
    var e = ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo(),
      i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.AreaId),
      i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(i.Title),
      i =
        (this.GetText(1).SetText(i),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(2),
          "ExplorationDegree",
          e.ExplorePercent,
        ),
        ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo());
    this.D2o.RefreshByData(i.ExploreProgress);
  }
}
exports.ExploreProgressView = ExploreProgressView;
const ONEHUNDRED = 100;
class ExploreProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  Update(e) {
    var i =
      ConfigManager_1.ConfigManager.WorldMapConfig.GetExploreProgressInfoById(
        e.ExploreProgressId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TypeName);
    let r = 0;
    e.ExplorePercent && (r = e.ExplorePercent),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ExplorationDegree", r);
    i = MathUtils_1.MathUtils.GetFloatPointFloor(
      MathUtils_1.MathUtils.SafeDivide(r, ONEHUNDRED),
      2,
    );
    this.GetSprite(2).SetFillAmount(i);
  }
}
//# sourceMappingURL=ExploreInfoView.js.map
