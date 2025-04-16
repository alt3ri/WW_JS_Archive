"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotReviewDynamicScrollItem = void 0);
const UE = require("ue"),
  SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PlotReviewDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Index = -1),
      (this.Pe = void 0),
      (this.IZ_ = new PlotReviewTalkItem()),
      (this.TZ_ = new PlotReviewOptionItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.WZt();
  }
  async WZt() {
    var t = this.GetItem(0),
      e = (t.SetUIActive(!1), this.GetItem(1));
    e.SetUIActive(!1),
      await Promise.all([
        this.IZ_.CreateByActorAsync(t.GetOwner()),
        this.TZ_.CreateByActorAsync(e.GetOwner()),
      ]);
  }
  GetUsingItem(t) {
    let e = void 0;
    switch (t.Type) {
      case 0:
        e = 0;
        break;
      case 1:
        e = 1;
    }
    return this.GetItem(e).GetOwner();
  }
  Update(t, e) {
    (this.Pe = t), (this.Index = e), this.Refresh();
  }
  Refresh() {
    let t = !1,
      e = !1;
    switch (this.Pe.Type) {
      case 0:
        (t = !0), this.RefreshTalkItem();
        break;
      case 1:
        (e = !0), this.RefreshOptionItem();
    }
    this.GetItem(0).SetUIActive(t), this.GetItem(1).SetUIActive(e);
  }
  RefreshTalkItem() {
    var t = this.Pe.Data;
    this.IZ_.Update(t, this.Index);
  }
  RefreshOptionItem() {
    var t = this.Pe.Data;
    this.TZ_.Update(t, this.Index);
  }
  SetTalkItemToggleClickCallBack(t) {
    this.IZ_.OnToggleClick = t;
  }
  SetTalkItemToggleState(t) {
    this.IZ_.SetToggleState(t);
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.PlotReviewDynamicScrollItem = PlotReviewDynamicScrollItem;
class PlotReviewTalkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Index = -1),
      (this.Pe = void 0),
      (this.OnToggleClick = void 0),
      (this.bZ_ = !1),
      (this.LZ_ = () => {
        this.OnToggleClick?.(this.Index);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[3, this.LZ_]]);
  }
  OnStart() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(
      this.GetText(1),
      0,
    );
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(
      this.GetText(1),
    );
  }
  Update(t, e) {
    (this.Pe = t), (this.Index = e), this.Refresh();
  }
  Refresh() {
    this.RefreshName(), this.RefreshContent(), this.RefreshAudio();
  }
  RefreshName() {
    var t = this.Pe.TalkItem,
      t = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId),
      e = t ? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, t.Id) : void 0,
      t = t ? PublicUtil_1.PublicUtil.GetConfigTextByTable(1, t.Id) : void 0,
      t = StringUtils_1.StringUtils.IsEmpty(e) ? t : e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "PlotReview_1",
      t ?? "",
    );
  }
  RefreshContent() {
    var t = this.Pe.TalkItem.TidTalk;
    t &&
      ((t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t)),
      (t =
        ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t))) &&
      this.GetText(1).SetText(t);
  }
  RefreshAudio() {
    var t = this.Pe.TalkItem,
      t =
        ((this.bZ_ = t.PlayVoice ?? !1),
        this.GetSprite(2).SetUIActive(this.bZ_),
        this.Pe.IsPlaying ? 1 : 0);
    this.SetToggleState(t);
  }
  SetToggleState(t) {
    this.GetExtendToggle(3).SetToggleState(t);
  }
}
class PlotReviewOptionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Index = -1), (this.Pe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PlotReview_2"),
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(
        this.GetText(1),
        0,
      );
  }
  OnBeforeHide() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(
      this.GetText(1),
    );
  }
  Update(t, e) {
    (this.Pe = t), (this.Index = e), this.Refresh();
  }
  Refresh() {
    var t,
      e = this.Pe.TalkItem;
    !e ||
      !(e = e.Options) ||
      (t = this.Pe.OptionIndex) < 0 ||
      ((e = e[t]),
      (t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e.TidTalkOption)),
      (t = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t)),
      this.GetText(1).SetText(t));
  }
}
//# sourceMappingURL=PlotReviewDynamicScrollItem.js.map
