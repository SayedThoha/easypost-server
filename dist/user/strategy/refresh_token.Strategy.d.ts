declare const RefreshTokenStrategy_base: new (...args: any) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    avalidate(payload: any): {
        userId: any;
        email: any;
    };
}
export {};
