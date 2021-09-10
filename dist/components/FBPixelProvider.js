"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const index_1 = require("../index");
const FBPixelProvider = ({ children }) => {
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (!router.asPath.includes('?')) {
            (0, index_1.fbPageView)();
        }
        router.events.on('routeChangeComplete', index_1.fbPageView);
        return () => {
            router.events.off('routeChangeComplete', index_1.fbPageView);
        };
    }, [router.events]);
    return children;
};
exports.default = FBPixelProvider;
