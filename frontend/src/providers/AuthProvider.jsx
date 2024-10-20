import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const sessionKey = "88735c91-73e9-51ac-8f3b-325c2e6d0c84885eef36-f221";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, token: false });

  const setUser = (value) => setSession((prev) => ({ ...prev, user: value }));
  const setToken = (value) => setSession((prev) => ({ ...prev, token: value }));
  
  const setLang = (value) => setSession((prev) => ({ ...prev, lang: value }));

  const login = (user, token, lang) => {
    axios.interceptors.request.use((config) => {
      if (config.meta?.public) {
        return config;
      }
      config.params = config.params || {};
      config.params["auth"] = token;
      return config;
    });

    localStorage.setItem(sessionKey, JSON.stringify({ user, token, lang }));
    setSession({ user, token, lang });
  };

  const logout = () => {
    localStorage.removeItem(sessionKey);
    setSession({ user: null, token: null });
  };

  useEffect(() => {
    setToken(null);

    const session = localStorage.getItem(sessionKey);

    if (session) {
      setSession(JSON.parse(session));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(sessionKey,`{"user":{"idReg":"2","nickname":"JHON","fullname":"JHON","lastname":"DOE","email":"jhondoe${sessionKey}@yopmail.com","cellphone":"+573173025584","emailNoti":"1","smsNoti":"1","pushNoti":"1","u_date":"2019-06-08 10:39:30","photo":"https://api.validocus.concilbot.com/files/users/0"},"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lIjoiMjAyNDEwMTkwNDEyMjMiLCJpYXQiOjE3MjkzMjkxNDMsImRhdGEiOiIyIiwiZXhwIjoxNzI5OTMzOTQzfQ.1TZx6uHDW1hFAkYCeITvQevhYGsWCnUcwv6HCHbjKlY"}`);
    if (localStorage.getItem(sessionKey)) {
      axios.interceptors.request.use((config) => {
        if (config.meta?.public) {
          return config;
        }
        config.params = config.params || {};
        config.params["auth"] = JSON.parse(localStorage.getItem(sessionKey)).token;
        return config;
      });
    }
  }, []);

  return <AuthContext.Provider value={[session, { setUser, setToken, setLang, login, logout }]}>{children}</AuthContext.Provider>;
};
