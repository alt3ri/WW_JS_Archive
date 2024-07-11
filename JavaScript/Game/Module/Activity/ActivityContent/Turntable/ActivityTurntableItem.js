"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableToggleItem =
    exports.ActivityTurntableToggleGroupItem =
    exports.ActivityTurntableQuestItem =
      void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
class ActivityTurntableQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.FRe = 0),
      (this.LOe = 0),
      (this.gOe = void 0),
      (this.KIn = () => {
        this.FRe &&
          (UiManager_1.UiManager.OpenView("QuestView", this.FRe),
          this.Pbn()?.ReadCurrentUnlockQuest());
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
      (this.BtnBindInfo = [[3, this.KIn]]);
  }
  async OnBeforeStartAsync() {
    const t = new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
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
  Pbn() {
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
      (this.QIn = void 0),
      (this.XIn = void 0),
      (this.eji = void 0),
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
    var t = this.GetItem(0);
    var t =
      ((this.QIn = new ActivityTurntableToggleItem()),
      await this.QIn.CreateThenShowByActorAsync(t.GetOwner()),
      (this.QIn.ToggleCallBack = this.ToggleCallBack),
      (this.QIn.CanToggleExecuteChange = this.CanToggleExecuteChange),
      this.GetItem(1));
    (this.XIn = new ActivityTurntableToggleItem()),
      await this.XIn.CreateThenShowByActorAsync(t.GetOwner()),
      (this.XIn.ToggleCallBack = this.ToggleCallBack),
      (this.XIn.CanToggleExecuteChange = this.CanToggleExecuteChange);
  }
  OnStart() {
    this.SetToggleDisable(!1);
  }
  SetToggleDisable(t) {
    const i = this.GetToggleState();
    (this.eji = t ? this.XIn : this.QIn),
      void 0 !== i && this.eji.SetToggleState(i === 1),
      this.GetItem(0)?.SetUIActive(!t),
      this.GetItem(1)?.SetUIActive(t);
  }
  Refresh(t) {
    this.QIn.Refresh(t), this.XIn.Refresh(t);
  }
  GetToggleState() {
    return this.eji?.GetToggleState();
  }
  SetToggleState(t, i = !1) {
    this.eji?.SetToggleState(t, i);
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
      (this.$ke = () =>
        !this.CanToggleExecuteChange ||
        this.CanToggleExecuteChange(this.RoundId)),
      (this.Yke = () => {
        this.ToggleCallBack &&
          this.ToggleCallBack(this.RoundId, this.Toggle.GetToggleState() === 1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.Yke]]);
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(0)),
      this.Toggle &&
        (this.Toggle.CanExecuteChange.Unbind(),
        this.Toggle.CanExecuteChange.Bind(this.$ke));
  }
  Refresh(t) {
    (this.RoundId = t), this.$In();
  }
  $In() {
    var t = this.RoundId + 1;
    var i = "SP_TurntableSelect_Index0" + t;
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    var i =
      (this.SetSpriteByPath(i, this.GetSprite(2), !1),
      "SP_TurntableNormal_Index0" + t);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
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
// # sourceMappingURL=ActivityTurntableItem.js.map
