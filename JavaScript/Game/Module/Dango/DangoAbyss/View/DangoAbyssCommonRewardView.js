"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssCommonRewardView = exports.DangoAbyssRewardViewData =
    void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DangoAbyssRewardItem_1 = require("./DangoAbyssRewardItem");
class DangoAbyssRewardViewData {
  constructor() {
    this.Data = void 0;
  }
}
exports.DangoAbyssRewardViewData = DangoAbyssRewardViewData;
class DangoAbyssCommonRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.hT = 1),
      (this.$8i = void 0),
      (this.LoopScrollView = void 0),
      (this.j11 = void 0),
      (this.H11 = void 0),
      (this.$11 = []),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.Z3e = () => {
        var t = this.$8i.Data.GetTaskActivityRewardDataList(2, this.hT);
        this.LoopScrollView.RefreshByData(t, !1, void 0, !0);
      }),
      (this.UVc = (t) => {
        (this.hT = t), this.Z3e(), this.AB_();
      }),
      (this.I2i = () => {
        return new DangoAbyssRewardItem_1.DangoAbyssRewardItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIVerticalLayout],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.AMo]]);
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAbyssRewardStateUpdate,
      this.Z3e,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAbyssRewardStateUpdate,
      this.Z3e,
    );
  }
  async OnBeforeStartAsync() {
    (this.j11 = new TabItem()),
      (this.H11 = new TabItem()),
      await this.j11.CreateByActorAsync(this.GetItem(1).GetOwner()),
      await this.H11.CreateByActorAsync(this.GetItem(2).GetOwner()),
      this.$11.push(this.j11),
      this.$11.push(this.H11);
  }
  OnStart() {
    this.$8i = this.OpenParam;
    var e = this.$8i.Data.GetRewardTypeTabList(2);
    0 < e.length && (this.hT = e[0]);
    for (let t = 0; t < e.length; t++) this.$11[t].SetActive(!0);
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(3),
      this.GetItem(5).GetOwner(),
      this.I2i,
    );
  }
  AB_() {
    var t = this.$8i.Data.GetRewardTypeTabList(2);
    const i = [];
    var e = t.length;
    t.forEach((t) => {
      var e = new TabData();
      (e.TabId = t),
        (e.CurrentSelectTabId = this.hT),
        (e.ClickCallBack = this.UVc),
        i.push(e);
    });
    for (let t = 0; t < e; t++) this.$11[t].Refresh(i[t], !1, t);
  }
  OnBeforeShow() {
    (this.hT =
      0 < this.$8i.Data.GetRewardTypeTabList(2).length
        ? this.$8i.Data.GetRewardTypeTabList(2)[0]
        : 1),
      this.Z3e(),
      this.AB_();
  }
}
exports.DangoAbyssCommonRewardView = DangoAbyssCommonRewardView;
class TabData {
  constructor() {
    (this.CurrentSelectTabId = 0),
      (this.TabId = 0),
      (this.ClickCallBack = void 0);
  }
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.kqe = () => {
        this.$8i.ClickCallBack && this.$8i.ClickCallBack(this.$8i.TabId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[2, this.kqe]]);
  }
  Refresh(t, e, i) {
    this.$8i = t;
    var s =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardTabById(
          t.TabId,
        ),
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name),
        t.TabId === t.CurrentSelectTabId),
      t = s ? 1 : 0;
    this.GetExtendToggle(2).SetToggleState(t);
  }
}
//# sourceMappingURL=DangoAbyssCommonRewardView.js.map
