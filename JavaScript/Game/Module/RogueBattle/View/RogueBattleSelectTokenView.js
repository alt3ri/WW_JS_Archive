"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleSelectTokenView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleElementPanel_1 = require("../Component/RogueBattleElementPanel"),
  RogueBattlePhantomInfo_1 = require("../Component/RogueBattlePhantomInfo"),
  RogueBattleTokenItem_1 = require("../Component/RogueBattleTokenItem"),
  RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleSelectTokenView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lV_ = void 0),
      (this.Otl = void 0),
      (this.mlo = void 0),
      (this.cm1 = void 0),
      (this.ilo = () => {
        var e = this.lV_.GetSelectedGridIndex();
        e < 0 ||
          ModelManager_1.ModelManager.MapRogueModel.GetOpData(
            this.OpenParam,
          ).Select(e);
      }),
      (this.vlo = () => {}),
      (this.tV_ = () => {
        var e = new RogueBattleTokenItem_1.RogueBattleTokenItem();
        return (e.OnClickHandle = this.SOc), e;
      }),
      (this.SOc = (e) => {
        void 0 === e
          ? (this.lV_?.DeselectCurrentGridProxy(),
            this.GetButton(5).SetSelfInteractive(!1),
            this.mlo?.UpdateElementLayout())
          : (this.GetButton(5).SetSelfInteractive(!0),
            this.lV_?.SelectGridProxy(e),
            (e =
              ModelManager_1.ModelManager.RogueBattleModel?.SelectGainData) &&
              e.wac &&
              this.mlo?.UpdateElementLayout(e.wac.iVc)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueBattleSelectOptionPreview,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UITexture],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [5, this.ilo],
        [6, this.vlo],
      ]);
  }
  async OnBeforeStartAsync() {
    this.lV_ = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(2),
      this.tV_,
    );
    var e = this.OpenParam,
      e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(e),
      e =
        ((e.CloseViewFunc = () => {
          this.CloseMe();
        }),
        e.Data.oac?.uac);
    e
      ? ((this.Otl = new RogueBattleTopPanel_1.RogueBattleTopPanel()),
        (this.mlo = new RogueBattleElementPanel_1.RogueBattleElementPanel()),
        (this.Otl.CloseCallback = () => {
          this.CloseMe();
        }),
        (this.cm1 = new RogueBattlePhantomInfo_1.RogueBattlePhantomInfo()),
        await Promise.all([
          this.Otl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
          this.lV_.RefreshByDataAsync(e.Dac),
          this.mlo.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
          this.cm1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        ]))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RogueBattle",
          34,
          "没有肉鸽界面数据!, RogueBattleSelectTokenView",
        );
  }
}
exports.RogueBattleSelectTokenView = RogueBattleSelectTokenView;
//# sourceMappingURL=RogueBattleSelectTokenView.js.map
