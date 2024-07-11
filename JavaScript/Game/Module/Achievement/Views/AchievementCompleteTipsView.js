"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementCompleteTipsView = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const AchievementCompleteTipsStarItem_1 = require("./AchievementCompleteTipsStarItem");
class AchievementCompleteTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Xbe = void 0),
      (this.$be = void 0),
      (this.Ybe = 4e3),
      (this.Jbe = () => {
        void 0 !== this.Xbe && this.CloseMe();
      }),
      (this.zbe = () =>
        new AchievementCompleteTipsStarItem_1.AchievementCompleteTipsStarItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    let e;
    const i = this.OpenParam;
    void 0 !== i &&
      ((this.$be = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.zbe,
      )),
      (e = i.GetGroupId()),
      (e =
        ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(
          e,
        )),
      StringUtils_1.StringUtils.IsEmpty(e.GetTexture()) ||
        this.SetTextureByPath(e.GetTexture(), this.GetTexture(0)),
      this.GetText(1).SetText(i.GetTitle()),
      this.Zbe(i),
      (this.Xbe = TimerSystem_1.TimerSystem.Delay(this.Jbe, this.Ybe)));
  }
  Zbe(e) {
    const i = [];
    const t = e.GetMaxStar();
    const s = e.GetAchievementConfigStar();
    for (let e = 0; e < t; e++) {
      const r = s > e;
      i.push(r);
    }
    this.$be.RefreshByData(i);
  }
  OnBeforeDestroy() {
    this.Xbe = void 0;
  }
}
exports.AchievementCompleteTipsView = AchievementCompleteTipsView;
// # sourceMappingURL=AchievementCompleteTipsView.js.map
