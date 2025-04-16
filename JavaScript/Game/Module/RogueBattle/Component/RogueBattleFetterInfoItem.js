"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleFetterInfoItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ANIM_TIME = 200;
class RogueBattleFetterInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ky1 = void 0),
      (this.Pe = void 0),
      (this.KR1 = 0),
      (this.jYe = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView(
          this.Pe?.Id,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[9, this.jYe]]);
  }
  Refresh(t, e, i) {
    var r,
      s = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(
        t.Id,
      );
    (this.Pe = t),
      s &&
        ((r = t.AddStar + s.Psc >= s.Pd1 && 0 !== s.Pd1),
        this.GetItem(8).SetUIActive(r),
        this.GetItem(10).SetUIActive(r),
        this.GetText(1).SetText("" + (s.F6n + 1)),
        0 === s.Pd1
          ? (this.GetSprite(4).SetFillAmount(1),
            this.GetSprite(5).SetFillAmount(1),
            (this.KR1 = 1),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(2),
              "RogueBattleFetterUpItem_ExpMaxLevel",
            ),
            this.GetText(3)?.SetUIActive(!1))
          : (this.GetSprite(4).SetFillAmount(s.Psc / s.Pd1),
            this.GetSprite(5).SetFillAmount(s.Psc / s.Pd1),
            (this.KR1 = (s.Psc + t.AddStar) / s.Pd1),
            this.GetText(3)?.SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(2),
              "RogueBattle_FetterInfo_Exp",
              (s.Psc + t.AddStar).toString(),
              s.Pd1.toString(),
            ),
            this.PlayExpChangeAnim()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "RogueRes_FightFormation_RoleLevel",
          s.F6n,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "RogueBattle_FetterInfo_Exp_AddLevel",
          t.AddStar.toString(),
        ),
        (r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
          t.Id,
        ))) &&
        this.SetTextureShowUntilLoaded(r.Icon, this.GetTexture(7));
  }
  OnBeforeHide() {
    this.Oy1();
  }
  PlayExpChangeAnim() {
    this.Oy1();
    var t = this.GetSprite(5).GetFillAmount();
    const i = Math.abs(this.KR1 - t) / ANIM_TIME;
    this.ky1 = TimerSystem_1.TimerSystem.Forever((t) => {
      var e = this.GetSprite(5).GetFillAmount();
      Math.abs(e - this.KR1) < 0.01
        ? this.Oy1()
        : ((e += i * t), this.GetSprite(5).SetFillAmount(e));
    }, TimerSystem_1.MIN_TIME);
  }
  Oy1() {
    this.ky1 &&
      (TimerSystem_1.TimerSystem.Remove(this.ky1), (this.ky1 = void 0));
  }
}
exports.RogueBattleFetterInfoItem = RogueBattleFetterInfoItem;
//# sourceMappingURL=RogueBattleFetterInfoItem.js.map
