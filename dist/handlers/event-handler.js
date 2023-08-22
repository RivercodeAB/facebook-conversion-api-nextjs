"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../utils/request");
const server_side_events_1 = require("../services/server-side-events");
/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
const eventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.method !== 'POST') {
        return res.status(400).json({
            message: 'This route only accepts POST requests',
        });
    }
    if (!process.env.FB_ACCESS_TOKEN) {
        throw new Error('Missing FB_ACCESS_TOKEN in environment file.');
    }
    if (!process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
        throw new Error('Missing NEXT_PUBLIC_FB_PIXEL_ID in environment file.');
    }
    const { eventName, eventId, emails, phones, firstName, lastName, country, city, zipCode, products, value, currency, userAgent, sourceUrl, testEventCode, } = req.body;
    if (!eventName) {
        return res.status(400).json({
            error: 'The request body is missing required parameters: eventName',
        });
    }
    const payload = {
        eventName,
        eventId,
        emails,
        phones,
        firstName,
        lastName,
        country,
        city,
        zipCode,
        products,
        value,
        currency,
        fbp: (0, request_1.getClientFbp)(req),
        fbc: (0, request_1.getClientFbc)(req),
        ipAddress: (0, request_1.getClientIpAddress)(req),
        userAgent,
        sourceUrl,
        testEventCode,
    };
    const response = yield (0, server_side_events_1.sendServerSideEvent)(payload);
    const success = (_a = (response === null || response === void 0 ? void 0 : response.events_received) === 1) !== null && _a !== void 0 ? _a : false;
    if (process.env.NEXT_PUBLIC_FB_DEBUG === 'true') {
        return res.status(200).json({
            debug: true,
            success,
            payload,
            response,
        });
    }
    return res.status(200).json({
        success,
    });
});
exports.default = eventHandler;
