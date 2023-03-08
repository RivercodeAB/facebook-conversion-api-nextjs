"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const conversion_api_1 = require("../conversion-api");
const FBPixelProvider = ({ children }) => {
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (!router.asPath.includes('?')) {
            (0, conversion_api_1.fbPageView)();
        }
        router.events.on('routeChangeComplete', conversion_api_1.fbPageView);
        return () => {
            router.events.off('routeChangeComplete', conversion_api_1.fbPageView);
        };
    }, [router.events]);
    return children;
};
exports.default = FBPixelProvider;
