"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputMultiKeyItemGroup = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputKeyDefine_1 = require("./InputKeyDefine"),
  InputMultiKeyItem_1 = require("./InputMultiKeyItem");
class InputMultiKeyItemGroup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.vAt = void 0),
      (this.MAt = void 0),
      (this.vq = !1),
      (this.EAt = void 0),
      (this.XBo = () => {
        this.EAt && this.SAt(this.EAt);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.vAt = new InputMultiKeyItem_1.InputMultiKeyItem(!1)),
      (this.MAt = new InputMultiKeyItem_1.InputMultiKeyItem(!1)),
      await Promise.all([
        this.vAt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), !0),
        this.MAt.CreateThenShowByActorAsync(this.GetItem(2).GetOwner(), !0),
      ]);
  }
  OnStart() {}
  OnBeforeDestroy() {
    (this.vAt = void 0), (this.vAt = void 0);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      this.EAt && this.SAt(this.EAt);
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    );
  }
  Refresh(e) {
    (this.EAt = e), this.SAt(e);
  }
  SAt(e) {
    var t = e.SingleActionOrAxisKeyItem,
      i = e.DoubleActionOrAxisKeyItem,
      e = e.LinkString,
      s = this.GetText(0);
    this.vAt?.RefreshByActionOrAxis(t),
      this.vAt?.SetActive(!0),
      i
        ? (this.MAt?.RefreshByActionOrAxis(i),
          this.MAt?.SetActive(!0),
          s.SetText(e ?? "/"),
          s.SetUIActive(!0))
        : (this.MAt?.SetActive(!1), s.SetUIActive(!1));
  }
  SetEnable(e, t = !1) {
    (this.vq === e && !t) ||
      (e
        ? this.RootItem.SetAlpha(1)
        : this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA),
      (this.vq = e));
  }
}
exports.InputMultiKeyItemGroup = InputMultiKeyItemGroup;
//# sourceMappingURL=InputMultiKeyItemGroup.js.map
