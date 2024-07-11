"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
const HandBookBaseView_1 = require("./HandBookBaseView");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class ItemHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.ZZt = []),
      (this.Bzt = []),
      (this.Refresh = () => {
        this.RefreshScrollView(this.GetFirstPageType());
      }),
      (this.OnHandBookRead = (e, t) => {
        if (e === 5) {
          const n = this.Bzt.length;
          for (let e = 0; e < n; e++) {
            const o = this.Bzt[e];
            if (o.GetData().Config.Id === t) {
              o.SetNewFlagVisible(!1);
              break;
            }
          }
        }
      }),
      (this.TabToggleCallBack = (e) => {
        e = this.ZZt[e].Id;
        this.RefreshScrollView(e);
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
        var e =
          (this.ScrollViewCommon.DeselectCurrentGridProxy(),
          this.ScrollViewCommon.SelectGridProxy(e),
          this.ScrollViewCommon.RefreshGridProxy(e),
          t.Config);
        this.RefreshTitleText(e.Id),
          t.IsLock
            ? this.SetItemLockState(!0)
            : (this.SetItemLockState(!1), this.RefreshItemContent(t));
      }),
      (this.TabItemProxyCreate = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.aZt = (e, t) => e.Id - t.Id);
  }
  OnStart() {
    this.SetDefaultState(),
      this.RefreshTabComponent(),
      this.RefreshItemTitle(),
      this.RefreshCollectText(),
      this.RefreshLockText(),
      this.RefreshScrollView(this.GetFirstPageType());
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
  SetItemLockState(e) {
    this.SetLockState(e), this.GetTexture(25).SetUIActive(!e);
  }
  RefreshItemContent(e) {
    var t = e.Config;
    var e =
      (e.IsNew &&
        HandBookController_1.HandBookController.SendIllustratedReadRequest(
          5,
          t.Id,
        ),
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.Id));
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
    var n =
      (this.SetNameText(n),
      this.SetItemTexture(e.IconMiddle),
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title));
    var t = [];
    var n = (t.push(n), this.InitInfoItemLayout(t), []);
    var t =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.BgDescription) ??
      "";
    n.push(new HandBookDefine_1.HandBookContentItemData("", t)),
      this.InitContentItemLayout(n),
      this.RefreshOwnText(e.Id);
  }
  RefreshCollectText() {
    const e = HandBookController_1.HandBookController.GetCollectProgress(5);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    const e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("ItemHandBookLock");
    this.SetLockText(e);
  }
  RefreshOwnText(e) {
    e = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(5, e);
    this.SetOwnText(e.Num);
  }
  GetFirstTypeId() {
    return ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList()[0]
      .Id;
  }
  RefreshScrollView(e) {
    if (e) {
      const t =
        ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigByType(
          e,
        );
      const n = [];
      const o = t.length;
      for (let e = 0; e < o; e++) {
        const i = t[e];
        var a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
          5,
          i.Id,
        );
        const r = void 0 === a;
        var a = void 0 !== a && !a.IsRead;
        const s = new HandBookDefine_1.HandBookCommonItemData();
        const m = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
          i.Id,
        );
        (s.Icon = m.IconSmall),
          (s.QualityId = m.QualityId),
          (s.ConfigId = m.Id),
          (s.IsLock = r),
          (s.IsNew = a),
          (s.Config = i),
          n.push(s);
      }
      this.InitScrollViewByCommonItem(n);
    }
  }
  GetFirstPageType() {
    if (this.ZZt.length !== 0) return this.ZZt[0].Id;
  }
  RefreshTabComponent() {
    (this.ZZt = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList(),
    )),
      this.ZZt.sort(this.aZt);
    const t = this.ZZt.length;
    const n = [];
    for (let e = 0; e < t; e++) {
      const o = this.ZZt[e];
      n.push(new CommonTabData_1.CommonTabData(o.Icon, void 0));
    }
    this.InitTabComponent(n), this.SetTabToggleCallBack(this.TabToggleCallBack);
  }
  RefreshItemTitle() {
    const e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(5);
    this.InitCommonTabTitle(
      e.TitleIcon,
      new CommonTabTitleData_1.CommonTabTitleData(e.Name),
    );
  }
  RefreshTitleText(e) {
    (e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
        e,
      )),
      (e =
        ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfig(
          e.Type,
        ));
    this.UpdateTitle(
      new CommonTabTitleData_1.CommonTabTitleData(e.Descrtption),
    );
  }
  GetTabItemData(e) {
    const t = e.length;
    const n = new Array();
    for (let e = 0; e < t; e++) {
      const o = new CommonTabItemBase_1.CommonTabItemData();
      (o.Index = e),
        (o.RedDotName = "ItemHandBook"),
        (o.RedDotUid = this.ZZt[e].Id),
        (o.Data = this.TabList[e]),
        n.push(o);
    }
    return n;
  }
  OnBeforeDestroy() {
    (this.ZZt = []), (this.Bzt = []);
  }
}
exports.ItemHandBookView = ItemHandBookView;
// # sourceMappingURL=ItemHandBookView.js.map
