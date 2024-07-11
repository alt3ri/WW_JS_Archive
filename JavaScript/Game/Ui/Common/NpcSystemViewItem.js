"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcSystemViewItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const HelpController_1 = require("../../Module/Help/HelpController");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiManager_1 = require("../UiManager");
const CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
const PopupCaptionItem_1 = require("./PopupCaptionItem");
class NpcSystemViewItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments),
      (this.nVt = void 0),
      (this.Mur = void 0),
      (this.YZe = () => {
        const t = this.Mur.HelpGroupId;
        HelpController_1.HelpController.OpenHelpById(t);
      }),
      (this.ACt = () => {
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
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.OnClickMaskButton]]);
  }
  OnStart() {
    this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(5));
    let t;
    let i;
    let e;
    let s;
    let o;
    let r;
    let h;
    let l;
    let n;
    let a;
    let u;
    let g;
    let p;
    const S = this.ViewInfo.CommonPopBgKey;
    const U =
      ConfigManager_1.ConfigManager.UiCommonConfig.GetNpcSystemBackgroundByViewName(
        S,
      );
    U
      ? ((h = (this.Mur = U).Title),
        (t = U.TitleTexturePath),
        (i = U.TitleBgTexturePath),
        (e = U.TitleSymbolColor),
        (s = U.CaptionTitle),
        (o = U.CaptionTitleSpritePath),
        (r = U.CostItemList),
        (h = !StringUtils_1.StringUtils.IsEmpty(h)),
        (l = !StringUtils_1.StringUtils.IsEmpty(t)),
        (n = !StringUtils_1.StringUtils.IsEmpty(i)),
        (a = !StringUtils_1.StringUtils.IsEmpty(e)),
        (u = !StringUtils_1.StringUtils.IsEmpty(s)),
        (g = !StringUtils_1.StringUtils.IsEmpty(o)),
        (p = r?.length > 0),
        this.SetTitleVisible(h),
        h && this.SetTitleText(U.Title),
        this.SetTitleTextureVisible(l),
        l && this.SetTitleTexture(t),
        this.SetTitleBackgroundTextureVisible(n),
        n && this.SetTitleBackgroundTexture(i),
        this.SetTitleSymbolVisible(a),
        a && this.SetTitleSymbolColor(e),
        this.SetCaptionTitleVisible(u),
        u && this.SetCaptionTitleText(s),
        this.SetCaptionTitleIconVisible(g),
        g && this.SetCaptionTitleSprite(o),
        this.SetCurrencyItemVisible(p),
        p && this.SetCostItemList(r),
        this.SetHelpButtonVisible(U.IsHelpButtonVisible),
        this.nVt.SetHelpCallBack(this.YZe),
        this.nVt.SetCloseCallBack(this.ACt))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Test",
          8,
          "u.Ui表现表中配置了通用背景面板(CommonPopBg)为5，但是t.通用背景-Npc系统界面通用背景中没有配置对应界面",
          ["ViewName", S],
        );
  }
  OnBeforeDestroy() {
    (this.Mur = void 0), (this.nVt = void 0);
  }
  SetTitleVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetTitleText(t) {
    const i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
  }
  SetTitleTextureVisible(t) {
    this.GetTexture(2).SetUIActive(t);
  }
  SetTitleTexture(t) {
    const i = this.GetTexture(2);
    i.SetUIActive(!1),
      this.SetTextureByPath(t, i, void 0, () => {
        i.SetUIActive(!0);
      });
  }
  SetTitleBackgroundTextureVisible(t) {
    this.GetTexture(1).SetUIActive(t);
  }
  SetTitleBackgroundTexture(t) {
    const i = this.GetTexture(1);
    i.SetUIActive(!1),
      this.SetTextureByPath(t, i, void 0, () => {
        i.SetUIActive(!0);
      });
  }
  SetTitleSymbolVisible(t) {
    this.GetSprite(3).SetUIActive(t);
  }
  SetTitleSymbolColor(t) {
    this.GetSprite(3).SetColor(UE.Color.FromHex(t));
  }
  SetCaptionTitleText(t) {
    this.nVt.SetTitleLocalText(t);
  }
  SetCaptionTitleVisible(t) {
    this.nVt.SetTitleTextActive(t);
  }
  SetCurrencyItemVisible(t) {
    this.nVt.SetCurrencyItemVisible(t);
  }
  SetCaptionTitleSprite(t) {
    this.nVt.SetTitleIcon(t);
  }
  SetCaptionTitleIconVisible(t) {
    this.nVt.SetTitleIconVisible(t);
  }
  async SetCostItemList(t) {
    await this.nVt.SetCurrencyItemList(t);
  }
  SetHelpButtonVisible(t) {
    this.nVt.SetHelpBtnActive(t);
  }
  SetTexBgVisible(t) {
    this.GetItem(7).SetUIActive(t);
  }
}
exports.NpcSystemViewItem = NpcSystemViewItem;
// # sourceMappingURL=NpcSystemViewItem.js.map
