"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillSecondCdItem = void 0);
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SkillCdController_1 = require("../../Battle/SkillCdController");
const AMOUNT_START = 0.3;
const AMOUNT_SCALE = 0.4;
class BattleSkillSecondCdItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Xy = 0),
      (this.sit = void 0),
      (this.zet = void 0),
      (this.Zet = 0),
      (this.ett = 0);
  }
  SetIndex(i) {
    this.Xy = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    (this.zet = this.GetSprite(0)),
      this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, 90 * this.Xy, 0));
  }
  RefreshSkillCoolDown(i) {
    (this.sit = i),
      this.sit
        ? (this.xtt() && this.wtt()) ||
          (this.Btt() && this.btt()) ||
          (this.sit.IsMultiStageSkill() && this.ait()) ||
          this.qtt()
        : this.hit();
  }
  Tick(i) {
    this.Ptt(i);
  }
  Ott(i, t) {
    i <= (this.Zet = 0)
      ? this.hit()
      : ((this.Zet = i), (this.ett = t), this.IsShowOrShowing || this.Show());
  }
  hit() {
    this.IsShowOrShowing && this.Hide(), (this.Zet = 0);
  }
  Ptt(i) {
    this.Zet <= 0 ||
      this.ett <= 0 ||
      !this.zet ||
      SkillCdController_1.SkillCdController.IsPause() ||
      Time_1.Time.TimeDilation <= 0 ||
      ((this.Zet -=
        i * Time_1.Time.TimeDilation * TimeUtil_1.TimeUtil.Millisecond),
      this.Zet < 0
        ? ((this.Zet = 0), this.zet.SetFillAmount(0), this.hit())
        : ((i = this.Zet / this.ett),
          (i = AMOUNT_START + i * AMOUNT_SCALE),
          this.zet.SetFillAmount(i)));
  }
  xtt() {
    return this.sit?.GetButtonType() === 7 && this.sit.IsSkillInItemUseBuffCd();
  }
  wtt() {
    const [i, t] = this.sit.GetEquippedItemUsingBuffCd();
    return i > 0 && (this.Ott(i, t), !0);
  }
  Btt() {
    return (
      this.sit?.GetButtonType() === 7 && this.sit.IsSkillInItemUseSkillCd()
    );
  }
  btt() {
    const [i, t] = this.sit.GetEquippedItemUsingSkillCd();
    return i > 0 && (this.Ott(i, t), !0);
  }
  ait() {
    let i;
    let t = this.sit.GetMultiSkillInfo();
    return !(
      !t ||
      t.NextSkillId === 0 ||
      ((i = t.RemainingStartTime),
      (t = t.StartTime),
      i > 0 ? this.Ott(i, t) : this.hit(),
      0)
    );
  }
  qtt() {
    let i;
    let t = this.sit.GetGroupSkillCdInfo();
    t && ((i = t.CurRemainingCd), (t = t.CurMaxCd), this.Ott(i, t));
  }
}
exports.BattleSkillSecondCdItem = BattleSkillSecondCdItem;
// # sourceMappingURL=BattleSkillSecondCdItem.js.map
