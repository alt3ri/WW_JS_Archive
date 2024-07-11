"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPopFrameView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiLayer_1 = require("../UiLayer"),
  UiPopFrameViewStorage_1 = require("../UiPopFrameViewStorage"),
  UiPanelBase_1 = require("./UiPanelBase"),
  UiSequencePlayer_1 = require("./UiSequencePlayer");
class UiPopFrameView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.PopItem = void 0),
      (this.our = void 0),
      (this.$pt = void 0),
      (this.our = e);
  }
  OnBeforeCreate() {
    var e = UiPopFrameViewStorage_1.UiPopFrameViewStorage.GetUiBehaviourPopInfo(
        this.our.CommonPopBg,
      ),
      i = e[0];
    (this.PopItem = new e[1]()),
      this.SetRootActorLoadInfo(
        i,
        UiLayer_1.UiLayer.GetLayerRootUiItem(this.our.Type),
        !1,
      );
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.$pt.PlaySequenceAsync("Close", e, !0);
  }
  async OnBeforeStartAsync() {
    await this.PopItem.OnlyCreateByActorAsync(this.GetOriginalActor()),
      this.PopItem.SetViewInfo(this.our);
    var e = this.Parent.GetOriginalActor().GetComponentByClass(
      UE.UIItem.StaticClass(),
    );
    this.PopItem.AttachItem(e, this.Parent.GetRootItem()),
      this.PopItem.SetPopupViewBase(),
      this.AddChild(this.PopItem),
      (this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem));
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    const i = new CustomPromise_1.CustomPromise();
    this.$pt.PlaySequenceAsync("Start", e).finally(() => {
      i.SetResult(!0);
    }),
      await i.Promise;
  }
  OnBeforeShow() {}
  SetCloseBtnInteractive(e) {
    this.PopItem.SetCloseBtnInteractive(e);
  }
  SetTitleByTextIdAndArg(e, ...i) {
    this.PopItem.SetTitleByTextIdAndArg(e, i);
  }
  SetBackBtnShowState(e) {
    this.PopItem.SetBackBtnShowState(e);
  }
  GetPopViewRootActor() {
    return this.GetRootActor();
  }
  GetPopViewRootItem() {
    return this.GetRootItem();
  }
  GetPopViewOriginalActor() {
    return this.GetOriginalActor();
  }
  HidePopView() {
    this.Hide();
  }
  ShowPopView() {
    this.Show();
  }
  SetViewPermanent() {
    LguiUtil_1.LguiUtil.SetActorIsPermanent(this.GetOriginalActor(), !0, !0);
  }
  PlayLevelSequenceByName(e, i = !1) {
    this.$pt.PlaySequence(e, i);
  }
  async PlaySequenceAsync(e, i, t = !1, s = !1) {
    await this.$pt.PlaySequenceAsync(e, i, t, s);
  }
}
exports.UiPopFrameView = UiPopFrameView;
//# sourceMappingURL=UiPopFrameView.js.map
