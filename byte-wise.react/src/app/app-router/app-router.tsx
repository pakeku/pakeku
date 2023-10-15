import { Routes, Route } from 'react-router-dom';
import { AuthenticationGuard } from 'byte-wise.react/src/auth';

export function AppRouter({
  routes,
}: {
  routes: {
    path: string;
    component: React.ComponentType;
    requiredPermissions?: string[];
  }[];
}) {
  return (
    <Routes>
      {routes.map(({ path, component, requiredPermissions }) => (
        <Route
          path={path}
          element={
            <AuthenticationGuard
              component={component}
              requiredPermissions={requiredPermissions}
            />
          }
        />
      ))}
    </Routes>
  );
}

export default AppRouter;
