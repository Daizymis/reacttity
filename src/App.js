import "@/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/mobile/Login";
import Menu from "@/pages/mobile/Menu";
import Layout from "@/pages/mobile/Layout";
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes history={history}>
            {/* <IndexRoute component={<Login />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/layout" element={<Layout />}>
              <Route path="menu" element={<Menu />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
