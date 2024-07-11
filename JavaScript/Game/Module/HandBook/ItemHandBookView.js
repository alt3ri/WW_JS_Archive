"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemHandBookView = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
  CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
  HandBookBaseView_1 = require("./HandBookBaseView"),
  HandBookCommonItem_1 = require("./HandBookCommonItem"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine");
class ItemHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.Zei = []),
      (this.BZt = []),
      (this.Refresh = () => {
        this.RefreshScrollView(this.GetFirstPageType());
      }),
      (this.OnHandBookRead = (e, t) => {
        if (5 === e) {
          var n = this.BZt.length;
          for (let e = 0; e < n; e++) {
            var o = this.BZt[e];
            if (o.GetData().Config.Id === t) {
              o.SetNewFlagVisible(!1);
              break;
            }
          }
        }
      }),
      (this.TabToggleCallBack = (e) => {
        e = this.Zei[e].Id;
        this.RefreshScrollView(e);
      }),
      (this.InitHandBookCommonItem = () => {
        var e = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          this.BZt.push(e),
          e.BindOnExtendToggleStateChanged(this.OnToggleClick),
          e
        );
      }),
      (this.OnToggleClick = (e) => {
        var t = e.Data,
          e = e.MediumItemGrid.GridIndex,
          e =
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
      (this.aei = (e, t) => e.Id - t.Id);
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
    var t = e.Config,
      e =
        (e.IsNew &&
          HandBookController_1.HandBookController.SendIllustratedReadRequest(
            5,
            t.Id,
          ),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.Id)),
      n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name),
      n =
        (this.SetNameText(n),
        this.SetItemTexture(e.IconMiddle),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title)),
      t = [],
      n = (t.push(n), this.InitInfoItemLayout(t), []),
      t =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.BgDescription) ??
        "";
    n.push(new HandBookDefine_1.HandBookContentItemData("", t)),
      this.InitContentItemLayout(n),
      this.RefreshOwnText(e.Id);
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(5);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e =
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
      var t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigByType(
            e,
          ),
        n = [],
        o = t.length;
      for (let e = 0; e < o; e++) {
        var i = t[e],
          a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
            5,
            i.Id,
          ),
          r = void 0 === a,
          a = void 0 !== a && !a.IsRead,
          s = new HandBookDefine_1.HandBookCommonItemData(),
          m = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i.Id);
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
    if (0 !== this.Zei.length) return this.Zei[0].Id;
  }
  RefreshTabComponent() {
    (this.Zei = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList(),
    )),
      this.Zei.sort(this.aei);
    var t = this.Zei.length,
      n = [];
    for (let e = 0; e < t; e++) {
      var o = this.Zei[e];
      n.push(new CommonTabData_1.CommonTabData(o.Icon, void 0));
    }
    this.InitTabComponent(n), this.SetTabToggleCallBack(this.TabToggleCallBack);
  }
  RefreshItemTitle() {
    var e =
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
    var t = e.length,
      n = new Array();
    for (let e = 0; e < t; e++) {
      var o = new CommonTabItemBase_1.CommonTabItemData();
      (o.Index = e),
        (o.RedDotName = "ItemHandBook"),
        (o.RedDotUid = this.Zei[e].Id),
        (o.Data = this.TabList[e]),
        n.push(o);
    }
    return n;
  }
  OnBeforeDestroy() {
    (this.Zei = []), (this.BZt = []);
  }
}
exports.ItemHandBookView = ItemHandBookView;
//# sourceMappingURL=ItemHandBookView.js.map
