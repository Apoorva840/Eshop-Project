import { BrowserRouter as Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp/SignUp.js';
import Login from './components/Login/Login.js';

function PageSetup() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/App" element={<App />} />

        <Route path="/login"
          element={<Login />}
        />
        <Route path="SignUp" element={<SignUp />} />

        <Route
          path="/product/add"
          element={
            <ProtectedRoute role={["ADMIN"]}>
              <ProductPage
                mode={"CREATE"}
                buttonText="SAVE PRODUCT"
                headingText="Add Product"
                callbackFunction={createProduct}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/modify"
          element={
            <ProtectedRoute role={["ADMIN"]}>
              <ProductPage
                mode={"MODIFY"}
                buttonText="MODIFY PRODUCT"
                headingText="Modify Product"
                callbackFunction={modifyProduct}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/view"
          element={
            <ProtectedRoute >
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/order"
          element={
            <ProtectedRoute >
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ErrorPage />
          }
        />
      </Routes>

      <BroadcastMessage />
    </BrowserRouter>
  );
}

export default PageSetup;