"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeographyHandBookView = void 0);
const UE = require("ue"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../Ui/UiManager"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GeographyHandBookItem_1 = require("./GeographyHandBookItem"),
  HandBookController_1 = require("./HandBookController");
class GeographyHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleRootUiCameraHandleData = void 0),
      (this.GenericLayout = void 0),
      (this.pei = []),
      (this.vei = []),
      (this.lqe = void 0),
      (this.Refresh = () => {
        this.InitVerticalLayout(), this.RefreshCollectText();
      }),
      (this.Mei = (e, t, i) => {
        t = new GeographyHandBookItem_1.GeographyHandBookItem(t);
        return t.Refresh(e, !1, i), this.vei.push(t), { Key: i, Value: t };
      }),
      (this.aei = (e, t) => e.Id - t.Id),
      (this.Eei = (e, t) => e.Id - t.Id),
      (this.lyt = () => {
        UiManager_1.UiManager.CloseView("GeographyHandBookView");
      }),
      (this.OnHandBookRead = (e, t) => {
        if (2 === e) {
          var i = this.vei.length;
          for (let e = 0; e < i; e++) {
            var o = this.vei[e].GetChildItemList(),
              n = o.length;
            for (let e = 0; e < n; e++) {
              var s = o[e];
              if (s.GetData().Config.Id === t) return void s.SetNewState(!1);
            }
          }
        }
      }),
      (this.OnGeographyPhotoSelect = (t) => {
        var i = ConfigCommon_1.ConfigCommon.ToList(
            ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig(),
          ),
          o = (i.sort(this.Eei), this.GetScrollViewWithScrollbar(3)),
          n = i.length;
        let s = void 0;
        for (let e = 0; e < n; e++) {
          var r = i[e];
          if (r.Id === t) {
            s = r;
            break;
          }
        }
        var h = this.vei.length;
        for (let e = 0; e < h; e++) {
          var a = this.vei[e].GetChildItemList(),
            v = a.length;
          for (let e = 0; e < v; e++) {
            var _ = a[e],
              f = _.GetData().Config;
            f.Id === s.Id && f.Type === s.Type
              ? (_.SetToggleState(1), o.ScrollTo(_.GetRootItem()))
              : _.SetToggleState(0);
          }
        }
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIText],
      [3, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  OnStart() {
    this.Refresh(), this.InitCommonTabTitle();
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhotoSelect,
        this.OnGeographyPhotoSelect,
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
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhotoSelect,
        this.OnGeographyPhotoSelect,
      );
  }
  OnBeforeShow() {
    let e = !0;
    for (const i of this.vei)
      for (const o of i.GetChildItemList()) {
        var t = o.GetTog();
        e && o.GetIsUnlock()
          ? (t.SetToggleStateForce(1, !1, !0), (e = !1))
          : t.SetToggleStateForce(0, !1, !0);
      }
  }
  InitCommonTabTitle() {
    var e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(2);
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.lyt),
      this.lqe.SetTitleLocalText(e.Name),
      this.lqe.SetTitleIcon(e.TitleIcon);
  }
  InitVerticalLayout() {
    var e = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfigList(),
    );
    e.sort(this.aei),
      (this.pei = e),
      (this.vei = []),
      this.GenericLayout ||
        (this.GenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetVerticalLayout(1),
          this.Mei,
        )),
      this.GenericLayout.ClearChildren(),
      this.GenericLayout.RebuildLayoutByDataNew(this.pei);
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(2);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]),
      this.GetText(2)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.RoleRootUiCameraHandleData = void 0),
      this.GenericLayout &&
        (this.GenericLayout.ClearChildren(), (this.GenericLayout = void 0)),
      (this.pei = []),
      (this.vei = []);
  }
}
exports.GeographyHandBookView = GeographyHandBookView;
//# sourceMappingURL=GeographyHandBookView.js.map
