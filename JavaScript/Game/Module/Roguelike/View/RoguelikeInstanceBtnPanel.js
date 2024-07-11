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
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeInstanceBtnPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.jho = () => {
        var e,
          o = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
        void 0 !== o &&
          ((o =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
              o.MHn,
            )),
          ((e = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [
            o.ShopId,
          ]),
          (e.PayShopId = o.ShopId),
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
        var e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
        void 0 !== e &&
          RoguelikeController_1.RoguelikeController.OpenRoguelikeSkillView(
            e.MHn,
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
          await RoguelikeController_1.RoguelikeController.RoguelikeSeasonDataRequest()) &&
      (await RoguelikeController_1.RoguelikeController.RoguelikeTalentInfoRequest(
        e.MHn,
      ));
  }
  OnStart() {
    this.Refresh();
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
    RedDotController_1.RedDotController.UnBindRedDot("RogueSkillUnlock"),
      RedDotController_1.RedDotController.UnBindRedDot("RoguelikeShop");
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoguelikeModel?.CurrSeasonData,
      o =
        (e &&
          ((r =
            ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()
              ?.WeekTokenMaxCount ?? 1),
          (o = e.gqs / r),
          this.GetSprite(4)?.SetFillAmount(o),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            "Roguelike_ActivityMain_Score",
            e.gqs,
            r,
          )),
        MathUtils_1.MathUtils.LongToBigInt(
          ModelManager_1.ModelManager.RoguelikeModel?.TempCountdown ?? 0,
        )),
      e = Number(o) - TimeUtil_1.TimeUtil.GetServerTime(),
      r = TimeUtil_1.TimeUtil.CalculateRemainingTime(e);
    r &&
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), r.TextId, r.TimeValue);
  }
}
exports.RoguelikeInstanceBtnPanel = RoguelikeInstanceBtnPanel;
//# sourceMappingURL=RoguelikeInstanceBtnPanel.js.map
