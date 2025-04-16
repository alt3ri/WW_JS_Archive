"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTokenSelectResultView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleTokenItem_1 = require("../Component/RogueBattleTokenItem"),
  RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleTokenSelectResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lV_ = void 0),
      (this.clo = void 0),
      (this.Xy = 0),
      (this.kI1 = 1),
      (this.hJt = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        );
        void 0 !== e &&
          (1 === (e = e.Data.nac.Ry1).h5n ||
          (this.Xy++, this.Xy >= e.Dac.length)
            ? (ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(
                this.OpenParam,
              ),
              this.CloseMe())
            : this.lV_.RefreshByData(e.Dac.slice(this.Xy, this.Xy + this.kI1)));
      }),
      (this.Bqe = () => {
        return new RogueBattleTokenItem_1.RogueBattleTokenItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.hJt]]);
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    void 0 !== e &&
      ((e = e.Data.nac.Ry1),
      (this.lV_ = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.Bqe,
      )),
      (this.clo = new RogueBattleTopPanel_1.RogueBattleTopPanel()),
      1 === e.h5n
        ? ((this.Xy = Number.MAX_VALUE),
          (this.kI1 = e.Dac.length),
          await this.lV_.RefreshByDataAsync(e.Dac))
        : ((this.Xy = 0),
          (this.kI1 = 1),
          await this.lV_.RefreshByDataAsync(e.Dac.slice(0, this.kI1))),
      await this.clo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
  }
}
exports.RogueBattleTokenSelectResultView = RogueBattleTokenSelectResultView;
//# sourceMappingURL=RogueBattleTokenSelectResultView.js.map
