"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunCycleItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ROME_ICON_PATH =
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
class ActivityRunCycleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.BFe = 0),
      (this.bFe = void 0),
      (this.qFe = !1),
      (this.jbe = (t) => {
        1 === t &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickActivityRunChallenge,
            this,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.jbe]]);
  }
  TryBindRedDot() {
    this.qFe ||
      ((this.qFe = !0),
      RedDotController_1.RedDotController.BindRedDot(
        "ActivityRun",
        this.GetItem(10),
        void 0,
        this.BFe,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "ActivityRun",
        this.GetItem(6),
        void 0,
        this.BFe,
      ));
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleState(0, !1);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "ActivityRun",
      this.GetItem(10),
      this.BFe,
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "ActivityRun",
        this.GetItem(6),
        this.BFe,
      ),
      this.GetSprite(7).SetSprite(void 0);
  }
  Og() {
    (this.bFe = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
      this.BFe,
    )),
      this.SetTextureByPath(
        this.bFe.GetBackgroundTexturePath(),
        this.GetTexture(11),
      ),
      this.mGe(),
      this.GFe(),
      this.NFe();
  }
  mGe() {
    this.GetText(1).SetText(this.bFe.GetTitle());
  }
  GFe() {
    this.GetSprite(3).SetUIActive(this.bFe.GetIfRewardAllFinished()),
      this.GetSprite(8).SetUIActive(this.bFe.GetIfRewardAllFinished()),
      this.GetSprite(2).SetUIActive(!1);
    var t = (this.GridIndex + 1).toString();
    this.SetSpriteByPath(
      StringUtils_1.StringUtils.Format(ROME_ICON_PATH, t, t),
      this.GetSprite(7),
      !1,
    );
  }
  NFe() {
    this.GetItem(9).SetUIActive(!this.bFe.GetIsShow()),
      this.GetItem(5).SetUIActive(!this.bFe.GetIsShow()),
      this.GetItem(4).SetUIActive(!this.bFe.GetIsShow());
  }
  Refresh(t, e, i) {
    (this.BFe = t), this.TryBindRedDot(), this.Og();
  }
  Clear() {}
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t),
      (ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId =
        this.BFe);
    t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      this.bFe.GetActivityId(),
    );
    t &&
      (t.SetActivityContentIndex(this.GridIndex),
      this.bFe.GetIsShow() &&
        this.bFe.GetChallengeNewLocalRedPoint() &&
        this.bFe.SetChallengeLocalRedPointState(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectActivityRunChallengeItem,
      ));
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, e) {
    return this.GridIndex;
  }
}
exports.ActivityRunCycleItem = ActivityRunCycleItem;
//# sourceMappingURL=ActivityRunCycleItem.js.map
