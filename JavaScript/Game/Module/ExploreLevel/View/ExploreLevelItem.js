"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.cVt = void 0),
      (this.mVt = void 0),
      (this.dVt = () => {
        var e = this.cVt.GetAreaConfig(),
          i = e.DeliveryMarkType,
          e = e.DeliveryMarkId;
        1 !== i ||
          e <= 0 ||
          SkipTaskManager_1.SkipTaskManager.Run(0, i.toString(), e.toString());
      }),
      (this.CVt = () => {
        this.mVt && this.mVt(this.cVt);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UISprite],
    ]),
      (this.BtnBindInfo = [
        [4, this.dVt],
        [5, this.CVt],
      ]);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  OnBeforeDestroy() {
    (this.cVt = void 0), (this.mVt = void 0);
  }
  Refresh(e, i, t) {
    (this.cVt = e),
      this.SetTextureByPath(
        ModelManager_1.ModelManager.ExploreLevelModel
          .ExploreScoreItemTexturePath,
        this.GetTexture(0),
      );
    var s = e.GetAreaNameTextId(),
      s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s),
      r = e.Progress,
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          "AreaExploreProgress",
          s,
          r,
        ),
        ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
          e.AreaId,
        ));
    s &&
      ((r = s.GetProgress()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "CurrentAreaExploreProgress",
        r,
      ),
      this.GetText(3).SetText(e.Score.toString()),
      (s = e.GetIsReceived()),
      (r = e.CanReceive()),
      s
        ? (this.GetSprite(6).SetUIActive(!0),
          this.SetButtonUiActive(4, !1),
          this.SetButtonUiActive(5, !1))
        : r
          ? (this.GetSprite(6).SetUIActive(!1),
            this.SetButtonUiActive(4, !1),
            this.SetButtonUiActive(5, !0))
          : (this.GetSprite(6).SetUIActive(!1),
            this.SetButtonUiActive(4, !0),
            this.SetButtonUiActive(5, !1)));
  }
  BindOnClickedReceiveButton(e) {
    this.mVt = e;
  }
  GetKey(e, i) {
    return this.GridIndex;
  }
}
exports.ExploreLevelItem = ExploreLevelItem;
//# sourceMappingURL=ExploreLevelItem.js.map
