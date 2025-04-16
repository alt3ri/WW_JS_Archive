"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushBuffSelectInGameView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  RoguelikeDefine_1 = require("../../../Roguelike/Define/RoguelikeDefine"),
  BossRushBuffSelectInGameItem_1 = require("./BossRushBuffSelectInGameItem"),
  BossRushController_1 = require("./BossRushController");
class BossRushBuffSelectInGameView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Yal = []),
      (this.tyn = void 0),
      (this.Xva = void 0),
      (this.sOt = () => {
        var e;
        this.tyn &&
          ((e = this.Yal.indexOf(this.tyn)),
          BossRushController_1.BossRushController.RequestBossRushChooseBuffInGame(
            e,
          ),
          this.CloseMeAsync());
      }),
      (this.zal = (e) => {
        this.tyn?.SetToggleUnCheck(), (this.tyn = e), this.M3e();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.sOt]]);
  }
  async OnBeforeStartAsync() {
    await BossRushController_1.BossRushController.RefreshBossRushBuffInGame();
    var s = [],
      t =
        ModelManager_1.ModelManager.BossRushModel.ChoseBuffInGameHandleList
          .length;
    for (let e = 0; e < t; e++) {
      var i = new BossRushBuffSelectInGameItem_1.BossRushBuffSelectInGameItem();
      i.SetClickCallBack(this.zal),
        this.Yal.push(i),
        s.push(
          i.CreateThenShowByResourceIdAsync(
            RoguelikeDefine_1.COMMON_SELECT_ITEM,
            this.GetItem(0),
          ),
        );
    }
    (this.Xva = this.GetItem(0)
      .GetOwner()
      .GetComponentByClass(UE.UIInturnAnimController.StaticClass())),
      await Promise.all(s);
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(!1);
    var s = ModelManager_1.ModelManager.BossRushModel.ChoseBuffInGameHandleList,
      t =
        ModelManager_1.ModelManager.BossRushModel.ChoseBuffInGameHandleList
          .length;
    for (let e = 0; e < t; e++) {
      var i = s[e];
      this.Yal[e].RefreshItem(i);
    }
    this.Xva?.Play(), this.M3e();
  }
  M3e() {
    this.GetButton(1).SetSelfInteractive(void 0 !== this.tyn);
  }
}
exports.BossRushBuffSelectInGameView = BossRushBuffSelectInGameView;
//# sourceMappingURL=BossRushBuffSelectInGameView.js.map
