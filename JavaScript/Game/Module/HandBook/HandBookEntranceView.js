"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookEntranceView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
const HandBookController_1 = require("./HandBookController");
const HandBookEntranceItem_1 = require("./HandBookEntranceItem");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class HandBookEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.bZt = []),
      (this.xqe = void 0),
      (this.qZt = []),
      (this.lqe = void 0),
      (this.OnHandBookDataInit = () => {
        this.InitVerticalLayout();
        const e =
          HandBookController_1.HandBookController.GetAllCollectProgress();
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(1),
          "RoleExp",
          e[0],
          e[1],
        ),
          this.GetText(1)?.SetUIActive(!1),
          HandBookController_1.HandBookController.SendIllustratedRedDotRequest();
      }),
      (this.OnHandBookRedDotUpdate = () => {
        const t = this.qZt.length;
        for (let e = 0; e < t; e++) this.qZt[e].RefreshRedDot();
      }),
      (this.InitVerticalLayout = () => {
        const e = ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfigList(),
        );
        e.sort(this.aZt),
          (this.bZt = e),
          this.xqe ||
            (this.xqe = new GenericScrollView_1.GenericScrollView(
              this.GetScrollViewWithScrollbar(2),
              this.sGe,
            )),
          this.xqe.ClearChildren(),
          this.xqe.RefreshByData(this.bZt);
      }),
      (this.sGe = (e, t, i) => {
        t = new HandBookEntranceItem_1.HandBookEntranceItem(t);
        return t.Refresh(e, !1, i), this.qZt.push(t), { Key: i, Value: t };
      }),
      (this.aZt = (e, t) => e.Id - t.Id),
      (this.JSt = () => {
        UiManager_1.UiManager.CloseView("HandBookEntranceView");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.InitCommonTabTitle(), this.AddEvents(), this.InitData();
  }
  InitData() {
    const e = [];
    e.push(0),
      e.push(1),
      e.push(2),
      e.push(3),
      e.push(4),
      e.push(5),
      e.push(6),
      e.push(7),
      HandBookController_1.HandBookController.SendIllustratedInfoRequest(e);
  }
  OnAfterShow() {
    HandBookController_1.HandBookController.SendIllustratedRedDotRequest();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHandBookRedDotUpdate,
      this.OnHandBookRedDotUpdate,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookDataInit,
        this.OnHandBookDataInit,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookRedDotUpdate,
      this.OnHandBookRedDotUpdate,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookDataInit,
        this.OnHandBookDataInit,
      );
  }
  InitCommonTabTitle() {
    const e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "HandBookEntrance",
      );
    const t =
      ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
        "HandBookEntrance",
      );
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.JSt),
      this.lqe.SetTitleLocalText(t),
      this.lqe.SetTitleIcon(e);
  }
  OnBeforeDestroy() {
    this.RemoveEvents(),
      this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
      (this.bZt = []),
      (this.qZt = []);
  }
}
exports.HandBookEntranceView = HandBookEntranceView;
// # sourceMappingURL=HandBookEntranceView.js.map
