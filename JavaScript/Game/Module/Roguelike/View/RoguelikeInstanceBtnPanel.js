"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeInstanceBtnPanel = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeInstanceBtnPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Xao = () => {
        let e;
        let o = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
        void 0 !== o &&
          ((o =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
              o.F8n,
            )),
          ((e = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [
            o.ShopId,
          ]),
          (e.PayShopId = o.ShopId),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
            !0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoguelikeDataUpdate,
          ),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
            e,
          ));
      }),
      (this.$ao = () => {
        const e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
        void 0 !== e &&
          RoguelikeController_1.RoguelikeController.OpenRoguelikeSkillView(
            e.F8n,
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
        [1, this.Xao],
        [0, this.$ao],
      ]);
  }
  async OnBeforeStartAsync() {
    let e;
    ModelManager_1.ModelManager.RoguelikeModel.CheckRogueIsOpen() &&
      void 0 !==
        (e =
          await RoguelikeController_1.RoguelikeController.RoguelikeSeasonDataRequest()) &&
      (await RoguelikeController_1.RoguelikeController.RoguelikeTalentInfoRequest(
        e.F8n,
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
    var e = ModelManager_1.ModelManager.RoguelikeModel?.CurrSeasonData;
    var o =
      (e &&
        ((r =
          ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()
            ?.WeekTokenMaxCount ?? 1),
        (o = e.Jws / r),
        this.GetSprite(4)?.SetFillAmount(o),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "Roguelike_ActivityMain_Score",
          e.Jws,
          r,
        )),
      MathUtils_1.MathUtils.LongToBigInt(
        ModelManager_1.ModelManager.RoguelikeModel?.TempCountdown ?? 0,
      ));
    var e = Number(o) - TimeUtil_1.TimeUtil.GetServerTime();
    var r = TimeUtil_1.TimeUtil.CalculateRemainingTime(e);
    r &&
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), r.TextId, r.TimeValue);
  }
}
exports.RoguelikeInstanceBtnPanel = RoguelikeInstanceBtnPanel;
// # sourceMappingURL=RoguelikeInstanceBtnPanel.js.map
