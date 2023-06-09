import { Empty } from "antd";
import {
  useState,
  useEffect,
  Children,
  isValidElement,
  ReactElement,
  useContext,
  cloneElement,
} from "react";
import { VirtualRouterContext } from "../../contexts/virtual-router-context";

interface VirtualRouteProps {
  component: JSX.Element;
  index?: boolean;
  path?: string;
}
export const VirtualRoute = ({ component }: VirtualRouteProps): JSX.Element => (
  <div>{component}</div>
);

interface VirtualRouterProps {
  children: ReactElement<VirtualRouteProps>[] | ReactElement<VirtualRouteProps>;
}
export const VirtualRouter = ({
  children,
}: VirtualRouterProps): JSX.Element => {
  const { route } = useContext(VirtualRouterContext);
  const [pathMap, setPathMap] = useState<Map<string, JSX.Element>>(new Map());

  // Index is the default route
  // Create a map of paths to components based on the children
  useEffect(() => {
    const newPathMap = new Map();
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.props.index) {
          newPathMap.set("index", child.props.component);
        } else {
          // Handle routes with an ID
          if (child.props.path && child.props.path.includes("/{:id}")) {
            // Remove the {:id} from the route
            const newPath = child.props.path.replace("/{:id}", "");
            newPathMap.set(newPath, child.props.component);
          } else {
            newPathMap.set(child.props.path, child.props.component);
          }
        }
      }
    });
    setPathMap(newPathMap);
  }, [children]);

  const handleRoute = (route: string): JSX.Element => {
    if (route) {
      if (pathMap.has(route)) {
        return pathMap.get(route)!;
      } else {
        // Handle routes with an ID
        const routeArray = route.split("/");
        if (pathMap.has(routeArray[0])) {
          // Find the matching sub-route and inject the ID into the child component
          const matchedElement = pathMap.get(routeArray[0]);
          const matchedElementWithProps = cloneElement(matchedElement!, {
            brandId: routeArray[1],
          });
          return matchedElementWithProps;
        } else {
          // TODO: Return empty or throw error?
          return <Empty></Empty>;
        }
      }
    }
    return <Empty></Empty>;
  };

  const renderComponent = handleRoute(route);

  return renderComponent;
};
