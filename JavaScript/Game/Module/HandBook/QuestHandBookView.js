"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestHandBookView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const HandBookController_1 = require("./HandBookController");
const PlotHandBookItem_1 = require("./PlotHandBookItem");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class QuestHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.GenericLayout = void 0),
      (this.hei = []),
      (this.lqe = void 0),
      (this.Refresh = () => {
        this.InitVerticalLayout(), this.RefreshCollectText();
      }),
      (this.lei = (e, t, i) => {
        t = new PlotHandBookItem_1.PlotHandBookItem(t);
        return t.Refresh(e, !1, i), { Key: i, Value: t };
      }),
      (this.aZt = (e, t) => e.Id - t.Id),
      (this.JSt = () => {
        UiManager_1.UiManager.CloseView("QuestHandBookView");
      }),
      (this.OnPhotoSelect = (e) => {
        for (const i of this.GenericLayout?.GetLayoutItemList())
          for (const o of i.GetChildItemList()) {
            const t = o.GetTog();
            o.GetData()?.Config.Id === e
              ? t.SetToggleStateForce(1, !1, !0)
              : t.SetToggleStateForce(0, !1, !0);
          }
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIText],
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
        EventDefine_1.EEventName.OnPhotoSelect,
        this.OnPhotoSelect,
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
        EventDefine_1.EEventName.OnPhotoSelect,
        this.OnPhotoSelect,
      );
  }
  OnAfterShow() {}
  InitCommonTabTitle() {
    const e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(7);
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.JSt),
      this.lqe.SetTitleLocalText(e.Name),
      this.lqe.SetTitleIcon(e.TitleIcon);
  }
  InitVerticalLayout() {
    const e = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfigList(),
    );
    e.sort(this.aZt),
      (this.hei = e),
      this.GenericLayout ||
        (this.GenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetVerticalLayout(1),
          this.lei,
        )),
      this.GenericLayout.ClearChildren(),
      this.GenericLayout.RebuildLayoutByDataNew(this.hei);
  }
  RefreshCollectText() {
    const e = HandBookController_1.HandBookController.GetCollectProgress(7);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]),
      this.GetText(2)?.SetUIActive(!1);
  }
  OnBeforeShow() {
    let e = !0;
    for (const i of this.GenericLayout?.GetLayoutItemList())
      for (const o of i.GetChildItemList()) {
        const t = o.GetTog();
        e && o.GetIsUnlock()
          ? (t.SetToggleStateForce(1, !1, !0), (e = !1))
          : t.SetToggleStateForce(0, !1, !0);
      }
  }
  OnBeforeDestroy() {
    this.GenericLayout &&
      (this.GenericLayout.ClearChildren(), (this.GenericLayout = void 0)),
      (this.hei = []);
  }
}
exports.QuestHandBookView = QuestHandBookView;
// # sourceMappingURL=QuestHandBookView.js.map
