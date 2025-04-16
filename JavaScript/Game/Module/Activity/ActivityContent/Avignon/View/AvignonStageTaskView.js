"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonStageTaskView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  PageDot_1 = require("../../../../Common/PageDot"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  AvignonTaskItem_1 = require("./Item/AvignonTaskItem");
class AvignonStageTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xOe = 0),
      (this.vcc = void 0),
      (this.Yja = 0),
      (this.Xja = []),
      (this.lqe = void 0),
      (this.tPe = void 0),
      (this.qoh = void 0),
      (this.ycc = 0),
      (this.HOe = () => new PageDot_1.PageDot()),
      (this.VOe = () => new AvignonTaskItem_1.AvignonTaskItem()),
      (this.zja = (i) => {
        ModelManager_1.ModelManager.AvignonModel.GetAvignonActivityId() === i &&
          ((i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(
            this.Xja[this.Yja],
          )),
          this._Xa(i.GetTaskList(), !1));
      }),
      (this.KOe = () => {
        (this.ycc = this.Yja - 1), this.PlaySequence("SwitchLeft");
      }),
      (this.QOe = () => {
        var i = this.Yja + 1,
          t = this.Xja[i],
          t = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(t);
        t.IsUnlock
          ? ((this.ycc = i), this.PlaySequence("SwitchRight"))
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              t.GetLockConditionText(),
            );
      }),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.$An = (i) => {
        "PageChange" === i && this.Og();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UITexture],
      [9, UE.UISprite],
      [10, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [7, this.KOe],
        [6, this.QOe],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.tPe = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(4),
      this.HOe,
    )),
      (this.qoh = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.VOe,
      )),
      (this.xOe = this.OpenParam),
      (this.Xja =
        ModelManager_1.ModelManager.AvignonModel.GetAvignonAllStagesId()),
      (this.Yja = this.Xja.includes(this.xOe) ? this.Xja.indexOf(this.xOe) : 0),
      await this.tPe.RefreshByDataAsync(this.Xja);
    var i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(
        this.xOe,
      ),
      i =
        (await this.qoh.RefreshByDataAsync(i.GetTaskList()),
        (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
        ModelManager_1.ModelManager.AvignonModel.GetAvignonActivityName());
    this.lqe.SetTitle(i),
      this.lqe.SetHelpBtnActive(!1),
      this.lqe.SetCloseCallBack(this.AMo),
      (this.ycc = this.Yja),
      this.Og();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.zja,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.$An,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.zja,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.$An,
      );
  }
  Og() {
    this.tPe.GetLayoutItemByIndex(this.Yja).UpdateShow(!1),
      (this.Yja = this.ycc),
      this.tPe.GetLayoutItemByIndex(this.Yja).UpdateShow(!0),
      this.GetButton(7).RootUIComp.SetUIActive(0 < this.Yja),
      this.GetButton(6).RootUIComp.SetUIActive(this.Yja < this.Xja.length - 1),
      (this.xOe = this.Xja[this.Yja]),
      (this.vcc =
        ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigById(
          this.xOe,
        ));
    var i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(
      this.xOe,
    );
    this._Xa(i.GetTaskList(), !0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), this.vcc.Title);
    let t = this.vcc.Icon;
    0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() &&
      (t = this.vcc.FemaleIcon),
      this.SetTextureByPath(t, this.GetTexture(8)),
      this.SetSpriteByPath(this.vcc.RomaIcon, this.GetSprite(9), !1),
      ModelManager_1.ModelManager.AvignonModel.SaveNewStageFlag(this.xOe);
  }
  _Xa(i, t) {
    this.Scc(), this.qoh.RefreshByData(i, void 0, t);
  }
  Scc() {
    var i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(
      this.xOe,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "BlackCoastTheme_TaskCompleteProgress",
      i.GetTaskProgress(),
    );
  }
}
exports.AvignonStageTaskView = AvignonStageTaskView;
//# sourceMappingURL=AvignonStageTaskView.js.map
