"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.c5t = void 0),
      (this.m5t = void 0),
      (this.d5t = () => {
        var e = this.c5t.GetAreaConfig();
        const i = e.DeliveryMarkType;
        var e = e.DeliveryMarkId;
        i !== 1 ||
          e <= 0 ||
          SkipTaskManager_1.SkipTaskManager.Run(0, i.toString(), e.toString());
      }),
      (this.C5t = () => {
        this.m5t && this.m5t(this.c5t);
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
        [4, this.d5t],
        [5, this.C5t],
      ]);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  OnBeforeDestroy() {
    (this.c5t = void 0), (this.m5t = void 0);
  }
  Refresh(e, i, t) {
    (this.c5t = e),
      this.SetTextureByPath(
        ModelManager_1.ModelManager.ExploreLevelModel
          .ExploreScoreItemTexturePath,
        this.GetTexture(0),
      );
    var s = e.GetAreaNameTextId();
    var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s);
    let r = e.Progress;
    var s =
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
    this.m5t = e;
  }
  GetKey(e, i) {
    return this.GridIndex;
  }
}
exports.ExploreLevelItem = ExploreLevelItem;
// # sourceMappingURL=ExploreLevelItem.js.map
