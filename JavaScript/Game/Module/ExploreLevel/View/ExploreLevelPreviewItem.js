"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelPreviewItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class ExploreLevelPreviewItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.bOe = void 0),
      (this.g5t = (e, r, i) => {
        const t = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
        return (
          t.Initialize(r.GetOwner()),
          t.RefreshByConfigId(e[0], e[1]),
          { Key: i, Value: t }
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UISprite],
      [6, UE.UIText],
    ];
  }
  OnStart() {
    this.bOe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(4),
      this.g5t,
    );
  }
  OnBeforeDestroy() {
    this.bOe.ClearChildren(), (this.bOe = void 0);
  }
  Refresh(e, r, i) {
    var t = e.GetDropItemNumMap();
    const o = [];
    if (t) for (const [l, s] of t) o.push([l, s]);
    this.bOe.RefreshByData(o),
      this.SetTextureByPath(e.GetScoreTexturePath(), this.GetTexture(0));
    var t =
      ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData().GetExploreLevel() >=
      e.GetExploreLevel();
    var t =
      (this.GetSprite(1).SetUIActive(t),
      this.GetText(2).SetUIActive(!t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.GetScoreNameId()),
      e.GetRewardNameId());
    const n = this.GetText(6);
    t
      ? ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, "ExploreUnlockPreviewText", t),
        n.SetUIActive(!0))
      : n.SetUIActive(!1),
      this.GetSprite(5).SetUIActive(e.IsShowUnlockSprite());
  }
}
exports.ExploreLevelPreviewItem = ExploreLevelPreviewItem;
// # sourceMappingURL=ExploreLevelPreviewItem.js.map
