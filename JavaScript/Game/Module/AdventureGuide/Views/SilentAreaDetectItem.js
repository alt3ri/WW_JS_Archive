"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentResultItem =
    exports.SilentCategoryItem =
    exports.SilentAreaDetectDynamicItem =
      void 0);
const UE = require("ue");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SilentAreaDetectDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.T6e = void 0),
      (this.L6e = void 0),
      (this.D6e = void 0),
      (this.R6e = void 0);
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
    this.T6e || (this.T6e = new SilentCategoryItem(this.GetItem(0))),
      this.L6e || (this.L6e = new SilentResultItem(this.GetItem(1)));
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
      this.L6e.SetActive(!1),
      this.T6e.SetActive(!1),
      t.SilentAreaDetectionData
        ? (this.L6e.SetActive(!0),
          this.L6e.Update(t.SilentAreaDetectionData),
          this.L6e.BindResultCallback(this.R6e))
        : (this.T6e.SetActive(!0),
          this.T6e.Update([t.SilentAreaTitleData, t.IsShow]),
          this.T6e.BindCategoryCallback(this.D6e));
  }
  BindClickCategoryCallback(t) {
    this.D6e = t;
  }
  BindClickResultCallback(t) {
    this.R6e = t;
  }
  ClearItem() {
    this.Destroy();
  }
  OnBeforeDestroy() {
    this.T6e && (this.T6e.Destroy(), (this.T6e = void 0)),
      this.L6e && (this.L6e.Destroy(), (this.L6e = void 0));
  }
}
exports.SilentAreaDetectDynamicItem = SilentAreaDetectDynamicItem;
class SilentCategoryItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.b5e = void 0),
      (this.U6e = void 0),
      (this.Pe = void 0),
      (this.A6e = !1),
      (this.OnClickExtendToggle = (t) => {
        (this.A6e = !this.A6e),
          this.U6e && this.U6e(this.Pe.TypeDescription, this.b5e, this.A6e);
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
    (this.b5e = this.GetExtendToggle(0)),
      this.b5e.SetToggleState(0),
      this.b5e.OnPostAudioEvent.Bind((t) => {
        t && this.PostClickAudioEvent(t);
      }),
      this.b5e.OnPostAudioStateEvent.Bind((t, i) => {
        i && this.PostClickAudioEvent(i);
      });
  }
  OnBeforeDestroy() {
    this.P6e(),
      (this.Pe = void 0),
      this.b5e.OnPostAudioEvent.Unbind(),
      this.b5e.OnPostAudioStateEvent.Unbind();
  }
  Update(t) {
    (this.Pe = t[0]),
      (this.A6e = t[1]),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.TitleName),
      this.GetExtendToggle(0).SetToggleState(this.A6e ? 1 : 0, !1),
      this.x6e();
  }
  x6e() {
    RedDotController_1.RedDotController.BindRedDot(
      "AdventureFirstAwardCategory",
      this.GetItem(3),
      void 0,
      this.Pe.TypeDescription,
    );
  }
  P6e() {
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
    this.U6e = t;
  }
}
exports.SilentCategoryItem = SilentCategoryItem;
class SilentResultItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.w6e = void 0),
      (this.Pe = void 0),
      (this.b5e = void 0),
      (this.OnClickExtendToggle = (t) => {
        this.w6e && this.w6e(this.Pe.Conf.Id, this.b5e);
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
    (this.b5e = this.GetExtendToggle(0)),
      this.b5e.SetToggleState(0),
      this.b5e.OnPostAudioEvent.Bind((t) => {
        t && this.PostClickAudioEvent(t);
      }),
      this.b5e.OnPostAudioStateEvent.Bind((t, i) => {
        i && this.PostClickAudioEvent(i);
      });
  }
  OnBeforeDestroy() {
    this.P6e(),
      (this.Pe = void 0),
      this.b5e.OnPostAudioEvent.Unbind(),
      this.b5e.OnPostAudioStateEvent.Unbind();
  }
  Update(t) {
    this.Pe = t;
    const i = this.GetText(4);
    var s = t.Conf.Name;
    var s =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(i, s),
      this.GetText(3).SetUIActive(!1),
      this.GetTexture(1).SetUIActive(!1),
      this.GetItem(2));
    t.IsLock
      ? (s.SetUIActive(!0), i.SetUIActive(!1))
      : (s.SetUIActive(!1), i.SetUIActive(!0)),
      this.GetSprite(5).SetUIActive(t.IsTargeting),
      this.x6e();
  }
  x6e() {
    RedDotController_1.RedDotController.BindRedDot(
      "AdventureFirstAwardResult",
      this.GetItem(6),
      void 0,
      this.Pe.Conf.Id,
    );
  }
  P6e() {
    this.Pe &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        "AdventureFirstAwardResult",
        this.GetItem(6),
        this.Pe.Conf.Id,
      );
  }
  BindResultCallback(t) {
    this.w6e = t;
  }
}
exports.SilentResultItem = SilentResultItem;
// # sourceMappingURL=SilentAreaDetectItem.js.map
