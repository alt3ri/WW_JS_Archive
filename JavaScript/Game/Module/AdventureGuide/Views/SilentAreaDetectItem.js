"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentResultItem =
    exports.SilentCategoryItem =
    exports.SilentAreaDetectDynamicItem =
      void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class SilentAreaDetectDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.O8e = void 0),
      (this.k8e = void 0),
      (this.F8e = void 0),
      (this.V8e = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.O8e || (this.O8e = new SilentCategoryItem(this.GetItem(0))),
      this.k8e || (this.k8e = new SilentResultItem(this.GetItem(1)));
  }
  GetUsingItem(t) {
    if (t.SilentAreaDetectionData) {
      const i = this.GetItem(1);
      return i.GetOwner();
    }
    const i = this.GetItem(0);
    return i.GetOwner();
  }
  Update(t, i) {
    (this.Data = t),
      this.k8e.SetActive(!1),
      this.O8e.SetActive(!1),
      t.SilentAreaDetectionData
        ? (this.k8e.SetActive(!0),
          this.k8e.Update(t.SilentAreaDetectionData),
          this.k8e.BindResultCallback(this.V8e))
        : (this.O8e.SetActive(!0),
          this.O8e.Update([t.SilentAreaTitleData, t.IsShow]),
          this.O8e.BindCategoryCallback(this.F8e));
  }
  BindClickCategoryCallback(t) {
    this.F8e = t;
  }
  BindClickResultCallback(t) {
    this.V8e = t;
  }
  ClearItem() {
    this.Destroy();
  }
  OnBeforeDestroy() {
    this.O8e && (this.O8e.Destroy(), (this.O8e = void 0)),
      this.k8e && (this.k8e.Destroy(), (this.k8e = void 0));
  }
}
exports.SilentAreaDetectDynamicItem = SilentAreaDetectDynamicItem;
class SilentCategoryItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.$Ve = void 0),
      (this.H8e = void 0),
      (this.Pe = void 0),
      (this.j8e = !1),
      (this.OnClickExtendToggle = (t) => {
        (this.j8e = !this.j8e),
          this.H8e && this.H8e(this.Pe.TypeDescription, this.$Ve, this.j8e);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  OnStart() {
    (this.$Ve = this.GetExtendToggle(0)),
      this.$Ve.SetToggleState(0),
      this.$Ve.OnPostAudioEvent.Bind((t) => {
        t && this.PostClickAudioEvent(t);
      }),
      this.$Ve.OnPostAudioStateEvent.Bind((t, i) => {
        i && this.PostClickAudioEvent(i);
      });
  }
  OnBeforeDestroy() {
    this.W8e(),
      (this.Pe = void 0),
      this.$Ve.OnPostAudioEvent.Unbind(),
      this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Update(t) {
    (this.Pe = t[0]),
      (this.j8e = t[1]),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.TitleName),
      this.GetExtendToggle(0).SetToggleState(this.j8e ? 1 : 0, !1),
      this.K8e();
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot(
      "AdventureFirstAwardCategory",
      this.GetItem(3),
      void 0,
      this.Pe.TypeDescription,
    );
  }
  W8e() {
    this.Pe &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        "AdventureFirstAwardCategory",
        this.GetItem(3),
        this.Pe.TypeDescription,
      );
  }
  RefreshRedDot(t) {
    this.GetItem(3).SetUIActive(t);
  }
  BindCategoryCallback(t) {
    this.H8e = t;
  }
}
exports.SilentCategoryItem = SilentCategoryItem;
class SilentResultItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Q8e = void 0),
      (this.Pe = void 0),
      (this.$Ve = void 0),
      (this.OnClickExtendToggle = (t) => {
        this.Q8e && this.Q8e(this.Pe.Conf.Id, this.$Ve);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  OnStart() {
    (this.$Ve = this.GetExtendToggle(0)),
      this.$Ve.SetToggleState(0),
      this.$Ve.OnPostAudioEvent.Bind((t) => {
        t && this.PostClickAudioEvent(t);
      }),
      this.$Ve.OnPostAudioStateEvent.Bind((t, i) => {
        i && this.PostClickAudioEvent(i);
      });
  }
  OnBeforeDestroy() {
    this.W8e(),
      (this.Pe = void 0),
      this.$Ve.OnPostAudioEvent.Unbind(),
      this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Update(t) {
    this.Pe = t;
    var i = this.GetText(4),
      s = t.Conf.Name,
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(i, s),
        this.GetText(3).SetUIActive(!1),
        this.GetTexture(1).SetUIActive(!1),
        this.GetItem(2));
    t.IsLock
      ? (s.SetUIActive(!0), i.SetUIActive(!1))
      : (s.SetUIActive(!1), i.SetUIActive(!0)),
      this.GetSprite(5).SetUIActive(t.IsTargeting),
      this.K8e();
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot(
      "AdventureFirstAwardResult",
      this.GetItem(6),
      void 0,
      this.Pe.Conf.Id,
    );
  }
  W8e() {
    this.Pe &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        "AdventureFirstAwardResult",
        this.GetItem(6),
        this.Pe.Conf.Id,
      );
  }
  BindResultCallback(t) {
    this.Q8e = t;
  }
}
exports.SilentResultItem = SilentResultItem;
//# sourceMappingURL=SilentAreaDetectItem.js.map
