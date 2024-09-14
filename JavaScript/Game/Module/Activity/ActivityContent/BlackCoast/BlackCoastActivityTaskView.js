"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastActivityTaskView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  MediaPlayer_1 = require("../../../Common/MediaPlayer"),
  PageDot_1 = require("../../../Common/PageDot"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BlackCoastTaskItem_1 = require("./BlackCoastTaskItem");
class BlackCoastActivityTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.lqe = void 0),
      (this.tPe = void 0),
      (this.OOe = void 0),
      (this.$9a = []),
      (this.X9a = 0),
      (this.wNo = void 0),
      (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.HOe = () => new PageDot_1.PageDot()),
      (this.VOe = () => new BlackCoastTaskItem_1.BlackCoastTaskItem()),
      (this.Y9a = (i) => {
        this.ActivityBaseData &&
          this.ActivityBaseData.Id === i &&
          ((i = this.ActivityBaseData.GetStageById(this.$9a[this.X9a])),
          this.NWa(),
          this.kWa(i.GetTaskList(), !1));
      }),
      (this.KOe = () => {
        this.Og(this.X9a - 1);
      }),
      (this.QOe = () => {
        var i = this.X9a + 1,
          t = this.ActivityBaseData.GetStageById(this.$9a[i]);
        t.IsUnlock
          ? this.Og(i)
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              t.GetLockConditionText(),
            );
      }),
      (this.$Oe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [4, UE.UIVerticalLayout],
      [5, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UITexture],
      [10, UE.UIText],
      [11, UE.UITexture],
    ]),
      (this.BtnBindInfo = [
        [6, this.KOe],
        [7, this.QOe],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.$Oe),
      (this.tPe = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.HOe,
      )),
      (this.OOe = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(4),
        this.VOe,
      )),
      2 === Info_1.Info.PlatformType && (await this.DZa()),
      (this.wNo = new MediaPlayer_1.MediaPlayer(this.GetTexture(9)));
    var [i, t] = this.OpenParam;
    i &&
      t &&
      ((this.ActivityBaseData = i),
      this.lqe.SetTitle(this.ActivityBaseData.GetTitle()),
      (this.$9a = this.ActivityBaseData.GetAllStagesId()),
      (this.X9a = this.$9a.includes(t) ? this.$9a.indexOf(t) : 0),
      await this.tPe.RefreshByDataAsync(this.$9a),
      await this.SHe(this.X9a));
  }
  async DZa() {
    const t = new CustomPromise_1.CustomPromise();
    this.X3i();
    var i =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "M_VideoTexture",
      );
    (this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(
      i,
      UE.MaterialInterface,
      (i) => {
        this.GetTexture(9).SetCustomUIMaterial(i), t.SetResult();
      },
      102,
    )),
      await t.Promise;
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(
      void 0,
      this.ActivityBaseData.Id,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Y9a,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Y9a,
    );
  }
  OnBeforeDestroy() {
    this.wNo?.Clear(), (this.wNo = void 0), this.X3i();
  }
  X3i() {
    this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
      (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId));
  }
  async SHe(i) {
    (this.X9a = i), this.tPe.GetLayoutItemByIndex(this.X9a).UpdateShow(!0);
    var i = this.$9a[this.X9a],
      t = this.ActivityBaseData.GetStageById(i),
      e = ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(
        t.StageId,
      ),
      s = this.GetTexture(11);
    this.GetButton(6).RootUIComp.SetUIActive(0 < this.X9a),
      this.GetButton(7).RootUIComp.SetUIActive(this.X9a < this.$9a.length - 1),
      this.ActivityBaseData.SaveNewStageFlag(i),
      this.kWa(t.GetTaskList(), !0),
      await this.wNo.LoadVideoAndPlay(
        t.StageId.toString(),
        t.GetVideoSource(),
        !0,
      ),
      this.SetTextureShowUntilLoaded(e.TextureSmall, s),
      this.NWa();
  }
  async Og(i) {
    this.tPe.GetLayoutItemByIndex(this.X9a).UpdateShow(!1),
      (this.X9a = i),
      this.tPe.GetLayoutItemByIndex(this.X9a).UpdateShow(!0);
    var i = this.$9a[this.X9a],
      t = this.ActivityBaseData.GetStageById(i),
      e = ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(
        t.StageId,
      ),
      s = this.GetTexture(11);
    this.GetButton(6).RootUIComp.SetUIActive(0 < this.X9a),
      this.GetButton(7).RootUIComp.SetUIActive(this.X9a < this.$9a.length - 1),
      this.ActivityBaseData.SaveNewStageFlag(i),
      this.kWa(t.GetTaskList(), !0),
      this.WNe(),
      await this.PlaySequenceAsync("SwitchOut", !0),
      this.SetTextureShowUntilLoaded(e.TextureSmall, s),
      this.NWa(),
      await this.PlaySequenceAsync("SwitchIn", !0);
  }
  NWa() {
    var i = this.ActivityBaseData.GetStageById(this.$9a[this.X9a]),
      t = ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(
        i.StageId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(8),
      "BlackCoastTheme_TaskCompleteProgress",
      i.GetTaskProgress(),
    ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.TitleDetail);
  }
  kWa(i, t) {
    this.OOe.RefreshByData(i, void 0, t);
  }
  WNe() {
    var i = this.ActivityBaseData.GetStageById(this.$9a[this.X9a]);
    this.wNo.PlayVideo(i.StageId.toString(), i.GetVideoSource(), !0);
  }
}
exports.BlackCoastActivityTaskView = BlackCoastActivityTaskView;
//# sourceMappingURL=BlackCoastActivityTaskView.js.map
