import {IRouteType} from "../../types/routes";
import { matchPath } from "react-router-dom";

const getRouteByReqUrl = (pathname: string, routes: IRouteType[]) => {
    return routes.find((route) => {
        return matchPath(route.path, pathname)
    })
}

export {
    getRouteByReqUrl,
}