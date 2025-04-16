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
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsController_1 = require("../../GameSettings/GameSettingsController"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  MobileSwitchInputController_1 = require("../../Ui/Input/Moblie/MobileSwitchInputController"),
  UiManager_1 = require("../../Ui/UiManager"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  PcAndGamepadKeySettingPanel_1 = require("./KeySettingsView/PcAndGamepadKeySettingPanel"),
  MenuController_1 = require("./MenuController"),
  MenuDefine_1 = require("./MenuDefine"),
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
      (this.Xpt = void 0),
      (this.lHa = void 0),
      (this.feh = void 0),
      (this.Ivt = void 0),
      (this.xqe = void 0),
      (this.Nwi = void 0),
      (this.Owi = void 0),
      (this.a7 = () => new MenuScrollItemData()),
      (this.kwi = () => {
        this.Fwi();
      }),
      (this.Lja = (e) => {
        e && this.GetUIDynScrollViewComponent(0).StopMovement();
      }),
      (this.Vwi = () => {
        var e, t, i;
        Platform_1.Platform.IsMobilePlatform() &&
          (80 <
            (i = (t = (e =
              ModelManager_1.ModelManager.MenuModel).GetGameQualityLoadInfo())
              .Percentage) &&
            (!e.IsOpenedImageOverloadConfirmBox ||
              e.QualityInfoPercentage < 80) &&
            (Platform_1.Platform.IsIOSPlatform()
              ? MenuController_1.MenuController.OpenImageQualityOverloadConfirmBox()
              : MenuController_1.MenuController.OpenImageOverloadConfirmBox(),
            (e.IsOpenedImageOverloadConfirmBox = !0)),
          (e.QualityInfoPercentage = i),
          this.Hwi(t.Percentage, t.BarColor),
          this.jwi(t.Desc));
      }),
      (this.uWa = () => {
        Info_1.Info.IsMobileInputModel() &&
          Info_1.Info.IsInGamepad() &&
          MobileSwitchInputController_1.MobileSwitchInputController.SwitchToTouch();
      }),
      (this.Rla = (t) => {
        if (t.length < 2)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Guide", 64, "引导配置MenuView时参数不足", [
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
            Log_1.Log.Error("Guide", 64, "引导配置MenuView时，未找到指定页签", [
              "targetIndex",
              e,
            ]);
        }
      }),
      (this.xla = (e) => {
        if (e.length < 2)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Guide", 64, "引导配置MenuView时参数不足", [
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
                64,
                "引导配置MenuView时找不到key setting",
                ["key setting id", e],
              );
        }
      }),
      (this.EYa = void 0),
      (this.IYa = (e) => {
        if (e.length < 2)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Guide", 64, "引导配置MenuView时参数不足", [
              "ForMenuConfig应有2个参数，但是实际只有",
              e.length,
            ]);
        else {
          const i = Number(e[1]);
          var t,
            e = this.bwi.findIndex(
              (e) => e.Data?.FunctionId === i && 1 === e.Type,
            );
          if (!(e < 0))
            return (
              void 0 === this.EYa &&
                ((this.EYa = !0),
                this.xqe.ScrollToItemIndex(e, !1).finally(() => {
                  this.EYa = !1;
                })),
              !this.EYa && (t = this.xqe.GetGrid(e))
                ? (this.xqe.AddListenerOnItemClear(e, () => {
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "Guide",
                        64,
                        "当item拖出view之后，停止引导@[MenuView]",
                      ),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.FinishGuideStepByEvent,
                        MenuDefine_1.STOP_GUIDE_TAG,
                      );
                  }),
                  [t, t])
                : void 0
            );
        }
      }),
      (this.Ula = new Map([
        ["TabType", this.Rla],
        ["KeySetting", this.xla],
        ["MenuConfig", this.IYa],
      ])),
      (this.Wwi = (e, t, i) => {
        var n =
          new MenuScrollSettingContainerItem_1.MenuScrollSettingContainerItem();
        return n.BindOnToggleStateChangedCallback(this._Ha), n;
      }),
      (this._Ha = (e, t) => {
        var i;
        0 !== e.Type &&
          (i = e.GetMenuData()) &&
          (0 === t
            ? this.uHa()
            : (this.peh(),
              this.Xpt?.SetSelected(!1),
              this.Xpt?.SetDetailVisible(!1),
              e.SetDetailVisible(!i.GetIsDetailTextVisible()),
              (this.Xpt = e),
              (this.lHa = i),
              (t = e.MenuScrollItemData),
              i.HasDetailText() &&
                t &&
                this.bwi.indexOf(t) >= this.bwi.length - 1 &&
                (this.feh = TimerSystem_1.TimerSystem.Next(() => {
                  this.xqe.ScrollToBottom(e.GetRootItem());
                }))));
      }),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.Kwi = (t) => {
        var t = this.Bwi[t],
          t =
            ((this.Gwi.MenuViewDataCurMainType = t),
            ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainTypeConfigById(
              t,
            )),
          i = this.GetItem(5),
          n = this.GetItem(4);
        if (t) {
          let e = t.TabPanelType;
          switch (
            (Platform_1.Platform.IsPcPlatform()
              ? (e = CloudGameManager_1.CloudGameManager.IsCloudGame
                  ? Info_1.Info.IsInGamepad()
                    ? t.PsTabPanelType
                    : t.TabPanelType
                  : t.PcTabPanelType)
              : (Platform_1.Platform.IsPs5Platform() ||
                  (Platform_1.Platform.IsMobilePlatform() &&
                    Info_1.Info.IsInGamepad())) &&
                (e = t.PsTabPanelType),
            e)
          ) {
            case 1:
              this.Qwi(), i.SetUIActive(!0), n.SetUIActive(!1);
              break;
            case 2:
              this.Xwi(), i.SetUIActive(!1), n.SetUIActive(!0);
              break;
            default:
              i.SetUIActive(!1), n.SetUIActive(!1);
          }
          this.uHa(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.FinishGuideStepByEvent,
              MenuDefine_1.STOP_GUIDE_TAG,
            );
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
        this.xqe.ScrollToItemIndex(0, !0, !0), this.xqe.UnBindLateUpdate();
      }),
      (this.$Ge = () => {
        MenuController_1.MenuController.BeforeViewClose(),
          UiManager_1.UiManager.CloseView("MenuView");
      });
  }
  get MenuViewDataExternal() {
    return this.Gwi;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[6, this.uWa]]);
  }
  OnStart() {
    this.Ivt.SelectToggleByIndex(0, !0),
      this.GetButton(6)?.RootUIComp.SetUIActive(
        Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInGamepad(),
      );
  }
  OnBeforeDestroy() {
    this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      this.Nwi && this.Nwi.Clear(),
      this.bwi && (this.bwi.length = 0),
      this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
      this.qwi && (this.qwi = void 0);
    var e = ModelManager_1.ModelManager.MenuModel;
    e.IsEdited &&
      (MenuController_1.MenuController.ReportSettingMenuLogEvent(),
      (e.IsEdited = !1)),
      (e.IsImageQualityCustom = void 0),
      this.peh(),
      ModelManager_1.ModelManager.MenuModel.ClearMenuDataMap();
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.MenuModel.CreateConfigByBaseConfig(),
      GameSettingsController_1.GameSettingsController.OnUEGameUserSettingsUpdate(),
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
      EventDefine_1.EEventName.OnDropDownListVisibleChanged,
      this.Lja,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.kwi,
      ),
      Platform_1.Platform.IsMobilePlatform() &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ConfigLoadChange,
          this.Vwi,
        ),
      UE.GameUserSettings.GetGameUserSettings()?.OnGameUserSettingsUINeedsUpdate.Add(
        GameSettingsController_1.GameSettingsController
          .OnGameUserSettingsUINeedsUpdate,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnDropDownListVisibleChanged,
      this.Lja,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.kwi,
      ),
      Platform_1.Platform.IsMobilePlatform() &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ConfigLoadChange,
          this.Vwi,
        ),
      UE.GameUserSettings.GetGameUserSettings()?.OnGameUserSettingsUINeedsUpdate.Remove(
        GameSettingsController_1.GameSettingsController
          .OnGameUserSettingsUINeedsUpdate,
      );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (!(e.length < 1))
      return (t = this.Ula.get(e[0]))
        ? t(e)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Guide",
              64,
              "引导配置MenuView，Extra键值与代码不匹配",
              ["配置中的值", e[0]],
            )
          );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 64, "引导配置MenuView时，必须要有Extra参数");
  }
  peh() {
    this.feh &&
      TimerSystem_1.TimerSystem.Has(this.feh) &&
      TimerSystem_1.TimerSystem.Remove(this.feh),
      (this.feh = void 0);
  }
  uHa() {
    this.Xpt?.SetDetailVisible(!1),
      this.Xpt?.SetSelected(!1),
      this.lHa?.SetDetailTextVisible(!1),
      (this.Xpt = void 0),
      (this.lHa = void 0);
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
    Platform_1.Platform.IsMobilePlatform()
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
        var o = n.Width,
          s = [0, 0, 0, 0, 0];
        if (100 <= e) for (let e = 0; e < r.Num(); e++) s[e] = o;
        else if (80 <= e) {
          for (let e = 0; e < r.Num() - 1; e++) s[e] = o;
          s[4] = o * ((5 * (e - 80)) / 100);
        } else if (60 <= e) {
          for (let e = 0; e < r.Num() - 2; e++) s[e] = o;
          s[3] = o * ((5 * (e - 60)) / 100);
        } else if (40 <= e) {
          for (let e = 0; e < r.Num() - 3; e++) s[e] = o;
          s[2] = o * ((5 * (e - 40)) / 100);
        } else if (20 <= e) {
          for (let e = 0; e < r.Num() - 4; e++) s[e] = o;
          s[1] = o * ((5 * (e - 20)) / 100);
        } else s[0] = o * ((5 * e) / 100);
        for (let e = 0; e < r.Num(); e++) {
          var a = r.Get(e);
          a.SetWidth(s[e]), this.SetSpriteByPath(t, a, !1);
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
      t.SubType !== this.Gwi.MenuViewDataLastSubType &&
        ((this.Gwi.MenuViewDataLastSubType = t.SubType), this.Zwi(t, 0)),
        this.Zwi(t, 1);
    this.xqe.RefreshByData(this.bwi, !1, !0), this.xqe.BindLateUpdate(this.$wi);
  }
}
exports.MenuView = MenuView;
//# sourceMappingURL=MenuView.js.map
