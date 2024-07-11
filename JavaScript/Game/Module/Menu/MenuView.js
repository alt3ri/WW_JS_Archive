"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuView =
    exports.MenuViewData =
    exports.MenuScrollItemData =
      void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Pool_1 = require("../../../Core/Container/Pool"),
  KeySettingById_1 = require("../../../Core/Define/ConfigQuery/KeySettingById"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  PcAndGamepadKeySettingPanel_1 = require("./KeySettingsView/PcAndGamepadKeySettingPanel"),
  MenuController_1 = require("./MenuController"),
  MenuScrollSettingContainerDynItem_1 = require("./Views/MenuScrollSettingContainerDynItem"),
  MenuScrollSettingContainerItem_1 = require("./Views/MenuScrollSettingContainerItem"),
  CAPACITY = 20;
class MenuScrollItemData {
  constructor() {
    (this.Type = 0), (this.Data = void 0);
  }
}
exports.MenuScrollItemData = MenuScrollItemData;
class MenuViewData {
  constructor() {
    (this.Awi = 200),
      (this.Pwi = 100),
      (this.xwi = 0),
      (this.wwi = 0),
      (this.MenuViewDataCurMainType = 0),
      (this.MenuViewDataLastSubType = 0);
  }
  set MenuViewDataCurMainType(e) {
    (this.xwi = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectMenuMainType,
      );
  }
  get MenuViewDataCurMainType() {
    return this.xwi;
  }
  set MenuViewDataLastSubType(e) {
    this.wwi = e;
  }
  get MenuViewDataLastSubType() {
    return this.wwi;
  }
  get MenuViewDataMainInterval() {
    return this.Awi;
  }
  get MenuViewDataSubInterval() {
    return this.Pwi;
  }
}
exports.MenuViewData = MenuViewData;
class MenuView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Bwi = []),
      (this.bwi = []),
      (this.qwi = void 0),
      (this.Gwi = new MenuViewData()),
      (this.Ivt = void 0),
      (this.xqe = void 0),
      (this.Nwi = void 0),
      (this.Owi = void 0),
      (this.a7 = () => new MenuScrollItemData()),
      (this.kwi = () => {
        this.Fwi();
      }),
      (this.Vwi = () => {
        var e;
        (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
          (80 <
            (e =
              GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetGameQualityLoadInfo())
              .Percentage &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "PictureConfigOverload",
            ),
          this.Hwi(e.Percentage, e.BarColor),
          this.jwi(e.Desc));
      }),
      (this.ksa = (t) => {
        if (t.length < 2)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Guide", 65, "引导配置MenuView时参数不足", [
              "ForTabType应有2个参数，但是实际只有",
              t.length,
            ]);
        else {
          var i,
            n,
            r = Number(t[1]);
          let e = 0;
          for ([i, n] of this.Bwi.entries())
            if (n === r) {
              e = i;
              break;
            }
          var t = this.Ivt.GetTabItemByIndex(e);
          if (t)
            return (
              this.Ivt.ScrollToToggleByIndex(e), [(t = t.GetRootItem()), t]
            );
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Guide", 65, "引导配置MenuView时，未找到指定页签", [
              "targetIndex",
              e,
            ]);
        }
      }),
      (this.Fsa = (e) => {
        if (e.length < 2)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Guide", 65, "引导配置MenuView时参数不足", [
              "ForKeySetting应有2个参数，但是实际只有",
              e.length,
            ]);
        else {
          var e = Number(e[1]),
            t = KeySettingById_1.configKeySettingById.GetConfig(e),
            i = this.Owi.GetGuideItemByKeySettingId(e, !1);
          if (t) {
            if (i) return [i, i];
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Guide",
                65,
                "引导配置MenuView时找不到key setting",
                ["key setting id", e],
              );
        }
      }),
      (this.Nsa = new Map([
        ["TabType", this.ksa],
        ["KeySetting", this.Fsa],
      ])),
      (this.Wwi = (e, t, i) => {
        return new MenuScrollSettingContainerItem_1.MenuScrollSettingContainerItem();
      }),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.Kwi = (e) => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("TowerDefense", 65, "OnClickedItem");
        var e = this.Bwi[e],
          t =
            ((this.Gwi.MenuViewDataCurMainType = e),
            ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainTypeConfigById(
              e,
            )),
          i = this.GetItem(5),
          n = this.GetItem(4);
        if (t) {
          let e = t.TabPanelType;
          switch (Info_1.Info.PlatformType) {
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
              this.Qwi(), i.SetUIActive(!0), n.SetUIActive(!1);
              break;
            case 2:
              this.Xwi(), i.SetUIActive(!1), n.SetUIActive(!0);
              break;
            default:
              i.SetUIActive(!1), n.SetUIActive(!1);
          }
        } else i.SetUIActive(!1), n.SetUIActive(!1);
      }),
      (this.yqe = (e) => {
        (e = this.Bwi[e]),
          (e = MenuController_1.MenuController.GetTargetMainInfo(e));
        return new CommonTabData_1.CommonTabData(
          e.MainIcon,
          new CommonTabTitleData_1.CommonTabTitleData(e.MainName),
        );
      }),
      (this.$wi = () => {
        this.xqe.UnBindLateUpdate();
      }),
      (this.$Ge = () => {
        var e;
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
  get MenuViewDataExternal() {
    return this.Gwi;
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
    this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      this.Nwi && this.Nwi.Clear(),
      this.bwi && (this.bwi.length = 0),
      this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
      this.qwi && (this.qwi = void 0);
    var e = ModelManager_1.ModelManager.MenuModel;
    e.IsEdited &&
      (e.SaveLocalConfig(),
      MenuController_1.MenuController.ReportSettingMenuLogEvent(),
      (e.IsEdited = !1));
  }
  async OnBeforeStartAsync() {
    MenuController_1.MenuController.RefreshCurrentSetting(),
      (this.qwi =
        new MenuScrollSettingContainerDynItem_1.MenuScrollSettingContainerDynItem()),
      (this.xqe = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(2),
        this.qwi,
        this.Wwi,
      )),
      await this.xqe.Init(),
      (this.Nwi = new Pool_1.Pool(CAPACITY, this.a7)),
      await this.Ywi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TextLanguageChange,
      this.kwi,
    ),
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ConfigLoadChange,
          this.Vwi,
        );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TextLanguageChange,
      this.kwi,
    ),
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ConfigLoadChange,
          this.Vwi,
        );
  }
  OnStart() {
    this.Ivt.SelectToggleByIndex(0, !0);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (!(e.length < 1))
      return (t = this.Nsa.get(e[0]))
        ? t(e)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Guide",
              65,
              "引导配置MenuView，Extra键值与代码不匹配",
              ["配置中的值", e[0]],
            )
          );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 65, "引导配置MenuView时，必须要有Extra参数");
  }
  async Ywi() {
    this.Bwi = MenuController_1.MenuController.GetMainTypeList();
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.Kwi,
      this.yqe,
    );
    (this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
      this.GetItem(1),
      e,
      this.$Ge,
    )),
      await this.Ivt.RefreshTabItemByLengthAsync(this.Bwi.length);
  }
  Qwi() {
    this.Fwi();
  }
  Xwi() {
    let e = 0;
    Info_1.Info.IsInKeyBoard() ? (e = 1) : Info_1.Info.IsInGamepad() && (e = 2),
      this.Owi
        ? this.Owi.Refresh(e)
        : ((this.Owi =
            new PcAndGamepadKeySettingPanel_1.PcAndGamepadKeySettingPanel()),
          this.Owi.CreateThenShowByResourceIdAsync(
            "UiItem_HandleSet",
            this.GetItem(4),
          ).then(
            () => {
              this.Owi.Refresh(e);
            },
            () => {},
          ));
  }
  Fwi() {
    var e = MenuController_1.MenuController.GetTargetBaseConfigData(
      this.Gwi.MenuViewDataCurMainType,
    );
    2 === this.Gwi.MenuViewDataCurMainType &&
    (GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() ||
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform())
      ? (this.GetItem(3)?.SetUIActive(!0), this.Vwi())
      : this.GetItem(3)?.SetUIActive(!1),
      (this.Gwi.MenuViewDataLastSubType = 0),
      this.Jwi(),
      this.zwi(e);
  }
  jwi(e) {
    var t = this.GetItem(3)?.GetAttachUIChildren().Get(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
  Hwi(e, t) {
    var i = this.GetItem(3),
      n = i?.GetAttachUIChildren().Get(3);
    if (n) {
      var r = n.GetAttachUIChildren(),
        n = i?.GetAttachUIChildren().Get(4);
      if (n) {
        var a = n.Width,
          o = [0, 0, 0, 0, 0];
        if (100 <= e) for (let e = 0; e < r.Num(); e++) o[e] = a;
        else if (80 <= e) {
          for (let e = 0; e < r.Num() - 1; e++) o[e] = a;
          o[4] = a * ((5 * (e - 80)) / 100);
        } else if (60 <= e) {
          for (let e = 0; e < r.Num() - 2; e++) o[e] = a;
          o[3] = a * ((5 * (e - 60)) / 100);
        } else if (40 <= e) {
          for (let e = 0; e < r.Num() - 3; e++) o[e] = a;
          o[2] = a * ((5 * (e - 40)) / 100);
        } else if (20 <= e) {
          for (let e = 0; e < r.Num() - 4; e++) o[e] = a;
          o[1] = a * ((5 * (e - 20)) / 100);
        } else o[0] = a * ((5 * e) / 100);
        for (let e = 0; e < r.Num(); e++) {
          var s = r.Get(e);
          s.SetWidth(o[e]), this.SetSpriteByPath(t, s, !1);
        }
      }
    }
  }
  Jwi() {
    for (const e of this.bwi) this.Nwi.Put(e);
    this.bwi = [];
  }
  Zwi(e, t) {
    let i = this.Nwi.Get();
    ((i = void 0 === i ? this.Nwi.Create() : i).Type = t),
      (i.Data = e),
      this.bwi.push(i);
  }
  zwi(e) {
    for (const t of e)
      t.CheckCondition() &&
        (t.MenuDataSubType !== this.Gwi.MenuViewDataLastSubType &&
          ((this.Gwi.MenuViewDataLastSubType = t.MenuDataSubType),
          this.Zwi(t, 0)),
        this.Zwi(t, 1));
    this.xqe.RefreshByData(this.bwi), this.xqe.BindLateUpdate(this.$wi);
  }
}
exports.MenuView = MenuView;
//# sourceMappingURL=MenuView.js.map
