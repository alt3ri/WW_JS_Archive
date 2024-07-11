"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EventResultView = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiActorPool_1 = require("../../../Ui/UiActorPool"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  CommonSelectItem_1 = require("./CommonSelectItem"),
  RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class EventResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments),
      (this.aao = void 0),
      (this.KZt = 0),
      (this.$so = void 0),
      (this.CommonSelectItemLayout = void 0),
      (this.CloseBtn = () => {
        this.KZt + 1 >= this.aao.RogueGainEntryArray.length
          ? this.CloseMe()
          : (this.PlaySequence("Start"), (this.KZt += 1), this.Refresh());
      }),
      (this.CreateCommonSelectItem = () => {
        return new CommonSelectItem_1.CommonSelectItem();
      }),
      (this.OnDescModelChange = () => {
        this.Refresh();
      });
  }
  async OnBeforeStartAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      RoguelikeDefine_1.COMMON_SELECT_ITEM,
    );
    (this.$so = await UiActorPool_1.UiActorPool.GetAsync(e)),
      (this.CommonSelectItemLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.CreateCommonSelectItem,
        this.$so?.UiItem.GetOwner(),
      ));
  }
  OnStart() {
    super.OnStart(), (this.aao = this.OpenParam);
    var e = this.GetHorizontalLayout(3).GetRootComponent();
    this.$so.UiItem.SetUIParent(e), this.Refresh();
  }
  OnBeforeDestroy() {
    this.CommonSelectItemLayout?.ClearChildren(),
      this.$so &&
        UiActorPool_1.UiActorPool.RecycleAsync(
          this.$so,
          RoguelikeDefine_1.COMMON_SELECT_ITEM,
        );
  }
  Refresh() {
    this.CommonSelectItemLayout.RefreshByDataAsync([
      this.aao.RogueGainEntryArray[this.KZt],
    ]).then(
      () => {
        this.CommonSelectItemLayout.GetLayoutItemList().forEach((e) => {
          e.SetToggleUnDetermined();
        });
      },
      () => {},
    ),
      this.RefreshTitleText();
  }
  RefreshTitleText() {
    this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_20_TEXT);
  }
}
exports.EventResultView = EventResultView;
//# sourceMappingURL=EventResultView.js.map
