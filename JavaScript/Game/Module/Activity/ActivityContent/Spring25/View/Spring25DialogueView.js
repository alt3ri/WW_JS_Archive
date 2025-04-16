"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25DialogueView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller"),
  Spring25Define_1 = require("../Spring25Define");
class Spring25DialogueView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lGe = void 0),
      (this.L8e = void 0),
      (this.YGl = void 0),
      (this.zGl = () => {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleConfirmClickInDialogueView();
      }),
      (this.eFl = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Spring25", 64, "对话事件触发", ["passData", e]);
        var i = this.OpenParam,
          e = Spring25Define_1.spring25DialogIndex.get(e);
        void 0 === e ||
          e >= i.ChatDataList.length ||
          (0 === (i = i.ChatDataList[e]).Position
            ? (this.L8e.RefreshText(i.ContentTextId), this.L8e)
            : (this.YGl.RefreshText(i.ContentTextId), this.YGl)
          ).RefreshAnim(i.SpineAnimName);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    e.IsOpening && (this.UiViewSequence.StartSequenceName = "Start02"),
      (this.lGe = new ButtonItem_1.ButtonItem(this.GetItem(0))),
      this.lGe.SetFunction(this.zGl),
      this.lGe.SetLocalTextNew(Spring25Define_1.BUTTON_TEXT_ID_IN_DIALOG),
      (this.L8e = new RoleItem()),
      await this.L8e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.YGl = new RoleItem()),
      await this.YGl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      await Promise.all([
        this.L8e.RefreshExternalByDataAsync(e.LeftSpineData),
        this.YGl.RefreshExternalByDataAsync(e.RightSpineData),
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.eFl,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.eFl,
    );
  }
}
exports.Spring25DialogueView = Spring25DialogueView;
class RoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.SpineSkeletonAnimationComponent],
    ];
  }
  async RefreshExternalByDataAsync(e) {
    void 0 !== e.AtlasPath &&
      void 0 !== e.SkeletonDataPath &&
      (await this.SetSpineAssetByPath(
        e.AtlasPath,
        e.SkeletonDataPath,
        this.GetSpine(0),
      ),
      this.GetSpine(0).SetAnimation(0, "idle", !0),
      this.GetText(2)?.SetText(""));
  }
  RefreshText(e) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), e);
  }
  RefreshAnim(e) {
    this.GetSpine(0).SetAnimation(0, e, !0);
  }
}
//# sourceMappingURL=Spring25DialogueView.js.map
