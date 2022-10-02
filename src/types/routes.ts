interface IRouteType {
    path: string;
    component: React.FC;
    getInitialData?: (url?: string) => Promise<any>;
}

export {
    IRouteType,
}