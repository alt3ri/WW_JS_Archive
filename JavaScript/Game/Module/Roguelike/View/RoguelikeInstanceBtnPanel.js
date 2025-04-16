"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeInstanceBtnPanel = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeInstanceBtnPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.jho = () => {
        var e,
          t =
            ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
              ?.SeasonData;
        void 0 !== t &&
          ((t =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
              t.UHn,
            )),
          ((e = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [
            t.ShopId,
          ]),
          (e.PayShopId = t.ShopId),
          ModelManager_1.ModelManager.RoguelikeModel?.RecordRoguelikeShopRedDot(
            !0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoguelikeDataUpdate,
          ),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
            e,
          ));
      }),
      (this.Kho = () => {
        var e =
          ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
            ?.SeasonData;
        void 0 !== e &&
          RoguelikeController_1.RoguelikeController.OpenRoguelikeSkillView(
            e.UHn,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [0, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.jho],
        [0, this.Kho],
      ]);
  }
  async OnBeforeStartAsync() {
    var e;
    ModelManager_1.ModelManager.RoguelikeModel.CheckRogueIsOpen() &&
      void 0 !==
        (e =
          ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
            ?.SeasonData) &&
      (await RoguelikeController_1.RoguelikeController.RoguelikeTalentInfoRequest(
        e.UHn,
      ));
  }
  OnStart() {
    this.Refresh();
  }
  OnBeforeShow() {
    this.BindRedDot();
  }
  OnAfterHide() {
    this.UnBindRedDot();
  }
  BindRedDot() {
    RedDotController_1.RedDotController.BindRedDot(
      "RogueSkillUnlock",
      this.GetItem(5),
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "RoguelikeShop",
        this.GetItem(6),
      );
  }
  UnBindRedDot() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "RogueSkillUnlock",
      this.GetItem(5),
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "RoguelikeShop",
        this.GetItem(6),
      );
  }
  Refresh() {
    var e =
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
          ?.SeasonData,
      t =
        (e &&
          ((o =
            ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()
              ?.WeekTokenMaxCount ?? 1),
          (t = e.yqs / o),
          this.GetSprite(4)?.SetFillAmount(t),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            "Roguelike_ActivityMain_Score",
            e.yqs,
            o,
          )),
        MathUtils_1.MathUtils.LongToBigInt(
          ModelManager_1.ModelManager.RoguelikeModel?.TempCountdown ?? 0,
        )),
      e = Number(t) - TimeUtil_1.TimeUtil.GetServerTime(),
      o = TimeUtil_1.TimeUtil.CalculateRemainingTime(e);
    o &&
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), o.TextId, o.TimeValue);
  }
}
exports.RoguelikeInstanceBtnPanel = RoguelikeInstanceBtnPanel;
//# sourceMappingURL=RoguelikeInstanceBtnPanel.js.map
