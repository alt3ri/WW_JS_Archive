"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookController = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  HandBookDefine_1 = require("./HandBookDefine");
class HandBookController extends UiControllerBase_1.UiControllerBase {
  static SetPhantomMeshShow(e, t) {}
  static SetWeaponMeshShow(e, t) {}
  static SetMonsterMeshShow(e, t) {}
  static SetAnimalMeshShow(e, t) {}
  static ClearEffect() {
    this.Uei &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.Uei,
        "[HandBookController.ClearEffect] StopEffect",
        !1,
      ),
      (this.Uei = 0));
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(10246, (e) => {
      var t = ModelManager_1.ModelManager.HandBookModel.GetClientHandBookType(
        e.Z4n,
        e.nws.tws,
      );
      HandBookController.CheckConfigIsLegal(t, e.nws.J4n) &&
        (ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(
          e.Z4n,
          e.nws,
        ),
        e.sws) &&
        this.Aei(e.Z4n, e.nws);
    });
  }
  static Aei(e, t) {
    let a = "";
    e === Protocol_1.Aki.Protocol.x5s.Proto_Photograph &&
      ((e = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfig(
        t.J4n,
      )),
      (a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "")),
      a.length;
  }
  static Pei(e) {
    var t = [],
      a = [],
      o = [],
      r = [],
      n = [],
      i =
        (t.push(e.Texture),
        ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, e.Id)),
      i =
        (n.push(i.CreateTime),
        a.push(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Descrtption),
        ),
        o.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
        ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(
          e.Type,
        )),
      e =
        (r.push(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            i.TypeDescription,
          ),
        ),
        new HandBookDefine_1.HandBookPhotoData()),
      i =
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
    var e = Protocol_1.Aki.Protocol.uos.create();
    Net_1.Net.Call(13883, e, (e) => {
      e &&
        ModelManager_1.ModelManager.HandBookModel.InitHandBookRedDotList(e.rws);
    });
  }
  static async SendIllustratedInfoRequestAsync(e) {
    var t = Protocol_1.Aki.Protocol.mos.create(),
      a =
        ((t.m9n =
          ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(
            e,
          )),
        await Net_1.Net.CallAsync(20573, t));
    if (a) {
      ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
      var o = a.ows.length;
      for (let e = 0; e < o; e++) {
        var r = a.ows[e];
        ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(
          r.Z4n,
          r.iws,
        );
      }
      await Promise.resolve();
    }
  }
  static SendIllustratedInfoRequest(e) {
    var t = Protocol_1.Aki.Protocol.mos.create();
    (t.m9n =
      ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e)),
      Net_1.Net.Call(20573, t, (t) => {
        if (t) {
          ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
          var a = t.ows.length;
          for (let e = 0; e < a; e++) {
            var o = t.ows[e];
            ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(
              o.Z4n,
              o.iws,
            );
          }
        }
      });
  }
  static SendIllustratedReadRequest(t, e) {
    const a = Protocol_1.Aki.Protocol.pos.create();
    (a.Z4n =
      ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(t)),
      (a.J4n = e),
      Net_1.Net.Call(17178, a, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                14319,
                e.ivs,
              )
            : ModelManager_1.ModelManager.HandBookModel.UpdateRedDot(t, a.J4n));
      });
  }
  static SendIllustratedUnlockRequest(t, e) {
    const a = Protocol_1.Aki.Protocol.gos.create();
    (a.Z4n =
      ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(t)),
      (a.J4n = e),
      Net_1.Net.Call(25354, a, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                15013,
                e.ivs,
              )
            : (ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(
                a.Z4n,
                e.nws,
              ),
              this.Aei(a.Z4n, e.nws),
              2 === t &&
                ((e =
                  ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfig(
                    e.nws.J4n,
                  )),
                this.Pei(e))));
      });
  }
  static GetCollectProgress(e) {
    var t = [];
    let a = 0,
      o = void 0;
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
    var e = [],
      t = this.GetCollectProgress(0),
      a = this.GetCollectProgress(1),
      o = this.GetCollectProgress(2),
      r = this.GetCollectProgress(3),
      n = this.GetCollectProgress(4),
      i = this.GetCollectProgress(5),
      l = this.GetCollectProgress(6),
      s = this.GetCollectProgress(7);
    return (
      (e[0] = t[0] + a[0] + o[0] + r[0] + n[0] + i[0] + l[0] + s[0]),
      (e[1] = t[1] + a[1] + o[1] + r[1] + n[1] + i[1] + l[1] + s[1]),
      e
    );
  }
  static CheckConfigIsLegal(e, t) {
    var a = ModelManager_1.ModelManager.HandBookModel.GetConfigListIdByType(e),
      o = a.length;
    for (let e = 0; e < o; e++) if (a[e] === t) return !0;
    return !1;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlayerSenseTargetEnter,
      this.xei,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlayerSenseTargetEnter,
      this.xei,
    );
  }
  static wei(e) {
    e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigByMeshId(
        e,
      );
    return (
      !!e && !ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(4, e.Id)
    );
  }
}
((exports.HandBookController = HandBookController).Uei = 0),
  (HandBookController.xei = (e) => {
    var e = EntitySystem_1.EntitySystem.Get(e);
    e &&
      (e = e.GetComponent(0)) &&
      e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Animal &&
      ((e = e.GetModelId()), HandBookController.wei(e)) &&
      HandBookController.SendIllustratedUnlockRequest(4, e);
  });
//# sourceMappingURL=HandBookController.js.map
