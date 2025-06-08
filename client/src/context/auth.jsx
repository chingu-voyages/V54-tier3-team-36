import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [ user, setUser ] = useState(null)

	const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

	// Check token on load
	useEffect(() => {
		const token = sessionStorage.getItem('token');
		const verifyToken = async() => {
			try {
				const response = await fetch(`${backendUrl}/api/auth/verifytoken`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				const result = await response.json()
				setUser(result.user)
			} catch (error) {
				console.log("Error verifying token", error)
				sessionStorage.removeItem('token')
			}
		}
		
		if (token) {
			verifyToken()
		}
	}, [])

	const login = async (token)=> {
		// retrieve user info using token
		const response = await fetch(`${backendUrl}/api/auth/verifytoken`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const result = await response.json()
		setUser(result.user)
	};

	const logout = () => {
		sessionStorage.removeItem('token');
		setUser(null);
		console.log("LOGOUT")
	};

	return (
		<AuthContext.Provider value={{user, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext, useAuth, AuthProvider }