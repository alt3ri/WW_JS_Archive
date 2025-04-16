"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VersionPreheatVoteView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class VersionPreheatVoteView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.rul = void 0),
      (this.oul = void 0),
      (this.s4e = void 0),
      (this.Y_l = () => {
        this.CloseMe();
      }),
      (this.z_l = () => {
        this.CloseMe();
      }),
      (this.sul = (e) => {
        this.rul.RefreshToggle(e), this.oul.RefreshToggle(!e);
      }),
      (this.a4e = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[8, this.Y_l]]);
  }
  async OnBeforeStartAsync() {
    (this.rul = new VersionPreheatToggleItem()),
      await this.rul.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      (this.oul = new VersionPreheatToggleItem()),
      await this.oul.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      (this.s4e = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(6),
        this.a4e,
      )),
      this.RefreshExternal(this.OpenParam);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.VersionPreheatRewardResponse,
      this.z_l,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.VersionPreheatOnClickVote,
        this.sul,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.VersionPreheatRewardResponse,
      this.z_l,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.VersionPreheatOnClickVote,
        this.sul,
      );
  }
  RefreshExternal(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TitleTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.ContentTextId),
      this.GetItem(0)?.SetUIActive(0 === e.CrestIndex),
      this.GetItem(1)?.SetUIActive(1 === e.CrestIndex),
      this.rul.RefreshExternal(e.LeftToggleData),
      this.oul.RefreshExternal(e.RightToggleData),
      this.s4e.RefreshByData(e.ItemListData),
      void 0 === e.IsLeftChosen
        ? (this.rul.RefreshToggleDirectly(!1),
          this.oul.RefreshToggleDirectly(!1))
        : this.sul(e.IsLeftChosen);
  }
}
exports.VersionPreheatVoteView = VersionPreheatVoteView;
class VersionPreheatToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._9a = void 0),
      (this.p9a = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.VersionPreheatOnClickVote,
          this._9a.ClickPassData,
        );
        var e = this._9a;
        e.ClickFunc(e.Id, e.ClickPassData);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.p9a]]);
  }
  RefreshExternal(e) {
    (this._9a = e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.ContentTextId),
      this.GetExtendToggle(0).SetToggleState(0);
  }
  RefreshToggle(e) {
    var t = this.GetExtendToggle(0);
    t.SetToggleState(e ? 1 : 0), (t.IsSelfInteractive = !1);
  }
  RefreshToggleDirectly(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
  }
}
//# sourceMappingURL=VersionPreheatVoteView.js.map
