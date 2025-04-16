"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQuestItemChildItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../../FishingDefine");
class FishingQuestItemChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnClickTaskCallBack = void 0),
      (this.Wc_ = 0),
      (this.FA_ = []),
      (this.su_ = (i) => {
        i && this.RefreshItem();
      }),
      (this.kqe = () => {
        this.OnClickTaskCallBack?.(this.Wc_, this.GetExtendToggle(4), this.MO_);
        var i =
          ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
            this.Wc_,
          ) ?? 0;
        this.GetText(3).SetColor(
          UE.Color.FromHex(FishingDefine_1.fishingSelectStateColorText[i]),
        );
      }),
      (this.MO_ = () => {
        var i =
          ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
            this.Wc_,
          ) ?? 0;
        this.GetText(3).SetColor(
          UE.Color.FromHex(FishingDefine_1.fishingStateColorText[i]),
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIExtendToggle],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UISprite],
      [9, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIText],
      [16, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.kqe]]);
  }
  OnStart() {
    this.OnAddEventListener(),
      this.GetSprite(11).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(10).SetUIActive(!1),
      this.GetItem(13).SetUIActive(!1),
      this.GetExtendToggle(4).SetToggleState(0);
  }
  OnBeforeDestroy() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingRefreshQuestView,
      this.su_,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingRefreshQuestView,
      this.su_,
    );
  }
  Refresh(i, t, e) {
    (this.Wc_ = i), this.RefreshItem();
  }
  RefreshItem() {
    if (-1 === this.Wc_) this.mH_();
    else {
      var e,
        s,
        h = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
          this.Wc_,
        );
      if (
        (this.GetText(15).SetUIActive(!1),
        this.GetText(2).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h.Name),
        this.GetItem(0).SetUIActive(
          this.Wc_ ===
            ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust,
        ),
        this.GetItem(5).SetColor(
          UE.Color.FromHex(
            FishingDefine_1.fishingQuestPoolColorText[h.EntrustPool],
          ),
        ),
        0 === h.EntrustType || 1 === h.EntrustType)
      ) {
        let i = 0,
          t = 0;
        for ([e, s] of h.EntrustTarget) {
          var n =
            ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(e);
          (i += s), (t += Math.min(n, s));
        }
        this.GetText(9).SetText(t + "/" + i);
      } else 2 === h.EntrustType && this.GetText(9).SetUIActive(!1);
      this.GetItem(16).SetUIActive(h.IsNight), this.Puc();
    }
  }
  Puc() {
    if (-1 !== this.Wc_) {
      var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
          this.Wc_,
        ),
        t = i.EntrustPool === FishingDefine_1.FISHING_HIGHT_VALUE_ENTRUST_POOL,
        e = ModelManager_1.ModelManager.FishingQuestModel.GetEntrustsLockState(
          this.Wc_,
        );
      if (t) {
        this.GetItem(1).SetUIActive(e),
          this.GetText(9).SetUIActive(!e),
          this.GetItem(6).SetUIActive(!1),
          this.GetText(3).SetUIActive(!1);
        for (const s of this.FA_) s.SetUIActive(!1);
      } else {
        this.GetText(3).SetUIActive(!0);
        i = i.Star;
        this.NA_(i), this.RefreshStateText();
      }
      this.u3e(t),
        this.GetItem(1).SetUIActive(e),
        this.GetText(9).SetUIActive(!e);
    }
  }
  RefreshStateText() {
    var i =
      ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
        this.Wc_,
      ) ?? 0;
    this.GetText(3).SetUIActive(!0),
      1 !== this.GetExtendToggle(4).GetToggleState()
        ? this.GetText(3).SetColor(
            UE.Color.FromHex(FishingDefine_1.fishingStateColorText[i]),
          )
        : this.GetText(3).SetColor(
            UE.Color.FromHex(FishingDefine_1.fishingSelectStateColorText[i]),
          ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        FishingDefine_1.fishingStateText[i],
      ),
      this.GetItem(6).SetUIActive(2 === i);
  }
  mH_() {
    this.GetText(15).SetUIActive(!0),
      this.GetText(2).SetUIActive(!1),
      this.GetItem(0).SetUIActive(!1),
      this.GetText(3).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetText(9).SetUIActive(!1),
      this.GetText(14).SetUIActive(!1),
      this.GetItem(16).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(5).SetColor(
        UE.Color.FromHex(FishingDefine_1.fishingQuestPoolColorText[4]),
      );
    for (const i of this.FA_) i.SetUIActive(!1);
  }
  NA_(t) {
    for (const i of this.FA_) i.SetUIActive(!1);
    for (let i = 0; i < t; i++) {
      var e = this.GetItem(8);
      i + 1 > this.FA_.length
        ? ((e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(13), e)).SetUIActive(
            !0,
          ),
          this.FA_.push(e))
        : this.FA_[i].SetUIActive(!0);
    }
  }
  SelectToggle() {
    this.GetExtendToggle(4).SetToggleStateForce(1, !1, !0),
      this.OnClickTaskCallBack?.(this.Wc_, this.GetExtendToggle(4), this.MO_);
    var i =
      ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
        this.Wc_,
      ) ?? 0;
    this.GetText(3).SetColor(
      UE.Color.FromHex(FishingDefine_1.fishingSelectStateColorText[i]),
    );
  }
  u3e(i) {
    var t;
    i
      ? (this.GetText(14).SetUIActive(!0),
        (i = TimeUtil_1.TimeUtil.GetNextDayTimeStamp()),
        (t = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
        (i = Math.ceil(
          ((i - t) * TimeUtil_1.TimeUtil.Millisecond) /
            TimeUtil_1.TimeUtil.Hour,
        )) <= 1
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(14),
              "FishingEntrustRefreshRemainTimeInOneHour",
              i,
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(14),
              "FishingEntrustRefreshRemainTime",
              i,
            ))
      : this.GetText(14).SetUIActive(!1);
  }
}
exports.FishingQuestItemChildItem = FishingQuestItemChildItem;
//# sourceMappingURL=FishingQuestItemChildItem.js.map
