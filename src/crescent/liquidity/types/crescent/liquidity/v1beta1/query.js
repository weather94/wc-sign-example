/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { Params, Pair, DepositRequest, WithdrawRequest, Order } from '../../../crescent/liquidity/v1beta1/liquidity';
import { PageRequest, PageResponse } from '../../../cosmos/base/query/v1beta1/pagination';
import { Coin } from '../../../cosmos/base/v1beta1/coin';
export const protobufPackage = 'crescent.liquidity.v1beta1';
const baseQueryParamsRequest = {};
export const QueryParamsRequest = {
  encode(_, writer = Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_) {
    const message = { ...baseQueryParamsRequest };
    return message;
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  fromPartial(_) {
    const message = { ...baseQueryParamsRequest };
    return message;
  },
};
const baseQueryParamsResponse = {};
export const QueryParamsResponse = {
  encode(message, writer = Writer.create()) {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryParamsResponse };
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryParamsResponse };
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};
const baseQueryPoolsRequest = { pairId: 0, disabled: '' };
export const QueryPoolsRequest = {
  encode(message, writer = Writer.create()) {
    if (message.pairId !== 0) {
      writer.uint32(8).uint64(message.pairId);
    }
    if (message.disabled !== '') {
      writer.uint32(18).string(message.disabled);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolsRequest };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairId = longToNumber(reader.uint64());
          break;
        case 2:
          message.disabled = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPoolsRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = Number(object.pairId);
    } else {
      message.pairId = 0;
    }
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = String(object.disabled);
    } else {
      message.disabled = '';
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.pairId !== undefined && (obj.pairId = message.pairId);
    message.disabled !== undefined && (obj.disabled = message.disabled);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPoolsRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = object.pairId;
    } else {
      message.pairId = 0;
    }
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = object.disabled;
    } else {
      message.disabled = '';
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryPoolsResponse = {};
export const QueryPoolsResponse = {
  encode(message, writer = Writer.create()) {
    for (const v of message.pools) {
      PoolResponse.encode(v, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolsResponse };
    message.pools = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(PoolResponse.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPoolsResponse };
    message.pools = [];
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(PoolResponse.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? PoolResponse.toJSON(e) : undefined));
    } else {
      obj.pools = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPoolsResponse };
    message.pools = [];
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(PoolResponse.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryPoolRequest = { poolId: 0 };
export const QueryPoolRequest = {
  encode(message, writer = Writer.create()) {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolRequest };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPoolRequest };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPoolRequest };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    return message;
  },
};
const baseQueryPoolResponse = {};
export const QueryPoolResponse = {
  encode(message, writer = Writer.create()) {
    if (message.pool !== undefined) {
      PoolResponse.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolResponse };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = PoolResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPoolResponse };
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = PoolResponse.fromJSON(object.pool);
    } else {
      message.pool = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.pool !== undefined && (obj.pool = message.pool ? PoolResponse.toJSON(message.pool) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPoolResponse };
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = PoolResponse.fromPartial(object.pool);
    } else {
      message.pool = undefined;
    }
    return message;
  },
};
const baseQueryPoolByReserveAddressRequest = { reserveAddress: '' };
export const QueryPoolByReserveAddressRequest = {
  encode(message, writer = Writer.create()) {
    if (message.reserveAddress !== '') {
      writer.uint32(10).string(message.reserveAddress);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryPoolByReserveAddressRequest,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryPoolByReserveAddressRequest,
    };
    if (object.reserveAddress !== undefined && object.reserveAddress !== null) {
      message.reserveAddress = String(object.reserveAddress);
    } else {
      message.reserveAddress = '';
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryPoolByReserveAddressRequest,
    };
    if (object.reserveAddress !== undefined && object.reserveAddress !== null) {
      message.reserveAddress = object.reserveAddress;
    } else {
      message.reserveAddress = '';
    }
    return message;
  },
};
const baseQueryPoolByPoolCoinDenomRequest = { poolCoinDenom: '' };
export const QueryPoolByPoolCoinDenomRequest = {
  encode(message, writer = Writer.create()) {
    if (message.poolCoinDenom !== '') {
      writer.uint32(10).string(message.poolCoinDenom);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryPoolByPoolCoinDenomRequest,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolCoinDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryPoolByPoolCoinDenomRequest,
    };
    if (object.poolCoinDenom !== undefined && object.poolCoinDenom !== null) {
      message.poolCoinDenom = String(object.poolCoinDenom);
    } else {
      message.poolCoinDenom = '';
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.poolCoinDenom !== undefined && (obj.poolCoinDenom = message.poolCoinDenom);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryPoolByPoolCoinDenomRequest,
    };
    if (object.poolCoinDenom !== undefined && object.poolCoinDenom !== null) {
      message.poolCoinDenom = object.poolCoinDenom;
    } else {
      message.poolCoinDenom = '';
    }
    return message;
  },
};
const baseQueryPairsRequest = { denoms: '' };
export const QueryPairsRequest = {
  encode(message, writer = Writer.create()) {
    for (const v of message.denoms) {
      writer.uint32(10).string(v);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPairsRequest };
    message.denoms = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(reader.string());
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPairsRequest };
    message.denoms = [];
    if (object.denoms !== undefined && object.denoms !== null) {
      for (const e of object.denoms) {
        message.denoms.push(String(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map((e) => e);
    } else {
      obj.denoms = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPairsRequest };
    message.denoms = [];
    if (object.denoms !== undefined && object.denoms !== null) {
      for (const e of object.denoms) {
        message.denoms.push(e);
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryPairsResponse = {};
export const QueryPairsResponse = {
  encode(message, writer = Writer.create()) {
    for (const v of message.pairs) {
      Pair.encode(v, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPairsResponse };
    message.pairs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairs.push(Pair.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPairsResponse };
    message.pairs = [];
    if (object.pairs !== undefined && object.pairs !== null) {
      for (const e of object.pairs) {
        message.pairs.push(Pair.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.pairs) {
      obj.pairs = message.pairs.map((e) => (e ? Pair.toJSON(e) : undefined));
    } else {
      obj.pairs = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPairsResponse };
    message.pairs = [];
    if (object.pairs !== undefined && object.pairs !== null) {
      for (const e of object.pairs) {
        message.pairs.push(Pair.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryPairRequest = { pairId: 0 };
export const QueryPairRequest = {
  encode(message, writer = Writer.create()) {
    if (message.pairId !== 0) {
      writer.uint32(8).uint64(message.pairId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPairRequest };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairId = longToNumber(reader.uint64());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPairRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = Number(object.pairId);
    } else {
      message.pairId = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.pairId !== undefined && (obj.pairId = message.pairId);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPairRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = object.pairId;
    } else {
      message.pairId = 0;
    }
    return message;
  },
};
const baseQueryPairResponse = {};
export const QueryPairResponse = {
  encode(message, writer = Writer.create()) {
    if (message.pair !== undefined) {
      Pair.encode(message.pair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPairResponse };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = Pair.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryPairResponse };
    if (object.pair !== undefined && object.pair !== null) {
      message.pair = Pair.fromJSON(object.pair);
    } else {
      message.pair = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.pair !== undefined && (obj.pair = message.pair ? Pair.toJSON(message.pair) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryPairResponse };
    if (object.pair !== undefined && object.pair !== null) {
      message.pair = Pair.fromPartial(object.pair);
    } else {
      message.pair = undefined;
    }
    return message;
  },
};
const baseQueryDepositRequestsRequest = { poolId: 0 };
export const QueryDepositRequestsRequest = {
  encode(message, writer = Writer.create()) {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDepositRequestsRequest,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64());
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryDepositRequestsRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryDepositRequestsRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryDepositRequestsResponse = {};
export const QueryDepositRequestsResponse = {
  encode(message, writer = Writer.create()) {
    for (const v of message.depositRequests) {
      DepositRequest.encode(v, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDepositRequestsResponse,
    };
    message.depositRequests = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositRequests.push(DepositRequest.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryDepositRequestsResponse,
    };
    message.depositRequests = [];
    if (object.depositRequests !== undefined && object.depositRequests !== null) {
      for (const e of object.depositRequests) {
        message.depositRequests.push(DepositRequest.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.depositRequests) {
      obj.depositRequests = message.depositRequests.map((e) => (e ? DepositRequest.toJSON(e) : undefined));
    } else {
      obj.depositRequests = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryDepositRequestsResponse,
    };
    message.depositRequests = [];
    if (object.depositRequests !== undefined && object.depositRequests !== null) {
      for (const e of object.depositRequests) {
        message.depositRequests.push(DepositRequest.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryDepositRequestRequest = { poolId: 0, id: 0 };
export const QueryDepositRequestRequest = {
  encode(message, writer = Writer.create()) {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDepositRequestRequest,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64());
          break;
        case 2:
          message.id = longToNumber(reader.uint64());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryDepositRequestRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryDepositRequestRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};
const baseQueryDepositRequestResponse = {};
export const QueryDepositRequestResponse = {
  encode(message, writer = Writer.create()) {
    if (message.depositRequest !== undefined) {
      DepositRequest.encode(message.depositRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDepositRequestResponse,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositRequest = DepositRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryDepositRequestResponse,
    };
    if (object.depositRequest !== undefined && object.depositRequest !== null) {
      message.depositRequest = DepositRequest.fromJSON(object.depositRequest);
    } else {
      message.depositRequest = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.depositRequest !== undefined &&
      (obj.depositRequest = message.depositRequest ? DepositRequest.toJSON(message.depositRequest) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryDepositRequestResponse,
    };
    if (object.depositRequest !== undefined && object.depositRequest !== null) {
      message.depositRequest = DepositRequest.fromPartial(object.depositRequest);
    } else {
      message.depositRequest = undefined;
    }
    return message;
  },
};
const baseQueryWithdrawRequestsRequest = { poolId: 0 };
export const QueryWithdrawRequestsRequest = {
  encode(message, writer = Writer.create()) {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryWithdrawRequestsRequest,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64());
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryWithdrawRequestsRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryWithdrawRequestsRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryWithdrawRequestsResponse = {};
export const QueryWithdrawRequestsResponse = {
  encode(message, writer = Writer.create()) {
    for (const v of message.withdrawRequests) {
      WithdrawRequest.encode(v, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryWithdrawRequestsResponse,
    };
    message.withdrawRequests = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawRequests.push(WithdrawRequest.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryWithdrawRequestsResponse,
    };
    message.withdrawRequests = [];
    if (object.withdrawRequests !== undefined && object.withdrawRequests !== null) {
      for (const e of object.withdrawRequests) {
        message.withdrawRequests.push(WithdrawRequest.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.withdrawRequests) {
      obj.withdrawRequests = message.withdrawRequests.map((e) => (e ? WithdrawRequest.toJSON(e) : undefined));
    } else {
      obj.withdrawRequests = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryWithdrawRequestsResponse,
    };
    message.withdrawRequests = [];
    if (object.withdrawRequests !== undefined && object.withdrawRequests !== null) {
      for (const e of object.withdrawRequests) {
        message.withdrawRequests.push(WithdrawRequest.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryWithdrawRequestRequest = { poolId: 0, id: 0 };
export const QueryWithdrawRequestRequest = {
  encode(message, writer = Writer.create()) {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryWithdrawRequestRequest,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64());
          break;
        case 2:
          message.id = longToNumber(reader.uint64());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryWithdrawRequestRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryWithdrawRequestRequest,
    };
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};
const baseQueryWithdrawRequestResponse = {};
export const QueryWithdrawRequestResponse = {
  encode(message, writer = Writer.create()) {
    if (message.withdrawRequest !== undefined) {
      WithdrawRequest.encode(message.withdrawRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryWithdrawRequestResponse,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawRequest = WithdrawRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryWithdrawRequestResponse,
    };
    if (object.withdrawRequest !== undefined && object.withdrawRequest !== null) {
      message.withdrawRequest = WithdrawRequest.fromJSON(object.withdrawRequest);
    } else {
      message.withdrawRequest = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.withdrawRequest !== undefined &&
      (obj.withdrawRequest = message.withdrawRequest ? WithdrawRequest.toJSON(message.withdrawRequest) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryWithdrawRequestResponse,
    };
    if (object.withdrawRequest !== undefined && object.withdrawRequest !== null) {
      message.withdrawRequest = WithdrawRequest.fromPartial(object.withdrawRequest);
    } else {
      message.withdrawRequest = undefined;
    }
    return message;
  },
};
const baseQueryOrdersRequest = { pairId: 0 };
export const QueryOrdersRequest = {
  encode(message, writer = Writer.create()) {
    if (message.pairId !== 0) {
      writer.uint32(8).uint64(message.pairId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryOrdersRequest };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairId = longToNumber(reader.uint64());
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryOrdersRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = Number(object.pairId);
    } else {
      message.pairId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.pairId !== undefined && (obj.pairId = message.pairId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryOrdersRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = object.pairId;
    } else {
      message.pairId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryOrdersResponse = {};
export const QueryOrdersResponse = {
  encode(message, writer = Writer.create()) {
    for (const v of message.orders) {
      Order.encode(v, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryOrdersResponse };
    message.orders = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(Order.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryOrdersResponse };
    message.orders = [];
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.orders) {
      obj.orders = message.orders.map((e) => (e ? Order.toJSON(e) : undefined));
    } else {
      obj.orders = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryOrdersResponse };
    message.orders = [];
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const baseQueryOrderRequest = { pairId: 0, id: 0 };
export const QueryOrderRequest = {
  encode(message, writer = Writer.create()) {
    if (message.pairId !== 0) {
      writer.uint32(8).uint64(message.pairId);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryOrderRequest };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairId = longToNumber(reader.uint64());
          break;
        case 2:
          message.id = longToNumber(reader.uint64());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryOrderRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = Number(object.pairId);
    } else {
      message.pairId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.pairId !== undefined && (obj.pairId = message.pairId);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryOrderRequest };
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = object.pairId;
    } else {
      message.pairId = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};
const baseQueryOrderResponse = {};
export const QueryOrderResponse = {
  encode(message, writer = Writer.create()) {
    if (message.order !== undefined) {
      Order.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryOrderResponse };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = Order.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...baseQueryOrderResponse };
    if (object.order !== undefined && object.order !== null) {
      message.order = Order.fromJSON(object.order);
    } else {
      message.order = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.order !== undefined && (obj.order = message.order ? Order.toJSON(message.order) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = { ...baseQueryOrderResponse };
    if (object.order !== undefined && object.order !== null) {
      message.order = Order.fromPartial(object.order);
    } else {
      message.order = undefined;
    }
    return message;
  },
};
const baseQueryOrdersByOrdererRequest = { orderer: '', pairId: 0 };
export const QueryOrdersByOrdererRequest = {
  encode(message, writer = Writer.create()) {
    if (message.orderer !== '') {
      writer.uint32(10).string(message.orderer);
    }
    if (message.pairId !== 0) {
      writer.uint32(16).uint64(message.pairId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryOrdersByOrdererRequest,
    };
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderer = reader.string();
          break;
        case 2:
          message.pairId = longToNumber(reader.uint64());
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = {
      ...baseQueryOrdersByOrdererRequest,
    };
    if (object.orderer !== undefined && object.orderer !== null) {
      message.orderer = String(object.orderer);
    } else {
      message.orderer = '';
    }
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = Number(object.pairId);
    } else {
      message.pairId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.orderer !== undefined && (obj.orderer = message.orderer);
    message.pairId !== undefined && (obj.pairId = message.pairId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object) {
    const message = {
      ...baseQueryOrdersByOrdererRequest,
    };
    if (object.orderer !== undefined && object.orderer !== null) {
      message.orderer = object.orderer;
    } else {
      message.orderer = '';
    }
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = object.pairId;
    } else {
      message.pairId = 0;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};
const basePoolResponse = {
  id: 0,
  pairId: 0,
  reserveAddress: '',
  poolCoinDenom: '',
  lastDepositRequestId: 0,
  lastWithdrawRequestId: 0,
};
export const PoolResponse = {
  encode(message, writer = Writer.create()) {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.pairId !== 0) {
      writer.uint32(16).uint64(message.pairId);
    }
    if (message.reserveAddress !== '') {
      writer.uint32(26).string(message.reserveAddress);
    }
    if (message.poolCoinDenom !== '') {
      writer.uint32(34).string(message.poolCoinDenom);
    }
    for (const v of message.balances) {
      Coin.encode(v, writer.uint32(42).fork()).ldelim();
    }
    if (message.lastDepositRequestId !== 0) {
      writer.uint32(48).uint64(message.lastDepositRequestId);
    }
    if (message.lastWithdrawRequestId !== 0) {
      writer.uint32(56).uint64(message.lastWithdrawRequestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePoolResponse };
    message.balances = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64());
          break;
        case 2:
          message.pairId = longToNumber(reader.uint64());
          break;
        case 3:
          message.reserveAddress = reader.string();
          break;
        case 4:
          message.poolCoinDenom = reader.string();
          break;
        case 5:
          message.balances.push(Coin.decode(reader, reader.uint32()));
          break;
        case 6:
          message.lastDepositRequestId = longToNumber(reader.uint64());
          break;
        case 7:
          message.lastWithdrawRequestId = longToNumber(reader.uint64());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = { ...basePoolResponse };
    message.balances = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = Number(object.pairId);
    } else {
      message.pairId = 0;
    }
    if (object.reserveAddress !== undefined && object.reserveAddress !== null) {
      message.reserveAddress = String(object.reserveAddress);
    } else {
      message.reserveAddress = '';
    }
    if (object.poolCoinDenom !== undefined && object.poolCoinDenom !== null) {
      message.poolCoinDenom = String(object.poolCoinDenom);
    } else {
      message.poolCoinDenom = '';
    }
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Coin.fromJSON(e));
      }
    }
    if (object.lastDepositRequestId !== undefined && object.lastDepositRequestId !== null) {
      message.lastDepositRequestId = Number(object.lastDepositRequestId);
    } else {
      message.lastDepositRequestId = 0;
    }
    if (object.lastWithdrawRequestId !== undefined && object.lastWithdrawRequestId !== null) {
      message.lastWithdrawRequestId = Number(object.lastWithdrawRequestId);
    } else {
      message.lastWithdrawRequestId = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.id !== undefined && (obj.id = message.id);
    message.pairId !== undefined && (obj.pairId = message.pairId);
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.poolCoinDenom !== undefined && (obj.poolCoinDenom = message.poolCoinDenom);
    if (message.balances) {
      obj.balances = message.balances.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.balances = [];
    }
    message.lastDepositRequestId !== undefined && (obj.lastDepositRequestId = message.lastDepositRequestId);
    message.lastWithdrawRequestId !== undefined && (obj.lastWithdrawRequestId = message.lastWithdrawRequestId);
    return obj;
  },
  fromPartial(object) {
    const message = { ...basePoolResponse };
    message.balances = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.pairId !== undefined && object.pairId !== null) {
      message.pairId = object.pairId;
    } else {
      message.pairId = 0;
    }
    if (object.reserveAddress !== undefined && object.reserveAddress !== null) {
      message.reserveAddress = object.reserveAddress;
    } else {
      message.reserveAddress = '';
    }
    if (object.poolCoinDenom !== undefined && object.poolCoinDenom !== null) {
      message.poolCoinDenom = object.poolCoinDenom;
    } else {
      message.poolCoinDenom = '';
    }
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Coin.fromPartial(e));
      }
    }
    if (object.lastDepositRequestId !== undefined && object.lastDepositRequestId !== null) {
      message.lastDepositRequestId = object.lastDepositRequestId;
    } else {
      message.lastDepositRequestId = 0;
    }
    if (object.lastWithdrawRequestId !== undefined && object.lastWithdrawRequestId !== null) {
      message.lastWithdrawRequestId = object.lastWithdrawRequestId;
    } else {
      message.lastWithdrawRequestId = 0;
    }
    return message;
  },
};
export class QueryClientImpl {
  constructor(rpc) {
    this.rpc = rpc;
  }
  Params(request) {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'Params', data);
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }
  Pools(request) {
    const data = QueryPoolsRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'Pools', data);
    return promise.then((data) => QueryPoolsResponse.decode(new Reader(data)));
  }
  Pool(request) {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'Pool', data);
    return promise.then((data) => QueryPoolResponse.decode(new Reader(data)));
  }
  PoolByReserveAddress(request) {
    const data = QueryPoolByReserveAddressRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'PoolByReserveAddress', data);
    return promise.then((data) => QueryPoolResponse.decode(new Reader(data)));
  }
  PoolByPoolCoinDenom(request) {
    const data = QueryPoolByPoolCoinDenomRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'PoolByPoolCoinDenom', data);
    return promise.then((data) => QueryPoolResponse.decode(new Reader(data)));
  }
  Pairs(request) {
    const data = QueryPairsRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'Pairs', data);
    return promise.then((data) => QueryPairsResponse.decode(new Reader(data)));
  }
  Pair(request) {
    const data = QueryPairRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'Pair', data);
    return promise.then((data) => QueryPairResponse.decode(new Reader(data)));
  }
  DepositRequests(request) {
    const data = QueryDepositRequestsRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'DepositRequests', data);
    return promise.then((data) => QueryDepositRequestsResponse.decode(new Reader(data)));
  }
  DepositRequest(request) {
    const data = QueryDepositRequestRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'DepositRequest', data);
    return promise.then((data) => QueryDepositRequestResponse.decode(new Reader(data)));
  }
  WithdrawRequests(request) {
    const data = QueryWithdrawRequestsRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'WithdrawRequests', data);
    return promise.then((data) => QueryWithdrawRequestsResponse.decode(new Reader(data)));
  }
  WithdrawRequest(request) {
    const data = QueryWithdrawRequestRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'WithdrawRequest', data);
    return promise.then((data) => QueryWithdrawRequestResponse.decode(new Reader(data)));
  }
  Orders(request) {
    const data = QueryOrdersRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'Orders', data);
    return promise.then((data) => QueryOrdersResponse.decode(new Reader(data)));
  }
  Order(request) {
    const data = QueryOrderRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'Order', data);
    return promise.then((data) => QueryOrderResponse.decode(new Reader(data)));
  }
  OrdersByOrderer(request) {
    const data = QueryOrdersByOrdererRequest.encode(request).finish();
    const promise = this.rpc.request('crescent.liquidity.v1beta1.Query', 'OrdersByOrderer', data);
    return promise.then((data) => QueryOrdersResponse.decode(new Reader(data)));
  }
}
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
