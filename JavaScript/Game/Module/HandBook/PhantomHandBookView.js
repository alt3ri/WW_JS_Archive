"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomHandBookView = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
  CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  HandBookBaseView_1 = require("./HandBookBaseView"),
  HandBookCommonItem_1 = require("./HandBookCommonItem"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine"),
  HandBookFetterItem_1 = require("./HandBookFetterItem"),
  HandBookPhantomItem_1 = require("./HandBookPhantomItem"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class PhantomHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.oei = []),
      (this.rei = []),
      (this.nei = []),
      (this.Bzt = []),
      (this.sei = void 0),
      (this.bzt = void 0),
      (this.Refresh = () => {
        this.RefreshTabComponent(),
          this.RefreshPhantomTitle(),
          this.RefreshPhantom(),
          this.RefreshCollectText(),
          this.RefreshLockText();
      }),
      (this.OnHandBookRead = (e, t) => {
        if (1 === e) {
          var n = this.Bzt.length;
          for (let e = 0; e < n; e++) {
            var o = this.Bzt[e],
              i = o.GetData();
            if (i.Config.Id === t) {
              (i.IsNew = !1), o.SetNewFlagVisible(!1);
              break;
            }
          }
        }
      }),
      (this.TabToggleCallBack = (e) => {
        this.SetDefaultState(), this.GetItem(0).SetUIActive(!0);
        e = this.oei[e].Id;
        0 === (this.sei = e)
          ? (this.RefreshPhantomTitle(), this.RefreshPhantom())
          : (this.RefreshPhantomFetterTitle(), this.RefreshPhantomFetter());
      }),
      (this.InitHandBookCommonItem = () => {
        var e = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          this.Bzt.push(e),
          e.BindOnExtendToggleStateChanged(this.OnToggleClick),
          e
        );
      }),
      (this.OnToggleClick = (e) => {
        var t = e.Data,
          e = e.MediumItemGrid.GridIndex;
        this.ScrollViewCommon.DeselectCurrentGridProxy(),
          this.ScrollViewCommon.SelectGridProxy(e),
          this.ScrollViewCommon.RefreshGridProxy(e),
          t.IsLock
            ? this.SetLockState(!0)
            : (this.SetLockState(!1), this.RefreshPhantomContent(t));
      }),
      (this.TabItemProxyCreate = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.aZt = (e, t) => e.Id - t.Id),
      (this.InitHandBookPhantom = (e, t, n) => {
        var o = new HandBookPhantomItem_1.HandBookPhantomItem();
        return (
          o.Initialize(e, t),
          o.BindToggleCallback(this.OnPhantomToggleClick),
          this.nei.push(o),
          { Key: n, Value: o }
        );
      }),
      (this.OnPhantomToggleClick = (e) => {
        var t, n;
        0 !== this.sei &&
          ((t = e.Config),
          this.SetLockState(!1),
          e.IsNew &&
            HandBookController_1.HandBookController.SendIllustratedReadRequest(
              1,
              t.ItemId,
            ),
          (n =
            ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfigById(
              t.MonsterId,
            ))
            ? e.IsLock ||
              HandBookController_1.HandBookController.SetPhantomMeshShow(
                n.Id,
                this.qzt,
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Role",
                8,
                "怪物id为:" + t.MonsterId + "对应声骸图鉴数据找不到！",
              ));
      }),
      (this.InitHandBookFetterItem = () => {
        var e = new HandBookFetterItem_1.HandBookFetterItem();
        return e.BindFetterToggleCallback(this.GZt), this.rei.push(e), e;
      }),
      (this.GZt = (e) => {
        var t = e.GetGirdIndex(),
          t =
            (this.ScrollViewFetter.DeselectCurrentGridProxy(),
            this.ScrollViewFetter.SelectGridProxy(t),
            this.ScrollViewFetter.RefreshGridProxy(t),
            e.GetPhantomFetter()),
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
        this.SetNameText(e),
          this.RefreshPhantomFetterLayout(t),
          this.RefreshHandBookPhantomLayout(t);
      }),
      (this.qzt = void 0);
  }
  OnStart() {
    this.SetDefaultState(), this.Refresh();
  }
  OnAfterShow() {
    this.bzt =
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        "1062",
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  RefreshPhantomContent(e) {
    var t, n, o, i;
    1 !== this.sei &&
      (this.GetVerticalLayout(18).RootUIComp.SetUIActive(!1),
      (i = e.Config),
      (n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
        1,
        i.Id,
      )) && this.SetDateText(n.CreateTime),
      e.IsNew &&
        HandBookController_1.HandBookController.SendIllustratedReadRequest(
          1,
          i.Id,
        ),
      (n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name)),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        i.TypeDescrtption,
      )),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Intensity)),
      (o = []).push(t, e),
      this.SetNameText(n),
      this.InitInfoItemLayout(o),
      HandBookController_1.HandBookController.SetPhantomMeshShow(
        i.Id,
        this.qzt,
      ),
      (t = []),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title1)),
      (n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Descrtption1)),
      (o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title2)),
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Descrtption2)),
      t.push(
        new HandBookDefine_1.HandBookContentItemData(e, n),
        new HandBookDefine_1.HandBookContentItemData(o, i),
      ),
      this.InitContentItemLayout(t));
  }
  RefreshPhantom() {
    this.RefreshCollectText(), this.GetItem(26).SetUIActive(!0);
    var t =
        ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig(),
      n = [],
      o = t.length;
    for (let e = 0; e < o; e++) {
      var i,
        a,
        r = t[e],
        s = new HandBookDefine_1.HandBookCommonItemData(),
        h =
          ((s.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            r.TypeDescrtption,
          )),
          ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfigListByMonsterId(
            r.Id,
          ));
      !h ||
        h.length <= 0 ||
        ((h = h[0]),
        (i =
          void 0 ===
          (a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
            1,
            h.MonsterId,
          ))),
        (a = void 0 !== a && !a.IsRead),
        (s.Icon = h.IconSmall),
        (s.Config = r),
        (s.IsLock = i),
        (s.IsNew = a),
        n.push(s));
    }
    (this.Bzt = []), this.InitScrollViewByCommonItem(n);
  }
  GetTabItemData(e) {
    var t = e.length,
      n = new Array();
    for (let e = 0; e < t; e++) {
      var o = new CommonTabItemBase_1.CommonTabItemData();
      0 === (o.Index = e) && (o.RedDotName = "PhantomHandBook"),
        (o.Data = this.TabList[e]),
        n.push(o);
    }
    return n;
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(1);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
      "PhantomHandBookLock",
    );
    this.SetLockText(e);
  }
  RefreshTabComponent() {
    (this.oei = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookPageConfig(),
    )),
      this.oei.sort(this.aZt);
    var t = this.oei.length,
      n = [];
    for (let e = 0; e < t; e++) {
      var o = this.oei[e];
      n.push(new CommonTabData_1.CommonTabData(o.Icon, void 0));
    }
    this.InitTabComponent(n), this.SetTabToggleCallBack(this.TabToggleCallBack);
  }
  RefreshPhantomTitle() {
    var e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(1);
    this.InitCommonTabTitle(
      e.TitleIcon,
      new CommonTabTitleData_1.CommonTabTitleData(e.Name),
    );
  }
  RefreshPhantomFetterTitle() {
    var e =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("Fetter"),
      t =
        ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
          1,
        );
    this.InitCommonTabTitle(
      t.TitleIcon,
      new CommonTabTitleData_1.CommonTabTitleData(e),
    );
  }
  RefreshPhantomFetter() {
    this.GetItem(26).SetUIActive(!0), this.GetText(23).SetUIActive(!1);
    var t =
        ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomFetterHandBookConfig(),
      n = [],
      o = t.length;
    for (let e = 0; e < o; e++) {
      var i = t[e],
        i =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
            i.Id,
          );
      n.push(i);
    }
    (this.rei = []),
      this.InitScrollViewByFetterItem(n),
      this.InitToggleState(),
      this.GetText(17).SetUIActive(!1);
  }
  InitToggleState() {
    var t = this.rei.length;
    for (let e = 0; e < t; e++) {
      var n = this.rei[e];
      0 === e
        ? (n.SetToggleStateForce(1), n.OnSelected(!0))
        : n.SetToggleStateForce(0);
    }
  }
  RefreshHandBookPhantomLayout(e) {
    this.InitHandBookPhantomLayout([]),
      this.RefreshHandBookPhantomItemToggleState();
  }
  RefreshHandBookPhantomItemToggleState() {
    var t = this.nei.length;
    if (0 !== t)
      for (let e = 0; e < t; e++) {
        var n = this.nei[e];
        0 === e
          ? (n.SetToggleStateForce(1), n.OnSelected(!0))
          : n.SetToggleStateForce(0);
      }
  }
  RefreshPhantomFetterLayout(e) {
    var t = [],
      n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "FetterEffectDescription",
      ),
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        e.EffectDescription,
      ),
      i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "FetterEffectDefineDescription",
      ),
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        e.EffectDefineDescription,
      );
    t.push(
      new HandBookDefine_1.HandBookContentItemData(n, o),
      new HandBookDefine_1.HandBookContentItemData(i, e),
    ),
      this.InitContentItemLayout(t);
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.bzt,
    );
  }
  OnBeforeCreate() {
    UiSceneManager_1.UiSceneManager.InitPhantomObserver(),
      (this.qzt = UiSceneManager_1.UiSceneManager.GetPhantomObserver());
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyPhantomObserver(),
      (this.qzt = void 0),
      (this.oei = []),
      (this.rei = []),
      (this.nei = []),
      (this.Bzt = []);
  }
}
exports.PhantomHandBookView = PhantomHandBookView;
//# sourceMappingURL=PhantomHandBookView.js.map
