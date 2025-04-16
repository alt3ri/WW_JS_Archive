"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewMapTravel = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewMapTravel extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.GeneralActivityInfo = void 0),
      (this.ExpComponent = void 0),
      (this.eje = () => {
        UiManager_1.UiManager.OpenView(
          "MapTravelMainView",
          this.ActivityBaseData,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [],
      e =
        ((this.GeneralActivityInfo =
          new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
        this.GeneralActivityInfo.SetData(this.ActivityBaseData),
        this.GeneralActivityInfo.SetClickFunc(this.eje),
        e.push(
          this.GeneralActivityInfo.CreateThenShowByActorAsync(
            this.GetItem(0).GetOwner(),
          ),
        ),
        (this.ExpComponent = new MapTravelExpComponent()),
        e.push(
          this.ExpComponent.CreateThenShowByActorAsync(
            this.GetItem(1).GetOwner(),
          ),
        ),
        await Promise.all(e),
        this.GeneralActivityInfo.SetBtnText("MapTravelEnterName_Text"),
        ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
      e = 0 === e;
    this.GetItem(2).SetUIActive(!e), this.GetItem(3).SetUIActive(e);
  }
  OnRefreshView() {
    this._Vl(), this.ZGe();
  }
  _Vl() {
    this.ExpComponent.SetProgress(
      this.ActivityBaseData.GetCurrentExp(),
      this.ActivityBaseData.GetCurrentTargetExp(),
      this.ActivityBaseData.TravelLevel ===
        this.ActivityBaseData.MaxTravelLevel,
    ),
      this.ExpComponent.SetLevel(this.ActivityBaseData.TravelLevel);
  }
  ZGe() {
    this.GeneralActivityInfo.SetFunctionRedDotVisible(
      this.ActivityBaseData.RedPointShowState,
    );
  }
}
exports.ActivitySubViewMapTravel = ActivitySubViewMapTravel;
class MapTravelExpComponent extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIText],
    ];
  }
  SetProgress(e, i, t) {
    t
      ? (this.GetSprite(1).SetFillAmount(1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          "MapTravelLevelMax_Text",
        ))
      : (this.GetSprite(1).SetFillAmount(
          MathUtils_1.MathUtils.Clamp(e / i, 0, 1),
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          "MapTravelExp_Text",
          e,
          i,
        ));
  }
  SetLevel(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "MapTravelLv_Text", e);
  }
}
//# sourceMappingURL=ActivitySubViewMapTravel.js.map
