"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingContainerItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController"),
  MenuController_1 = require("../MenuController"),
  MenuScrollSettingButtonItem_1 = require("./MenuScrollSettingButtonItem"),
  MenuScrollSettingDropDown_1 = require("./MenuScrollSettingDropDown"),
  MenuScrollSettingKeyMapItem_1 = require("./MenuScrollSettingKeyMapItem"),
  MenuScrollSettingSliderItem_1 = require("./MenuScrollSettingSliderItem"),
  MenuScrollSettingSwitchItem_1 = require("./MenuScrollSettingSwitchItem"),
  MenuScrollSettingTitleItem_1 = require("./MenuScrollSettingTitleItem");
class MenuScrollSettingContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.E9 = void 0),
      (this.Pe = void 0),
      (this.IGe = void 0),
      (this.YBi = void 0),
      (this.SPe = void 0),
      (this.ufa = () => {
        if (this.Pe) {
          var e = this.Pe.ClickedTips;
          if (e && !StringUtils_1.StringUtils.IsBlank(e)) {
            var t,
              i,
              r = ModelManager_1.ModelManager.MenuModel;
            for ([t, i] of this.Pe.ClickedTipsMap)
              if (r.GetTargetConfig(t) === i)
                return void GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                  e,
                );
          }
        }
      }),
      (this.JBi = (e) => {
        void 0 !== this.Pe && this.Pe.MenuDataFunctionId === e && this.bNe();
      }),
      (this.cfa = (e, t) => {
        this.Pe &&
          e === this.Pe.MenuDataFunctionId &&
          this.ZBi(this.Pe.IsEnable);
      }),
      (this.tbi = (e) => {
        this.SPe.PlayLevelSequenceByName(e);
      }),
      (this.ibi = (e) => {
        MenuController_1.MenuController.ApplyTargetConfig(
          this.Pe.MenuDataFunctionId,
          e,
        ),
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
        EventDefine_1.EEventName.OnMenuDataEnableChanged,
        this.cfa,
      ),
      this.GetExtendToggle(0).OnPointUpCallBack.Bind(this.ufa);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshMenuSetting,
      this.JBi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMenuDataEnableChanged,
        this.cfa,
      ),
      this.GetExtendToggle(0).OnPointUpCallBack.Unbind();
  }
  OnBeforeDestroy() {
    this.RemoveEventListener(),
      this.SPe?.Clear(),
      (this.SPe = void 0),
      this.YBi?.ClearItem(),
      (this.YBi = void 0),
      this.gPe();
  }
  ClearItem() {
    this.gPe();
  }
  gPe() {
    this.IGe && (this.IGe = void 0),
      this.E9 && (this.E9 = void 0),
      this.Pe && (this.Pe = void 0);
  }
  GetUsingItem(e) {
    let t = void 0;
    switch ((0 === e.Type && (t = this.GetItem(1)), e.Data.MenuDataSetType)) {
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
    (this.E9 = e.Type), (this.Pe = e.Data), this.obi(), this.rbi(e);
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
      e.Update(i),
      0 !== t.Type ? this.ZBi(i.IsEnable) : this.ZBi(!1));
  }
  nbi(e) {
    if (0 === e.Type)
      return this.abi(
        1,
        MenuScrollSettingTitleItem_1.MenuScrollSettingTitleItem,
      );
    switch (e.Data.MenuDataSetType) {
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
      case 3:
        return this.abi(
          2,
          MenuScrollSettingKeyMapItem_1.MenuScrollSettingKeyMapItem,
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
    this.YBi && this.YBi.Update(this.Pe);
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
      0 !== this.E9 && this.YBi && this.YBi.SetInteractionActive(e);
  }
}
exports.MenuScrollSettingContainerItem = MenuScrollSettingContainerItem;
//# sourceMappingURL=MenuScrollSettingContainerItem.js.map
