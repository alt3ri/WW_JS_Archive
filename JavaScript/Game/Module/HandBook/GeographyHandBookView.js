"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeographyHandBookView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const GeographyHandBookItem_1 = require("./GeographyHandBookItem");
const HandBookController_1 = require("./HandBookController");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class GeographyHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleRootUiCameraHandleData = void 0),
      (this.GenericLayout = void 0),
      (this.pZt = []),
      (this.vZt = []),
      (this.lqe = void 0),
      (this.Refresh = () => {
        this.InitVerticalLayout(), this.RefreshCollectText();
      }),
      (this.MZt = (e, t, i) => {
        t = new GeographyHandBookItem_1.GeographyHandBookItem(t);
        return t.Refresh(e, !1, i), this.vZt.push(t), { Key: i, Value: t };
      }),
      (this.aZt = (e, t) => e.Id - t.Id),
      (this.SZt = (e, t) => e.Id - t.Id),
      (this.JSt = () => {
        UiManager_1.UiManager.CloseView("GeographyHandBookView");
      }),
      (this.OnHandBookRead = (e, t) => {
        if (e === 2) {
          const i = this.vZt.length;
          for (let e = 0; e < i; e++) {
            const o = this.vZt[e].GetChildItemList();
            const n = o.length;
            for (let e = 0; e < n; e++) {
              const s = o[e];
              if (s.GetData().Config.Id === t) return void s.SetNewState(!1);
            }
          }
        }
      }),
      (this.OnGeographyPhotoSelect = (t) => {
        const i = ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig(),
        );
        const o = (i.sort(this.SZt), this.GetScrollViewWithScrollbar(3));
        const n = i.length;
        let s = void 0;
        for (let e = 0; e < n; e++) {
          const r = i[e];
          if (r.Id === t) {
            s = r;
            break;
          }
        }
        const h = this.vZt.length;
        for (let e = 0; e < h; e++) {
          const a = this.vZt[e].GetChildItemList();
          const v = a.length;
          for (let e = 0; e < v; e++) {
            const _ = a[e];
            const f = _.GetData().Config;
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
    for (const i of this.vZt)
      for (const o of i.GetChildItemList()) {
        const t = o.GetTog();
        e && o.GetIsUnlock()
          ? (t.SetToggleStateForce(1, !1, !0), (e = !1))
          : t.SetToggleStateForce(0, !1, !0);
      }
  }
  InitCommonTabTitle() {
    const e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(2);
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.JSt),
      this.lqe.SetTitleLocalText(e.Name),
      this.lqe.SetTitleIcon(e.TitleIcon);
  }
  InitVerticalLayout() {
    const e = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfigList(),
    );
    e.sort(this.aZt),
      (this.pZt = e),
      (this.vZt = []),
      this.GenericLayout ||
        (this.GenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetVerticalLayout(1),
          this.MZt,
        )),
      this.GenericLayout.ClearChildren(),
      this.GenericLayout.RebuildLayoutByDataNew(this.pZt);
  }
  RefreshCollectText() {
    const e = HandBookController_1.HandBookController.GetCollectProgress(2);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]),
      this.GetText(2)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.RoleRootUiCameraHandleData = void 0),
      this.GenericLayout &&
        (this.GenericLayout.ClearChildren(), (this.GenericLayout = void 0)),
      (this.pZt = []),
      (this.vZt = []);
  }
}
exports.GeographyHandBookView = GeographyHandBookView;
// # sourceMappingURL=GeographyHandBookView.js.map
