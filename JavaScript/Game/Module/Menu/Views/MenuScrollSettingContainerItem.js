"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingContainerItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController"),
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
      (this.mHa = void 0),
      (this.Yai = (e) => {
        this.Pe && (1 === e && this.dHa(), this.mHa) && this.mHa(this, e);
      }),
      (this.JBi = (e) => {
        void 0 !== this.Pe && this.Pe.FunctionId === e && this.bNe();
      }),
      (this.tbi = (e) => {
        this.SPe.PlayLevelSequenceByName(e);
      }),
      (this.ibi = (e) => {
        this.Pe.FunctionId === GameSettingsDefine_1.EFunction.RayTracing
          ? this.vUc(e)
          : this.Pe.FunctionId === GameSettingsDefine_1.EFunction.NVIDIADLSSFG
            ? this.yUc(e)
            : this.Pe.FunctionId === GameSettingsDefine_1.EFunction.Vulkan
              ? this.SL1(e)
              : ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
                  this.Pe,
                  e,
                );
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
      this.GetExtendToggle(0).OnStateChange.Add(this.Yai);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshMenuSetting,
      this.JBi,
    ),
      this.GetExtendToggle(0).OnStateChange.Clear();
  }
  BindOnToggleStateChangedCallback(e) {
    this.mHa = e;
  }
  dHa() {
    if (this.Pe) {
      var e = this.Pe.ClickedTips;
      if (e && !StringUtils_1.StringUtils.IsBlank(e)) {
        var t,
          i,
          r = ModelManager_1.ModelManager.MenuModel;
        for ([t, i] of this.Pe.ClickedTipsMap)
          if (
            r.IsInMenuDataByFunctionId(t) &&
            GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t) === i
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
      (this.mHa = void 0),
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
    this.YBi &&
      (this.YBi.ExecuteUpdate(this.Pe, !0),
      0 !== this.MenuScrollItemData?.Type
        ? this.ZBi(this.Pe.GetEnable())
        : this.ZBi(!1));
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
    e
      ? 1 === t.GetToggleState()
        ? t.SetToggleState(1, !1)
        : t.SetToggleState(0, !1)
      : t.SetToggleState(2, !1),
      t.SetSelfInteractive(e),
      0 !== this.Type && this.YBi && this.YBi.SetInteractionActive(e);
  }
  H01(e) {
    e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
    e.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
        this.Pe,
        0,
      );
    }),
      e.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
          this.Pe,
          0,
        );
      }),
      e.SetCloseFunction(() => {
        ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
          this.Pe,
          0,
        );
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  vUc(e) {
    var t;
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDxr1_1NotSupported() &&
    0 < e
      ? this.H01(301)
      : GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDriverNeedUpdateForRayTracing() &&
          0 < e
        ? this.H01(273)
        : ((t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
            this.Pe.FunctionId,
          )),
          (ModelManager_1.ModelManager.MenuModel.NeedRayTracingSubChange =
            t + e === 1),
          0 !== t ||
          1 !== e ||
          ModelManager_1.ModelManager.MenuModel.IsRayTracingOpenChecked
            ? ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
                this.Pe,
                e,
              )
            : ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                248,
              )).FunctionMap.set(2, () => {
                (ModelManager_1.ModelManager.MenuModel.IsRayTracingOpenChecked =
                  !0),
                  ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
                    this.Pe,
                    e,
                  );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                t,
              )));
  }
  yUc(e) {
    var t;
    0 < e &&
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3HardwareSchedulingDisabled()
      ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(292)).FunctionMap.set(
          1,
          () => {
            ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
              this.Pe,
              0,
            );
          },
        ),
        t.FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
            this.Pe,
            0,
          );
        }),
        t.SetCloseFunction(() => {
          ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
            this.Pe,
            0,
          );
        }),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          t,
        ))
      : ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
          this.Pe,
          e,
        );
  }
  SL1(e) {
    var t;
    0 < e &&
      !ModelManager_1.ModelManager.MenuModel.IsVulkanOpenChecked &&
      ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(316)),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      ),
      (ModelManager_1.ModelManager.MenuModel.IsVulkanOpenChecked = !0)),
      ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(
        this.Pe,
        e,
      );
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
