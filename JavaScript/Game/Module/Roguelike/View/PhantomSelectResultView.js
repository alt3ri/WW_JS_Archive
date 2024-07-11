"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomSelectResultView = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiActorPool_1 = require("../../../Ui/UiActorPool"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  PhantomSelectItem_1 = require("./PhantomSelectItem"),
  RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class PhantomSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments),
      (this.jao = void 0),
      (this.yho = void 0),
      (this.Iho = void 0),
      (this.Tho = () => {
        return new PhantomSelectItem_1.PhantomSelectItem(!1);
      }),
      (this.OnDescModelChange = () => {
        this.Refresh();
      });
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
    );
    this.Iho = await UiActorPool_1.UiActorPool.GetAsync(e);
  }
  OnStart() {
    super.OnStart(),
      (this.jao = this.OpenParam),
      this.Iho.UiItem.SetUIParent(
        this.GetHorizontalLayout(3).GetRootComponent(),
      ),
      (this.yho = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.Tho,
      ));
  }
  OnBeforeDestroy() {
    this.Iho &&
      UiActorPool_1.UiActorPool.RecycleAsync(
        this.Iho,
        RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
      );
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.Lho(), this.RefreshTitleText();
  }
  Lho() {
    this.yho.RefreshByData([this.jao.NewRogueGainEntry]);
  }
  RefreshTitleText() {
    void 0 === this.jao.OldRogueGainEntry
      ? this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_25_TEXT)
      : this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_19_TEXT);
  }
}
exports.PhantomSelectResultView = PhantomSelectResultView;
//# sourceMappingURL=PhantomSelectResultView.js.map
