"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  HandBookBaseView_1 = require("./HandBookBaseView"),
  HandBookCommonItem_1 = require("./HandBookCommonItem"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine");
class AnimalHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.wzt = []),
      (this.Bzt = []),
      (this.bzt = void 0),
      (this.InitHandBookCommonItem = () => {
        var e = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          e.BindOnExtendToggleStateChanged(this.OnToggleClick),
          this.Bzt.push(e),
          e
        );
      }),
      (this.OnToggleClick = (e) => {
        var n,
          t = e.Data,
          e = e.MediumItemGrid.GridIndex;
        this.ScrollViewCommon.DeselectCurrentGridProxy(),
          this.ScrollViewCommon.SelectGridProxy(e),
          this.ScrollViewCommon.RefreshGridProxy(e),
          HandBookController_1.HandBookController.ClearEffect(),
          t.IsLock
            ? this.SetLockState(!0)
            : ((e = t.Config),
              t.IsNew &&
                HandBookController_1.HandBookController.SendIllustratedReadRequest(
                  4,
                  e.Id,
                ),
              this.SetLockState(!1),
              (n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
                4,
                e.Id,
              )) && this.SetDateText(n.CreateTime),
              t.IsNew &&
                HandBookController_1.HandBookController.SendIllustratedReadRequest(
                  4,
                  e.Id,
                ),
              (n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
              this.SetNameText(n),
              (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                e.Descrtption,
              )),
              this.SetTypeText(t),
              this.RefreshInfoItemLayout(e),
              this.RefreshDropItem(e),
              HandBookController_1.HandBookController.SetAnimalMeshShow(
                e.Id,
                this.qzt,
              ));
      }),
      (this.Refresh = () => {
        this.wzt =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
        var n = [],
          t = this.wzt.length;
        for (let e = 0; e < t; e++) {
          var o = this.wzt[e],
            i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              4,
              o.Id,
            ),
            a = void 0 === i,
            i = void 0 !== i && !i.IsRead,
            r = new HandBookDefine_1.HandBookCommonItemData();
          (r.Icon = o.Icon),
            (r.Config = o),
            (r.IsLock = a),
            (r.IsNew = i),
            n.push(r);
        }
        (this.Bzt = []), this.InitScrollViewByCommonItem(n);
        var e =
          ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
            4,
          );
        this.InitCommonTabTitle(
          e.TitleIcon,
          new CommonTabTitleData_1.CommonTabTitleData(e.Name),
        ),
          this.RefreshCollectText();
      }),
      (this.OnHandBookRead = (e, n) => {
        if (4 === e) {
          var t = this.Bzt.length;
          for (let e = 0; e < t; e++) {
            var o = this.Bzt[e];
            if (o.GetData().Config.Id === n)
              return void o.SetNewFlagVisible(!1);
          }
        }
      }),
      (this.qzt = void 0);
  }
  OnStart() {
    this.SetDefaultState(), this.Refresh(), this.RefreshLockText();
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
  GetTabItemData(e) {
    var n = new Array(),
      t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      var o = new CommonTabItemBase_1.CommonTabItemData();
      (o.Index = e), (o.Data = this.TabList[e]), n.push(o);
    }
    return n;
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(4);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "AnimalHandBookLock",
      );
    this.SetLockText(e);
  }
  RefreshDropItem(e) {
    var n = [],
      t = e.DropItemId,
      o = t.length;
    for (let e = 0; e < o; e++) {
      var i = t[e];
      n.push([{ IncId: 0, ItemId: i }, 0]);
    }
  }
  RefreshInfoItemLayout(e) {
    var n = [],
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        e.TypeDescrtption,
      );
    n.push(e), this.InitInfoItemLayout(n);
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.bzt,
    );
  }
  OnBeforeCreate() {
    UiSceneManager_1.UiSceneManager.InitHandBookObserver(),
      (this.qzt = UiSceneManager_1.UiSceneManager.GetHandBookObserver());
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyHandBookObserver(),
      (this.qzt = void 0),
      HandBookController_1.HandBookController.ClearEffect(),
      (this.wzt = []),
      (this.Bzt = []);
  }
}
exports.AnimalHandBookView = AnimalHandBookView;
//# sourceMappingURL=AnimalHandBookView.js.map
