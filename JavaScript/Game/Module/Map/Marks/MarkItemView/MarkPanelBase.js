"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkPanelBase = void 0);
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiActorPool_1 = require("../../../../Ui/UiActorPool"),
  MarkSpritePool_1 = require("../../Container/MarkSpritePool");
class MarkPanelBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.Dh_ = void 0),
      (this.NPt = void 0),
      (this.LoadingPromiseInner = void 0),
      (this.hUc = void 0),
      (this.SkipDestroyActor = !0);
  }
  get LoadingPromise() {
    return this.LoadingPromiseInner;
  }
  async CreateByPoolResourceIdAsync(i, t) {
    await this.Bh_(i, t),
      this.IsDestroyOrDestroying ||
        this.WaitToDestroy ||
        (await this.CreateByActorAsync(this.Dh_.Actor, t));
  }
  async CreateThenShowByPoolResourceIdAsync(i, t) {
    await this.Bh_(i, t),
      this.IsDestroyOrDestroying ||
        this.WaitToDestroy ||
        (await this.CreateThenShowByActorAsync(this.Dh_.Actor, t));
  }
  async Bh_(i, t) {
    this.NPt = i;
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    (this.Dh_ = await UiActorPool_1.UiActorPool.GetAsync(i)),
      void 0 !== t && this.Dh_.UiItem.SetUIParent(t);
  }
  RecycleToPool() {
    this.qh_();
  }
  async qh_() {
    this.LoadingPromise &&
      (await this.LoadingPromise, (this.LoadingPromiseInner = void 0)),
      this.Destroy(),
      void 0 !== this.Dh_ &&
        (UiActorPool_1.UiActorPool.RecycleAsync(this.Dh_, this.NPt),
        (this.Dh_ = void 0));
  }
  OnAfterHide() {
    MarkSpritePool_1.MarkSpritePool.UnRef(this.ComponentId);
  }
  SetSpriteByPath(t, s, i, e = void 0, o = void 0) {
    var r;
    StringUtils_1.StringUtils.IsEmpty(t)
      ? o?.(!1)
      : (r = MarkSpritePool_1.MarkSpritePool.Get(
            this.ComponentId,
            t,
          ))?.IsValid()
        ? (s.SetSprite(r, i), o && o(!0))
        : super.SetSpriteByPath(t, s, i, e, (i) => {
            i &&
              MarkSpritePool_1.MarkSpritePool.Ref(
                this.ComponentId,
                t,
                s.GetSprite(),
              ),
              o && o(i);
          });
  }
  SetVisible(i) {
    i
      ? (this.lUc(), this.RootItem?.bIsUIActive || this.SetUiActive(!0))
      : (this._Uc(),
        this.RootItem.SetAnchorOffsetX(MathUtils_1.MathUtils.Int32Max));
  }
  _Uc() {
    this.hUc = this.RootItem.GetAnchorOffsetX();
  }
  lUc() {
    void 0 !== this.hUc && this.RootItem.SetAnchorOffsetX(this.hUc);
  }
}
exports.MarkPanelBase = MarkPanelBase;
//# sourceMappingURL=MarkPanelBase.js.map
