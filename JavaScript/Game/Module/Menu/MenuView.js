"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuView =
    exports.MenuViewData =
    exports.MenuScrollItemData =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Pool_1 = require("../../../Core/Container/Pool");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const PcAndGamepadKeySettingPanel_1 = require("./KeySettingsView/PcAndGamepadKeySettingPanel");
const MenuController_1 = require("./MenuController");
const MenuScrollSettingContainerDynItem_1 = require("./Views/MenuScrollSettingContainerDynItem");
const MenuScrollSettingContainerItem_1 = require("./Views/MenuScrollSettingContainerItem");
const CAPACITY = 20;
class MenuScrollItemData {
  constructor() {
    (this.Type = 0), (this.Data = void 0);
  }
}
exports.MenuScrollItemData = MenuScrollItemData;
class MenuViewData {
  constructor() {
    (this.Axi = 200),
      (this.Pxi = 100),
      (this.xxi = 0),
      (this.wxi = 0),
      (this.MenuViewDataCurMainType = 0),
      (this.MenuViewDataLastSubType = 0);
  }
  set MenuViewDataCurMainType(e) {
    this.xxi = e;
  }
  get MenuViewDataCurMainType() {
    return this.xxi;
  }
  set MenuViewDataLastSubType(e) {
    this.wxi = e;
  }
  get MenuViewDataLastSubType() {
    return this.wxi;
  }
  get MenuViewDataMainInterval() {
    return this.Axi;
  }
  get MenuViewDataSubInterval() {
    return this.Pxi;
  }
}
exports.MenuViewData = MenuViewData;
class MenuView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Bxi = []),
      (this.bxi = []),
      (this.qxi = void 0),
      (this.Gxi = new MenuViewData()),
      (this.cpt = void 0),
      (this.xqe = void 0),
      (this.Nxi = void 0),
      (this.Oxi = void 0),
      (this.a7 = () => new MenuScrollItemData()),
      (this.kxi = () => {
        this.Fxi();
      }),
      (this.Vxi = () => {
        let e;
        (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
          ((e =
            GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetGameQualityLoadInfo())
            .Percentage > 80 &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "PictureConfigOverload",
            ),
          this.Hxi(e.Percentage, e.BarColor),
          this.jxi(e.Desc));
      }),
      (this.Wxi = (e, t, i) => {
        return new MenuScrollSettingContainerItem_1.MenuScrollSettingContainerItem();
      }),
      (this.dVe = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.Kxi = (e) => {
        var e = this.Bxi[e];
        const t =
          ((this.Gxi.MenuViewDataCurMainType = e),
          ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainTypeConfigById(
            e,
          ));
        const i = this.GetItem(5);
        const n = this.GetItem(4);
        if (t) {
          let e = t.TabPanelType;
          switch (
            ModelManager_1.ModelManager.PlatformModel.SourcePlatformType
          ) {
            case 3:
              e = t.PcTabPanelType;
              break;
            case 6:
              e = t.XboxTabPanelType;
              break;
            case 7:
              e = t.PsTabPanelType;
          }
          switch (e) {
            case 1:
              this.Qxi(), i.SetUIActive(!0), n.SetUIActive(!1);
              break;
            case 2:
              this.Xxi(), i.SetUIActive(!1), n.SetUIActive(!0);
              break;
            default:
              i.SetUIActive(!1), n.SetUIActive(!1);
          }
        } else i.SetUIActive(!1), n.SetUIActive(!1);
      }),
      (this.yqe = (e) => {
        (e = this.Bxi[e]),
          (e = MenuController_1.MenuController.GetTargetMainInfo(e));
        return new CommonTabData_1.CommonTabData(
          e.MainIcon,
          new CommonTabTitleData_1.CommonTabTitleData(e.MainName),
        );
      }),
      (this.$xi = () => {
        this.xqe.UnBindLateUpdate();
      }),
      (this.$Ge = () => {
        let e;
        MenuController_1.MenuController.BeforeViewClose(),
          MenuController_1.MenuController.CheckRestartMap()
            ? (MenuController_1.MenuController.ClearRestartMap(),
              (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                47,
              )).FunctionMap.set(1, () => {
                UiManager_1.UiManager.CloseView("MenuView");
              }),
              e.FunctionMap.set(2, () => {
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Menu", 8, "重启游戏，使设置生效"),
                  ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
                    5,
                  );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ))
            : UiManager_1.UiManager.CloseView("MenuView");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnBeforeDestroy() {
    this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
      this.Nxi && this.Nxi.Clear(),
      this.bxi && (this.bxi.length = 0),
      this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
      this.qxi && (this.qxi = void 0);
    const e = ModelManager_1.ModelManager.MenuModel;
    e.IsEdited &&
      (MenuController_1.MenuController.ReportSettingMenuLogEvent(),
      (e.IsEdited = !1));
  }
  async OnBeforeStartAsync() {
    MenuController_1.MenuController.RefreshCurrentSetting(),
      (this.qxi =
        new MenuScrollSettingContainerDynItem_1.MenuScrollSettingContainerDynItem()),
      (this.xqe = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(2),
        this.qxi,
        this.Wxi,
      )),
      await this.xqe.Init(),
      (this.Nxi = new Pool_1.Pool(CAPACITY, this.a7)),
      await this.Yxi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TextLanguageChange,
      this.kxi,
    ),
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ConfigLoadChange,
          this.Vxi,
        );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TextLanguageChange,
      this.kxi,
    ),
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ConfigLoadChange,
          this.Vxi,
        );
  }
  OnStart() {
    this.cpt.SelectToggleByIndex(0, !0);
  }
  async Yxi() {
    this.Bxi = MenuController_1.MenuController.GetMainTypeList();
    const e = new CommonTabComponentData_1.CommonTabComponentData(
      this.dVe,
      this.Kxi,
      this.yqe,
    );
    (this.cpt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
      this.GetItem(1),
      e,
      this.$Ge,
    )),
      await this.cpt.RefreshTabItemByLengthAsync(this.Bxi.length);
  }
  Qxi() {
    this.Fxi();
  }
  Xxi() {
    const e = ModelManager_1.ModelManager.PlatformModel;
    let t = 0;
    e.IsInKeyBoard() ? (t = 1) : e.IsInGamepad() && (t = 2),
      this.Oxi
        ? this.Oxi.Refresh(t)
        : ((this.Oxi =
            new PcAndGamepadKeySettingPanel_1.PcAndGamepadKeySettingPanel()),
          this.Oxi.CreateThenShowByResourceIdAsync(
            "UiItem_HandleSet",
            this.GetItem(4),
          ).then(
            () => {
              this.Oxi.Refresh(t);
            },
            () => {},
          ));
  }
  Fxi() {
    const e = MenuController_1.MenuController.GetTargetBaseConfigData(
      this.Gxi.MenuViewDataCurMainType,
    );
    this.Gxi.MenuViewDataCurMainType === 2 &&
    (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform())
      ? (this.GetItem(3)?.SetUIActive(!0), this.Vxi())
      : this.GetItem(3)?.SetUIActive(!1),
      (this.Gxi.MenuViewDataLastSubType = 0),
      this.Jxi(),
      this.zxi(e);
  }
  jxi(e) {
    const t = this.GetItem(3)?.GetAttachUIChildren().Get(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
  Hxi(e, t) {
    const i = this.GetItem(3);
    var n = i?.GetAttachUIChildren().Get(3);
    if (n) {
      const a = n.GetAttachUIChildren();
      var n = i?.GetAttachUIChildren().Get(4);
      if (n) {
        const r = n.Width;
        const o = [0, 0, 0, 0, 0];
        if (e >= 100) for (let e = 0; e < a.Num(); e++) o[e] = r;
        else if (e >= 80) {
          for (let e = 0; e < a.Num() - 1; e++) o[e] = r;
          o[4] = r * ((5 * (e - 80)) / 100);
        } else if (e >= 60) {
          for (let e = 0; e < a.Num() - 2; e++) o[e] = r;
          o[3] = r * ((5 * (e - 60)) / 100);
        } else if (e >= 40) {
          for (let e = 0; e < a.Num() - 3; e++) o[e] = r;
          o[2] = r * ((5 * (e - 40)) / 100);
        } else if (e >= 20) {
          for (let e = 0; e < a.Num() - 4; e++) o[e] = r;
          o[1] = r * ((5 * (e - 20)) / 100);
        } else o[0] = r * ((5 * e) / 100);
        for (let e = 0; e < a.Num(); e++) {
          const s = a.Get(e);
          s.SetWidth(o[e]), this.SetSpriteByPath(t, s, !1);
        }
      }
    }
  }
  Jxi() {
    for (const e of this.bxi) this.Nxi.Put(e);
    this.bxi = [];
  }
  Zxi(e, t) {
    let i = this.Nxi.Get();
    ((i = void 0 === i ? this.Nxi.Create() : i).Type = t),
      (i.Data = e),
      this.bxi.push(i);
  }
  zxi(e) {
    for (const t of e)
      t.CheckCondition() &&
        (t.MenuDataSubType !== this.Gxi.MenuViewDataLastSubType &&
          ((this.Gxi.MenuViewDataLastSubType = t.MenuDataSubType),
          this.Zxi(t, 0)),
        this.Zxi(t, 1));
    this.xqe.RefreshByData(this.bxi), this.xqe.BindLateUpdate(this.$xi);
  }
}
exports.MenuView = MenuView;
// # sourceMappingURL=MenuView.js.map
