import { Outlet, Link } from 'react-router-dom'

export default function App(){
  return (
    <div className="main-wrapper">
      <div className="page_header flex-row flex-wrap-row">
        <Link to="/"><h1 className="title_main">Users Management</h1></Link>
      </div>
      <Outlet />
      <footer style={{marginTop:24, opacity:.7}}>© {new Date().getFullYear()} – Punuar nga Festina Imeri.</footer>
    </div>
  )
}
