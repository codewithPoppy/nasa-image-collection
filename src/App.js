import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "antd";

import Search from "./pages/Search";
import Show from "./pages/Show";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { setupStore } from "./store";

import "./scss/App.scss";

const App = () => {
  const { Content } = Layout;
  const store = setupStore();

  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Content className="content">
          <Router>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/show/:nasaId" element={<Show />} />
            </Routes>
          </Router>
        </Content>
        <Footer />
      </Layout>
    </Provider>
  );
};

export default App;
