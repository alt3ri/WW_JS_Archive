"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CumulativeShopTaskView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CumulativeShopController_1 = require("./CumulativeShopController"),
  CumulativeShopTaskItem_1 = require("./CumulativeShopTaskItem");
class CumulativeShopTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.vg1 = void 0),
      (this.yg1 = void 0),
      (this.Sg1 = void 0),
      (this.lqe = void 0),
      (this.Mg1 = 0),
      (this.C5e = () => {
        var e = new CumulativeShopTaskTabItem();
        return (e.OnClickBack = this.Eg1), e;
      }),
      (this.ou_ = () => {
        return new CumulativeShopTaskItem_1.CumulativeShopTaskItem();
      }),
      (this.Eg1 = (e, t) => {
        this.Sg1?.SetToggleState(0), (this.Sg1 = t), (this.Mg1 = e);
        t =
          CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().GetTabTaskList(
            e,
          );
        this.yg1.RefreshByData(t ?? []), this.yg1.GetUiAnimController()?.Play();
      }),
      (this.Ig1 = () => {
        var e =
          CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().GetTabTaskList(
            this.Mg1,
          );
        this.yg1.RefreshByData(e ?? []), this.yg1.GetUiAnimController()?.Play();
      }),
      (this.Xv1 = () => {
        const r = Array.from(
          CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().TaskTabMap.keys(),
        );
        r.sort((e, t) => e - t),
          this.vg1.RefreshByData(r, () => {
            var t =
              CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData();
            let i = !1;
            for (let e = 0; e < r.length; e++) {
              var s = r[e];
              if (t.GetTaskTabRedDot(s)) {
                this.vg1.SelectGridProxy(e),
                  this.Mg1 - 1 === e && this.Ig1(),
                  (i = !0);
                break;
              }
            }
            i ||
              (this.vg1.SelectGridProxy(Math.max(this.Mg1 - 1, 0), !0),
              this.Ig1());
          });
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [4, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(e.GetOwner()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      });
  }
  OnStart() {
    (this.vg1 = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(4),
      this.C5e,
    )),
      (this.yg1 = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        this.ou_,
      )),
      this.lqe.SetTitleLocalText("Activity_105100001_QuestList_Desc");
  }
  OnBeforeShow() {
    CumulativeShopController_1.CumulativeShopController.ConsumptiveActivityInfoRequest();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CumulativeShopTaskRefresh,
      this.Ig1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CumulativeShopTaskViewDataRefresh,
        this.Xv1,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CumulativeShopTaskRefresh,
      this.Ig1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CumulativeShopTaskViewDataRefresh,
        this.Xv1,
      );
  }
}
exports.CumulativeShopTaskView = CumulativeShopTaskView;
class CumulativeShopTaskTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnClickBack = void 0),
      (this.TabIndex = 0),
      (this.hHe = (e) => {
        1 === e && this.OnClickBack(this.TabIndex, this.GetExtendToggle(1));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.hHe]]);
  }
  Refresh(e, t, i) {
    this.TabIndex = e;
    e =
      ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskTabConfig(
        this.TabIndex,
      );
    this.SetSpriteByPath(e.SpriteIcon, this.GetSprite(0), !1, void 0, () => {
      this.GetSprite(0)
        .GetOwner()
        .GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass())
        .SetAllStateSprite(this.GetSprite(0).GetSprite());
    }),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Title),
      RedDotController_1.RedDotController.BindRedDot(
        "CumulativeShopTaskTabRedDot",
        this.GetItem(2),
        void 0,
        this.TabIndex,
      );
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "CumulativeShopTaskTabRedDot",
      this.GetItem(2),
    );
  }
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1, !0);
  }
}
//# sourceMappingURL=CumulativeShopTaskView.js.map
