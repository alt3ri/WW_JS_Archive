"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableToggleItem =
    exports.ActivityTurntableToggleGroupItem =
    exports.ActivityTurntableQuestItem =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
class ActivityTurntableQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.FRe = 0),
      (this.LOe = 0),
      (this.gOe = void 0),
      (this.uLn = () => {
        this.FRe &&
          (UiManager_1.UiManager.OpenView("QuestView", this.FRe),
          this.t2n()?.ReadCurrentUnlockQuest());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.uLn]]);
  }
  async OnBeforeStartAsync() {
    var t = new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    await t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      (this.gOe = t);
  }
  Refresh(t, i, e, s) {
    this.gOe.Refresh({ Item: i, HasClaimed: t }),
      this.GetButton(3).RootUIComp.SetUIActive(!t),
      (this.FRe = e),
      (this.LOe = s);
  }
  SetTitle(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t, ...i);
  }
  SetTxtById(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...i);
  }
  SetTxt(t) {
    this.GetText(1).SetText(t);
  }
  SetRedDot(t) {
    this.GetItem(4).SetUIActive(t);
  }
  t2n() {
    if (this.LOe)
      return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        this.LOe,
      );
  }
}
exports.ActivityTurntableQuestItem = ActivityTurntableQuestItem;
class ActivityTurntableToggleGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.cLn = void 0),
      (this.mLn = void 0),
      (this.zji = void 0),
      (this.CanToggleExecuteChange = void 0),
      (this.ToggleCallBack = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0),
      t =
        ((this.cLn = new ActivityTurntableToggleItem()),
        await this.cLn.CreateThenShowByActorAsync(t.GetOwner()),
        (this.cLn.ToggleCallBack = this.ToggleCallBack),
        (this.cLn.CanToggleExecuteChange = this.CanToggleExecuteChange),
        this.GetItem(1));
    (this.mLn = new ActivityTurntableToggleItem()),
      await this.mLn.CreateThenShowByActorAsync(t.GetOwner()),
      (this.mLn.ToggleCallBack = this.ToggleCallBack),
      (this.mLn.CanToggleExecuteChange = this.CanToggleExecuteChange);
  }
  OnStart() {
    this.SetToggleDisable(!1);
  }
  SetToggleDisable(t) {
    var i = this.GetToggleState();
    (this.zji = t ? this.mLn : this.cLn),
      void 0 !== i && this.zji.SetToggleState(1 === i),
      this.GetItem(0)?.SetUIActive(!t),
      this.GetItem(1)?.SetUIActive(t);
  }
  Refresh(t) {
    this.cLn.Refresh(t), this.mLn.Refresh(t);
  }
  GetToggleState() {
    return this.zji?.GetToggleState();
  }
  SetToggleState(t, i = !1) {
    this.zji?.SetToggleState(t, i);
  }
}
exports.ActivityTurntableToggleGroupItem = ActivityTurntableToggleGroupItem;
class ActivityTurntableToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RoundId = 0),
      (this.Toggle = void 0),
      (this.CanToggleExecuteChange = void 0),
      (this.ToggleCallBack = void 0),
      (this.uFe = () =>
        !this.CanToggleExecuteChange ||
        this.CanToggleExecuteChange(this.RoundId)),
      (this.cFe = () => {
        this.ToggleCallBack &&
          this.ToggleCallBack(this.RoundId, 1 === this.Toggle.GetToggleState());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.cFe]]);
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(0)),
      this.Toggle &&
        (this.Toggle.CanExecuteChange.Unbind(),
        this.Toggle.CanExecuteChange.Bind(this.uFe));
  }
  Refresh(t) {
    (this.RoundId = t), this.dLn();
  }
  dLn() {
    var t = this.RoundId + 1,
      i = "SP_TurntableSelect_Index0" + t,
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i),
      i =
        (this.SetSpriteByPath(i, this.GetSprite(2), !1),
        "SP_TurntableNormal_Index0" + t),
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(t, this.GetSprite(1), !1);
  }
  GetToggleState() {
    return this.Toggle.GetToggleState();
  }
  SetToggleState(t, i = !1) {
    this.Toggle.SetToggleState(t ? 1 : 0, i);
  }
}
exports.ActivityTurntableToggleItem = ActivityTurntableToggleItem;
//# sourceMappingURL=ActivityTurntableItem.js.map
