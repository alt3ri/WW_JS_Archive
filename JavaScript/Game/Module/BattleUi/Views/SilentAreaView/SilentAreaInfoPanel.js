"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaInfoPanel = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BossRushController_1 = require("../../../Activity/ActivityContent/BossRush/BossRushController"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView"),
  SilentAreaInfoItem_1 = require("./SilentAreaInfoItem");
class SilentAreaInfoPanel extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Hmt = !1),
      (this.jmt = void 0),
      (this.TDe = void 0),
      (this.SPe = void 0),
      (this.e4 = []),
      (this.EndShow = () => {
        this.TDe && TimerSystem_1.TimerSystem.Remove(this.TDe),
          this.SPe?.StopCurrentSequence(),
          this.SPe?.PlayLevelSequenceByName("Close");
      }),
      (this.eRe = () => {
        this.EndShow(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView,
          );
      });
  }
  Initialize(e) {
    super.Initialize(e);
  }
  async InitializeAsync() {
    var e = this.GetItem(1),
      t = new SilentAreaInfoItem_1.SilentAreaInfoItem();
    await t.CreateByActorAsync(e.GetOwner()), this.e4.push(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.RootItem?.SetAnchorOffsetX(0),
      this.RootItem?.SetAnchorOffsetY(0),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent((e) => {
        "Close" === e && this.SetActive(!1);
      });
  }
  CreateAndShow(e, t, i) {
    this.Hmt
      ? (this.UpdateInfo(i), this.SetActive(!0), this.Wmt())
      : this.NewByResourceId(t, e).finally(() => {
          (this.Hmt = !0), this.UpdateInfo(i), this.Wmt();
        });
  }
  OnShowBattleChildView() {
    this.SPe.StopCurrentSequence(), this.SPe.PlaySequencePurely("Start");
  }
  UpdateInfo(e) {
    (this.jmt = e), this.Hmt && this.Kmt();
  }
  kO_() {
    var e;
    return this.jmt
      ? this.jmt.ShowInfo.Type !== IQuest_1.EInformationViewType.LevelPlay
        ? this.jmt.ShowInfo.Type ===
            IQuest_1.EInformationViewType.BossRushBuffInfo &&
          ((e =
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel
              .InstanceId),
          (e =
            BossRushController_1.BossRushController.GetBossRushSelectedBuffId(
              e,
            )),
          (e =
            ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
              e,
            )))
          ? [
              {
                TidMainTitle: "BossRushBuffDesc",
                SubTitles: [{ TidTitle: e.BuffTitle, TidContent: e.BuffDesc }],
              },
            ]
          : []
        : this.jmt.ShowInfo.InformationConfig
      : [];
  }
  Kmt() {
    if (this.jmt) {
      const r = this.kO_();
      for (let t = 0; t < r.length; t++) {
        var i,
          s = r[t];
        let e = void 0;
        t < this.e4.length
          ? ((e = this.e4[t]).SetCurrentShowType(this.jmt.ShowInfo.Type),
            e.UpdateItem(s))
          : ((i = LguiUtil_1.LguiUtil.CopyItem(
              this.GetItem(1),
              this.GetItem(0),
            )),
            (e =
              new SilentAreaInfoItem_1.SilentAreaInfoItem()).SetCurrentShowType(
              this.jmt.ShowInfo.Type,
            ),
            e.Initialize(i.GetOwner(), s),
            this.e4.push(e));
      }
      this.e4.forEach((e, t) => {
        e.SetActive(t < r.length);
      });
    }
  }
  Wmt() {
    this.TDe = TimerSystem_1.TimerSystem.Delay(this.eRe, 8e3);
  }
}
exports.SilentAreaInfoPanel = SilentAreaInfoPanel;
//# sourceMappingURL=SilentAreaInfoPanel.js.map
