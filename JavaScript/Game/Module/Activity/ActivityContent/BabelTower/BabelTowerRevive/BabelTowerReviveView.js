"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerReviveView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  BabelTowerBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerBuffById"),
  BabelTowerLevelById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerLevelById"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  DeadReviveController_1 = require("../../../../DeadRevive/DeadReviveController"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  BabelTowerBuffItem_1 = require("../BabelTowerBuffView/BabelTowerBuffItem"),
  BabelTowerController_1 = require("../BabelTowerController");
class BabelTowerReviveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.v9t = void 0),
      (this.p9t = void 0),
      (this.fDo = void 0),
      (this.p1l = () => {
        BabelTowerController_1.BabelTowerController.BabelTowerSettlementRequest(),
          this.CloseMe();
      }),
      (this.xco = () => {
        DeadReviveController_1.DeadReviveController.ReviveRequest(!1),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIArtText],
      [3, UE.UIArtText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Pe = this.OpenParam),
      this.Pe
        ? ((this.v9t = new ButtonItem_1.ButtonItem()),
          (this.p9t = new ButtonItem_1.ButtonItem()),
          (this.fDo = new BabelTowerBuffItem_1.BabelTowerBuffItem()),
          await Promise.all([
            this.v9t.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
            this.p9t.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()),
            this.fDo.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
          ]),
          this.v9t.SetFunction(this.p1l),
          this.p9t.SetFunction(this.xco),
          this.Refresh())
        : Log_1.Log.CheckError() && Log_1.Log.Error("UiCore", 43, "Data为空");
  }
  Refresh() {
    var e = this.Pe,
      i = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(e.LevelId),
      e = e.StarNum,
      t = i.ReviveStar,
      r = Math.max(0, e - t),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "Text_BabelTowerReviveStarsNeed_Text",
          t,
        ),
        i.PassStar),
      t = r < t,
      e =
        (this.GetItem(9).SetUIActive(t),
        this.GetArtText(2).SetText(e.toString()),
        this.GetArtText(3)),
      r =
        (e.SetText(r.toString()),
        e.SetChangeColor(!t, e.changeColor),
        i.ReviveBuffId),
      t =
        (this.fDo.Refresh(
          { Id: r, IsDeTerm: !1, CanClick: !1, ShowStar: !1 },
          !1,
          0,
        ),
        BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(r));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.NameText),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.DesText);
  }
}
exports.BabelTowerReviveView = BabelTowerReviveView;
//# sourceMappingURL=BabelTowerReviveView.js.map
