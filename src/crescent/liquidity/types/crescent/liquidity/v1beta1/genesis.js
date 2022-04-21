/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import {
  Params,
  Pair,
  Pool,
  DepositRequest,
  WithdrawRequest,
  Order,
} from '../../../crescent/liquidity/v1beta1/liquidity';
export const protobufPackage = 'crescent.liquidity.v1beta1';
const baseGenesisState = { lastPairId: 0, lastPoolId: 0 };
export const GenesisState = {
  encode(message, writer = Writer.create()) {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.lastPairId !== 0) {
      writer.uint32(16).uint64(message.lastPairId);
    }
    if (message.lastPoolId !== 0) {
      writer.uint32(24).uint64(message.lastPoolId);
    }
    for (const v of message.pairs) {
      Pair.encode(v, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.pools) {
      Pool.encode(v, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.depositRequests) {
      DepositRequest.encode(v, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.withdrawRequests) {
      WithdrawRequest.encode(v, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.orders) {
      Order.encode(v, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState };
    message.pairs = [];
    message.pools = [];
    message.depositRequests = [];
    message.withdrawRequests = [];
    message.orders = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.lastPairId = longToNumber(reader.uint64());
          break;
        case 3:
          message.lastPoolId = longToNumber(reader.uint64());
          break;
        case 4:
          message.pairs.push(Pair.decode(reader, reader.uint32()));
          break;
        case 5:
          message.pools.push(Pool.decode(reader, reader.uint32()));
          break;
        case 6:
          message.depositRequests.push(DepositRequest.decode(reader, reader.uint32()));
          break;
        case 7:
          message.withdrawRequests.push(WithdrawRequest.decode(reader, reader.uint32()));
          break;
        case 8:
          message.orders.push(Order.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseGenesisState };
    message.pairs = [];
    message.pools = [];
    message.depositRequests = [];
    message.withdrawRequests = [];
    message.orders = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.lastPairId !== undefined && object.lastPairId !== null) {
      message.lastPairId = Number(object.lastPairId);
    } else {
      message.lastPairId = 0;
    }
    if (object.lastPoolId !== undefined && object.lastPoolId !== null) {
      message.lastPoolId = Number(object.lastPoolId);
    } else {
      message.lastPoolId = 0;
    }
    if (object.pairs !== undefined && object.pairs !== null) {
      for (const e of object.pairs) {
        message.pairs.push(Pair.fromJSON(e));
      }
    }
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Pool.fromJSON(e));
      }
    }
    if (object.depositRequests !== undefined && object.depositRequests !== null) {
      for (const e of object.depositRequests) {
        message.depositRequests.push(DepositRequest.fromJSON(e));
      }
    }
    if (object.withdrawRequests !== undefined && object.withdrawRequests !== null) {
      for (const e of object.withdrawRequests) {
        message.withdrawRequests.push(WithdrawRequest.fromJSON(e));
      }
    }
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromJSON(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.lastPairId !== undefined && (obj.lastPairId = message.lastPairId);
    message.lastPoolId !== undefined && (obj.lastPoolId = message.lastPoolId);
    if (message.pairs) {
      obj.pairs = message.pairs.map((e) => (e ? Pair.toJSON(e) : undefined));
    } else {
      obj.pairs = [];
    }
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? Pool.toJSON(e) : undefined));
    } else {
      obj.pools = [];
    }
    if (message.depositRequests) {
      obj.depositRequests = message.depositRequests.map((e) => (e ? DepositRequest.toJSON(e) : undefined));
    } else {
      obj.depositRequests = [];
    }
    if (message.withdrawRequests) {
      obj.withdrawRequests = message.withdrawRequests.map((e) => (e ? WithdrawRequest.toJSON(e) : undefined));
    } else {
      obj.withdrawRequests = [];
    }
    if (message.orders) {
      obj.orders = message.orders.map((e) => (e ? Order.toJSON(e) : undefined));
    } else {
      obj.orders = [];
    }
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseGenesisState };
    message.pairs = [];
    message.pools = [];
    message.depositRequests = [];
    message.withdrawRequests = [];
    message.orders = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.lastPairId !== undefined && object.lastPairId !== null) {
      message.lastPairId = object.lastPairId;
    } else {
      message.lastPairId = 0;
    }
    if (object.lastPoolId !== undefined && object.lastPoolId !== null) {
      message.lastPoolId = object.lastPoolId;
    } else {
      message.lastPoolId = 0;
    }
    if (object.pairs !== undefined && object.pairs !== null) {
      for (const e of object.pairs) {
        message.pairs.push(Pair.fromPartial(e));
      }
    }
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Pool.fromPartial(e));
      }
    }
    if (object.depositRequests !== undefined && object.depositRequests !== null) {
      for (const e of object.depositRequests) {
        message.depositRequests.push(DepositRequest.fromPartial(e));
      }
    }
    if (object.withdrawRequests !== undefined && object.withdrawRequests !== null) {
      for (const e of object.withdrawRequests) {
        message.withdrawRequests.push(WithdrawRequest.fromPartial(e));
      }
    }
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromPartial(e));
      }
    }
    return message;
  },
};
var globalThis = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();
function longToNumber(long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}
// @ts-ignore
if (util.Long !== Long) {
  util.Long = Long;
  configure();
}
