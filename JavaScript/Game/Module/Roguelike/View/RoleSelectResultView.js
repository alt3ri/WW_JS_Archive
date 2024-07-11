"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSelectResultView = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiActorPool_1 = require("../../../Ui/UiActorPool"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView"),
  RoleSelectItem_1 = require("./RoleSelectItem");
class RoleSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments),
      (this.Xso = void 0),
      (this.Bho = void 0),
      (this.UiPoolActorPrivate = void 0),
      (this.bho = () => {
        return new RoleSelectItem_1.RoleSelectItem();
      }),
      (this.OnDescModelChange = () => {
        this.Refresh();
      }),
      (this.qho = () => {
        var e = this.Xso.NewRogueGainEntry,
          t = this.Xso.OldRogueGainEntry,
          i = new Set();
        if (e)
          for (const s of e.AffixEntryList)
            t?.AffixEntryList?.find((e) => e.Id === s.Id) ||
              i.has(s.Id) ||
              i.add(s.Id);
        i.size <= 0 ||
          ((e = this.Bho.GetLayoutItemByIndex(0)) &&
            e.SetSecondColorForAttrItem(i));
      });
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      RoguelikeDefine_1.ROLE_SELECT_ITEM,
    );
    this.UiPoolActorPrivate = await UiActorPool_1.UiActorPool.GetAsync(e);
  }
  OnStart() {
    super.OnStart(),
      this.UiPoolActorPrivate.UiItem.SetUIParent(
        this.GetHorizontalLayout(3).GetRootComponent(),
      ),
      (this.Xso = this.GetViewParam()),
      (this.Bho = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.bho,
      ));
  }
  OnBeforeDestroy() {
    this.UiPoolActorPrivate &&
      UiActorPool_1.UiActorPool.RecycleAsync(
        this.UiPoolActorPrivate,
        RoguelikeDefine_1.ROLE_SELECT_ITEM,
      );
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.Aao(), this.RefreshTitleText();
  }
  Aao() {
    this.Bho.RefreshByDataAsync([this.Xso.NewRogueGainEntry]).then(() => {
      this.qho();
    });
  }
  RefreshTitleText() {
    this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_18_TEXT);
  }
}
exports.RoleSelectResultView = RoleSelectResultView;
//# sourceMappingURL=RoleSelectResultView.js.map
