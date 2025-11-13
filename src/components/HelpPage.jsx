import SearchBox from './SearchBox'
import './HelpPage.css'

const HelpPage = ({ helpData = [] }) => {
  return (
    <div className="help-page">
      <div className="help-sidebar">
        <div className="sidebar-header">
          <h2>Help Center</h2>
        </div>
        
        <div className="search-section">
          <SearchBox links={helpData} />
        </div>
        
        <nav className="help-navigation">
          <h3>Browse by Category</h3>
          <ul className="nav-list">
            <li><a href="#getting-started">Getting Started</a></li>
            <li><a href="#student-guides">Student Guides</a></li>
            <li><a href="#teacher-guides">Teacher Guides</a></li>
            <li><a href="#technical-support">Technical Support</a></li>
            <li><a href="#account-management">Account Management</a></li>
          </ul>
        </nav>
      </div>
      
      <div className="help-content">
        <div className="content-header">
          <h1>Welcome to the Help Center</h1>
          <p>Find answers to your questions and learn how to make the most of our platform.</p>
        </div>
        
        <div className="help-sections">
          <section id="getting-started" className="help-section">
            <h2>Getting Started</h2>
            <p>New to our platform? Start here for the basics.</p>
          </section>
          
          <section id="student-guides" className="help-section">
            <h2>Student Guides</h2>
            <p>Everything students need to know about using the platform effectively.</p>
          </section>
          
          <section id="teacher-guides" className="help-section">
            <h2>Teacher Guides</h2>
            <p>Resources and tutorials specifically designed for educators.</p>
          </section>
          
          <section id="technical-support" className="help-section">
            <h2>Technical Support</h2>
            <p>Troubleshooting guides and technical assistance.</p>
          </section>
          
          <section id="account-management" className="help-section">
            <h2>Account Management</h2>
            <p>Manage your account settings, passwords, and preferences.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HelpPage