"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractSystemViewItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  HelpController_1 = require("../../Module/Help/HelpController"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiManager_1 = require("../UiManager"),
  CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase"),
  PopupCaptionItem_1 = require("./PopupCaptionItem");
class InteractSystemViewItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments),
      (this.n6t = void 0),
      (this.gcr = void 0),
      (this.dtt = () => {
        var t = this.gcr.HelpGroupId;
        HelpController_1.HelpController.OpenHelpById(t);
      }),
      (this.Vgt = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Test", 8, "[CloseCookRootView]当点击关闭按钮时", [
            "viewName",
            this.ViewInfo.Name,
          ]),
          UiManager_1.UiManager.CloseView(this.ViewInfo.Name);
      });
  }
  GetAttachParent() {
    return this.GetItem(4);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UISprite],
      [4, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3));
    var t,
      i,
      e,
      s,
      o,
      r,
      n,
      h,
      a = this.ViewInfo.CommonPopBgKey,
      l =
        ConfigManager_1.ConfigManager.UiCommonConfig.GetInteractBackgroundByViewName(
          a,
        );
    l
      ? ((t = (this.gcr = l).Title),
        (i = l.TitleSpritePath),
        (e = l.ContentSpritePath),
        (s = l.CostItemList),
        (o = !StringUtils_1.StringUtils.IsEmpty(t)),
        (r = !StringUtils_1.StringUtils.IsEmpty(i)),
        (n = !StringUtils_1.StringUtils.IsEmpty(e)),
        (h = 0 < s?.length),
        this.SetTitleVisible(o),
        o && this.SetTitleText(t),
        this.SetTitleSpriteVisible(r),
        r && this.SetTitleSprite(i),
        this.SetContentSpriteVisible(n),
        n && this.SetContentSprite(e),
        this.SetCurrencyItemVisible(h),
        h && this.SetCostItemList(s),
        this.SetHelpButtonVisible(l.IsHelpButtonVisible),
        this.n6t.SetHelpCallBack(this.dtt),
        this.n6t.SetCloseCallBack(this.Vgt),
        this.n6t.SetTitleTextActive(!1),
        this.n6t.SetTitleIconVisible(!1))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Test",
          8,
          "u.Ui表现表中配置了通用背景面板(CommonPopBg)为5，但是t.通用背景-Npc系统界面通用背景中没有配置对应界面",
          ["ViewName", a],
        );
  }
  OnBeforeDestroy() {
    (this.gcr = void 0), (this.n6t = void 0);
  }
  SetTitleVisible(t) {
    this.GetText(1).SetUIActive(t);
  }
  SetTitleText(t) {
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
  }
  SetTitleSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetTitleSprite(t) {
    const i = this.GetSprite(0);
    i.SetUIActive(!1),
      this.SetSpriteByPath(t, i, !1, void 0, () => {
        i.SetUIActive(!0);
      });
  }
  SetContentSpriteVisible(t) {
    this.GetSprite(2).SetUIActive(t);
  }
  SetContentSprite(t) {
    const i = this.GetSprite(2);
    i.SetUIActive(!1),
      this.SetSpriteByPath(t, i, !1, void 0, () => {
        i.SetUIActive(!0);
      });
  }
  SetCaptionTitleVisible(t) {
    this.n6t.SetTitleTextActive(t);
  }
  SetCurrencyItemVisible(t) {
    this.n6t.SetCurrencyItemVisible(t);
  }
  SetCaptionTitleSprite(t) {
    this.n6t.SetTitleIcon(t);
  }
  SetCaptionTitleIconVisible(t) {
    this.n6t.SetTitleIconVisible(t);
  }
  async SetCostItemList(t) {
    await this.n6t.SetCurrencyItemList(t);
  }
  SetHelpButtonVisible(t) {
    this.n6t.SetHelpBtnActive(t);
  }
}
exports.InteractSystemViewItem = InteractSystemViewItem;
//# sourceMappingURL=InteractSystemViewItem.js.map
