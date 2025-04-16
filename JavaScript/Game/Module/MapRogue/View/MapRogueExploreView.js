"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueExploreView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueExploreListItem_1 = require("./Components/RogueExploreListItem");
class MapRogueExploreView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Ev1 = void 0),
      (this.lqe = void 0),
      (this.Bqe = () => {
        return new RogueExploreListItem_1.RogueExploreListItem();
      }),
      (this.B6e = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
      this.lqe.SetCloseCallBack(this.B6e),
      (this.Ev1 = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(1),
        this.Bqe,
      )),
      await Promise.all(e);
  }
  OnBeforeShow() {
    var e,
      i,
      r = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    r &&
      (e =
        ConfigManager_1.ConfigManager.MapRogueConfig?.GetInsGridConfigByInstId(
          r.InstanceId,
        )) &&
      ((i = this.GetText(3)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Title),
      this.Ev1?.RefreshByData(r.GetAllExplorationData(), void 0, !0));
  }
}
exports.MapRogueExploreView = MapRogueExploreView;
//# sourceMappingURL=MapRogueExploreView.js.map
