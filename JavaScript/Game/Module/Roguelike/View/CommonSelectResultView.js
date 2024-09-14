"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonSelectResultView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  UiActorPool_1 = require("../../../Ui/UiActorPool"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  CommonSelectItem_1 = require("./CommonSelectItem"),
  PhantomSelectItem_1 = require("./PhantomSelectItem"),
  RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class CommonSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments),
      (this.jao = void 0),
      (this.Wao = void 0),
      (this.Kao = void 0),
      (this.woa = void 0),
      (this.Boa = void 0),
      (this.Qao = void 0),
      (this.Xao = void 0),
      (this.OnDescModelChange = () => {
        this.Refresh();
      });
  }
  OnCloseBtnClick() {
    !this.Kao.GetRootItem().IsUIActiveInHierarchy() ||
    (this.Kao.GetRootItem().SetUIActive(!1),
    this.Boa.GetRootItem().SetUIActive(!1),
    this.jao.GetNewUnlockAffixEntry().size <= 0)
      ? this.CloseMe(this.jao?.CallBack)
      : (this.Xao.GetRootItem().SetUIActive(!0),
        this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_21_TEXT),
        this.$ao());
  }
  async OnBeforeStartAsync() {
    var e = this.GetHorizontalLayout(3).GetRootComponent(),
      e =
        ((this.Xao = new PhantomSelectItem_1.PhantomSelectItem()),
        await this.Xao.CreateThenShowByResourceIdAsync(
          RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
          e,
        ),
        (this.Kao = new CommonSelectItem_1.CommonSelectItem()),
        await this.Kao.CreateThenShowByResourceIdAsync(
          RoguelikeDefine_1.COMMON_SELECT_ITEM,
          e,
        ),
        (this.Boa = new CommonSelectItem_1.CommonSelectItem()),
        await this.Boa.CreateThenShowByResourceIdAsync(
          RoguelikeDefine_1.COMMON_SELECT_ITEM,
          e,
        ),
        (this.jao = this.OpenParam),
        this.jao.IsShowCommon && this.Yao(),
        0 < this.jao.GetNewUnlockAffixEntry().size && !this.jao.IsShowCommon);
    e && this.$ao(),
      this.Kao.SetActive(this.jao.IsShowCommon),
      this.Boa.SetActive(
        void 0 !== this.jao.ExtraRogueGainEntry && this.jao.IsShowCommon,
      ),
      this.Xao.SetActive(e),
      this.Xao.SetUnlockAttrSet(this.jao.GetNewUnlockAffixEntry()),
      this.RefreshTitleText();
  }
  Yao() {
    this.jao.SelectRogueGainEntry &&
      (this.Kao.Update(this.jao.SelectRogueGainEntry),
      this.Kao.SetToggleUnDetermined()),
      this.jao.ExtraRogueGainEntry &&
        (this.Boa.Update(this.jao.ExtraRogueGainEntry),
        this.Boa.SetToggleUnDetermined());
  }
  $ao() {
    this.Xao.Update(this.jao.NewRogueGainEntry),
      this.Xao.SetToggleUnDetermined();
  }
  OnBeforeDestroy() {
    this.Kao?.Destroy(),
      this.Wao &&
        UiActorPool_1.UiActorPool.RecycleAsync(
          this.Wao,
          RoguelikeDefine_1.COMMON_SELECT_ITEM,
        ),
      this.Boa?.Destroy(),
      this.woa &&
        UiActorPool_1.UiActorPool.RecycleAsync(
          this.woa,
          RoguelikeDefine_1.COMMON_SELECT_ITEM,
        ),
      this.Xao?.Destroy(),
      this.Qao &&
        UiActorPool_1.UiActorPool.RecycleAsync(
          this.Qao,
          RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
        );
  }
  Refresh() {
    this.Kao.RefreshPanel(),
      this.Boa.RefreshPanel(),
      this.Xao.RefreshPanel(),
      this.RefreshTitleText();
  }
  RefreshTitleText() {
    let e = void 0;
    this.jao.IsShowCommon
      ? (e = RoguelikeDefine_1.ROGUELIKEVIEW_20_TEXT)
      : 0 < this.jao.GetNewUnlockAffixEntry().size &&
        (e = RoguelikeDefine_1.ROGUELIKEVIEW_21_TEXT),
      this.GetText(4).ShowTextNew(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (1 !== e.length)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
          "configParams",
          e,
        ]);
    else if ("Sub" === e[0]) {
      e = this.Xao?.GetSubItem();
      if (e) return [e, e];
    }
  }
}
exports.CommonSelectResultView = CommonSelectResultView;
//# sourceMappingURL=CommonSelectResultView.js.map
