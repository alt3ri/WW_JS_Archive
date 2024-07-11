"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingContainerItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController");
const MenuController_1 = require("../MenuController");
const MenuScrollSettingButtonItem_1 = require("./MenuScrollSettingButtonItem");
const MenuScrollSettingDropDown_1 = require("./MenuScrollSettingDropDown");
const MenuScrollSettingKeyMapItem_1 = require("./MenuScrollSettingKeyMapItem");
const MenuScrollSettingSliderItem_1 = require("./MenuScrollSettingSliderItem");
const MenuScrollSettingSwitchItem_1 = require("./MenuScrollSettingSwitchItem");
const MenuScrollSettingTitleItem_1 = require("./MenuScrollSettingTitleItem");
class MenuScrollSettingContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.S9 = void 0),
      (this.Pe = void 0),
      (this.IGe = void 0),
      (this.Ywi = void 0),
      (this.EPe = void 0),
      (this.UOn = () => {
        if (this.Pe) {
          const e = this.Pe.ClickedTips;
          if (e && !StringUtils_1.StringUtils.IsBlank(e)) {
            let t;
            let i;
            const r = ModelManager_1.ModelManager.MenuModel;
            for ([t, i] of this.Pe.ClickedTipsMap)
              if (r.GetTargetConfig(t) === i)
                return void GenericPromptController_1.GenericPromptController.ShowPromptByCode(
                  e,
                );
          }
        }
      }),
      (this.Jwi = (e) => {
        void 0 !== this.Pe && this.Pe.MenuDataFunctionId === e && this.bNe();
      }),
      (this.ROn = (e, t) => {
        this.Pe &&
          e === this.Pe.MenuDataFunctionId &&
          this.Zwi(this.Pe.IsEnable);
      }),
      (this.tBi = (e) => {
        this.EPe.PlayLevelSequenceByName(e);
      }),
      (this.iBi = (e) => {
        MenuController_1.MenuController.ApplyTargetConfig(
          this.Pe.MenuDataFunctionId,
          e,
        ),
          MenuController_1.MenuController.SaveLocalConfig(),
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
    void 0 === this.EPe &&
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshMenuSetting,
      this.Jwi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMenuDataEnableChanged,
        this.ROn,
      ),
      this.GetExtendToggle(0).OnPointUpCallBack.Bind(this.UOn);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshMenuSetting,
      this.Jwi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMenuDataEnableChanged,
        this.ROn,
      ),
      this.GetExtendToggle(0).OnPointUpCallBack.Unbind();
  }
  OnBeforeDestroy() {
    this.RemoveEventListener(),
      this.EPe?.Clear(),
      (this.EPe = void 0),
      this.Ywi?.ClearItem(),
      (this.Ywi = void 0),
      this.gPe();
  }
  ClearItem() {
    this.gPe();
  }
  gPe() {
    this.IGe && (this.IGe = void 0),
      this.S9 && (this.S9 = void 0),
      this.Pe && (this.Pe = void 0);
  }
  GetUsingItem(e) {
    let t = void 0;
    switch ((e.Type === 0 && (t = this.GetItem(1)), e.Data.MenuDataSetType)) {
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
    (this.S9 = e.Type), (this.Pe = e.Data), this.oBi(), this.rBi(e);
  }
  async rBi(e) {
    this.Ywi && (this.Ywi.Clear(), await this.Ywi.ClearAsync()),
      (this.Ywi = this.nBi(e)),
      this.Ywi && (await this.Ywi.Init(), this.sBi(this.Ywi, e));
  }
  sBi(e, t) {
    let i;
    e &&
      ((i = t.Data),
      e.SetActive(!0),
      e.Update(i),
      t.Type !== 0 ? this.Zwi(i.IsEnable) : this.Zwi(!1));
  }
  nBi(e) {
    if (e.Type === 0)
      return this.aBi(
        1,
        MenuScrollSettingTitleItem_1.MenuScrollSettingTitleItem,
      );
    switch (e.Data.MenuDataSetType) {
      case 1:
        return this.aBi(
          4,
          MenuScrollSettingSliderItem_1.MenuScrollSettingSliderItem,
        );
      case 2:
        return this.aBi(
          3,
          MenuScrollSettingSwitchItem_1.MenuScrollSettingSwitchItem,
        );
      case 3:
        return this.aBi(
          2,
          MenuScrollSettingKeyMapItem_1.MenuScrollSettingKeyMapItem,
        );
      case 4:
        return this.aBi(
          2,
          MenuScrollSettingButtonItem_1.MenuScrollSettingButtonItem,
        );
      case 5:
        return this.aBi(
          5,
          MenuScrollSettingDropDown_1.MenuScrollSettingDropDown,
        );
    }
  }
  aBi(e, t) {
    t = new t();
    return t.Initialize(this.GetItem(e), this.iBi, this.tBi), t;
  }
  bNe() {
    this.Ywi && this.Ywi.Update(this.Pe);
  }
  oBi() {
    this.GetItem(1).SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1);
  }
  Zwi(e) {
    const t = this.GetExtendToggle(0);
    t.SetToggleState(e ? 0 : 2, !1),
      t.SetSelfInteractive(e),
      this.S9 !== 0 && this.Ywi && this.Ywi.SetInteractionActive(e);
  }
}
exports.MenuScrollSettingContainerItem = MenuScrollSettingContainerItem;
// # sourceMappingURL=MenuScrollSettingContainerItem.js.map
