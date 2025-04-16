"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssTimeLimitRewardView = exports.DangoAbyssTimeLimitViewData =
    void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DangoAbyssRewardItem_1 = require("./DangoAbyssRewardItem");
class DangoAbyssTimeLimitViewData {
  constructor() {
    this.Data = void 0;
  }
}
exports.DangoAbyssTimeLimitViewData = DangoAbyssTimeLimitViewData;
class DangoAbyssTimeLimitRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.hT = 1),
      (this.$8i = void 0),
      (this.LoopScrollView = void 0),
      (this.TDe = void 0),
      (this.YDo = () => {
        var e =
          ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssLimitRewardRewardId();
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e,
        );
      }),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.Z3e = () => {
        var e = this.$8i.Data.GetTaskActivityRewardDataList(1, this.hT);
        this.LoopScrollView.RefreshByData(e, !1, void 0, !0);
      }),
      (this.I2i = () => {
        return new DangoAbyssRewardItem_1.DangoAbyssRewardItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.AMo],
        [6, this.YDo],
      ]);
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
  OnStart() {
    this.$8i = this.OpenParam;
    var e = this.$8i.Data.GetRewardTypeTabList(1);
    0 < e.length && (this.hT = e[0]),
      (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(4),
        this.GetItem(5).GetOwner(),
        this.I2i,
      )),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.sSt();
      }, 1e3));
  }
  sSt() {
    var e;
    this.$8i.Data.CheckInLimitTime()
      ? ((e = this.$8i.Data.GetRemainTimeText()),
        this.GetText(1).SetText(e),
        this.GetText(1).SetUIActive(!0))
      : this.GetText(1).SetUIActive(!1);
  }
  nt1() {
    var e =
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssLimitRewardTexture();
    this.SetTextureByPath(e, this.GetTexture(2));
  }
  OnBeforeShow() {
    this.sSt(), this.Z3e(), this.nt1();
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.DangoAbyssTimeLimitRewardView = DangoAbyssTimeLimitRewardView;
//# sourceMappingURL=DangoAbyssTimeLimitRewardView.js.map
