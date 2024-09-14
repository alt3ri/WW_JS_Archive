"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingContainerItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController"),
  MenuController_1 = require("../MenuController"),
  MenuDefine_1 = require("../MenuDefine"),
  MenuScrollSettingButtonItem_1 = require("./MenuScrollSettingButtonItem"),
  MenuScrollSettingDropDown_1 = require("./MenuScrollSettingDropDown"),
  MenuScrollSettingSliderItem_1 = require("./MenuScrollSettingSliderItem"),
  MenuScrollSettingSwitchItem_1 = require("./MenuScrollSettingSwitchItem"),
  MenuScrollSettingTitleItem_1 = require("./MenuScrollSettingTitleItem");
class MenuScrollSettingContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Type = void 0),
      (this.Pe = void 0),
      (this.MenuScrollItemData = void 0),
      (this.IGe = void 0),
      (this.YBi = void 0),
      (this.SPe = void 0),
      (this.vVa = void 0),
      (this.Yai = (e) => {
        this.Pe && (1 === e && this.MVa(), this.vVa) && this.vVa(this, e);
      }),
      (this.JBi = (e) => {
        void 0 !== this.Pe && this.Pe.FunctionId === e && this.bNe();
      }),
      (this.zGa = (e) => {
        void 0 !== this.Pe && this.Pe.FunctionId === e && this.bNe();
      }),
      (this.BMa = (e, t) => {
        this.Pe && e === this.Pe.FunctionId && this.ZBi(this.Pe.GetEnable());
      }),
      (this.tbi = (e) => {
        this.SPe.PlayLevelSequenceByName(e);
      }),
      (this.ibi = (e) => {
        MenuController_1.MenuController.SetApplySave(this.Pe, e);
        var t,
          e = this.Pe.FunctionId;
        MenuDefine_1.imageConfigSet.has(e) &&
          (10 !== e &&
            ((t = GameSettingsManager_1.GameSettingsManager.Get(10))?.Set(4),
            t?.Save()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ConfigLoadChange,
            e,
          )),
          (ModelManager_1.ModelManager.MenuModel.IsEdited = !0);
      });
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    void 0 === this.SPe &&
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshMenuSetting,
      this.JBi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGameplaySettingsSet,
        this.zGa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMenuDataEnableChanged,
        this.BMa,
      ),
      this.GetExtendToggle(0).OnStateChange.Add(this.Yai);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshMenuSetting,
      this.JBi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGameplaySettingsSet,
        this.zGa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMenuDataEnableChanged,
        this.BMa,
      ),
      this.GetExtendToggle(0).OnStateChange.Clear();
  }
  BindOnToggleStateChangedCallback(e) {
    this.vVa = e;
  }
  MVa() {
    if (this.Pe) {
      var e = this.Pe.ClickedTips;
      if (e && !StringUtils_1.StringUtils.IsBlank(e)) {
        var t,
          i,
          s = ModelManager_1.ModelManager.MenuModel;
        for ([t, i] of this.Pe.ClickedTipsMap)
          if (
            s.IsInMenuDataByFunctionId(t) &&
            s.GetGameSettingsHandleEditValue(t) === i
          )
            return void GenericPromptController_1.GenericPromptController.ShowPromptByCode(
              e,
            );
      }
    }
  }
  OnBeforeDestroy() {
    this.RemoveEventListener(),
      this.SPe?.Clear(),
      (this.SPe = void 0),
      this.YBi?.ClearItem(),
      (this.YBi = void 0),
      (this.vVa = void 0),
      this.gPe();
  }
  ClearItem() {
    this.gPe();
  }
  gPe() {
    this.IGe && (this.IGe = void 0),
      this.Type && (this.Type = void 0),
      this.Pe && (this.Pe = void 0),
      (this.MenuScrollItemData = void 0);
  }
  GetUsingItem(e) {
    let t = void 0;
    if (0 === e.Type)
      return void 0 !== (t = this.GetItem(1)) ? t.GetOwner() : void 0;
    switch (e.Data.SetType) {
      case 1:
        t = this.GetItem(4);
        break;
      case 2:
        t = this.GetItem(3);
        break;
      case 3:
      case 4:
        t = this.GetItem(2);
        break;
      case 5:
        t = this.GetItem(5);
    }
    return void 0 !== t ? t.GetOwner() : void 0;
  }
  Update(e, t) {
    (this.Type = e.Type),
      (this.Pe = e.Data),
      (this.MenuScrollItemData = e),
      this.obi(),
      this.rbi(e);
  }
  async rbi(e) {
    this.YBi && (this.YBi.Clear(), await this.YBi.ClearAsync()),
      (this.YBi = this.nbi(e)),
      this.YBi && (await this.YBi.Init(), this.sbi(this.YBi, e));
  }
  sbi(e, t) {
    var i;
    e &&
      ((i = t.Data),
      e.SetActive(!0),
      e.ExecuteUpdate(i, !1),
      0 !== t.Type ? this.ZBi(i.GetEnable()) : this.ZBi(!1));
  }
  nbi(e) {
    if (0 === e.Type)
      return this.abi(
        1,
        MenuScrollSettingTitleItem_1.MenuScrollSettingTitleItem,
      );
    switch (e.Data.SetType) {
      case 1:
        return this.abi(
          4,
          MenuScrollSettingSliderItem_1.MenuScrollSettingSliderItem,
        );
      case 2:
        return this.abi(
          3,
          MenuScrollSettingSwitchItem_1.MenuScrollSettingSwitchItem,
        );
      case 4:
        return this.abi(
          2,
          MenuScrollSettingButtonItem_1.MenuScrollSettingButtonItem,
        );
      case 5:
        return this.abi(
          5,
          MenuScrollSettingDropDown_1.MenuScrollSettingDropDown,
        );
    }
  }
  abi(e, t) {
    t = new t();
    return t.Initialize(this.GetItem(e), this.ibi, this.tbi), t;
  }
  bNe() {
    this.YBi && this.YBi.ExecuteUpdate(this.Pe, !0);
  }
  obi() {
    this.GetItem(1).SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1);
  }
  ZBi(e) {
    var t = this.GetExtendToggle(0);
    t.SetToggleState(e ? 0 : 2, !1),
      t.SetSelfInteractive(e),
      0 !== this.Type && this.YBi && this.YBi.SetInteractionActive(e);
  }
  SetDetailVisible(e) {
    this.YBi && this.YBi.SetDetailVisible(e);
  }
  GetMenuData() {
    return this.Pe;
  }
  SetSelected(e) {
    e
      ? this.GetExtendToggle(0)?.SetToggleState(1, !1)
      : this.GetExtendToggle(0)?.SetToggleState(0, !1);
  }
}
exports.MenuScrollSettingContainerItem = MenuScrollSettingContainerItem;
//# sourceMappingURL=MenuScrollSettingContainerItem.js.map
