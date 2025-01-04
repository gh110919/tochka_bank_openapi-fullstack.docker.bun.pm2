import { GetTokenPermissions } from "PAGES/get-token-permissions";
import { Index } from "PAGES/index";
import { RequestSignPermissions } from "PAGES/request-sign-permissions";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index></Index>}></Route>
        <Route
          path="/get_token_permissions"
          element={<GetTokenPermissions></GetTokenPermissions>}
        ></Route>
        <Route
          path="/request_sign_permissions/*"
          element={<RequestSignPermissions></RequestSignPermissions>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
