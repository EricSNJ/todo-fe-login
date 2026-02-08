import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        // 토큰이 있다면 서버에 사용자 정보를 요청
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("사용자 정보 로딩 실패:", error.message);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Routes>

      <Route
      path="/" 
        element={user ? <TodoPage user={user} setUser={setUser} /> : <Navigate to="/login" />} 
        />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
