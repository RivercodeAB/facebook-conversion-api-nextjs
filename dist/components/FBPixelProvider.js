"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const router_1 = require("next/router");
const conversion_api_1 = require("../conversion-api");
const FBPixelProvider = ({ children }) => {
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        (0, conversion_api_1.fbPageView)();
        router.events.on('routeChangeComplete', conversion_api_1.fbPageView);
        return () => {
            router.events.off('routeChangeComplete', conversion_api_1.fbPageView);
        };
    }, [router.events]);
    return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    react_1.default.createElement(react_1.default.Fragment, null, children));
};
exports.default = FBPixelProvider;
