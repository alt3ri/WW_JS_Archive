"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressView = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class ExploreProgressView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Ako = void 0),
      (this.Pko = (e, i, r) => {
        i = new ExploreProgressItem(i);
        return i.Update(e), { Key: r, Value: i };
      }),
      (this.mIt = () => {
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
      (this.BtnBindInfo = [[0, this.mIt]]);
  }
  OnStart() {
    this.Ako = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(3),
      this.Pko,
    );
  }
  OnBeforeDestroy() {
    this.Ako && (this.Ako.ClearChildren(), (this.Ako = void 0));
  }
  OnAfterShow() {
    const e = ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo();
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.AreaId);
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(i.Title);
    var i =
      (this.GetText(1).SetText(i),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "ExplorationDegree",
        e.ExplorePercent,
      ),
      ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo());
    this.Ako.RefreshByData(i.ExploreProgress);
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
    let i =
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
// # sourceMappingURL=ExploreInfoView.js.map
