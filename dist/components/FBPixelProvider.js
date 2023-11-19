"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBPixelProvider = void 0;
const react_1 = require("react");
const conversion_api_1 = require("../conversion-api");
const navigation_1 = require("next/navigation");
function FBPixelProvider({ children }) {
    const pathname = (0, navigation_1.usePathname)();
    const searchParams = (0, navigation_1.useSearchParams)();
    (0, react_1.useEffect)(conversion_api_1.fbPageView, [pathname, searchParams]);
    return (children);
}
exports.FBPixelProvider = FBPixelProvider;
exports.default = FBPixelProvider;
