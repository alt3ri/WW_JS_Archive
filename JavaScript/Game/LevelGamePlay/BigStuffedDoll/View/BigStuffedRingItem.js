"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedRingItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  BigStuffedDefine_1 = require("../BigStuffedDefine"),
  BigStuffedRingBgItem_1 = require("./BigStuffedRingBgItem"),
  BigStuffedRingLightItem_1 = require("./BigStuffedRingLightItem"),
  BigStuffedRingSpecialAreaItem_1 = require("./BigStuffedRingSpecialAreaItem"),
  BLANK_QTE_ANIM = "Miss",
  GOODAREA_QTE_ANIM = "Press01",
  BONUSAREA_QTE_ANIM = "Press02",
  SWITCH_IN_CURRENT = "In",
  SWITCH_OUT_CURRENT = "Out",
  CURRENT_RING_SHOW = "Start01",
  NOT_CURRENT_RING_SHOW = "Start02",
  COMMON_LIGHT = "Light01",
  PERFECT_LIGHT = "Light02";
class BigStuffedRingItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.Id = -1),
      (this.Pfl = void 0),
      (this.Ebl = void 0),
      (this.wfl = void 0),
      (this.Bfl = void 0),
      (this.bfl = void 0),
      (this.qfl = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.Yrn = void 0),
      (this.Gfl = !1),
      (this.cce = Rotator_1.Rotator.Create()),
      (this.XZh = 0),
      (this.YZh = 0),
      (this.Nfl = !1),
      (this.LDl = !1),
      (this.RDl = 0),
      (this.Ibl = -1),
      (this.owt = (t) => {
        switch (t) {
          case BLANK_QTE_ANIM:
          case GOODAREA_QTE_ANIM:
          case BONUSAREA_QTE_ANIM:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName
                .OnBigStuffedDollRingItemSequencePlayStart,
              this.Id,
              this.RDl,
              this.Ibl,
            );
        }
      }),
      (this.yct = (t) => {
        switch (t) {
          case BLANK_QTE_ANIM:
          case GOODAREA_QTE_ANIM:
          case BONUSAREA_QTE_ANIM:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnBigStuffedDollRingItemSequencePlayEnd,
              this.Id,
              this.RDl,
              this.Ibl,
            );
        }
      }),
      (this.Id = t),
      (this.wfl = i),
      (this.Pfl =
        ModelManager_1.ModelManager.BigStuffedDollModel.GetRingConfig(t)),
      this.Pfl
        ? ((this.Nfl = 0 === this.Config.InvalidBox.length),
          (i = this.Pfl.IsAnticlockwise ? 1 : 0),
          (this.Ebl =
            ModelManager_1.ModelManager.BigStuffedDollModel.GameInfo.AddRingInfo(
              t,
              i,
            )),
          (this.Bfl = new BigStuffedRingBgItem_1.BigStuffedRingBgItem(
            this.Id,
            this.Pfl,
            this.Ebl,
          )),
          (this.bfl =
            new BigStuffedRingSpecialAreaItem_1.BigStuffedRingSpecialAreaItem(
              this.Id,
              this.Pfl,
              this.Ebl,
            )),
          (this.qfl = new BigStuffedRingLightItem_1.BigStuffedRingLightItem(
            this.Id,
            this.Pfl,
          )))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]环配置找不到", [
            "id",
            t,
          ]);
  }
  get Config() {
    return this.Pfl;
  }
  async InitAsync() {
    await this.CreateThenShowByActorAsync(this.wfl);
    var t = this.Pfl.Offset;
    t &&
      (0 < t.length && this.RootItem.SetAnchorOffsetX(this.Pfl.Offset[0]),
      1 < t.length) &&
      this.RootItem.SetAnchorOffsetY(this.Pfl.Offset[1]);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(3),
      t =
        (await this.Bfl.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(4)),
      t =
        (await this.bfl.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(5));
    await this.qfl.CreateThenShowByActorAsync(t.GetOwner()),
      (this.Yrn = this.GetItem(2)),
      this.Yrn.SetUIRelativeRotation(Rotator_1.Rotator.Create().ToUeRotator()),
      this.Yrn.SetUIActive(!1),
      this.GetTexture(0).SetAlpha(0),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceStartEvent(this.owt),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear(), (this.LevelSequencePlayer = void 0);
  }
  OnAreaClick(t, i) {
    (this.RDl = t), (this.Ibl = i?.ContinuousIndex ?? -1);
    let e = void 0,
      s = void 0;
    switch (t) {
      case 0:
        e = BLANK_QTE_ANIM;
        break;
      case 1:
        (e = GOODAREA_QTE_ANIM), (s = COMMON_LIGHT);
        break;
      case 2:
      case 3:
        (e = BONUSAREA_QTE_ANIM), (s = PERFECT_LIGHT);
    }
    this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
      e && this.LevelSequencePlayer.PlayLevelSequenceByName(e),
      s && this.LevelSequencePlayer.PlayLevelSequenceByName(s);
  }
  OnArrowEnter() {
    (this.Gfl = !0),
      this.Yrn?.SetUIActive(!0),
      this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
      this.LDl
        ? this.LevelSequencePlayer.PlayLevelSequenceByName(SWITCH_IN_CURRENT)
        : (this.LevelSequencePlayer.PlayLevelSequenceByName(CURRENT_RING_SHOW),
          (this.LDl = !0));
  }
  OnArrowExit() {
    (this.Gfl = !1),
      this.Yrn?.SetUIActive(!1),
      this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
      this.LDl
        ? this.LevelSequencePlayer.PlayLevelSequenceByName(SWITCH_OUT_CURRENT)
        : (this.LevelSequencePlayer.PlayLevelSequenceByName(
            NOT_CURRENT_RING_SHOW,
          ),
          (this.LDl = !0));
  }
  OnArrowStayAreaUpdate(t) {
    if (this.Gfl) {
      var i = this.Ebl.GetValidAreas();
      if (i)
        if (t < 0 || t >= i?.length)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              18,
              "[BigStuffedDoll]初始化Arrow时：相对有效区域索引越界",
              ["relativeValidAreaIndex", t],
            );
        else {
          i = i[t];
          switch (
            ((this.XZh =
              -Math.max(i.StartCellIndex - 1, 0) *
              BigStuffedDefine_1.SINGLECELL_ANGLE),
            (this.YZh = -i.EndCellIndex * BigStuffedDefine_1.SINGLECELL_ANGLE),
            this.YZh >= this.XZh && (this.YZh -= 360),
            i.ArrowDirection)
          ) {
            case 0:
              this.cce.Yaw = this.XZh;
              break;
            case 1:
              this.cce.Yaw = this.YZh;
          }
          this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator());
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            18,
            "[BigStuffedDoll]初始化Arrow时：找不到有效区域",
            ["id", this.Id],
          );
    }
  }
  OnTick(e) {
    var s = ModelManager_1.ModelManager.BigStuffedDollModel;
    if (this.Gfl && this.Pfl && 2 === s.GetGameStage()) {
      var h = s.GetArrowSpeed(this.Pfl);
      if (h) {
        let t = -1;
        switch (s.CurrentArrowDirection) {
          case 0:
            t = -1;
            break;
          case 1:
            t = 1;
        }
        e = e / 1e3;
        let i = this.cce.Yaw;
        this.Nfl
          ? (i = this.cce.Yaw + t * (h * e))
          : ((i = this.cce.Yaw + t * (h * e)) < this.YZh &&
              ((i = this.YZh), s.ArrowDirectionReverse()),
            i > this.XZh && ((i = this.XZh), s.ArrowDirectionReverse())),
          (this.cce.Yaw = i),
          this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator());
      }
    }
  }
  SpawnContinuousArea(t) {
    this.bfl.SpawnSingleContinuousArea(t);
  }
  GetCurrentArrowStayCellIndex() {
    var t;
    return this.Gfl
      ? ((t = Math.abs(this.cce.Yaw) % 360),
        Math.floor(t / BigStuffedDefine_1.SINGLECELL_ANGLE) + 1)
      : 0;
  }
}
exports.BigStuffedRingItem = BigStuffedRingItem;
//# sourceMappingURL=BigStuffedRingItem.js.map
