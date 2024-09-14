"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCorniceMeetingTabItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController"),
  ROME_ICON_PATH =
    "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
class ActivityCorniceMeetingTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.LevelPlayId = 0),
      (this.qFe = !1),
      (this.jbe = (t) => {
        1 === t &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickActivityCorniceMeetingTab,
            this.LevelPlayId,
          );
      });
  }
  Refresh(t, e, i) {
    (this.LevelPlayId = t),
      (this.GridIndex = i),
      this.Og(),
      e &&
        this.ScrollViewDelegate?.SelectGridProxy(
          this.GridIndex,
          this.DisplayIndex,
          !1,
        ),
      this.TryBindRedDot();
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
  OnStart() {
    this.GetExtendToggle(0).SetToggleState(0, !1);
  }
  TryBindRedDot() {
    this.qFe ||
      ((this.qFe = !0),
      RedDotController_1.RedDotController.BindRedDot(
        "ActivityCorniceMeeting",
        this.GetItem(10),
        (t) => {
          this.GetItem(10).SetUIActive(t);
        },
        this.LevelPlayId,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "ActivityCorniceMeeting",
        this.GetItem(6),
        (t) => {
          this.GetItem(6).SetUIActive(t);
        },
        this.LevelPlayId,
      ));
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "ActivityCorniceMeeting",
      this.GetItem(10),
      this.LevelPlayId,
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "ActivityCorniceMeeting",
        this.GetItem(6),
        this.LevelPlayId,
      ),
      this.GetSprite(7).SetSprite(void 0);
  }
  Og() {
    var t =
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(
        this.LevelPlayId,
      );
    this.SetTextureByPath(t.GetBackgroundPath(), this.GetTexture(11)),
      this.mGe(),
      this.GFe(),
      this.NFe();
  }
  mGe() {
    var t =
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(
        this.LevelPlayId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.GetTitle());
  }
  GFe() {
    var t =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(
          this.LevelPlayId,
        ),
      t =
        (this.GetSprite(3).SetUIActive(t.IsRewardAllFinished()),
        this.GetSprite(8).SetUIActive(t.IsRewardAllFinished()),
        this.GetSprite(2).SetUIActive(!1),
        (this.GridIndex + 1).toString());
    this.SetSpriteByPath(
      StringUtils_1.StringUtils.Format(ROME_ICON_PATH, t, t),
      this.GetSprite(7),
      !1,
    );
  }
  NFe() {
    var t =
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    this.GetItem(9).SetUIActive(!t.GetIsShow(this.LevelPlayId)),
      this.GetItem(5).SetUIActive(!t.GetIsShow(this.LevelPlayId)),
      this.GetItem(4).SetUIActive(!t.GetIsShow(this.LevelPlayId));
  }
  Clear() {}
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
    var t =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData(),
      e =
        ((t.CurrentSelectLevelPlayId = this.LevelPlayId),
        t.GetLevelEntryData(this.LevelPlayId));
    t.GetIsShow(this.LevelPlayId) &&
      (e.GetChallengeNewLocalRedDot() && e.SetChallengeLocalRedDot(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCorniceMeetingRedDot,
        this.LevelPlayId,
      ));
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, e) {
    return this.LevelPlayId;
  }
}
exports.ActivityCorniceMeetingTabItem = ActivityCorniceMeetingTabItem;
//# sourceMappingURL=ActivityCorniceMeetingTabItem.js.map
