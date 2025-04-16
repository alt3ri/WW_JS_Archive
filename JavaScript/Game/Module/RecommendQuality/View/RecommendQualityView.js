"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecommendQualityView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RecommendQualityItem_1 = require("./RecommendQualityItem");
class RecommendQualityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.jio = void 0),
      (this.HDo = void 0),
      (this.hml = () => {
        var e, i;
        this.HDo &&
          ((e = this.HDo.GetSelectedGridIndex()),
          (i = this.HDo.GetDatas()[e]),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Login",
              69,
              "BtnSureClick",
              ["index", e],
              ["quality", i.Quality],
              ["isRecommend", i.IsRecommend],
            ),
          this.jio?.SaveApply(i.Quality),
          this.CloseMe());
      }),
      (this.sGe = () => new RecommendQualityItem_1.RecommendQualityItem());
  }
  OnBeforeCreate() {
    this.jio = ModelManager_1.ModelManager.RecommendQualityModel;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.hml]]);
  }
  async OnBeforeStartAsync() {
    (this.HDo = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.sGe,
    )),
      await this.HDo.RefreshByDataAsync(this.jio.GetQualityList());
    var e = this.jio.GetRecommendQualityIndex();
    this.HDo?.SelectGridProxy(e);
  }
  OnAfterDestroy() {
    (this.HDo = void 0), UiManager_1.UiManager.CloseView("CreateCharacterView");
  }
  OnAfterShow() {
    this.jio?.FinishRecommendQualityShow();
  }
}
exports.RecommendQualityView = RecommendQualityView;
//# sourceMappingURL=RecommendQualityView.js.map
