"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillSecondCdItem = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  SkillCdController_1 = require("../../Battle/SkillCdController"),
  AMOUNT_START = 0.3,
  AMOUNT_SCALE = 0.4;
class BattleSkillSecondCdItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Xy = 0),
      (this.Mot = void 0),
      (this.uit = void 0),
      (this.cit = 0),
      (this.mit = 0);
  }
  SetIndex(i) {
    this.Xy = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    (this.uit = this.GetSprite(0)),
      this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, 90 * this.Xy, 0));
  }
  RefreshSkillCoolDown(i) {
    (this.Mot = i),
      this.Mot
        ? (this.Kit() && this.Qit()) ||
          (this.Xit() && this.$it()) ||
          (this.Mot.IsMultiStageSkill() && this.Eot()) ||
          this.Yit()
        : this.Sot();
  }
  Tick(i) {
    this.Wit(i);
  }
  Zit(i, t) {
    i <= (this.cit = 0)
      ? this.Sot()
      : ((this.cit = i), (this.mit = t), this.IsShowOrShowing || this.Show());
  }
  Sot() {
    this.IsShowOrShowing && this.Hide(), (this.cit = 0);
  }
  Wit(i) {
    this.cit <= 0 ||
      this.mit <= 0 ||
      !this.uit ||
      SkillCdController_1.SkillCdController.IsPause() ||
      Time_1.Time.TimeDilation <= 0 ||
      ((this.cit -=
        i * Time_1.Time.TimeDilation * TimeUtil_1.TimeUtil.Millisecond),
      this.cit < 0
        ? ((this.cit = 0), this.uit.SetFillAmount(0), this.Sot())
        : ((i = this.cit / this.mit),
          (i = AMOUNT_START + i * AMOUNT_SCALE),
          this.uit.SetFillAmount(i)));
  }
  Kit() {
    return 7 === this.Mot?.GetButtonType() && this.Mot.IsSkillInItemUseBuffCd();
  }
  Qit() {
    var [i, t] = this.Mot.GetEquippedItemUsingBuffCd();
    return 0 < i && (this.Zit(i, t), !0);
  }
  Xit() {
    return (
      7 === this.Mot?.GetButtonType() && this.Mot.IsSkillInItemUseSkillCd()
    );
  }
  $it() {
    var [i, t] = this.Mot.GetEquippedItemUsingSkillCd();
    return 0 < i && (this.Zit(i, t), !0);
  }
  Eot() {
    var i,
      t = this.Mot.GetMultiSkillInfo();
    return !(
      !t ||
      0 === t.NextSkillId ||
      ((i = t.RemainingStartTime),
      (t = t.StartTime),
      0 < i ? this.Zit(i, t) : this.Sot(),
      0)
    );
  }
  Yit() {
    var i,
      t = this.Mot.GetGroupSkillCdInfo();
    t && ((i = t.CurRemainingCd), (t = t.CurMaxCd), this.Zit(i, t));
  }
}
exports.BattleSkillSecondCdItem = BattleSkillSecondCdItem;
//# sourceMappingURL=BattleSkillSecondCdItem.js.map
