"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleFetterUpItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ANIM_TIME = 200;
class RogueBattleFetterUpItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.TDe = void 0),
      (this.SPe = void 0),
      (this.Pe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIText],
    ];
  }
  Refresh(e, t, i) {
    this.Pe = e;
    var s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
      e.OldRoleBondInfo.v9n,
    );
    s &&
      (this.SetTextureShowUntilLoaded(s.Icon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "RogueRes_FightFormation_RoleLevel",
        e.OldRoleBondInfo.F6n + 1,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(10),
        "RogueRes_FightFormation_RoleLevel",
        e.OldRoleBondInfo.F6n,
      ),
      this.GetText(8).SetText("+" + e.AddStar),
      0 === e.OldRoleBondInfo.Pd1
        ? (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "RogueBattleFetterUpItem_ExpMaxLevel",
          ),
          this.GetSprite(5).SetFillAmount(1),
          this.GetText(2)?.SetUIActive(!1),
          this.GetItem(9)?.SetUIActive(!1),
          this.GetText(8)?.SetUIActive(!1))
        : (this.GetText(4).SetText(
            e.OldRoleBondInfo.Psc + e.AddStar + "/" + e.OldRoleBondInfo.Pd1,
          ),
          this.GetSprite(5).SetFillAmount(
            e.OldRoleBondInfo.Psc / e.OldRoleBondInfo.Pd1,
          ),
          this.GetSprite(6).SetFillAmount(
            (e.OldRoleBondInfo.Psc + e.AddStar) / e.OldRoleBondInfo.Pd1,
          ),
          (s = e.OldRoleBondInfo.Psc + e.AddStar >= e.OldRoleBondInfo.Pd1),
          this.GetItem(9)?.SetUIActive(s),
          this.GetText(2)?.SetUIActive(s),
          this.GetText(8)?.SetUIActive(!0)),
      this.GetItem(3).SetAlpha(0),
      (s = this.GetSprite(5).GetWidth()),
      this.GetItem(7).SetAnchorOffsetX(
        s * (e.OldRoleBondInfo.Psc / e.OldRoleBondInfo.Pd1) - 0.5 * s,
      ));
  }
  async OnBeforeStartAsync() {
    return (
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      super.OnBeforeStartAsync()
    );
  }
  OnBeforeHide() {
    this.RemoveTimer();
  }
  PlayExpAnimation() {
    if (0 !== this.Pe?.OldRoleBondInfo.Pd1) {
      this.RemoveTimer();
      var e = this.GetSprite(5).GetFillAmount();
      const i = this.GetSprite(6).GetFillAmount(),
        s = (i - e) / ANIM_TIME,
        r = this.GetSprite(5).GetWidth();
      this.TDe = TimerSystem_1.TimerSystem.Forever((e) => {
        var t = this.GetSprite(5).GetFillAmount();
        t >= i
          ? (this.RemoveTimer(),
            1 <= i && this.SPe?.PlayLevelSequenceByName("LevelUp"))
          : (this.GetSprite(5).SetFillAmount(t + s * e),
            this.GetItem(7).SetAnchorOffsetX(
              r * Math.min(1, t + s * e) - 0.5 * r,
            ));
      }, TimerSystem_1.MIN_TIME);
    }
  }
  RemoveTimer() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.RogueBattleFetterUpItem = RogueBattleFetterUpItem;
//# sourceMappingURL=RogueBattleFetterUpItem.js.map
