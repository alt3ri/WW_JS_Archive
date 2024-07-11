"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EventResultViewAll = exports.EventResultViewOneByOne = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiActorPool_1 = require("../../../Ui/UiActorPool"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  CommonSelectItem_1 = require("./CommonSelectItem"),
  RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class EventResultViewOneByOne extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments),
      (this.oho = void 0),
      (this.Kei = 0),
      (this.Wao = void 0),
      (this.CommonSelectItemLayout = void 0),
      (this.CloseBtn = () => {
        this.Kei + 1 >= this.oho.RogueGainEntryArray.length
          ? this.CloseMe(this.oho?.Callback)
          : (this.PlaySequence("Start"), (this.Kei += 1), this.Refresh());
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
    (this.Wao = await UiActorPool_1.UiActorPool.GetAsync(e)),
      (this.CommonSelectItemLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.CreateCommonSelectItem,
        this.Wao?.UiItem.GetOwner(),
      ));
  }
  OnStart() {
    super.OnStart(), (this.oho = this.OpenParam);
    var e = this.GetHorizontalLayout(3).GetRootComponent();
    this.Wao.UiItem.SetUIParent(e), this.Refresh();
  }
  OnBeforeDestroy() {
    this.CommonSelectItemLayout?.ClearChildren(),
      this.Wao &&
        UiActorPool_1.UiActorPool.RecycleAsync(
          this.Wao,
          RoguelikeDefine_1.COMMON_SELECT_ITEM,
        );
  }
  Refresh() {
    this.CommonSelectItemLayout.RefreshByDataAsync([
      this.oho.RogueGainEntryArray[this.Kei],
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
exports.EventResultViewOneByOne = EventResultViewOneByOne;
class EventResultViewAll extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments),
      (this.oho = void 0),
      (this.Wao = void 0),
      (this.CommonSelectItemLayout = void 0),
      (this.CloseBtn = () => {
        this.CloseMe(this.oho?.Callback);
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
    (this.Wao = await UiActorPool_1.UiActorPool.GetAsync(e)),
      (this.CommonSelectItemLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.CreateCommonSelectItem,
        this.Wao?.UiItem.GetOwner(),
      ));
  }
  OnStart() {
    super.OnStart(), (this.oho = this.OpenParam);
    var e = this.GetHorizontalLayout(3).GetRootComponent();
    this.Wao.UiItem.SetUIParent(e), this.Refresh();
  }
  OnBeforeDestroy() {
    this.CommonSelectItemLayout?.ClearChildren(),
      this.Wao &&
        UiActorPool_1.UiActorPool.RecycleAsync(
          this.Wao,
          RoguelikeDefine_1.COMMON_SELECT_ITEM,
        );
  }
  Refresh() {
    this.CommonSelectItemLayout.RefreshByDataAsync(
      this.oho.RogueGainEntryArray,
    ).then(
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
exports.EventResultViewAll = EventResultViewAll;
//# sourceMappingURL=EventResultView.js.map
