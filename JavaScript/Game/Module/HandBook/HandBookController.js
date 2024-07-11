"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookController = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const HandBookDefine_1 = require("./HandBookDefine");
class HandBookController extends UiControllerBase_1.UiControllerBase {
  static SetPhantomMeshShow(e, t) {}
  static SetWeaponMeshShow(e, t) {}
  static SetMonsterMeshShow(e, t) {}
  static SetAnimalMeshShow(e, t) {}
  static ClearEffect() {
    this.UZt &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.UZt,
        "[HandBookController.ClearEffect] StopEffect",
        !1,
      ),
      (this.UZt = 0));
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(1235, (e) => {
      const t = ModelManager_1.ModelManager.HandBookModel.GetClientHandBookType(
        e.Ikn,
        e.NRs.qRs,
      );
      HandBookController.CheckConfigIsLegal(t, e.NRs.Ekn) &&
        (ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(
          e.Ikn,
          e.NRs,
        ),
        e.FRs) &&
        this.AZt(e.Ikn, e.NRs);
    });
  }
  static AZt(e, t) {
    let a = "";
    e === Protocol_1.Aki.Protocol.Hks.Proto_Photograph &&
      ((e = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfig(
        t.Ekn,
      )),
      (a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "")),
      a.length;
  }
  static PZt(e) {
    const t = [];
    const a = [];
    const o = [];
    const r = [];
    const n = [];
    var i =
      (t.push(e.Texture),
      ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, e.Id));
    var i =
      (n.push(i.CreateTime),
      a.push(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Descrtption),
      ),
      o.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
      ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(
        e.Type,
      ));
    var e =
      (r.push(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.TypeDescription),
      ),
      new HandBookDefine_1.HandBookPhotoData());
    var i =
      ((e.DescrtptionText = a),
      (e.TypeText = r),
      (e.NameText = o),
      (e.HandBookType = 2),
      (e.Index = 0),
      (e.TextureList = t),
      (e.DateText = n),
      {
        ScreenShot: !1,
        IsPlayerInfoVisible: !1,
        IsHiddenBattleView: !1,
        HandBookPhotoData: e,
        GachaData: void 0,
      });
    UiManager_1.UiManager.OpenView("PhotoSaveView", i);
  }
  static SendIllustratedRedDotRequest() {
    const e = Protocol_1.Aki.Protocol.fes.create();
    Net_1.Net.Call(23335, e, (e) => {
      e &&
        ModelManager_1.ModelManager.HandBookModel.InitHandBookRedDotList(e.ORs);
    });
  }
  static async SendIllustratedInfoRequestAsync(e) {
    const t = Protocol_1.Aki.Protocol.pes.create();
    const a =
      ((t.B5n =
        ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e)),
      await Net_1.Net.CallAsync(8040, t));
    if (a) {
      ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
      const o = a.kRs.length;
      for (let e = 0; e < o; e++) {
        const r = a.kRs[e];
        ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(
          r.Ikn,
          r.GRs,
        );
      }
      await Promise.resolve();
    }
  }
  static SendIllustratedInfoRequest(e) {
    const t = Protocol_1.Aki.Protocol.pes.create();
    (t.B5n =
      ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e)),
      Net_1.Net.Call(8040, t, (t) => {
        if (t) {
          ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
          const a = t.kRs.length;
          for (let e = 0; e < a; e++) {
            const o = t.kRs[e];
            ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(
              o.Ikn,
              o.GRs,
            );
          }
        }
      });
  }
  static SendIllustratedReadRequest(t, e) {
    const a = Protocol_1.Aki.Protocol.Ies.create();
    (a.Ikn =
      ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(t)),
      (a.Ekn = e),
      Net_1.Net.Call(11349, a, (e) => {
        e &&
          (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                7305,
                e.Fms,
              )
            : ModelManager_1.ModelManager.HandBookModel.UpdateRedDot(t, a.Ekn));
      });
  }
  static SendIllustratedUnlockRequest(t, e) {
    const a = Protocol_1.Aki.Protocol.Ses.create();
    (a.Ikn =
      ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(t)),
      (a.Ekn = e),
      Net_1.Net.Call(17285, a, (e) => {
        e &&
          (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                14283,
                e.Fms,
              )
            : (ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(
                a.Ikn,
                e.NRs,
              ),
              this.AZt(a.Ikn, e.NRs),
              t === 2 &&
                ((e =
                  ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfig(
                    e.NRs.Ekn,
                  )),
                this.PZt(e))));
      });
  }
  static GetCollectProgress(e) {
    const t = [];
    let a = 0;
    let o = void 0;
    switch (e) {
      case 0:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(0)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList());
        break;
      case 1:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(1)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig());
        break;
      case 2:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(2)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig());
        break;
      case 3:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(3)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList());
        break;
      case 4:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(4)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList());
        break;
      case 5:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(5)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList());
        break;
      case 6:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(6)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig());
        break;
      case 7:
        (a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(7)),
          (o =
            ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig());
        break;
      default:
        return [0, 0];
    }
    return (t[0] = a), (t[1] = o.length), t;
  }
  static GetAllCollectProgress() {
    const e = [];
    const t = this.GetCollectProgress(0);
    const a = this.GetCollectProgress(1);
    const o = this.GetCollectProgress(2);
    const r = this.GetCollectProgress(3);
    const n = this.GetCollectProgress(4);
    const i = this.GetCollectProgress(5);
    const l = this.GetCollectProgress(6);
    const s = this.GetCollectProgress(7);
    return (
      (e[0] = t[0] + a[0] + o[0] + r[0] + n[0] + i[0] + l[0] + s[0]),
      (e[1] = t[1] + a[1] + o[1] + r[1] + n[1] + i[1] + l[1] + s[1]),
      e
    );
  }
  static CheckConfigIsLegal(e, t) {
    const a =
      ModelManager_1.ModelManager.HandBookModel.GetConfigListIdByType(e);
    const o = a.length;
    for (let e = 0; e < o; e++) if (a[e] === t) return !0;
    return !1;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlayerSenseTargetEnter,
      this.xZt,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlayerSenseTargetEnter,
      this.xZt,
    );
  }
  static wZt(e) {
    e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigByMeshId(
        e,
      );
    return (
      !!e && !ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(4, e.Id)
    );
  }
}
((exports.HandBookController = HandBookController).UZt = 0),
  (HandBookController.xZt = (e) => {
    var e = EntitySystem_1.EntitySystem.Get(e);
    e &&
      (e = e.GetComponent(0)) &&
      e.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Animal &&
      ((e = e.GetModelId()), HandBookController.wZt(e)) &&
      HandBookController.SendIllustratedUnlockRequest(4, e);
  });
// # sourceMappingURL=HandBookController.js.map
