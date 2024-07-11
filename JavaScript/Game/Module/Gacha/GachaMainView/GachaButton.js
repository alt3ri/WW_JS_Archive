"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaButton = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  CommonExchangeData_1 = require("../../ItemExchange/View/CommonExchangeData"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GachaController_1 = require("../GachaController"),
  GachaDefine_1 = require("../GachaDefine"),
  CLICKCD = 1e3;
class GachaButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.ojt = void 0),
      (this.Times = 0),
      (this.rjt = 0),
      (this.njt = 0),
      (this.sjt = () => {
        var e = this.ojt.GachaInfo;
        if (e)
          if (0 === e.UsePoolId)
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "GachaNoOption",
            );
          else {
            if (0 !== this.njt)
              if (Time_1.Time.Now - this.njt <= CLICKCD) return;
            this.njt = Time_1.Time.Now;
            var r = ModelManager_1.ModelManager.GachaModel.CheckCountIsEnough(
              e,
              this.Times,
            );
            if (r[0]) {
              var o =
                ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
                  e.ItemId,
                );
              if (5 === e.Id && o <= 0)
                (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(195)),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    i,
                  );
              else {
                var i = this.rjt - o;
                if (i <= 0)
                  GachaController_1.GachaController.GachaRequest(
                    e.Id,
                    this.Times,
                  ),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Gacha", 35, "needTokenCount <= 0");
                else {
                  const n =
                    ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(
                      e.ItemId,
                      i,
                      0,
                      !0,
                    );
                  if (n) {
                    const a = new CommonExchangeData_1.CommonExchangeData();
                    a.InitByItemId(e.ItemId),
                      ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()
                        ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                            166,
                          )).SetTextArgs(a.GetDestName()),
                          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                            o,
                          ))
                        : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                            61,
                          )).SetTextArgs(
                            i.toString(),
                            a.GetDestName(),
                            n.ConsumeCount.toString(),
                            a.GetSrcName(),
                          ),
                          e.FunctionMap.set(2, () => {
                            this.ajt(a, n.ExChangeTime, n.ConsumeCount);
                          }),
                          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                            e,
                          ));
                  } else
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "Gacha",
                        35,
                        "exchangeSimulation is null",
                      );
                }
              }
            } else
              (o = r[1]),
                (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  i,
                );
          }
        else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Gacha", 35, "gachaInfo is null");
      }),
      (this.Times = e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.sjt]]);
  }
  ajt(i, n, e) {
    var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      i.GetSrcItemId(),
    );
    if (e <= r)
      ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(
        i.GetDestItemId(),
        n,
        !1,
        (e, r) => {
          var o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
            i.GetDestItemId(),
          );
          n <= o &&
            GachaController_1.GachaController.GachaRequest(
              this.ojt.GachaInfo.Id,
              this.Times,
            );
        },
      );
    else {
      const o = ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(
        i.GetSrcItemId(),
        e - r,
        0,
        !0,
      );
      if (o) {
        const a = new CommonExchangeData_1.CommonExchangeData();
        a.InitByItemId(i.GetSrcItemId());
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(62);
        e.SetTextArgs(a.GetDestName(), a.GetSrcName(), a.GetDestName()),
          e.FunctionMap.set(2, () => {
            this.hjt(a, o.ExChangeTime, o.ConsumeCount);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }
    }
  }
  hjt(e, r, o) {
    o <=
    ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      e.GetSrcItemId(),
    )
      ? ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(
          e.GetDestItemId(),
          r,
          !0,
        )
      : ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowFirstCurrencyConfirm();
  }
  Refresh(e, r) {
    (this.ojt = e), (this.rjt = r);
    var r = e.GachaInfo;
    for (const o of r.GachaConsumes)
      if (o.qUs === this.Times) {
        this.rjt = o.GUs;
        break;
      }
    ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r.ItemId) &&
      (this.SetItemIcon(this.GetTexture(1), r.ItemId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "Text_GachaExChangeCountDescribe_Text",
        this.rjt,
      ),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(3),
        GachaDefine_1.GACHA_TEXT,
        this.Times.toString(),
      ),
      (r = e.PoolInfo.Id),
      1 === (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(r))
        ? ((r =
            ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(
              e,
            )),
          this.GetItem(4).SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), r.TagText),
          (e = UE.Color.FromHex(r.TagColor)),
          this.GetSprite(6).SetColor(e))
        : this.GetItem(4).SetUIActive(!1));
  }
}
exports.GachaButton = GachaButton;
//# sourceMappingURL=GachaButton.js.map
