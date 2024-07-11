"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableGrid = exports.ActivityTurntableComponent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  TURNTABLE_GRID_SIZE = 8,
  ROTATE_DEFAULT_ANGLE = -90,
  ROTATE_GRID_ANGLE = -45,
  ROTATE_LOOP_ANIMATION_TIME = 500,
  TURNTABLE_ROTATE_PARAM = "TurntableRotate";
class ActivityTurntableComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sOe = []),
      (this.LevelSequencePlayer = void 0),
      (this.KAn = void 0),
      (this.uCo = 0),
      (this.QAn = 0),
      (this.XAn = new UE.Rotator()),
      (this.Activate = !0),
      (this.B2n = 0),
      (this.$An = (t) => {
        t === TURNTABLE_ROTATE_PARAM && this.Activate && this.YAn(this.QAn);
      }),
      (this.JAn = (t, e) => {
        this.uCo += t;
        t = Math.min(this.uCo / this.B2n, 1);
        (this.XAn.Pitch = 0),
          (this.XAn.Roll = 0),
          (this.XAn.Yaw = t * e),
          this.GetItem(8).SetUIRelativeRotation(this.XAn),
          this.uCo >= this.B2n && this.zAn();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (const e of [(this.sOe.length = 0), 1, 2, 3, 4, 5, 6, 7])
      t.push(this.rOe(this.GetItem(e).GetOwner()));
    await Promise.all(t),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      (this.B2n =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "TurntableActivitytRotateLoopTime",
        ) ?? ROTATE_LOOP_ANIMATION_TIME);
  }
  async rOe(t) {
    var e = new ActivityTurntableGrid();
    await e.CreateThenShowByActorAsync(t), this.sOe.push(e);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnBeforeDestroy() {
    this.zAn();
  }
  async Refresh(e) {
    if (e.length !== TURNTABLE_GRID_SIZE)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Activity", 38, "[转盘活动] 转盘奖励数量配置不正确", [
          "Count",
          e.length,
        ]);
    else {
      var i = [];
      for (let t = 0; t < e.length; t++) {
        var s = this.sOe[t].Refresh(e[t]);
        i.push(s);
      }
      await Promise.all(i);
    }
  }
  RunTurntableByRewardId(t, e) {
    this.ZAn(t, e).catch(() => {
      e?.();
    });
  }
  async ZAn(t, e) {
    const [i, s, r] = this.ePn(t);
    this.QAn = i;
    let n = "Start01";
    s ? (n = "Start03") : r && (n = "Start02"), await this.tPn(n, !0);
    t = () => {
      this.GetItem(8).SetUIRelativeRotation(new UE.Rotator(0, 0, 0)),
        this.iPn(i),
        e?.();
    };
    if (
      s &&
      void 0 !==
        UiManager_1.UiManager.OpenViewAsync("ActivityTurntableRewardView", t)
    )
      return;
    t();
  }
  ePn(e) {
    let i = -1,
      s = !1,
      r = !1;
    for (let t = 0; t < this.sOe.length; t++)
      if (this.sOe[t].RewardId === e) {
        (i = t), (s = this.sOe[t].IsSpecial), (r = this.sOe[t].IsGoldenQuality);
        break;
      }
    return i < 0
      ? [-1, s, r]
      : [ROTATE_DEFAULT_ANGLE + ROTATE_GRID_ANGLE * i, s, r];
  }
  YAn(e) {
    0 !== e &&
      (this.iPn(-e),
      (this.uCo = 0),
      (this.KAn = TimerSystem_1.TimerSystem.Forever((t) => {
        this.JAn(t, e);
      }, TimerSystem_1.MIN_TIME)));
  }
  iPn(t) {
    for (const e of this.sOe) e.Rotate(t);
  }
  zAn() {
    TimerSystem_1.TimerSystem.Has(this.KAn) &&
      (TimerSystem_1.TimerSystem.Remove(this.KAn),
      (this.KAn = void 0),
      (this.uCo = 0));
  }
  async tPn(t, e) {
    await this.LevelSequencePlayer.PlaySequenceAsync(
      t,
      new CustomPromise_1.CustomPromise(),
      e,
    );
  }
}
exports.ActivityTurntableComponent = ActivityTurntableComponent;
const REFRESH_LOADING_COUNT = 2;
class ActivityTurntableGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RewardId = 0),
      (this.IsGoldenQuality = !1),
      (this.IsSpecial = !1),
      (this.ETt = 0),
      (this.nWs = () => {
        this.ETt &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            this.ETt,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.nWs]]);
  }
  async Refresh(t) {
    (this.RewardId = t.Id), (this.IsSpecial = t.IsSpecial);
    let e = 0;
    const i = new CustomPromise_1.CustomPromise();
    var s = () => {
        ++e === REFRESH_LOADING_COUNT && i.SetResult();
      },
      r =
        ((this.ETt = t.RewardItem[0].ItemId),
        this.SetItemIcon(this.GetTexture(0), this.ETt, void 0, s),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          t.RewardItem[0].ItemId,
        )),
      r = r?.QualityId ?? 0,
      r = ((this.IsGoldenQuality = 5 === r), "SP_TurntableQuality" + r),
      r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
    this.SetSpriteByPath(r, this.GetSprite(1), !1, void 0, s),
      this.GetText(2).SetText(t.RewardItem[1].toString()),
      this.SetRewardClaimed(t.IsClaimed),
      await i.Promise;
  }
  SetRewardClaimed(t) {
    this.GetTexture(0).SetUIActive(!t),
      this.GetItem(3).SetUIActive(t),
      this.GetItem(4).SetUIActive(!t);
  }
  Rotate(t) {
    t = this.GetItem(4).RelativeRotation.Yaw + t;
    this.GetItem(4).SetUIRelativeRotation(new UE.Rotator(0, t, 0));
  }
}
exports.ActivityTurntableGrid = ActivityTurntableGrid;
//# sourceMappingURL=ActivityTurntableComponent.js.map
