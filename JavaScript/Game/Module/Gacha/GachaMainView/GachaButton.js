"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaButton = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const CommonExchangeData_1 = require("../../ItemExchange/View/CommonExchangeData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaController_1 = require("../GachaController");
const GachaDefine_1 = require("../GachaDefine");
const CLICKCD = 1e3;
class GachaButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.oHt = void 0),
      (this.Times = 0),
      (this.rHt = 0),
      (this.nHt = 0),
      (this.sHt = () => {
        let e = this.oHt.GachaInfo;
        if (e)
          if (e.UsePoolId === 0)
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "GachaNoOption",
            );
          else {
            if (this.nHt !== 0)
              if (Time_1.Time.Now - this.nHt <= CLICKCD) return;
            this.nHt = Time_1.Time.Now;
            const r = ModelManager_1.ModelManager.GachaModel.CheckCountIsEnough(
              e,
              this.Times,
            );
            if (r[0]) {
              var i =
                ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
                  e.ItemId,
                );
              if (e.Id === 5 && i === 0)
                ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  195,
                )).IsEscViewTriggerCallBack = !1),
                  o.FunctionMap.set(2, () => {
                    UiManager_1.UiManager.OpenView("MailBoxView");
                  }),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    o,
                  );
              else {
                var o = this.rHt - i;
                if (o <= 0)
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
                      o,
                      0,
                      !0,
                    );
                  if (n) {
                    const a = new CommonExchangeData_1.CommonExchangeData();
                    a.InitByItemId(e.ItemId),
                      ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()
                        ? ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                            166,
                          )).SetTextArgs(a.GetDestName()),
                          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                            i,
                          ))
                        : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                            61,
                          )).SetTextArgs(
                            o.toString(),
                            a.GetDestName(),
                            n.ConsumeCount.toString(),
                            a.GetSrcName(),
                          ),
                          e.FunctionMap.set(2, () => {
                            this.aHt(a, n.ExChangeTime, n.ConsumeCount);
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
              (i = r[1]),
                (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(i)),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  o,
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
      (this.BtnBindInfo = [[0, this.sHt]]);
  }
  aHt(o, n, e) {
    const r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      o.GetSrcItemId(),
    );
    if (e <= r)
      ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(
        o.GetDestItemId(),
        n,
        !1,
        (e, r) => {
          const i =
            ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
              o.GetDestItemId(),
            );
          n <= i &&
            GachaController_1.GachaController.GachaRequest(
              this.oHt.GachaInfo.Id,
              this.Times,
            );
        },
      );
    else {
      const i = ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(
        o.GetSrcItemId(),
        e - r,
        0,
        !0,
      );
      if (i) {
        const a = new CommonExchangeData_1.CommonExchangeData();
        a.InitByItemId(o.GetSrcItemId());
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(62);
        e.SetTextArgs(a.GetDestName(), a.GetSrcName(), a.GetDestName()),
          e.FunctionMap.set(2, () => {
            this.hHt(a, i.ExChangeTime, i.ConsumeCount);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }
    }
  }
  hHt(e, r, i) {
    i <=
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
    (this.oHt = e), (this.rHt = r);
    var r = e.GachaInfo;
    for (const i of r.GachaConsumes)
      if (i.fRs === this.Times) {
        this.rHt = i.vRs;
        break;
      }
    ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r.ItemId) &&
      (this.SetItemIcon(this.GetTexture(1), r.ItemId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "Text_GachaExChangeCountDescribe_Text",
        this.rHt,
      ),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(3),
        GachaDefine_1.GACHA_TEXT,
        this.Times.toString(),
      ),
      (r = e.PoolInfo.Id),
      (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(r)) === 1
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
// # sourceMappingURL=GachaButton.js.map
