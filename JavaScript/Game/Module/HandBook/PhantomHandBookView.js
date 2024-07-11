"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomHandBookView = void 0);
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const HandBookBaseView_1 = require("./HandBookBaseView");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const HandBookFetterItem_1 = require("./HandBookFetterItem");
const HandBookPhantomItem_1 = require("./HandBookPhantomItem");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
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
        if (e === 1) {
          const n = this.Bzt.length;
          for (let e = 0; e < n; e++) {
            const o = this.Bzt[e];
            const i = o.GetData();
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
        (this.sei = e) === 0
          ? (this.RefreshPhantomTitle(), this.RefreshPhantom())
          : (this.RefreshPhantomFetterTitle(), this.RefreshPhantomFetter());
      }),
      (this.InitHandBookCommonItem = () => {
        const e = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          this.Bzt.push(e),
          e.BindOnExtendToggleStateChanged(this.OnToggleClick),
          e
        );
      }),
      (this.OnToggleClick = (e) => {
        const t = e.Data;
        var e = e.MediumItemGrid.GridIndex;
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
        const o = new HandBookPhantomItem_1.HandBookPhantomItem();
        return (
          o.Initialize(e, t),
          o.BindToggleCallback(this.OnPhantomToggleClick),
          this.nei.push(o),
          { Key: n, Value: o }
        );
      }),
      (this.OnPhantomToggleClick = (e) => {
        let t, n;
        this.sei !== 0 &&
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
        const e = new HandBookFetterItem_1.HandBookFetterItem();
        return e.BindFetterToggleCallback(this.GZt), this.rei.push(e), e;
      }),
      (this.GZt = (e) => {
        var t = e.GetGirdIndex();
        var t =
          (this.ScrollViewFetter.DeselectCurrentGridProxy(),
          this.ScrollViewFetter.SelectGridProxy(t),
          this.ScrollViewFetter.RefreshGridProxy(t),
          e.GetPhantomFetter());
        var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
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
    let t, n, o, i;
    this.sei !== 1 &&
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
    const t =
      ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig();
    const n = [];
    const o = t.length;
    for (let e = 0; e < o; e++) {
      var i;
      var a;
      const r = t[e];
      const s = new HandBookDefine_1.HandBookCommonItemData();
      let h =
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
    const t = e.length;
    const n = new Array();
    for (let e = 0; e < t; e++) {
      const o = new CommonTabItemBase_1.CommonTabItemData();
      (o.Index = e) === 0 && (o.RedDotName = "PhantomHandBook"),
        (o.Data = this.TabList[e]),
        n.push(o);
    }
    return n;
  }
  RefreshCollectText() {
    const e = HandBookController_1.HandBookController.GetCollectProgress(1);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    const e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
      "PhantomHandBookLock",
    );
    this.SetLockText(e);
  }
  RefreshTabComponent() {
    (this.oei = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookPageConfig(),
    )),
      this.oei.sort(this.aZt);
    const t = this.oei.length;
    const n = [];
    for (let e = 0; e < t; e++) {
      const o = this.oei[e];
      n.push(new CommonTabData_1.CommonTabData(o.Icon, void 0));
    }
    this.InitTabComponent(n), this.SetTabToggleCallBack(this.TabToggleCallBack);
  }
  RefreshPhantomTitle() {
    const e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(1);
    this.InitCommonTabTitle(
      e.TitleIcon,
      new CommonTabTitleData_1.CommonTabTitleData(e.Name),
    );
  }
  RefreshPhantomFetterTitle() {
    const e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("Fetter");
    const t =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(1);
    this.InitCommonTabTitle(
      t.TitleIcon,
      new CommonTabTitleData_1.CommonTabTitleData(e),
    );
  }
  RefreshPhantomFetter() {
    this.GetItem(26).SetUIActive(!0), this.GetText(23).SetUIActive(!1);
    const t =
      ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomFetterHandBookConfig();
    const n = [];
    const o = t.length;
    for (let e = 0; e < o; e++) {
      var i = t[e];
      var i =
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
    const t = this.rei.length;
    for (let e = 0; e < t; e++) {
      const n = this.rei[e];
      e === 0
        ? (n.SetToggleStateForce(1), n.OnSelected(!0))
        : n.SetToggleStateForce(0);
    }
  }
  RefreshHandBookPhantomLayout(e) {
    this.InitHandBookPhantomLayout([]),
      this.RefreshHandBookPhantomItemToggleState();
  }
  RefreshHandBookPhantomItemToggleState() {
    const t = this.nei.length;
    if (t !== 0)
      for (let e = 0; e < t; e++) {
        const n = this.nei[e];
        e === 0
          ? (n.SetToggleStateForce(1), n.OnSelected(!0))
          : n.SetToggleStateForce(0);
      }
  }
  RefreshPhantomFetterLayout(e) {
    const t = [];
    const n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
      "FetterEffectDescription",
    );
    const o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      e.EffectDescription,
    );
    const i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
      "FetterEffectDefineDescription",
    );
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
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
// # sourceMappingURL=PhantomHandBookView.js.map
