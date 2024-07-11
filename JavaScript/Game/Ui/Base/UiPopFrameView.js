"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPopFrameView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiLayer_1 = require("../UiLayer");
const UiPopFrameViewStorage_1 = require("../UiPopFrameViewStorage");
const UiPanelBase_1 = require("./UiPanelBase");
const UiSequencePlayer_1 = require("./UiSequencePlayer");
class UiPopFrameView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.PopItem = void 0),
      (this.s_r = void 0),
      (this.Gft = void 0),
      (this.s_r = e);
  }
  OnBeforeCreate() {
    const e =
      UiPopFrameViewStorage_1.UiPopFrameViewStorage.GetUiBehaviourPopInfo(
        this.s_r.CommonPopBg,
      );
    const i = e[0];
    (this.PopItem = new e[1]()),
      this.SetRootActorLoadInfo(
        i,
        UiLayer_1.UiLayer.GetLayerRootUiItem(this.s_r.Type),
        !1,
      );
  }
  async OnBeforeHideAsync() {
    const e = new CustomPromise_1.CustomPromise();
    await this.Gft.PlaySequenceAsync("Close", e, !0);
  }
  async OnBeforeStartAsync() {
    await this.PopItem.OnlyCreateByActorAsync(this.GetOriginalActor()),
      this.PopItem.SetViewInfo(this.s_r);
    const e = this.Parent.GetOriginalActor().GetComponentByClass(
      UE.UIItem.StaticClass(),
    );
    this.PopItem.AttachItem(e, this.Parent.GetRootItem()),
      this.PopItem.SetPopupViewBase(),
      this.AddChild(this.PopItem),
      (this.Gft = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem));
  }
  async OnShowAsyncImplementImplement() {
    const e = new CustomPromise_1.CustomPromise();
    const i = new CustomPromise_1.CustomPromise();
    this.Gft.PlaySequenceAsync("Start", e).finally(() => {
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
}
exports.UiPopFrameView = UiPopFrameView;
// # sourceMappingURL=UiPopFrameView.js.map
