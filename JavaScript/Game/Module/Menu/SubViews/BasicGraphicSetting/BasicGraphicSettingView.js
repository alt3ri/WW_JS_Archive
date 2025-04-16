"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BasicGraphicSettingView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  BasicGraphicSettingData_1 = require("./BasicGraphicSettingData"),
  BasicGraphicSettingSliderItem_1 = require("./BasicGraphicSettingSliderItem");
class BasicGraphicSettingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.p0c = void 0),
      (this.v0c = []),
      (this.lqe = void 0),
      (this.y0c = void 0),
      (this.Qgc = void 0),
      (this.S0c = !1),
      (this.M0c = void 0),
      (this.$An = (t) => {
        this.p0c.SetActive(!0), this.Gti(t);
      }),
      (this.hBi = () => {
        for (const t of this.v0c) t.OnChangeValue(t.DefaultCurValue);
        this.p0c.RefreshByData(this.v0c);
      }),
      (this.Mke = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "ImageColorSetting",
        ),
          (this.S0c = !0),
          this.CloseMe();
      }),
      (this.E0c = () => {
        return new BasicGraphicSettingSliderItem_1.BasicGraphicSettingSliderItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIVerticalLayout],
      [7, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(3);
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      (this.y0c = new ButtonItem_1.ButtonItem()),
      (this.Qgc = new ButtonItem_1.ButtonItem()),
      await Promise.all([
        this.lqe.CreateThenShowByActorAsync(t.GetOwner()),
        this.y0c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
        this.Qgc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      ]),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.y0c.SetFunction(this.hBi),
      this.y0c.SetLocalTextNew("ImageColorSettingBtn_Text1"),
      this.Qgc.SetFunction(this.Mke),
      this.Qgc.SetLocalTextNew("ImageColorSettingBtn_Text2");
  }
  OnStart() {
    (this.p0c = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(6),
      this.E0c,
    )),
      (this.v0c =
        BasicGraphicSettingData_1.BasicGraphicSettingData.GetBasicGraphicSettingSliderDataList()),
      this.p0c.RefreshByData(this.v0c),
      (this.M0c = ModelManager_1.ModelManager.MenuModel.GetMenuDataByFunctionId(
        GameSettingsDefine_1.EFunction.BasicGraphicSetting,
      )),
      this.lqe.SetTitleByTextIdAndArgNew(this.M0c.FunctionName),
      this.lqe.SetHelpBtnActive(!1),
      this.p0c.SetActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnBeforeDestroy() {
    if (this.S0c) for (const t of this.v0c) t.OnApplyValue();
  }
  Gti(t) {
    this.p0c.GetUiAnimController()?.Play(t);
  }
}
exports.BasicGraphicSettingView = BasicGraphicSettingView;
//# sourceMappingURL=BasicGraphicSettingView.js.map
